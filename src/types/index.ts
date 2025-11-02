export interface GithubContributionDay {
  count: number
  date: string
}

export interface GithubContributionData {
  lastPushedAt: string
  totalContributions: number
  contributions: GithubContributionDay[]
}

export interface GithubRepositoryLastUpdated {
  name: string
  description: string
  forkCount: number
  stargazerCount: number
  url: string
  pushedAt: string
  updatedAt: string
  defaultBranchRef?: {
    target: {
      oid: string
      committedDate: string
      author: {
        name: string
        user: {
          login: string
        }
      }
      commitUrl: string
    }
  }
}

export type MonkeyTypeLanguage = 'indonesian' | 'english'

export interface MonkeyTypeData {
  acc: number
  consistency: number
  language: MonkeyTypeLanguage
  wpm: number
  time: number
}
