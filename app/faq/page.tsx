'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const faqData = [
  { title:'Замовлення та доставка', questions:[
    { q:'Як швидко доставляють замовлення?', a:'Нова Пошта — 1-3 робочих дні, Укрпошта — 3-7 днів, кур\'єр по Києву — 1 день. Замовлення обробляються протягом 1 робочого дня.' },
    { q:'Доставка безкоштовна?', a:'Так, доставка безкоштовна по всій Україні на всі моделі електросамокатів.' },
    { q:'Чи можу я отримати самокат сьогодні?', a:'Якщо ви в Києві — так! Оберіть кур\'єрську доставку при замовленні до 14:00.' },
    { q:'Які способи оплати доступні?', a:'Visa/Mastercard, Приват24, Monobank, накладений платіж. Для юридичних осіб — безготівковий розрахунок з ПДВ.' },
  ]},
  { title:'Повернення та гарантія', questions:[
    { q:'Яка гарантія на самокати?', a:'Офіційна гарантія 2 роки на всі моделі. Покриває заводські дефекти мотора, батареї, електроніки та рами.' },
    { q:'Чи можу я повернути самокат?', a:'Так, протягом 14 днів. Товар має бути в оригінальній упаковці, без слідів використання. Повернення безкоштовне.' },
    { q:'Що робити, якщо самокат зламався?', a:'Зв\'яжіться з підтримкою: support@ausom.ua або +38 067 000-00-00. Діагностика та ремонт по гарантії безкоштовні.' },
  ]},
  { title:'Про самокати', questions:[
    { q:'Який самокат обрати для міста?', a:'Для міста — L1 (легкий, 50 км) або L2 Dual (потужний, 70 км). Для бездоріжжя — DT2 Pro.' },
    { q:'Яка максимальна швидкість?', a:'L1 — 45 км/год, L2 Dual — 55, L2 Max — 55, DT2 Pro — 65 км/год. Швидкість регулюється.' },
    { q:'Скільки заряджається акумулятор?', a:'Від 6 до 10 годин. L1 — 6-7 год, L2 — 7-8, L2 Max — 8-9, DT2 Pro — 9-10 год.' },
    { q:'Чи можна їздити в дощ?', a:'Так, захист IP54-IP55. Не рекомендуємо глибокі калюжі.' },
    { q:'Яка максимальна вага водія?', a:'L1 — 100 кг, L2 серія — 120 кг, DT2 Pro — 150 кг.' },
  ]},
]

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border:'1.5px solid var(--border)', borderRadius:10, overflow:'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', background:'transparent', border:'none', cursor:'pointer', textAlign:'left' }}>
        <span style={{ fontSize:14, fontWeight:600, color:'var(--text)', paddingRight:16 }}>{q}</span>
        <span style={{ fontSize:18, color:'var(--yellow-dark)', flexShrink:0, transition:'transform .2s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {open && <div style={{ padding:'0 20px 16px' }}><p style={{ fontSize:14, color:'var(--text-2)', lineHeight:1.7 }}>{a}</p></div>}
    </div>
  )
}

export default function FAQPage() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/><span style={{ color:'var(--text)', fontWeight:500 }}>FAQ</span>
          </div>
        </div>
      </div>
      <div style={{ padding:'48px 0 72px' }}>
        <div className="w-container" style={{ maxWidth:800 }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div className="s-label" style={{ justifyContent:'center' }}>FAQ</div>
            <h1 style={{ fontSize:'clamp(32px,4vw,48px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', marginBottom:12 }}>
              Часті <span style={{ color:'var(--yellow-dark)' }}>питання</span>
            </h1>
            <p style={{ fontSize:15, color:'var(--text-2)' }}>Відповіді на найпопулярніші запитання наших клієнтів</p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:32 }}>
            {faqData.map(cat => (
              <div key={cat.title}>
                <h2 style={{ fontSize:18, fontWeight:700, color:'var(--text)', marginBottom:12 }}>{cat.title}</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {cat.questions.map(faq => <Accordion key={faq.q} q={faq.q} a={faq.a} />)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'32px', textAlign:'center', marginTop:36 }}>
            <h3 style={{ fontSize:18, fontWeight:700, color:'var(--text)', marginBottom:8 }}>Не знайшли відповідь?</h3>
            <p style={{ fontSize:14, color:'var(--text-2)', marginBottom:20 }}>Напишіть нам — ми відповімо якнайшвидше.</p>
            <Link href="/contact" className="btn btn-yellow">Зв&apos;язатися з нами</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
