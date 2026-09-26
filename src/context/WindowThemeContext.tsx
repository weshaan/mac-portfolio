import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export type WindowTheme = 'light' | 'dark'

const STORAGE_KEY = 'weshaanos-window-theme'

type ContextValue = {
  theme: WindowTheme
  setTheme: (theme: WindowTheme) => void
  toggleTheme: () => void
}

const WindowThemeContext = createContext<ContextValue | null>(null)

function readStoredTheme(): WindowTheme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* ignore */
  }
  return 'dark'
}

export function WindowThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<WindowTheme>(readStoredTheme)

  const setTheme = useCallback((next: WindowTheme) => {
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return <WindowThemeContext.Provider value={value}>{children}</WindowThemeContext.Provider>
}

export function useWindowTheme() {
  const ctx = useContext(WindowThemeContext)
  if (!ctx) throw new Error('useWindowTheme must be used within WindowThemeProvider')
  return ctx
}
