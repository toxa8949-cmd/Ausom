export default function AnnouncementBar() {
  const items = [
    'Весняний розпродаж — знижки до €400',
    'Безкоштовна доставка від €39.99',
    'Гарантія 2 роки на всі моделі',
    '14 днів повернення без питань',
    'Офіційний дилер Ausom в Україні',
  ]

  return (
    <div className="bg-[#ff5c00] overflow-hidden py-2.5">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 px-10 text-white text-xs font-bold tracking-[.08em] uppercase shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
