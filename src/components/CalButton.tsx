import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'

export default function CalButton() {
  useEffect(() => {
    ;(async function initCal() {
      try {
        const cal = await getCalApi({ namespace: '30min' })
        cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
      } catch {
        // no-op: fail silently if Cal fails to load
      }
    })()
  }, [])

  return (
    <button
      aria-label="Book a 30 minute call"
      data-cal-namespace="30min"
      data-cal-link="0xtaufeeq/30min"
      data-cal-config='{"layout":"month_view"}'
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/70 bg-zinc-950/80 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-900/80 focus:outline-none focus:ring-2 focus:ring-zinc-500/60 focus:ring-offset-2 focus:ring-offset-zinc-950 active:scale-[0.99]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-4 text-emerald-300"
        aria-hidden
      >
        <path d="M8 2v3M16 2v3M3 9h18M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />
        <path d="M8 13h2v2H8zM12 13h2v2h-2zM16 13h2v2h-2z" />
      </svg>
      <span>Book a 30‑min call</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-4 translate-x-0 opacity-70 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
        aria-hidden
      >
        <path d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}


