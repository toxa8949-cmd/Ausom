'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { createOrder } from '@/lib/queries'
import { ArrowLeft, Check, CreditCard, Smartphone, Building } from 'lucide-react'

const inp = 'w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-[var(--muted)] outline-none focus:border-[var(--brand)] transition-colors'
const PAYMENT = [
  { id:'card',  Icon: CreditCard,  label: 'Картка' },
  { id:'mono',  Icon: Smartphone,  label: 'Monobank' },
  { id:'cash',  Icon: Building,    label: 'При отриманні' },
]

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart()
  const router = useRouter()
  const [saving,  setSaving]  = useState(false)
  const [done,    setDone]    = useState(false)
  const [payment, setPayment] = useState('card')
  const [form, setForm] = useState({ name:'', email:'', phone:'', city:'', address:'', notes:'' })

  if (count === 0 && !done) { router.replace('/cart'); return null }

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await createOrder({ items: items as any, total, ...form, status: 'pending' })
      clearCart(); setDone(true)
    } catch { alert('Помилка. Спробуй ще раз.') }
    finally { setSaving(false) }
  }

  if (done) return (
    <div className="min-h-screen bg-[var(--black)] flex items-center justify-center p-6">
      <div className="bg-[var(--mid)] border border-[var(--border)] rounded-3xl p-12 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-green-500/15 border border-green-500/25 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-green-400" strokeWidth={2.5} />
        </div>
        <h1 className="font-display text-[40px] text-white tracking-wide mb-3">Замовлення прийнято!</h1>
        <p className="text-[var(--muted)] leading-relaxed mb-8">Ми зв'яжемось з вами найближчим часом для підтвердження.</p>
        <Link href="/catalog" className="btn-primary w-full justify-center">Продовжити покупки</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[var(--black)]">
      <div className="bg-[var(--mid)] border-b border-[var(--border)] py-12">
        <div className="container-wide">
          {/* Steps */}
          <div className="flex items-center gap-2 mb-6">
            {[['1','Кошик',true],['2','Оформлення',true],['3','Підтвердження',false]].map(([num, label, active]: any, i) => (
              <div key={num} className="flex items-center gap-2">
                {i > 0 && <div className="w-10 h-px bg-[var(--border)]" />}
                <div className={`flex items-center gap-2 text-[12px] font-semibold ${active ? 'text-white' : 'text-[var(--muted)]'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${active ? 'bg-[var(--brand)] text-[var(--black)]' : 'bg-[var(--border)] text-[var(--muted)]'}`}>{num}</span>
                  <span className="hidden sm:block">{label}</span>
                </div>
              </div>
            ))}
          </div>
          <h1 className="section-heading text-white">Оформлення <span className="text-[var(--brand)]">Замовлення</span></h1>
        </div>
      </div>

      <div className="container-wide py-10">
        <Link href="/cart" className="inline-flex items-center gap-2 text-[12px] text-[var(--muted)] hover:text-white transition-colors mb-8">
          <ArrowLeft size={14}/> Назад до кошика
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Form sections */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Contact */}
              <div className="bg-[var(--mid)] border border-[var(--border)] rounded-2xl p-6">
                <h2 className="font-display text-[22px] text-white tracking-wide mb-5">Контактні дані</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-[.07em] text-[var(--muted)] mb-2">Ім'я та прізвище *</label>
                    <input value={form.name} onChange={e=>set('name',e.target.value)} required placeholder="Іван Іванов" className={inp} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[.07em] text-[var(--muted)] mb-2">Email *</label>
                    <input type="email" value={form.email} onChange={e=>set('email',e.target.value)} required placeholder="ivan@email.com" className={inp} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[.07em] text-[var(--muted)] mb-2">Телефон *</label>
                    <input type="tel" value={form.phone} onChange={e=>set('phone',e.target.value)} required placeholder="+38 (067) 000-00-00" className={inp} />
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-[var(--mid)] border border-[var(--border)] rounded-2xl p-6">
                <h2 className="font-display text-[22px] text-white tracking-wide mb-5">Адреса доставки</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[.07em] text-[var(--muted)] mb-2">Місто *</label>
                    <input value={form.city} onChange={e=>set('city',e.target.value)} required placeholder="Київ" className={inp} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-[.07em] text-[var(--muted)] mb-2">Адреса *</label>
                    <input value={form.address} onChange={e=>set('address',e.target.value)} required placeholder="вул. Хрещатик 1, кв. 10" className={inp} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-[.07em] text-[var(--muted)] mb-2">Коментар</label>
                    <textarea value={form.notes} onChange={e=>set('notes',e.target.value)} rows={3} placeholder="Побажання до доставки..." className={inp+' resize-none'} />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-[var(--mid)] border border-[var(--border)] rounded-2xl p-6">
                <h2 className="font-display text-[22px] text-white tracking-wide mb-5">Спосіб оплати</h2>
                <div className="grid grid-cols-3 gap-3">
                  {PAYMENT.map(({ id, Icon, label }) => (
                    <button key={id} type="button" onClick={() => setPayment(id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${payment===id ? 'border-[var(--brand)] bg-[var(--brand)]/6 text-[var(--brand)]' : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-white/20 hover:text-white'}`}>
                      <Icon size={20} />
                      <span className="text-[12px] font-semibold">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-[var(--mid)] border border-[var(--border)] rounded-2xl p-6 sticky top-[104px] flex flex-col gap-4">
                <h2 className="font-display text-[22px] text-white tracking-wide">Ваше замовлення</h2>
                <div className="flex flex-col gap-2.5">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex justify-between text-[13px]">
                      <span className="text-[var(--muted)] truncate mr-2">{product.name} × {quantity}</span>
                      <span className="font-medium text-white shrink-0">₴{(product.price*quantity).toLocaleString('uk-UA')}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[var(--border)] pt-4 flex justify-between items-center">
                  <span className="font-semibold text-white">Разом</span>
                  <span className="font-display text-[28px] text-[var(--brand)] tracking-wide leading-none">₴{total.toLocaleString('uk-UA')}</span>
                </div>
                <button type="submit" disabled={saving} className="btn-primary w-full justify-center disabled:opacity-60">
                  {saving
                    ? <><span className="w-4 h-4 border-2 border-[var(--black)]/40 border-t-[var(--black)] rounded-full animate-spin" /> Оформлення...</>
                    : 'Підтвердити замовлення'
                  }
                </button>
                <p className="text-[11px] text-[var(--muted)] text-center">🔒 Менеджер підтвердить замовлення</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
