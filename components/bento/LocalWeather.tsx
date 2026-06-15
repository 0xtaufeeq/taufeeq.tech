'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

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
      <BentoBadge icon={<Clock />} text="Local Time" className="w-fit" />

      <div className="space-y-5">
        <div className="space-y-2">
          <p className="text-[56px] font-light leading-none tracking-tight tabular-nums text-ink max-sm:text-4xl">
            {formatTime(currentTime)}
          </p>
          <p className="label">
            {formatDate(currentTime)}
            {currentTime ? ` · ${getTimeZone()}` : ''}
          </p>
        </div>

        <div className="hairline" />

        {loading ? (
          <div className="flex items-center gap-3 text-muted">
            <div className="size-4 animate-pulse rounded bg-line" />
            <div className="h-4 w-20 animate-pulse rounded bg-line" />
          </div>
        ) : weather ? (
          <div className="flex items-center gap-3 text-ink">
            <span className="text-2xl">{weather.icon}</span>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-semibold tabular-nums">
                {weather.temp}°C
              </p>
              <p className="text-sm text-muted">· {weather.condition}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
