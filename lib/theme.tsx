'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const Ctx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'light', toggle: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme,   setTheme]   = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved     = localStorage.getItem('ausom-theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initial   = saved ?? preferred
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
    setMounted(true)
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('ausom-theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>
}

export const useTheme = () => useContext(Ctx)
