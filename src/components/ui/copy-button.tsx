import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  /** The text written to the clipboard on click */
  code: string
  className?: string
}

/**
 * Icon button that copies `code` to the clipboard, flipping to a
 * check mark for a moment as confirmation. Used on every code block
 * (mounted by src/scripts/code-copy.ts).
 */
export function CopyButton({ code, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Tooltip
      content={copied ? 'Copied!' : 'Click to copy'}
      delayDuration={0}
      sideOffset={8}
      showArrow={false}
      triggerAsChild
      className='px-2 py-1 text-xs'
    >
      <Button
        variant='outline'
        size='icon'
        className={cn(
          'relative h-8 w-8 rounded-lg border-zinc-800 text-zinc-400',
          'bg-zinc-950/80 backdrop-blur-sm',
          'hover:border-zinc-700 hover:text-zinc-100',
          'disabled:opacity-100',
          className
        )}
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
        disabled={copied}
      >
        <div
          className={cn(
            'transition-all',
            copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          )}
        >
          <Check
            className='stroke-accent-400'
            size={16}
            strokeWidth={2}
            aria-hidden='true'
          />
        </div>
        <div
          className={cn(
            'absolute transition-all',
            copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          )}
        >
          <Copy size={16} strokeWidth={2} aria-hidden='true' />
        </div>
      </Button>
    </Tooltip>
  )
}
