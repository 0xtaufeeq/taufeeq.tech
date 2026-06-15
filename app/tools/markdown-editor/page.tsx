import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import { MarkdownEditor } from '@/components/tools/MarkdownEditor'

export const metadata: Metadata = {
  title: 'Markdown Editor | Tools',
  description: 'Live markdown editor with PDF export and beautiful preview',
  alternates: { canonical: '/tools/markdown-editor' }
}

export default function MarkdownEditorPage() {
  return (
    <div className="mt-16 sm:mt-24">
      <div className="mb-8">
        <Link
          href="/tools"
          className="mb-4 inline-flex items-center text-sm text-muted hover:text-ink"
        >
          <ChevronLeft className="mr-2 size-4" />
          Back to Tools
        </Link>
        <h1 className="font-heading text-3xl text-ink sm:text-4xl">
          Markdown Editor
        </h1>
        <p className="mt-2 text-muted">
          Live markdown editing with instant preview
        </p>
      </div>

      <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
        <MarkdownEditor />
      </div>
    </div>
  )
}
