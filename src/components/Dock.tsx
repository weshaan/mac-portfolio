import { useCallback, useRef, useState } from 'react'
import { dockApps } from './dock/dockApps'
import { DockIcon } from './DockIcon'
import './Dock.css'

const ICON = 46
const GAP = 2
const PAD_X = 11
const SEP_EXTRA = 8
const MAX_SCALE = 1.45
const RANGE = 132

type Props = {
  onAppClick: (id: string) => void
}

function centersForList(listLeft: number) {
  let x = listLeft + PAD_X + ICON / 2
  return dockApps.map((app) => {
    if (app.separatorBefore) x += SEP_EXTRA
    const center = x
    x += ICON + GAP
    return center
  })
}

export function Dock({ onAppClick }: Props) {
  const railRef = useRef<HTMLDivElement>(null)
  const [scales, setScales] = useState(() => dockApps.map(() => 1))
  const [tooltip, setTooltip] = useState<string | null>(null)

  const updateScales = useCallback((clientX: number | null) => {
    const rail = railRef.current
    if (!rail || clientX === null) {
      setScales(dockApps.map(() => 1))
      return
    }

    const rect = rail.getBoundingClientRect()
    const centers = centersForList(rect.left)

    setScales(
      centers.map((center) => {
        const d = Math.abs(clientX - center)
        if (d >= RANGE) return 1
        const t = 1 - d / RANGE
        const eased = Math.pow(t, 2.1)
        return 1 + (MAX_SCALE - 1) * eased
      }),
    )
  }, [])

  return (
    <div
      className="dock-scene"
      onMouseMove={(e) => updateScales(e.clientX)}
      onMouseLeave={() => {
        setScales(dockApps.map(() => 1))
        setTooltip(null)
      }}
    >
      <div ref={railRef} className="dock">
        <ul className="dock__list">
          {dockApps.map((app, i) => {
            const scale = scales[i] ?? 1
            const lift = (scale - 1) * 18

            return (
              <li key={app.id} className={app.separatorBefore ? 'dock__item dock__item--sep' : 'dock__item'}>
                {app.separatorBefore && <span className="dock__divider" aria-hidden />}
                <button
                  type="button"
                  className="dock__btn"
                  style={{
                    width: ICON,
                    height: ICON,
                    transform: `translate3d(0, ${-lift}px, 0) scale(${scale})`,
                  }}
                  onMouseEnter={() => setTooltip(app.id)}
                  onMouseLeave={() => setTooltip(null)}
                  onFocus={() => setTooltip(app.id)}
                  onBlur={() => setTooltip(null)}
                  onClick={() => onAppClick(app.id)}
                >
                  {tooltip === app.id && <span className="dock__label">{app.label}</span>}
                  <DockIcon src={app.icon} label={app.label} />
                  {app.badge != null && <span className="dock__badge">{app.badge}</span>}
                  {app.running && <span className="dock__indicator" aria-hidden />}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
