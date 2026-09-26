import { useId } from 'react'

export type FinderFolderGlyph = 'generic' | 'monitor' | 'document' | 'download' | 'film' | 'music' | 'photo' | 'person' | 'app'

type Props = {
  glyph?: FinderFolderGlyph
  size?: number
}

export function FinderFolderIcon({ glyph = 'generic', size = 64 }: Props) {
  const id = useId().replace(/:/g, '')

  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden className="finder-folder-icon">
      <defs>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9fd0ff" />
          <stop offset="100%" stopColor="#6db4f5" />
        </linearGradient>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#72b8f7" />
          <stop offset="100%" stopColor="#3d8fd9" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter={`url(#${id}-shadow)`}>
        <path
          d="M4 18c0-2.2 1.8-4 4-4h13l3.5 5.5H52c2.2 0 4 1.8 4 4v27c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V18z"
          fill={`url(#${id}-body)`}
        />
        <path d="M4 24h56v26c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V24z" fill="#4a9de8" opacity="0.32" />
        <path
          d="M8 14h13l3.5 5.5H52c2.2 0 4 1.8 4 4v2H4v-2c0-2.2 1.8-4 4-4z"
          fill={`url(#${id}-top)`}
        />
      </g>
      <g fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
        {glyph === 'monitor' && (
          <>
            <rect x="18" y="24" width="28" height="18" rx="2" />
            <path d="M26 46h12M32 42v4" />
          </>
        )}
        {glyph === 'document' && (
          <>
            <path d="M24 22h12l4 4v18H24V22z" />
            <path d="M36 22v4h4" />
            <path d="M27 30h10M27 34h10M27 38h7" strokeWidth="1.1" opacity="0.85" />
          </>
        )}
        {glyph === 'download' && (
          <>
            <circle cx="32" cy="32" r="11" />
            <path d="M32 26v8M28.5 31.5 32 35l3.5-3.5" />
          </>
        )}
        {glyph === 'film' && (
          <>
            <rect x="20" y="24" width="24" height="18" rx="2" />
            <path d="M24 24v18M28 24v18M36 24v18M40 24v18" strokeWidth="1" />
          </>
        )}
        {glyph === 'music' && (
          <>
            <path d="M38 22v16.5a3.5 3.5 0 1 1-2-3.2V26H26v12.5a3.5 3.5 0 1 1-2-3.2V22h14z" />
          </>
        )}
        {glyph === 'photo' && (
          <>
            <rect x="20" y="26" width="24" height="16" rx="2" />
            <circle cx="27" cy="31" r="2" fill="rgba(255,255,255,0.9)" stroke="none" />
            <path d="M22 38l6-6 5 5 3-3 6 7" />
          </>
        )}
        {glyph === 'person' && (
          <>
            <circle cx="32" cy="28" r="3.5" />
            <path d="M24 42c1.5-5 14.5-5 16 0" />
          </>
        )}
        {glyph === 'app' && (
          <>
            <path d="M32 22l8 14H24l8-14z" />
            <path d="M26 36h12" />
          </>
        )}
      </g>
    </svg>
  )
}
