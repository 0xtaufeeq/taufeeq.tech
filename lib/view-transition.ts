/**
 * Codegrid-style slide-up reveal, driven by the Web Animations API against
 * the View Transition pseudo-elements (see the ::view-transition rules in
 * globals.css that fix the default stacking order).
 *
 * Old page: drifts up and dims. New page: unclips from the bottom edge.
 */
export function slideInOut() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const easing = 'cubic-bezier(0.87, 0, 0.13, 1)'

  document.documentElement.animate(
    [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0.2, transform: 'translateY(-35%)' }
    ],
    {
      duration: 1500,
      easing,
      fill: 'forwards',
      pseudoElement: '::view-transition-old(root)'
    }
  )

  document.documentElement.animate(
    [
      { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
    ],
    {
      duration: 1500,
      easing,
      fill: 'forwards',
      pseudoElement: '::view-transition-new(root)'
    }
  )
}
