'use client'

export default function NewsletterForm() {
  return (
    <form className="flex gap-2 flex-col sm:flex-row" onSubmit={e => { e.preventDefault(); alert('Дякуємо!') }}>
      <input
        type="email"
        placeholder="твій@email.com"
        className="flex-1 bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-3)] px-5 py-3.5 rounded-lg text-sm focus:outline-none focus:border-[var(--brand-dk)] transition-colors"
        style={{ background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,255,255,.12)', color: 'white' }}
      />
      <button type="submit" className="btn-primary shrink-0">Підписатися</button>
    </form>
  )
}
