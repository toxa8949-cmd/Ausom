import { Metadata } from 'next'
import ProductPageInner from './ProductPageInner'
import { fetchProductBySlug } from '@/lib/data'
import { Product } from '@/lib/types'

// ════════════════════════════════════════════════════════════════
// SEO: dynamic metadata per product page
// ════════════════════════════════════════════════════════════════
// Reads the product from Supabase, then auto-generates:
//   - <title>        ← e.g. "Ausom DT2 Pro — позашляховий електросамокат | Ausom UA"
//   - <meta description>  ← trimmed product description + key specs
//   - <meta keywords>     ← name, brand, category, general terms
//   - Open Graph tags   ← for sharing on Facebook, Telegram, etc
//   - Twitter cards     ← for sharing on X
//
// Google prefers description around 150-160 chars.
// ════════════════════════════════════════════════════════════════

const CATEGORY_UA: Record<string, string> = {
  offroad:  'позашляховий',
  commuter: 'міський',
}

const BRAND_UA: Record<string, string> = {
  ausom:   'Ausom',
  kukirin: 'Kukirin',
}

function buildTitle(p: Product): string {
  const cat   = CATEGORY_UA[p.category] ?? ''
  const brand = BRAND_UA[p.brand] ?? 'Ausom'
  return `${p.name} — ${cat} електросамокат | ${brand} UA`
}

function buildDescription(p: Product): string {
  // Google shows ~155 chars; we build concise spec-rich summary
  const cat   = CATEGORY_UA[p.category] ?? 'електричний'
  const motor = p.motor === 'dual' ? 'подвійний мотор' : 'одиночний мотор'
  const price = p.price > 0 ? `Ціна ₴${p.price.toLocaleString('uk-UA')}.` : ''

  // Start with product name + concise spec line
  const head = `${p.name} — ${cat} самокат. ${motor}, запас ${p.range_km} км, швидкість до ${p.max_speed} км/год.`
  const tail = `${price} Купити в Україні з гарантією.`.trim()

  const full = `${head} ${tail}`.trim()
  if (full.length <= 160) return full

  // If too long, prefer the first sentence of the original description + specs
  const firstSentence = p.description.split(/[.!?]/)[0]
  return `${firstSentence}. ${motor}, ${p.range_km} км, ${p.max_speed} км/год.`.substring(0, 160)
}

function buildKeywords(p: Product): string[] {
  const cat   = CATEGORY_UA[p.category] ?? ''
  const brand = BRAND_UA[p.brand] ?? 'Ausom'
  return [
    p.name,
    `${p.name.toLowerCase()} ціна`,
    `${p.name.toLowerCase()} україна`,
    `${brand.toLowerCase()} електросамокат`,
    `${cat} електросамокат`,
    'електросамокат україна',
    'купити самокат',
    'електричний самокат для дорослих',
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await fetchProductBySlug(id)

  // Fallback meta if product isn't found — still valid, just generic.
  if (!product) {
    return {
      title: 'Товар не знайдено | Ausom UA',
      description: 'Сторінку не знайдено. Перегляньте наш каталог електросамокатів Ausom.',
      robots: { index: false, follow: true },
    }
  }

  const title       = buildTitle(product)
  const description = buildDescription(product)
  const keywords    = buildKeywords(product)
  const imageUrl    = product.images?.[0] // OG image — first product photo

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'uk_UA',
      siteName: 'Ausom UA',
      url: `/product/${product.slug}`,
      images: imageUrl ? [{ url: imageUrl, alt: product.name, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: { index: product.in_stock, follow: true }, // don't index out-of-stock products
  }
}

// ════════════════════════════════════════════════════════════════
// JSON-LD structured data: Product schema for rich Google results
// ════════════════════════════════════════════════════════════════
// When Google crawls the page it parses this as a Product, showing:
//   - Price, availability, brand in search results
//   - "In stock / out of stock" badge
//   - Ratings (if we ever add review data)
// Invisible to users, critical for SEO.
// ════════════════════════════════════════════════════════════════

function ProductJsonLd({ product }: { product: Product }) {
  const brand = BRAND_UA[product.brand] ?? 'Ausom'
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.slug,
    brand: { '@type': 'Brand', name: brand },
    category: CATEGORY_UA[product.category],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'UAH',
      price: product.price,
      availability: product.in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `/product/${product.slug}`,
      ...(product.old_price && {
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      }),
    },
    ...(product.weight_kg && {
      weight: { '@type': 'QuantitativeValue', value: product.weight_kg, unitCode: 'KGM' },
    }),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ════════════════════════════════════════════════════════════════
// Server Component wrapper — runs generateMetadata + renders Client UI
// ════════════════════════════════════════════════════════════════

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await fetchProductBySlug(id)

  return (
    <>
      {product && <ProductJsonLd product={product}/>}
      <ProductPageInner id={id} />
    </>
  )
}
