import { useState } from 'react'
import { BrowserWindow } from './browser/BrowserWindow'
import {
  FINDER_LOCATIONS,
  FINDER_SIDEBAR,
  type FinderLaunchId,
  type FinderLocationId,
  type FinderSidebarEntry,
} from './finder/finderLocations'
import { FinderGridIcon } from './finder/FinderGridIcon'
import { getFinderItemIcon } from './finder/finderIconAssets'
import { useFinderNavigation } from './finder/useFinderNavigation'
import type { WindowPoint } from '../hooks/useDraggableWindow'
import './FinderWindow.css'

type Props = {
  windowId: string
  zIndex: number
  position: WindowPoint
  onPositionChange: (point: WindowPoint) => void
  onFocus: () => void
  onClose: () => void
  onOpenItem?: (id: FinderLaunchId) => void
}

export function FinderWindow({
  windowId,
  zIndex,
  position,
  onPositionChange,
  onFocus,
  onClose,
  onOpenItem,
}: Props) {
  const [iconScale, setIconScale] = useState(88)
  const { locationId, goTo, goBack, goForward, canGoBack, canGoForward } = useFinderNavigation('desktop')

  const location = FINDER_LOCATIONS[locationId]
  const selectedSidebarId = location.sidebarId

  const sidebar = (
    <nav className="finder-sidebar" aria-label="Finder sidebar">
      {renderSidebarSection(undefined, FINDER_SIDEBAR.filter((i) => !i.section), selectedSidebarId, goTo)}
      {renderSidebarSection(
        'Favourites',
        FINDER_SIDEBAR.filter((i) => i.section === 'favourites'),
        selectedSidebarId,
        goTo,
      )}
      {renderSidebarSection(
        'Locations',
        FINDER_SIDEBAR.filter((i) => i.section === 'locations'),
        selectedSidebarId,
        goTo,
      )}
    </nav>
  )

  const itemCount = location.items.length

  return (
    <BrowserWindow
      windowId={windowId}
      title={location.title}
      zIndex={zIndex}
      position={position}
      onPositionChange={onPositionChange}
      onFocus={onFocus}
      onClose={onClose}
      sidebar={sidebar}
      pathSegments={location.path}
      itemCount={itemCount}
      iconScale={iconScale}
      onIconScaleChange={setIconScale}
      canGoBack={canGoBack}
      canGoForward={canGoForward}
      onBack={goBack}
      onForward={goForward}
      className="finder-window"
    >
      <div className="finder-grid" style={{ ['--finder-icon-size' as string]: `${iconScale}px` }}>
        {location.items.length === 0 ? (
          <p className="finder-grid__empty">{location.emptyMessage ?? 'No items'}</p>
        ) : (
          <ul className="finder-grid__list">
            {location.items.map((entry) => {
              const key = entry.kind === 'place' ? `place-${entry.place}` : `launch-${entry.launch}`
              return (
                <li key={key}>
                  <button
                    type="button"
                    className="finder-grid__item"
                    onDoubleClick={() => {
                      if (entry.kind === 'place') goTo(entry.place)
                      else onOpenItem?.(entry.launch)
                    }}
                  >
                    <FinderGridIcon
                      src={getFinderItemIcon(entry)}
                      size={iconScale}
                      label={entry.label}
                    />
                    <span className="finder-grid__label">{entry.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </BrowserWindow>
  )
}

function renderSidebarSection(
  title: string | undefined,
  items: FinderSidebarEntry[],
  selectedId: FinderLocationId,
  onSelect: (id: FinderLocationId) => void,
) {
  if (items.length === 0) return null
  return (
    <div className="finder-sidebar__section">
      {title ? <p className="finder-sidebar__heading">{title}</p> : null}
      <ul className="finder-sidebar__list">
        {items.map((item) => {
          const selected = item.id === selectedId
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`finder-sidebar__row${selected ? ' finder-sidebar__row--selected' : ''}`}
                aria-current={selected ? 'location' : undefined}
                onClick={() => onSelect(item.id)}
              >
                <SidebarIcon kind={item.icon} />
                <span>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function SidebarIcon({ kind }: { kind: FinderSidebarEntry['icon'] }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden className="finder-sidebar__icon">
      {kind === 'clock' && (
        <>
          <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}
      {kind === 'shared' && (
        <>
          <path d="M3 6.5h7v6.5H3z" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M6 6.5V5.5h7v7.5H10" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="11.5" cy="9" r="1.2" fill="currentColor" />
        </>
      )}
      {kind === 'app' && (
        <path d="M8 3.5 12.5 12H3.5L8 3.5z" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      )}
      {kind === 'monitor' && (
        <>
          <rect x="3" y="4" width="10" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M6 13h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </>
      )}
      {kind === 'document' && (
        <>
          <path d="M5 2.5h4l2.5 2.5V13H5V2.5z" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M9 2.5V5h2.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
        </>
      )}
      {kind === 'download' && (
        <>
          <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M8 5.5v4M6 8.5l2 2 2-2" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </>
      )}
      {kind === 'photo' && (
        <>
          <rect x="3" y="4.5" width="10" height="7.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="6" cy="7" r="1" fill="currentColor" />
          <path d="M3 10.5l2.5-2 2 2 2-2 3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1" />
        </>
      )}
      {kind === 'music' && (
        <path d="M10.5 3v7a2 2 0 1 1-1-1.85V6H6v5a2 2 0 1 1-1-1.85V3h5.5z" fill="none" stroke="currentColor" strokeWidth="1.05" />
      )}
      {kind === 'film' && (
        <>
          <rect x="3.5" y="5" width="9" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.1" />
          <path d="M5.5 5v7M8 5v7M10.5 5v7" stroke="currentColor" strokeWidth="0.9" />
        </>
      )}
      {kind === 'home' && (
        <path d="M3.5 7.5 8 4l4.5 3.5V13H10v-3H6v3H3.5V7.5z" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      )}
    </svg>
  )
}
