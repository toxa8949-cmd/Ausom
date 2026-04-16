import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function TermsPage() {
  const sections = [
    { t:'1. Загальні умови', p:'Використовуючи сайт ausom.vercel.app, ви погоджуєтесь з цими умовами. Сайт належить Ausom Ukraine — офіційному дистриб\'ютору Ausom в Україні.' },
    { t:'2. Замовлення та покупки', p:'Оформлюючи замовлення, ви підтверджуєте, що вам є 18 років та ви надаєте достовірну інформацію. Ціни вказані в гривнях (₴) з ПДВ.' },
    { t:'3. Ціни та знижки', p:'Ми забезпечуємо точність цін. У разі помилки — зв\'яжемось перед виконанням. Акції мають обмежений термін.' },
    { t:'4. Доставка', p:'Терміни є орієнтовними. Ми не відповідаємо за затримки служб доставки або форс-мажор.' },
    { t:'5. Повернення та обмін', p:'Відповідно до ЗУ «Про захист прав споживачів». Деталі — на сторінці Повернення та обмін.' },
    { t:'6. Інтелектуальна власність', p:'Контент сайту є власністю Ausom Ukraine. Копіювання без дозволу заборонено.' },
    { t:'7. Обмеження відповідальності', p:'Ми не відповідаємо за шкоду від неправильної експлуатації, недотримання інструкцій або модифікації товарів.' },
    { t:'8. Зміни умов', p:'Ми можемо змінювати умови в будь-який час. Актуальна версія — на цій сторінці.' },
    { t:'9. Контакти', p:'support@ausom.ua • +38 (067) 000-00-00' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/><span style={{ color:'var(--text)', fontWeight:500 }}>Умови використання</span>
          </div>
        </div>
      </div>
      <div style={{ padding:'48px 0 72px' }}>
        <div className="w-container" style={{ maxWidth:800 }}>
          <h1 style={{ fontSize:'clamp(28px,3vw,40px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)', marginBottom:4 }}>Умови використання</h1>
          <p style={{ fontSize:13, color:'var(--text-4)', marginBottom:32 }}>Останнє оновлення: 1 січня 2026</p>
          <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'28px 32px', display:'flex', flexDirection:'column', gap:24 }}>
            {sections.map(s => (
              <div key={s.t}>
                <h2 style={{ fontSize:16, fontWeight:700, color:'var(--text)', marginBottom:8 }}>{s.t}</h2>
                <p style={{ fontSize:14, color:'var(--text-2)', lineHeight:1.7 }}>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
