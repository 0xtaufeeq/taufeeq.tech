import type { Metadata } from 'next'
import Image from 'next/image'
import { User } from 'lucide-react'

import { Reveal } from '@/components/motion/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { BackToHome } from '@/components/ui/BackToHome'
import { SectionNav } from '@/components/ui/SectionNav'
import { profilePageJsonLd } from '@/lib/jsonld'
import { EXPERIENCE, SKILLS } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Building Tenacity. Founding President at DevSphere. Tech Enthusiast.',
  alternates: { canonical: '/about' }
}

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'connect', label: 'Connect' }
]

export default function AboutPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-24">
      <JsonLd data={profilePageJsonLd} />
      <div className="absolute left-6 top-6 md:-left-4 md:top-8">
        <BackToHome />
      </div>

      <SectionNav items={SECTIONS} className="mb-16" />

      <header id="about" className="mb-20 scroll-mt-24">
        <Reveal>
          <div className="section-badge mb-6">
            <User className="size-4" />
            <span className="text-sm font-medium tracking-wide max-sm:text-xs">
              About
            </span>
          </div>
          <h1 className="page-title mb-8 text-ink">
            About <span className="text-muted">Me</span>
          </h1>

          <div className="max-w-none space-y-4">
            <p className="text-xl leading-relaxed text-muted">
              Hi, I&apos;m{' '}
              <strong className="font-semibold text-accent">
                Taufeeq Riyaz
              </strong>
              . I&apos;m a builder and community leader passionate about
              empowering others.
            </p>
            <p className="leading-relaxed text-muted">
              Currently, I&apos;m building{' '}
              <strong className="font-semibold text-ink">Tenacity</strong>,
              a community where students can discover their passions and
              develop skills. I also served as the Founding President of{' '}
              <strong className="font-semibold text-ink">DevSphere</strong>
              . I love working at the intersection of technology, design, and
              people.
            </p>
          </div>
        </Reveal>
      </header>

      <section id="skills" className="mb-20 scroll-mt-24">
        <Reveal>
          <h2 className="display mb-8 text-4xl text-ink">
            Skills &amp; Interests
          </h2>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill) => (
              <div
                key={skill}
                className="rounded-full border border-line bg-card px-4 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-accent"
              >
                {skill}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="experience" className="mb-20 scroll-mt-24">
        <Reveal>
          <h2 className="display mb-8 text-4xl text-ink">Experience</h2>
        </Reveal>
        <div className="space-y-12">
          {EXPERIENCE.map((companyData) => {
            const logoUrl =
              'logoUrl' in companyData ? companyData.logoUrl : undefined
            const companyLocation =
              'location' in companyData ? companyData.location : undefined
            const meta = [
              'employmentType' in companyData
                ? companyData.employmentType
                : undefined,
              'duration' in companyData ? companyData.duration : undefined
            ]
              .filter(Boolean)
              .join(' · ')

            return (
              <Reveal key={companyData.company}>
                <div className="group relative">
                  <div className="mb-6 flex gap-4">
                    <div className="flex-shrink-0">
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={`${companyData.company} logo`}
                          width={48}
                          height={48}
                          className="size-12 rounded-lg border border-line bg-card object-cover"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="display grid size-12 place-items-center rounded-lg border border-line bg-card text-xl text-muted"
                        >
                          {companyData.company.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="display text-2xl text-ink">
                        {companyData.company}
                      </h3>
                      {meta && <p className="label mt-1">{meta}</p>}
                      {companyLocation && (
                        <p className="text-sm text-muted">{companyLocation}</p>
                      )}
                    </div>
                  </div>

                  <div className="relative ml-6 space-y-7 border-l border-line pl-8 before:absolute before:-top-7 before:left-[-0.5px] before:h-7 before:w-px before:bg-gradient-to-b before:from-transparent before:to-line">
                    {companyData.roles.map((role) => {
                      const roleEmploymentType =
                        'employmentType' in role ? role.employmentType : undefined
                      const roleLocation =
                        'location' in role ? role.location : undefined
                      const roleDescription =
                        'description' in role ? role.description : undefined
                      const isCurrent = /present/i.test(role.period)

                      return (
                        <div key={role.title} className="group/role relative">
                          <span
                            aria-hidden
                            className={cn(
                              'absolute -left-[38px] top-[7px] size-2.5 rounded-full ring-4 ring-paper transition-all duration-300',
                              isCurrent ? 'bg-accent' : 'bg-line-strong',
                              'group-hover/role:scale-125 group-hover/role:bg-accent'
                            )}
                          />

                          <div className="mb-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                            <h4 className="text-lg font-medium text-ink">
                              {role.title}
                              {roleEmploymentType && (
                                <span className="font-normal text-muted">
                                  {' '}
                                  · {roleEmploymentType}
                                </span>
                              )}
                            </h4>
                            <span className="shrink-0 text-sm text-muted">
                              {role.period}
                            </span>
                          </div>

                          {roleLocation && (
                            <p className="mb-2 text-sm text-muted">
                              {roleLocation}
                            </p>
                          )}

                          {roleDescription && (
                            <div className="mt-2 space-y-4 text-sm leading-relaxed text-muted">
                              {roleDescription
                                .split('\n\n')
                                .map((paragraph, i) => (
                                  <p key={i}>{paragraph.trim()}</p>
                                ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section id="connect" className="scroll-mt-24">
        <Reveal>
          <h2 className="display mb-8 text-4xl text-ink">Connect</h2>
          <p className="mb-8 text-muted">
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
