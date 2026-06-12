const PLAYER_URL = 'https://api.spotify.com/v1/me/player'
const FALLBACK_ALBUM_ART =
  'https://i.scdn.co/image/ab6761610000e5eb8acf72f64b557d7cfd787642'

export interface SpotifyData {
  isPlaying: boolean
  isNotListening: boolean
  title: string
  artist: string
  songUrl: string
  albumImageUrl: string
}

const NOT_LISTENING: SpotifyData = {
  isPlaying: false,
  isNotListening: true,
  title: 'Not listening to music',
  artist: 'Spotify',
  songUrl: 'https://open.spotify.com',
  albumImageUrl: FALLBACK_ALBUM_ART
}

const getAccessToken = async (): Promise<string> => {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? ''
    }),
    cache: 'no-store'
  })

  const { access_token } = await response.json()
  return access_token
}

const authHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
  cache: 'no-store' as const
})

const mapTrack = (track: any) => ({
  songUrl: track.external_urls.spotify as string,
  title: track.name as string,
  albumImageUrl: track.album.images[0].url as string,
  artist: track.artists.map((a: { name: string }) => a.name).join(', ')
})

export async function getSpotifyData(): Promise<SpotifyData> {
  try {
    const token = await getAccessToken()
    const nowPlaying = await fetch(
      `${PLAYER_URL}/currently-playing`,
      authHeader(token)
    )

    if (nowPlaying.status === 204) {
      try {
        const recent = await fetch(
          `${PLAYER_URL}/recently-played?limit=1`,
          authHeader(token)
        )
        const {
          items: [{ track }]
        } = await recent.json()
        return { isPlaying: false, isNotListening: false, ...mapTrack(track) }
      } catch {
        return NOT_LISTENING
      }
    }

    const { item: track } = await nowPlaying.json()
    return { isPlaying: true, isNotListening: false, ...mapTrack(track) }
  } catch {
    return NOT_LISTENING
  }
}
