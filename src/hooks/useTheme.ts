import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

export const useTheme = () => {
  // ตรวจสอบ theme จาก localStorage หรือใช้ค่าเริ่มต้น
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme) {
        return savedTheme
      }
      // ตรวจสอบการตั้งค่า system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  // อัปเดต CSS variables และ localStorage เมื่อ theme เปลี่ยน
  useEffect(() => {
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark-theme')
      root.classList.remove('light-theme')
    } else {
      root.classList.add('light-theme')
      root.classList.remove('dark-theme')
    }

    localStorage.setItem('theme', theme)
    
    // เปลี่ยน PrimeReact theme CSS
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement
    if (themeLink) {
      themeLink.href = theme === 'dark' 
        ? '/node_modules/primereact/resources/themes/lara-dark-cyan/theme.css'
        : '/node_modules/primereact/resources/themes/lara-light-cyan/theme.css'
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}
