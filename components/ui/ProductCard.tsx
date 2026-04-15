'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/cart'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart()
  const saving = product.old_price ? product.old_price - product.price : 0

  return (
    <div className="product-card group">
      <Link href={`/product/${product.slug}`}>
        {/* Image area */}
        <div className="relative bg-[#f4f4f2] aspect-square flex items-center justify-center overflow-hidden">
          {/* Saving badge */}
          {saving > 0 && (
            <span className="absolute top-3 left-3 bg-[#ff5c00] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded z-10">
              −€{saving}
            </span>
          )}
          {/* Tag badge */}
          {product.tag && (
            <span className="absolute top-3 right-3 bg-[#0b0b0b] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded z-10">
              {product.tag}
            </span>
          )}
          {/* Placeholder scooter icon */}
          <svg
            viewBox="0 0 200 180"
            fill="none"
            className="w-3/4 h-3/4 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1"
          >
            <circle cx="40" cy="148" r="28" stroke="#ff5c00" strokeWidth="6" />
            <circle cx="160" cy="148" r="28" stroke="#ff5c00" strokeWidth="6" />
            <path d="M40 148 L64 64 L128 52 L160 148" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M64 64 L88 24" stroke="#ff5c00" strokeWidth="6" strokeLinecap="round" />
            <rect x="78" y="14" width="32" height="18" rx="5" fill="#ff5c00" />
            <path d="M128 52 L158 78" stroke="#555" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
      </Link>

      {/* Body */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-[#0b0b0b] mb-2 leading-snug hover:text-[#ff5c00] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Specs */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          <span className="text-[11px] text-[#888884] bg-[#f4f4f2] px-2.5 py-1 rounded-full">
            {product.voltage.toUpperCase()}
          </span>
          <span className="text-[11px] text-[#888884] bg-[#f4f4f2] px-2.5 py-1 rounded-full">
            {product.range_km} км
          </span>
          <span className="text-[11px] text-[#888884] bg-[#f4f4f2] px-2.5 py-1 rounded-full">
            {product.max_speed} км/г
          </span>
          {product.motor === 'dual' && (
            <span className="text-[11px] text-[#888884] bg-[#f4f4f2] px-2.5 py-1 rounded-full">
              Подвійний мотор
            </span>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-[#0b0b0b]">€{product.price}</span>
          {product.old_price && (
            <span className="text-sm text-[#c8c8c4] line-through">€{product.old_price}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={(e) => {
            e.preventDefault()
            addItem(product)
          }}
          className="w-full flex items-center justify-center gap-2 bg-[#0b0b0b] text-white text-xs font-bold uppercase tracking-widest py-3 rounded-lg transition-all hover:bg-[#ff5c00] hover:-translate-y-0.5 active:scale-[.98]"
        >
          <ShoppingBag size={14} />
          До кошика
        </button>
      </div>
    </div>
  )
}
