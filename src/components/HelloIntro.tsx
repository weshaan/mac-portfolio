import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './HelloIntro.css'

type Props = {
  onComplete: () => void
}

export function HelloIntro({ onComplete }: Props) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [exiting, setExiting] = useState(false)
  const finishedRef = useRef(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      onComplete()
      return
    }

    const stage = stageRef.current
    if (!stage) return

    let ctx: gsap.Context | undefined

    const run = async () => {
      try {
        const res = await fetch('/hello-text.svg')
        if (!res.ok) throw new Error('hello svg missing')
        stage.innerHTML = await res.text()
      } catch {
        onComplete()
        return
      }

      const svg = stage.querySelector('#hello-text')
      const ellipses = stage.querySelectorAll('ellipse')
      if (!svg || ellipses.length === 0) {
        onComplete()
        return
      }

      ctx = gsap.context(() => {
        gsap.set(ellipses, { autoAlpha: 0 })
        gsap.set(svg, { scale: 0.5, transformOrigin: '50% 50%' })

        const tl = gsap.timeline({
          onComplete: () => {
            if (finishedRef.current) return
            finishedRef.current = true
            setExiting(true)
            window.setTimeout(onComplete, 760)
          },
        })

        tl.to(ellipses, {
          autoAlpha: 1,
          duration: 1,
          stagger: 0.05,
          ease: 'power4.out',
        }).from(svg, { scale: 0, duration: 50, transformOrigin: '50% 50%' }, '<')

        tl.timeScale(8)
      }, stage)
    }

    void run()

    return () => {
      ctx?.revert()
    }
  }, [onComplete])

  return (
    <div className={exiting ? 'hello-intro hello-intro--exit' : 'hello-intro'} aria-hidden={exiting}>
      <div ref={stageRef} className="hello-intro__stage" />
    </div>
  )
}
