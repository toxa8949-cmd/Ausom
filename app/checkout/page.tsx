'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { createOrder } from '@/lib/queries'
import { ArrowLeft, Check } from 'lucide-react'

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '', address: '', notes: ''
  })

  if (count === 0 && !done) {
    router.replace('/cart')
    return null
  }

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await createOrder({
        items: items as any,
        total,
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        address: form.address,
        status: 'pending',
        notes: form.notes,
      })
      clearCart()
      setDone(true)
    } catch {
      alert('Помилка оформлення. Спробуй ще раз.')
    } finally {
      setSaving(false)
    }
  }

  const inputCls = "w-full bg-[#f4f4f2] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff5c00] transition-colors"

  if (done) {
    return (
      <div className="min-h-screen bg-[#f4f4f2] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-12 text-center max-w-md w-full shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-green-600" strokeWidth={3} />
          </div>
          <h1 className="text-2xl font-bold mb-3">Замовлення прийнято!</h1>
          <p className="text-[#888884] leading-relaxed mb-8">
            Ми зв'яжемось з вами найближчим часом для підтвердження замовлення.
          </p>
          <Link href="/catalog" className="btn-primary justify-center w-full">
            Продовжити покупки
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f4f4f2]">
      <div className="bg-[#0b0b0b] py-12">
        <div className="container-wide">
          <h1 className="section-heading text-white">
            Оформлення <span className="text-[#ff5c00]">Замовлення</span>
          </h1>
        </div>
      </div>

      <div className="container-wide py-12">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-[#888884] hover:text-[#0b0b0b] mb-8 transition-colors">
          <ArrowLeft size={16} /> Назад до кошика
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-[#e8e8e5]">
                <h2 className="font-bold text-lg mb-6">Контактні дані</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1.5">Ім'я та прізвище *</label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} required placeholder="Іван Іванов" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} required placeholder="ivan@email.com" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Телефон *</label>
                    <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} required placeholder="+38 (067) 000-00-00" className={inputCls} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#e8e8e5]">
                <h2 className="font-bold text-lg mb-6">Адреса доставки</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Місто *</label>
                    <input value={form.city} onChange={e => set('city', e.target.value)} required placeholder="Київ" className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1.5">Адреса (вулиця, будинок, квартира) *</label>
                    <input value={form.address} onChange={e => set('address', e.target.value)} required placeholder="вул. Хрещатик 1, кв. 10" className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1.5">Коментар до замовлення</label>
                    <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3} placeholder="Побажання до доставки..." className={inputCls + ' resize-none'} />
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white rounded-2xl p-6 border border-[#e8e8e5] sticky top-24">
                <h2 className="font-bold mb-4">Ваше замовлення</h2>
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-[#888884] truncate mr-2">{item.product.name} × {item.quantity}</span>
                      <span className="font-medium shrink-0">₴{(item.product.price * item.quantity).toLocaleString('uk-UA')}</span>
                    </div>
                  ))}
                  <div className="border-t border-[#e8e8e5] pt-3 flex justify-between">
                    <span className="font-bold">Разом</span>
                    <span className="font-bold text-xl">₴{total.toLocaleString('uk-UA')}</span>
                  </div>
                </div>
                <button type="submit" disabled={saving} className="btn-primary w-full justify-center disabled:opacity-60">
                  {saving ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Оформлення...
                    </span>
                  ) : 'Підтвердити замовлення'}
                </button>
                <p className="text-xs text-[#888884] text-center mt-3">🔒 Менеджер зв'яжеться з вами для підтвердження</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
