import type { Metadata } from 'next'
import ProductPageInner from './ProductPageInner'
import ProductFAQ from '@/components/product/ProductFAQ'
import { fetchProductBySlug } from '@/lib/data'
import { getProductFAQs } from '@/lib/queries'
import type { Product, ProductFAQ as ProductFAQType } from '@/lib/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'
const CATEGORY_UA: Record<string, string> = { offroad: 'позашляховий', commuter: 'міський' }
const BRAND_UA: Record<string, string> = { ausom: 'Ausom', kukirin: 'Kukirin' }

function autoTitle(p: Product): string {
  return p.name + ' — ' + (CATEGORY_UA[p.category] ?? '') + ' електросамокат'
}
function autoDescription(p: Product): string {
  const cat = CATEGORY_UA[p.category] ?? 'електричний'
  const motor = p.motor === 'dual' ? 'подвійний мотор' : 'одиночний мотор'
  const price = p.price > 0 ? 'Ціна ' + p.price.toLocaleString('uk-UA') + ' грн.' : ''
  const full = p.name + ' — ' + cat + ' самокат. ' + motor + ', запас ' + p.range_km + ' км, ' + p.max_speed + ' км/год. ' + price + ' Купити в Україні.'
  return full.length <= 160 ? full : full.substring(0, 157) + '...'
}
function buildKeywords(p: Product): string[] {
  const brand = BRAND_UA[p.brand] ?? 'Ausom'
  return [p.name, p.name.toLowerCase() + ' купити', 'купити ' + brand.toLowerCase(), brand.toLowerCase() + ' електросамокат', 'електросамокат україна']
}
function hasManual(s?: string | null): boolean { return typeof s === 'string' && s.trim().length > 0 }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await fetchProductBySlug(id)
  if (!product) return { title: 'Товар не знайдено', robots: { index: false, follow: true } }
  const title = hasManual(product.meta_title) ? product.meta_title! : autoTitle(product)
  const description = hasManual(product.meta_description) ? product.meta_description! : autoDescription(product)
  const imageUrl = product.images?.[0]
  return {
    title, description,
    keywords: buildKeywords(product),
    alternates: { canonical: SITE_URL + '/product/' + product.slug },
    openGraph: { title, description, type: 'website', locale: 'uk_UA', siteName: 'Ausom UA', url: SITE_URL + '/product/' + product.slug, images: imageUrl ? [{ url: imageUrl, alt: product.name, width: 1200, height: 630 }] : undefined },
    twitter: { card: 'summary_large_image', title, description, images: imageUrl ? [imageUrl] : undefined },
    robots: { index: product.in_stock, follow: true },
  }
}

function ProductJsonLd({ product }: { product: Product }) {
  const brand = BRAND_UA[product.brand] ?? 'Ausom'
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org/', '@type': 'Product',
      name: product.name, description: product.description, image: product.images,
      sku: product.slug, brand: { '@type': 'Brand', name: brand },
      category: CATEGORY_UA[product.category],
      offers: {
        '@type': 'Offer', priceCurrency: 'UAH', price: product.price,
        availability: product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        url: SITE_URL + '/product/' + product.slug,
        seller: { '@type': 'Organization', name: 'Ausom Ukraine', url: SITE_URL },
        priceValidUntil: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      },
      ...(product.weight_kg && { weight: { '@type': 'QuantitativeValue', value: product.weight_kg, unitCode: 'KGM' } }),
    }) }} />
  )
}

function FAQJsonLd({ faqs }: { faqs: ProductFAQType[] }) {
  if (!faqs?.length) return null
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }) }} />
}

function BreadcrumbJsonLd({ product }: { product: Product }) {
  const brand = BRAND_UA[product.brand] ?? 'Ausom'
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Головна', item: SITE_URL + '/' }, { '@type': 'ListItem', position: 2, name: 'Каталог', item: SITE_URL + '/catalog' }, { '@type': 'ListItem', position: 3, name: brand, item: SITE_URL + '/catalog/' + product.brand }, { '@type': 'ListItem', position: 4, name: product.name, item: SITE_URL + '/product/' + product.slug }] }) }} />
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await fetchProductBySlug(id)
  let faqs: ProductFAQType[] = []
  if (product?.id) { try { faqs = await getProductFAQs(product.id) } catch (err) { console.warn('[product page] getProductFAQs failed', err) } }
  return (
    <div>
      {product && <ProductJsonLd product={product} />}
      {product && faqs.length > 0 && <FAQJsonLd faqs={faqs} />}
      {product && <BreadcrumbJsonLd product={product} />}
      <ProductPageInner id={id} />
      {product && <ProductFAQ productId={product.id} />}
    </div>
  )
}
