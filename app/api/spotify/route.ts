import { NextResponse } from 'next/server'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

async function getAccessToken(): Promise<string> {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error('Spotify environment variables are not configured')
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
    next: { revalidate: 0 },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch Spotify token')
  }

  const data = await response.json()
  return data.access_token
}

function normalizeCurrentlyPlaying(data: any) {
  const track = data.item
  return {
    isPlaying: data.is_playing,
    title: track.name,
    artist: track.artists.map((artist: any) => artist.name).join(', '),
    album: track.album.name,
    albumArt: track.album.images[0]?.url ?? '',
    songUrl: track.external_urls.spotify,
    progressMs: data.progress_ms,
    durationMs: track.duration_ms,
  }
}

function normalizeRecentlyPlayed(data: any) {
  const track = data.items[0]?.track
  if (!track) return null

  return {
    isPlaying: false,
    title: track.name,
    artist: track.artists.map((artist: any) => artist.name).join(', '),
    album: track.album.name,
    albumArt: track.album.images[0]?.url ?? '',
    songUrl: track.external_urls.spotify,
    progressMs: 0,
    durationMs: track.duration_ms,
  }
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json({ isPlaying: false, unavailable: true })
  }

  try {
    const accessToken = await getAccessToken()
    const headers = { Authorization: `Bearer ${accessToken}` }

    const nowPlayingResponse = await fetch(NOW_PLAYING, {
      headers,
      next: { revalidate: 0 },
    })

    if (nowPlayingResponse.status === 200) {
      const nowPlayingData = await nowPlayingResponse.json()
      if (nowPlayingData?.item?.type === 'track') {
        return NextResponse.json(normalizeCurrentlyPlaying(nowPlayingData))
      }
    }

    const recentResponse = await fetch(RECENT, { headers, next: { revalidate: 0 } })
    if (recentResponse.ok) {
      const recentData = await recentResponse.json()
      const normalized = normalizeRecentlyPlayed(recentData)
      if (normalized) {
        return NextResponse.json(normalized)
      }
    }

    return NextResponse.json({ isPlaying: false })
  } catch (error) {
    console.error('[Spotify API]', error)
    return NextResponse.json({ isPlaying: false, unavailable: true }, { status: 200 })
  }
}
