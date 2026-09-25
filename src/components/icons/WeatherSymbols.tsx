export function PartlyCloudyIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="9" cy="9" r="4" fill="#fcd34d" />
      <path
        d="M6 17h11a4 4 0 00.4-8 5.5 5.5 0 00-10.6 1.8A3.5 3.5 0 006 17z"
        fill="rgba(255,255,255,0.9)"
      />
    </svg>
  )
}

export function CloudIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M6 18h12a4 4 0 00.3-8 5.5 5.5 0 00-10.5 2.2A3.5 3.5 0 006 18z"
        fill="rgba(255,255,255,0.88)"
      />
    </svg>
  )
}

export function MoonIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M14 4a7 7 0 108 8 6 6 0 01-8-8z"
        fill="rgba(255,255,255,0.85)"
      />
    </svg>
  )
}
