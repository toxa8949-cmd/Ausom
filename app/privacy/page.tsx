import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    { t:'1. Загальні положення', p:'Ausom Ukraine поважає вашу конфіденційність і зобов\'язується захищати ваші персональні дані. Ця політика пояснює, які дані ми збираємо, як їх використовуємо та захищаємо.' },
    { t:'2. Які дані ми збираємо', p:'Контактні дані (ім\'я, email, телефон), дані доставки (місто, адреса), дані замовлень (історія покупок), технічні дані (IP-адреса, тип браузера, cookies).' },
    { t:'3. Як ми використовуємо дані', p:'Обробка замовлень, зв\'язок з клієнтами, надсилання акцій (за згодою), покращення сервісу, виконання юридичних зобов\'язань.' },
    { t:'4. Захист даних', p:'SSL-шифрування, безпечне зберігання, обмежений доступ. Ми не передаємо дані третім особам, окрім служб доставки та відповідно до законодавства.' },
    { t:'5. Cookies', p:'Сайт використовує cookies для коректної роботи та аналітики. Ви можете налаштувати cookies у браузері.' },
    { t:'6. Ваші права', p:'Доступ до даних, виправлення, видалення, відкликання згоди, подача скарги до Уповноваженого ВР з прав людини.' },
    { t:'7. Контакти', p:'support@ausom.ua • +38 (067) 000-00-00' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/><span style={{ color:'var(--text)', fontWeight:500 }}>Конфіденційність</span>
          </div>
        </div>
      </div>
      <div style={{ padding:'48px 0 72px' }}>
        <div className="w-container" style={{ maxWidth:800 }}>
          <h1 style={{ fontSize:'clamp(28px,3vw,40px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)', marginBottom:4 }}>Політика конфіденційності</h1>
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
