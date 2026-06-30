import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
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

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap'
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap'
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
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
  themeColor: '#fbfbf7'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Set theme before paint to avoid a flash of the wrong palette. Default is
  // "system": with no stored preference we follow the OS and keep tracking it
  // live via matchMedia. An explicit toggle (stored 'light'/'dark') wins and
  // stops the live following.
  const themeScript = `(function(){try{var q=window.matchMedia('(prefers-color-scheme: dark)');var apply=function(){var t=localStorage.getItem('theme');var dark=t==='dark'||(!t&&q.matches);document.documentElement.classList.toggle('dark',dark);};apply();q.addEventListener('change',apply);}catch(e){}})();`

  return (
    <ViewTransitions>
      <html
        lang="en"
        data-scroll-behavior="smooth"
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
        suppressHydrationWarning
      >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col items-center overflow-x-hidden bg-paper font-sans text-ink antialiased">
        {/* React hoists this to <head>; metadata.alternates can't express it
            without being clobbered by per-page canonical overrides. */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={SITE.title}
          href="/feed.xml"
        />
        <JsonLd data={[personJsonLd, websiteJsonLd]} />
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
