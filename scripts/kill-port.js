#!/usr/bin/env node

/**
 * Script สำหรับค้นหาและ kill process ที่ใช้ port ที่กำหนด
 * ใช้สำหรับ restart development server
 */

import { exec } from 'child_process';
import os from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEFAULT_PORT = 3500;

/**
 * ฟังก์ชันสำหรับ kill process บน macOS/Linux
 */
function killPortUnix(port) {
  return new Promise((resolve, reject) => {
    // ค้นหา PID ที่ใช้ port นี้
    exec(`lsof -ti:${port}`, (error, stdout, stderr) => {
      if (error) {
        if (error.code === 1) {
          console.log(`✅ Port ${port} is already free`);
          return resolve();
        }
        console.error(`❌ Error finding process on port ${port}:`, error.message);
        return reject(error);
      }

      const pids = stdout.trim().split('\n').filter(pid => pid);
      
      if (pids.length === 0) {
        console.log(`✅ Port ${port} is already free`);
        return resolve();
      }

      console.log(`🔍 Found ${pids.length} process(es) using port ${port}: ${pids.join(', ')}`);

      // Kill all processes
      const killPromises = pids.map(pid => {
        return new Promise((killResolve, killReject) => {
          console.log(`🔪 Killing process ${pid}...`);
          exec(`kill -9 ${pid}`, (killError) => {
            if (killError) {
              console.error(`❌ Failed to kill process ${pid}:`, killError.message);
              killReject(killError);
            } else {
              console.log(`✅ Successfully killed process ${pid}`);
              killResolve();
            }
          });
        });
      });

      Promise.all(killPromises)
        .then(() => {
          console.log(`✅ All processes on port ${port} have been killed`);
          resolve();
        })
        .catch(reject);
    });
  });
}

/**
 * ฟังก์ชันสำหรับ kill process บน Windows
 */
function killPortWindows(port) {
  return new Promise((resolve, reject) => {
    // ค้นหา PID ที่ใช้ port นี้
    exec(`netstat -ano | findstr :${port}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`✅ Port ${port} is already free`);
        return resolve();
      }

      const lines = stdout.split('\n').filter(line => line.trim());
      const pids = new Set();

      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5) {
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0' && !isNaN(pid)) {
            pids.add(pid);
          }
        }
      });

      if (pids.size === 0) {
        console.log(`✅ Port ${port} is already free`);
        return resolve();
      }

      console.log(`🔍 Found ${pids.size} process(es) using port ${port}: ${Array.from(pids).join(', ')}`);

      // Kill all processes
      const killPromises = Array.from(pids).map(pid => {
        return new Promise((killResolve, killReject) => {
          console.log(`🔪 Killing process ${pid}...`);
          exec(`taskkill /PID ${pid} /F`, (killError) => {
            if (killError) {
              console.error(`❌ Failed to kill process ${pid}:`, killError.message);
              killReject(killError);
            } else {
              console.log(`✅ Successfully killed process ${pid}`);
              killResolve();
            }
          });
        });
      });

      Promise.all(killPromises)
        .then(() => {
          console.log(`✅ All processes on port ${port} have been killed`);
          resolve();
        })
        .catch(reject);
    });
  });
}

/**
 * ฟังก์ชันหลักสำหรับ kill port
 */
async function killPort(port = DEFAULT_PORT) {
  console.log(`🚀 Attempting to free port ${port}...`);
  
  try {
    const platform = os.platform();
    
    if (platform === 'win32') {
      await killPortWindows(port);
    } else {
      await killPortUnix(port);
    }
    
    console.log(`🎉 Port ${port} is now free and ready to use!`);
  } catch (error) {
    console.error(`❌ Failed to free port ${port}:`, error.message);
    process.exit(1);
  }
}

/**
 * รอสักครู่เพื่อให้ process ปิดสมบูรณ์
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * ฟังก์ชันรวมสำหรับ kill และ wait
 */
async function killPortAndWait(port = DEFAULT_PORT, waitTime = 1000) {
  await killPort(port);
  console.log(`⏳ Waiting ${waitTime}ms for port to be completely free...`);
  await sleep(waitTime);
  console.log(`✅ Ready to start new process on port ${port}`);
}

// รันเมื่อเรียกใช้โดยตรง
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const port = args[0] ? parseInt(args[0]) : DEFAULT_PORT;
  
  if (isNaN(port) || port < 1 || port > 65535) {
    console.error('❌ Invalid port number. Port must be between 1 and 65535.');
    process.exit(1);
  }

  killPortAndWait(port)
    .then(() => {
      console.log('🎯 Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error.message);
      process.exit(1);
    });
}

export { killPort, killPortAndWait };
