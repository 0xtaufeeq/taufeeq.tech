'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SplitType from 'split-type'

gsap.registerPlugin(useGSAP)

/**
 * Staggered per-character hero reveal: split-type breaks the headline into
 * chars, each rising from y:400 behind its word's clip box (.hero-title .word
 * in globals.css).
 *
 * Initial states are set from JS (gsap.fromTo), NOT pre-hidden in CSS — the
 * server-rendered headline must stay visible before hydration or the LCP
 * regresses to hydration time.
 */
export function HeroTitle() {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const split = new SplitType(ref.current, { types: 'words,chars' })

      // background-clip: text doesn't paint through transformed children, so
      // the gradient moves from the wrapper span down onto its split chars
      ref.current
        .querySelectorAll('[data-gradient] .char')
        .forEach((char) => char.classList.add('text-primary-gradient'))

      gsap.fromTo(
        split.chars,
        { y: 400 },
        {
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.02,
          delay: 0.1
        }
      )

      return () => split.revert()
    },
    { scope: ref }
  )

  return (
    <h1
      ref={ref}
      className="hero-title display text-[clamp(2.25rem,7.5vw,4rem)] leading-[1.05] text-ink"
    >
      Hi, I&apos;m{' '}
      <span data-gradient className="italic text-accent">
        Taufeeq Riyaz.
      </span>
      <br />
      I think deeply about <span className="font-light italic">
        why things work.
      </span>
    </h1>
  )
}
