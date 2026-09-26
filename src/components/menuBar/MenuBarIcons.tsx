import type { ReactNode } from 'react'

type GlyphProps = {
  className?: string
  size?: number
  viewBox?: string
  children: ReactNode
}

function Glyph({ className, size = 16, viewBox = '0 0 16 16', children }: GlyphProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {children}
    </svg>
  )
}

type SystemIconProps = {
  className?: string
  width: number
  height: number
  viewBox: string
  paths: string[]
}

function SystemIcon({ className, width, height, viewBox, paths }: SystemIconProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {paths.map((d, i) => (
        <path key={i} fill="currentColor" d={d} />
      ))}
    </svg>
  )
}

/** weshaanOS menu mark — smile face (see src/assets/menu-bar/smile.svg) */
const SMILE_FACE = {
  mouth: 'M9.5 16.5c1.8 2.4 3.8 3.5 4.5 3.5s2.7-1.1 4.5-3.5',
  eyes: 'M10.25 12a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Zm7.5 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z',
}

/** SF Symbol `wifi` — exported via sfsym (see src/assets/menu-bar/wifi.svg) */
const WIFI_PATHS = [
  'M4.0349 14.4884 C4.2674 14.7093 4.593 14.7093 4.814 14.4768 C7.6744 11.4419 11.4419 9.8372 15.6628 9.8372 C19.907 9.8372 23.6977 11.4535 26.5349 14.4884 C26.7442 14.6977 27.0581 14.6861 27.2907 14.4651 L28.8953 12.8605 C29.1046 12.6512 29.093 12.3954 28.9302 12.1977 C26.1976 8.8256 21.0581 6.3489 15.6628 6.3489 C10.2791 6.3489 5.1163 8.8256 2.3954 12.1977 C2.2326 12.3954 2.2326 12.6512 2.4302 12.8605 Z',
  'M8.8605 19.3488 C9.1163 19.593 9.4302 19.5581 9.6628 19.3023 C11.0581 17.7558 13.3372 16.6279 15.6628 16.6395 C18.0116 16.6279 20.2907 17.7907 21.7093 19.3372 C21.9186 19.5814 22.2093 19.5698 22.4651 19.3372 L24.2674 17.5465 C24.4535 17.3605 24.4767 17.1047 24.3023 16.8954 C22.5465 14.7442 19.2907 13.1279 15.6628 13.1279 C12.0349 13.1279 8.7791 14.7442 7.0233 16.8954 C6.8488 17.1047 6.8605 17.3372 7.0581 17.5465 Z',
  'M15.6628 25.6744 C15.9186 25.6744 16.1395 25.5581 16.593 25.1163 L19.4302 22.3954 C19.6046 22.2209 19.6512 21.9651 19.4884 21.7558 C18.7325 20.7791 17.3023 19.9302 15.6628 19.9302 C13.9767 19.9302 12.5465 20.814 11.7907 21.8256 C11.6744 22.0116 11.7209 22.2209 11.907 22.3954 L14.7325 25.1163 C15.186 25.5465 15.407 25.6744 15.6628 25.6744 Z',
]

const BLUETOOTH_PATH =
  'M14.88,16.29L13,18.17V14.41M13,5.83L14.88,7.71L13,9.58M17.71,7.71L12,2H11V9.58L6.41,5L5,6.41L10.59,12L5,17.58L6.41,19L11,14.41V22H12L17.71,16.29L13.41,12L17.71,7.71Z'

export function AppleMenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={14}
      height={14}
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="14" cy="14" r="11" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path fill="currentColor" d={SMILE_FACE.eyes} />
      <path
        d={SMILE_FACE.mouth}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function WifiMenuIcon({ className }: { className?: string }) {
  return (
    <SystemIcon
      className={className}
      width={17}
      height={13}
      viewBox="1.7326 5.8489 27.872 20.3255"
      paths={WIFI_PATHS}
    />
  )
}

export function BluetoothMenuIcon({ className }: { className?: string }) {
  return (
    <SystemIcon
      className={className}
      width={17}
      height={20}
      viewBox="0 0 24 24"
      paths={[BLUETOOTH_PATH]}
    />
  )
}

/** Privacy / mic-in-use pill (mic.fill style) */
export function MicPillIcon({ className }: { className?: string }) {
  return (
    <Glyph className={className} size={12} viewBox="0 0 12 14">
      <rect x="4.25" y="0.75" width="3.5" height="6.5" rx="1.75" fill="currentColor" />
      <path
        d="M2.25 6.75a3.75 3.75 0 007.5 0"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M6 10.25v2.25M4.25 12.5h3.5"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </Glyph>
  )
}

/** Screen capture / recording indicator (dashed viewfinder) */
export function ScreenCaptureMenuIcon({ className }: { className?: string }) {
  return (
    <Glyph className={className} size={15} viewBox="0 0 16 16">
      <rect
        x="3"
        y="3"
        width="10"
        height="10"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeDasharray="2.2 1.8"
        strokeLinejoin="round"
      />
      <path
        d="M6 3V5M10 3V5M6 13V15M10 13V15"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </Glyph>
  )
}

/** Night weather — cloud + moon (menu bar widget style) */
export function WeatherMenuIcon({ className }: { className?: string }) {
  return (
    <Glyph className={className} size={18} viewBox="0 0 20 14">
      <circle cx="14.5" cy="3.8" r="3.1" fill="currentColor" />
      <path
        d="M4.5 10.8h9.8a3.4 3.4 0 100-6.75 4.4 4.4 0 00-8.55-1.05A3.7 3.7 0 004.5 10.8z"
        fill="currentColor"
      />
    </Glyph>
  )
}

/** macOS menu bar battery — outline + red low fill */
export function BatteryMenuIcon({ className, level = 80 }: { className?: string; level?: number }) {
  const fillW = Math.max(1.2, (16 * level) / 100)
  const fillColor = level <= 20 ? '#ff453a' : 'currentColor'
  return (
    <svg
      className={className}
      width={22}
      height={10}
      viewBox="0 0 26 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="0.75"
        y="0.75"
        width="21.5"
        height="10.5"
        rx="2.4"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect x="23" y="3.75" width="2.25" height="4.5" rx="0.65" fill="currentColor" />
      <rect x="2.25" y="2.25" width={fillW} height="7.5" rx="1" fill={fillColor} />
    </svg>
  )
}

/** Control Center — twin vertical sliders (macOS menu bar glyph) */
export function ControlCenterMenuIcon({ className }: { className?: string }) {
  return (
    <Glyph className={className} size={16} viewBox="0 0 16 12">
      <rect x="1" y="0.75" width="5.5" height="10.5" rx="2.75" stroke="currentColor" strokeWidth="1" />
      <line x1="2.2" y1="6" x2="5.3" y2="6" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
      <rect x="9.5" y="0.75" width="5.5" height="10.5" rx="2.75" stroke="currentColor" strokeWidth="1" />
      <line x1="10.7" y1="6" x2="13.8" y2="6" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
    </Glyph>
  )
}
