import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// PrimeReact V10 Core CSS และ Icons (theme จะถูกโหลดแบบ dynamic)
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

// PrimeReact V10 Configuration
import PrimeReact from 'primereact/api'

// โหลด theme เริ่มต้นแบบ dynamic
const loadInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = savedTheme || (systemDarkMode ? 'dark' : 'light')
  
  const themeLink = document.createElement('link')
  themeLink.id = 'app-theme'
  themeLink.rel = 'stylesheet'
  themeLink.href = theme === 'dark' 
    ? '/node_modules/primereact/resources/themes/lara-dark-cyan/theme.css'
    : '/node_modules/primereact/resources/themes/lara-light-cyan/theme.css'
  
  document.head.appendChild(themeLink)
  
  // เพิ่ม class เริ่มต้นสำหรับ html และ body
  document.documentElement.className = theme === 'dark' ? 'dark-theme' : 'light-theme'
  document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme'
}

// โหลด theme เมื่อเริ่มต้น
loadInitialTheme()

// Global Configuration for V10
PrimeReact.ripple = true // เปิดใช้งาน ripple effect
PrimeReact.inputStyle = 'outlined' // default input style
// PrimeReact.locale = 'th' // ภาษาไทย - ปิดไว้ก่อนเพื่อป้องกัน error

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
