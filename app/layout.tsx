import type { Metadata, Viewport } from 'next'
import { DM_Mono, Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'
import { ViewTransitions } from 'next-view-transitions'
import { Analytics } from '@vercel/analytics/next'

import { CalProvider } from '@/components/providers/CalProvider'
import { CustomCursor } from '@/components/providers/CustomCursor'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { DockNav } from '@/components/nav/DockNav'
import { Footer } from '@/components/footer/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { personJsonLd, websiteJsonLd } from '@/lib/jsonld'
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
    default: `${SITE.title} — ${SITE.tagline}`,
    template: `%s | ${SITE.title}`
  },
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  // og:image / twitter:image come from app/opengraph-image.tsx (file
  // convention); per-post hero images in generateMetadata still override it.
  openGraph: {
    title: `${SITE.title} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.title,
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.title} — ${SITE.tagline}`,
    description: SITE.description,
    creator: `@${SITE.handle}`
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png'
  }
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
    <ViewTransitions>
      <html
        lang="en"
        data-scroll-behavior="smooth"
        className={`dark ${switzer.variable} ${playfair.variable} ${dmMono.variable}`}
      >
      <body className="flex min-h-dvh flex-col items-center overflow-x-hidden bg-zinc-950 font-sans text-white antialiased">
        {/* React hoists this to <head>; metadata.alternates can't express it
            without being clobbered by per-page canonical overrides. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={SITE.title}
          href="/feed.xml"
        />
        <JsonLd data={[personJsonLd, websiteJsonLd]} />
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
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
