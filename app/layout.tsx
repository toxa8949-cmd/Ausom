import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart'
import { ThemeProvider } from '@/lib/theme'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'

export const viewport: Viewport = {
  themeColor: '#F5C200',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Ausom Ukraine — Електросамокати для дорослих',
  description: "Офіційний дистриб'ютор Ausom в Україні. Гарантія 2 роки, безкоштовна доставка.",
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: SITE_URL,
    siteName: 'Ausom Ukraine',
    title: 'Ausom Ukraine — Електросамокати для дорослих',
    description: "Офіційний дистриб'ютор Ausom в Україні. Гарантія 2 роки, безкоштовна доставка.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ausom Ukraine — Електросамокати для дорослих',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ausom Ukraine — Електросамокати для дорослих',
    description: "Офіційний дистриб'ютор Ausom в Україні.",
    images: ['/og-image.jpg'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ausom Ukraine',
  url: SITE_URL,
  logo: SITE_URL + '/icon-512.png',
  description: "Офіційний дистриб'ютор електросамокатів Ausom та Kukirin в Україні.",
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Ukrainian',
  },
  sameAs: [
    'https://www.instagram.com/ausom.ua',
    'https://t.me/ausom_ua',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ausom Ukraine',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: SITE_URL + '/catalog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
 (function(){
   try {
     var t = localStorage.getItem('ausom-theme') === 'dark' ? 'dark' : 'light';
     document.documentElement.setAttribute('data-theme', t);
   } catch(e){}
 })();
 `}} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
