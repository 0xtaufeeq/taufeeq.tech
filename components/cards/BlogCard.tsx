import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

import type { BlogEntry } from '@/lib/content'
import { formatDate } from '@/lib/utils'

export function BlogCard({ post }: { post: BlogEntry }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-8 border-t border-t-zinc-900 py-10 max-md:flex-col"
    >
      <div className="overflow-clip rounded-lg md:max-w-[216px]">
        <Image
          src={post.heroImage}
          alt={post.title}
          width={432}
          height={288}
          className="aspect-[2] w-full object-cover transition-all duration-700 group-hover:scale-105 md:aspect-[1.5]"
        />
      </div>
      <div className="flex w-full flex-col justify-between">
        <div className="font-light">
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span>{formatDate(new Date(post.pubDate))}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {post.readingMinutes} min read
            </span>
          </div>
          <p className="font-display mt-3 line-clamp-2 text-lg font-semibold leading-[1.4] text-zinc-100">
            {post.title}
          </p>
          <p className="mt-2 line-clamp-2 text-zinc-400 max-md:text-sm">
            {post.description}
          </p>
        </div>

        <div className="mt-4 flex justify-between gap-6 max-xs:flex-col-reverse xs:mt-6 xs:items-center">
          <span className="w-fit text-sm text-accent-400">
            Read more
            <ArrowRight className="ml-1 inline-block size-4 transition-all duration-300 group-hover:ml-2" />
          </span>
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
        </div>
      </div>
    </Link>
  )
}
