import { NextResponse } from 'next/server'

import { getGithubContributions } from '@/lib/github'

export async function GET() {
  const data = await getGithubContributions()
  if (!data) {
    return NextResponse.json(
      { error: 'GitHub contributions unavailable' },
      { status: 502 }
    )
  }
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=86400' }
  })
}
