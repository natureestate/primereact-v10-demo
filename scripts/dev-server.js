#!/usr/bin/env node

/**
 * Development server script ที่จัดการ port 3500 อัตโนมัติ
 * รวมการ kill process เก่าและเริ่ม dev server ใหม่
 */

import { spawn, exec } from 'child_process';
import { killPortAndWait } from './kill-port.js';
import os from 'os';

const PORT = 3500;
const HOST = 'localhost';

/**
 * ตรวจสอบว่า port ว่างหรือไม่
 */
function checkPort(port) {
  return new Promise((resolve) => {
    
    if (os.platform() === 'win32') {
      exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
        resolve(!error && stdout.trim().length > 0);
      });
    } else {
      exec(`lsof -ti:${port}`, (error, stdout) => {
        resolve(!error && stdout.trim().length > 0);
      });
    }
  });
}

/**
 * เริ่ม Vite dev server
 */
function startDevServer() {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Starting development server on http://${HOST}:${PORT}...`);
    
    const viteProcess = spawn('npx', ['vite', '--host', HOST, '--port', PORT.toString()], {
      stdio: 'inherit',
      shell: true,
      env: {
        ...process.env,
        PORT: PORT.toString(),
        HOST: HOST
      }
    });

    viteProcess.on('error', (error) => {
      console.error('❌ Failed to start development server:', error.message);
      reject(error);
    });

    viteProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`❌ Development server exited with code ${code}`);
        reject(new Error(`Process exited with code ${code}`));
      } else {
        console.log('👋 Development server stopped');
        resolve();
      }
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n⏹️  Shutting down development server...');
      viteProcess.kill('SIGINT');
    });

    process.on('SIGTERM', () => {
      console.log('\n⏹️  Shutting down development server...');
      viteProcess.kill('SIGTERM');
    });

    // Show success message after a short delay
    setTimeout(() => {
      console.log(`✅ Development server should be running at:`);
      console.log(`   🌐 Local:   http://${HOST}:${PORT}/`);
      console.log(`   🌍 Network: http://localhost:${PORT}/`);
      console.log(`\n💡 Press Ctrl+C to stop the server`);
      resolve();
    }, 2000);
  });
}

/**
 * ฟังก์ชันหลักสำหรับรัน dev server
 */
async function runDevServer(forceKill = false) {
  try {
    console.log('🔍 Checking development environment...');
    
    // ตรวจสอบว่า port ถูกใช้งานอยู่หรือไม่
    const isPortInUse = await checkPort(PORT);
    
    if (isPortInUse || forceKill) {
      if (isPortInUse) {
        console.log(`⚠️  Port ${PORT} is currently in use`);
      }
      console.log(`🔄 Freeing port ${PORT}...`);
      await killPortAndWait(PORT, 1500);
    } else {
      console.log(`✅ Port ${PORT} is available`);
    }

    // เริ่ม dev server
    await startDevServer();
    
  } catch (error) {
    console.error('❌ Failed to start development server:', error.message);
    process.exit(1);
  }
}

// รันเมื่อเรียกใช้โดยตรง
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const forceKill = args.includes('--force') || args.includes('-f');
  
  console.log('🚀 PrimeReact V10 Development Server');
  console.log('=====================================');
  
  runDevServer(forceKill);
}

export { runDevServer, PORT, HOST };
