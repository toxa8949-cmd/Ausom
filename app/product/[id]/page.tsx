'use client'

import { notFound } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, ArrowLeft, Check, Zap, Gauge, Battery, Weight } from 'lucide-react'
import { getProductBySlug, PRODUCTS } from '@/lib/data'
import { useCart } from '@/lib/cart'
import ProductCard from '@/components/ui/ProductCard'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductBySlug(params.id)
  if (!product) notFound()

  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const saving = product.old_price ? product.old_price - product.price : 0

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#e8e8e5] py-4">
        <div className="container-wide flex items-center gap-2 text-sm text-[var(--text-3)]">
          <Link href="/" className="hover:text-[var(--text)] transition-colors">Головна</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-[var(--text)] transition-colors">Каталог</Link>
          <span>/</span>
          <span className="text-[var(--text)] font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container-wide py-12">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-sm text-[var(--text-3)] hover:text-[var(--text)] transition-colors mb-8">
          <ArrowLeft size={16} /> Назад до каталогу
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <div className="bg-[var(--bg-surface)] rounded-2xl aspect-square flex items-center justify-center relative">
            {saving > 0 && (
              <span className="absolute top-5 left-5 bg-[#F5C200] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                −₴{saving.toLocaleString('uk-UA')}
              </span>
            )}
            {product.tag && (
              <span className="absolute top-5 right-5 bg-[var(--text)] text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                {product.tag}
              </span>
            )}
            <svg viewBox="0 0 300 260" fill="none" className="w-3/4 h-3/4">
              <circle cx="60" cy="208" r="42" stroke="#F5C200" strokeWidth="8"/>
              <circle cx="240" cy="208" r="42" stroke="#F5C200" strokeWidth="8"/>
              <path d="M60 208 L96 92 L188 72 L240 208" stroke="#1a1a1a" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M96 92 L132 34" stroke="#F5C200" strokeWidth="9" strokeLinecap="round"/>
              <rect x="118" y="20" width="48" height="26" rx="7" fill="#F5C200"/>
              <path d="M188 72 L236 112" stroke="#666" strokeWidth="7" strokeLinecap="round"/>
              <circle cx="142" cy="33" r="7" fill="white"/>
            </svg>
          </div>

          {/* Info */}
          <div>
            {/* Tags */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <span className="bg-[var(--bg-surface)] text-[var(--text-3)] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.voltage.toUpperCase()}
              </span>
              <span className="bg-[var(--bg-surface)] text-[var(--text-3)] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category === 'offroad' ? 'Позашляховий' : 'Міський'}
              </span>
              {product.motor === 'dual' && (
                <span className="bg-[#F5C200]/10 text-[#F5C200] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Подвійний мотор
                </span>
              )}
              {product.is_new && (
                <span className="bg-[var(--text)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Новинка
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-[var(--text)] mb-4 leading-tight">{product.name}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-[var(--text)]">₴{product.price.toLocaleString('uk-UA')}</span>
              {product.old_price && (
                <span className="text-xl text-[#c8c8c4] line-through">₴{product.old_price!.toLocaleString('uk-UA')}</span>
              )}
              {saving > 0 && (
                <span className="text-sm font-bold text-[#F5C200] bg-[#F5C200]/10 px-3 py-1 rounded-full">
                  Ти економиш €{saving}
                </span>
              )}
            </div>

            {/* Key specs */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Gauge, label: 'Макс. швидкість', value: `${product.max_speed} км/год` },
                { icon: Zap, label: 'Запас ходу', value: `${product.range_km} км` },
                { icon: Battery, label: 'Акумулятор', value: `${product.battery_wh} Wh` },
                { icon: Weight, label: 'Вага', value: `${product.weight_kg} кг` },
              ].map(spec => {
                const Icon = spec.icon
                return (
                  <div key={spec.label} className="bg-[var(--bg-surface)] rounded-xl p-4 flex items-center gap-3">
                    <Icon size={18} className="text-[#F5C200] shrink-0" />
                    <div>
                      <div className="text-[11px] text-[var(--text-3)] font-medium uppercase tracking-wider">{spec.label}</div>
                      <div className="text-sm font-bold text-[var(--text)]">{spec.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="flex gap-3 mb-8 flex-wrap">
              <button
                onClick={handleAdd}
                className={`btn-primary flex-1 justify-center ${added ? 'bg-green-600 border-green-600' : ''}`}
              >
                {added ? (
                  <><Check size={16} /> Додано до кошика</>
                ) : (
                  <><ShoppingBag size={16} /> До кошика</>
                )}
              </button>
              <Link href="/cart" className="btn-outline">
                Оформити зараз
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex gap-4 flex-wrap border-t border-[#e8e8e5] pt-6">
              {['🚚 Безкоштовна доставка', '🛡 Гарантія 2 роки', '🔄 14 днів повернення'].map(b => (
                <span key={b} className="text-xs text-[var(--text-3)] font-medium">{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Description & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20 pt-16 border-t border-[#e8e8e5]">
          <div>
            <h2 className="text-xl font-bold mb-4">Опис</h2>
            <p className="text-[var(--text-3)] leading-relaxed">{product.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Особливості</h2>
            <ul className="space-y-3">
              {product.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 bg-[#F5C200] rounded-full flex items-center justify-center shrink-0">
                    <Check size={11} color="white" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#e8e8e5]">
            <h2 className="text-2xl font-bold mb-8">Схожі моделі</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
