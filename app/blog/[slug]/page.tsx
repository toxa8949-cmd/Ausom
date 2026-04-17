'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, use } from 'react'
import { ArrowLeft, Clock, Calendar, Loader2 } from 'lucide-react'
import { fetchPostBySlug } from '@/lib/data'
import { BlogPost } from '@/lib/types'

// Ukrainian short date: "2026-03-30" → "30 берез. 2026"
function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return iso
  }
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next 15 passes params as a Promise to Client Components too; unwrap it.
  const { slug } = use(params)

  const [post,     setPost]     = useState<BlogPost | null>(null)
  const [loading,  setLoading]  = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchPostBySlug(slug)
      .then(p => {
        if (cancelled) return
        if (p) setPost(p)
        else   setNotFound(true)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [slug])

  if (loading) {
    return (
      <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Loader2 size={22} style={{ animation:'spin 1s linear infinite', color:'var(--text-3)' }}/>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div style={{ minHeight:'60vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, padding:'40px 20px', textAlign:'center' }}>
        <div style={{ fontSize:44, opacity:.3 }}>📝</div>
        <h1 style={{ fontSize:'clamp(22px,3vw,28px)', fontWeight:800, color:'var(--text)' }}>Статтю не знайдено</h1>
        <p style={{ fontSize:14, color:'var(--text-3)', maxWidth:420 }}>
          Можливо, посилання застаріло. Подивися усі наші статті на сторінці блогу.
        </p>
        <Link href="/blog" className="btn btn-black btn-sm" style={{ marginTop:8 }}>До всіх статей</Link>
      </div>
    )
  }

  // Split plain-text content on '\n\n' — matches the format stored by the
  // admin textarea editor. Empty paragraphs (trailing newlines) are filtered.
  const paragraphs = post.content.split(/\n{2,}/).filter(p => p.trim().length > 0)

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>

      {/* Hero banner (with cover image) */}
      {post.cover_image ? (
        <div style={{ position:'relative', height:360, overflow:'hidden' }}>
          <Image src={post.cover_image} alt={post.title} fill sizes="100vw" style={{ objectFit:'cover', objectPosition:'center top' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,.3) 0%, rgba(0,0,0,.7) 100%)' }}/>
          <div className="w-container" style={{ position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end', paddingBottom:40 }}>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'#F5C200', background:'rgba(245,194,0,.15)', border:'1px solid rgba(245,194,0,.3)', padding:'4px 12px', borderRadius:4, display:'inline-block', marginBottom:14, width:'fit-content' }}>
              {post.category}
            </span>
            <h1 style={{ fontSize:'clamp(24px,3.5vw,44px)', fontWeight:800, letterSpacing:'-.025em', color:'#fff', lineHeight:1.1, maxWidth:700, marginBottom:14 }}>
              {post.title}
            </h1>
            <div style={{ display:'flex', alignItems:'center', gap:16, fontSize:13, color:'rgba(255,255,255,.6)' }}>
              <span style={{ display:'flex', alignItems:'center', gap:5 }}>📅 {formatDate(post.published_at)}</span>
              <span style={{ display:'flex', alignItems:'center', gap:5 }}>⏱ {post.reading_time} хв читання</span>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback header if no cover image */
        <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'48px 0 40px' }}>
          <div className="w-container">
            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)', marginBottom:20 }}>
              <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
              <span>/</span>
              <Link href="/blog" style={{ color:'var(--text-3)', textDecoration:'none' }}>Блог</Link>
              <span>/</span>
              <span style={{ color:'var(--text)', fontWeight:500 }}>{post.category}</span>
            </div>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'#8B6800', background:'#FFF3CC', border:'1px solid #F5C200', padding:'4px 12px', borderRadius:4, display:'inline-block', marginBottom:20 }}>
              {post.category}
            </span>
            <h1 style={{ fontSize:'clamp(28px,4vw,52px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1.1, maxWidth:800, marginBottom:16 }}>
              {post.title}
            </h1>
            <div style={{ display:'flex', alignItems:'center', gap:20, fontSize:13, color:'var(--text-3)' }}>
              <span style={{ display:'flex', alignItems:'center', gap:6 }}><Calendar size={13}/>{formatDate(post.published_at)}</span>
              <span style={{ display:'flex', alignItems:'center', gap:6 }}><Clock size={13}/>{post.reading_time} хв читання</span>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="w-container" style={{ padding:'48px 40px 80px' }}>
        <div style={{ maxWidth:720 }}>
          <Link href="/blog" style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:13, fontWeight:500, color:'var(--text-3)', textDecoration:'none', marginBottom:40 }}>
            <ArrowLeft size={14}/> До всіх статей
          </Link>

          {/* Inline cover — shown ONLY if there's no hero banner above.
              Avoids duplicating the image twice at the top of the page. */}
          {!post.cover_image && (
            <div style={{ marginBottom:40, padding:24, background:'var(--bg-soft)', borderRadius:12, border:'1.5px solid var(--border)' }}>
              <p style={{ fontSize:18, fontWeight:500, color:'var(--text-2)', lineHeight:1.7 }}>
                {post.excerpt}
              </p>
            </div>
          )}

          {paragraphs.map((paragraph, i) => (
            <p key={i} style={{
              fontSize: i === 0 ? 18 : 16,
              fontWeight: i === 0 ? 500 : 400,
              color: 'var(--text-2)',
              lineHeight: 1.8,
              marginBottom: 24,
            }}>
              {paragraph}
            </p>
          ))}

          {/* CTA block at bottom */}
          <div style={{ marginTop:48, padding:'28px 32px', background:'#FFF3CC', border:'1.5px solid #F5C200', borderRadius:12 }}>
            <p style={{ fontSize:14, fontWeight:700, color:'#8B6800', marginBottom:8 }}>Потрібна консультація?</p>
            <p style={{ fontSize:14, color:'#8B6800', marginBottom:16 }}>Наша команда допоможе обрати найкращу модель для тебе.</p>
            <Link href="/catalog" className="btn btn-yellow btn-sm">Переглянути самокати</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
