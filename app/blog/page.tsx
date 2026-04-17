'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { fetchAllPosts } from '@/lib/data'
import { BlogPost } from '@/lib/types'

const CATS = ['Всі', 'Огляди', 'Гід покупця', 'Порівняння', 'Поради', 'Новини']

// Format ISO date "2026-03-30" → "30 берез. 2026" (Ukrainian short form).
// Matches the look of the original hardcoded dates.
function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return iso
  }
}

export default function BlogPage() {
  const [posts,    setPosts]    = useState<BlogPost[]>([])
  const [loading,  setLoading]  = useState(true)
  const [activeCat, setActiveCat] = useState('Всі')

  useEffect(() => {
    let cancelled = false
    fetchAllPosts()
      .then(list => { if (!cancelled) setPosts(list) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Featured = newest post (first after DB sort by published_at DESC).
  // The original hardcoded blog used a `featured: true` flag on one post,
  // but the DB schema doesn't have that column — instead we always promote
  // the most recent post, which is a saner default for a news-style blog.
  const featured  = posts[0]
  const rest      = posts.slice(1)
  const filtered  = activeCat === 'Всі'
    ? rest
    : rest.filter(p => p.category === activeCat)

  const showFeatured = featured && (activeCat === 'Всі' || activeCat === featured.category)

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>

      {/* Header */}
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'48px 0 36px', textAlign:'center' }}>
        <div className="w-container">
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' as const, color:'var(--yellow-dark)', marginBottom:14 }}>Блог</div>
          <h1 style={{ fontSize:'clamp(36px,5vw,58px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', marginBottom:10, lineHeight:1.05 }}>
            Поради та <span style={{ color:'var(--yellow-dark)' }}>огляди</span>
          </h1>
          <p style={{ fontSize:15, color:'var(--text-3)' }}>Все про електросамокати — від вибору до обслуговування</p>
        </div>
      </div>

      <div className="w-container" style={{ padding:'40px 40px 80px' }}>

        {loading && (
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:'80px 0', color:'var(--text-3)' }}>
            <Loader2 size={22} style={{ animation:'spin 1s linear infinite' }}/>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div style={{ padding:'80px 20px', textAlign:'center' }}>
            <div style={{ fontSize:44, opacity:.3, marginBottom:14 }}>📝</div>
            <h2 style={{ fontSize:22, fontWeight:800, color:'var(--text)', marginBottom:6 }}>Тут поки нічого немає</h2>
            <p style={{ fontSize:14, color:'var(--text-3)' }}>Перші статті з'являться найближчим часом.</p>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <>
            {/* Category pills */}
            <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', justifyContent:'center', marginBottom:40 }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setActiveCat(c)} style={{
                  padding:'8px 20px', fontSize:13, fontWeight:600,
                  borderRadius:20, border:'1.5px solid', cursor:'pointer', transition:'all .15s',
                  background: activeCat===c ? '#F5C200' : 'transparent',
                  borderColor: activeCat===c ? '#F5C200' : 'var(--border-md)',
                  color: activeCat===c ? '#111' : 'var(--text-3)',
                }}>{c}</button>
              ))}
            </div>

            {/* Featured post (newest) */}
            {showFeatured && (
              <Link href={`/blog/${featured.slug}`} style={{ textDecoration:'none', display:'block', marginBottom:32 }}>
                <div
                  className="blog-featured"
                  style={{
                    display:'grid', gridTemplateColumns:'1fr 1fr',
                    background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:16, overflow:'hidden',
                    transition:'transform .2s, box-shadow .2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow='var(--shadow-xl)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='none';           (e.currentTarget as HTMLElement).style.boxShadow='none' }}
                >
                  <div style={{ position:'relative', minHeight:320, background:'var(--bg-subtle)', overflow:'hidden' }}>
                    {featured.cover_image && (
                      <Image
                        src={featured.cover_image}
                        alt={featured.title}
                        fill
                        sizes="(max-width:768px) 100vw, 50vw"
                        style={{ objectFit:'cover', objectPosition:'center' }}
                      />
                    )}
                  </div>
                  <div style={{ padding:'40px 40px', display:'flex', flexDirection:'column', justifyContent:'center', gap:14 }}>
                    <span style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'var(--yellow-dark)', background:'#FFF3CC', border:'1px solid #F5C200', padding:'4px 10px', borderRadius:4, width:'fit-content' }}>
                      {featured.category}
                    </span>
                    <h2 style={{ fontSize:'clamp(22px,2.5vw,32px)', fontWeight:800, letterSpacing:'-.02em', color:'var(--text)', lineHeight:1.2 }}>
                      {featured.title}
                    </h2>
                    <p style={{ fontSize:14, color:'var(--text-3)', lineHeight:1.7 }}>{featured.excerpt}</p>
                    <div style={{ fontSize:12, color:'var(--text-4)', display:'flex', gap:12 }}>
                      <span>{formatDate(featured.published_at)}</span><span>·</span><span>{featured.reading_time} хв читання</span>
                    </div>
                    <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:'var(--text)' }}>
                      Читати статтю <ArrowRight size={14}/>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid of remaining posts */}
            {filtered.length > 0 ? (
              <div className="blog-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:48 }}>
                {filtered.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration:'none' }}>
                    <div
                      style={{
                        background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:12,
                        overflow:'hidden', display:'flex', flexDirection:'column', height:'100%',
                        transition:'transform .2s, box-shadow .2s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow='var(--shadow-lg)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='none';           (e.currentTarget as HTMLElement).style.boxShadow='none' }}
                    >
                      <div style={{ position:'relative', height:200, background:'var(--bg-subtle)', overflow:'hidden' }}>
                        {post.cover_image && (
                          <Image
                            src={post.cover_image}
                            alt={post.title}
                            fill
                            sizes="(max-width:640px) 100vw, 33vw"
                            style={{ objectFit:'cover', objectPosition:'center' }}
                          />
                        )}
                        <span style={{ position:'absolute', bottom:10, right:10, background:'#F5C200', color:'#111', fontSize:9, fontWeight:800, padding:'3px 7px', borderRadius:3 }}>
                          {post.reading_time} хв
                        </span>
                      </div>
                      <div style={{ padding:'18px', flex:1, display:'flex', flexDirection:'column', gap:10 }}>
                        <span style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'var(--yellow-dark)' }}>{post.category}</span>
                        <h3 style={{ fontSize:15, fontWeight:700, color:'var(--text)', lineHeight:1.35, letterSpacing:'-.01em' }}>{post.title}</h3>
                        <p style={{ fontSize:13, color:'var(--text-3)', lineHeight:1.6, flex:1 }}>{post.excerpt}</p>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid var(--border)', fontSize:11, color:'var(--text-4)' }}>
                          <span>{formatDate(post.published_at)}</span>
                          <span style={{ color:'var(--yellow-dark)', fontWeight:700 }}>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : !showFeatured && (
              <div style={{ padding:'60px 20px', textAlign:'center', color:'var(--text-3)' }}>
                <p style={{ fontSize:14 }}>Немає статей у категорії "{activeCat}"</p>
              </div>
            )}

            {/* Newsletter */}
            <div
              className="blog-newsletter"
              style={{
                display:'grid', gridTemplateColumns:'1fr 1fr', alignItems:'center', gap:40,
                background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:16,
                padding:'40px 48px', position:'relative',
              }}
            >
              <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:'#F5C200', borderRadius:'8px 0 0 8px' }}/>
              <div>
                <h3 style={{ fontSize:26, fontWeight:800, letterSpacing:'-.02em', color:'var(--text)', marginBottom:6 }}>Будь у курсі</h3>
                <p style={{ fontSize:14, color:'var(--text-3)' }}>Нові статті, огляди та знижки — першим.</p>
              </div>
              <form style={{ display:'flex', gap:10 }} onSubmit={e => e.preventDefault()}>
                <input type="email" required placeholder="твій@email.com" style={{
                  flex:1, padding:'12px 16px', background:'var(--bg)', border:'1.5px solid var(--border)',
                  borderRadius:8, fontSize:14, color:'var(--text)', outline:'none', fontFamily:'Inter,sans-serif',
                  transition:'border-color .15s',
                }}
                onFocus={e => (e.target.style.borderColor = '#F5C200')}
                onBlur={e  => (e.target.style.borderColor = 'var(--border)')} />
                <button type="submit" className="btn btn-yellow">Підписатися</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
