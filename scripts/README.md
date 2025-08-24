# 🛠️ Development Scripts

สคริปต์สำหรับจัดการ development server และ port management

## 📋 รายการ Scripts

### 🚀 การใช้งานหลัก

```bash
# เริ่ม development server (ตรวจสอบและ kill port อัตโนมัติ)
npm run dev

# Restart server (kill port 3500 และเริ่มใหม่)
npm run restart

# Kill process ที่ใช้ port 3500
npm run kill-port:3500

# Kill process ที่ใช้ port อื่นๆ (ระบุ port)
npm run kill-port [port]
```

### 🔧 Scripts อื่นๆ

```bash
# เริ่ม Vite โดยตรง (ไม่มีการจัดการ port)
npm run dev:vite

# Build production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Alias commands
npm start      # เหมือน npm run dev
npm run serve  # เหมือน npm run preview
```

## 📁 ไฟล์ Scripts

### `kill-port.js`
- ค้นหาและ kill process ที่ใช้ port ที่กำหนด
- รองรับทั้ง macOS, Linux และ Windows
- ใช้ `lsof` สำหรับ Unix และ `netstat` สำหรับ Windows

**การใช้งาน:**
```bash
node scripts/kill-port.js [port]  # default port = 3500
```

**ตัวอย่าง:**
```bash
node scripts/kill-port.js 3000   # Kill port 3000
node scripts/kill-port.js        # Kill port 3500 (default)
```

### `dev-server.js`
- เริ่ม development server พร้อมจัดการ port
- ตรวจสอบว่า port ว่างหรือไม่
- Kill process เก่าอัตโนมัติหากจำเป็น
- เริ่ม Vite dev server บน port 3500

**การใช้งาน:**
```bash
node scripts/dev-server.js [--force]
```

**ตัวอย่าง:**
```bash
node scripts/dev-server.js        # เริ่ม server ปกติ
node scripts/dev-server.js --force # บังคับ kill port ก่อนเริ่ม
```

### `restart-server.js`
- Restart development server อย่างสมบูรณ์
- Kill process ทั้งหมดที่ใช้ port 3500
- รอให้ port ว่างสมบูรณ์
- เริ่ม dev server ใหม่

**การใช้งาน:**
```bash
node scripts/restart-server.js
```

## ⚙️ การกำหนดค่า

### Port Configuration
- **Default Port:** `3500`
- **Host:** `localhost`
- **Auto Open Browser:** `true`
- **Strict Port:** `true` (แสดงข้อผิดพลาดหาก port ไม่ว่าง)

### Vite Configuration (`vite.config.ts`)
```typescript
export default defineConfig({
  server: {
    port: 3500,
    host: 'localhost',
    open: true,
    strictPort: true,
    cors: true
  },
  preview: {
    port: 3500,
    host: 'localhost',
    open: true,
    strictPort: true
  }
})
```

## 🔍 การแก้ไขปัญหา

### ปัญหา: Port ถูกใช้งานอยู่
```bash
# วิธีแก้: ใช้ restart script
npm run restart

# หรือ kill port ก่อน
npm run kill-port:3500
npm run dev
```

### ปัญหา: Script ไม่ทำงาน
```bash
# ตรวจสอบว่าไฟล์ executable หรือไม่
chmod +x scripts/*.js

# รันโดยตรง
node scripts/kill-port.js 3500
```

### ปัญหา: ไม่สามารถ kill process
```bash
# macOS/Linux: ใช้ sudo (ระวังใช้)
sudo node scripts/kill-port.js 3500

# Windows: รัน Command Prompt as Administrator
```

### ปัญหา: Vite ไม่เริ่ม
```bash
# ตรวจสอบ dependencies
npm install

# ตรวจสอบ port ว่างหรือไม่
npm run kill-port:3500

# ลองใช้ vite โดยตรง
npm run dev:vite
```

## 🛡️ Security Notes

1. **ระวังการใช้ `sudo`** - ใช้เฉพาะเมื่อจำเป็น
2. **ตรวจสอบ PID** - script จะแสดง PID ก่อน kill
3. **Graceful Shutdown** - script พยายาม graceful shutdown ก่อน force kill
4. **Port Range** - รองรับ port 1-65535 เท่านั้น

## 📊 Script Flow

### `npm run dev` Flow:
```
1. ตรวจสอบ port 3500
2. หาก port ถูกใช้ → kill process
3. รอให้ port ว่าง (1.5s)
4. เริ่ม Vite dev server
5. เปิดเบราว์เซอร์อัตโนมัติ
```

### `npm run restart` Flow:
```
1. Kill ทุก process ที่ใช้ port 3500
2. รอให้ port ว่างสมบูรณ์ (2s)
3. เริ่ม dev server ใหม่
4. เปิดเบราว์เซอร์อัตโนมัติ
```

## 🌐 URLs

เมื่อ server รันสำเร็จ คุณสามารถเข้าถึงได้ที่:

- **Local:** http://localhost:3500/
- **Network:** http://localhost:3500/ (เดียวกัน เนื่องจากใช้ localhost)

## 💡 Tips

1. **ใช้ `npm run restart`** เมื่อต้องการ fresh start
2. **ใช้ `npm run dev`** สำหรับการพัฒนาปกติ
3. **ตรวจสอบ console** เพื่อดู process IDs ที่ถูก kill
4. **กด Ctrl+C** เพื่อหยุด dev server อย่างปลอดภัย

---

🚀 **Happy Development with PrimeReact V10!** 🚀
