import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function AffiliatePage() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/><span style={{ color:'var(--text)', fontWeight:500 }}>Партнерство</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg, rgba(245,194,0,.08), var(--bg))', padding:'56px 0', borderBottom:'1px solid var(--border)' }}>
        <div className="w-container" style={{ textAlign:'center' }}>
          <span style={{ display:'inline-block', background:'rgba(245,194,0,.12)', border:'1px solid rgba(245,194,0,.25)', color:'var(--yellow-dark)', fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, padding:'5px 14px', borderRadius:4, marginBottom:20 }}>Партнерська програма</span>
          <h1 style={{ fontSize:'clamp(36px,5vw,56px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1.05, marginBottom:16 }}>
            Заробляй з <span style={{ color:'var(--yellow-dark)' }}>Ausom Ukraine</span>
          </h1>
          <p style={{ fontSize:16, color:'var(--text-2)', maxWidth:520, margin:'0 auto' }}>Рекомендуй самокати Ausom та отримуй комісію з кожного продажу.</p>
        </div>
      </div>

      <div className="w-container" style={{ padding:'48px 40px' }}>
        {/* Benefits */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:48 }}>
          {[
            { icon:'💰', title:'До 10% комісії', desc:'Отримуй до 10% від кожного продажу за твоїм посиланням.' },
            { icon:'🔗', title:'Персональне посилання', desc:'Унікальне реферальне посилання для відстеження продажів.' },
            { icon:'📊', title:'Прозора аналітика', desc:'Дашборд з повною статистикою кліків та виплат.' },
          ].map(b => (
            <div key={b.title} style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'28px 24px', textAlign:'center' }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{b.icon}</div>
              <h3 style={{ fontSize:16, fontWeight:700, color:'var(--text)', marginBottom:8 }}>{b.title}</h3>
              <p style={{ fontSize:13, color:'var(--text-3)' }}>{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div style={{ marginBottom:48, textAlign:'center' }}>
          <h2 style={{ fontSize:24, fontWeight:800, color:'var(--text)', marginBottom:24 }}>Як це працює</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
            {[
              { n:'1', t:'Реєстрація', d:'Заповни форму' },
              { n:'2', t:'Посилання', d:'Отримай реферальне посилання' },
              { n:'3', t:'Рекомендуй', d:'Ділись з аудиторією' },
              { n:'4', t:'Заробляй', d:'Комісія за кожен продаж' },
            ].map(s => (
              <div key={s.n} style={{ textAlign:'center' }}>
                <div style={{ width:40, height:40, background:'#F5C200', color:'#111', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:16, margin:'0 auto 10px' }}>{s.n}</div>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--text)', marginBottom:4 }}>{s.t}</div>
                <div style={{ fontSize:12, color:'var(--text-3)' }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Who */}
        <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'28px 32px', marginBottom:40 }}>
          <h2 style={{ fontSize:18, fontWeight:700, color:'var(--text)', marginBottom:16 }}>Для кого ця програма?</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {['🎥 Блогери та контент-мейкери','📱 Власники соцмереж','🏪 Веломагазини та сервіси','🏢 Компанії з корпоративними потребами','👥 Спільноти електротранспорту','📰 Технологічні медіа'].map(w => (
              <div key={w} style={{ fontSize:14, color:'var(--text-2)', display:'flex', alignItems:'center', gap:8 }}><span style={{ color:'var(--yellow-dark)' }}>✓</span>{w}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign:'center' }}>
          <Link href="/contact" className="btn btn-yellow btn-lg">Стати партнером</Link>
          <p style={{ fontSize:12, color:'var(--text-3)', marginTop:10 }}>Або напишіть на <a href="mailto:partners@ausom.ua" style={{ color:'var(--yellow-dark)' }}>partners@ausom.ua</a></p>
        </div>
      </div>
    </div>
  )
}
