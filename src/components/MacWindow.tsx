import type { ReactNode } from 'react'
import { DesktopWindow } from './desktop/DesktopWindow'
import type { WindowPoint } from '../hooks/useDraggableWindow'

type Props = {
  windowId: string
  title: string
  zIndex: number
  position: WindowPoint
  onPositionChange: (point: WindowPoint) => void
  onFocus: () => void
  onClose: () => void
  children: ReactNode
}

export function MacWindow({
  windowId,
  title,
  zIndex,
  position,
  onPositionChange,
  onFocus,
  onClose,
  children,
}: Props) {
  return (
    <DesktopWindow
      windowId={windowId}
      title={title}
      variant="panel"
      zIndex={zIndex}
      position={position}
      onPositionChange={onPositionChange}
      onFocus={onFocus}
      onClose={onClose}
    >
      {children}
    </DesktopWindow>
  )
}
