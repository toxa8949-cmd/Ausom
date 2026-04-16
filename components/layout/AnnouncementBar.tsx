const MSGS = [
  'ВЕСНЯНИЙ РОЗПРОДАЖ — ЗНИЖКИ ДО ₴11 050',
  '14 ДНІВ ПОВЕРНЕННЯ БЕЗ ПИТАНЬ',
  'ОФІЦІЙНИЙ ДИЛЕР AUSOM В УКРАЇНІ',
  'БЕЗКОШТОВНА ДОСТАВКА ПО ВСІЙ УКРАЇНІ',
  'ОФІЦІЙНА ГАРАНТІЯ 2 РОКИ НА ВСІ МОДЕЛІ',
]

export default function AnnouncementBar() {
  const all = [...MSGS, ...MSGS]
  return (
    <div className="announce-bar" style={{ height: 36, background: '#F5C200', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div className="animate-marquee" style={{ display: 'flex', gap: 64, whiteSpace: 'nowrap' }}>
        {all.map((m, i) => (
          <span key={i} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: '#111' }}>
            ▸ {m}
          </span>
        ))}
      </div>
    </div>
  )
}
