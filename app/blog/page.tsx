import type { Metadata } from 'next'
import { Pencil } from 'lucide-react'

import { BlogCard } from '@/components/cards/BlogCard'
import { Reveal } from '@/components/motion/Reveal'
import { BackToHome } from '@/components/ui/BackToHome'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getBlogPosts } from '@/lib/content'
import { BLOG_META } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog',
  description: BLOG_META.description
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <>
      <div className="mt-16 items-center justify-between gap-4 sm:mt-40 lg:flex">
        <SectionHeader
          badge={<Pencil className="size-4" />}
          section="Blog"
          title={BLOG_META.title}
          description={BLOG_META.description}
        />
        <BackToHome className="max-lg:hidden" />
      </div>
      <section className="mt-12 sm:mt-16">
        {posts.map((post) => (
          <Reveal key={post.slug}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </section>
    </>
  )
}
