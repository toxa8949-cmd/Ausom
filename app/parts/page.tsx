import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const cats = [
  { icon:'🔋', name:'Акумулятори', desc:'Оригінальні батареї для всіх моделей', items:['Батарея L1 (468 Wh)','Батарея L2 Dual (768 Wh)','Батарея L2 Max (960 Wh)','Батарея DT2 Pro (1066 Wh)'] },
  { icon:'🛞', name:'Колеса та шини', desc:'Покришки, камери та диски', items:['Покришка 10"','Покришка 11"','Камера 10"','Камера 11"'] },
  { icon:'🔧', name:'Гальма', desc:'Колодки, диски та тросики', items:['Гальмівні колодки (комплект)','Гальмівний диск 140мм','Гальмівний тросик','Гідравлічний шланг'] },
  { icon:'💡', name:'Освітлення', desc:'Фари, задні ліхтарі', items:['Передня LED фара','Задній ліхтар','Поворотники (пара)','LED стрічка'] },
  { icon:'🎛️', name:'Електроніка', desc:'Контролери, дисплеї, зарядки', items:['Контролер (по моделі)','LCD дисплей','Зарядний пристрій','Ручка газу'] },
  { icon:'🛡️', name:'Аксесуари', desc:'Захист, сумки, додаткове обладнання', items:['Сумка на кермо','Замок протиугінний','Дзеркало (пара)','Бризговики (комплект)'] },
]

export default function PartsPage() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/>
            <span style={{ color:'var(--text)', fontWeight:500 }}>Запчастини</span>
          </div>
        </div>
      </div>

      <div style={{ padding:'48px 0', borderBottom:'1px solid var(--border)' }}>
        <div className="w-container" style={{ textAlign:'center' }}>
          <div className="s-label" style={{ justifyContent:'center' }}>Запчастини</div>
          <h1 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', marginBottom:12 }}>
            Запчастини та <span style={{ color:'var(--yellow-dark)' }}>аксесуари</span>
          </h1>
          <p style={{ fontSize:15, color:'var(--text-2)', maxWidth:520, margin:'0 auto' }}>
            Оригінальні запчастини Ausom. Для замовлення зв&apos;яжіться з нами — підберемо потрібну деталь.
          </p>
        </div>
      </div>

      <div className="w-container" style={{ padding:'40px 40px 48px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {cats.map(c => (
            <div key={c.name} style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'28px 24px' }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{c.icon}</div>
              <h3 style={{ fontSize:17, fontWeight:700, color:'var(--text)', marginBottom:6 }}>{c.name}</h3>
              <p style={{ fontSize:13, color:'var(--text-3)', marginBottom:16 }}>{c.desc}</p>
              <ul style={{ listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:8 }}>
                {c.items.map(item => (
                  <li key={item} style={{ fontSize:13, color:'var(--text-2)', display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ width:5, height:5, borderRadius:'50%', background:'#F5C200', flexShrink:0 }}/>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop:'1px solid var(--border)', padding:'48px 0' }}>
        <div className="w-container" style={{ textAlign:'center' }}>
          <h2 style={{ fontSize:24, fontWeight:800, color:'var(--text)', marginBottom:12 }}>Потрібна запчастина?</h2>
          <p style={{ fontSize:15, color:'var(--text-2)', marginBottom:24, maxWidth:480, margin:'0 auto 24px' }}>Зв&apos;яжіться з нами — допоможемо підібрати потрібну деталь.</p>
          <div style={{ display:'flex', justifyContent:'center', gap:12 }}>
            <Link href="/contact" className="btn btn-yellow">Написати нам</Link>
            <a href="tel:+380670000000" className="btn btn-white">📞 +38 (067) 000-00-00</a>
          </div>
        </div>
      </div>
    </div>
  )
}
