'use client'

import { use } from 'react'
import ProductFormInner from './ProductFormInner'

export default function ProductFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <ProductFormInner id={id} />
}
