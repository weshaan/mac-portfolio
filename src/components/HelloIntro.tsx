import { useCallback, useRef, useState } from 'react'
import gsap from 'gsap'
import './HelloIntro.css'

const HELLO_SVG = '/hello/hello-en.svg'
const HELLO_TIME_SCALE = 8.2

type Props = {
  onComplete: () => void
}

type Phase = 'idle' | 'playing' | 'exiting'

export function HelloIntro({ onComplete }: Props) {
  const stageRef = useRef<HTMLDivElement>(null)
  const ctxRef = useRef<gsap.Context | null>(null)
  const finishedRef = useRef(false)
  const [phase, setPhase] = useState<Phase>('idle')

  const finishIntro = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    setPhase('exiting')
    window.setTimeout(onComplete, 760)
  }, [onComplete])

  const playHello = useCallback(async () => {
    const stage = stageRef.current
    if (!stage) return

    ctxRef.current?.revert()
    ctxRef.current = gsap.context(() => {}, stage)

    try {
      const res = await fetch(HELLO_SVG)
      if (!res.ok) throw new Error('missing hello svg')
      stage.innerHTML = await res.text()

      const svg = stage.querySelector('#hello-text')
      const ellipses = stage.querySelectorAll('ellipse')
      if (!svg || ellipses.length === 0) {
        finishIntro()
        return
      }

      await new Promise<void>((resolve) => {
        gsap.set(ellipses, { autoAlpha: 0 })
        gsap.set(svg, { scale: 0.5, transformOrigin: '50% 50%' })

        const tl = gsap.timeline({ onComplete: resolve })
        tl.to(ellipses, {
          autoAlpha: 1,
          duration: 1,
          stagger: 0.05,
          ease: 'power4.out',
        }).from(svg, { scale: 0, duration: 50, transformOrigin: '50% 50%' }, '<')

        tl.timeScale(HELLO_TIME_SCALE)
      })

      finishIntro()
    } catch {
      finishIntro()
    }
  }, [finishIntro])

  const handlePowerClick = () => {
    if (phase !== 'idle') return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      onComplete()
      return
    }

    setPhase('playing')
    void playHello()
  }

  const shellClass =
    phase === 'exiting'
      ? 'hello-intro hello-intro--exit'
      : phase === 'playing'
        ? 'hello-intro hello-intro--playing'
        : 'hello-intro'

  return (
    <div className={shellClass} aria-hidden={phase === 'exiting'}>
      <button
        type="button"
        className="hello-intro__power"
        onClick={handlePowerClick}
        disabled={phase !== 'idle'}
        aria-label="Power on"
      >
        <span className="hello-intro__power-hit">
          <span className="hello-intro__power-glow" aria-hidden />
          <span className="hello-intro__power-ring" aria-hidden />
          <PowerIcon />
        </span>
      </button>
      <div
        ref={stageRef}
        className="hello-intro__stage"
        aria-hidden={phase === 'idle'}
      />
    </div>
  )
}

function PowerIcon() {
  return (
    <svg className="hello-intro__power-icon" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 4.25v5.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <path
        d="M8.1 8.35a5.9 5.9 0 1 0 7.8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
      />
    </svg>
  )
}
