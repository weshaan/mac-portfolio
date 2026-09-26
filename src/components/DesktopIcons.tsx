import { FolderIcon } from './icons/FolderIcon'
import './DesktopIcons.css'

export type DesktopItemId = 'resume' | 'projects' | 'images' | 'movies' | 'localhost'

type DesktopItem = {
  id: DesktopItemId
  label: string
}

const ICON = 44

const items: DesktopItem[] = [
  { id: 'resume', label: 'Resume' },
  { id: 'projects', label: 'BUYC-Corp...lace' },
  { id: 'images', label: 'Images' },
  { id: 'movies', label: 'Movies' },
  { id: 'localhost', label: 'Localhost' },
]

type Props = {
  onOpen: (id: DesktopItemId) => void
}

export function DesktopIcons({ onOpen }: Props) {
  return (
    <div className="desktop-icons">
      <ul className="desktop-icons__list">
        {items.map((item) => (
          <li key={item.id}>
            <button type="button" className="desktop-icons__item" onClick={() => onOpen(item.id)}>
              <span className="desktop-icons__icon-wrap">
                {item.id === 'resume' ? (
                  <img
                    src="/desktop/resume-pdf.png"
                    alt=""
                    className="desktop-icons__file-icon"
                    width={ICON}
                    height={ICON}
                    draggable={false}
                  />
                ) : (
                  <FolderIcon size={ICON} />
                )}
              </span>
              <span className="desktop-icons__label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
