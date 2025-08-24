# 🚀 PrimeReact V10 Components Demo

โปรเจกต์ตัวอย่างการใช้งาน PrimeReact Version 10 พร้อมด้วย Components ครบครัน

## 📋 รายการ Components ที่รวมอยู่

### 📝 Form Components
- **InputText** - ช่องกรอกข้อความ
- **Password** - ช่องกรอกรหัสผ่านพร้อม toggle mask
- **InputTextarea** - ช่องกรอกข้อความแบบหลายบรรทัด
- **InputNumber** - ช่องกรอกตัวเลขพร้อมรูปแบบสกุลเงิน
- **Dropdown** - รายการแบบเลื่อนลง
- **MultiSelect** - เลือกหลายรายการ
- **Calendar** - เลือกวันที่
- **Checkbox** - ช่องติ๊กเลือก
- **RadioButton** - ปุ่มเลือกแบบหนึ่งตัวเลือก
- **SelectButton** - ปุ่มเลือกแบบกลุ่ม
- **ToggleButton** - ปุ่มเปิด/ปิด
- **InputSwitch** - สวิตช์เปิด/ปิด
- **Slider** - แถบเลื่อน
- **Rating** - ให้คะแนนดาว

### 📊 Data Components
- **DataTable** - ตารางข้อมูลพร้อม pagination และ sorting
- **Column** - คอลัมน์สำหรับตาราง

### 🎯 Button Components
- **Button** - ปุ่มพร้อม variants ต่างๆ (Primary, Secondary, Success, Info, Warning, Danger, Help)
- **Button Styles** - Icon only, Icon + Text, Outlined, Text, Raised, Rounded

### 📋 Panel Components
- **Card** - การ์ดสำหรับจัดกลุ่มเนื้อหา
- **Panel** - แผงที่สามารถพับเก็บได้
- **Accordion** - แอคคอร์เดียนแบบหลายแท็บ
- **AccordionTab** - แท็บภายใน Accordion

### 🎨 Display Components
- **ProgressBar** - แถบแสดงความคืบหน้า
- **Chip** - แท็กที่สามารถลบได้
- **Tag** - แท็กแสดงสถานะ
- **Badge** - ป้ายแสดงจำนวน
- **Avatar** - รูปโปรไฟล์
- **Divider** - เส้นแบ่ง

### 🧭 Navigation Components
- **Menubar** - แถบเมนูหลัก
- **Breadcrumb** - แสดงเส้นทางการนำทาง

### 💬 Overlay Components
- **Dialog** - หน้าต่างป๊อปอัป
- **Toast** - ข้อความแจ้งเตือน

## 🛠️ เทคโนโลยีที่ใช้

- **React 19.1.1** - JavaScript Library
- **TypeScript** - Type Safety
- **Vite 7.1.2** - Build Tool & Dev Server
- **PrimeReact 10.x** - UI Component Library
- **PrimeIcons 7.0.0** - Icon Library

## 🚀 การติดตั้งและรัน

### ข้อกำหนดเบื้องต้น
- Node.js 18+ 
- npm หรือ yarn

### การติดตั้ง

```bash
# Clone โปรเจกต์
git clone <repository-url>
cd costmanagement

# ติดตั้ง dependencies
npm install

# รันโปรเจกต์ (จะรันที่ port 3500)
npm run dev
```

### 🎯 คำสั่งหลัก (Port 3500)

```bash
# เริ่ม development server (แนะนำ)
npm run dev

# Restart server (kill port และเริ่มใหม่)
npm run restart

# Kill process ที่ใช้ port 3500
npm run kill-port:3500
```

### 🔧 คำสั่งเพิ่มเติม

```bash
# รัน Vite โดยตรง
npm run dev:vite

# Build สำหรับ production
npm run build

# ตรวจสอบ code ด้วย ESLint
npm run lint

# Preview build ที่สร้างแล้ว
npm run preview

# Kill process บน port อื่นๆ
npm run kill-port [port_number]
```

### 🌐 URLs

เมื่อ server รันสำเร็จ:
- **Development**: http://localhost:3500/
- **Network**: http://localhost:3500/

## 📁 โครงสร้างโปรเจกต์

```
costmanagement/
├── public/
│   └── vite.svg
├── scripts/                     # 🆕 Port management scripts
│   ├── kill-port.js            # Kill processes on specific port
│   ├── dev-server.js           # Smart development server
│   ├── restart-server.js       # Restart server completely
│   └── README.md               # Scripts documentation
├── src/
│   ├── App.tsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── main.tsx                # Entry point with PrimeReact V10 setup
│   ├── index.css               # Global styles + utilities
│   ├── components-demo.md      # Components usage guide
│   └── vite-env.d.ts          # Vite types
├── primereact.md               # PrimeReact V10 documentation
├── MIGRATION_SUMMARY.md        # Project migration summary
├── PORT_MANAGEMENT_GUIDE.md    # 🆕 Port management guide
├── package.json                # Updated with new scripts
├── tsconfig.json
├── vite.config.ts              # 🆕 Port 3500 configuration
└── README.md
```

