import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// PrimeReact V10 Theme และ Core CSS
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

// PrimeReact V10 Configuration
import PrimeReact from 'primereact/api'

// Global Configuration for V10
PrimeReact.ripple = true // เปิดใช้งาน ripple effect
PrimeReact.inputStyle = 'outlined' // default input style
// PrimeReact.locale = 'th' // ภาษาไทย - ปิดไว้ก่อนเพื่อป้องกัน error

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
