'use client'

import { useEffect } from 'react'

/**
 * Loads the Cal.com embed script and registers the "30min" namespace so any
 * element with data-cal-link / data-cal-namespace opens the booking modal.
 * Update the data-cal-link attributes if the Cal.com event changes.
 */
export function CalProvider() {
  useEffect(() => {
    const w = window as any
    if (w.Cal?.loaded) return

    // Official Cal.com embed snippet, minus the document.write variant
    ;(function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar)
      }
      const d = C.document
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal
          const ar = arguments
          if (!cal.loaded) {
            cal.ns = {}
            cal.q = cal.q || []
            d.head.appendChild(d.createElement('script')).src = A
            cal.loaded = true
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments)
            }
            const namespace = ar[1]
            api.q = api.q || []
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api
              p(cal.ns[namespace], ar)
              p(cal, ['initNamespace', namespace])
            } else p(cal, ar)
            return
          }
          p(cal, ar)
        }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    w.Cal('init', '30min', { origin: 'https://cal.com' })
    w.Cal.ns['30min']('ui', {
      theme: 'dark',
      hideEventTypeDetails: false,
      layout: 'month_view'
    })
  }, [])

  return null
}
