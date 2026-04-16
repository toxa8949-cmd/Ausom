'use client'

import { use } from 'react'
import BlogFormInner from './BlogFormInner'

export default function BlogFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <BlogFormInner id={id} />
}
