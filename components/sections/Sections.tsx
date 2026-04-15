'use client'

import { Shield, RotateCcw, Truck, MessageCircle } from 'lucide-react'

export function StatsBar() {
  // Stats are now embedded in Hero — this component is kept but renders nothing
  // (avoids duplicate stats below the hero)
  return null
}

export function Features() {
  const items = [
    { icon: Truck,         title: 'Безкоштовна доставка', desc: 'Доставляємо по всій Україні безкоштовно. Швидко та надійно.' },
    { icon: Shield,        title: 'Гарантія 2 роки',       desc: 'Офіційна гарантія на всі моделі. Безкоштовний ремонт та заміна.' },
    { icon: RotateCcw,     title: '14 днів повернення',    desc: 'Не підійшов — повертай без питань. Повне відшкодування.' },
    { icon: MessageCircle, title: 'Підтримка 24/7',         desc: 'Завжди на зв\'язку — чат, email або телефон.' },
  ]
  return (
    <section className="py-20 bg-[var(--mid)] border-y border-[var(--border)]">
      <div className="container-wide">
        <div className="mb-12">
          <span className="section-label">Чому Ausom Ukraine</span>
          <h2 className="section-heading text-white">Ми <span className="text-[var(--brand)]">Піклуємось</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-4 hover:border-[var(--brand)]/20 hover:-translate-y-0.5 transition-all">
              <div className="w-11 h-11 bg-[var(--brand)]/10 border border-[var(--brand)]/20 rounded-lg flex items-center justify-center text-[var(--brand)]">
                <Icon size={18} strokeWidth={1.8}/>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white mb-1.5">{title}</h3>
                <p className="text-[13px] text-[var(--muted)] leading-relaxed">{desc}</p>
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
    { pub:'Forbes',       quote:'«Ausom поєднує інженерну якість з вражаючою продуктивністю. Серйозна заявка на ринку.»' },
    { pub:'USA Today',    quote:'«Розроблені для реальних сценаріїв — від щоденних поїздок до позашляхових пригод.»' },
    { pub:"Tom's Guide",  quote:'«Власна архітектура підвіски, що адаптується до потреб різних райдерів — вражає.»' },
    { pub:'Electrek',     quote:'«Ausom зібрав лояльну спільноту за надзвичайно короткий час після виходу на ринок.»' },
    { pub:'Gadgeteer',    quote:'«DT2 Pro — одна з найкращих пропозицій за ціною та характеристиками на ринку.»' },
    { pub:'AutoEvolution',quote:'«Самокати Ausom готові надати райдерам доступ до вражаючих можливостей.»' },
  ]
  return (
    <section className="py-20 overflow-hidden">
      <div className="container-wide mb-12">
        <span className="section-label">Про нас пишуть</span>
        <h2 className="section-heading text-white">Думка <span className="text-[var(--brand)]">Експертів</span></h2>
      </div>
      <div className="overflow-hidden border-y border-[var(--border)]">
        <div className="flex animate-press">
          {[...items,...items].map((item,i) => (
            <div key={i} className="shrink-0 w-72 border-r border-[var(--border)] p-8">
              <div className="font-display text-[20px] tracking-widest text-white mb-2">{item.pub}</div>
              <div className="text-[var(--brand)] text-[11px] tracking-widest mb-3">★★★★★</div>
              <p className="text-[var(--muted)] text-[13px] leading-relaxed italic">{item.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Newsletter() {
  return (
    <section className="bg-[var(--mid)] border-t border-[var(--border)] py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(245,194,0,.05),transparent_70%)] pointer-events-none" />
      <div className="container-wide relative z-10 text-center max-w-xl mx-auto">
        <h2 className="font-display text-[clamp(40px,6vw,68px)] leading-none text-white tracking-wide mb-4">
          Будь у <span className="text-[var(--brand)]">Курсі</span>
        </h2>
        <p className="text-[var(--muted)] text-[14px] leading-relaxed mb-10">
          Підпишись та отримуй ексклюзивні знижки, огляди нових моделей та поради першим.
        </p>
        <form className="flex gap-3 flex-col sm:flex-row justify-center" onSubmit={e=>e.preventDefault()}>
          <input type="email" placeholder="твій@email.com" required
            className="flex-1 sm:max-w-xs bg-[var(--surface)] border border-[var(--border)] text-white placeholder:text-[var(--muted)] px-5 py-3.5 rounded-lg text-[14px] outline-none focus:border-[var(--brand)] transition-colors"/>
          <button type="submit" className="btn-primary shrink-0">Підписатися</button>
        </form>
      </div>
    </section>
  )
}
