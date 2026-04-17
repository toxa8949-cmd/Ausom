import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Каталог електросамокатів — Ausom, Kukirin',
  description: 'Весь каталог електросамокатів: Ausom L1, L2, L2 Max, DT2 Pro та партнерська лінійка Kukirin. Порівняй моделі, обери свій ідеальний ride.',
  openGraph: {
    title: 'Каталог електросамокатів | Ausom UA',
    description: 'Весь каталог електросамокатів Ausom та Kukirin з доставкою по Україні.',
    type: 'website',
  },
}

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children
}
