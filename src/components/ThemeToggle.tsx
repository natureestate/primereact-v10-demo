import React from 'react'
import { Button } from 'primereact/button'
import { useTheme } from '../hooks/useTheme'

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      icon={theme === 'light' ? 'pi pi-moon' : 'pi pi-sun'}
      rounded
      text
      severity="secondary"
      onClick={toggleTheme}
      tooltip={theme === 'light' ? 'สลับเป็น Dark Mode' : 'สลับเป็น Light Mode'}
      tooltipOptions={{ position: 'bottom' }}
      aria-label={theme === 'light' ? 'สลับเป็น Dark Mode' : 'สลับเป็น Light Mode'}
      className="theme-toggle-btn"
    />
  )
}
