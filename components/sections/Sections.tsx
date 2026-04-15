'use client'
import { Truck, Shield, RotateCcw, MessageCircle } from 'lucide-react'

export function StatsBar() { return null }

export function Features() {
  const items = [
    { Icon: Truck,         title: 'Безкоштовна доставка', body: 'Доставляємо по всій Україні. Швидко та надійно.' },
    { Icon: Shield,        title: 'Гарантія 2 роки',       body: 'Офіційна гарантія на всі моделі Ausom.' },
    { Icon: RotateCcw,     title: '14 днів повернення',    body: 'Не підійшов — повертай без питань.' },
    { Icon: MessageCircle, title: 'Підтримка 24/7',         body: 'Завжди на зв\'язку — чат, email, телефон.' },
  ]
  return (
    <section style={{ padding:'80px 0', background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
      <div className="w-container">
        <div style={{ marginBottom:48 }}>
          <div className="s-label">Чому Ausom Ukraine</div>
          <h2 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)' }}>
            Ми <span style={{ color:'var(--yellow-dark)' }}>піклуємось</span>
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
          {items.map(({ Icon, title, body }) => (
            <div key={title} style={{
              padding:'28px 24px', background:'var(--bg-soft)',
              border:'1.5px solid var(--border)', borderRadius:12,
              transition:'border-color .2s, box-shadow .2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--yellow)'; (e.currentTarget as HTMLElement).style.boxShadow='0 4px 20px rgba(245,194,0,.12)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='var(--border)'; (e.currentTarget as HTMLElement).style.boxShadow='none' }}>
              <div style={{
                width:44, height:44, borderRadius:10, marginBottom:16,
                background:'#F5C200', display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <Icon size={20} color="#111" strokeWidth={1.8}/>
              </div>
              <h3 style={{ fontSize:15, fontWeight:700, color:'var(--text)', marginBottom:8, letterSpacing:'-.01em' }}>{title}</h3>
              <p style={{ fontSize:13, color:'var(--text-3)', lineHeight:1.6 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Press() {
  const items = [
    { pub:'Forbes',        q:'«Ausom поєднує інженерну якість з вражаючою продуктивністю.»' },
    { pub:'USA Today',     q:'«Розроблені для реальних сценаріїв — від міста до бездоріжжя.»' },
    { pub:"Tom's Guide",   q:'«Власна архітектура підвіски — вражає.»' },
    { pub:'Electrek',      q:'«Ausom зібрав лояльну спільноту дуже швидко.»' },
    { pub:'Gadgeteer',     q:'«DT2 Pro — найкраща пропозиція за ціною/характеристиками.»' },
    { pub:'AutoEvolution', q:'«Самокати Ausom дають доступ до вражаючих можливостей.»' },
  ]
  return (
    <section style={{ padding:'72px 0', background:'var(--bg-soft)', borderTop:'1px solid var(--border)', overflow:'hidden' }}>
      <div className="w-container" style={{ marginBottom:40 }}>
        <div className="s-label">Про нас пишуть</div>
        <h2 style={{ fontSize:'clamp(28px,3vw,40px)', fontWeight:800, letterSpacing:'-.02em', color:'var(--text)' }}>
          Думка <span style={{ color:'var(--yellow-dark)' }}>експертів</span>
        </h2>
      </div>
      <div style={{ overflow:'hidden', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
        <div className="animate-marquee" style={{ display:'flex' }}>
          {[...items,...items].map((item,i) => (
            <div key={i} style={{
              flexShrink:0, width:300, padding:'28px 28px',
              borderRight:'1px solid var(--border)', background:'var(--bg)',
            }}>
              <div style={{ fontSize:17, fontWeight:800, letterSpacing:'-.01em', color:'var(--text)', marginBottom:6 }}>{item.pub}</div>
              <div style={{ color:'#F5C200', fontSize:12, letterSpacing:'.1em', marginBottom:10 }}>★★★★★</div>
              <p style={{ fontSize:13, color:'var(--text-3)', lineHeight:1.6, fontStyle:'italic' }}>{item.q}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Newsletter() {
  return (
    <section style={{ padding:'96px 0', background:'#111', position:'relative', overflow:'hidden' }}>
      <div style={{
        position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)',
        width:600, height:400, borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(245,194,0,.08), transparent 70%)',
        pointerEvents:'none',
      }}/>
      <div className="w-container" style={{ textAlign:'center', maxWidth:560, margin:'0 auto', position:'relative', zIndex:1 }}>
        <h2 style={{ fontSize:'clamp(36px,5vw,60px)', fontWeight:800, letterSpacing:'-.03em', color:'#fff', marginBottom:12, lineHeight:1.05 }}>
          Будь у <span style={{ color:'#F5C200' }}>курсі</span>
        </h2>
        <p style={{ fontSize:15, color:'rgba(255,255,255,.5)', marginBottom:36, lineHeight:1.7 }}>
          Ексклюзивні знижки, огляди нових моделей та поради — першим.
        </p>
        <form style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }} onSubmit={e=>e.preventDefault()}>
          <input type="email" required placeholder="твій@email.com" style={{
            flex:1, minWidth:240, padding:'14px 20px',
            background:'rgba(255,255,255,.08)', border:'1.5px solid rgba(255,255,255,.15)',
            borderRadius:8, fontSize:14, color:'#fff',
            outline:'none', transition:'border-color .15s',
            fontFamily:'Inter, sans-serif',
          }}
          onFocus={e => (e.target.style.borderColor='#F5C200')}
          onBlur={e => (e.target.style.borderColor='rgba(255,255,255,.15)')}/>
          <button type="submit" className="btn btn-yellow">Підписатися</button>
        </form>
      </div>
    </section>
  )
}
