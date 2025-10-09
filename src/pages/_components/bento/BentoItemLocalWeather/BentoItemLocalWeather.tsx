import { useEffect, useState } from 'react'
import { Clock } from '@/components/icons/Clock'
import { cn } from '@/lib/utils'
import BentoBadge from '../BentoBadge'

interface WeatherData {
  temp: number
  condition: string
  icon: string
}

export function BentoItemLocalWeather() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) as unknown as number

    return () => clearInterval(timer)
  }, [])

  // Fetch weather data
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
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch weather:', error)
        setLoading(false)
      }
    }

    fetchWeather()
    const weatherInterval = setInterval(fetchWeather, 30 * 60 * 1000) as unknown as number
    
    return () => clearInterval(weatherInterval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const getTimeZone = () => {
    const formatter = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
    const parts = formatter.formatToParts(new Date())
    const timeZonePart = parts.find(part => part.type === 'timeZoneName')
    return timeZonePart?.value || 'UTC'
  }

  const getWeatherIcon = (code: string) => {
    const codeNum = parseInt(code)
    if (codeNum === 113) return '☀️'
    if ([116, 119, 122].includes(codeNum)) return '⛅'
    if ([143, 248, 260].includes(codeNum)) return '🌫️'
    if ([176, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 317, 320, 323, 326].includes(codeNum)) return '🌧️'
    if ([179, 182, 185, 227, 230, 317, 320, 323, 326, 329, 332, 335, 338, 350, 371, 374, 377].includes(codeNum)) return '🌨️'
    if ([200, 386, 389, 392, 395].includes(codeNum)) return '⛈️'
    return '☁️'
  }

  return (
    <div className='relative flex h-full flex-col justify-between overflow-hidden rounded-3xl px-5 pb-6 pt-4'>
      {/* Large background time */}
      <p
        className={cn(
          'font-display absolute text-[120px] font-extrabold text-transparent',
          'left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 leading-none opacity-40',
          'bg-gradient-to-b from-[#1E293B] to-[var(--card-background)] bg-clip-text tabular-nums'
        )}
      >
        {formatTime(currentTime).substring(0, 5).replace(':', '')}
      </p>

      <BentoBadge
        icon={Clock}
        text='Local Time'
        className={{ component: 'w-fit' }}
      />

      <div className='space-y-4'>
        {/* Time Display */}
        <div>
          <div className='flex items-baseline gap-2'>
            <p className='text-[56px] font-light leading-tight tracking-wide tabular-nums max-sm:text-4xl'>
              {formatTime(currentTime)}
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-slate-400'>{formatDate(currentTime)}</p>
            <span className='text-slate-600'>•</span>
            <p className='text-sm text-slate-500'>{getTimeZone()}</p>
          </div>
        </div>

        {/* Weather Display */}
        {loading ? (
          <div className='flex items-center gap-3 text-slate-400'>
            <div className='h-4 w-4 animate-pulse rounded bg-slate-700'></div>
            <div className='h-4 w-20 animate-pulse rounded bg-slate-700'></div>
          </div>
        ) : weather ? (
          <div className='flex items-center gap-4 text-slate-200'>
            <span className='text-3xl'>{weather.icon}</span>
            <div className='flex items-baseline gap-2'>
              <p className='text-2xl font-semibold'>{weather.temp}°C</p>
              <p className='text-sm text-slate-400'>• {weather.condition}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

