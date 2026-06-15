'use client'

import dynamic from 'next/dynamic'

/** Leaflet touches `window` at import time — load it client-side only. */
const MapLocation = dynamic(() => import('./MapLocation'), {
  ssr: false,
  loading: () => (
    <div className="size-full animate-pulse rounded-3xl bg-card" />
  )
})

export function MapCard() {
  return <MapLocation className="rounded-3xl" />
}
