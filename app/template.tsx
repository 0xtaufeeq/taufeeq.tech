/**
 * Continuous-glide page transition: no overlay, nothing that feels like
 * loading — content glides up with an expo ease. CSS-only (see .page-glide)
 * so first paint never waits for JS hydration; the template remounts on
 * navigation, retriggering the animation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-glide">{children}</div>
}
