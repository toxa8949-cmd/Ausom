import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'

export const metadata: Metadata = {
    title: 'Каталог електросамокатів — Ausom, Kukirin',
    description:
          'Весь каталог електросамокатів: Ausom L1, L2, L2 Max, DT2 Pro та партнерська лінійка Kukirin. Порівняй моделі, обери свій ідеальний ride.',
    alternates: {
          canonical: `${SITE_URL}/catalog`,
    },
    openGraph: {
          title: 'Каталог електросамокатів | Ausom UA',
          description: 'Весь каталог електросамокатів Ausom та Kukirin з доставкою по Україні.',
          type: 'website',
          url: `${SITE_URL}/catalog`,
          siteName: 'Ausom UA',
          locale: 'uk_UA',
          images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Каталог електросамокатів Ausom та Kukirin' }],
    },
    twitter: {
          card: 'summary_large_image',
          title: 'Каталог електросамокатів | Ausom UA',
          description: 'Весь каталог електросамокатів Ausom та Kukirin з доставкою по Україні.',
          images: [`${SITE_URL}/og-image.jpg`],
    },
}

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
    return children
}
