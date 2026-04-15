import { notFound } from 'next/navigation'
import { getProductBySlug, PRODUCTS } from '@/lib/data'
import ProductView from './ProductView'

// Pre-generate all product pages at build time
export function generateStaticParams() {
  return PRODUCTS.map(p => ({ id: p.slug }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductBySlug(id)
  if (!product) notFound()
  return <ProductView product={product} />
}
