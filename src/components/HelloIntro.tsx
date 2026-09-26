import { useCallback, useRef, useState } from 'react'
import gsap from 'gsap'
import './HelloIntro.css'

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

    try {
      const res = await fetch('/hello-text.svg')
      if (!res.ok) throw new Error('hello svg missing')
      stage.innerHTML = await res.text()
    } catch {
      finishIntro()
      return
    }

    const svg = stage.querySelector('#hello-text')
    const ellipses = stage.querySelectorAll('ellipse')
    if (!svg || ellipses.length === 0) {
      finishIntro()
      return
    }

    ctxRef.current?.revert()
    ctxRef.current = gsap.context(() => {
      gsap.set(ellipses, { autoAlpha: 0 })
      gsap.set(svg, { scale: 0.5, transformOrigin: '50% 50%' })

      const tl = gsap.timeline({ onComplete: finishIntro })

      tl.to(ellipses, {
        autoAlpha: 1,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out',
      }).from(svg, { scale: 0, duration: 50, transformOrigin: '50% 50%' }, '<')

      tl.timeScale(8)
    }, stage)
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
        <span className="hello-intro__power-glow" aria-hidden />
        <span className="hello-intro__power-ring" aria-hidden />
        <PowerIcon />
      </button>
      <div ref={stageRef} className="hello-intro__stage" aria-hidden={phase === 'idle'} />
    </div>
  )
}

function PowerIcon() {
  return (
    <svg className="hello-intro__power-icon" width="28" height="28" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M7.5 6.2a6.5 6.5 0 1010 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}
