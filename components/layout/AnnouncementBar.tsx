const MSGS = [
  'Безкоштовна доставка по всій Україні',
  'Офіційна гарантія 2 роки на всі моделі',
  'Весняний розпродаж — знижки до ₴11 050',
  '14 днів повернення без питань',
  'Офіційний дилер Ausom в Україні',
]

export default function AnnouncementBar() {
  const items = [...MSGS, ...MSGS]
  return (
    <div className="h-9 bg-[var(--brand)] text-[#111] overflow-hidden flex items-center">
      <div className="animate-ticker flex gap-16 whitespace-nowrap">
        {items.map((msg, i) => (
          <span key={i} className="text-[11px] font-bold tracking-[.08em] uppercase flex items-center gap-2">
            <span className="opacity-50">▸</span>{msg}
          </span>
        ))}
      </div>
    </div>
  )
}
