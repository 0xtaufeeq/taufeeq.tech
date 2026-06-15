import type { Metadata } from 'next'

import { FadeIn } from '@/components/motion/FadeIn'
import { Reveal } from '@/components/motion/Reveal'
import { BackToHome } from '@/components/ui/BackToHome'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'No Hello',
  description: "Please don't say just hello in chat",
  alternates: { canonical: '/nohello' }
}

/* ---------- chat primitives ---------- */

const Avatar = ({
  letter,
  tone
}: {
  letter: string
  tone: 'indigo' | 'accent'
}) => (
  <div
    className={cn(
      'flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ring-1',
      tone === 'indigo'
        ? 'bg-ink/5 text-muted ring-line'
        : 'bg-accent/10 text-accent ring-line'
    )}
  >
    {letter}
  </div>
)

const Message = ({
  from,
  time,
  tone,
  side = 'left',
  delay = 0,
  children
}: {
  from: string
  time: string
  tone: 'indigo' | 'accent'
  side?: 'left' | 'right'
  delay?: number
  children: React.ReactNode
}) => (
  <FadeIn
    delay={delay}
    y={14}
    className={cn('flex gap-3', side === 'right' && 'flex-row-reverse')}
  >
    <Avatar letter={from[0]} tone={tone} />
    <div
      className={cn('space-y-1.5', side === 'right' && 'flex flex-col items-end')}
    >
      <div
        className={cn(
          'flex items-baseline gap-2',
          side === 'right' && 'flex-row-reverse'
        )}
      >
        <span className="text-sm font-semibold text-ink">{from}</span>
        <span className="font-mono text-[10px] tracking-wide text-muted">
          {time}
        </span>
      </div>
      <div
        className={cn(
          'w-fit max-w-md px-4 py-2 text-[15px] leading-relaxed ring-1',
          side === 'left'
            ? 'rounded-2xl rounded-tl-sm bg-card text-ink ring-line'
            : 'rounded-2xl rounded-tr-sm bg-accent/10 text-ink ring-line'
        )}
      >
        {children}
      </div>
    </div>
  </FadeIn>
)

const ChatWindow = ({
  channel,
  stamp,
  stampTone,
  children
}: {
  channel: string
  stamp: string
  stampTone: 'red' | 'accent'
  children: React.ReactNode
}) => (
  <div className="relative">
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-sm">
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-line bg-card px-5 py-3.5">
        <div className="flex gap-2">
          <div className="size-3 rounded-full bg-[#ff5f57]/70" />
          <div className="size-3 rounded-full bg-[#febc2e]/70" />
          <div className="size-3 rounded-full bg-[#28c840]/70" />
        </div>
        <span className="font-mono text-[11px] tracking-[0.2em] text-muted">
          {channel}
        </span>
        <span className="w-12" aria-hidden="true" />
      </div>
      <div className="space-y-6 p-6 sm:p-8">{children}</div>
    </div>

    {/* verdict stamp */}
    <span
      className={cn(
        'stamp absolute -top-4 right-6 z-10 backdrop-blur-sm',
        stampTone === 'red'
          ? 'rotate-3 bg-paper text-red-400'
          : '-rotate-2 bg-paper text-accent'
      )}
    >
      {stamp}
    </span>
  </div>
)

const TypingIndicator = ({ from, delay }: { from: string; delay: number }) => (
  <FadeIn delay={delay} y={14} className="flex gap-3">
    <Avatar letter={from[0]} tone="indigo" />
    <div className="space-y-1.5">
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-semibold text-ink">{from}</span>
        <span className="font-mono text-[10px] italic tracking-wide text-muted">
          is typing…
        </span>
      </div>
      <div className="flex w-16 items-center gap-1 rounded-2xl rounded-tl-sm bg-card px-4 py-3 ring-1 ring-line">
        <div className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
        <div className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
        <div className="size-1.5 animate-bounce rounded-full bg-muted" />
      </div>
    </div>
  </FadeIn>
)

/* ---------- page ---------- */

const STATS = [
  { value: '4 min+', label: 'avg. time lost per "hello"' },
  { value: '2×', label: 'the messages it takes' },
  { value: '0', label: 'information conveyed' }
]

const DONT = ['"Hello"', '"Hi Taufeeq, quick question"', '"You got a sec?"', '"ping"']
const DO = [
  `"Hey! When's the deadline for X?"`,
  '"Hi, could you send me the report?"',
  `"Quick q — what's the login for Y?"`
]

