import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

import { CopyButton } from '@/components/ui/copy-button'

/**
 * Attach a CopyButton to every static code block. The button lives in a
 * wrapper around the <pre> (not inside it) so it stays pinned while the
 * code scrolls horizontally. Safe to call repeatedly — already-enhanced
 * blocks are skipped.
 */
export function mountCopyButtons() {
  const blocks = document.querySelectorAll<HTMLPreElement>(
    '.prose pre, article pre'
  )

  blocks.forEach((pre) => {
    if (pre.dataset.copyEnhanced) return
    pre.dataset.copyEnhanced = '1'

    const code = pre.querySelector('code')?.innerText ?? pre.innerText
    if (!code.trim()) return

    const wrapper = document.createElement('div')
    wrapper.className = 'code-block-wrapper'
    pre.parentNode?.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    const slot = document.createElement('div')
    slot.className = 'code-copy-slot'
    wrapper.appendChild(slot)

    createRoot(slot).render(createElement(CopyButton, { code }))
  })
}
