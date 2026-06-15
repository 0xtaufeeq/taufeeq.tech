/**
 * Editorial hero backdrop — a faint dotted grid that fades toward the edges,
 * with a hairline at the very top. Replaces the old emerald ember canvas to
 * match the foss-rvu paper/ink design language.
 */
export function EmberField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 z-0 w-screen"
      style={{ left: 'calc(50% - 50vw)' }}
    >
      <div className="dotgrid absolute inset-0 opacity-60" />
      <div className="absolute inset-x-0 top-0 h-px bg-line" />
    </div>
  )
}
