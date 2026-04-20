import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import CatalogBrandContent from './CatalogBrandContent'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'

// ─── Brand configuration ─────────────────────────────────────────────────────
interface BrandCfgItem {
  name: string
  nameUA: string
  h1: string
  title: string
  description: string
  keywords: string[]
  intro: string
}

const BRAND_CONFIG: Record<string, BrandCfgItem> = {
  ausom: {
    name: 'Ausom',
    nameUA: 'Ausom',
    h1: 'Електросамокати Ausom в Україні',
    title: 'Електросамокати Ausom купити в Україні — офіційний дилер | Ausom UA',
    description:
      'Купити електросамокат Ausom в Україні. Офіційна гарантія 2 роки, безкоштовна доставка. Моделі: Ausom L1, L2, L2 Max, DT2 Pro, L2 Dual, L2 Max Dual. Найкраща ціна.',
    keywords: [
      'ausom електросамокат',
      'ausom l2 max',
      'ausom dt2 pro',
      'ausom україна',
      'купити ausom',
      'офіційний дилер ausom',
    ],
    intro:
      'Ausom — китайський виробник преміум електросамокатів з фокусом на надійності та запасі ходу. ' +
      'Всі моделі Ausom сертифіковані в Україні, мають офіційну гарантію 2 роки та поставляються з безкоштовною доставкою Новою Поштою.',
  },
  kukirin: {
    name: 'Kukirin',
    nameUA: 'Kukirin',
    h1: 'Електросамокати Kukirin в Україні',
    title: 'Електросамокати Kukirin купити в Україні — офіційний дилер | Ausom UA',
    description:
      'Купити електросамокат Kukirin в Україні. Широкий вибір: Kukirin G2, G3, G4, G2 Max, G2 Pro, G3 Pro, G2 Ultra, G2 Master, S1 Max, A1, T3. Гарантія. Доставка.',
    keywords: [
      'kukirin електросамокат',
      'kukirin g3',
      'kukirin g4',
      'kukirin g2 max',
      'kukirin україна',
      'купити kukirin',
    ],
    intro:
      'Kukirin (KuKirin) — бренд з широкою лінійкою міських і позашляхових електросамокатів. ' +
      'Від бюджетних моделей для міста до потужних позашляховиків з подвійним мотором — у нашому каталозі є всі актуальні моделі Kukirin з офіційною гарантією.',
  },
}

function isValidBrand(brand: string): boolean {
  return brand in BRAND_CONFIG
}

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>
}): Promise<Metadata> {
  const { brand } = await params

  if (!isValidBrand(brand)) {
    return { title: 'Бренд не знайдено | Ausom UA', robots: { index: false, follow: false } }
  }

  const cfg = BRAND_CONFIG[brand]

  return {
    title: cfg.title,
    description: cfg.description,
    keywords: cfg.keywords,
    alternates: {
      canonical: SITE_URL + '/catalog/' + brand,
    },
    openGraph: {
      type: 'website',
      locale: 'uk_UA',
      url: SITE_URL + '/catalog/' + brand,
      siteName: 'Ausom UA',
      title: cfg.title,
      description: cfg.description,
      images: [{ url: SITE_URL + '/og-image.jpg', width: 1200, height: 630, alt: cfg.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: cfg.title,
      description: cfg.description,
      images: [SITE_URL + '/og-image.jpg'],
    },
    robots: { index: true, follow: true },
  }
}

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(BRAND_CONFIG).map((brand) => ({ brand }))
}

// ─── BreadcrumbList JSON-LD ───────────────────────────────────────────────────
function BreadcrumbJsonLd({ brand, brandName }: { brand: string; brandName: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Головна', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Каталог', item: SITE_URL + '/catalog' },
      { '@type': 'ListItem', position: 3, name: brandName, item: SITE_URL + '/catalog/' + brand },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CatalogBrandPage({
  params,
}: {
  params: Promise<{ brand: string }>
}) {
  const { brand } = await params

  if (!isValidBrand(brand)) notFound()

  const cfg = BRAND_CONFIG[brand]

  return (
    <div>
      <BreadcrumbJsonLd brand={brand} brandName={cfg.nameUA} />
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <CatalogBrandContent brand={brand} cfg={cfg} />
      </Suspense>
    </div>
  )
}
