import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[var(--bg-invert)] py-20">
        <div className="container-wide">
          <span className="section-label">Про компанію</span>
          <h1 className="section-heading text-white max-w-2xl">
            Ми веземо <span className="text-[var(--brand-dk)]">Майбутнє</span> до тебе
          </h1>
          <p className="text-white/50 text-sm mt-4 max-w-lg leading-relaxed">
            Ausom Ukraine — офіційний дистриб'ютор бренду Ausom в Україні. Ми віримо, що електромобільність — це не майбутнє, це вже сьогодення.
          </p>
        </div>
      </div>

      <div className="container-wide py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <span className="section-label">Наша місія</span>
            <h2 className="section-heading mb-6">Чому ми <span className="text-[var(--brand-dk)]">Тут</span></h2>
            <p className="text-[var(--text-3)] leading-relaxed mb-6">
              Ausom Ukraine з'явився, тому що ми самі були незадоволені тим, що є на ринку. Занадто дорого, занадто слабко, занадто ненадійно. Ми знайшли Ausom — і зрозуміли: ось воно.
            </p>
            <p className="text-[var(--text-3)] leading-relaxed mb-8">
              Тепер ми приносимо ці самокати прямо в Україну з офіційною гарантією, сервісом та командою, яка сама їздить на цих самокатах щодня.
            </p>
            <Link href="/catalog" className="btn-primary">Дивитись самокати →</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '50K+', label: 'Клієнтів по світу' },
              { num: '2026', label: 'Рік заснування UA' },
              { num: '13', label: 'Моделей в каталозі' },
              { num: '4.9★', label: 'Рейтинг клієнтів' },
            ].map(s => (
              <div key={s.label} className="bg-[var(--bg-surface)] rounded-2xl p-8 text-center">
                <div className="font-display text-5xl text-[var(--brand-dk)] mb-2">{s.num}</div>
                <div className="text-sm text-[var(--text-3)] font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="border-t border-[var(--border)] pt-20">
          <div className="text-center mb-14">
            <span className="section-label justify-center">Наші цінності</span>
            <h2 className="section-heading">Що нас <span className="text-[var(--brand-dk)]">Відрізняє</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Якість без компромісів', desc: 'Кожна модель Ausom — результат сотень годин інженерної роботи та тестувань у реальних умовах.' },
              { icon: '🛡', title: 'Повна підтримка', desc: 'Офіційна гарантія 2 роки, сервісний центр в Україні та команда підтримки, яка відповідає швидко.' },
              { icon: '🤝', title: 'Чесно і прозоро', desc: 'Ніяких прихованих умов. Ціна — це ціна. Гарантія — це гарантія. Повернення — без питань.' },
            ].map(v => (
              <div key={v.title} className="bg-[var(--bg-surface)] rounded-2xl p-8">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-lg mb-3">{v.title}</h3>
                <p className="text-[var(--text-3)] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
