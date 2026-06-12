import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Settings } from 'lucide-react'

import { Reveal } from '@/components/motion/Reveal'
import { BackToHome } from '@/components/ui/BackToHome'

export const metadata: Metadata = {
  title: 'Tools',
  description:
    'Powerful web tools including live markdown editor and regex tester for developers',
  alternates: { canonical: '/tools' }
}

const TOOLS = [
  {
    title: 'Markdown Editor',
    description: 'Live markdown editor with PDF export and beautiful preview',
    icon: '📝',
    href: '/tools/markdown-editor',
    category: 'Editor'
  },
  {
    title: 'Regex Tester',
    description: 'Test and debug regular expressions with live pattern matching',
    icon: '🔍',
    href: '/tools/regex-tester',
    category: 'Developer'
  }
]

const categories = [...new Set(TOOLS.map((tool) => tool.category))]

export default function ToolsPage() {
  return (
    <div className="mt-16 sm:mt-40">
      <div className="items-center justify-between gap-4 lg:flex">
        <Reveal className="space-y-6 sm:space-y-8">
          <div className="section-badge">
            <Settings className="size-4" />
            <h1 className="text-sm font-medium tracking-wide max-sm:text-xs">
              Tools
            </h1>
          </div>
          <h2 className="page-title text-zinc-100">Useful Web Tools</h2>
          <p className="text-zinc-400 max-md:text-sm">
            A collection of useful web tools and utilities
          </p>
        </Reveal>
        <BackToHome className="max-lg:hidden" />
      </div>

      <section className="mt-12 sm:mt-16">
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="font-heading mb-6 text-xl font-semibold text-zinc-300">
              {category}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.filter((tool) => tool.category === category).map(
                (tool) => (
                  <Reveal key={tool.href}>
                    <Link
                      href={tool.href}
                      className="ui-card group relative flex flex-col gap-4 overflow-hidden p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex size-12 items-center justify-center rounded-lg bg-zinc-800 text-2xl">
                          {tool.icon}
                        </div>
                        <ChevronRight className="size-5 text-zinc-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-zinc-400" />
                      </div>
                      <div>
                        <h3 className="font-display mb-2 text-xl font-semibold text-zinc-100">
                          {tool.title}
                        </h3>
                        <p className="text-sm text-zinc-400">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                )
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
