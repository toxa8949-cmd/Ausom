'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import { getProductsByCategory } from '@/lib/data'
import { ArrowRight } from 'lucide-react'

const TABS = [
  { id:'new',      label:'Нові надходження' },
  { id:'all',      label:'Хіти продажів' },
  { id:'offroad',  label:'Позашляхові' },
  { id:'commuter', label:'Міські' },
]

export default function CatalogTabs() {
  const [active, setActive] = useState('new')
  const products = getProductsByCategory(active).slice(0, 4)

  return (
    <section className="py-24 bg-[var(--black)]" id="catalog">
      <div className="container-wide">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="section-label">Каталог 2026</span>
            <h2 className="section-heading text-white">Обери свій <span className="text-[var(--brand)]">Ride</span></h2>
          </div>
          <Link href="/catalog" className="btn-ghost flex items-center gap-1.5 text-[var(--brand)]">
            Весь каталог <ArrowRight size={15}/>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[var(--mid)] border border-[var(--border)] rounded-xl p-1 mb-8 w-fit">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide rounded-lg transition-all ${active===t.id ? 'bg-[var(--surface)] text-white' : 'text-[var(--muted)] hover:text-white'}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map(p => <ProductCard key={p.id} product={p}/>)}
        </div>
      </div>
    </section>
  )
}
