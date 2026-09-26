import { useCallback, useRef, type PointerEvent } from 'react'

export type WindowPoint = { x: number; y: number }

type DragState = {
  pointerId: number
  startX: number
  startY: number
  originX: number
  originY: number
}

export function useDraggableWindow(position: WindowPoint, onPositionChange: (point: WindowPoint) => void) {
  const dragRef = useRef<DragState | null>(null)
  const positionRef = useRef(position)
  positionRef.current = position

  const onTitlePointerDown = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return
    const target = event.target as HTMLElement
    if (target.closest('button, a, input, textarea, select')) return

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: positionRef.current.x,
      originY: positionRef.current.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }, [])

  const onTitlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const drag = dragRef.current
      if (!drag || drag.pointerId !== event.pointerId) return

      onPositionChange({
        x: drag.originX + event.clientX - drag.startX,
        y: drag.originY + event.clientY - drag.startY,
      })
    },
    [onPositionChange],
  )

  const endDrag = useCallback((event: PointerEvent<HTMLElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
  }, [])

  return {
    titleBarProps: {
      onPointerDown: onTitlePointerDown,
      onPointerMove: onTitlePointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  }
}
