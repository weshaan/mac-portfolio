import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { DesktopIcons, type DesktopItemId } from './components/DesktopIcons'
import { Dock } from './components/Dock'
import { HelloIntro } from './components/HelloIntro'
import { LockScreen } from './components/LockScreen'
import { MacWindow } from './components/MacWindow'
import { MenuBar } from './components/MenuBar'
import { Widgets } from './components/Widgets'
import { useDesktopWindowStack } from './hooks/useDesktopWindowStack'
import './App.css'

const ResumePdfWindow = lazy(() =>
  import('./components/ResumePdfWindow').then((m) => ({ default: m.ResumePdfWindow })),
)

type WindowId = DesktopItemId | 'mail' | 'terminal' | 'profile' | 'settings'

type MacWindowId = Exclude<WindowId, 'resume'>

const windowCopy: Record<MacWindowId, { title: string; body: ReactNode }> = {
  projects: {
    title: 'Projects',
    body: (
      <>
        <h2>Projects</h2>
        <p>Featured work and case studies live in this folder. Adding screenshots, tech stack, and links to repos or demos.</p>
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
          Like what you see? Let me know at{' '}
          <a href="mailto:weshaan108@gmail.com">weshaan108@gmail.com</a>{' '}
          :)
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
        <p>
          I'm the developer. This desktop is my personal portfolio. Explore folders and dock apps to learn more ;)
        </p>
        <p>
          P.S. if you're just here for a quick look of my work, please use the quick actions widget on the right for a
          speedy peek!
        </p>
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
  const {
    openIds,
    openWindow,
    closeWindow,
    focusWindow,
    positions,
    setWindowPosition,
    zById,
  } = useDesktopWindowStack()

  const [introDone, setIntroDone] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [lockExiting, setLockExiting] = useState(false)
  const aboutWelcomeOpened = useRef(false)

  useEffect(() => {
    if (!unlocked) return
    if (aboutWelcomeOpened.current) return

    const id = window.setTimeout(() => {
      if (aboutWelcomeOpened.current) return
      aboutWelcomeOpened.current = true
      openWindow('profile')
    }, 1000)

    return () => window.clearTimeout(id)
  }, [unlocked, openWindow])

  const open = useCallback(
    (id: WindowId | null) => {
      if (id) openWindow(id)
    },
    [openWindow],
  )

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

  const desktopState = unlocked || lockExiting ? 'desktop--awake' : 'desktop--locked'

  const windowLayer = openIds.map((id) => {
    const position = positions[id] ?? { x: 80, y: 72 }
    const zIndex = zById[id] ?? 60

    if (id === 'resume') {
      return (
        <Suspense key={id} fallback={null}>
          <ResumePdfWindow
            windowId={id}
            zIndex={zIndex}
            position={position}
            onPositionChange={(p) => setWindowPosition(id, p)}
            onFocus={() => focusWindow(id)}
            onClose={() => closeWindow(id)}
          />
        </Suspense>
      )
    }

    const copy = windowCopy[id as MacWindowId]
    if (!copy) return null

    return (
      <MacWindow
        key={id}
        windowId={id}
        title={copy.title}
        zIndex={zIndex}
        position={position}
        onPositionChange={(p) => setWindowPosition(id, p)}
        onFocus={() => focusWindow(id)}
        onClose={() => closeWindow(id)}
      >
        {copy.body}
      </MacWindow>
    )
  })

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
        {windowLayer.length > 0 && <div className="desktop-windows">{windowLayer}</div>}
      </div>
    </div>
  )
}

export default App
