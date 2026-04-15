'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Heart, Zap, Check } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/cart'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [wish,  setWish]  = useState(false)
  const saving  = product.old_price ? product.old_price - product.price : 0
  const discPct = product.old_price ? Math.round(saving / product.old_price * 100) : 0

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <article className="group product-card-bg rounded-2xl overflow-hidden flex flex-col">
      <Link href={`/product/${product.slug}`} className="flex flex-col flex-1">

        {/* Image area */}
        <div className="relative bg-[var(--bg-mid)] aspect-square flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 200 180" fill="none" className="w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
            <circle cx="40"  cy="148" r="28" stroke="var(--brand)"    strokeWidth="5" />
            <circle cx="160" cy="148" r="28" stroke="var(--brand)"    strokeWidth="5" />
            <path d="M40 148 L64 64 L128 52 L160 148" stroke="var(--text)"  strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity=".7"/>
            <path d="M64 64 L88 24"  stroke="var(--brand)"    strokeWidth="5" strokeLinecap="round"/>
            <rect x="78" y="14" width="32" height="18" rx="5" fill="var(--brand)"/>
            <path d="M128 52 L158 78" stroke="var(--text-3)" strokeWidth="4" strokeLinecap="round"/>
          </svg>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discPct > 0 && (
              <span className="bg-[var(--brand)] text-[#111] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded">−{discPct}%</span>
            )}
            {product.is_new && (
              <span className="bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">Новинка</span>
            )}
            {product.tag && !product.is_new && (
              <span className="bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">{product.tag}</span>
            )}
          </div>

          {/* Wishlist */}
          <button
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg border transition-all opacity-0 group-hover:opacity-100 bg-[var(--bg)] ${wish ? 'border-[var(--brand)] text-[var(--brand-dk)]' : 'border-[var(--border)] text-[var(--text-3)] hover:text-[var(--text)]'}`}
            onClick={e => { e.preventDefault(); setWish(!wish) }}>
            <Heart size={13} fill={wish ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-3 flex-1">
          {/* Spec pills */}
          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-[var(--text-3)] bg-[var(--bg-surface)] border border-[var(--border)] px-2 py-1 rounded">
              <Zap size={9} className="text-[var(--brand-dk)]" />{product.voltage.toUpperCase()}
            </span>
            <span className="text-[10px] font-bold uppercase text-[var(--text-3)] bg-[var(--bg-surface)] border border-[var(--border)] px-2 py-1 rounded">
              {product.range_km} км
            </span>
            <span className="text-[10px] font-bold uppercase text-[var(--text-3)] bg-[var(--bg-surface)] border border-[var(--border)] px-2 py-1 rounded">
              {product.max_speed} км/г
            </span>
            {product.motor === 'dual' && (
              <span className="text-[10px] font-bold uppercase text-[var(--brand-dk)] bg-[var(--brand)]/10 border border-[var(--brand)]/30 px-2 py-1 rounded">
                2× Мотор
              </span>
            )}
          </div>

          <h3 className="text-[15px] font-semibold text-[var(--text)] leading-snug">{product.name}</h3>

          <div className="flex items-baseline gap-2 mt-auto pt-1">
            <span className="font-display text-[22px] tracking-wide text-[var(--text)]">
              ₴{product.price.toLocaleString('uk-UA')}
            </span>
            {product.old_price && (
              <span className="text-[12px] text-[var(--text-3)] line-through">
                ₴{product.old_price.toLocaleString('uk-UA')}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart */}
      <button onClick={handleAdd}
        className={`flex items-center justify-center gap-2 w-full py-3.5 text-[11px] font-bold uppercase tracking-[.07em] border-t border-[var(--border)] transition-all duration-200 ${
          added
            ? 'bg-green-50 text-green-600 hover:bg-green-500 hover:text-white'
            : 'bg-[var(--bg-mid)] text-[var(--text-2)] hover:bg-[var(--brand)] hover:text-[#111] hover:border-[var(--brand)]'
        }`}>
        {added ? <><Check size={13} /> Додано!</> : <><ShoppingBag size={13} /> До кошика</>}
      </button>
    </article>
  )
}
