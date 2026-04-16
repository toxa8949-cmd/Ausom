import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function ShippingPage() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/><span style={{ color:'var(--text)', fontWeight:500 }}>Доставка та оплата</span>
          </div>
        </div>
      </div>

      <div style={{ padding:'48px 0' }}>
        <div className="w-container" style={{ maxWidth:800 }}>
          <div className="s-label">Сервіс</div>
          <h1 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', marginBottom:40 }}>
            Доставка та <span style={{ color:'var(--yellow-dark)' }}>оплата</span>
          </h1>

          <h2 style={{ fontSize:20, fontWeight:700, color:'var(--text)', marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>📦 Доставка</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:40 }}>
            {[
              { name:'Нова Пошта', time:'1-3 робочих дні', price:'Безкоштовно', desc:'Доставка у відділення або поштомат по всій Україні.' },
              { name:'Укрпошта', time:'3-7 робочих днів', price:'Безкоштовно', desc:'Доставка у поштове відділення Укрпошти.' },
              { name:'Кур\'єр по Києву', time:'1 робочий день', price:'Безкоштовно', desc:'Доставка кур\'єром за адресою в межах Києва.' },
            ].map(d => (
              <div key={d.name} style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:10, padding:'18px 22px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                  <span style={{ fontSize:15, fontWeight:700, color:'var(--text)' }}>{d.name}</span>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:12, color:'var(--text-3)' }}>{d.time}</span>
                    <span style={{ background:'rgba(245,194,0,.15)', color:'var(--yellow-dark)', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20 }}>{d.price}</span>
                  </div>
                </div>
                <p style={{ fontSize:13, color:'var(--text-3)' }}>{d.desc}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize:20, fontWeight:700, color:'var(--text)', marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>💳 Оплата</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:40 }}>
            {[
              { name:'Visa / Mastercard', desc:'Онлайн оплата карткою', icon:'💳' },
              { name:'Приват24', desc:'Оплата через Приват24', icon:'🏦' },
              { name:'Monobank', desc:'Оплата через Monobank', icon:'📱' },
              { name:'Накладений платіж', desc:'Оплата при отриманні', icon:'💵' },
            ].map(p => (
              <div key={p.name} style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:10, padding:'18px 22px', display:'flex', alignItems:'flex-start', gap:14 }}>
                <span style={{ fontSize:24 }}>{p.icon}</span>
                <div><div style={{ fontSize:14, fontWeight:600, color:'var(--text)' }}>{p.name}</div><div style={{ fontSize:12, color:'var(--text-3)' }}>{p.desc}</div></div>
              </div>
            ))}
          </div>

          <div style={{ background:'rgba(245,194,0,.08)', border:'1.5px solid rgba(245,194,0,.25)', borderRadius:10, padding:'20px 24px' }}>
            <h3 style={{ fontSize:15, fontWeight:700, color:'var(--text)', marginBottom:10 }}>ℹ️ Важлива інформація</h3>
            <div style={{ fontSize:13, color:'var(--text-2)', lineHeight:1.8 }}>
              • Замовлення обробляються протягом 1 робочого дня<br/>
              • Відстежити замовлення можна за номером ТТН<br/>
              • При накладеному платежі комісія — за рахунок покупця<br/>
              • Для юридичних осіб — безготівковий розрахунок з ПДВ
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
