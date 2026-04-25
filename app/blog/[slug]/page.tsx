import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { fetchPostBySlug } from '@/lib/data'

const SITE_URL = 'https://ausom.in.ua'

function formatDate(iso: string): string {
    try {
          const d = new Date(iso)
          return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' })
    } catch {
          return iso
    }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
  ): Promise<Metadata> {
    const { slug } = await params
    const post = await fetchPostBySlug(slug)
    if (!post) {
          return {
                  title: 'Статтю не знайдено | Ausom UA',
                  robots: { index: false },
          }
    }
    const canonical = `${SITE_URL}/blog/${post.slug}`
    const description = post.excerpt.slice(0, 160)
    return {
          title: `${post.title} | Ausom UA`,
          description,
          alternates: { canonical },
          openGraph: {
                  title: post.title,
                  description,
                  url: canonical,
                  siteName: 'Ausom UA',
                  locale: 'uk_UA',
                  type: 'article',
                  publishedTime: post.published_at,
                  authors: ['Ausom UA'],
                  ...(post.cover_image ? { images: [{ url: post.cover_image, width: 1200, height: 630, alt: post.title }] } : {}),
          },
          twitter: {
                  card: 'summary_large_image',
                  title: post.title,
                  description,
                  ...(post.cover_image ? { images: [post.cover_image] } : {}),
          },
    }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
  ) {
    const { slug } = await params
    const post = await fetchPostBySlug(slug)
    if (!post) notFound()

  const paragraphs = post.content.split(/\n{2,}/).filter(p => p.trim().length > 0)

  return (
        <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
          {post.cover_image ? (
                  <div style={{ position:'relative', height:360, overflow:'hidden' }}>
                              <Image src={post.cover_image} alt={post.title} fill sizes="100vw" style={{ objectFit:'cover', objectPosition:'center top' }}/>
                              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,.3) 0%, rgba(0,0,0,.7) 100%)' }}/>
                              <div className="w-container" style={{ position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end', paddingBottom:40 }}>
                                            <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'#F5C200', background:'rgba(245,194,0,.15)', border:'1px solid rgba(245,194,0,.3)', padding:'4px 12px', borderRadius:4, display:'inline-block', marginBottom:14, width:'fit-content' }}>{post.category}</span>span>
                                            <h1 style={{ fontSize:'clamp(24px,3.5vw,44px)', fontWeight:800, letterSpacing:'-.025em', color:'#fff', lineHeight:1.1, maxWidth:700, marginBottom:14 }}>{post.title}</h1>h1>
                                            <div style={{ display:'flex', alignItems:'center', gap:16, fontSize:13, color:'rgba(255,255,255,.6)' }}>
                                                            <span>📅 {formatDate(post.published_at)}</span>span>
                                                          <span>⏱ {post.reading_time} хв читання</span>span>
                                            </div>div>
                              </div>div>
                  </div>div>
                ) : (
                  <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'48px 0 40px' }}>
                            <div className="w-container">
                                        <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)', marginBottom:20 }}>
                                                      <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>Link>
                                                      <span>/</span>span>
                                                      <Link href="/blog" style={{ color:'var(--text-3)', textDecoration:'none' }}>Блог</Link>Link>
                                                      <span>/</span>span>
                                                      <span style={{ color:'var(--text)', fontWeight:500 }}>{post.category}</span>span>
                                        </div>div>
                                        <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'#8B6800', background:'#FFF3CC', border:'1px solid #F5C200', padding:'4px 12px', borderRadius:4, display:'inline-block', marginBottom:20 }}>{post.category}</span>span>
                                        <h1 style={{ fontSize:'clamp(28px,4vw,52px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1.1, maxWidth:800, marginBottom:16 }}>{post.title}</h1>h1>
                                        <div style={{ display:'flex', alignItems:'center', gap:20, fontSize:13, color:'var(--text-3)' }}>
                                                      <span style={{ display:'flex', alignItems:'center', gap:6 }}><Calendar size={13}/>{formatDate(post.published_at)}</span>span>
                                                      <span style={{ display:'flex', alignItems:'center', gap:6 }}><Clock size={13}/>{post.reading_time} хв читання</span>span>
                                        </div>div>
                            </div>div>
                  </div>div>
              )}
        
              <div className="w-container" style={{ padding:'48px 40px 80px' }}>
                      <div style={{ maxWidth:720 }}>
                                <Link href="/blog" style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:13, fontWeight:500, color:'var(--text-3)', textDecoration:'none', marginBottom:40 }}>
                                            <ArrowLeft size={14}/> До всіх статей
                                </Link>Link>
                      
                        {!post.cover_image && (
                      <div style={{ marginBottom:40, padding:24, background:'var(--bg-soft)', borderRadius:12, border:'1.5px solid var(--border)' }}>
                                    <p style={{ fontSize:18, fontWeight:500, color:'var(--text-2)', lineHeight:1.7 }}>{post.excerpt}</p>p>
                      </div>div>
                                )}
                      
                        {paragraphs.map((paragraph, i) => (
                      <p key={i} style={{ fontSize: i===0 ? 18 : 16, fontWeight: i===0 ? 500 : 400, color:'var(--text-2)', lineHeight:1.8, marginBottom:24 }}>
                        {paragraph}
                      </p>p>
                    ))}
                      
                                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                      '@context': 'https://schema.org',
                      '@type': 'Article',
                      headline: post.title,
                      description: post.excerpt,
                      image: post.cover_image || undefined,
                      datePublished: post.published_at,
                      dateModified: post.published_at,
                      author: { '@type': 'Organization', name: 'Ausom UA', url: SITE_URL },
                      publisher: { '@type': 'Organization', name: 'Ausom UA', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` } },
                      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
        }) }} />
                      
                                <div style={{ marginTop:48, padding:'28px 32px', background:'#FFF3CC', border:'1.5px solid #F5C200', borderRadius:12 }}>
                                            <p style={{ fontSize:14, fontWeight:700, color:'#8B6800', marginBottom:8 }}>Потрібна консультація?</p>p>
                                            <p style={{ fontSize:14, color:'#8B6800', marginBottom:16 }}>Наша команда допоможе обрати найкращу модель для тебе.</p>p>
                                            <Link href="/catalog" className="btn btn-yellow btn-sm">Переглянути самокати</Link>Link>
                                </div>div>
                      </div>div>
              </div>div>
        </div>div>
      )
}</span>
