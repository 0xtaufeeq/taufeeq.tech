/**
 * One-off asset generation: favicon PNGs + apple-touch-icon from favicon.svg.
 * (The OG image is rendered by app/opengraph-image.tsx at build time.)
 * Run: node scripts/generate-assets.mjs
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const PUBLIC = path.join(process.cwd(), 'public')

const svg = await readFile(path.join(PUBLIC, 'favicon.svg'))

const icons = [
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' }
]

for (const { size, name } of icons) {
  const out = path.join(PUBLIC, name)
  await sharp(svg, { density: 512 }).resize(size, size).png().toFile(out)
  console.log(`✓ ${name} (${size}x${size})`)
}
