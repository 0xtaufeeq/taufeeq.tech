import { GitFork, Star } from 'lucide-react'

import { GithubIcon } from '@/components/icons'
import { getRepoInfo } from '@/lib/github'

interface GithubCardProps {
  owner: string
  repository: string
}

/** Live GitHub repository card used inside MDX content. */
export async function GithubCard({ owner, repository }: GithubCardProps) {
  const repo = await getRepoInfo(owner, repository)

  const url = repo?.url ?? `https://github.com/${owner}/${repository}`
  const name = repo?.nameWithOwner ?? `${owner}/${repository}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="ui-card group flex items-center gap-4 p-5 no-underline"
    >
      <GithubIcon className="size-8 shrink-0 text-zinc-300" />
      <div className="min-w-0 grow">
        <p className="truncate font-medium text-zinc-100 group-hover:text-accent-300">
          {name}
        </p>
        {repo?.description && (
          <p className="truncate text-sm text-zinc-400">{repo.description}</p>
        )}
      </div>
      {repo && (
        <div className="flex shrink-0 items-center gap-4 text-sm text-zinc-400">
          <span className="flex items-center gap-1">
            <Star className="size-4" />
            {repo.stargazerCount}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="size-4" />
            {repo.forkCount}
          </span>
        </div>
      )}
    </a>
  )
}
