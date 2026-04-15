'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import { getProductsByCategory } from '@/lib/data'

const TABS = [
  { id: 'new', label: 'Нові надходження' },
  { id: 'all', label: 'Хіти продажів' },
  { id: 'offroad', label: 'Позашляхові' },
  { id: 'commuter', label: 'Міські' },
]

export default function CatalogTabs() {
  const [active, setActive] = useState('new')
  const products = getProductsByCategory(active).slice(0, 4)

  return (
    <section className="py-24 bg-white" id="catalog">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="section-label">Каталог 2026</span>
            <h2 className="section-heading">
              Обери свій <span className="text-[#ff5c00]">Ride</span>
            </h2>
            <p className="text-[#888884] text-sm mt-3 max-w-lg leading-relaxed">
              Від міських комютерів до позашляхових монстрів — знайди модель під свій стиль.
            </p>
          </div>
          <Link href="/catalog" className="text-sm font-bold text-[#0b0b0b] border-b-2 border-[#ff5c00] pb-0.5 hover:text-[#ff5c00] transition-colors">
            Весь каталог →
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex border-b-2 border-[#e8e8e5] mb-10 overflow-x-auto scrollbar-none gap-0">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all relative shrink-0
                ${active === tab.id ? 'text-[#0b0b0b]' : 'text-[#888884] hover:text-[#0b0b0b]'}
              `}
            >
              {tab.label}
              {active === tab.id && (
                <span className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-[#0b0b0b]" />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
