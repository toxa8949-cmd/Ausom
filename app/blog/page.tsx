import type { Metadata } from 'next'
import BlogPageClient from './blog-page'

export const metadata: Metadata = {
    title: 'Блог про електросамокати | Ausom UA',
    description: 'Огляди, поради, порівняння та новини про електросамокати Ausom. Все що потрібно знати перед покупкою.',
    alternates: {
          canonical: 'https://ausom.in.ua/blog',
    },
    openGraph: {
          title: 'Блог про електросамокати | Ausom UA',
          description: 'Огляди, поради, порівняння та новини про електросамокати Ausom.',
          url: 'https://ausom.in.ua/blog',
          siteName: 'Ausom UA',
          locale: 'uk_UA',
          type: 'website',
    },
    twitter: {
          card: 'summary_large_image',
          title: 'Блог про електросамокати | Ausom UA',
          description: 'Огляди, поради, порівняння та новини про електросамокати Ausom.',
    },
}

export default function BlogPage() {
    return <BlogPageClient />
}
