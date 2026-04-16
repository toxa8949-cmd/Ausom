import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function ReturnsPage() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/><span style={{ color:'var(--text)', fontWeight:500 }}>Повернення та обмін</span>
          </div>
        </div>
      </div>
      <div style={{ padding:'48px 0 72px' }}>
        <div className="w-container" style={{ maxWidth:800 }}>
          <div className="s-label">Сервіс</div>
          <h1 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', marginBottom:12 }}>Повернення та <span style={{ color:'var(--yellow-dark)' }}>обмін</span></h1>
          <p style={{ fontSize:15, color:'var(--text-2)', marginBottom:36 }}>14 днів на повернення без питань. Ми впевнені в якості наших самокатів.</p>

          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {[
              { icon:'↩️', title:'14 днів на повернення', text:'Ви маєте право повернути товар належної якості протягом 14 днів з моменту отримання, якщо він не був у використанні, збережено товарний вигляд та упаковку.', list:['Товар не був у використанні','Збережено оригінальну упаковку','Наявність чеку або підтвердження покупки','Повернення протягом 14 календарних днів'] },
              { icon:'🔄', title:'Обмін товару', text:'Якщо вам не підійшла модель — допоможемо обміняти на іншу. Різницю в ціні можна доплатити або отримати повернення. Обмін протягом 14 днів.' },
              { icon:'🛠️', title:'Повернення неякісного товару', text:'Якщо ви виявили заводський дефект — зв\'яжіться з нами. Ми організуємо безкоштовне повернення та заміну або повне відшкодування.' },
            ].map(s => (
              <div key={s.title} style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'24px 28px' }}>
                <h2 style={{ fontSize:17, fontWeight:700, color:'var(--text)', marginBottom:10, display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ width:36, height:36, background:'rgba(245,194,0,.15)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>{s.icon}</span>
                  {s.title}
                </h2>
                <p style={{ fontSize:14, color:'var(--text-2)', lineHeight:1.7, marginBottom: s.list ? 14 : 0 }}>{s.text}</p>
                {s.list && (
                  <div style={{ background:'var(--bg)', borderRadius:8, padding:'14px 18px' }}>
                    {s.list.map(l => <div key={l} style={{ fontSize:13, color:'var(--text-3)', lineHeight:2 }}>• {l}</div>)}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'28px', marginTop:20 }}>
            <h2 style={{ fontSize:17, fontWeight:700, color:'var(--text)', marginBottom:20 }}>Як оформити повернення?</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
              {[
                { n:'1', t:'Зв\'яжіться з нами', d:'Напишіть на support@ausom.ua або зателефонуйте' },
                { n:'2', t:'Отримайте інструкції', d:'Ми надішлемо ТТН для безкоштовного повернення' },
                { n:'3', t:'Отримайте кошти', d:'Повернення коштів протягом 3-5 робочих днів' },
              ].map(s => (
                <div key={s.n} style={{ textAlign:'center' }}>
                  <div style={{ width:36, height:36, background:'#F5C200', color:'#111', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14, margin:'0 auto 10px' }}>{s.n}</div>
                  <div style={{ fontSize:14, fontWeight:600, color:'var(--text)', marginBottom:4 }}>{s.t}</div>
                  <div style={{ fontSize:12, color:'var(--text-3)' }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign:'center', marginTop:28 }}>
            <Link href="/contact" className="btn btn-yellow">Зв&apos;язатися з підтримкою</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
