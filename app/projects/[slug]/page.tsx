import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Clock, ExternalLink } from 'lucide-react'

import { GithubIcon } from '@/components/icons'
import { Mdx } from '@/components/mdx/Mdx'
import { JsonLd } from '@/components/seo/JsonLd'
import { BackToHome } from '@/components/ui/BackToHome'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { getProject, getProjects } from '@/lib/content'
import { projectJsonLd } from '@/lib/jsonld'
import { SITE } from '@/lib/site'
import { formatDate } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${slug}`,
      images: [project.heroImage]
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      creator: `@${SITE.handle}`,
      images: [project.heroImage]
    }
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <article className="mx-auto max-w-3xl py-16">
      <JsonLd data={projectJsonLd(project)} />
      <ScrollProgress />
      <BackToHome />

      <header className="mt-12 space-y-6">
        <p className="font-mono text-sm tracking-widest text-accent-400">
          {project.year} — PROJECT
        </p>
        <h1 className="page-title text-zinc-100">{project.title}</h1>
        <p className="text-lg leading-relaxed text-zinc-400">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {project.readingMinutes} min read
          </span>
          {project.updatedDate && (
            <span>Updated {formatDate(new Date(project.updatedDate))}</span>
          )}
        </div>

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {link.icon === 'Github' ? (
                  <GithubIcon className="size-4" />
                ) : (
                  <ExternalLink className="size-4" />
                )}
                {link.name}
              </a>
            ))}
          </div>
        )}

        <div className="overflow-clip rounded-xl border border-zinc-800">
          <Image
            src={project.heroImage}
            alt={project.title}
            width={1200}
            height={686}
            priority
            className="w-full object-cover object-top"
          />
        </div>
      </header>

      <div className="prose prose-invert mt-12 max-w-none prose-headings:font-heading prose-headings:text-zinc-100 prose-a:text-accent-400 prose-strong:text-zinc-200">
        <Mdx source={project.body} />
      </div>
    </article>
  )
}
