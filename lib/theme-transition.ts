/** Theme switching with a circular "spread" reveal via the View Transitions
 * API. The new theme is clip-revealed as a growing circle from the click
 * origin. Falls back to an instant switch where unsupported or when the user
 * prefers reduced motion. Theme is a `.dark` class on <html> + localStorage,
 * matching the before-paint script in app/layout.tsx. */

export function getIsDark() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

export function toggleTheme(origin?: { x: number; y: number }): boolean {
  const next = !getIsDark()

  const apply = () => {
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
  }

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> }
  }

  if (!doc.startViewTransition || prefersReduced || !origin) {
    apply()
    return next
  }

  const root = document.documentElement
  const { x, y } = origin
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  // Drive the reveal from CSS (scoped to .theme-vt) instead of WAAPI: declaring
  // the animation up front means the new snapshot is clipped from the first
  // painted frame, so there's no unclipped "blink" before it starts.
  root.style.setProperty('--vt-x', `${x}px`)
  root.style.setProperty('--vt-y', `${y}px`)
  root.style.setProperty('--vt-r', `${endRadius}px`)
  root.classList.add('theme-vt')

  const transition = doc.startViewTransition(apply)
  transition.finished.finally(() => {
    root.classList.remove('theme-vt')
    root.style.removeProperty('--vt-x')
    root.style.removeProperty('--vt-y')
    root.style.removeProperty('--vt-r')
  })

  return next
}
