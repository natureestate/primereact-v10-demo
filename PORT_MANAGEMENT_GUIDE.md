# 🚀 Port Management Guide - PrimeReact V10 Project

คู่มือการจัดการ Port 3500 และ Development Scripts

## ✅ สิ่งที่ทำเสร็จแล้ว

### 🔧 Scripts ที่สร้างขึ้น

1. **`scripts/kill-port.js`** - ค้นหาและ kill process ที่ใช้ port
2. **`scripts/dev-server.js`** - จัดการ development server อัตโนมัติ  
3. **`scripts/restart-server.js`** - restart server แบบสมบูรณ์
4. **`scripts/README.md`** - เอกสารการใช้งาน scripts

### ⚙️ การกำหนดค่า

#### **package.json** - npm scripts ใหม่:
```json
{
  "scripts": {
    "dev": "node scripts/dev-server.js",
    "dev:vite": "vite --port 3500 --host localhost", 
    "restart": "node scripts/restart-server.js",
    "kill-port": "node scripts/kill-port.js",
    "kill-port:3500": "node scripts/kill-port.js 3500"
  }
}
```

#### **vite.config.ts** - Port 3500 configuration:
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

## 🎯 วิธีใช้งาน

### 📋 คำสั่งหลัก

```bash
# เริ่ม development server (แนะนำ)
npm run dev

# Restart server (kill port และเริ่มใหม่)
npm run restart

# Kill process ที่ใช้ port 3500
npm run kill-port:3500

# Kill process ที่ใช้ port อื่นๆ
npm run kill-port [port_number]
```

### 🔄 สถานการณ์การใช้งาน

#### 1. เริ่มงานใหม่ (ปกติ):
```bash
npm run dev
```
**ผลลัพธ์:**
- ตรวจสอบ port 3500
- Kill process เก่าหากมี
- เริ่ม Vite dev server
- เปิดเบราว์เซอร์อัตโนมัติ

#### 2. Server มีปัญหา/ค้าง:
```bash
npm run restart
```
**ผลลัพธ์:**
- บังคับ kill ทุก process ที่ใช้ port 3500
- รอให้ port ว่างสมบูรณ์ (2 วินาทีเ)
- เริ่ม server ใหม่

#### 3. Port ถูกใช้โดย process อื่น:
```bash
npm run kill-port:3500
npm run dev
```

#### 4. ใช้ Vite โดยตรง (ไม่มีการจัดการ port):
```bash
npm run dev:vite
```

## 🛠️ Technical Details

### การทำงานของ Scripts

#### `kill-port.js` 
- **macOS/Linux**: ใช้ `lsof -ti:PORT` หา PID แล้ว `kill -9 PID`
- **Windows**: ใช้ `netstat -ano` หา PID แล้ว `taskkill /PID /F`
- รองรับ cross-platform
- ตรวจสอบความปลอดภัยก่อน kill

#### `dev-server.js`
- ตรวจสอบ port ว่างก่อนเริ่ม
- Kill process เก่าอัตโนมัติ
- รอให้ port ว่างสมบูรณ์
- เริ่ม Vite พร้อม configuration

#### `restart-server.js` 
- Kill ทุก process บน port 3500
- รอให้ process ปิดสมบูรณ์
- เริ่ม dev server ใหม่

### Security Features

1. **PID Verification** - แสดง PID ก่อน kill
2. **Port Validation** - ตรวจสอบ port range (1-65535)
3. **Graceful Shutdown** - พยายาม graceful ก่อน force kill
4. **Error Handling** - จัดการ error ทุกกรณี

## 🐛 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

#### 1. **Script ไม่ทำงาน**
```bash
# ตรวจสอบ permissions
chmod +x scripts/*.js

# รันโดยตรง  
node scripts/kill-port.js 3500
```

#### 2. **Port ยังถูกใช้หลัง kill**
```bash
# รอสักครู่แล้วลองใหม่
npm run kill-port:3500
sleep 2
npm run dev
```

#### 3. **Permission denied (macOS/Linux)**
```bash
# ใช้ sudo เฉพาะเมื่อจำเป็น (ระวัง!)
sudo npm run kill-port:3500
```

#### 4. **Windows permission issues**
```bash
# รัน Command Prompt as Administrator
```

#### 5. **Vite ไม่เริ่ม**
```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Debugging

#### เช็ค process ที่ใช้ port:
```bash
# macOS/Linux
lsof -i :3500

# Windows  
netstat -ano | findstr :3500
```

#### Manual kill process:
```bash
# macOS/Linux
kill -9 <PID>

# Windows
taskkill /PID <PID> /F
```

## 📊 Performance & Monitoring

### Script Execution Time
- **kill-port**: ~1-2 วินาที
- **dev-server**: ~3-5 วินาที  
- **restart**: ~4-7 วินาที

### URLs เมื่อ Server รัน
- **Development**: http://localhost:3500/
- **Network**: http://localhost:3500/
- **Vite DevTools**: http://localhost:3500/__vite_ping

## 🎉 Success Indicators

เมื่อ script ทำงานสำเร็จ คุณจะเห็น:

```bash
✅ Port 3500 is now free and ready to use!
🚀 Starting development server on http://localhost:3500...
✅ Development server should be running at:
   🌐 Local:   http://localhost:3500/
   🌍 Network: http://localhost:3500/

💡 Press Ctrl+C to stop the server
```

## 🔮 Advanced Usage

### Custom Port
```bash
# ใช้ port อื่น
node scripts/kill-port.js 8080
VITE_PORT=8080 npm run dev:vite
```

### Force Kill Mode
```bash
# บังคับ kill ก่อนเริ่ม
node scripts/dev-server.js --force
```

### Background Process Management
```bash
# รัน dev server ใน background
npm run dev &

# ดู background jobs
jobs

# Kill background job
kill %1
```

## 📝 Best Practices

1. **ใช้ `npm run dev`** สำหรับงานประจำ
2. **ใช้ `npm run restart`** เมื่อมีปัญหา  
3. **ตรวจสอบ console output** เพื่อดู PID ที่ถูก kill
4. **กด Ctrl+C** เพื่อหยุด server อย่างปลอดภัย
5. **หลีกเลี่ยง `sudo`** เว้นแต่จำเป็นจริงๆ

---

## 🎯 Quick Reference

| Command | Purpose | Use Case |
|---------|---------|----------|
| `npm run dev` | Start dev server | ใช้งานปกติ |
| `npm run restart` | Restart server | Server มีปัญหา |
| `npm run kill-port:3500` | Kill port 3500 | Port ถูกใช้งาน |
| `npm run dev:vite` | Direct Vite | Debug purposes |

---

🚀 **ตอนนี้คุณมี Development Environment ที่สมบูรณ์แบบสำหรับ PrimeReact V10!** 🎉
