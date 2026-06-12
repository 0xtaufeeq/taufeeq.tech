import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import { MarkdownEditor } from '@/components/tools/MarkdownEditor'

export const metadata: Metadata = {
  title: 'Markdown Editor | Tools',
  description: 'Live markdown editor with PDF export and beautiful preview'
}

export default function MarkdownEditorPage() {
  return (
    <div className="mt-16 sm:mt-24">
      <div className="mb-8">
        <Link
          href="/tools"
          className="mb-4 inline-flex items-center text-sm text-zinc-400 hover:text-zinc-200"
        >
          <ChevronLeft className="mr-2 size-4" />
          Back to Tools
        </Link>
        <h1 className="font-heading text-3xl font-semibold text-zinc-100 sm:text-4xl">
          Markdown Editor
        </h1>
        <p className="mt-2 text-zinc-400">
          Live markdown editing with instant preview
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
        <MarkdownEditor />
      </div>
    </div>
  )
}
