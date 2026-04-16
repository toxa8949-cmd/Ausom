'use client'

import { use } from 'react'
import ProductPageInner from './ProductPageInner'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ProductPageInner id={id} />
}
