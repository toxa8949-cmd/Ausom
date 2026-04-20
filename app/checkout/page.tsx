'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, AlertCircle, Loader2 } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { createOrder } from '@/lib/queries'

type DeliveryId = 'nova-poshta' | 'ukrposhta' | 'courier'
type PaymentId = 'card' | 'privat24' | 'mono' | 'cash'

const DELIVERY_LABEL: Record<DeliveryId, string> = {
  'nova-poshta': 'Нова Пошта',
  'ukrposhta': 'Укрпошта',
  'courier': 'Кур'єр',
}
const PAYMENT_LABEL: Record<PaymentId, string> = {
  'card': 'Visa / Mastercard',
  'privat24': 'Приват24',
  'mono': 'Monobank',
  'cash': 'Накладений платіж',
}

const PHONE_RE = /^(\+?380|0)\d{9}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart, ready } = useCart()
  const [step, setStep] = useState<1|2|3>(1)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    city: '', address: '',
    delivery: 'nova-poshta' as DeliveryId,
    payment: 'card' as PaymentId,
    comment: '',
  })

  const set = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors(prev => { const n = { ...prev }; delete n[e.target.name]; return n })
  }

  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width:'100%', background:'var(--bg)',
    border: `1.5px solid ${hasError ? '#EF4444' : 'var(--border)'}`,
    borderRadius:8, padding:'12px 16px', fontSize:14, color:'var(--text)',
    fontFamily:'Inter,sans-serif', outline:'none',
  })
  const labelStyle: React.CSSProperties = { display:'block', fontSize:12, fontWeight:600, color:'var(--text-3)', marginBottom:6 }
  const errStyle: React.CSSProperties = { fontSize:11, color:'#EF4444', marginTop:4, display:'flex', alignItems:'center', gap:4 }

  const validateStep1 = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.firstName.trim()) e.firstName = 'Вкажіть ім'я'
    if (!form.lastName.trim()) e.lastName = 'Вкажіть прізвище'
    if (!form.phone.trim()) e.phone = 'Вкажіть телефон'
    else if (!PHONE_RE.test(form.phone.replace(/[\s\-()]/g, ''))) e.phone = 'Некоректний номер'
    if (!form.email.trim()) e.email = 'Вкажіть email'
    else if (!EMAIL_RE.test(form.email)) e.email = 'Некоректний email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.city.trim()) e.city = 'Вкажіть місто'
    if (!form.address.trim()) e.address = 'Вкажіть адресу або відділення'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (submitting) return
    setSubmitError(null)
    setSubmitting(true)
    try {
      const notes = [
        `Доставка: ${DELIVERY_LABEL[form.delivery]}`,
        `Оплата: ${PAYMENT_LABEL[form.payment]}`,
        form.comment.trim() && `Коментар: ${form.comment.trim()}`,
      ].filter(Boolean).join('\n')
      const order = await createOrder({
        items, total,
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        notes,
        status: 'pending',
      })
      try {
        localStorage.setItem('ausom_last_order', JSON.stringify({
          id: order.id, total,
          name: `${form.firstName.trim()} ${form.lastName.trim()}`,
          email: form.email.trim(),
          createdAt: order.created_at,
        }))
      } catch { /* ignore */ }
      clearCart()
      router.push(`/checkout/success?id=${encodeURIComponent(order.id)}`)
    } catch (err: any) {
      console.error('[checkout] createOrder failed:', err)
      setSubmitError(
        err?.message?.includes('fetch')
          ? 'Не вдалося зв'язатися з сервером. Перевір інтернет і спробуй ще раз.'
          : 'Не вдалося оформити замовлення. Спробуй ще раз або зв'яжись з нами.'
      )
      setSubmitting(false)
    }
  }

  const goNext = () => {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    setStep((step + 1) as 1|2|3)
  }
  const goBack = () => setStep((step - 1) as 1|2|3)

  if (!ready) {
    return (
      <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Loader2 size={24} className="spin" style={{ color:'var(--text-3)' }}/>
        <style>{`.spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight:'100vh', background:'var(--bg)', padding:'80px 0', textAlign:'center' }}>
        <div className="w-container">
          <h1 style={{ fontSize:28, fontWeight:800, color:'var(--text)', marginBottom:12 }}>Кошик порожній</h1>
          <p style={{ fontSize:15, color:'var(--text-2)', marginBottom:28 }}>Додайте товари, щоб оформити замовлення.</p>
          <Link href="/catalog" className="btn btn-yellow">До каталогу</Link>
        </div>
      </div>
    )
  }

  const radioStyle = (active: boolean): React.CSSProperties => ({
    display:'flex', alignItems:'center', gap:14, padding:'16px 18px', borderRadius:10, cursor:'pointer', transition:'all .15s',
    border: active ? '1.5px solid #F5C200' : '1.5px solid var(--border)',
    background: active ? 'rgba(245,194,0,.06)' : 'var(--bg)',
  })
  const dot = (active: boolean): React.CSSProperties => ({
    width:18, height:18, borderRadius:'50%',
    border: active ? '5px solid #F5C200' : '2px solid var(--border-md)',
    flexShrink:0, marginLeft:'auto',
  })

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)', flexWrap:'wrap' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/>
            <Link href="/cart" style={{ color:'var(--text-3)', textDecoration:'none' }}>Кошик</Link>
            <ChevronRight size={13}/>
            <span style={{ color:'var(--text)', fontWeight:500 }}>Оформлення</span>
          </div>
        </div>
      </div>

      <div className="section-py" style={{ padding:'40px 0 72px' }}>
        <div className="w-container">
          <h1 style={{ fontSize:'clamp(24px,3vw,40px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)', marginBottom:28 }}>Оформлення замовлення</h1>

          {/* Steps */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:36, flexWrap:'wrap' }}>
            {[{n:1,l:'Контакти'},{n:2,l:'Доставка'},{n:3,l:'Оплата'}].map(s => (
              <div key={s.n} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:30, height:30, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, background: step >= s.n ? '#F5C200' : 'var(--bg-soft)', color: step >= s.n ? '#111' : 'var(--text-4)', border:'1.5px solid '+(step >= s.n ? '#F5C200' : 'var(--border)') }}>{s.n}</div>
                <span style={{ fontSize:13, fontWeight:500, color: step >= s.n ? 'var(--text)' : 'var(--text-4)' }}>{s.l}</span>
                {s.n < 3 && <div className="hide-mobile" style={{ width:40, height:1, background:'var(--border)', margin:'0 4px' }}/>}
              </div>
            ))}
          </div>

          <div className="grid-checkout" style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:32, alignItems:'start' }}>
            {/* Form */}
            <div>
              {step === 1 && (
                <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'20px' }}>
                  <h2 style={{ fontSize:18, fontWeight:700, color:'var(--text)', marginBottom:20 }}>Контактні дані</h2>
                  <div className="grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                    <div>
                      <label style={labelStyle}>Ім&apos;я *</label>
                      <input name="firstName" value={form.firstName} onChange={set} style={inputStyle(!!errors.firstName)} placeholder="Олександр" autoComplete="given-name"/>
                      {errors.firstName && <p style={errStyle}><AlertCircle size={11}/>{errors.firstName}</p>}
                    </div>
                    <div>
                      <label style={labelStyle}>Прізвище *</label>
                      <input name="lastName" value={form.lastName} onChange={set} style={inputStyle(!!errors.lastName)} placeholder="Петренко" autoComplete="family-name"/>
                      {errors.lastName && <p style={errStyle}><AlertCircle size={11}/>{errors.lastName}</p>}
                    </div>
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <label style={labelStyle}>Телефон *</label>
                    <input name="phone" type="tel" value={form.phone} onChange={set} style={inputStyle(!!errors.phone)} placeholder="+380 67 000 00 00" autoComplete="tel"/>
                    {errors.phone && <p style={errStyle}><AlertCircle size={11}/>{errors.phone}</p>}
                  </div>
                  <div style={{ marginBottom:24 }}>
                    <label style={labelStyle}>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={set} style={inputStyle(!!errors.email)} placeholder="email@example.com" autoComplete="email"/>
                    {errors.email && <p style={errStyle}><AlertCircle size={11}/>{errors.email}</p>}
                  </div>
                  <button onClick={goNext} className="btn btn-yellow" style={{ width:'100%' }}>Далі →</button>
                </div>
              )}

              {step === 2 && (
                <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'20px' }}>
                  <h2 style={{ fontSize:18, fontWeight:700, color:'var(--text)', marginBottom:20 }}>Доставка</h2>
                  <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
                    {([
                      {id:'nova-poshta' as const, label:'Нова Пошта', desc:'По всій Україні, 1-3 дні', icon:'📦'},
                      {id:'ukrposhta' as const, label:'Укрпошта', desc:'По всій Україні, 3-7 днів', icon:'✉️'},
                      {id:'courier' as const, label:'Кур'єр (Київ)', desc:'По Києву, 1 день', icon:'🚚'},
                    ]).map(d => (
                      <label key={d.id} style={radioStyle(form.delivery===d.id)}>
                        <input type="radio" name="delivery" value={d.id} checked={form.delivery===d.id} onChange={set} style={{ display:'none' }}/>
                        <span style={{ fontSize:22 }}>{d.icon}</span>
                        <div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:14, fontWeight:600, color:'var(--text)' }}>{d.label}</div><div style={{ fontSize:12, color:'var(--text-3)' }}>{d.desc}</div></div>
                        <div style={dot(form.delivery===d.id)}/>
                      </label>
                    ))}
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <label style={labelStyle}>Місто *</label>
                    <input name="city" value={form.city} onChange={set} style={inputStyle(!!errors.city)} placeholder="Київ" autoComplete="address-level2"/>
                    {errors.city && <p style={errStyle}><AlertCircle size={11}/>{errors.city}</p>}
                  </div>
                  <div style={{ marginBottom:24 }}>
                    <label style={labelStyle}>Адреса / відділення *</label>
                    <input name="address" value={form.address} onChange={set} style={inputStyle(!!errors.address)} placeholder="Відділення №1 або вул. Хрещатик, 22" autoComplete="street-address"/>
                    {errors.address && <p style={errStyle}><AlertCircle size={11}/>{errors.address}</p>}
                  </div>
                  <div className="flex-col-mobile" style={{ display:'flex', gap:12 }}>
                    <button onClick={goBack} className="btn btn-white btn-full-mobile">← Назад</button>
                    <button onClick={goNext} className="btn btn-yellow btn-full-mobile" style={{ flex:1 }}>Далі →</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'20px' }}>
                  <h2 style={{ fontSize:18, fontWeight:700, color:'var(--text)', marginBottom:20 }}>Оплата</h2>
                  <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
                    {([
                      {id:'card' as const, label:'Visa / Mastercard', desc:'Онлайн оплата', icon:'💳'},
                      {id:'privat24' as const, label:'Приват24', desc:'Оплата через Приват24', icon:'🏦'},
                      {id:'mono' as const, label:'Monobank', desc:'Оплата через Monobank', icon:'📱'},
                      {id:'cash' as const, label:'Накладений платіж', desc:'Оплата при отриманні', icon:'💵'},
                    ]).map(p => (
                      <label key={p.id} style={radioStyle(form.payment===p.id)}>
                        <input type="radio" name="payment" value={p.id} checked={form.payment===p.id} onChange={set} style={{ display:'none' }}/>
                        <span style={{ fontSize:22 }}>{p.icon}</span>
                        <div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:14, fontWeight:600, color:'var(--text)' }}>{p.label}</div><div style={{ fontSize:12, color:'var(--text-3)' }}>{p.desc}</div></div>
                        <div style={dot(form.payment===p.id)}/>
                      </label>
                    ))}
                  </div>
                  <div style={{ marginBottom:20 }}>
                    <label style={labelStyle}>Коментар</label>
                    <textarea name="comment" value={form.comment} onChange={set} rows={3} style={{ ...inputStyle(), resize:'none' as const }} placeholder="Додаткові побажання..."/>
                  </div>
                  {submitError && (
                    <div role="alert" style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'12px 14px', marginBottom:16, background:'rgba(239,68,68,.08)', border:'1.5px solid rgba(239,68,68,.3)', borderRadius:8, fontSize:13, color:'#B91C1C' }}>
                      <AlertCircle size={16} style={{ flexShrink:0, marginTop:1 }}/>
                      <span>{submitError}</span>
                    </div>
                  )}
                  <div className="flex-col-mobile" style={{ display:'flex', gap:12 }}>
                    <button onClick={goBack} disabled={submitting} className="btn btn-white btn-full-mobile">← Назад</button>
                    <button onClick={handleSubmit} disabled={submitting} className="btn btn-yellow btn-lg btn-full-mobile" style={{ flex:1, opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}>
                      {submitting ? (<><Loader2 size={16} className="spin"/> Оформлюємо…</>) : 'Підтвердити замовлення'}
                    </button>
                  </div>
                  <style>{`.spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                </div>
              )}
            </div>

            {/* Summary */}
            <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:24, position:'sticky', top:100 }}>
              <h3 style={{ fontSize:16, fontWeight:700, color:'var(--text)', marginBottom:18 }}>Ваше замовлення</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:18 }}>
                {items.map(item => (
                  <div key={item.product.id} style={{ display:'flex', gap:12 }}>
                    <div style={{ position:'relative', width:56, height:56, borderRadius:8, overflow:'hidden', flexShrink:0, background:'var(--bg)' }}>
                      {item.product.images?.[0] && (
                        <Image src={item.product.images[0]} alt={item.product.name} fill sizes="56px" style={{ objectFit:'cover' }} />
                      )}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.product.name}</div>
                      <div style={{ fontSize:12, color:'var(--text-3)' }}>{item.quantity} × ₴{item.product.price.toLocaleString('uk-UA')}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop:'1px solid var(--border)', paddingTop:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--text-3)', marginBottom:8 }}>
                  <span>Доставка</span><span style={{ color:'var(--yellow-dark)', fontWeight:600 }}>По всій Україні</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:20, fontWeight:800, color:'var(--text)' }}>
                  <span>Разом</span><span>₴{total.toLocaleString('uk-UA')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
