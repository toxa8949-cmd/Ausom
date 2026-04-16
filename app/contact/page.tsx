'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const B = '1.5px solid #EEEEEE'
const inp:React.CSSProperties = { width:'100%',padding:'12px 16px',background:'#F9F9F9',border:B,borderRadius:8,fontSize:14,color:'#111',outline:'none',fontFamily:'Inter,sans-serif',transition:'border-color .15s' }

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      {/* Header */}
      <div style={{ background:'#111', padding:'56px 0 48px' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'rgba(255,255,255,.5)', marginBottom:16 }}>
            <Link href="/" style={{ color:'rgba(255,255,255,.5)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={12}/>
            <span style={{ color:'#fff' }}>Контакти</span>
          </div>
          <div className="s-label" style={{ color:'#F5C200' }}>Контакти</div>
          <h1 style={{ fontSize:'clamp(36px,5vw,58px)', fontWeight:800, letterSpacing:'-.03em', color:'#fff', lineHeight:1.05 }}>
            Зв'яжись <span style={{ color:'#F5C200' }}>з нами</span>
          </h1>
        </div>
      </div>

      <div className="w-container" style={{ padding:'60px 40px 80px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:64 }}>

          {/* Info */}
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, letterSpacing:'-.02em', color:'var(--text)', marginBottom:28 }}>Наші контакти</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {[
                { Icon:Mail,  label:'Email',          value:'support@ausom.ua' },
                { Icon:Phone, label:'Телефон',         value:'+38 (067) 000-00-00' },
                { Icon:MapPin,label:'Адреса',          value:'м. Київ, вул. Хрещатик 1' },
                { Icon:Clock, label:'Години роботи',   value:'Пн–Пт: 9:00–18:00' },
              ].map(({Icon,label,value}) => (
                <div key={label} style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                  <div style={{ width:44, height:44, background:'#FFF8E6', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={18} color="#D4A800"/>
                  </div>
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'var(--text-3)', marginBottom:4 }}>{label}</div>
                    <div style={{ fontSize:15, fontWeight:600, color:'var(--text)' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, letterSpacing:'-.02em', color:'var(--text)', marginBottom:24 }}>Написати нам</h2>
            {sent ? (
              <div style={{ background:'#F0FDF4', border:'1.5px solid #BBF7D0', borderRadius:14, padding:40, textAlign:'center' }}>
                <div style={{ fontSize:48, marginBottom:12 }}>✅</div>
                <h3 style={{ fontSize:20, fontWeight:800, color:'#111', marginBottom:8 }}>Повідомлення надіслано!</h3>
                <p style={{ fontSize:14, color:'#555' }}>Ми відповімо протягом 24 годин.</p>
              </div>
            ) : (
              <form onSubmit={e=>{e.preventDefault();setSent(true)}} style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {[
                  { id:'name',  label:"Ім'я",    type:'text',  p:'Іван Іванов' },
                  { id:'email', label:'Email',   type:'email', p:'ivan@email.com' },
                  { id:'phone', label:'Телефон', type:'tel',   p:'+38 (067) 000-00-00' },
                ].map(f => (
                  <div key={f.id}>
                    <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'var(--text-3)', marginBottom:8 }}>{f.label}</label>
                    <input id={f.id} type={f.type} placeholder={f.p} required style={inp}
                      onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')}/>
                  </div>
                ))}
                <div>
                  <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'var(--text-3)', marginBottom:8 }}>Повідомлення</label>
                  <textarea rows={5} placeholder="Ваше питання..." required style={{ ...inp, resize:'vertical' as const }}
                    onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')}/>
                </div>
                <button type="submit" className="btn btn-black btn-full" style={{ justifyContent:'center' }}>
                  Надіслати повідомлення
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
