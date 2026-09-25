import { useClock } from '../hooks/useClock'
import './MenuBar.css'

const menuItems = ['File', 'Window', 'Help']

export function MenuBar() {
  const { menuTime } = useClock()

  return (
    <header className="menu-bar">
      <div className="menu-bar__left">
        <button type="button" className="menu-bar__apple-btn" aria-label="Apple menu">
          <AppleLogo />
        </button>
        <nav className="menu-bar__menus" aria-label="Application menu">
          <button type="button" className="menu-bar__item menu-bar__item--app">
            Code
          </button>
          {menuItems.map((item) => (
            <button key={item} type="button" className="menu-bar__item">
              {item}
            </button>
          ))}
        </nav>
      </div>
      <div className="menu-bar__right">
        <button type="button" className="menu-bar__icon-btn" aria-label="Focus">
          <FocusIcon />
        </button>
        <span className="menu-bar__status">24°C</span>
        <button type="button" className="menu-bar__icon-btn" aria-label="Bluetooth">
          <BluetoothIcon />
        </button>
        <button type="button" className="menu-bar__icon-btn" aria-label="Wi-Fi">
          <WifiIcon />
        </button>
        <button type="button" className="menu-bar__battery" aria-label="Battery 4 percent">
          <BatteryMenuIcon />
          <span>4%</span>
        </button>
        <button type="button" className="menu-bar__icon-btn" aria-label="Spotlight">
          <SearchIcon />
        </button>
        <button type="button" className="menu-bar__icon-btn" aria-label="Control Center">
          <ControlCenterIcon />
        </button>
        <time className="menu-bar__clock" dateTime={menuTime}>{menuTime}</time>
      </div>
    </header>
  )
}

function AppleLogo() {
  return (
    <svg className="menu-bar__apple" viewBox="0 0 14 17" width="13" height="15" aria-hidden>
      <path
        fill="currentColor"
        d="M11.5 8.9c-.03-2.8 2.3-4.15 2.4-4.2-1.3-1.9-3.33-2.16-4.05-2.2-1.72-.17-3.36 1.02-4.23 1.02-.88 0-2.23-.99-3.67-.96-1.89.03-3.63 1.1-4.6 2.8-1.96 3.4-.5 8.43 1.4 11.2.93 1.35 2.04 2.86 3.5 2.81 1.4-.05 1.93-.9 3.62-.9 1.68 0 2.15.9 3.62.87 1.5-.03 2.45-1.37 3.37-2.73 1.06-1.55 1.5-3.05 1.52-3.12-.03-.02-2.92-1.12-2.95-4.45zM9.38 2.58c.77-.93 1.28-2.22 1.14-3.5-1.1.04-2.43.73-3.22 1.66-.7.82-1.32 2.13-1.15 3.39 1.22.1 2.47-.62 3.23-1.55z"
      />
    </svg>
  )
}

function FocusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.15" strokeDasharray="2.2 2.2" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
    </svg>
  )
}

function BluetoothIcon() {
  return (
    <svg width="11" height="14" viewBox="0 0 12 16" aria-hidden>
      <path
        fill="currentColor"
        d="M6.2 0L2 3.6v3.2L6.2 10.4V0zm0 16l4.2-3.6V9.2L6.2 5.6V16zM2 8.4l2.4 2V6.4L2 8.4zm8.4 0L8 6.4v4l2.4-1.6z"
      />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 18 14" aria-hidden>
      <path
        fill="currentColor"
        d="M9 12.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM3.2 6.8a8.5 8.5 0 0111.6 0l1.2-1.4a10.5 10.5 0 00-14 0l1.2 1.4zM0.5 3.5a13 13 0 0117 0L18.5 2a15 15 0 00-19 0l1.5 1.5z"
      />
    </svg>
  )
}

function BatteryMenuIcon() {
  return (
    <svg width="24" height="11" viewBox="0 0 24 11" aria-hidden>
      <rect x="0.5" y="0.5" width="20" height="10" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="21" y="3.5" width="2" height="4" rx="0.6" fill="currentColor" opacity="0.85" />
      <rect x="2" y="2" width="2.5" height="7" rx="0.8" fill="#ff3b30" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" aria-hidden>
      <circle cx="6.5" cy="6.5" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10 10l3.2 3.2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function ControlCenterIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 18 14" aria-hidden>
      <rect x="1" y="1" width="7" height="5" rx="1.5" fill="currentColor" />
      <rect x="10" y="1" width="7" height="5" rx="1.5" fill="currentColor" opacity="0.45" />
      <rect x="1" y="8" width="7" height="5" rx="1.5" fill="currentColor" opacity="0.45" />
      <rect x="10" y="8" width="7" height="5" rx="1.5" fill="currentColor" />
    </svg>
  )
}
