'use client'

import Link from 'next/link'
import { Zap } from 'lucide-react'

const COLS = {
  'Самокати': [
    { href:'/product/l1',          label:'Ausom L1' },
    { href:'/product/l2-dual',     label:'Ausom L2 Dual' },
    { href:'/product/l2-max-dual', label:'L2 Max Dual' },
    { href:'/product/dt2-pro',     label:'DT2 Pro' },
    { href:'/compare',             label:'Порівняти моделі' },
    { href:'/sale',                label:'🔥 Розпродаж' },
  ],
  'Компанія': [
    { href:'/about',     label:'Про нас' },
    { href:'/blog',      label:'Блог' },
    { href:'/affiliate', label:'Партнерство' },
    { href:'/loyalty',   label:'Програма лояльності' },
    { href:'/contact',   label:'Контакти' },
  ],
  'Підтримка': [
    { href:'/track',    label:'Відстежити замовлення' },
    { href:'/shipping', label:'Доставка та оплата' },
    { href:'/returns',  label:'Повернення та обмін' },
    { href:'/warranty', label:'Гарантія' },
    { href:'/faq',      label:'FAQ' },
    { href:'/privacy',  label:'Конфіденційність' },
  ],
}

const SOCIALS = ['X','FB','IG','TK','YT']

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-mid)] border-t border-[var(--border)] mt-0">
      <div className="container-wide pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[var(--border)]">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 font-display text-[22px] tracking-[.08em] text-[var(--text)] hover:text-[var(--brand-dk)] transition-colors mb-4">
              <Zap size={16} strokeWidth={2.5} className="text-[var(--brand)]"/>
              AUSOM<sup className="font-sans text-[10px] font-bold text-[var(--brand-dk)] tracking-normal -mt-2">UA</sup>
            </Link>
            <p className="text-[13px] text-[var(--text-3)] leading-relaxed mb-6 max-w-[260px]">
              Офіційний дистриб'ютор Ausom в Україні. Найкращі електросамокати для міста та бездоріжжя.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map(s => (
                <a key={s} href="#" className="w-9 h-9 flex items-center justify-center text-[11px] font-bold text-[var(--text-3)] bg-[var(--bg)] border border-[var(--border)] rounded-md hover:text-[var(--brand-dk)] hover:border-[var(--brand)]/40 transition-all">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {Object.entries(COLS).map(([title, links]) => (
            <div key={title}>
              <p className="text-[11px] font-bold tracking-[.1em] uppercase text-[var(--text)] mb-5">{title}</p>
              <ul className="space-y-3">
                {links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[13px] text-[var(--text-3)] hover:text-[var(--text)] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-8 border-b border-[var(--border)]">
          <div>
            <p className="font-display text-[28px] tracking-wide text-[var(--text)] mb-1">Будь у курсі</p>
            <p className="text-[13px] text-[var(--text-3)]">Ексклюзивні знижки та огляди нових моделей — першим.</p>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="твій@email.com" required
              className="flex-1 md:w-64 bg-[var(--bg)] border border-[var(--border)] rounded-md px-4 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-3)] outline-none focus:border-[var(--brand)] transition-colors"/>
            <button type="submit" className="btn-primary shrink-0">Підписатися</button>
          </form>
        </div>

        {/* Bottom */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="text-[12px] text-[var(--text-3)]">© 2026 Ausom Ukraine. Всі права захищені.</p>
          <div className="flex gap-2 flex-wrap">
            {['VISA','Mastercard','Privat24','Monobank','PayPal'].map(p => (
              <span key={p} className="text-[10px] font-bold text-[var(--text-3)] bg-[var(--bg)] border border-[var(--border)] px-2.5 py-1 rounded">{p}</span>
            ))}
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-[12px] text-[var(--text-3)] hover:text-[var(--text)] transition-colors">Конфіденційність</Link>
            <Link href="/terms"   className="text-[12px] text-[var(--text-3)] hover:text-[var(--text)] transition-colors">Умови</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
