import Link from 'next/link'

import { SOCIAL_ICON_MAP, XIcon } from '@/components/icons'
import { SOCIALS } from '@/lib/site'
import { getRepoInfo } from '@/lib/github'
import { formatDateByTimeZone } from '@/lib/utils'

import { AnimatedName } from './AnimatedName'
import { FooterWordmark } from './FooterWordmark'

const FOOTER_CONTENTS = [
  {
    title: 'Learn More',
    links: [
      { text: 'About Me', href: '/about' },
      { text: 'Values', href: '/values' }
    ]
  },
  {
    title: 'Miscellaneous',
    links: [
      { text: 'Tools', href: '/tools' },
      { text: 'No Hello', href: '/nohello' }
    ]
  }
]

async function LastUpdatedTime() {
  const data = await getRepoInfo('0xtaufeeq', 'taufeeq.tech')
  if (!data) return null

  const commit = data.defaultBranchRef?.target
  const username = commit?.author?.user?.login || '0xtaufeeq'
  const commitId = commit?.oid?.slice(0, 7) || ''
  const commitUrl = commit?.commitUrl || ''
  const date = new Date(commit?.committedDate || data.pushedAt)

  return (
    <p className="text-xs text-zinc-400 min-[961px]:self-end">
      Last updated by{' '}
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium transition-colors hover:underline"
        title={`View ${username}'s GitHub profile`}
      >
        {username}
      </a>{' '}
      on{' '}
      <time dateTime={date.toISOString()} className="font-medium">
        {formatDateByTimeZone(date)} IST
      </time>
      {commitId && commitUrl && (
        <>
          {' '}
          ·{' '}
          <a
            href={commitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono transition-colors hover:underline"
            title="View commit on GitHub"
          >
            Commit ID - {commitId}
          </a>
        </>
      )}
    </p>
  )
}

export function Footer() {
  const socials = [
    ...SOCIALS.map((s) => ({ ...s, icon: SOCIAL_ICON_MAP[s.name] })),
    { name: 'X', href: 'https://x.com/0xtaufeeq', icon: XIcon }
  ]

  return (
    <footer className="relative mt-auto w-full">
      <div className="absolute left-1/2 top-0 -z-10 h-48 w-3/5 -translate-x-1/2 bg-primary-gradient opacity-20 blur-[100px] xs:top-24" />

      {/* separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="flex justify-center bg-zinc-950 pb-16 pt-20 max-[960px]:pb-8">
        <div className="flex w-full items-stretch justify-between gap-16 px-12 text-sm tracking-wide max-[960px]:flex-col-reverse max-sm:px-4 min-[1200px]:w-[1200px]">
          <div className="space-y-24">
            <div className="space-y-3">
              <p className="text-lg leading-none text-zinc-200">
                <AnimatedName />
              </p>
              <p className="text-[13px] text-zinc-400">
                Ideas become things when you care enough to build them.
              </p>
            </div>
            <div className="space-y-6">
              <ul className="flex gap-3 text-zinc-200">
                {socials.map(({ icon: Icon, href, name }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="group block transition-colors hover:text-accent-300"
                    >
                      <Icon className="size-5 rounded outline-offset-4 outline-accent-300 group-focus-within:outline" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-zinc-400">
                &copy; {new Date().getFullYear()} Taufeeq Riyaz. All rights
                reserved.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between text-zinc-200 max-[960px]:flex-col-reverse max-[960px]:gap-12 max-xs:gap-16">
            <div className="grid grid-cols-3 gap-y-16 max-[960px]:max-w-[480px] max-xs:grid-cols-2 sm:gap-24">
              {FOOTER_CONTENTS.map(({ title, links }) => (
                <div key={title} className="space-y-4">
                  <p className="text-zinc-200">{title}</p>
                  <ul className="flex flex-col gap-3 text-zinc-400">
                    {links.map(({ text, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="font-normal transition-colors hover:text-zinc-200"
                        >
                          {text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <LastUpdatedTime />
          </div>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  )
}
