import type { ReactNode } from 'react'
import './MacWindow.css'

type Props = {
  title: string
  children: ReactNode
  onClose: () => void
}

export function MacWindow({ title, children, onClose }: Props) {
  return (
    <div className="mac-window-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="mac-window">
        <header className="mac-window__titlebar">
          <div className="mac-window__traffic">
            <button type="button" className="mac-window__dot mac-window__dot--close" onClick={onClose} aria-label="Close" />
            <button type="button" className="mac-window__dot mac-window__dot--min" aria-label="Minimize" />
            <button type="button" className="mac-window__dot mac-window__dot--max" aria-label="Zoom" />
          </div>
          <span className="mac-window__title">{title}</span>
        </header>
        <div className="mac-window__content">{children}</div>
      </div>
    </div>
  )
}
