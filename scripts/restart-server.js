#!/usr/bin/env node

/**
 * Restart server script - kill existing processes และเริ่ม dev server ใหม่
 * ใช้สำหรับ npm run restart
 */

import { runDevServer, PORT } from './dev-server.js';
import { killPortAndWait } from './kill-port.js';

/**
 * ฟังก์ชันสำหรับ restart server
 */
async function restartServer() {
  console.log('🔄 Restarting Development Server');
  console.log('=================================');
  
  try {
    // บังคับ kill process ที่ใช้ port
    console.log(`🛑 Stopping any processes using port ${PORT}...`);
    await killPortAndWait(PORT, 2000);
    
    console.log('✅ All processes stopped successfully');
    console.log('🚀 Starting fresh development server...');
    
    // เริ่ม dev server ใหม่
    await runDevServer(true);
    
  } catch (error) {
    console.error('❌ Failed to restart server:', error.message);
    process.exit(1);
  }
}

// รันเมื่อเรียกใช้โดยตรง
if (import.meta.url === `file://${process.argv[1]}`) {
  restartServer();
}

export { restartServer };
