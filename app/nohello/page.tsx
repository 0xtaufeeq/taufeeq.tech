import type { Metadata } from 'next'

import { Reveal } from '@/components/motion/Reveal'
import { BackToHome } from '@/components/ui/BackToHome'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'No Hello',
  description: "Please don't say just hello in chat",
  alternates: { canonical: '/nohello' }
}

const Avatar = ({
  letter,
  color
}: {
  letter: string
  color: 'indigo' | 'accent'
}) => (
  <div
    className={cn(
      'flex size-10 items-center justify-center rounded-full text-sm font-bold ring-1',
      color === 'indigo'
        ? 'bg-indigo-500/10 text-indigo-400 ring-indigo-500/50'
        : 'bg-accent-500/10 text-accent-400 ring-accent-500/50'
    )}
  >
    {letter}
  </div>
)

export default function NoHelloPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-24">
      <div className="absolute left-6 top-6 md:left-0 md:top-8">
        <BackToHome />
      </div>

      {/* Background glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-primary-gradient opacity-20 blur-[100px]" />

      <Reveal className="mb-24 text-center">
        <h1 className="font-heading mb-6 text-[clamp(4rem,12vw,6rem)] font-semibold leading-none text-white">
          no{' '}
          <span className="line-through decoration-red-500/50 decoration-4">
            hello
          </span>
        </h1>
        <p className="mx-auto max-w-lg text-xl leading-relaxed text-zinc-400">
          Please don&apos;t just say hello in chat. It interrupts flow and
          delays answers.
        </p>
      </Reveal>

      <div className="mb-20">
        <Reveal>
          <div className="relative mb-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-sm">
            {/* Window controls */}
            <div className="mb-6 flex gap-2">
              <div className="size-3 rounded-full bg-red-500/20" />
              <div className="size-3 rounded-full bg-yellow-500/20" />
              <div className="size-3 rounded-full bg-accent-500/20" />
            </div>

            <div className="space-y-6">
              {/* Bad example */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Avatar letter="K" color="indigo" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-zinc-200">
                      Keith
                    </span>
                    <span className="text-xs text-zinc-600">2:15 PM</span>
                  </div>
                  <div className="w-fit rounded-2xl rounded-tl-none bg-indigo-500/10 px-4 py-2 text-indigo-100 ring-1 ring-indigo-500/20">
                    hi
                  </div>
                </div>
              </div>

              <div className="flex flex-row-reverse gap-4">
                <div className="flex-shrink-0">
                  <Avatar letter="Y" color="accent" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-row-reverse items-baseline gap-2">
                    <span className="text-sm font-bold text-zinc-200">You</span>
                    <span className="text-xs text-zinc-600">2:19 PM</span>
                  </div>
                  <div className="ml-auto w-fit rounded-2xl rounded-tr-none bg-accent-500/10 px-4 py-2 text-accent-100 ring-1 ring-accent-500/20">
                    hello?
                  </div>
                </div>
              </div>

              {/* Typing indicator */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Avatar letter="K" color="indigo" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-zinc-200">
                      Keith
                    </span>
                    <span className="text-xs text-zinc-600">is typing...</span>
                  </div>
                  <div className="flex w-16 items-center gap-1 rounded-2xl rounded-tl-none bg-zinc-800/50 px-4 py-3 ring-1 ring-zinc-700/50">
                    <div className="size-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.3s]" />
                    <div className="size-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.15s]" />
                    <div className="size-1.5 animate-bounce rounded-full bg-zinc-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Annotation */}
            <div className="absolute -right-4 top-1/2 hidden translate-x-full md:block">
              <div className="flex items-center gap-2 text-sm text-red-400">
                <span className="text-2xl">←</span>
                <span className="w-32 font-medium">
                  Wasting both of your time
                </span>
              </div>
            </div>
          </div>

          <p className="mx-auto max-w-xl text-center text-lg text-zinc-400">
            Keith could have received his answer{' '}
            <strong className="text-accent-400">minutes sooner</strong>. <br />
            In async communication, asking &quot;hello&quot; forces a context
            switch without providing context.
          </p>
        </Reveal>
      </div>

      {/* The better way */}
      <div className="mb-24">
        <Reveal>
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-sm">
            <div className="mb-6 flex gap-2">
              <div className="size-3 rounded-full bg-zinc-700" />
              <div className="size-3 rounded-full bg-zinc-700" />
              <div className="size-3 rounded-full bg-zinc-700" />
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Avatar letter="D" color="indigo" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-zinc-200">
                      Dawn
                    </span>
                    <span className="text-xs text-zinc-600">2:15 PM</span>
                  </div>
                  <div className="w-fit max-w-md rounded-2xl rounded-tl-none bg-indigo-500/10 px-4 py-2 text-indigo-100 ring-1 ring-indigo-500/20">
                    Hey! Do you know what time the team meeting is today?
                  </div>
                </div>
              </div>

              <div className="flex flex-row-reverse gap-4">
                <div className="flex-shrink-0">
                  <Avatar letter="Y" color="accent" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-row-reverse items-baseline gap-2">
                    <span className="text-sm font-bold text-zinc-200">You</span>
                    <span className="text-xs text-zinc-600">2:16 PM</span>
                  </div>
                  <div className="ml-auto w-fit rounded-2xl rounded-tr-none bg-accent-500/10 px-4 py-2 text-accent-100 ring-1 ring-accent-500/20">
                    Yep, it&apos;s at 3:30 PM!
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-1/2 hidden translate-x-full md:block">
              <div className="flex items-center gap-2 text-sm text-accent-400">
                <span className="text-2xl">←</span>
                <span className="w-32 font-medium">Actionable immediately</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mb-24 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="group h-full rounded-2xl border border-red-500/10 bg-red-500/5 p-8 transition-colors duration-300 hover:border-red-500/20 hover:bg-red-500/10">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                ✕
              </div>
              <h2 className="text-lg font-semibold text-red-200">
                Don&apos;t say
              </h2>
            </div>
            <ul className="space-y-3 text-zinc-400">
              {['"Hello"', '"Hi Taufeeq, quick question"', '"You got a sec?"', '"ping"'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-red-500/50" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="group h-full rounded-2xl border border-accent-500/10 bg-accent-500/5 p-8 transition-colors duration-300 hover:border-accent-500/20 hover:bg-accent-500/10">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
                ✓
              </div>
              <h2 className="text-lg font-semibold text-accent-200">
                Instead say
              </h2>
            </div>
            <ul className="space-y-3 text-zinc-400">
              {[
                `"Hey! When's the deadline for X?"`,
                '"Hi, could you send me the report?"',
                `"Quick q - what's the login for Y?"`
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent-500/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="text-center">
        <p className="mb-2 text-sm text-zinc-600">
          Inspired by{' '}
          <a
            href="https://nohello.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors hover:text-accent-400"
          >
            nohello.net
          </a>
        </p>
        <p className="text-[10px] italic text-zinc-700 opacity-50 transition-opacity hover:opacity-100">
          (⚠️ Warning: This page contains traces of sarcasm. Viewer discretion
          is advised.)
        </p>
      </div>
    </div>
  )
}
