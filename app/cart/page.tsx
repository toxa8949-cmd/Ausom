'use client'

import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Check, Shield, RotateCcw, Truck } from 'lucide-react'
import { useCart } from '@/lib/cart'

export default function CartPage() {
  const { items, count, total, removeItem, updateQty, clearCart } = useCart()

  if (count === 0) {
    return (
      <div className="min-h-screen bg-[var(--black)] flex flex-col items-center justify-center text-center py-24 gap-5">
        <ShoppingBag size={72} className="text-[var(--border)]" strokeWidth={1} />
        <h1 className="font-display text-[48px] text-white tracking-wide">Кошик порожній</h1>
        <p className="text-[var(--muted)] text-[15px] max-w-xs">Додай самокати з каталогу, щоб оформити замовлення</p>
        <Link href="/catalog" className="btn-primary mt-2">Перейти до каталогу</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--black)]">
      <div className="bg-[var(--mid)] border-b border-[var(--border)] py-12">
        <div className="container-wide">
          <h1 className="section-heading text-white">
            Кошик <span className="text-[var(--brand)]">({count})</span>
          </h1>
        </div>
      </div>

      <div className="container-wide py-10">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-[13px] text-[var(--muted)] hover:text-white transition-colors mb-8">
          <ArrowLeft size={15} /> Продовжити покупки
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map(({ product, quantity }) => {
              const saving = product.old_price ? product.old_price - product.price : 0
              return (
                <div key={product.id} className="bg-[var(--mid)] border border-[var(--border)] rounded-2xl p-5 flex gap-5 items-start hover:border-white/10 transition-colors">
                  {/* Image */}
                  <div className="bg-[var(--surface)] rounded-xl w-24 h-24 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 80 70" fill="none" className="w-14 h-14">
                      <circle cx="16" cy="56" r="12" stroke="#E8FF00" strokeWidth="3"/>
                      <circle cx="64" cy="56" r="12" stroke="#E8FF00" strokeWidth="3"/>
                      <path d="M16 56 L26 24 L52 18 L64 56" stroke="#F5F5F0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M26 24 L34 8" stroke="#E8FF00" strokeWidth="3" strokeLinecap="round"/>
                      <rect x="28" y="4" width="16" height="8" rx="2" fill="#E8FF00"/>
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/product/${product.slug}`} className="text-[15px] font-semibold text-white hover:text-[var(--brand)] transition-colors leading-snug">
                          {product.name}
                        </Link>
                        <div className="flex gap-1.5 mt-1.5 flex-wrap">
                          <span className="text-[10px] font-bold uppercase text-[var(--muted)] bg-[var(--surface)] border border-[var(--border)] px-2 py-0.5 rounded">{product.voltage.toUpperCase()}</span>
                          <span className="text-[10px] font-bold uppercase text-[var(--muted)] bg-[var(--surface)] border border-[var(--border)] px-2 py-0.5 rounded">{product.range_km} км</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(product.id)} className="text-[var(--muted)] hover:text-red-400 transition-colors shrink-0 mt-0.5">
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Qty */}
                      <div className="flex items-center bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden">
                        <button onClick={() => updateQty(product.id, quantity - 1)} className="w-8 h-8 flex items-center justify-center text-[var(--muted)] hover:text-white hover:bg-white/6 transition-all">
                          <Minus size={12} />
                        </button>
                        <span className="text-[13px] font-bold text-white w-8 text-center border-x border-[var(--border)]">{quantity}</span>
                        <button onClick={() => updateQty(product.id, quantity + 1)} className="w-8 h-8 flex items-center justify-center text-[var(--muted)] hover:text-white hover:bg-white/6 transition-all">
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-display text-[22px] text-[var(--brand)] tracking-wide leading-none">₴{(product.price * quantity).toLocaleString('uk-UA')}</div>
                        {saving > 0 && <div className="text-[11px] text-green-400 mt-0.5">Економія ₴{(saving * quantity).toLocaleString('uk-UA')}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <button onClick={clearCart} className="inline-flex items-center gap-1.5 text-[12px] text-[var(--muted)] hover:text-red-400 transition-colors mt-1">
              <Trash2 size={13} /> Очистити кошик
            </button>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-[var(--mid)] border border-[var(--border)] rounded-2xl p-6 sticky top-[104px] flex flex-col gap-5">
              <h2 className="font-display text-[24px] text-white tracking-wide">Ваше замовлення</h2>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-[var(--muted)]">Товарів ({count})</span>
                  <span className="text-white font-medium">₴{total.toLocaleString('uk-UA')}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-[var(--muted)]">Доставка</span>
                  <span className="text-green-400 font-medium">Безкоштовно</span>
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-4 flex justify-between items-center">
                <span className="text-[15px] font-semibold text-white">Разом</span>
                <span className="font-display text-[32px] text-[var(--brand)] tracking-wide leading-none">₴{total.toLocaleString('uk-UA')}</span>
              </div>

              {/* Promo */}
              <div className="flex gap-2">
                <input placeholder="Промокод" className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-[12px] font-mono uppercase tracking-wider text-white placeholder:text-[var(--muted)] placeholder:normal-case placeholder:tracking-normal outline-none focus:border-[var(--brand)] transition-colors" />
                <button className="btn-outline btn-sm px-4">OK</button>
              </div>

              <Link href="/checkout" className="btn-primary w-full justify-center">
                Оформити замовлення
              </Link>
              <p className="text-[11px] text-[var(--muted)] text-center">🔒 Безпечна оплата · Гарантія 2 роки</p>

              {/* Trust */}
              <div className="flex flex-col gap-2.5 pt-4 border-t border-[var(--border)]">
                {[
                  [Truck,   'Безкоштовна доставка по Україні'],
                  [RotateCcw, '14 днів повернення без питань'],
                  [Shield,  'Офіційна гарантія 2 роки'],
                ].map(([Icon, text]: any) => (
                  <div key={text} className="flex items-center gap-2.5 text-[12px] text-[var(--muted)]">
                    <div className="w-7 h-7 flex items-center justify-center bg-green-500/10 border border-green-500/20 rounded-md text-green-400 shrink-0">
                      <Icon size={12} />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
