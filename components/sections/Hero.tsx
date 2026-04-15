'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    eyebrow: 'Флагман 2026', title: 'Ausom', accent: 'DT2 Pro',
    desc: 'Подвійний мотор 2×800W, 70 км запас ходу, 65 км/год. Для міста та бездоріжжя.',
    price: 44250, oldPrice: 55300, href: '/product/dt2-pro',
    specs: [['52V','Напруга'],['70 км','Запас ходу'],['65 км/г','Швидкість']],
  },
  {
    eyebrow: 'Хіт продажів', title: 'L2 Max', accent: 'Dual Motor',
    desc: '85 км на одному заряді — найдальший у класі. Подвійний мотор для будь-яких доріг.',
    price: 40800, oldPrice: 51000, href: '/product/l2-max-dual',
    specs: [['48V','Напруга'],['85 км','Запас ходу'],['55 км/г','Швидкість']],
  },
  {
    eyebrow: 'Оптимальний вибір', title: 'Ausom', accent: 'L2 Dual',
    desc: 'Баланс потужності та автономності. Ідеальний для міста та приміських поїздок.',
    price: 32200, oldPrice: 40250, href: '/product/l2-dual',
    specs: [['48V','Напруга'],['70 км','Запас ходу'],['55 км/г','Швидкість']],
  },
]

export default function Hero() {
  const [cur,  setCur]  = useState(0)
  const [anim, setAnim] = useState(false)

  const go = useCallback((idx: number) => {
    if (anim) return
    setAnim(true)
    setTimeout(() => { setCur((idx + SLIDES.length) % SLIDES.length); setAnim(false) }, 220)
  }, [anim])

  useEffect(() => {
    const t = setInterval(() => go(cur + 1), 6000)
    return () => clearInterval(t)
  }, [cur, go])

  const s    = SLIDES[cur]
  const disc = Math.round((s.oldPrice - s.price) / s.oldPrice * 100)

  return (
    <section className="relative bg-[var(--bg)] overflow-hidden">

      {/* Subtle bg tint */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-[var(--brand)]/6 to-transparent pointer-events-none" />

      {/* Main grid — text left, image right */}
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[calc(100vh-104px)]">

          {/* LEFT: Text content */}
          <div className={`flex flex-col justify-center py-16 lg:py-20 transition-all duration-200 ${anim ? 'opacity-0 -translate-x-3' : 'opacity-100 translate-x-0'}`}>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[var(--brand)]/15 border border-[var(--brand)]/30 text-[var(--brand-dk)] text-[11px] font-bold tracking-[.1em] uppercase px-4 py-2 rounded-full mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
              {s.eyebrow}
            </div>

            {/* Title */}
            <h1 className="font-display leading-none tracking-wide mb-5" style={{ fontSize: 'clamp(60px,7vw,96px)' }}>
              <span className="block text-[var(--text)]">{s.title}</span>
              <span className="block text-[var(--brand-dk)]">{s.accent}</span>
            </h1>

            <p className="text-[var(--text-2)] text-[16px] leading-relaxed mb-8 max-w-md">{s.desc}</p>

            {/* Specs row */}
            <div className="flex items-center gap-6 mb-8 flex-wrap">
              {s.specs.map(([val, label], i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="font-display text-[24px] text-[var(--text)] leading-none">{val}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[.07em] text-[var(--text-3)]">{label}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-8 flex-wrap">
              <span className="bg-[var(--brand)] text-[#111] text-[11px] font-black px-2.5 py-1 rounded">−{disc}%</span>
              <span className="font-display text-[34px] text-[var(--text)] tracking-wide leading-none">
                ₴{s.price.toLocaleString('uk-UA')}
              </span>
              <span className="text-[16px] text-[var(--text-3)] line-through">
                ₴{s.oldPrice.toLocaleString('uk-UA')}
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Link href={s.href} className="btn-primary btn-lg">Купити зараз <ArrowRight size={16}/></Link>
              <Link href="/catalog" className="btn-outline btn-lg">Всі моделі</Link>
            </div>
          </div>

          {/* RIGHT: Scooter illustration */}
          <div className={`hidden lg:flex items-center justify-center py-16 relative transition-all duration-200 ${anim ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
            <div className="relative w-full max-w-[480px] aspect-square">
              {/* Decorative rings */}
              <div className="absolute inset-8 rounded-full border border-[var(--brand)]/12" />
              <div className="absolute inset-20 rounded-full border border-[var(--brand)]/7" />
              {/* SVG Scooter */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 340 300" fill="none" className="w-[80%] hover:scale-[1.02] transition-transform duration-700">
                  <circle cx="68"  cy="248" r="46" stroke="#F5C200" strokeWidth="8"/>
                  <circle cx="68"  cy="248" r="28" stroke="#F5C200" strokeWidth="2.5" strokeDasharray="4 6" opacity=".35"/>
                  <circle cx="272" cy="248" r="46" stroke="#F5C200" strokeWidth="8"/>
                  <circle cx="272" cy="248" r="28" stroke="#F5C200" strokeWidth="2.5" strokeDasharray="4 6" opacity=".35"/>
                  <path d="M68 248 L108 108 L216 88 L272 248" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text)]" style={{stroke:'var(--text)'}} opacity=".85"/>
                  <path d="M108 108 L148 40" stroke="#F5C200" strokeWidth="9" strokeLinecap="round"/>
                  <rect x="134" y="24" width="54" height="30" rx="8" fill="#F5C200"/>
                  <rect x="148" y="32" width="26" height="14" rx="3" fill="#111" opacity=".3"/>
                  <path d="M216 88 L268 132" stroke="var(--text-3)" strokeWidth="7" strokeLinecap="round"/>
                  <rect x="258" y="118" width="40" height="22" rx="6" fill="var(--bg-surface)" stroke="var(--border)" strokeWidth="2"/>
                </svg>
              </div>
              {/* Floating price card */}
              <div className="absolute bottom-[10%] left-[-8%] bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 shadow-lg" style={{ animation: 'floatBob 4s ease-in-out infinite' }}>
                <p className="text-[10px] font-bold uppercase tracking-[.07em] text-[var(--text-3)] mb-0.5">від</p>
                <p className="font-display text-[22px] text-[var(--brand-dk)] tracking-wide leading-none">₴{s.price.toLocaleString('uk-UA')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Slider controls */}
      <div className="relative z-10 flex items-center justify-center gap-4 pb-8">
        <button onClick={() => go(cur - 1)} className="w-9 h-9 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg text-[var(--text-3)] hover:text-[var(--text)] hover:border-[var(--border-md)] transition-all">
          <ChevronLeft size={16}/>
        </button>
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === cur ? 'w-7 bg-[var(--brand)]' : 'w-1.5 bg-[var(--border-md)] hover:bg-[var(--text-3)]'}`}
            />
          ))}
        </div>
        <button onClick={() => go(cur + 1)} className="w-9 h-9 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg text-[var(--text-3)] hover:text-[var(--text)] hover:border-[var(--border-md)] transition-all">
          <ChevronRight size={16}/>
        </button>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 border-t border-[var(--border)] bg-[var(--bg-mid)]">
        {[['50K+','Задоволених клієнтів'],['#1','Бренд для дорослих'],['2Y','Офіційна гарантія'],['4.9★','Середній рейтинг']].map(([val,label],i) => (
          <div key={i} className={`flex flex-col items-center gap-1 py-5 ${i < 3 ? 'border-r border-[var(--border)]' : ''}`}>
            <span className="font-display text-[26px] text-[var(--text)] tracking-wide leading-none">{val}</span>
            <span className="text-[11px] text-[var(--text-3)] text-center">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
