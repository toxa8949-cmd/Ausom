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
    // Default: light. Dark only if user explicitly toggled it before.
    // System preference (prefers-color-scheme) is ignored by design —
    // we want a consistent light look for new visitors regardless of
    // their OS settings.
    const saved   = localStorage.getItem('ausom-theme') as Theme | null
    const initial = saved === 'dark' ? 'dark' : 'light'
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
