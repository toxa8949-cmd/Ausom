'use client'

import { Shield, RotateCcw, Truck, MessageCircle } from 'lucide-react'

export function StatsBar() { return null }

export function Features() {
  const items = [
    { icon: Truck,         title: 'Безкоштовна доставка', desc: 'Доставляємо по всій Україні безкоштовно. Швидко та надійно.' },
    { icon: Shield,        title: 'Гарантія 2 роки',       desc: 'Офіційна гарантія. Безкоштовний ремонт та заміна деталей.' },
    { icon: RotateCcw,     title: '14 днів повернення',    desc: 'Не підійшов — повертай без питань. Повне відшкодування.' },
    { icon: MessageCircle, title: 'Підтримка 24/7',         desc: 'Завжди на зв\'язку — чат, email або телефон.' },
  ]
  return (
    <section className="py-20 bg-[var(--bg-mid)] border-y border-[var(--border)]">
      <div className="container-wide">
        <div className="mb-12">
          <span className="section-label">Чому Ausom Ukraine</span>
          <h2 className="section-heading">Ми <span className="text-[var(--brand-dk)]">Піклуємось</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-4 hover:border-[var(--brand)] hover:-translate-y-0.5 transition-all">
              <div className="w-11 h-11 bg-[var(--brand)]/12 border border-[var(--brand)]/25 rounded-lg flex items-center justify-center text-[var(--brand-dk)]">
                <Icon size={18} strokeWidth={1.8}/>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-[var(--text)] mb-1.5">{title}</h3>
                <p className="text-[13px] text-[var(--text-3)] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Press() {
  const items = [
    { pub:'Forbes',        quote:'«Ausom поєднує інженерну якість з вражаючою продуктивністю. Серйозна заявка на ринку.»' },
    { pub:'USA Today',     quote:'«Розроблені для реальних сценаріїв — від щоденних поїздок до позашляхових пригод.»' },
    { pub:"Tom's Guide",   quote:'«Власна архітектура підвіски, що адаптується до потреб різних райдерів — вражає.»' },
    { pub:'Electrek',      quote:'«Ausom зібрав лояльну спільноту за надзвичайно короткий час після виходу на ринок.»' },
    { pub:'Gadgeteer',     quote:'«DT2 Pro — одна з найкращих пропозицій за ціною та характеристиками на ринку.»' },
    { pub:'AutoEvolution', quote:'«Самокати Ausom готові надати райдерам доступ до вражаючих можливостей.»' },
  ]
  return (
    <section className="py-20 overflow-hidden">
      <div className="container-wide mb-12">
        <span className="section-label">Про нас пишуть</span>
        <h2 className="section-heading">Думка <span className="text-[var(--brand-dk)]">Експертів</span></h2>
      </div>
      <div className="overflow-hidden border-y border-[var(--border)]">
        <div className="flex animate-press">
          {[...items, ...items].map((item, i) => (
            <div key={i} className="shrink-0 w-72 border-r border-[var(--border)] p-8 bg-[var(--bg)]">
              <div className="font-display text-[20px] tracking-widest text-[var(--text)] mb-2">{item.pub}</div>
              <div className="text-[var(--brand-dk)] text-[11px] tracking-widest mb-3">★★★★★</div>
              <p className="text-[var(--text-3)] text-[13px] leading-relaxed italic">{item.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Newsletter() {
  return (
    <section className="bg-[var(--bg-invert)] py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(245,194,0,.08),transparent_70%)] pointer-events-none" />
      <div className="container-wide relative z-10 text-center max-w-xl mx-auto">
        <h2 className="font-display text-[clamp(40px,6vw,68px)] leading-none text-[var(--text-inv)] tracking-wide mb-4">
          Будь у <span className="text-[var(--brand)]">Курсі</span>
        </h2>
        <p className="text-[var(--text-inv)]/60 text-[14px] leading-relaxed mb-10">
          Підпишись та отримуй ексклюзивні знижки, огляди нових моделей та поради першим.
        </p>
        <form className="flex gap-3 flex-col sm:flex-row justify-center" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="твій@email.com" required
            className="flex-1 sm:max-w-xs bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-5 py-3.5 rounded-lg text-[14px] outline-none focus:border-[var(--brand)] transition-colors"/>
          <button type="submit" className="btn-primary shrink-0">Підписатися</button>
        </form>
      </div>
    </section>
  )
}
