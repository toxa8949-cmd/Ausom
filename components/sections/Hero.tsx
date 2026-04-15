'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    eyebrow: 'Новинка 2026',
    title: 'Ausom L1',
    subtitle: 'Міський самокат',
    desc: 'Мотор 500W, запас ходу 50 км, вага лише 20 кг. Ідеальний для міських поїздок.',
    price: 27050,
    oldPrice: 33800,
    href: '/product/l1',
    bg: 'from-[#1a0500] via-[#3d1000] to-[#7a2500]',
  },
  {
    eyebrow: 'Флагман лінійки',
    title: 'DT2 Pro',
    subtitle: 'Позашляховий',
    desc: 'Подвійний мотор 2×1000W, 70 км запас ходу, 65 км/год. Для бездоріжжя та міста.',
    price: 44250,
    oldPrice: 55300,
    href: '/product/dt2-pro',
    bg: 'from-[#070d14] via-[#0d1e2e] to-[#1a3048]',
  },
  {
    eyebrow: 'Весняний розпродаж',
    title: 'Знижки',
    subtitle: 'До −€400',
    desc: 'Найкращі ціни сезону на всю лінійку Ausom. Тільки до кінця квітня.',
    price: null,
    oldPrice: null,
    href: '/catalog',
    bg: 'from-[#0b0b0b] via-[#111] to-[#1a1a1a]',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const go = useCallback((idx: number) => {
    if (animating) return
    setAnimating(true)
    setCurrent((idx + SLIDES.length) % SLIDES.length)
    setTimeout(() => setAnimating(false), 700)
  }, [animating])

  useEffect(() => {
    const t = setInterval(() => go(current + 1), 5000)
    return () => clearInterval(t)
  }, [current, go])

  const slide = SLIDES[current]

  return (
    <section className={`relative min-h-[calc(100vh-93px)] min-h-[560px] max-h-[800px] bg-gradient-to-br ${slide.bg} transition-all duration-700 overflow-hidden flex items-center`}>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(255,92,0,.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="container-wide relative z-10 py-20">
        <div className="max-w-xl">
          <div
            key={`eyebrow-${current}`}
            className="section-label animate-[fadeInUp_.6s_.1s_both]"
            style={{ animation: 'fadeInUp .6s .1s both' }}
          >
            {slide.eyebrow}
          </div>

          <h1
            key={`title-${current}`}
            className="font-display text-[clamp(64px,9vw,120px)] leading-none text-white uppercase tracking-wide mb-4"
            style={{ animation: 'fadeInUp .65s .25s both' }}
          >
            {slide.title}
            <span className="block text-[#ff5c00]">{slide.subtitle}</span>
          </h1>

          <p
            key={`desc-${current}`}
            className="text-white/65 text-base leading-relaxed mb-8 max-w-md"
            style={{ animation: 'fadeInUp .6s .4s both' }}
          >
            {slide.desc}
          </p>

          <div style={{ animation: 'fadeInUp .6s .5s both' }} className="flex items-center gap-4 flex-wrap">
            <Link href={slide.href} className="btn-primary">
              {slide.price ? `Купити за €${slide.price}` : 'Дивитись акції'}
              <ArrowRight size={15} />
            </Link>
            <Link href="/catalog" className="btn-ghost">
              Всі моделі
            </Link>
          </div>

          {/* Price badge */}
          {slide.price && (
            <div
              style={{ animation: 'fadeInUp .6s .65s both' }}
              className="inline-flex items-baseline gap-3 mt-10 bg-white/8 backdrop-blur-sm border border-white/12 rounded-xl px-5 py-4"
            >
              <span className="text-white/50 text-xs font-medium uppercase tracking-wider">від</span>
              <span className="font-display text-4xl text-white tracking-wide">₴{slide.price.toLocaleString('uk-UA')}</span>
              {slide.oldPrice && (
                <span className="text-[#ff5c00] text-xs font-bold bg-[#ff5c00]/15 px-2.5 py-1 rounded-full">
                  −₴{(slide.oldPrice - slide.price).toLocaleString('uk-UA')}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0 container-wide flex items-center justify-between z-20">
        <span className="text-white/35 text-xs font-medium tracking-widest">
          <span className="text-white/70">{String(current + 1).padStart(2, '0')}</span> / {String(SLIDES.length).padStart(2, '0')}
        </span>

        <div className="flex items-center gap-3">
          <button onClick={() => go(current - 1)} className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white/70 hover:bg-white/15 hover:border-white/50 transition-all flex items-center justify-center">
            <ChevronLeft size={16} />
          </button>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[#ff5c00]' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
            />
          ))}
          <button onClick={() => go(current + 1)} className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white/70 hover:bg-white/15 hover:border-white/50 transition-all flex items-center justify-center">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
