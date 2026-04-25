import type { Metadata } from 'next'
import SalePageClient from './sale-page'

export const metadata: Metadata = {
    title: 'Розпродаж електросамокатів | Ausom UA',
    description: 'Акційні ціни на електросамокати Ausom. Обмежена кількість — купуй зі знижкою до 20%.',
    alternates: {
          canonical: 'https://ausom.in.ua/sale',
    },
    openGraph: {
          title: 'Розпродаж електросамокатів | Ausom UA',
          description: 'Акційні ціни на електросамокати Ausom. Обмежена кількість — купуй зі знижкою.',
          url: 'https://ausom.in.ua/sale',
          siteName: 'Ausom UA',
          locale: 'uk_UA',
          type: 'website',
    },
    twitter: {
          card: 'summary_large_image',
          title: 'Розпродаж електросамокатів | Ausom UA',
          description: 'Акційні ціни на електросамокати Ausom.',
    },
}

export default function SalePage() {
    return <SalePageClient />
}
