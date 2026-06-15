'use client'

import { useEffect, useState } from 'react'

import { SpotifyIcon } from '@/components/icons'
import type { SpotifyData } from '@/lib/spotify'
import { cn } from '@/lib/utils'

interface Props {
  initialData?: SpotifyData | null
}

export function NowPlaying({ initialData }: Props) {
  const [data, setData] = useState<SpotifyData | null>(initialData ?? null)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await fetch('/api/spotify')
        if (!res.ok) return
        const next = (await res.json()) as SpotifyData
        if (active) setData(next)
      } catch {
        // keep showing the last good state
      }
    }

    if (!initialData) load()
    const interval = setInterval(load, 10000)
    return () => {
      active = false
      clearInterval(interval)
    }
  }, [initialData])

  const notListening = !data || data.isNotListening
  const status = data?.isPlaying ? 'Now playing' : 'Last played'

  return (
    <a
      href={data?.songUrl ?? 'https://open.spotify.com'}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative flex h-full items-center gap-x-6 rounded-3xl p-5',
        'max-lg:p-6 md:max-lg:flex-col md:max-lg:items-start md:max-lg:justify-between'
      )}
    >
      <SpotifyIcon className="absolute right-4 top-4 size-5 text-muted transition-colors duration-300 group-hover:text-[#1DB954]" />
      <div className="aspect-square h-full rounded-xl border border-line bg-card p-3 max-lg:h-3/5 max-md:min-w-24">
        <div className="relative size-full">
          {notListening ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <SpotifyIcon className="size-2/5 text-muted" />
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.albumImageUrl}
              alt="Album art"
              className={cn('absolute size-full rounded-full object-cover', {
                'animate-[spin_5s_linear_infinite]': data.isPlaying
              })}
            />
          )}
        </div>
      </div>
      <div className="w-full space-y-1 overflow-hidden tracking-wide">
        {notListening ? (
          <p className="font-medium text-ink">Not listening to music</p>
        ) : (
          <>
            <p className="text-sm text-muted">{status}</p>
            <div className="items-center gap-x-4 space-y-1 md:max-lg:flex">
              <p className="max-w-full flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap font-medium text-ink">
                {data.title}
              </p>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm uppercase text-muted">
                {data.artist}
              </p>
            </div>
          </>
        )}
      </div>
    </a>
  )
}
