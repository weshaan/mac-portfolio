import { useEffect, useState } from 'react'

export function useClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const hours = now.getHours()
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hour12 = hours % 12 || 12

  const menuTime = `${hour12}:${minutes} ${ampm}`
  const widgetTime = `${hour12}:${minutes}`

  const lockHours = now.getHours().toString().padStart(2, '0')
  const lockTime = `${lockHours}:${minutes}`

  const lockDate = now
    .toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
    .replace(',', '')

  return { now, menuTime, widgetTime, lockTime, lockDate }
}
