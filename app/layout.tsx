import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/cart'
import { ThemeProvider } from '@/lib/theme'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'

// next/font preloads Inter from Google Fonts at build time
// eliminates render-blocking @import and improves LCP
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300','400','500','600','700','800','900'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'

export const viewport: Viewport = {
  themeColor: '#F5C200',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Купити електросамокат Ausom в Україні — офіційний дилер | Ausom UA',
    template: '%s | Ausom UA',
  },
  description:
    "Купити електросамокат Ausom або Kukirin в Україні. Офіційний дистриб'ютор. Гарантія 2 роки, безкоштовна доставка по Україні. Моделі: Ausom L1, L2, L2 Max, DT2 Pro, L2 Dual, L2 Max Dual.",
  keywords: [
    'купити ausom', 'ausom', 'ausom україна', 'самокат ausom', 'ausom київ',
    'електросамокат ausom', 'купити електросамокат україна', 'ausom l2 max',
    'ausom dt2 pro', 'kukirin', 'купити kukirin', 'електросамокат київ',
    'електросамокат для дорослих', 'офіційний дилер ausom',
  ],
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
    title: 'Купити електросамокат Ausom в Україні — офіційний дилер',
    description:
      "Офіційний дистриб'ютор Ausom та Kukirin в Україні. Гарантія 2 роки, безкоштовна доставка.",
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
    title: 'Купити електросамокат Ausom в Україні — офіційний дилер',
    description:
      "Офіційний дистриб'ютор Ausom та Kukirin в Україні. Гарантія 2 роки, доставка по Україні.",
    images: ['/og-image.jpg'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Ausom Ukraine',
  url: SITE_URL,
  logo: SITE_URL + '/icon-512.png',
  image: SITE_URL + '/og-image.jpg',
  description:
    "Офіційний дистриб'ютор електросамокатів Ausom та Kukirin в Україні. Гарантія 2 роки, безкоштовна доставка.",
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'UA',
    addressRegion: 'Київ',
    addressLocality: 'Київ',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Ukrainian',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Ukraine',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Електросамокати Ausom та Kukirin',
    url: SITE_URL + '/catalog',
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
    <html lang="uk" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var t=localStorage.getItem("ausom-theme")==="dark"?"dark":"light";document.documentElement.setAttribute("data-theme",t);}catch(e){}})();',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
            {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-NKBF2KBT4G" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NKBF2KBT4G');
          `,
        }}
      />
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-NKBF2KBT4G" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NKBF2KBT4G');
          `,
        }}
      />
        {/* Google Analytics */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-NKBF2KBT4G" />
            <script
                      dangerouslySetInnerHTML={{
                                  __html: `
                                              window.dataLayer = window.dataLayer || [];
                                                          function gtag(){dataLayer.push(arguments);}
                                                                      gtag('js', new Date());
                                                                                  gtag('config', 'G-NKBF2KBT4G');
                                                                                            `,
                      }}
                    />
            </head>
      <body className={inter.className}>
        <ThemeProvider>
          <CartProvider>
            <a href="#main-content" className="skip-to-content">Перейти до вмісту</a>
            <AnnouncementBar />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
