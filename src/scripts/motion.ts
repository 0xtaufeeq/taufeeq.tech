import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ------------------------------------------------------------------ */
/* Smooth scroll — one Lenis instance driven by GSAP's ticker so it   */
/* stays in lockstep with every ScrollTrigger on the site.            */
/* ------------------------------------------------------------------ */

let lenis: Lenis | undefined

function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return

  lenis = new Lenis({ duration: 1.1, smoothWheel: true })
  window.__lenis = lenis

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}

/* ------------------------------------------------------------------ */
/* Custom cursor — desktop pointers only. A dot that sticks to the    */
/* pointer and a trailing ring that swells over interactive elements. */
/* The body is replaced on every view transition, so the cursor DOM   */
/* is rebuilt per page while the window listeners live once.          */
/* ------------------------------------------------------------------ */

let dotX: ((v: number) => void) | undefined
let dotY: ((v: number) => void) | undefined
let ringX: ((v: number) => void) | undefined
let ringY: ((v: number) => void) | undefined
let ring: HTMLElement | undefined
let cursorListenersBound = false

const INTERACTIVE = 'a, button, [role="button"], [data-cursor]'

function buildCursor() {
  if (prefersReducedMotion()) return
  if (!window.matchMedia('(pointer: fine)').matches) return
  if (document.getElementById('site-cursor')) return

  const root = document.createElement('div')
  root.id = 'site-cursor'
  root.setAttribute('aria-hidden', 'true')
  root.innerHTML =
    '<div class="cursor-dot"></div><div class="cursor-ring"></div>'
  document.body.appendChild(root)
  document.documentElement.classList.add('has-custom-cursor')

  const dot = root.querySelector<HTMLElement>('.cursor-dot')!
  ring = root.querySelector<HTMLElement>('.cursor-ring')!

  // Stay hidden until the pointer actually moves
  gsap.set(root, { autoAlpha: 0 })
  gsap.set([dot, ring], { x: -100, y: -100 })

  dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' })
  dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' })
  ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
  ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

  if (cursorListenersBound) return
  cursorListenersBound = true

  window.addEventListener('pointermove', (event) => {
    const cursorRoot = document.getElementById('site-cursor')
    if (cursorRoot && cursorRoot.dataset.shown !== '1') {
      cursorRoot.dataset.shown = '1'
      gsap.to(cursorRoot, { autoAlpha: 1, duration: 0.2 })
    }
    dotX?.(event.clientX)
    dotY?.(event.clientY)
    ringX?.(event.clientX)
    ringY?.(event.clientY)
  })

  document.addEventListener('mouseover', (event) => {
    if (!ring) return
    const target = (event.target as Element | null)?.closest?.(INTERACTIVE)
    gsap.to(ring, {
      scale: target ? 2.2 : 1,
      opacity: target ? 0.45 : 1,
      duration: 0.3,
      ease: 'power2.out'
    })
  })

  window.addEventListener('pointerdown', () => {
    if (ring) gsap.to(ring, { scale: 0.8, duration: 0.15 })
  })
  window.addEventListener('pointerup', () => {
    if (ring) gsap.to(ring, { scale: 1, duration: 0.3, ease: 'back.out(2)' })
  })
}

/* ------------------------------------------------------------------ */
/* Magnetic elements — anything with [data-magnetic] leans toward the */
/* pointer while it hovers and springs back on leave.                 */
/* ------------------------------------------------------------------ */

function initMagnetic() {
  if (prefersReducedMotion()) return
  if (!window.matchMedia('(pointer: fine)').matches) return

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    if (el.dataset.magneticBound) return
    el.dataset.magneticBound = '1'

    const strength = Number(el.dataset.magneticStrength ?? 0.35)
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })

    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect()
      xTo((event.clientX - rect.left - rect.width / 2) * strength)
      yTo((event.clientY - rect.top - rect.height / 2) * strength)
    })
    el.addEventListener('pointerleave', () => {
      xTo(0)
      yTo(0)
    })
  })
}

/* ------------------------------------------------------------------ */
/* Page transition — one continuous space. Nothing covers the screen  */
/* and nothing says "loading": the canvas, noise and dock stay put    */
/* while the content itself glides — the old page drifts off in the   */
/* direction of travel and the new one glides in from the other side, */
/* like the camera panning to a different place. Direction-aware:     */
/* browser back reverses the glide. Exit + fetch run in parallel.     */
/* ------------------------------------------------------------------ */

const GLIDE = 90

const getPageTargets = () =>
  ['main', 'footer'].flatMap((selector) =>
    Array.from(document.querySelectorAll<HTMLElement>(selector))
  )

let travelDirection: 'forward' | 'back' = 'forward'
let glideArrival: gsap.core.Tween | undefined

function bindPageTransition() {
  document.addEventListener('astro:before-preparation', (event) => {
    if (prefersReducedMotion()) return

    const preparation = event as Event & {
      direction: 'forward' | 'back'
      loader: () => Promise<void>
    }
    travelDirection = preparation.direction === 'back' ? 'back' : 'forward'
    const departure = travelDirection === 'back' ? GLIDE : -GLIDE

    const originalLoader = preparation.loader
    preparation.loader = async () => {
      // The departure glide and the page fetch run in parallel — the swap
      // waits for whichever finishes last instead of paying for both.
      const exit = gsap
        .to(getPageTargets(), {
          y: departure,
          opacity: 0,
          duration: 0.32,
          ease: 'power2.in',
          overwrite: true
        })
        .then()
      await Promise.all([exit, originalLoader()])
    }
  })

  // The new document arrives at rest — stage it just beyond the direction
  // of travel before first paint so arrival reads as continuous motion.
  document.addEventListener('astro:after-swap', () => {
    if (prefersReducedMotion()) return
    const arrival = travelDirection === 'back' ? -GLIDE : GLIDE
    const targets = getPageTargets()
    targets.forEach((el) => (el.dataset.gliding = '1'))
    gsap.set(targets, { y: arrival, opacity: 0 })
  })
}

function glideIn() {
  const targets = getPageTargets().filter((el) => el.dataset.gliding === '1')
  if (!targets.length) return
  targets.forEach((el) => delete el.dataset.gliding)

  glideArrival?.kill()
  glideArrival = gsap.to(targets, {
    y: 0,
    opacity: 1,
    duration: 0.85,
    ease: 'expo.out',
    clearProps: 'all',
    overwrite: true
  })
}

bindPageTransition()

/* ------------------------------------------------------------------ */
/* Lifecycle                                                           */
/* ------------------------------------------------------------------ */

document.addEventListener('astro:page-load', () => {
  initSmoothScroll()
  buildCursor()
  initMagnetic()
  glideIn()
  // The router restores scroll natively; make sure Lenis agrees with it
  lenis?.scrollTo(window.scrollY, { immediate: true, force: true })
  ScrollTrigger.refresh()
})

document.addEventListener('astro:before-swap', () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
