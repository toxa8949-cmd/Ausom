import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart'
import { ThemeProvider } from '@/lib/theme'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnnouncementBar from '@/components/layout/AnnouncementBar'

// Fallback використовується тільки коли NEXT_PUBLIC_SITE_URL не встановлено.
// На Vercel обов'язково вказуй https://ausom.in.ua у Environment Variables.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  'Ausom Ukraine — Електросамокати для дорослих | Офіційний дистриб\'ютор',
    template: '%s | Ausom UA',
  },
  description: 'Офіційний дистриб\'ютор Ausom в Україні. Електросамокати для дорослих з гарантією 2 роки та безкоштовною доставкою. Ausom L1, L2, L2 Max, DT2 Pro та партнерська лінійка Kukirin.',
  keywords: [
    'електросамокат',
    'електричний самокат',
    'самокат для дорослих',
    'Ausom Україна',
    'Ausom DT2 Pro',
    'Ausom L1',
    'Ausom L2',
    'Ausom L2 Max',
    'Kukirin Україна',
    'купити електросамокат',
    'електросамокат з доставкою',
    'позашляховий самокат',
    'міський самокат',
  ],
  authors: [{ name: 'Ausom Ukraine' }],
  creator:   'Ausom Ukraine',
  publisher: 'Ausom Ukraine',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type:     'website',
    locale:   'uk_UA',
    url:       SITE_URL,
    siteName: 'Ausom Ukraine',
    title:    'Ausom Ukraine — Електросамокати для дорослих',
    description: 'Офіційний дистриб\'ютор Ausom в Україні. Гарантія 2 роки, безкоштовна доставка.',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Ausom Ukraine — Електросамокати для дорослих',
    description: 'Офіційний дистриб\'ютор Ausom. Гарантія 2 роки, безкоштовна доставка.',
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:  true,
      follow: true,
      'max-image-preview':   'large',
      'max-snippet':         -1,
      'max-video-preview':   -1,
    },
  },
  // Щоб верифікувати Google Search Console — постав код звідти сюди:
  // verification: { google: 'твій-код-верифікації' },
}

// Organization + WebSite JSON-LD для Google rich results
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type':    'Store',
  name:       'Ausom Ukraine',
  url:         SITE_URL,
  description: 'Офіційний дистриб\'ютор Ausom в Україні',
  areaServed:  { '@type': 'Country', name: 'Ukraine' },
  sameAs: [],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  name:       'Ausom Ukraine',
  url:         SITE_URL,
  inLanguage: 'uk-UA',
  potentialAction: {
    '@type':       'SearchAction',
    target:        `${SITE_URL}/catalog?q={search_term_string}`,
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
              var t = localStorage.getItem('ausom-theme') ||
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              document.documentElement.setAttribute('data-theme', t);
            } catch(e){}
          })();
        `}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
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
