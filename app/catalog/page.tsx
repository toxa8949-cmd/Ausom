'use client'

import { useState } from 'react'
import ProductCard from '@/components/ui/ProductCard'
import { PRODUCTS } from '@/lib/data'
import { SlidersHorizontal } from 'lucide-react'

const VOLTAGE_FILTERS = ['Всі', '48V', '52V', '60V']
const CATEGORY_FILTERS = [
  { id: 'all', label: 'Всі' },
  { id: 'commuter', label: 'Міські' },
  { id: 'offroad', label: 'Позашляхові' },
]
const SORT_OPTIONS = [
  { id: 'default', label: 'За замовчуванням' },
  { id: 'price_asc', label: 'Ціна: від низької' },
  { id: 'price_desc', label: 'Ціна: від високої' },
  { id: 'new', label: 'Новинки спочатку' },
]

export default function CatalogPage() {
  const [category, setCategory] = useState('all')
  const [voltage, setVoltage] = useState('Всі')
  const [sort, setSort] = useState('default')
  const [motor, setMotor] = useState('all')

  let filtered = PRODUCTS.filter(p => {
    if (category !== 'all' && p.category !== category) return false
    if (voltage !== 'Всі' && p.voltage !== voltage.toLowerCase()) return false
    if (motor === 'dual' && p.motor !== 'dual') return false
    if (motor === 'single' && p.motor !== 'single') return false
    return true
  })

  if (sort === 'price_asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'price_desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sort === 'new') filtered = [...filtered].sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0))

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-[#0b0b0b] py-16">
        <div className="container-wide">
          <span className="section-label">Каталог</span>
          <h1 className="section-heading text-white">
            Всі <span className="text-[#ff5c00]">Самокати</span>
          </h1>
          <p className="text-white/50 text-sm mt-3">{filtered.length} моделей</p>
        </div>
      </div>

      <div className="container-wide py-12">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 mb-10 pb-8 border-b border-[#e8e8e5]">
          <SlidersHorizontal size={16} className="text-[#888884]" />

          {/* Category */}
          <div className="flex gap-1">
            {CATEGORY_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setCategory(f.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all
                  ${category === f.id
                    ? 'bg-[#0b0b0b] text-white'
                    : 'bg-[#f4f4f2] text-[#888884] hover:text-[#0b0b0b]'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-[#e8e8e5]" />

          {/* Voltage */}
          <div className="flex gap-1">
            {VOLTAGE_FILTERS.map(v => (
              <button
                key={v}
                onClick={() => setVoltage(v)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all
                  ${voltage === v
                    ? 'bg-[#ff5c00] text-white'
                    : 'bg-[#f4f4f2] text-[#888884] hover:text-[#0b0b0b]'
                  }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-[#e8e8e5]" />

          {/* Motor */}
          <div className="flex gap-1">
            {[{ id: 'all', label: 'Всі мотори' }, { id: 'dual', label: 'Подвійний' }, { id: 'single', label: 'Одиночний' }].map(m => (
              <button
                key={m.id}
                onClick={() => setMotor(m.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all
                  ${motor === m.id
                    ? 'bg-[#0b0b0b] text-white'
                    : 'bg-[#f4f4f2] text-[#888884] hover:text-[#0b0b0b]'
                  }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="ml-auto">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-sm font-medium text-[#0b0b0b] bg-[#f4f4f2] border-0 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff5c00]"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-[#888884] text-lg">Нічого не знайдено</p>
            <button
              onClick={() => { setCategory('all'); setVoltage('Всі'); setMotor('all') }}
              className="mt-4 btn-outline"
            >
              Скинути фільтри
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