export default function NoHelloPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-2 py-24 sm:px-6">
      <div className="absolute left-2 top-6 md:left-0 md:top-8">
        <BackToHome />
      </div>

      {/* atmosphere */}
      <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh]" />

      {/* ---------- opener ---------- */}
      <header className="mb-28 mt-12 text-center">
        <FadeIn>
          <p className="label">
            A public service announcement
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="display mt-8 text-[clamp(4.5rem,16vw,9.5rem)] leading-[0.9] tracking-tight text-ink">
            no{' '}
            <em className="strike-anim font-light text-muted">hello</em>
          </h1>
        </FadeIn>
        <FadeIn delay={0.25}>
          <p className="mx-auto mt-10 max-w-md text-lg leading-relaxed text-muted">
            Don&apos;t open with{' '}
            <span className="text-ink">&quot;hello&quot;</span> and wait.
            Say why you&apos;re here — it&apos;s one message, not a phone call.
          </p>
        </FadeIn>

        {/* stat strip */}
        <FadeIn delay={0.4}>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 divide-x divide-line border-y border-line">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-2 py-6 sm:px-6">
                <p className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </header>

      {/* ---------- exhibit A ---------- */}
      <section className="mb-24">
        <Reveal>
          <p className="label mb-6">
            Exhibit A — the slow way
          </p>
          <ChatWindow channel="#dev-team" stamp="Time wasted" stampTone="red">
            <Message from="Keith" time="2:15 PM" tone="indigo" delay={0.2}>
              hi
            </Message>
            <Message from="You" time="2:19 PM" tone="accent" side="right" delay={0.45}>
              hello?
            </Message>
            <TypingIndicator from="Keith" delay={0.7} />
          </ChatWindow>
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-10 max-w-xl text-center text-muted">
            Keith could have had his answer{' '}
            <strong className="font-medium text-accent">
              four minutes ago
            </strong>
            . A bare &quot;hello&quot; forces a context switch and delivers
            nothing to act on.
          </p>
        </Reveal>
      </section>

      {/* divider */}
      <Reveal className="mb-24">
        <div className="flex items-center justify-center gap-6">
          <hr className="hairline w-full max-w-40" />
          <p className="shrink-0 font-serif text-2xl font-light italic text-muted">
            or, the fast way
          </p>
          <hr className="hairline w-full max-w-40" />
        </div>
      </Reveal>

      {/* ---------- exhibit B ---------- */}
      <section className="mb-28">
        <Reveal>
          <p className="label mb-6">
            Exhibit B — sixty seconds, done
          </p>
          <ChatWindow channel="#dev-team" stamp="Answered in 60s" stampTone="accent">
            <Message from="Dawn" time="2:15 PM" tone="indigo" delay={0.15}>
              Hey! Do you know what time the team meeting is today?
            </Message>
            <Message from="You" time="2:16 PM" tone="accent" side="right" delay={0.4}>
              Yep, it&apos;s at 3:30 PM!
            </Message>
          </ChatWindow>
        </Reveal>
      </section>

      {/* ---------- field guide ---------- */}
      <section className="mb-28 grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-line bg-card">
            <div className="h-full rounded-[15px] p-8">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-red-400">
                ✗ — Don&apos;t open with
              </p>
              <ul className="space-y-4 text-muted">
                {DONT.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-red-500/50" />
                    <span className="font-serif text-lg text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-line bg-card">
            <div className="h-full rounded-[15px] p-8">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                ✓ — Lead with the ask
              </p>
              <ul className="space-y-4 text-muted">
                {DO.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-accent/60" />
                    <span className="font-serif text-lg text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- colophon ---------- */}
      <Reveal className="text-center">
        <p className="font-serif text-xl font-light italic text-muted">
          Same greeting. Same warmth.{' '}
          <span className="text-accent not-italic font-medium">
            Just with the question attached.
          </span>
        </p>
        <p className="mt-8 text-sm text-muted">
          Inspired by{' '}
          <a
            href="https://nohello.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            nohello.net
          </a>
        </p>
        <p className="mt-3 font-mono text-[10px] italic text-muted opacity-60 transition-opacity hover:opacity-100">
          (⚠ this page contains traces of sarcasm. viewer discretion advised.)
        </p>
      </Reveal>
    </div>
  )
}
