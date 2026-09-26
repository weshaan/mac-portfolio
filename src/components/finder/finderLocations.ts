import type { DesktopItemId } from '../DesktopIcons'
import type { PathSegment } from '../browser/BrowserWindow'
import type { FinderFolderGlyph } from '../icons/FinderFolderIcon'

export type FinderLocationId =
  | 'recents'
  | 'shared'
  | 'applications'
  | 'desktop'
  | 'documents'
  | 'downloads'
  | 'pictures'
  | 'music'
  | 'movies-nav'
  | 'home'

export type FinderLaunchId = DesktopItemId | 'mail' | 'terminal' | 'profile' | 'settings'

export type FinderGridEntry =
  | {
      kind: 'place'
      label: string
      glyph: FinderFolderGlyph
      place: FinderLocationId
    }
  | {
      kind: 'launch'
      label: string
      glyph: FinderFolderGlyph
      launch: FinderLaunchId
      /** Shown as document icon style in grid (future); for now same folder chrome */
      variant?: 'folder'
    }

type FinderLocation = {
  title: string
  sidebarId: FinderLocationId
  path: PathSegment[]
  items: FinderGridEntry[]
  emptyMessage?: string
}

const HOME_BASE: PathSegment[] = [
  { label: 'Macintosh HD', icon: 'hd' },
  { label: 'Users', icon: 'folder' },
  { label: 'weshaan', icon: 'home' },
]

function userPath(folder: string): PathSegment[] {
  return [...HOME_BASE, { label: folder, icon: 'folder' }]
}

export const FINDER_LOCATIONS: Record<FinderLocationId, FinderLocation> = {
  recents: {
    title: 'Recents',
    sidebarId: 'recents',
    path: [{ label: 'Recents', icon: 'folder' }],
    items: [
      { kind: 'launch', label: 'Projects', glyph: 'generic', launch: 'projects' },
      { kind: 'launch', label: 'Images', glyph: 'photo', launch: 'images' },
      { kind: 'launch', label: 'Resume', glyph: 'document', launch: 'resume' },
      { kind: 'launch', label: 'Movies', glyph: 'film', launch: 'movies' },
    ],
  },
  shared: {
    title: 'Shared',
    sidebarId: 'shared',
    path: [{ label: 'Shared', icon: 'folder' }],
    items: [],
    emptyMessage: 'No shared items',
  },
  applications: {
    title: 'Applications',
    sidebarId: 'applications',
    path: [{ label: 'Applications', icon: 'folder' }],
    items: [
      { kind: 'launch', label: 'Mail', glyph: 'generic', launch: 'mail' },
      { kind: 'launch', label: 'Terminal', glyph: 'generic', launch: 'terminal' },
      { kind: 'launch', label: 'System Settings', glyph: 'app', launch: 'settings' },
    ],
  },
  desktop: {
    title: 'Desktop',
    sidebarId: 'desktop',
    path: userPath('Desktop'),
    items: [
      { kind: 'launch', label: 'Projects', glyph: 'generic', launch: 'projects' },
      { kind: 'launch', label: 'Images', glyph: 'photo', launch: 'images' },
      { kind: 'launch', label: 'Movies', glyph: 'film', launch: 'movies' },
      { kind: 'launch', label: 'Localhost', glyph: 'generic', launch: 'localhost' },
    ],
  },
  documents: {
    title: 'Documents',
    sidebarId: 'documents',
    path: userPath('Documents'),
    items: [{ kind: 'launch', label: 'Resume', glyph: 'document', launch: 'resume' }],
  },
  downloads: {
    title: 'Downloads',
    sidebarId: 'downloads',
    path: userPath('Downloads'),
    items: [],
    emptyMessage: 'No items in Downloads',
  },
  pictures: {
    title: 'Pictures',
    sidebarId: 'pictures',
    path: userPath('Pictures'),
    items: [{ kind: 'launch', label: 'Images', glyph: 'photo', launch: 'images' }],
  },
  music: {
    title: 'Music',
    sidebarId: 'music',
    path: userPath('Music'),
    items: [],
    emptyMessage: 'No music yet',
  },
  'movies-nav': {
    title: 'Movies',
    sidebarId: 'movies-nav',
    path: userPath('Movies'),
    items: [{ kind: 'launch', label: 'Movies', glyph: 'film', launch: 'movies' }],
  },
  home: {
    title: 'weshaan',
    sidebarId: 'home',
    path: HOME_BASE,
    items: [
      { kind: 'place', label: 'Desktop', glyph: 'monitor', place: 'desktop' },
      { kind: 'place', label: 'Documents', glyph: 'document', place: 'documents' },
      { kind: 'place', label: 'Downloads', glyph: 'download', place: 'downloads' },
      { kind: 'place', label: 'Movies', glyph: 'film', place: 'movies-nav' },
      { kind: 'place', label: 'Music', glyph: 'music', place: 'music' },
      { kind: 'place', label: 'Pictures', glyph: 'photo', place: 'pictures' },
      { kind: 'place', label: 'Public', glyph: 'person', place: 'shared' },
      { kind: 'place', label: 'Applications', glyph: 'app', place: 'applications' },
    ],
  },
}

export type FinderSidebarEntry = {
  id: FinderLocationId
  label: string
  icon: 'clock' | 'shared' | 'app' | 'monitor' | 'document' | 'download' | 'photo' | 'music' | 'film' | 'home'
  section?: 'favourites' | 'locations'
}

export const FINDER_SIDEBAR: FinderSidebarEntry[] = [
  { id: 'recents', label: 'Recents', icon: 'clock' },
  { id: 'shared', label: 'Shared', icon: 'shared' },
  { id: 'applications', label: 'Applications', icon: 'app', section: 'favourites' },
  { id: 'desktop', label: 'Desktop', icon: 'monitor', section: 'favourites' },
  { id: 'documents', label: 'Documents', icon: 'document', section: 'favourites' },
  { id: 'downloads', label: 'Downloads', icon: 'download', section: 'favourites' },
  { id: 'pictures', label: 'Pictures', icon: 'photo', section: 'favourites' },
  { id: 'music', label: 'Music', icon: 'music', section: 'favourites' },
  { id: 'movies-nav', label: 'Movies', icon: 'film', section: 'favourites' },
  { id: 'home', label: 'weshaan', icon: 'home', section: 'locations' },
]
