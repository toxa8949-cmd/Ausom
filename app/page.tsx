import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import CatalogTabs from '@/components/sections/CatalogTabs'
import { StatsBar, Features, Press, Newsletter } from '@/components/sections/Sections'
import Categories from '@/components/sections/Categories'
import CompareCTA from '@/components/sections/CompareCTA'
import BlogPreview from '@/components/sections/BlogPreview'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'

export const metadata: Metadata = {
  title: 'Ausom Ukraine — Купити електросамокат Ausom | офіційний дилер',
  description: "Купити електросамокат Ausom або Kukirin в україні. Офіційний дистриб'ютор. Ausom L1, L2, L2 Max, DT2 Pro, L2 Dual, L2 Max Dual. Офіційна гарантія, доставка по всій Україні.",
  keywords: [
    'купити ausom', 'ausom', 'ausom україна', 'ausom київ', 'самокат ausom',
    'електросамокат ausom', 'купити електросамокат', 'ausom l2 max', 'ausom dt2 pro',
    'офіційний дилер ausom', 'kukirin', 'купити kukirin', 'електросамокат для дорослих',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Купити електросамокат Ausom в Україні — офіційний дилер',
    description: "Офіційний дистриб'ютор Ausom та Kukirin. Офіційна гарантія, доставка по всій Україні. Ausom L1, L2, L2 Max, DT2 Pro.",
    url: SITE_URL,
    siteName: 'Ausom Ukraine',
    locale: 'uk_UA',
    type: 'website',
    images: [{ url: SITE_URL + '/og-image.jpg', width: 1200, height: 630, alt: 'Купити електросамокат Ausom в Україні' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Купити електросамокат Ausom в Україні — офіційний дилер',
    description: "Офіційний дистриб'ютор Ausom та Kukirin. Офіційна гарантія, доставка по всій Україні.",
    images: [SITE_URL + '/og-image.jpg'],
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <CatalogTabs />
      <Categories />
      <Features />
      <Press />
      <CompareCTA />
      <BlogPreview />
      <Newsletter />
    </>
  )
}
