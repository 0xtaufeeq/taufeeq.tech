import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN
} from 'astro:env/server'
import queryString from 'query-string'

const BASE_URL = 'https://api.spotify.com/v1/me/player'

type AccessToken = { access_token: string }
const getAccessToken = async (): Promise<AccessToken> => {
  const clientId = SPOTIFY_CLIENT_ID
  const clientSecret = SPOTIFY_CLIENT_SECRET
  const refreshToken = SPOTIFY_REFRESH_TOKEN

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  })

  return response.json()
}

const getAccessTokenHeader = (accessToken: string) => {
  return { headers: { Authorization: `Bearer ${accessToken}` } }
}

const getNowPlayingResponse = async (accessToken: string) => {
  return fetch(
    `${BASE_URL}/currently-playing`,
    getAccessTokenHeader(accessToken)
  )
}

const mapSpotifyData = (track: any) => {
  return {
    songUrl: track.external_urls.spotify as string,
    title: track.name as string,
    albumImageUrl: track.album.images[0].url as string,
    artist: track.artists
      .map((artist: { name: any }) => artist.name)
      .join(', ') as string
  }
}

const getRecentlyPlayed = async (accessToken: string) => {
  const response = await fetch(
    `${BASE_URL}/recently-played?limit=1`,
    getAccessTokenHeader(accessToken)
  )

  const {
    items: [{ track }]
  } = await response.json()

  return { isPlaying: false, isNotListening: false, ...mapSpotifyData(track) }
}

const getSpotifyData = async () => {
  try {
    const tokenData = await getAccessToken()

    const { access_token } = tokenData

    const nowPlayingResponse = await getNowPlayingResponse(access_token)

    if (nowPlayingResponse.status === 204) {
      // User is not currently playing music, try to get recently played
      try {
        return await getRecentlyPlayed(access_token)
      } catch (error) {
        // If we can't get recently played either, return a "not listening" state
        return {
          isPlaying: false,
          isNotListening: true,
          title: 'Not listening to music',
          artist: 'Spotify',
          songUrl: 'https://open.spotify.com',
          albumImageUrl: 'https://i.scdn.co/image/ab6761610000e5eb8acf72f64b557d7cfd787642' // Default Spotify logo
        }
      }
    }

    const { item: track } = await nowPlayingResponse.json()

    return { isPlaying: true, isNotListening: false, ...mapSpotifyData(track) }
  } catch (error) {
    // If there's any error (token issues, network, etc.), return a "not listening" state
    return {
      isPlaying: false,
      isNotListening: true,
      title: 'Not listening to music',
      artist: 'Spotify',
      songUrl: 'https://open.spotify.com',
      albumImageUrl: 'https://i.scdn.co/image/ab6761610000e5eb8acf72f64b557d7cfd787642' // Default Spotify logo
    }
  }
}

export type SpotifyData = ReturnType<typeof mapSpotifyData> & {
  isPlaying: boolean
  isNotListening: boolean
}

export default getSpotifyData
