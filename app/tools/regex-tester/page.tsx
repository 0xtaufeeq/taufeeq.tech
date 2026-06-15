import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import { RegexTester } from '@/components/tools/RegexTester'

export const metadata: Metadata = {
  title: 'Regex Tester | Tools',
  description: 'Test and debug regular expressions with live pattern matching',
  alternates: { canonical: '/tools/regex-tester' }
}

export default function RegexTesterPage() {
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
          Regex Tester
        </h1>
        <p className="mt-2 text-muted">Test and debug regular expressions</p>
      </div>

      <div className="mx-auto max-w-6xl rounded-xl border border-line bg-card p-6 sm:p-8">
        <RegexTester />
      </div>
    </div>
  )
}
