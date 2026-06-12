import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { GithubCard } from './GithubCard'

/** Imports are stripped from MDX bodies — these components fill them in. */
const components = {
  GithubCard,
  Tooltip: ({ children }: { children?: React.ReactNode }) => <>{children}</>
}

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [rehypePrettyCode, { theme: 'vesper', keepBackground: false }]
          ]
        }
      }}
    />
  )
}
