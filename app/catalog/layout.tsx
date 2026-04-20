import { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'

export const metadata: Metadata = {
  title: 'Купити електросамокат в Україні — каталог Ausom та Kukirin',
  description:
    'Купити електросамокат Ausom або Kukirin в Україні. Ausom L1, L2, L2 Max, DT2 Pro, L2 Dual, Kukirin G2, G3, G4. Офіційна гарантія, безкоштовна доставка.',
  keywords: [
    'купити електросамокат', 'електросамокат україна', 'самокат ausom', 'ausom',
    'купити ausom', 'kukirin', 'купити kukirin', 'електросамокат київ',
    'каталог самокатів', 'ausom l2 max', 'ausom dt2 pro', 'ausom l1',
  ],
  alternates: {
    canonical: SITE_URL + '/catalog',
  },
  openGraph: {
    title: 'Купити електросамокат — каталог Ausom та Kukirin | Ausom UA',
    description:
      'Купити електросамокат Ausom або Kukirin в Україні. Гарантія 2 роки, безкоштовна доставка по Україні.',
    type: 'website',
    url: SITE_URL + '/catalog',
    siteName: 'Ausom UA',
    locale: 'uk_UA',
    images: [{
      url: SITE_URL + '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Каталог електросамокатів Ausom та Kukirin'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Купити електросамокат — каталог Ausom та Kukirin | Ausom UA',
    description:
      'Купити електросамокат Ausom або Kukirin в Україні. Гарантія 2 роки, безкоштовна доставка.',
    images: [SITE_URL + '/og-image.jpg'],
  },
}

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children
}
