'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    eyebrow: 'Флагман 2026',
    title: 'Ausom', accent: 'DT2 Pro',
    desc: 'Подвійний мотор 2×800W, 70 км запас ходу, 65 км/год. Для міста та бездоріжжя.',
    price: 44250, oldPrice: 55300,
    href: '/product/dt2-pro',
    spec1: '52V', spec2: '70 км', spec3: '65 км/г',
  },
  {
    eyebrow: 'Хіт продажів',
    title: 'L2 Max', accent: 'Dual Motor',
    desc: '85 км на одному заряді — найдальший у класі. Подвійний мотор для будь-яких доріг.',
    price: 40800, oldPrice: 51000,
    href: '/product/l2-max-dual',
    spec1: '48V', spec2: '85 км', spec3: '55 км/г',
  },
  {
    eyebrow: 'Оптимальний вибір',
    title: 'Ausom', accent: 'L2 Dual',
    desc: 'Баланс потужності та автономності. Ідеальний для міста та приміських поїздок.',
    price: 32200, oldPrice: 40250,
    href: '/product/l2-dual',
    spec1: '48V', spec2: '70 км', spec3: '55 км/г',
  },
]

export default function Hero() {
  const [cur, setCur]       = useState(0)
  const [anim, setAnim]     = useState(false)

  const go = useCallback((idx: number) => {
    if (anim) return
    setAnim(true)
    setTimeout(() => { setCur((idx + SLIDES.length) % SLIDES.length); setAnim(false) }, 220)
  }, [anim])

  useEffect(() => {
    const t = setInterval(() => go(cur + 1), 6000)
    return () => clearInterval(t)
  }, [cur, go])

  const s = SLIDES[cur]
  const disc = Math.round((s.oldPrice - s.price) / s.oldPrice * 100)

  return (
    <section className="relative min-h-[calc(100vh-104px)] bg-[var(--black)] overflow-hidden flex flex-col">

      {/* Glow */}
      <div className="absolute top-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(232,255,0,.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--black)] to-transparent pointer-events-none z-10" />

      {/* Content */}
      <div className="container-wide flex-1 flex items-center py-20 relative z-10">
        <div className={`max-w-xl transition-all duration-200 ${anim ? 'opacity-0 translate-x-[-12px]' : 'opacity-100 translate-x-0'}`}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[var(--brand)]/10 border border-[var(--brand)]/25 text-[var(--brand)] text-[11px] font-bold tracking-[.1em] uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
            {s.eyebrow}
          </div>

          {/* Title */}
          <h1 className="font-display leading-none tracking-wide mb-6" style={{ fontSize: 'clamp(64px,9vw,104px)' }}>
            <span className="block text-white">{s.title}</span>
            <span className="block text-[var(--brand)]">{s.accent}</span>
          </h1>

          <p className="text-[var(--light)] text-[17px] leading-relaxed mb-8 max-w-md">{s.desc}</p>

          {/* Specs */}
          <div className="flex items-center gap-6 mb-8">
            {[['Напруга', s.spec1], ['Запас ходу', s.spec2], ['Швидкість', s.spec3]].map(([label, val], i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="font-display text-[28px] text-white leading-none">{val}</span>
                <span className="text-[10px] font-bold uppercase tracking-[.07em] text-[var(--muted)]">{label}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="bg-[var(--brand)] text-[var(--black)] text-[11px] font-black px-2.5 py-1 rounded">−{disc}%</span>
            <span className="font-display text-[38px] text-white tracking-wide leading-none">₴{s.price.toLocaleString('uk-UA')}</span>
            <span className="text-[18px] text-[var(--muted)] line-through">₴{s.oldPrice.toLocaleString('uk-UA')}</span>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link href={s.href} className="btn-primary btn-lg">
              Купити зараз <ArrowRight size={16} />
            </Link>
            <Link href="/catalog" className="btn-outline btn-lg">Всі моделі</Link>
          </div>
        </div>

        {/* Hero graphic — right side */}
        <div className={`hidden lg:flex absolute right-0 top-0 bottom-0 w-[45%] items-center justify-center transition-all duration-200 ${anim ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
          <div className="relative w-full max-w-[520px] aspect-square">
            {/* Glow ring */}
            <div className="absolute inset-8 rounded-full border border-[var(--brand)]/8" />
            <div className="absolute inset-16 rounded-full border border-[var(--brand)]/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 340 300" fill="none" className="w-[80%] drop-shadow-[0_24px_48px_rgba(0,0,0,.8)] hover:scale-[1.02] transition-transform duration-700">
                <circle cx="68" cy="248" r="46" stroke="#E8FF00" strokeWidth="8" />
                <circle cx="68" cy="248" r="28" stroke="#E8FF00" strokeWidth="3" strokeDasharray="4 6" opacity=".4" />
                <circle cx="272" cy="248" r="46" stroke="#E8FF00" strokeWidth="8" />
                <circle cx="272" cy="248" r="28" stroke="#E8FF00" strokeWidth="3" strokeDasharray="4 6" opacity=".4" />
                <path d="M68 248 L108 108 L216 88 L272 248" stroke="#F5F5F0" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M108 108 L148 40" stroke="#E8FF00" strokeWidth="9" strokeLinecap="round" />
                <rect x="134" y="24" width="54" height="30" rx="8" fill="#E8FF00" />
                <path d="M216 88 L268 132" stroke="#666" strokeWidth="7" strokeLinecap="round" />
                <rect x="258" y="118" width="40" height="22" rx="6" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="2" />
                <circle cx="170" cy="165" r="16" fill="#E8FF00" opacity=".12" />
                <circle cx="170" cy="165" r="8" fill="#E8FF00" opacity=".2" />
              </svg>
            </div>
            {/* Floating price tag */}
            <div className="absolute bottom-[12%] left-[-5%] bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 shadow-xl animate-[floatBob_4s_ease-in-out_infinite]">
              <p className="text-[10px] font-bold uppercase tracking-[.07em] text-[var(--muted)] mb-0.5">від</p>
              <p className="font-display text-[22px] text-[var(--brand)] tracking-wide leading-none">₴{s.price.toLocaleString('uk-UA')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="relative z-10 flex items-center justify-center gap-4 pb-8">
        <button onClick={() => go(cur - 1)} className="w-9 h-9 flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--light)] hover:text-white hover:border-white/30 transition-all">
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === cur ? 'w-7 bg-[var(--brand)]' : 'w-1.5 bg-[var(--border)] hover:bg-[var(--muted)]'}`}
            />
          ))}
        </div>
        <button onClick={() => go(cur + 1)} className="w-9 h-9 flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--light)] hover:text-white hover:border-white/30 transition-all">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 border-t border-[var(--border)]">
        {[['50K+','Задоволених клієнтів'],['#1','Бренд для дорослих'],['2Y','Офіційна гарантія'],['4.9★','Середній рейтинг']].map(([val, label], i) => (
          <div key={i} className={`flex flex-col items-center gap-1 py-5 ${i < 3 ? 'border-r border-[var(--border)]' : ''} ${i === 1 ? 'border-r border-[var(--border)] lg:border-r' : ''}`}>
            <span className="font-display text-[26px] text-white tracking-wide leading-none">{val}</span>
            <span className="text-[11px] text-[var(--muted)] text-center">{label}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes floatBob {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  )
}
