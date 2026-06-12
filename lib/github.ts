export interface GithubContributionData {
  lastPushedAt: string
  totalContributions: number
  contributions: { count: number; date: string }[]
}

const GITHUB_GRAPHQL = 'https://api.github.com/graphql'

const CONTRIBUTIONS_QUERY = `
  query ($userName: String!) {
    user(login: $userName) {
      repositories(first: 1, orderBy: { direction: DESC, field: PUSHED_AT }) {
        nodes {
          name
          pushedAt
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

const REPO_INFO_QUERY = `
  query ($username: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $username) {
      id
      name
      nameWithOwner
      description
      forkCount
      stargazerCount
      openGraphImageUrl
      pushedAt
      updatedAt
      url
      defaultBranchRef {
        target {
          ... on Commit {
            oid
            committedDate
            author {
              name
              user {
                login
              }
            }
            commitUrl
          }
        }
      }
    }
  }
`

async function githubRequest<T>(
  query: string,
  variables: Record<string, string>
): Promise<T | null> {
  const token = process.env.GITHUB_ACCESS_TOKEN
  if (!token) return null

  try {
    const response = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 }
    })
    if (!response.ok) return null
    const { data } = await response.json()
    return data as T
  } catch {
    return null
  }
}

export async function getGithubContributions(): Promise<GithubContributionData | null> {
  const data = await githubRequest<any>(CONTRIBUTIONS_QUERY, {
    userName: '0xtaufeeq'
  })
  if (!data?.user) return null

  const calendar = data.user.contributionsCollection.contributionCalendar

  return {
    lastPushedAt: data.user.repositories.nodes[0]?.pushedAt,
    totalContributions: calendar.totalContributions,
    contributions: calendar.weeks.flatMap((week: any) =>
      week.contributionDays.map((day: any) => ({
        count: day.contributionCount,
        date: day.date as string
      }))
    )
  }
}

export interface RepoInfo {
  nameWithOwner: string
  description: string
  forkCount: number
  stargazerCount: number
  url: string
  pushedAt: string
  defaultBranchRef?: {
    target?: {
      oid: string
      committedDate: string
      commitUrl: string
      author?: { name?: string; user?: { login?: string } }
    }
  }
}

export async function getRepoInfo(
  username: string,
  repositoryName: string
): Promise<RepoInfo | null> {
  const data = await githubRequest<any>(REPO_INFO_QUERY, {
    username,
    repositoryName
  })
  return (data?.repository as RepoInfo) ?? null
}
