import { useCallback, useRef, useState } from 'react'
import type { WindowPoint } from './useDraggableWindow'

export type DesktopWindowId = string

const BASE_Z = 60

function centerWindow(width: number, height: number): WindowPoint {
  if (typeof window === 'undefined') return { x: 80, y: 72 }
  const menu = 28
  const dock = 72
  const x = Math.max(16, (window.innerWidth - width) / 2)
  const y = Math.max(menu + 12, (window.innerHeight - height - dock) / 2)
  return { x, y }
}

/** Welcome About — left of center (right edge at mid-screen), vertically centered. */
function aboutWindowPosition(): WindowPoint {
  if (typeof window === 'undefined') return { x: 332, y: 376 }
  const width = Math.min(440, Math.round(window.innerWidth * 0.92))
  const approxHeight = 248
  const x = Math.round(window.innerWidth / 2 - width) + 84
  const y = Math.round((window.innerHeight - approxHeight) / 2) + 96
  return { x, y }
}

const defaultPositions: Record<string, () => WindowPoint> = {
  resume: () => centerWindow(720, 640),
  finder: () => centerWindow(920, 560),
  profile: aboutWindowPosition,
}

function defaultPositionFor(id: DesktopWindowId): WindowPoint {
  return defaultPositions[id]?.() ?? centerWindow(440, 360)
}

export function useDesktopWindowStack() {
  const [openIds, setOpenIds] = useState<DesktopWindowId[]>([])
  const [positions, setPositions] = useState<Record<string, WindowPoint>>({})
  const [zById, setZById] = useState<Record<string, number>>({})
  const zCounterRef = useRef(BASE_Z)

  const focusWindow = useCallback((id: DesktopWindowId) => {
    zCounterRef.current += 1
    setZById((prev) => ({ ...prev, [id]: zCounterRef.current }))
  }, [])

  const openWindow = useCallback(
    (id: DesktopWindowId) => {
      setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
      setPositions((prev) => (prev[id] ? prev : { ...prev, [id]: defaultPositionFor(id) }))
      focusWindow(id)
    },
    [focusWindow],
  )

  const closeWindow = useCallback((id: DesktopWindowId) => {
    setOpenIds((prev) => prev.filter((w) => w !== id))
  }, [])

  const setWindowPosition = useCallback((id: DesktopWindowId, point: WindowPoint) => {
    setPositions((prev) => ({ ...prev, [id]: point }))
  }, [])

  const isOpen = useCallback((id: DesktopWindowId) => openIds.includes(id), [openIds])

  return {
    openIds,
    isOpen,
    openWindow,
    closeWindow,
    focusWindow,
    positions,
    setWindowPosition,
    zById,
  }
}
