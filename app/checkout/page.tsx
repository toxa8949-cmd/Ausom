'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { useCart } from '@/lib/cart'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ firstName:'', lastName:'', phone:'', email:'', city:'', address:'', delivery:'nova-poshta', payment:'card', comment:'' })

  const set = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value })

  const inputStyle: React.CSSProperties = { width:'100%', background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:8, padding:'12px 16px', fontSize:14, color:'var(--text)', fontFamily:'Inter,sans-serif', outline:'none' }
  const labelStyle: React.CSSProperties = { display:'block', fontSize:12, fontWeight:600, color:'var(--text-3)', marginBottom:6 }

  if (submitted) {
    return (
      <div style={{ minHeight:'100vh', background:'var(--bg)', padding:'80px 0' }}>
        <div className="w-container" style={{ maxWidth:560, textAlign:'center' }}>
          <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:16, padding:'56px 24px' }}>
            <div style={{ width:64, height:64, background:'rgba(245,194,0,.15)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', fontSize:28 }}>✓</div>
            <h1 style={{ fontSize:28, fontWeight:800, color:'var(--text)', marginBottom:12 }}>Замовлення оформлено!</h1>
            <p style={{ fontSize:15, color:'var(--text-2)', marginBottom:8 }}>Дякуємо! Ми зв&apos;яжемось з вами найближчим часом.</p>
            <p style={{ fontSize:13, color:'var(--text-3)', marginBottom:32 }}>Номер: #AU-{Math.floor(Math.random()*90000+10000)}</p>
            <Link href="/" className="btn btn-black">На головну</Link>
          </div>
        </div>
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
    width:18, height:18, borderRadius:'50%', border: active ? '5px solid #F5C200' : '2px solid var(--border-md)',
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
                    <div><label style={labelStyle}>Ім&apos;я *</label><input name="firstName" value={form.firstName} onChange={set} style={inputStyle} placeholder="Олександр"/></div>
                    <div><label style={labelStyle}>Прізвище *</label><input name="lastName" value={form.lastName} onChange={set} style={inputStyle} placeholder="Петренко"/></div>
                  </div>
                  <div style={{ marginBottom:14 }}><label style={labelStyle}>Телефон *</label><input name="phone" value={form.phone} onChange={set} style={inputStyle} placeholder="+38 (067) 000-00-00"/></div>
                  <div style={{ marginBottom:24 }}><label style={labelStyle}>Email *</label><input name="email" value={form.email} onChange={set} style={inputStyle} placeholder="email@example.com"/></div>
                  <button onClick={() => setStep(2)} className="btn btn-yellow" style={{ width:'100%' }}>Далі →</button>
                </div>
              )}

              {step === 2 && (
                <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'20px' }}>
                  <h2 style={{ fontSize:18, fontWeight:700, color:'var(--text)', marginBottom:20 }}>Доставка</h2>
                  <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
                    {[
                      {id:'nova-poshta',label:'Нова Пошта',desc:'Безкоштовно, 1-3 дні',icon:'📦'},
                      {id:'ukrposhta',label:'Укрпошта',desc:'Безкоштовно, 3-7 днів',icon:'✉️'},
                      {id:'courier',label:'Кур\'єр (Київ)',desc:'Безкоштовно, 1 день',icon:'🚚'},
                    ].map(d => (
                      <label key={d.id} style={radioStyle(form.delivery===d.id)}>
                        <input type="radio" name="delivery" value={d.id} checked={form.delivery===d.id} onChange={set} style={{ display:'none' }}/>
                        <span style={{ fontSize:22 }}>{d.icon}</span>
                        <div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:14, fontWeight:600, color:'var(--text)' }}>{d.label}</div><div style={{ fontSize:12, color:'var(--text-3)' }}>{d.desc}</div></div>
                        <div style={dot(form.delivery===d.id)}/>
                      </label>
                    ))}
                  </div>
                  <div style={{ marginBottom:14 }}><label style={labelStyle}>Місто *</label><input name="city" value={form.city} onChange={set} style={inputStyle} placeholder="Київ"/></div>
                  <div style={{ marginBottom:24 }}><label style={labelStyle}>Адреса / відділення *</label><input name="address" value={form.address} onChange={set} style={inputStyle} placeholder="Відділення №1"/></div>
                  <div className="flex-col-mobile" style={{ display:'flex', gap:12 }}>
                    <button onClick={() => setStep(1)} className="btn btn-white btn-full-mobile">← Назад</button>
                    <button onClick={() => setStep(3)} className="btn btn-yellow btn-full-mobile" style={{ flex:1 }}>Далі →</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'20px' }}>
                  <h2 style={{ fontSize:18, fontWeight:700, color:'var(--text)', marginBottom:20 }}>Оплата</h2>
                  <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
                    {[
                      {id:'card',label:'Visa / Mastercard',desc:'Онлайн оплата',icon:'💳'},
                      {id:'privat24',label:'Приват24',desc:'Оплата через Приват24',icon:'🏦'},
                      {id:'mono',label:'Monobank',desc:'Оплата через Monobank',icon:'📱'},
                      {id:'cash',label:'Накладений платіж',desc:'Оплата при отриманні',icon:'💵'},
                    ].map(p => (
                      <label key={p.id} style={radioStyle(form.payment===p.id)}>
                        <input type="radio" name="payment" value={p.id} checked={form.payment===p.id} onChange={set} style={{ display:'none' }}/>
                        <span style={{ fontSize:22 }}>{p.icon}</span>
                        <div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:14, fontWeight:600, color:'var(--text)' }}>{p.label}</div><div style={{ fontSize:12, color:'var(--text-3)' }}>{p.desc}</div></div>
                        <div style={dot(form.payment===p.id)}/>
                      </label>
                    ))}
                  </div>
                  <div style={{ marginBottom:24 }}><label style={labelStyle}>Коментар</label><textarea name="comment" value={form.comment} onChange={set} rows={3} style={{ ...inputStyle, resize:'none' as const }} placeholder="Додаткові побажання..."/></div>
                  <div className="flex-col-mobile" style={{ display:'flex', gap:12 }}>
                    <button onClick={() => setStep(2)} className="btn btn-white btn-full-mobile">← Назад</button>
                    <button onClick={() => { setSubmitted(true); clearCart() }} className="btn btn-yellow btn-lg btn-full-mobile" style={{ flex:1 }}>Підтвердити замовлення</button>
                  </div>
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
                      <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit:'cover' }} />
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
                  <span>Доставка</span><span style={{ color:'var(--yellow-dark)', fontWeight:600 }}>Безкоштовно</span>
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
