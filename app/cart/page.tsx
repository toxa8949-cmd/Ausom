'use client'

import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart'

export default function CartPage() {
  const { items, count, total, removeItem, updateQty, clearCart } = useCart()

  if (count === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center py-24">
        <ShoppingBag size={64} className="text-[#e8e8e5] mb-6" />
        <h1 className="text-2xl font-bold mb-3">Кошик порожній</h1>
        <p className="text-[#888884] mb-8">Додай самокати з каталогу, щоб оформити замовлення</p>
        <Link href="/catalog" className="btn-primary">Перейти до каталогу</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f4f2]">
      <div className="bg-[#0b0b0b] py-12">
        <div className="container-wide">
          <h1 className="section-heading text-white">
            Кошик <span className="text-[#ff5c00]">({count})</span>
          </h1>
        </div>
      </div>

      <div className="container-wide py-12">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-sm text-[#888884] hover:text-[#0b0b0b] transition-colors mb-8">
          <ArrowLeft size={16} /> Продовжити покупки
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => {
              const { product, quantity } = item
              const saving = product.old_price ? product.old_price - product.price : 0
              return (
                <div key={product.id} className="bg-white rounded-2xl p-6 flex gap-5 items-start border border-[#e8e8e5]">
                  {/* Image */}
                  <div className="bg-[#f4f4f2] rounded-xl w-24 h-24 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 80 70" fill="none" className="w-16 h-16">
                      <circle cx="16" cy="56" r="12" stroke="#ff5c00" strokeWidth="3"/>
                      <circle cx="64" cy="56" r="12" stroke="#ff5c00" strokeWidth="3"/>
                      <path d="M16 56 L26 24 L52 18 L64 56" stroke="#222" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M26 24 L34 8" stroke="#ff5c00" strokeWidth="3" strokeLinecap="round"/>
                      <rect x="28" y="4" width="16" height="8" rx="2" fill="#ff5c00"/>
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link href={`/product/${product.slug}`} className="font-bold text-[#0b0b0b] hover:text-[#ff5c00] transition-colors leading-snug">
                          {product.name}
                        </Link>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          <span className="text-xs text-[#888884] bg-[#f4f4f2] px-2 py-0.5 rounded-full">{product.voltage.toUpperCase()}</span>
                          <span className="text-xs text-[#888884] bg-[#f4f4f2] px-2 py-0.5 rounded-full">{product.range_km} км</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(product.id)} className="text-[#c8c8c4] hover:text-red-500 transition-colors shrink-0">
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Qty */}
                      <div className="flex items-center gap-2 bg-[#f4f4f2] rounded-lg p-1">
                        <button onClick={() => updateQty(product.id, quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors">
                          <Minus size={13} />
                        </button>
                        <span className="text-sm font-bold w-6 text-center">{quantity}</span>
                        <button onClick={() => updateQty(product.id, quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors">
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-bold text-lg">€{product.price * quantity}</div>
                        {saving > 0 && (
                          <div className="text-xs text-[#ff5c00]">Економія ₴{(saving * quantity).toLocaleString('uk-UA')}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <button onClick={clearCart} className="text-sm text-[#888884] hover:text-red-500 transition-colors flex items-center gap-1.5 mt-2">
              <Trash2 size={14} /> Очистити кошик
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-[#e8e8e5] sticky top-24">
              <h2 className="font-bold text-lg mb-6">Ваше замовлення</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#888884]">Товарів ({count})</span>
                  <span className="font-medium">₴{total.toLocaleString('uk-UA')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#888884]">Доставка</span>
                  <span className="text-green-600 font-medium">Безкоштовно</span>
                </div>
                <div className="border-t border-[#e8e8e5] pt-3 flex justify-between">
                  <span className="font-bold">Разом</span>
                  <span className="font-bold text-xl">₴{total.toLocaleString('uk-UA')}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full justify-center mb-3">
                Оформити замовлення
              </Link>
              <p className="text-xs text-[#888884] text-center">
                🔒 Безпечна оплата · Гарантія 2 роки
              </p>

              {/* Trust */}
              <div className="mt-6 pt-6 border-t border-[#e8e8e5] space-y-2">
                {['✓ Безкоштовна доставка', '✓ 14 днів повернення', '✓ Офіційна гарантія 2 роки'].map(t => (
                  <p key={t} className="text-xs text-[#888884]">{t}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
