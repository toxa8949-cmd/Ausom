'use client'
export default function NewsletterForm() {
  return (
    <form style={{ display:'flex', gap:10, flexWrap:'wrap' }} onSubmit={e=>{e.preventDefault();alert('Дякуємо!')}}>
      <input type="email" required placeholder="твій@email.com" style={{
        flex:1, minWidth:220, padding:'12px 16px',
        background:'rgba(255,255,255,.1)', border:'1.5px solid rgba(255,255,255,.2)',
        borderRadius:8, fontSize:14, color:'#fff', outline:'none', fontFamily:'Inter,sans-serif',
      }}/>
      <button type="submit" className="btn btn-yellow">Підписатися</button>
    </form>
  )
}
