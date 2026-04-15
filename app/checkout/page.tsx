'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { createOrder } from '@/lib/queries'
import { ArrowLeft, Check, CreditCard, Smartphone, Building } from 'lucide-react'

const inp = {
  width:'100%', padding:'12px 16px',
  background:'var(--bg)', border:'1.5px solid var(--border)',
  borderRadius:8, fontSize:14, color:'var(--text)',
  outline:'none', fontFamily:'Inter,sans-serif',
  transition:'border-color .15s',
} as React.CSSProperties

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
      await createOrder({ items: items as any, total, ...form, status:'pending' })
      clearCart(); setDone(true)
    } catch { alert('Помилка. Спробуй ще раз.') }
    finally { setSaving(false) }
  }

  if (done) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:20, padding:56, textAlign:'center', maxWidth:420, width:'100%' }}>
        <div style={{ width:72, height:72, background:'#DCFCE7', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' }}>
          <Check size={32} color="#22C55E" strokeWidth={2.5}/>
        </div>
        <h1 style={{ fontSize:36, fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', marginBottom:12 }}>Замовлення прийнято!</h1>
        <p style={{ fontSize:14, color:'var(--text-3)', lineHeight:1.7, marginBottom:32 }}>Ми зв'яжемось з вами найближчим часом для підтвердження.</p>
        <Link href="/catalog" className="btn btn-black btn-full" style={{ justifyContent:'center' }}>Продовжити покупки</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'32px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
            {[['1','Кошик'],[' ','·'],['2','Оформлення'],[' ','·'],['3','Підтвердження']].map(([n,l],i) => (
              <span key={i} style={{ fontSize:13, fontWeight: n==='2' ? 700 : 400, color: n==='2' ? 'var(--text)' : 'var(--text-3)' }}>
                {n==='1'||n==='2'||n==='3' ? <><span style={{ background: n==='2'?'#F5C200':'var(--bg-subtle)', color: n==='2'?'#111':'var(--text-3)', width:20, height:20, borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, marginRight:6 }}>{n}</span>{l}</> : l}
              </span>
            ))}
          </div>
          <h1 style={{ fontSize:'clamp(28px,4vw,44px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)' }}>
            Оформлення <span style={{ color:'var(--yellow-dark)' }}>замовлення</span>
          </h1>
        </div>
      </div>

      <div className="w-container" style={{ padding:'32px 40px' }}>
        <Link href="/cart" style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)', textDecoration:'none', marginBottom:28 }}>
          <ArrowLeft size={14}/> Назад до кошика
        </Link>

        <form onSubmit={handleSubmit}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:32, alignItems:'start' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

              {/* Contact */}
              {[
                { title:'Контактні дані', fields:[
                  { label:"Ім'я та прізвище *", key:'name', type:'text', placeholder:'Іван Іванов', full:true },
                  { label:'Email *', key:'email', type:'email', placeholder:'ivan@email.com', full:false },
                  { label:'Телефон *', key:'phone', type:'tel', placeholder:'+38 (067) 000-00-00', full:false },
                ]},
                { title:'Адреса доставки', fields:[
                  { label:'Місто *', key:'city', type:'text', placeholder:'Київ', full:false },
                  { label:'Адреса *', key:'address', type:'text', placeholder:'вул. Хрещатик 1, кв. 10', full:true },
                  { label:'Коментар', key:'notes', type:'textarea', placeholder:'Побажання...', full:true },
                ]},
              ].map(section => (
                <div key={section.title} style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:14, padding:'24px 24px' }}>
                  <h2 style={{ fontSize:18, fontWeight:800, letterSpacing:'-.02em', color:'var(--text)', marginBottom:20 }}>{section.title}</h2>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                    {section.fields.map(f => (
                      <div key={f.key} style={{ gridColumn: f.full ? '1/-1' : 'auto' }}>
                        <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'var(--text-3)', marginBottom:8 }}>{f.label}</label>
                        {f.type === 'textarea'
                          ? <textarea value={form[f.key as keyof typeof form]} onChange={e=>set(f.key as any,e.target.value)} placeholder={f.placeholder} rows={3} style={{ ...inp, resize:'vertical' as const }}
                              onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='var(--border)')}/>
                          : <input type={f.type} value={form[f.key as keyof typeof form]} onChange={e=>set(f.key as any,e.target.value)} required={f.label.includes('*')} placeholder={f.placeholder} style={inp}
                              onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='var(--border)')}/>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Payment */}
              <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:14, padding:'24px 24px' }}>
                <h2 style={{ fontSize:18, fontWeight:800, letterSpacing:'-.02em', color:'var(--text)', marginBottom:20 }}>Спосіб оплати</h2>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
                  {[{id:'card',Icon:CreditCard,label:'Картка'},{id:'mono',Icon:Smartphone,label:'Monobank'},{id:'cash',Icon:Building,label:'При отриманні'}].map(({id,Icon,label}) => (
                    <button key={id} type="button" onClick={()=>setPayment(id)} style={{
                      display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'16px 12px',
                      borderRadius:10, border:'1.5px solid', cursor:'pointer', transition:'all .15s',
                      background: payment===id ? '#FFF3CC' : 'var(--bg)',
                      borderColor: payment===id ? '#F5C200' : 'var(--border)',
                      color: payment===id ? '#8B6800' : 'var(--text-3)',
                    }}>
                      <Icon size={20}/><span style={{ fontSize:12, fontWeight:600 }}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:14, padding:24, position:'sticky', top:84, display:'flex', flexDirection:'column', gap:16 }}>
              <h2 style={{ fontSize:18, fontWeight:800, letterSpacing:'-.02em', color:'var(--text)' }}>Ваше замовлення</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {items.map(({product:p,quantity}) => (
                  <div key={p.id} style={{ display:'flex', justifyContent:'space-between', fontSize:13 }}>
                    <span style={{ color:'var(--text-3)', flex:1, marginRight:8, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' as const }}>{p.name} × {quantity}</span>
                    <span style={{ fontWeight:600, color:'var(--text)', flexShrink:0 }}>₴{(p.price*quantity).toLocaleString('uk-UA')}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop:'1px solid var(--border)', paddingTop:14, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:15, fontWeight:700, color:'var(--text)' }}>Разом</span>
                <span style={{ fontSize:26, fontWeight:800, letterSpacing:'-.025em', color:'var(--text)' }}>₴{total.toLocaleString('uk-UA')}</span>
              </div>
              <button type="submit" disabled={saving} className="btn btn-black btn-full" style={{ justifyContent:'center', opacity: saving ? .6 : 1 }}>
                {saving ? <><span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,.4)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'spin .7s linear infinite' }}/>Оформлення...</> : 'Підтвердити замовлення'}
              </button>
              <p style={{ fontSize:11, color:'var(--text-4)', textAlign:'center' }}>🔒 Менеджер підтвердить замовлення</p>
            </div>
          </div>
        </form>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
