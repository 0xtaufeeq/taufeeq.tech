'use client'

import { Fragment, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

const FLAGS = [
  { flag: 'g', label: 'Global' },
  { flag: 'i', label: 'Case insensitive' },
  { flag: 'm', label: 'Multiline' },
  { flag: 's', label: 'Dot matches newline' },
  { flag: 'u', label: 'Unicode' }
] as const

const COMMON_PATTERNS = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
  { name: 'URL', pattern: 'https?:\\/\\/[\\w.-]+(?:\\/[\\w./?%&=-]*)?' },
  { name: 'Phone (IN)', pattern: '(?:\\+91[\\s-]?)?[6-9]\\d{9}' },
  { name: 'Date (ISO)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
  { name: 'Hex color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b' },
  { name: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b' }
]

const DEFAULT_TEXT = `Reach me at contact.taufeeq@gmail.com or visit https://taufeeq.tech.
Released on 2026-06-12 with theme color #00d97e.
Backup contact: hello@example.org — server at 192.168.1.1.`

interface MatchResult {
  match: string
  index: number
  groups: string[]
}

export function RegexTester() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')
  const [flags, setFlags] = useState<Set<string>>(new Set(['g']))
  const [testString, setTestString] = useState(DEFAULT_TEXT)

  const flagString = [...flags].join('')

  const { matches, error, highlighted } = useMemo(() => {
    if (!pattern) return { matches: [], error: null, highlighted: null }

    let regex: RegExp
    try {
      regex = new RegExp(pattern, flagString)
    } catch (e) {
      return {
        matches: [],
        error: e instanceof Error ? e.message : 'Invalid pattern',
        highlighted: null
      }
    }

    const results: MatchResult[] = []
    const segments: { text: string; isMatch: boolean }[] = []
    let lastIndex = 0

    try {
      if (flags.has('g')) {
        for (const m of testString.matchAll(regex)) {
          if (m.index === undefined) continue
          results.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1)
          })
          segments.push({
            text: testString.slice(lastIndex, m.index),
            isMatch: false
          })
          segments.push({ text: m[0], isMatch: true })
          lastIndex = m.index + (m[0].length || 1)
          if (results.length > 2000) break
        }
      } else {
        const m = testString.match(regex)
        if (m && m.index !== undefined) {
          results.push({ match: m[0], index: m.index, groups: m.slice(1) })
          segments.push({
            text: testString.slice(0, m.index),
            isMatch: false
          })
          segments.push({ text: m[0], isMatch: true })
          lastIndex = m.index + m[0].length
        }
      }
      segments.push({ text: testString.slice(lastIndex), isMatch: false })
    } catch (e) {
      return {
        matches: [],
        error: e instanceof Error ? e.message : 'Match failed',
        highlighted: null
      }
    }

    return { matches: results, error: null, highlighted: segments }
  }, [pattern, flagString, testString, flags])

  const toggleFlag = (flag: string) =>
    setFlags((prev) => {
      const next = new Set(prev)
      if (next.has(flag)) next.delete(flag)
      else next.add(flag)
      return next
    })

  return (
    <div className="space-y-6">
      {/* Pattern input */}
      <div>
        <label
          htmlFor="regex-pattern"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          Regular Expression
        </label>
        <div className="flex">
          <span className="flex items-center rounded-l-lg border border-r-0 border-zinc-700 bg-zinc-800 px-3 text-zinc-400">
            /
          </span>
          <input
            id="regex-pattern"
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            spellCheck={false}
            className={cn(
              'flex-1 border-y border-zinc-700 bg-zinc-800 px-4 py-3 font-mono text-sm text-zinc-200',
              'placeholder-zinc-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20'
            )}
            placeholder="Enter your regex pattern..."
          />
          <span className="flex items-center rounded-r-lg border border-l-0 border-zinc-700 bg-zinc-800 px-3 font-mono text-sm text-zinc-400">
            /{flagString}
          </span>
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>

      {/* Flags */}
      <div>
        <p className="mb-2 block text-sm font-medium text-zinc-300">Flags</p>
        <div className="flex flex-wrap gap-3">
          {FLAGS.map(({ flag, label }) => (
            <label
              key={flag}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={flags.has(flag)}
                onChange={() => toggleFlag(flag)}
                className="size-4 rounded border-zinc-700 bg-zinc-800 accent-[#00d97e]"
              />
              <span className="text-sm text-zinc-300">
                <code className="text-accent-500">{flag}</code> - {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Common patterns */}
      <div>
        <p className="mb-2 block text-sm font-medium text-zinc-300">
          Common patterns
        </p>
        <div className="flex flex-wrap gap-2">
          {COMMON_PATTERNS.map(({ name, pattern: p }) => (
            <button
              key={name}
              onClick={() => setPattern(p)}
              className={cn(
                'rounded-full border border-zinc-700 bg-zinc-800/60 px-3 py-1.5 text-xs text-zinc-300',
                'transition-colors hover:border-accent-500/40 hover:text-accent-300'
              )}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Test string */}
      <div>
        <label
          htmlFor="test-string"
          className="mb-2 block text-sm font-medium text-zinc-300"
        >
          Test String
        </label>
        <textarea
          id="test-string"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          spellCheck={false}
          rows={6}
          className={cn(
            'scrollbar-color w-full resize-y rounded-lg border border-zinc-700 bg-zinc-800 p-4',
            'font-mono text-sm leading-relaxed text-zinc-200 placeholder-zinc-500',
            'focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20'
          )}
          placeholder="Paste the text you want to test against..."
        />
      </div>

      {/* Highlighted matches */}
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <p className="text-sm font-medium text-zinc-300">Result</p>
          <p className="text-sm text-zinc-400">
            {error
              ? '—'
              : `${matches.length} match${matches.length === 1 ? '' : 'es'}`}
          </p>
        </div>
        <div className="min-h-24 whitespace-pre-wrap break-words rounded-lg border border-zinc-800 bg-zinc-950/80 p-4 font-mono text-sm leading-relaxed text-zinc-300">
          {highlighted
            ? highlighted.map((segment, i) =>
                segment.isMatch ? (
                  <mark
                    key={i}
                    className="rounded bg-accent-500/25 px-0.5 text-accent-200"
                  >
                    {segment.text}
                  </mark>
                ) : (
                  <Fragment key={i}>{segment.text}</Fragment>
                )
              )
            : testString}
        </div>
      </div>

      {/* Match details */}
      {matches.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-300">
            Match details
          </p>
          <div className="scrollbar-color max-h-64 space-y-2 overflow-y-auto">
            {matches.slice(0, 100).map((m, i) => (
              <div
                key={`${m.index}-${i}`}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-sm"
              >
                <span className="font-mono text-xs text-zinc-500">#{i + 1}</span>
                <code className="text-accent-300">{m.match}</code>
                <span className="text-xs text-zinc-500">index {m.index}</span>
                {m.groups.filter(Boolean).length > 0 && (
                  <span className="text-xs text-zinc-500">
                    groups: {m.groups.filter(Boolean).join(', ')}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
