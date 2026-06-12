'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

import { cn } from '@/lib/utils'

import { BentoBadge } from './BentoCard'

interface WeatherData {
  temp: number
  condition: string
  icon: string
}

const getWeatherIcon = (code: string) => {
  const codeNum = parseInt(code)
  if (codeNum === 113) return '☀️'
  if ([116, 119, 122].includes(codeNum)) return '⛅'
  if ([143, 248, 260].includes(codeNum)) return '🌫️'
  if (
    [176, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 317, 320, 323, 326].includes(codeNum)
  )
    return '🌧️'
  if (
    [179, 182, 185, 227, 230, 329, 332, 335, 338, 350, 371, 374, 377].includes(codeNum)
  )
    return '🌨️'
  if ([200, 386, 389, 392, 395].includes(codeNum)) return '⛈️'
  return '☁️'
}

export function LocalWeather() {
  // null until mounted: server time can never match the client clock (hydration)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://wttr.in/?format=j1')
        const data = await response.json()
        const current = data.current_condition[0]
        setWeather({
          temp: parseInt(current.temp_C),
          condition: current.weatherDesc[0].value,
          icon: getWeatherIcon(current.weatherCode)
        })
      } catch {
        // leave the weather row empty
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date | null) =>
    date
      ? date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      : '--:--:--'

  const formatDate = (date: Date | null) =>
    date
      ? date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      : '—'

  const getTimeZone = () => {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZoneName: 'short'
    }).formatToParts(new Date())
    return parts.find((part) => part.type === 'timeZoneName')?.value || 'UTC'
  }

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl px-5 pb-6 pt-4">
      {/* Large background time */}
      <p
        className={cn(
          'absolute font-serif text-[120px] font-extrabold text-transparent',
          'left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 leading-none opacity-40',
          'bg-gradient-to-b from-zinc-800 to-[var(--card)] bg-clip-text tabular-nums'
        )}
      >
        {formatTime(currentTime).substring(0, 5).replace(':', '')}
      </p>

      <BentoBadge icon={<Clock />} text="Local Time" className="w-fit" />

      <div className="space-y-4">
        <div>
          <p className="text-[56px] font-light leading-tight tracking-wide tabular-nums text-zinc-100 max-sm:text-4xl">
            {formatTime(currentTime)}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-zinc-400">{formatDate(currentTime)}</p>
            <span className="text-zinc-600">•</span>
            <p className="text-sm text-zinc-500">
              {currentTime ? getTimeZone() : ''}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 text-zinc-400">
            <div className="size-4 animate-pulse rounded bg-zinc-700" />
            <div className="h-4 w-20 animate-pulse rounded bg-zinc-700" />
          </div>
        ) : weather ? (
          <div className="flex items-center gap-4 text-zinc-200">
            <span className="text-3xl">{weather.icon}</span>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-semibold">{weather.temp}°C</p>
              <p className="text-sm text-zinc-400">• {weather.condition}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
