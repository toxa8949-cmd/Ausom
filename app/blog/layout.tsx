import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Блог — Поради, огляди, гіди покупця',
  description: 'Статті про електросамокати: огляди моделей Ausom і Kukirin, гіди покупця, поради з обслуговування та порівняння характеристик.',
  openGraph: {
    title: 'Блог Ausom UA — Поради та огляди електросамокатів',
    description: 'Все про електросамокати — від вибору до обслуговування.',
    type: 'website',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
