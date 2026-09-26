/** PNG paths under /public/finder — regenerate on macOS via ./scripts/export-finder-icons.sh */
import type { FinderGridEntry } from './finderLocations'
import type { FinderFolderGlyph } from '../icons/FinderFolderIcon'

const GLYPH_ICONS: Record<FinderFolderGlyph, string> = {
  generic: '/finder/generic-folder.png',
  monitor: '/finder/desktop-folder.png',
  document: '/finder/documents-folder.png',
  download: '/finder/downloads-folder.png',
  film: '/finder/movie-folder.png',
  music: '/finder/music-folder.png',
  photo: '/finder/pictures-folder.png',
  person: '/finder/public-folder.png',
  app: '/finder/applications-folder.png',
}

export function getFinderItemIcon(entry: FinderGridEntry): string {
  if (entry.kind === 'launch') {
    switch (entry.launch) {
      case 'resume':
        return '/finder/resume-document.png'
      case 'mail':
        return '/finder/app-mail.png'
      case 'terminal':
        return '/finder/app-terminal.png'
      case 'settings':
        return '/finder/app-settings.png'
      case 'localhost':
        return '/finder/developer-folder.png'
      default:
        break
    }
  }

  return GLYPH_ICONS[entry.glyph]
}
