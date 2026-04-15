'use client'

export default function NewsletterForm() {
  return (
    <form className="flex gap-2 flex-col sm:flex-row" onSubmit={e => { e.preventDefault(); alert('Дякуємо!') }}>
      <input
        type="email"
        placeholder="твій@email.com"
        className="flex-1 bg-white/8 border border-white/12 text-white placeholder-white/30 px-5 py-3.5 rounded-lg text-sm focus:outline-none focus:border-[#ff5c00] transition-colors"
        style={{ background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,255,255,.12)', color: 'white' }}
      />
      <button type="submit" className="btn-primary shrink-0">Підписатися</button>
    </form>
  )
}
