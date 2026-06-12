'use client'

import 'leaflet/dist/leaflet.css'

import type { Map as LeafletMap, ZoomPanOptions } from 'leaflet'
import { useRef, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Minus, Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

const LATITUDE = 12.9716
const LONGITUDE = 77.5946

const ZOOM_STEP = 2
const MAX_ZOOM = 12
const MIN_ZOOM = 8
const MAP_URL = '/api/map/{z}/{x}/{y}.png'

const zoomOptions: ZoomPanOptions = {
  animate: true,
  duration: 0.5,
  easeLinearity: 0.25
}

interface ZoomButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
  hide?: boolean
  label: string
}

const ZoomButton = ({ onClick, children, className, hide, label }: ZoomButtonProps) => (
  <button
    onClick={onClick}
    aria-label={label}
    aria-hidden={hide}
    tabIndex={hide ? -1 : 0}
    className={cn(
      'absolute z-[1000] size-10 rounded-full bg-zinc-950 leading-none outline outline-2 outline-zinc-700',
      'scale-100 transition-all duration-300 hover:outline-4',
      'flex items-center justify-center text-zinc-100',
      hide && 'scale-0',
      className
    )}
  >
    {children}
  </button>
)

export default function MapLocation({ className }: { className?: string }) {
  const mapRef = useRef<LeafletMap>(null)
  const [currentZoom, setCurrentZoom] = useState(MAX_ZOOM)

  const zoom = (step: number) => () =>
    setCurrentZoom((prev) => {
      const next = prev + step
      mapRef.current?.setZoom(next, zoomOptions)
      return next
    })

  return (
    <div className="group h-full">
      <MapContainer
        ref={mapRef}
        zoom={MAX_ZOOM}
        center={[LATITUDE, LONGITUDE]}
        dragging={false}
        touchZoom={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
        className={cn(
          'brightness-[0.64] -hue-rotate-[24deg] saturate-[0.86]',
          'h-full min-h-full w-full',
          className
        )}
        trackResize
      >
        <TileLayer
          url={MAP_URL}
          zoomOffset={-1}
          minZoom={1}
          tileSize={512}
          eventHandlers={{
            tileloadstart: (event) => {
              event.tile.setAttribute('loading', 'lazy')
            }
          }}
        />
      </MapContainer>

      <div className="pointer-events-none absolute inset-0 z-[999] flex items-center justify-center">
        <div className="relative size-16">
          <div className="absolute size-full animate-ping rounded-full bg-accent-300/20 opacity-65 blur-sm" />
          <div className="drop-shadow-accent size-full rounded-full bg-accent-400/30" />
        </div>
      </div>

      <ZoomButton
        onClick={zoom(-ZOOM_STEP)}
        className="bottom-4 left-4"
        hide={currentZoom <= MIN_ZOOM}
        label="Zoom out"
      >
        <Minus className="size-4" />
      </ZoomButton>

      <ZoomButton
        onClick={zoom(ZOOM_STEP)}
        className="bottom-4 right-4"
        hide={currentZoom >= MAX_ZOOM}
        label="Zoom in"
      >
        <Plus className="size-4" />
      </ZoomButton>
    </div>
  )
}
