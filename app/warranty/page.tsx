import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function WarrantyPage() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/><span style={{ color:'var(--text)', fontWeight:500 }}>Гарантія</span>
          </div>
        </div>
      </div>
      <div style={{ padding:'48px 0 72px' }}>
        <div className="w-container" style={{ maxWidth:800 }}>
          <div className="s-label">Сервіс</div>
          <h1 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', marginBottom:12 }}>
            Офіційна <span style={{ color:'var(--yellow-dark)' }}>гарантія</span>
          </h1>
          <p style={{ fontSize:15, color:'var(--text-2)', marginBottom:36 }}>Гарантія 2 роки на всі моделі Ausom. Ми стоїмо за якістю нашої продукції.</p>

          <div style={{ background:'linear-gradient(135deg, rgba(245,194,0,.1), var(--bg-soft))', border:'1.5px solid rgba(245,194,0,.3)', borderRadius:16, padding:'40px 36px', textAlign:'center', marginBottom:28 }}>
            <div style={{ fontSize:36, marginBottom:8 }}>🛡️</div>
            <div style={{ fontSize:32, fontWeight:800, color:'var(--text)', marginBottom:8 }}>2 роки гарантії</div>
            <p style={{ fontSize:14, color:'var(--text-2)', maxWidth:420, margin:'0 auto' }}>На всі електросамокати, придбані через Ausom Ukraine</p>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'24px 28px' }}>
              <h2 style={{ fontSize:17, fontWeight:700, color:'var(--text)', marginBottom:14 }}>✅ Що покриває гарантія</h2>
              {['Заводські дефекти мотора, контролера та електроніки','Несправність акумулятора (деградація >20% за перший рік)','Дефекти рами та складального механізму','Несправність гальмівної системи','Дефекти підвіски та амортизаторів','Несправність дисплея та освітлення'].map(t => (
                <div key={t} style={{ fontSize:14, color:'var(--text-2)', lineHeight:2, display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:'#F5C200', flexShrink:0 }}/>{t}
                </div>
              ))}
            </div>

            <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'24px 28px' }}>
              <h2 style={{ fontSize:17, fontWeight:700, color:'var(--text)', marginBottom:14 }}>❌ Що не покриває гарантія</h2>
              {['Механічні пошкодження внаслідок аварій','Природний знос (шини, колодки, грипси)','Пошкодження від неправильної експлуатації','Самостійний ремонт або модифікація','Пошкодження від води (понад норми IP)'].map(t => (
                <div key={t} style={{ fontSize:14, color:'var(--text-3)', lineHeight:2, display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background:'#EF4444', flexShrink:0 }}/>{t}
                </div>
              ))}
            </div>

            <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'24px 28px' }}>
              <h2 style={{ fontSize:17, fontWeight:700, color:'var(--text)', marginBottom:16 }}>📋 Як скористатися гарантією</h2>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                {[
                  {n:'1',t:'Зв\'яжіться з підтримкою та опишіть проблему'},
                  {n:'2',t:'Надішліть фото/відео дефекту для діагностики'},
                  {n:'3',t:'Отримайте безкоштовну ТТН для відправки'},
                  {n:'4',t:'Ремонт або заміна за 5-10 робочих днів'},
                ].map(s => (
                  <div key={s.n} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                    <span style={{ width:28, height:28, background:'rgba(245,194,0,.15)', color:'var(--yellow-dark)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:12, flexShrink:0 }}>{s.n}</span>
                    <span style={{ fontSize:13, color:'var(--text-2)' }}>{s.t}</span>
                  </div>
                ))}
              </div>
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
