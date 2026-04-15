'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/data'
import { Check, X, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'

const SPECS = [
  { key: 'price', label: 'Ціна', format: (v: number) => `€${v}` },
  { key: 'old_price', label: 'Стара ціна', format: (v: number | null) => v ? `€${v}` : '—' },
  { key: 'voltage', label: 'Напруга', format: (v: string) => v.toUpperCase() },
  { key: 'motor', label: 'Мотор', format: (v: string) => v === 'dual' ? 'Подвійний' : 'Одиночний' },
  { key: 'range_km', label: 'Запас ходу', format: (v: number) => `${v} км` },
  { key: 'max_speed', label: 'Макс. швидкість', format: (v: number) => `${v} км/год` },
  { key: 'battery_wh', label: 'Акумулятор', format: (v: number) => `${v} Wh` },
  { key: 'weight_kg', label: 'Вага', format: (v: number) => `${v} кг` },
  { key: 'max_load_kg', label: 'Макс. навантаження', format: (v: number) => `${v} кг` },
  { key: 'category', label: 'Тип', format: (v: string) => v === 'offroad' ? 'Позашляховий' : 'Міський' },
  { key: 'in_stock', label: 'Наявність', format: (v: boolean) => v ? 'В наявності' : 'Немає' },
]

export default function ComparePage() {
  const { addItem } = useCart()
  const [selected, setSelected] = useState<string[]>(['gosoul-2-pro', 'dt2-pro', 'f1-max'])

  const toggle = (slug: string) => {
    if (selected.includes(slug)) {
      if (selected.length > 1) setSelected(prev => prev.filter(s => s !== slug))
    } else {
      if (selected.length < 4) setSelected(prev => [...prev, slug])
    }
  }

  const compared = PRODUCTS.filter(p => selected.includes(p.slug))

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#0b0b0b] py-16">
        <div className="container-wide">
          <span className="section-label">Інструмент вибору</span>
          <h1 className="section-heading text-white">
            Порівняй <span className="text-[#ff5c00]">Моделі</span>
          </h1>
          <p className="text-white/50 text-sm mt-3">Обери до 4 моделей для порівняння</p>
        </div>
      </div>

      <div className="container-wide py-12">

        {/* Model selector */}
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#888884] mb-4">
            Обрані моделі ({selected.length}/4)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {PRODUCTS.map(p => {
              const isSelected = selected.includes(p.slug)
              return (
                <button
                  key={p.slug}
                  onClick={() => toggle(p.slug)}
                  className={`relative p-3 rounded-xl border-2 text-left transition-all text-xs font-semibold leading-snug
                    ${isSelected
                      ? 'border-[#ff5c00] bg-[#ff5c00]/5 text-[#0b0b0b]'
                      : 'border-[#e8e8e5] bg-white text-[#888884] hover:border-[#c8c8c4] hover:text-[#0b0b0b]'
                    }
                    ${!isSelected && selected.length >= 4 ? 'opacity-40 cursor-not-allowed' : ''}
                  `}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-4 h-4 bg-[#ff5c00] rounded-full flex items-center justify-center">
                      <Check size={9} color="white" strokeWidth={3} />
                    </span>
                  )}
                  {p.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto rounded-2xl border border-[#e8e8e5]">
          <table className="w-full min-w-[600px]">

            {/* Product headers */}
            <thead>
              <tr className="border-b border-[#e8e8e5]">
                <th className="text-left px-6 py-5 text-xs font-bold uppercase tracking-wider text-[#888884] w-40 bg-[#f4f4f2]">
                  Характеристика
                </th>
                {compared.map(p => {
                  const saving = p.old_price ? p.old_price - p.price : 0
                  return (
                    <th key={p.id} className="px-5 py-5 text-center bg-white border-l border-[#e8e8e5] min-w-[180px]">
                      {/* Scooter icon */}
                      <div className="bg-[#f4f4f2] rounded-xl aspect-square w-24 mx-auto mb-3 flex items-center justify-center">
                        <svg viewBox="0 0 80 72" fill="none" className="w-16 h-16">
                          <circle cx="16" cy="58" r="12" stroke="#ff5c00" strokeWidth="3.5"/>
                          <circle cx="64" cy="58" r="12" stroke="#ff5c00" strokeWidth="3.5"/>
                          <path d="M16 58 L26 22 L52 16 L64 58" stroke="#1a1a1a" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M26 22 L34 6" stroke="#ff5c00" strokeWidth="3.5" strokeLinecap="round"/>
                          <rect x="28" y="2" width="16" height="8" rx="2.5" fill="#ff5c00"/>
                        </svg>
                      </div>
                      <div className="font-bold text-sm text-[#0b0b0b] leading-snug mb-1">{p.name}</div>
                      <div className="flex items-baseline gap-1.5 justify-center mb-1">
                        <span className="font-bold text-lg text-[#0b0b0b]">€{p.price}</span>
                        {p.old_price && <span className="text-xs text-[#c8c8c4] line-through">€{p.old_price}</span>}
                      </div>
                      {saving > 0 && (
                        <span className="text-[10px] font-bold text-[#ff5c00] bg-[#ff5c00]/10 px-2 py-0.5 rounded-full">
                          −€{saving}
                        </span>
                      )}
                    </th>
                  )
                })}
              </tr>
            </thead>

            <tbody>
              {SPECS.map((spec, i) => (
                <tr
                  key={spec.key}
                  className={`border-b border-[#f4f4f2] ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}
                >
                  <td className="px-6 py-4 text-sm font-semibold text-[#444440] bg-[#f4f4f2] border-r border-[#e8e8e5]">
                    {spec.label}
                  </td>
                  {compared.map(p => {
                    const raw = p[spec.key as keyof typeof p]
                    const val = spec.format(raw as never)
                    const isHighlight = spec.key === 'price'
                    const isGood = spec.key === 'in_stock' && raw === true
                    const isBad = spec.key === 'in_stock' && raw === false

                    return (
                      <td
                        key={p.id}
                        className="px-5 py-4 text-sm text-center border-l border-[#f4f4f2]"
                      >
                        {isBad ? (
                          <span className="inline-flex items-center gap-1 text-red-500 font-medium">
                            <X size={14} /> Немає
                          </span>
                        ) : isGood ? (
                          <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                            <Check size={14} /> В наявності
                          </span>
                        ) : (
                          <span className={isHighlight ? 'font-bold text-base text-[#0b0b0b]' : 'text-[#444440]'}>
                            {val}
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}

              {/* Features row */}
              <tr className="border-b border-[#f4f4f2]">
                <td className="px-6 py-4 text-sm font-semibold text-[#444440] bg-[#f4f4f2] border-r border-[#e8e8e5]">
                  Особливості
                </td>
                {compared.map(p => (
                  <td key={p.id} className="px-5 py-4 border-l border-[#f4f4f2]">
                    <ul className="space-y-1.5">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#444440]">
                          <Check size={11} className="text-[#ff5c00] shrink-0 mt-0.5" strokeWidth={3} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* CTA row */}
              <tr>
                <td className="px-6 py-5 bg-[#f4f4f2] border-r border-[#e8e8e5]" />
                {compared.map(p => (
                  <td key={p.id} className="px-5 py-5 text-center border-l border-[#f4f4f2]">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => addItem(p)}
                        className="w-full flex items-center justify-center gap-2 bg-[#0b0b0b] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-all hover:bg-[#ff5c00]"
                      >
                        <ShoppingBag size={13} />
                        До кошика
                      </button>
                      <Link
                        href={`/product/${p.slug}`}
                        className="w-full text-center text-xs font-semibold text-[#888884] hover:text-[#ff5c00] transition-colors py-1"
                      >
                        Детальніше →
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Back to catalog */}
        <div className="mt-8 text-center">
          <Link href="/catalog" className="btn-outline">
            ← Назад до каталогу
          </Link>
        </div>

      </div>
    </div>
  )
}
