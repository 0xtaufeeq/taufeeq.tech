import { GITHUB_ACCESS_TOKEN } from 'astro:env/server'

interface LastUpdatedTimeData {
  lastUpdatedTime: string
  latestCommitUrl: string
}

const getLastUpdatedTimeByFile = async (
  filePath: string
): Promise<LastUpdatedTimeData> => {
  const API_URL = `https://api.github.com/repos/0xtaufeeq/taufeeq.tech/commits?`

  const params = new URLSearchParams({
    path: `src/content/${filePath}`,
    per_page: '1'
  }).toString()

  try {
    const response = await fetch(API_URL + params, {
      headers: { Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}` }
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No commit data found')
    }

    const [firstCommit] = data

    return {
      lastUpdatedTime: firstCommit.commit.committer.date,
      latestCommitUrl: firstCommit.html_url
    }
  } catch (error) {
    console.error('Error fetching last updated time:', error)
    // Return fallback data when GitHub API fails
    return {
      lastUpdatedTime: new Date().toISOString(),
      latestCommitUrl: ''
    }
  }
}

export default getLastUpdatedTimeByFile
