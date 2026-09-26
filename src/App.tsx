import { useCallback, useState, type ReactNode } from 'react'
import { DesktopIcons, type DesktopItemId } from './components/DesktopIcons'
import { Dock } from './components/Dock'
import { HelloIntro } from './components/HelloIntro'
import { LockScreen } from './components/LockScreen'
import { MacWindow } from './components/MacWindow'
import { ResumePdfWindow } from './components/ResumePdfWindow'
import { MenuBar } from './components/MenuBar'
import { Widgets } from './components/Widgets'
import './App.css'

type WindowId = DesktopItemId | 'mail' | 'terminal' | 'profile' | 'settings' | null

type MacWindowId = Exclude<WindowId, null | 'resume'>

const windowCopy: Record<MacWindowId, { title: string; body: ReactNode }> = {
  projects: {
    title: 'BUYC-Corp Marketplace',
    body: (
      <>
        <h2>Projects</h2>
        <p>Featured work and case studies live in this folder. Add screenshots, tech stack, and links to repos or demos.</p>
      </>
    ),
  },
  images: {
    title: 'Images',
    body: (
      <>
        <h2>Gallery</h2>
        <p>Photography, design work, or project visuals — grid or carousel can go here.</p>
      </>
    ),
  },
  movies: {
    title: 'Movies',
    body: (
      <>
        <h2>Motion</h2>
        <p>Reels, demos, and video projects — embed players or link to your channel.</p>
      </>
    ),
  },
  localhost: {
    title: 'Localhost',
    body: (
      <>
        <h2>Dev server</h2>
        <p>Local experiments, APIs, and side projects. Point dock Terminal here for a CLI aesthetic.</p>
      </>
    ),
  },
  mail: {
    title: 'Mail',
    body: (
      <>
        <h2>Contact</h2>
        <p>
          Reach out at{' '}
          <a href="mailto:hello@example.com">hello@example.com</a>
          — replace with your address.
        </p>
      </>
    ),
  },
  terminal: {
    title: 'Terminal',
    body: (
      <pre className="terminal-preview">
        {`$ whoami
weshaan
$ ls projects/
marketplace/  portfolio/  experiments/
$ echo "Let's build something."
Let's build something.`}
      </pre>
    ),
  },
  profile: {
    title: 'About',
    body: (
      <>
        <h2>Hello</h2>
        <p>I'm a developer. This desktop is my portfolio home screen — explore folders and dock apps to learn more.</p>
      </>
    ),
  },
  settings: {
    title: 'System Settings',
    body: (
      <>
        <h2>weshaanOS</h2>
        <p>Appearance, dock, and desktop preferences — customize this portfolio shell here.</p>
        <ul>
          <li>Wallpaper: Mikasa</li>
          <li>Menu bar: maroon glass</li>
          <li>Dock magnification: on</li>
        </ul>
      </>
    ),
  },
}

function App() {
  const [openWindow, setOpenWindow] = useState<WindowId>(null)
  const [introDone, setIntroDone] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [lockExiting, setLockExiting] = useState(false)

  const open = useCallback((id: WindowId) => setOpenWindow(id), [])
  const close = useCallback(() => setOpenWindow(null), [])

  const handleUnlock = useCallback(() => {
    if (lockExiting || unlocked) return
    setLockExiting(true)
    window.setTimeout(() => {
      setUnlocked(true)
      setLockExiting(false)
    }, 1000)
  }, [lockExiting, unlocked])

  const handleDock = (id: string) => {
    switch (id) {
      case 'mail':
        open('mail')
        break
      case 'terminal':
        open('terminal')
        break
      case 'vscode':
        open('localhost')
        break
      case 'finder':
        open('resume')
        break
      case 'notes':
        open('projects')
        break
      case 'settings':
        open('settings')
        break
      case 'calendar':
        open('projects')
        break
      case 'brave':
      case 'slack':
      case 'whatsapp':
        open('profile')
        break
      default:
        break
    }
  }

  const active =
    openWindow && openWindow !== 'resume' ? windowCopy[openWindow as MacWindowId] : null

  const desktopState = unlocked || lockExiting ? 'desktop--awake' : 'desktop--locked'

  return (
    <div className={`desktop ${desktopState}`}>
      {!unlocked && <LockScreen onUnlock={handleUnlock} exiting={lockExiting} />}
      {!introDone && <HelloIntro onComplete={() => setIntroDone(true)} />}
      <div className="desktop__session">
        <div className="desktop__wallpaper" role="presentation" />
        <MenuBar />
        <div className="desktop__chrome">
          <DesktopIcons onOpen={open} />
          <Widgets
            onReminder={(action) => {
              if (action === 'resume') open('resume')
              else if (action === 'profile') open('profile')
              else if (action === 'projects') open('projects')
              else open('mail')
            }}
          />
        </div>
        <Dock onAppClick={handleDock} />
        {openWindow === 'resume' && <ResumePdfWindow onClose={close} />}
        {active && (
          <MacWindow title={active.title} onClose={close}>
            {active.body}
          </MacWindow>
        )}
      </div>
    </div>
  )
}

export default App
