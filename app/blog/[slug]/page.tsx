import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Clock } from 'lucide-react'

import { Mdx } from '@/components/mdx/Mdx'
import { BackToHome } from '@/components/ui/BackToHome'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { getBlogPost, getBlogPosts } from '@/lib/content'
import { formatDate } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getBlogPosts().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.pubDate,
      images: [post.heroImage]
    }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl py-16">
      <ScrollProgress />
      <BackToHome />

      <header className="mt-12 space-y-6">
        <div className="flex flex-wrap items-center gap-4 font-mono text-sm text-zinc-500">
          <time dateTime={post.pubDate} className="text-accent-400">
            {formatDate(new Date(post.pubDate))}
          </time>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {post.readingMinutes} min read
          </span>
        </div>

        <h1 className="page-title text-zinc-100">{post.title}</h1>
        <p className="text-lg leading-relaxed text-zinc-400">
          {post.description}
        </p>

        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded bg-zinc-900 px-2 py-1 font-mono text-xs tracking-tight text-zinc-400"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="overflow-clip rounded-xl border border-zinc-800">
          <Image
            src={post.heroImage}
            alt={post.title}
            width={1200}
            height={675}
            priority
            className="aspect-video w-full object-cover"
          />
        </div>
      </header>

      <div className="prose prose-invert mt-12 max-w-none prose-headings:font-heading prose-headings:text-zinc-100 prose-a:text-accent-400 prose-strong:text-zinc-200">
        <Mdx source={post.body} />
      </div>
    </article>
  )
}
