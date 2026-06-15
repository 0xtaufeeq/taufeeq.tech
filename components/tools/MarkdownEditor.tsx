'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { Check, Copy, Download, FileText, Printer } from 'lucide-react'

import { cn } from '@/lib/utils'

const DEFAULT_MARKDOWN = `# Welcome to the Markdown Editor

Start typing on the left and see a **live preview** on the right.

## Features

- Live preview as you type
- Export to PDF (via print)
- Download as \`.md\`
- Copy rendered HTML

## Code

\`\`\`js
const greet = (name) => \`Hello, \${name}!\`
console.log(greet('Taufeeq'))
\`\`\`

> Markdown is a lightweight markup language for creating formatted text.

| Feature | Status |
| ------- | ------ |
| Preview | ✅     |
| Export  | ✅     |
`

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)
  const [copied, setCopied] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const html = useMemo(() => {
    const raw = marked.parse(markdown, { async: false, gfm: true, breaks: true })
    return typeof window === 'undefined' ? raw : DOMPurify.sanitize(raw)
  }, [markdown])

  useEffect(() => {
    setCopied(false)
  }, [markdown])

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  const exportPdf = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    printWindow.document.write(`<!doctype html>
<html>
<head>
<title>document</title>
<style>
  body { font-family: Georgia, serif; max-width: 720px; margin: 48px auto; line-height: 1.7; color: #18181b; padding: 0 24px; }
  pre { background: #f4f4f5; padding: 16px; border-radius: 8px; overflow-x: auto; }
  code { font-family: ui-monospace, monospace; font-size: 0.9em; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #d4d4d8; padding: 8px 12px; text-align: left; }
  blockquote { border-left: 4px solid #d4d4d8; margin-left: 0; padding-left: 16px; color: #52525b; }
  img { max-width: 100%; }
</style>
</head>
<body>${html}</body>
</html>`)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted">
          <FileText className="size-4" />
          <span>
            {markdown.length} characters ·{' '}
            {markdown.split(/\s+/).filter(Boolean).length} words
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={downloadMarkdown} className="btn-secondary !px-4 !py-2">
            <Download className="size-4" />
            .md
          </button>
          <button onClick={copyHtml} className="btn-secondary !px-4 !py-2">
            {copied ? (
              <Check className="size-4 text-accent" />
            ) : (
              <Copy className="size-4" />
            )}
            HTML
          </button>
          <button onClick={exportPdf} className="btn-primary !px-4 !py-2">
            <Printer className="size-4" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          spellCheck={false}
          aria-label="Markdown source"
          className={cn(
            'scrollbar-color h-[600px] w-full resize-none rounded-xl p-5',
            'border border-line bg-card font-mono text-sm leading-relaxed text-ink',
            'placeholder-muted focus:outline-none'
          )}
          placeholder="Type your markdown here..."
        />
        <div
          ref={previewRef}
          className={cn(
            'scrollbar-color prose h-[600px] max-w-none overflow-y-auto rounded-xl p-5',
            'border border-line bg-card',
            'prose-headings:font-heading prose-headings:text-ink prose-a:text-accent'
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
