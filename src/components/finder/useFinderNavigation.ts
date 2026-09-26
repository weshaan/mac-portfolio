import { useCallback, useState } from 'react'
import type { FinderLocationId } from './finderLocations'

type NavState = {
  stack: FinderLocationId[]
  index: number
}

export function useFinderNavigation(initial: FinderLocationId = 'desktop') {
  const [state, setState] = useState<NavState>({ stack: [initial], index: 0 })

  const locationId = state.stack[state.index] ?? initial
  const canGoBack = state.index > 0
  const canGoForward = state.index < state.stack.length - 1

  const goTo = useCallback((id: FinderLocationId) => {
    setState((s) => {
      const current = s.stack[s.index]
      if (current === id) return s
      const stack = [...s.stack.slice(0, s.index + 1), id]
      return { stack, index: s.index + 1 }
    })
  }, [])

  const goBack = useCallback(() => {
    setState((s) => (s.index > 0 ? { ...s, index: s.index - 1 } : s))
  }, [])

  const goForward = useCallback(() => {
    setState((s) => (s.index < s.stack.length - 1 ? { ...s, index: s.index + 1 } : s))
  }, [])

  return { locationId, goTo, goBack, goForward, canGoBack, canGoForward }
}
