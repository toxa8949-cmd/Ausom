import type { Metadata } from 'next'
import ProductPageInner from './ProductPageInner'
import ProductFAQ from '@/components/product/ProductFAQ'
import { fetchProductBySlug } from '@/lib/data'
import { getProductFAQs } from '@/lib/queries'
import type { Product, ProductFAQ as ProductFAQType } from '@/lib/types'

const CATEGORY_UA: Record<string, string> = {
  offroad: 'позашляховий',
  commuter: 'міський',
}

const BRAND_UA: Record<string, string> = {
  ausom: 'Ausom',
  kukirin: 'Kukirin',
}

function autoTitle(p: Product): string {
  const cat = CATEGORY_UA[p.category] ?? ''
  const brand = BRAND_UA[p.brand] ?? 'Ausom'
  return `${p.name} — ${cat} електросамокат | ${brand} UA`
}

function autoDescription(p: Product): string {
  const cat = CATEGORY_UA[p.category] ?? 'електричний'
  const motor = p.motor === 'dual' ? 'подвійний мотор' : 'одиночний мотор'
  const price = p.price > 0 ? `Ціна ₴${p.price.toLocaleString('uk-UA')}.` : ''

  const head = `${p.name} — ${cat} самокат. ${motor}, запас ${p.range_km} км, швидкість до ${p.max_speed} км/год.`
  const tail = `${price} Купити в Україні з гарантією.`.trim()
  const full = `${head} ${tail}`.trim()

  if (full.length <= 160) return full

  const firstSentence = p.description.split(/[.!?]/)[0]
  return `${firstSentence}. ${motor}, ${p.range_km} км, ${p.max_speed} км/год.`.substring(0, 160)
}

function buildKeywords(p: Product): string[] {
  const cat = CATEGORY_UA[p.category] ?? ''
  const brand = BRAND_UA[p.brand] ?? 'Ausom'
  return [
    p.name,
    `${p.name.toLowerCase()} ціна`,
    `${p.name.toLowerCase()} україна`,
    `${brand.toLowerCase()} електросамокат`,
    `${cat} електросамокат`,
    'електросамокат україна',
    'купити самокат',
  ]
}

// Перевіряє чи є ручний SEO-текст. Порожній рядок/whitespace = немає.
function hasManual(s?: string | null): boolean {
  return typeof s === 'string' && s.trim().length > 0
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await fetchProductBySlug(id)

  if (!product) {
    return {
      title: 'Товар не знайдено | Ausom UA',
      description: 'Сторінку не знайдено. Перегляньте наш каталог електросамокатів Ausom.',
      robots: { index: false, follow: true },
    }
  }

  // Manual first, auto-fallback
  const title = hasManual(product.meta_title) ? product.meta_title! : autoTitle(product)
  const description = hasManual(product.meta_description) ? product.meta_description! : autoDescription(product)
  const keywords = buildKeywords(product)
  const imageUrl = product.images?.[0]

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
    robots: { index: product.in_stock, follow: true },
  }
}

// Product JSON-LD (without manual overrides — описує сам товар)
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
      availability: product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `/product/${product.slug}`,
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

// FAQ JSON-LD — рендериться на сервері, Google бачить одразу.
// Якщо FAQ для товару немає — компонент просто нічого не виводить.
function FAQJsonLd({ faqs }: { faqs: ProductFAQType[] }) {
  if (!faqs || faqs.length === 0) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await fetchProductBySlug(id)

  // Тягнемо FAQ тільки якщо товар знайшовся і у нього є id у БД.
  // Статичний PRODUCTS fallback має id='1'/'2'/... — це не UUID,
  // тож запит до product_faqs нічого не поверне, і це ок.
  let faqs: ProductFAQType[] = []
  if (product?.id) {
    try {
      faqs = await getProductFAQs(product.id)
    } catch (err) {
      console.warn('[product page] getProductFAQs failed', err)
    }
  }

  return (
    <>
      {product && <ProductJsonLd product={product}/>}
      {product && faqs.length > 0 && <FAQJsonLd faqs={faqs}/>}
      <ProductPageInner id={id} />
      {product && <ProductFAQ productId={product.id}/>}
    </>
  )
}
