import type { MetadataRoute } from 'next'

import { SITE } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.title,
    short_name: SITE.title,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0c09',
    theme_color: '#0b0c09',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  }
}
