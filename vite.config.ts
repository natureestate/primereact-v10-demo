import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3500,
    host: 'localhost',
    open: true, // เปิดเบราว์เซอร์อัตโนมัติ
    strictPort: true, // ข้อผิดพลาดหาก port ไม่ว่าง
    cors: true
  },
  preview: {
    port: 3500,
    host: 'localhost',
    open: true,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          primereact: ['primereact/button', 'primereact/inputtext', 'primereact/datatable']
        }
      }
    }
  }
})
