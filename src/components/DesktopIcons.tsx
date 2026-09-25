import { FolderIcon } from './icons/FolderIcon'
import { ImagesIcon, LocalhostIcon, MoviesIcon } from './icons/DesktopCustomIcons'
import './DesktopIcons.css'

export type DesktopItemId = 'resume' | 'projects' | 'images' | 'movies' | 'localhost'

type DesktopItem = {
  id: DesktopItemId
  label: string
  icon: 'folder' | 'folder-outline' | 'images' | 'movies' | 'localhost'
}

const ICON = 44

const items: DesktopItem[] = [
  { id: 'resume', label: 'ResumeOS', icon: 'folder' },
  { id: 'projects', label: 'BUYC-Corp...lace', icon: 'folder' },
  { id: 'images', label: 'Images', icon: 'images' },
  { id: 'movies', label: 'Movies', icon: 'movies' },
  { id: 'localhost', label: 'Localhost', icon: 'localhost' },
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
              <span className="desktop-icons__icon-wrap">{renderIcon(item.icon)}</span>
              <span className="desktop-icons__label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function renderIcon(type: DesktopItem['icon']) {
  switch (type) {
    case 'folder':
      return <FolderIcon size={ICON} />
    case 'folder-outline':
      return <FolderIcon variant="outline" size={ICON} />
    case 'images':
      return <ImagesIcon size={ICON} />
    case 'movies':
      return <MoviesIcon size={ICON} />
    case 'localhost':
      return <LocalhostIcon size={ICON} />
  }
}
