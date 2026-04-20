import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'

export const metadata: Metadata = {
    title: 'Блог — Поради, огляди, гіди покупця',
    description:
          'Статті про електросамокати: огляди моделей Ausom і Kukirin, гіди покупця, поради з обслуговування та порівняння характеристик.',
    alternates: {
          canonical: `${SITE_URL}/blog`,
    },
    openGraph: {
          title: 'Блог Ausom UA — Поради та огляди електросамокатів',
          description: 'Все про електросамокати — від вибору до обслуговування.',
          type: 'website',
          url: `${SITE_URL}/blog`,
          siteName: 'Ausom UA',
          locale: 'uk_UA',
          images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Блог Ausom UA' }],
    },
    twitter: {
          card: 'summary_large_image',
          title: 'Блог Ausom UA — Поради та огляди електросамокатів',
          description: 'Все про електросамокати — від вибору до обслуговування.',
          images: [`${SITE_URL}/og-image.jpg`],
    },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return children
}
