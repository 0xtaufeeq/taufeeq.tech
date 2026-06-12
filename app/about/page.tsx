import type { Metadata } from 'next'
import Image from 'next/image'
import { User } from 'lucide-react'

import { Reveal } from '@/components/motion/Reveal'
import { BackToHome } from '@/components/ui/BackToHome'
import { EXPERIENCE, SKILLS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Building Tenacity. Founding President at DevSphere. Tech Enthusiast.'
}

export default function AboutPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-24">
      <div className="absolute left-6 top-6 md:-left-4 md:top-8">
        <BackToHome />
      </div>

      {/* Background glow */}
      <div className="absolute right-0 top-0 -z-10 h-64 w-64 translate-x-1/3 rounded-full bg-primary-gradient opacity-10 blur-[100px]" />

      <header className="mb-20 pt-16">
        <Reveal>
          <div className="section-badge mb-6">
            <User className="size-4" />
            <span className="text-sm font-medium tracking-wide max-sm:text-xs">
              About
            </span>
          </div>
          <h1 className="page-title mb-8 text-zinc-100">
            About <span className="text-zinc-500">Me</span>
          </h1>

          <div className="max-w-none space-y-4">
            <p className="text-xl leading-relaxed text-zinc-300">
              Hi, I&apos;m{' '}
              <strong className="font-semibold text-accent-400">
                Taufeeq Riyaz
              </strong>
              . I&apos;m a builder and community leader passionate about
              empowering others.
            </p>
            <p className="leading-relaxed text-zinc-400">
              Currently, I&apos;m building{' '}
              <strong className="font-semibold text-zinc-200">Tenacity</strong>,
              a community where students can discover their passions and
              develop skills. I also served as the Founding President of{' '}
              <strong className="font-semibold text-zinc-200">DevSphere</strong>
              . I love working at the intersection of technology, design, and
              people.
            </p>
          </div>
        </Reveal>
      </header>

      <section className="mb-20">
        <Reveal>
          <h2 className="font-heading mb-8 text-2xl font-semibold text-zinc-100 sm:text-3xl">
            Skills &amp; Interests
          </h2>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill) => (
              <div
                key={skill}
                className="rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-accent-500/30 hover:text-accent-400"
              >
                {skill}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mb-20">
        <Reveal>
          <h2 className="font-heading mb-8 text-2xl font-semibold text-zinc-100 sm:text-3xl">
            Experience
          </h2>
        </Reveal>
        <div className="space-y-12">
          {EXPERIENCE.map((companyData) => (
            <Reveal key={companyData.company}>
              <div className="group relative">
                <div className="mb-6 flex gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={companyData.logoUrl}
                      alt={`${companyData.company} logo`}
                      width={48}
                      height={48}
                      className="size-12 rounded-lg border border-zinc-800 bg-zinc-900 object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-zinc-100">
                      {companyData.company}
                    </h3>
                    {companyData.location && (
                      <p className="text-sm text-zinc-500">
                        {companyData.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative ml-[23px] space-y-8 border-l border-zinc-800 pl-8">
                  {companyData.roles.map((role) => (
                    <div key={role.title} className="relative">
                      <span className="absolute -left-[37px] top-1.5 size-3 rounded-full border-2 border-zinc-950 bg-zinc-700 transition-colors group-hover:border-accent-900 group-hover:bg-accent-500" />

                      <div className="mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                        <h4 className="text-lg font-medium text-zinc-200">
                          {role.title}
                        </h4>
                        <span className="shrink-0 text-sm text-zinc-500">
                          {role.period}
                        </span>
                      </div>

                      <div className="space-y-4 text-sm leading-relaxed text-zinc-400">
                        {role.description.split('\n\n').map((paragraph, i) => (
                          <p key={i}>{paragraph.trim()}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal>
          <h2 className="font-heading mb-8 text-2xl font-semibold text-zinc-100 sm:text-3xl">
            Connect
          </h2>
          <p className="mb-8 text-zinc-400">
            I&apos;m always open to discussing new projects, community
            initiatives, or just chatting about tech.
          </p>

          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/taufeeq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              LinkedIn
            </a>
            <a href="mailto:contact.taufeeq@gmail.com" className="btn-secondary">
              Email Me
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
