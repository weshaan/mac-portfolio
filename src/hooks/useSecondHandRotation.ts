import { useEffect, useRef, useState } from 'react'

/** Always moves forward; 0s → 0° mod 360 (top), 59s → 354°, then 360° not 0°. */
export function useSecondHandRotation(seconds: number) {
  const [rotation, setRotation] = useState(() => seconds * 6)
  const prevSecondsRef = useRef(seconds)

  useEffect(() => {
    const prev = prevSecondsRef.current
    if (seconds === prev) return

    let step = seconds - prev
    if (step <= 0) step += 60

    setRotation((r) => r + step * 6)

    prevSecondsRef.current = seconds
  }, [seconds])

  return rotation
}
