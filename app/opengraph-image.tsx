import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { SITE } from '@/lib/site'

export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const [semibold, medium] = await Promise.all([
    readFile(join(process.cwd(), 'public/fonts/Switzer-Semibold.otf')),
    readFile(join(process.cwd(), 'public/fonts/Switzer-Medium.otf'))
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 80,
          backgroundColor: '#fbfbf7',
          backgroundImage:
            'radial-gradient(#d6d4c8 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          fontFamily: 'Switzer'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 28
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: '#1c7d4d'
            }}
          />
          <div style={{ fontSize: 30, color: '#6c6c62', fontWeight: 500 }}>
            taufeeq.tech
          </div>
        </div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 600,
            color: '#16160f',
            letterSpacing: '-0.03em',
            lineHeight: 1
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 38,
            fontWeight: 500,
            color: '#6c6c62',
            letterSpacing: '-0.01em'
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Switzer', data: semibold, weight: 600, style: 'normal' },
        { name: 'Switzer', data: medium, weight: 500, style: 'normal' }
      ]
    }
  )
}
