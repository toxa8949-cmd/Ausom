'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createPost, updatePost, getPostById, uploadImage } from '@/lib/queries'
import { Save, ArrowLeft, Upload, X } from 'lucide-react'
import AdminShell from '../../AdminShell'

interface F {
  title: string; slug: string; excerpt: string; content: string
  cover_image: string; category: string; reading_time: string; published_at: string
}

const EMPTY: F = {
  title:'', slug:'', excerpt:'', content:'', cover_image:'',
  category:'Огляди', reading_time:'5', published_at: new Date().toISOString().split('T')[0]
}

const CATS = ['Огляди','Гід покупця','Порівняння','Новини','Поради']

const B = '1.5px solid #EEEEEE'
const inp: React.CSSProperties = { width:'100%',padding:'11px 14px',background:'#F9F9F9',border:B,borderRadius:8,fontSize:14,color:'#111',outline:'none',fontFamily:'Inter,sans-serif',transition:'border-color .15s' }
const label: React.CSSProperties = { display:'block',fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#888',marginBottom:8 }

export default function BlogForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const isNew = id === 'new'
  const [form, f] = useState<F>(EMPTY)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof F, v: string) => f(p => ({ ...p, [k]: v }))

  useEffect(() => {
    if (!isNew) {
      getPostById(id).then(p => {
        if (p) f({
          title:p.title, slug:p.slug, excerpt:p.excerpt, content:p.content,
          cover_image:p.cover_image||'', category:p.category,
          reading_time:String(p.reading_time), published_at:p.published_at.split('T')[0]
        })
      }).finally(() => setLoading(false))
    }
  }, [isNew, id])

  const handleCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file, 'blog')
      set('cover_image', url)
    } catch (err: any) { alert('Помилка: ' + (err.message || '')) }
    finally { setUploading(false); e.target.value = '' }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('')
    try {
      const data: any = {
        title: form.title, slug: form.slug, excerpt: form.excerpt,
        content: form.content, cover_image: form.cover_image || null,
        category: form.category, reading_time: parseInt(form.reading_time) || 5,
        published_at: form.published_at || new Date().toISOString()
      }
      if (isNew) await createPost(data); else await updatePost(id, data)
      router.replace('/admin/blog')
    } catch (e: any) { setError(e.message || 'Помилка збереження') }
    finally { setSaving(false) }
  }

  const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ background:'#fff',border:B,borderRadius:12,overflow:'hidden',marginBottom:16 }}>
      <div style={{ padding:'14px 20px',borderBottom:B,fontSize:13,fontWeight:700,color:'#111' }}>{title}</div>
      <div style={{ padding:'20px' }}>{children}</div>
    </div>
  )

  if (loading) return (
    <div style={{ minHeight:'100vh',background:'#F9F9F9',display:'flex',alignItems:'center',justifyContent:'center' }}>
      <div style={{ width:32,height:32,border:'2.5px solid #F5C200',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <AdminShell title={isNew ? 'Нова стаття' : 'Редагувати статтю'} breadcrumb={isNew ? 'Нова стаття' : form.title}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,gap:12 }}>
        <Link href="/admin/blog" style={{ display:'inline-flex',alignItems:'center',gap:6,background:'#fff',color:'#444',fontSize:12,fontWeight:600,padding:'9px 18px',borderRadius:7,border:B,textDecoration:'none' }}>
          <ArrowLeft size={13} /> Назад
        </Link>
        <button type="submit" form="bf" disabled={saving}
          style={{ display:'inline-flex',alignItems:'center',gap:6,background:'#111',color:'#fff',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase' as const,padding:'10px 20px',borderRadius:7,border:'none',cursor:'pointer',opacity:saving?.6:1 }}>
          <Save size={13} /> {saving ? 'Збереження...' : 'Зберегти'}
        </button>
      </div>

      {error && <div style={{ background:'#FEF2F2',border:'1.5px solid #FECACA',color:'#DC2626',padding:'12px 16px',borderRadius:8,fontSize:13,marginBottom:16 }}>{error}</div>}

      <form id="bf" onSubmit={submit}>
        <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr',gap:16 }}>
          <div>
            <Card title="Основне">
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                <div>
                  <div style={label}>Заголовок *</div>
                  <input value={form.title} onChange={e => set('title', e.target.value)} required
                    placeholder="Найкращі самокати 2026" style={inp}
                    onFocus={e => (e.target.style.borderColor = '#F5C200')}
                    onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
                </div>
                <div>
                  <div style={label}>Slug (URL)</div>
                  <input value={form.slug} onChange={e => set('slug', e.target.value)}
                    placeholder="best-scooters-2026" style={inp}
                    onFocus={e => (e.target.style.borderColor = '#F5C200')}
                    onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
                </div>
                <div>
                  <div style={label}>Короткий опис</div>
                  <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={2}
                    style={{ ...inp, resize:'vertical' as const }} placeholder="Короткий опис для картки блогу..."
                    onFocus={e => (e.target.style.borderColor = '#F5C200')}
                    onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
                </div>
              </div>
            </Card>

            <Card title="Контент">
              <div>
                <div style={label}>Текст статті (Markdown)</div>
                <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={16}
                  style={{ ...inp, resize:'vertical' as const, fontFamily:'monospace',fontSize:13,lineHeight:'1.6' }}
                  placeholder="# Заголовок&#10;&#10;Текст статті...&#10;&#10;## Підзаголовок&#10;&#10;- Пункт 1&#10;- Пункт 2"
                  onFocus={e => (e.target.style.borderColor = '#F5C200')}
                  onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
              </div>
            </Card>
          </div>

          <div>
            <Card title="Обкладинка">
              {form.cover_image ? (
                <div style={{ position:'relative',aspectRatio:'16/9',borderRadius:8,overflow:'hidden',border:B,marginBottom:10 }}>
                  <Image src={form.cover_image} alt="Обкладинка" fill style={{ objectFit:'cover' }} />
                  <button type="button" onClick={() => set('cover_image', '')}
                    style={{ position:'absolute',top:6,right:6,width:28,height:28,borderRadius:6,background:'rgba(0,0,0,.7)',border:'none',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'32px 20px',borderRadius:8,border:'2px dashed #DDD',cursor:uploading?'wait':'pointer',background:'#FAFAFA' }}>
                  <input type="file" accept="image/*" onChange={handleCover} style={{ display:'none' }} disabled={uploading} />
                  {uploading ? (
                    <div style={{ width:24,height:24,border:'2px solid #F5C200',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite' }} />
                  ) : (
                    <>
                      <Upload size={24} color="#BBB" />
                      <span style={{ fontSize:12,color:'#888',marginTop:8,fontWeight:600 }}>Завантажити обкладинку</span>
                      <span style={{ fontSize:10,color:'#BBB',marginTop:4 }}>JPG, PNG, WebP</span>
                    </>
                  )}
                </label>
              )}
            </Card>

            <Card title="Параметри">
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                <div>
                  <div style={label}>Категорія</div>
                  <select value={form.category} onChange={e => set('category', e.target.value)} style={{ ...inp, cursor:'pointer' }}>
                    {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <div style={label}>Час читання (хв)</div>
                  <input type="number" value={form.reading_time} onChange={e => set('reading_time', e.target.value)}
                    style={inp} placeholder="5"
                    onFocus={e => (e.target.style.borderColor = '#F5C200')}
                    onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
                </div>
                <div>
                  <div style={label}>Дата публікації</div>
                  <input type="date" value={form.published_at} onChange={e => set('published_at', e.target.value)}
                    style={inp}
                    onFocus={e => (e.target.style.borderColor = '#F5C200')}
                    onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </AdminShell>
  )
}
