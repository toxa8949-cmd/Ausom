'use client'

import { Shield, RotateCcw, Truck, MessageCircle } from 'lucide-react'
import NewsletterForm from '@/components/sections/NewsletterForm'

export function StatsBar() {
  return (
    <div className="bg-[#0b0b0b]">
      <div className="container-wide grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5 border-x border-white/5">
        {[
          { num: '50K+', label: 'Задоволених райдерів' },
          { num: '#1', label: 'Бренд для дорослих' },
          { num: '2Y', label: 'Офіційна гарантія' },
          { num: '4.9★', label: 'Середній рейтинг' },
        ].map(s => (
          <div key={s.label} className="px-8 py-10 border-b border-white/5">
            <div className="font-display text-5xl text-white tracking-wide mb-1.5">
              {s.num.includes('#') || s.num.includes('★') || s.num.includes('+') || s.num.includes('Y') ? (
                <>
                  {s.num.replace(/[#★+Y]/g, '')}
                  <span className="text-[#ff5c00]">{s.num.match(/[#★+Y]/)?.[0]}</span>
                </>
              ) : s.num}
            </div>
            <div className="text-[#888884] text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Features() {
  const items = [
    {
      icon: Truck,
      title: 'Безкоштовна доставка',
      desc: 'Доставляємо по всій Україні безкоштовно при замовленні від €39.99. Швидко та надійно.',
    },
    {
      icon: Shield,
      title: 'Гарантія 2 роки',
      desc: 'Офіційна гарантія на всі моделі. Безкоштовний ремонт та заміна деталей протягом 2 років.',
    },
    {
      icon: RotateCcw,
      title: '14 днів повернення',
      desc: 'Не підійшов — повертай без питань. Повне відшкодування вартості протягом 14 днів.',
    },
    {
      icon: MessageCircle,
      title: 'Підтримка 24/7',
      desc: 'Команда підтримки завжди готова допомогти — чат, email або телефон. Відповідаємо швидко.',
    },
  ]

  return (
    <section className="bg-[#f4f4f2] py-20">
      <div className="container-wide">
        <div className="mb-12">
          <span className="section-label">Чому Ausom Ukraine</span>
          <h2 className="section-heading">Ми <span className="text-[#ff5c00]">Піклуємось</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
          {items.map(item => {
            const Icon = item.icon
            return (
              <div key={item.title} className="bg-white p-10 flex gap-6 items-start hover:bg-[#fafaf8] transition-colors">
                <div className="w-12 h-12 bg-[#0b0b0b] rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={22} color="white" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-[#888884] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Press() {
  const items = [
    { pub: 'Forbes', quote: '«Ausom поєднує інженерну якість з вражаючою продуктивністю. Серйозна заявка на ринку.»' },
    { pub: 'USA Today', quote: '«Розроблені для реальних сценаріїв — від щоденних поїздок до позашляхових пригод.»' },
    { pub: "Tom's Guide", quote: '«Власна архітектура підвіски, що адаптується до потреб різних райдерів — вражає.»' },
    { pub: 'Electrek', quote: '«Ausom зібрав лояльну спільноту за надзвичайно короткий час після виходу на ринок.»' },
    { pub: 'Gadgeteer', quote: '«DT2 Pro — одна з найкращих пропозицій за ціною та характеристиками на ринку.»' },
    { pub: 'AutoEvolution', quote: '«Самокати Ausom готові надати райдерам доступ до вражаючих можливостей.»' },
  ]

  return (
    <section className="py-20 overflow-hidden">
      <div className="container-wide mb-12">
        <span className="section-label block">Про нас пишуть</span>
        <h2 className="section-heading">Думка <span className="text-[#ff5c00]">Експертів</span></h2>
      </div>
      <div className="overflow-hidden border-y border-[#e8e8e5]">
        <div className="flex animate-press">
          {[...items, ...items].map((item, i) => (
            <div key={i} className="shrink-0 w-72 border-r border-[#e8e8e5] p-8">
              <div className="font-display text-xl tracking-widest text-[#0b0b0b] mb-2">{item.pub}</div>
              <div className="text-[#ff5c00] text-xs tracking-widest mb-3">★★★★★</div>
              <p className="text-[#888884] text-sm leading-relaxed italic">{item.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Newsletter() {
  return (
    <section className="bg-[#0b0b0b] py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,92,0,.08),transparent_70%)] pointer-events-none" />
      <div className="container-wide relative z-10 text-center max-w-xl mx-auto">
        <h2 className="font-display text-[clamp(40px,6vw,72px)] leading-none text-white uppercase tracking-wide mb-4">
          Будь у <span className="text-[#ff5c00]">Курсі</span>
        </h2>
        <p className="text-white/50 text-sm leading-relaxed mb-10">
          Підпишись та отримуй ексклюзивні знижки, огляди нових моделей та поради першим.
        </p>
        <form className="flex gap-2 flex-col sm:flex-row" onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="твій@email.com"
            className="flex-1 bg-white/8 border border-white/12 text-white placeholder-white/30 px-5 py-3.5 rounded-lg text-sm focus:outline-none focus:border-[#ff5c00] transition-colors"
          />
          <button type="submit" className="btn-primary shrink-0">
            Підписатися
          </button>
        </form>
      </div>
    </section>
  )
}
