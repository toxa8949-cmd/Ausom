'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { fetchAllPosts } from '@/lib/data'
import { BlogPost } from '@/lib/types'

// Ukrainian short date for card footer: "2026-03-30" → "30 берез."
function formatDateShort(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' })
  } catch {
    return iso
  }
}

export default function BlogPreview() {
  const [posts,   setPosts]   = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchAllPosts()
      .then(list => { if (!cancelled) setPosts(list.slice(0, 3)) }) // show top 3 newest
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  // Hide the entire section if nothing to show — better than empty cards
  if (!loading && posts.length === 0) return null

  return (
    <section style={{ padding:'88px 0', background:'var(--bg-soft)', borderTop:'1px solid var(--border)' }}>
      <div className="w-container">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:40 }}>
          <div>
            <div className="s-label">Блог</div>
            <h2 style={{ fontSize:'clamp(28px,3vw,42px)', fontWeight:800, letterSpacing:'-.02em', color:'var(--text)' }}>
              Поради та <span style={{ color:'var(--yellow-dark)' }}>огляди</span>
            </h2>
          </div>
          <Link href="/blog" style={{ display:'flex', alignItems:'center', gap:6, fontSize:14, fontWeight:600, color:'var(--text-2)', textDecoration:'none' }}>
            Всі статті <ArrowRight size={15}/>
          </Link>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="blog-preview-grid">
          {(loading ? Array.from({ length: 3 }) : posts).map((raw, idx) => {
            // While loading render 3 skeleton cards; once data arrives render real posts
            const post = raw as BlogPost | undefined
            const key  = post?.id ?? `skeleton-${idx}`

            return (
              <Link
                key={key}
                href={post ? `/blog/${post.slug}` : '#'}
                style={{ textDecoration:'none', pointerEvents: post ? 'auto' : 'none' }}
              >
                <div
                  style={{
                    background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:12,
                    overflow:'hidden', transition:'transform .2s, box-shadow .2s',
                  }}
                  onMouseEnter={e => { if (post) { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)' } }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
                >
                  {/* Cover image — real photo from DB instead of the old SVG placeholder */}
                  <div style={{ position:'relative', height:180, background:'var(--bg-subtle)', overflow:'hidden' }}>
                    {post?.cover_image ? (
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        sizes="(max-width:640px) 100vw, 33vw"
                        style={{ objectFit:'cover', objectPosition:'center' }}
                      />
                    ) : (
                      // Fallback icon only when the post literally has no cover_image
                      // (admin forgot to upload). NOT shown for all posts like before.
                      <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <svg viewBox="0 0 120 90" fill="none" width="64" height="48" style={{ opacity:.18 }}>
                          <circle cx="22" cy="72" r="16" stroke="#F5C200" strokeWidth="4"/>
                          <circle cx="98" cy="72" r="16" stroke="#F5C200" strokeWidth="4"/>
                          <path d="M22 72L38 28L76 20L98 72" stroke="#111" strokeWidth="5" strokeLinecap="round"/>
                          <path d="M38 28L48 8" stroke="#F5C200" strokeWidth="4" strokeLinecap="round"/>
                          <rect x="42" y="2" width="20" height="10" rx="2.5" fill="#F5C200"/>
                        </svg>
                      </div>
                    )}

                    {post && (
                      <span style={{
                        position:'absolute', bottom:10, right:10,
                        background:'#F5C200', color:'#111', fontSize:9, fontWeight:800,
                        padding:'3px 7px', borderRadius:3,
                      }}>{post.reading_time} хв</span>
                    )}
                  </div>

                  <div style={{ padding:'18px' }}>
                    {post ? (
                      <>
                        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'var(--yellow-dark)', marginBottom:8 }}>
                          {post.category}
                        </div>
                        <h3 style={{ fontSize:15, fontWeight:700, color:'var(--text)', lineHeight:1.35, marginBottom:8, letterSpacing:'-.01em' }}>
                          {post.title}
                        </h3>
                        <p style={{ fontSize:13, color:'var(--text-3)', lineHeight:1.6, marginBottom:14 }}>
                          {post.excerpt}
                        </p>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid var(--border)', fontSize:11, color:'var(--text-4)' }}>
                          <span>{formatDateShort(post.published_at)}</span>
                          <span style={{ color:'var(--yellow-dark)', fontWeight:600 }}>→</span>
                        </div>
                      </>
                    ) : (
                      // Skeleton loading state
                      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                        <div style={{ height:10, width:'30%', background:'var(--bg-subtle)', borderRadius:3 }}/>
                        <div style={{ height:14, width:'90%', background:'var(--bg-subtle)', borderRadius:3 }}/>
                        <div style={{ height:14, width:'75%', background:'var(--bg-subtle)', borderRadius:3 }}/>
                        <div style={{ height:10, width:'100%', background:'var(--bg-subtle)', borderRadius:3, marginTop:4 }}/>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