## 🎨 การกำหนดค่า Theme

โปรเจกต์นี้ใช้ **Lara Light Cyan** theme ของ PrimeReact V10:

```typescript
// ใน src/main.tsx
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

// กำหนดค่า PrimeReact
import PrimeReact from 'primereact/api'

PrimeReact.ripple = true // เปิดใช้งาน ripple effect
PrimeReact.inputStyle = 'outlined' // รูปแบบ input เริ่มต้น
PrimeReact.locale = 'th' // ภาษาไทย
```

## 📖 คุณสมบัติที่น่าสนใจ

### 🌐 การรองรับภาษาไทย
- แสดงข้อความเป็นภาษาไทย
- รูปแบบวันที่แบบไทย (dd/mm/yy)
- รูปแบบสกุลเงินบาทไทย (THB)

### 📱 Responsive Design
- รองรับการแสดงผลบนหน้าจอขนาดต่างๆ
- Grid system ที่ปรับตัวได้
- Mobile-friendly interface

### 🎯 Interactive Features
- Toast notifications
- Dialog modals
- Form validation
- Data manipulation

### 🎨 Modern UI/UX
- PrimeReact V10 styling
- Consistent design system
- Accessible components
- Smooth animations

## 🔧 การปรับแต่ง

### เปลี่ยน Theme
```typescript
// เปลี่ยนจาก lara-light-cyan เป็น theme อื่น
import 'primereact/resources/themes/lara-dark-cyan/theme.css'
// หรือ
import 'primereact/resources/themes/material-light/theme.css'
// หรือ
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
```

### เพิ่ม Components ใหม่
```typescript
// Import component ใหม่
import { NewComponent } from 'primereact/newcomponent'

// ใช้งานใน JSX
<NewComponent prop1="value1" prop2="value2" />
```

## 📚 เอกสารอ้างอิง

- [PrimeReact Documentation](https://primereact.org/)
- [PrimeReact V10 Changelog](https://github.com/primefaces/primereact/blob/master/CHANGELOG.md)
- [PrimeIcons](https://primereact.org/icons/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 การมีส่วนร่วม

หากต้องการปรับปรุงหรือเพิ่มคุณสมบัติ:

1. Fork โปรเจกต์
2. สร้าง feature branch
3. Commit การเปลี่ยนแปลง
4. Push ไปยัง branch
5. สร้าง Pull Request

## 📄 License

โปรเจกต์นี้เป็น open source สามารถใช้งานได้ฟรี

## 🆘 การแก้ไขปัญหา

### ปัญหาเกี่ยวกับ Port

**1. Port 3500 ถูกใช้งานอยู่**
```bash
# วิธีแก้ที่ 1: ใช้ restart (แนะนำ)
npm run restart

# วิธีแก้ที่ 2: kill port ก่อน
npm run kill-port:3500
npm run dev
```

**2. Server ไม่เริ่มหรือค้าง**
```bash
# Restart server สมบูรณ์
npm run restart

# หรือ kill process โดยตรง
npm run kill-port:3500
```

**3. Permission denied (macOS/Linux)**
```bash
# ตรวจสอบ permissions
chmod +x scripts/*.js

# ใช้ sudo เฉพาะเมื่อจำเป็น (ระวัง!)
sudo npm run kill-port:3500
```

### ปัญหาทั่วไป

**4. Module not found error**
```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules package-lock.json
npm install
```

**5. TypeScript errors**
```bash
# ตรวจสอบ TypeScript configuration
npx tsc --noEmit
```

**6. Build errors**
```bash
# Clear cache และ build ใหม่
npm run build -- --force
```

### 🔍 การตรวจสอบ Port

```bash
# ดู process ที่ใช้ port 3500
# macOS/Linux
lsof -i :3500

# Windows
netstat -ano | findstr :3500
```

## 🔗 ลิงก์ที่เป็นประโยชน์

- [PrimeReact Showcase](https://primereact.org/showcase/)
- [PrimeReact GitHub](https://github.com/primefaces/primereact)
- [PrimeReact Community](https://github.com/primefaces/primereact/discussions)
- [PrimeTek](https://www.primetek.com.tr/)

---

🎉 **สนุกกับการพัฒนาด้วย PrimeReact V10!** 🎉
