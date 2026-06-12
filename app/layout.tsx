import type { Metadata, Viewport } from 'next'
import { DM_Mono, Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'

import { CalProvider } from '@/components/providers/CalProvider'
import { CustomCursor } from '@/components/providers/CustomCursor'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { DockNav } from '@/components/nav/DockNav'
import { Footer } from '@/components/footer/Footer'
import { SITE } from '@/lib/site'

import './globals.css'

const switzer = localFont({
  src: '../public/fonts/Switzer-Variable.woff2',
  variable: '--font-switzer',
  display: 'swap'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap'
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.title}`
  },
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.title,
    images: ['/images/og_main.png'],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    creator: '@0xtaufeeq',
    images: ['/images/og_main.png']
  },
  icons: { icon: '/favicon.svg' }
}

export const viewport: Viewport = {
  themeColor: '#050505'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark ${switzer.variable} ${playfair.variable} ${dmMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col items-center overflow-x-hidden bg-zinc-950 font-sans text-white antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <CalProvider />
        <SmoothScroll>
          <main className="w-full max-w-[1200px] px-12 pb-16 tracking-wide max-sm:px-4">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <DockNav />
      </body>
    </html>
  )
}
