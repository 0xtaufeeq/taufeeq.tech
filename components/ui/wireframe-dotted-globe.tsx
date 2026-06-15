'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

interface RotatingEarthProps {
  className?: string
}

interface DotData {
  lng: number
  lat: number
}

type Land = d3.GeoPermissibleObjects & {
  features: GeoJSON.Feature[]
}

/** Read a CSS custom property off <html> so the globe tracks the theme. */
function cssVar(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  return v || fallback
}

/**
 * Wireframe dotted globe rendered to a canvas with d3-geo. Auto-rotates,
 * drag to spin. Colours are pulled from the editorial CSS tokens and it
 * resizes to fill its parent. Reduced-motion users get a static globe.
 */
export default function RotatingEarth({ className = '' }: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const landRef = useRef<Land | null>(null)
  const dotsRef = useRef<DotData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [themeKey, setThemeKey] = useState(0)

  // re-init when the light/dark class on <html> flips
  useEffect(() => {
    const observer = new MutationObserver(() => setThemeKey((k) => k + 1))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const context = canvas.getContext('2d')
    if (!context) return

    const colors = {
      sphere: cssVar('--line-strong', '#d6d4c8'),
      graticule: cssVar('--ink', '#16160f'),
      land: cssVar('--ink', '#16160f'),
      dots: cssVar('--muted', '#6c6c62'),
      accent: cssVar('--accent', '#1c7d4d')
    }

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let radius = 0
    let w = 0
    let h = 0

    const projection = d3.geoOrthographic().clipAngle(90)
    const path = d3.geoPath(projection, context)

    const resize = () => {
      w = wrap.clientWidth
      h = wrap.clientHeight
      radius = Math.min(w, h) / 2.05
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      projection.scale(radius).translate([w / 2, h / 2])
      render()
    }

    const render = () => {
      context.clearRect(0, 0, w, h)
      const scaleFactor = projection.scale() / radius || 1

      // sphere outline
      context.beginPath()
      context.arc(w / 2, h / 2, projection.scale(), 0, 2 * Math.PI)
      context.strokeStyle = colors.sphere
      context.lineWidth = 1.25 * scaleFactor
      context.stroke()

      const land = landRef.current
      if (!land) return

      // graticule
      context.beginPath()
      path(d3.geoGraticule()())
      context.strokeStyle = colors.graticule
      context.lineWidth = 0.6 * scaleFactor
      context.globalAlpha = 0.08
      context.stroke()
      context.globalAlpha = 1

      // land outlines
      context.beginPath()
      land.features.forEach((f) => path(f))
      context.strokeStyle = colors.land
      context.lineWidth = 0.8 * scaleFactor
      context.globalAlpha = 0.3
      context.stroke()
      context.globalAlpha = 1

      // halftone dots
      for (const dot of dotsRef.current) {
        const p = projection([dot.lng, dot.lat])
        if (!p) continue
        if (p[0] < 0 || p[0] > w || p[1] < 0 || p[1] > h) continue
        context.beginPath()
        context.arc(p[0], p[1], 1.1 * scaleFactor, 0, 2 * Math.PI)
        context.fillStyle = colors.dots
        context.fill()
      }
    }

    const pointInPolygon = (
      point: [number, number],
      polygon: number[][]
    ): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }
      return inside
    }

    const pointInFeature = (
      point: [number, number],
      feature: GeoJSON.Feature
    ): boolean => {
      const geometry = feature.geometry
      if (geometry.type === 'Polygon') {
        const coords = geometry.coordinates as number[][][]
        if (!pointInPolygon(point, coords[0])) return false
        for (let i = 1; i < coords.length; i++) {
          if (pointInPolygon(point, coords[i])) return false
        }
        return true
      }
      if (geometry.type === 'MultiPolygon') {
        const polys = geometry.coordinates as number[][][][]
        for (const polygon of polys) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true
                break
              }
            }
            if (!inHole) return true
          }
        }
      }
      return false
    }

    const buildDots = (land: Land) => {
      const dots: DotData[] = []
      const step = 1.6
      land.features.forEach((feature) => {
        const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature)
        for (let lng = minLng; lng <= maxLng; lng += step) {
          for (let lat = minLat; lat <= maxLat; lat += step) {
            if (pointInFeature([lng, lat], feature)) dots.push({ lng, lat })
          }
        }
      })
      return dots
    }

    // rotation + drag
    const rotation: [number, number] = [0, -10]
    projection.rotate(rotation)
    let autoRotate = !reduceMotion

    const timer = d3.timer(() => {
      if (!autoRotate) return
      rotation[0] += 0.18
      projection.rotate(rotation)
      render()
    })

    const onMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const start: [number, number] = [rotation[0], rotation[1]]

      const onMove = (e: MouseEvent) => {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        rotation[0] = start[0] + dx * 0.4
        rotation[1] = Math.max(-90, Math.min(90, start[1] - dy * 0.4))
        projection.rotate(rotation)
        render()
      }
      const onUp = () => {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onUp)
        if (!reduceMotion) autoRotate = true
      }
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onUp)
    }
    canvas.addEventListener('mousedown', onMouseDown)

    const observer = new ResizeObserver(() => resize())
    observer.observe(wrap)

    const load = async () => {
      try {
        if (!landRef.current) {
          setIsLoading(true)
          const res = await fetch(
            'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json'
          )
          if (!res.ok) throw new Error('Failed to load land data')
          const land = (await res.json()) as Land
          landRef.current = land
          dotsRef.current = buildDots(land)
        }
        setIsLoading(false)
        resize()
      } catch {
        setError('Could not load globe data')
        setIsLoading(false)
      }
    }

    resize()
    load()

    return () => {
      timer.stop()
      observer.disconnect()
      canvas.removeEventListener('mousedown', onMouseDown)
    }
  }, [themeKey])

  return (
    <div ref={wrapRef} className={`relative size-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="size-full cursor-grab active:cursor-grabbing"
      />
      {isLoading && !error && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="label">Loading globe…</span>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <p className="text-sm text-muted">{error}</p>
        </div>
      )}
    </div>
  )
}
