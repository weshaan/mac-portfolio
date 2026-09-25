type Size = { size?: number }

export function ImagesIcon({ size = 64 }: Size) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden className="desktop-folder">
      <rect x="8" y="12" width="48" height="40" rx="8" fill="rgba(255,255,255,0.28)" stroke="rgba(0,0,0,0.55)" strokeWidth="1.5" />
      <circle cx="21" cy="24" r="4.5" fill="rgba(0,0,0,0.7)" />
      <path d="M10 46 L26 30 L38 38 L54 22 V46 H10 Z" fill="rgba(0,0,0,0.55)" />
    </svg>
  )
}

export function MoviesIcon({ size = 64 }: Size) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden className="desktop-folder">
      <rect x="6" y="16" width="52" height="36" rx="5" fill="rgba(255,255,255,0.22)" stroke="rgba(0,0,0,0.6)" strokeWidth="1.5" />
      <path d="M16 16v36M24 16v36M32 16v36M40 16v36" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" />
      <path d="M46 32l10-6v12l-10-6z" fill="rgba(0,0,0,0.65)" />
    </svg>
  )
}

export function LocalhostIcon({ size = 64 }: Size) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden className="desktop-folder">
      <rect x="8" y="8" width="48" height="48" rx="12" fill="rgba(255,255,255,0.26)" stroke="rgba(0,0,0,0.55)" strokeWidth="1.5" />
      <text x="32" y="38" textAnchor="middle" fontSize="15" fontFamily="ui-monospace, SF Mono, Menlo, monospace" fontWeight="600" fill="rgba(0,0,0,0.75)">
        {'</>'}
      </text>
    </svg>
  )
}
