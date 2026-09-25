import { useId } from 'react'

type Props = {
  variant?: 'blue' | 'outline'
  size?: number
}

export function FolderIcon({ variant = 'blue', size = 64 }: Props) {
  const id = useId().replace(/:/g, '')

  if (variant === 'outline') {
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden className="desktop-folder">
        <rect x="6" y="16" width="52" height="40" rx="5" fill="rgba(255,255,255,0.22)" stroke="rgba(0,0,0,0.65)" strokeWidth="1.5" />
        <path d="M6 22h14l4-6h34v4H6z" fill="rgba(255,255,255,0.35)" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden className="desktop-folder">
      <defs>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8ec8ff" />
          <stop offset="100%" stopColor="#5aa8ef" />
        </linearGradient>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6db4f5" />
          <stop offset="100%" stopColor="#3d8fd9" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#000" floodOpacity="0.2" />
        </filter>
      </defs>
      <g filter={`url(#${id}-shadow)`}>
        <path
          d="M4 18c0-2.2 1.8-4 4-4h13l3.5 5.5H52c2.2 0 4 1.8 4 4v27c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V18z"
          fill={`url(#${id}-body)`}
        />
        <path d="M4 24h56v26c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V24z" fill="#4a9de8" opacity="0.35" />
        <path
          d="M8 14h13l3.5 5.5H52c2.2 0 4 1.8 4 4v2H4v-2c0-2.2 1.8-4 4-4z"
          fill={`url(#${id}-top)`}
        />
        <path d="M8 14h13l3.5 5.5H52" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.75" />
      </g>
    </svg>
  )
}
