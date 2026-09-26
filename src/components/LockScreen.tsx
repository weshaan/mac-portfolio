import { useEffect, useRef } from 'react'
import { useClock } from '../hooks/useClock'
import { BatteryMenuIcon, WifiMenuIcon } from './menuBar/MenuBarIcons'
import './LockScreen.css'

type Props = {
  onUnlock: () => void
  exiting?: boolean
}

export function LockScreen({ onUnlock, exiting }: Props) {
  const { lockTime, lockDate } = useClock()
  const unlockRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    unlockRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.repeat) {
        e.preventDefault()
        onUnlock()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onUnlock])

  return (
    <div className={exiting ? 'lock-screen lock-screen--exit' : 'lock-screen'} role="dialog" aria-modal="true" aria-label="Locked">
      <div className="lock-screen__wallpaper" role="presentation" />

      <div className="lock-screen__status" aria-hidden>
        <span className="lock-screen__input-source">ABC – India</span>
        <KeyboardStatusIcon />
        <span className="lock-screen__battery-pct">80%</span>
        <BatteryMenuIcon level={80} className="lock-screen__battery-icon" />
        <WifiMenuIcon className="lock-screen__wifi" />
      </div>

      <div className="lock-screen__clock-block">
        <p className="lock-screen__date">{lockDate}</p>
        <p className="lock-screen__time" aria-live="polite">{lockTime}</p>
      </div>

      <div className="lock-screen__user">
        <div className="lock-screen__avatar" aria-hidden>
          <span className="lock-screen__avatar-emoji">🦚</span>
        </div>
        <p className="lock-screen__name">Eshaan Walia</p>
        <button
          ref={unlockRef}
          type="button"
          className="lock-screen__unlock"
          onClick={onUnlock}
        >
          Press Enter to unlock
        </button>
      </div>
    </div>
  )
}

function KeyboardStatusIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 20 14" aria-hidden className="lock-screen__keyboard-icon">
      <rect x="0.5" y="2.5" width="19" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="3" y="5" width="2" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="6" y="5" width="2" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="9" y="5" width="2" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="12" y="5" width="2" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="15" y="5" width="2" height="1.5" rx="0.3" fill="currentColor" />
      <rect x="5" y="8.5" width="10" height="1.5" rx="0.3" fill="currentColor" />
    </svg>
  )
}
