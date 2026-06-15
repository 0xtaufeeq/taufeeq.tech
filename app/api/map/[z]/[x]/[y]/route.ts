import type { NextRequest } from 'next/server'

interface RouteParams {
  params: Promise<{ z: string; x: string; y: string }>
}

/** Proxies MapTiler tiles so the API key never reaches the client. */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { z, x, y } = await params
  // the catch-all segment arrives as "123.png"
  const tileY = y.replace(/\.png$/, '')

  if (!z || !x || !tileY) {
    return new Response(null, { status: 400, statusText: 'Bad request' })
  }

  const response = await fetch(
    `https://api.maptiler.com/maps/streets-v2-light/${z}/${x}/${tileY}.png?key=${process.env.MAPTILER_API_KEY}`
  )

  if (!response.ok) {
    return new Response('Error fetching tile', { status: response.status })
  }

  const headers = new Headers(response.headers)
  headers.set('Cache-Control', 'public, max-age=86400')

  return new Response(response.body, { status: response.status, headers })
}
