'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getAllBanners, createBanner, updateBanner, deleteBanner, uploadImage, getAllProducts, Banner } from '@/lib/queries'
import { Product } from '@/lib/types'
import { Plus, Trash2, Save, Upload, X, GripVertical, Eye, EyeOff, Pencil } from 'lucide-react'
import AdminShell from '../AdminShell'

const B = '1.5px solid #EEEEEE'
const inp: React.CSSProperties = { width:'100%',padding:'10px 14px',background:'#F9F9F9',border:B,borderRadius:8,fontSize:13,color:'#111',outline:'none',fontFamily:'Inter,sans-serif' }
const lblS: React.CSSProperties = { fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'#888',marginBottom:6 }

interface BannerForm {
  title: string
  subtitle: string
  link: string
  image: string
  eyebrow: string
  product_slug: string
  banner_position: string
  cta_label: string
  active: boolean
}

const EMPTY: BannerForm = {
  title: '', subtitle: '', link: '', image: '',
  eyebrow: '', product_slug: '',
  banner_position: 'center center',
  cta_label: 'Купити зараз',
  active: true,
}

const POSITIONS = [
  { value:'center top',    label:'Зверху' },
  { value:'center 30%',    label:'Верх-центр' },
  { value:'center center', label:'Центр' },
  { value:'center 70%',    label:'Низ-центр' },
  { value:'center bottom', label:'Знизу' },
  { value:'left center',   label:'Зліва' },
  { value:'right center',  label:'Справа' },
]

// ─────────────────────────────────────────────────────────────
// CRITICAL: BannerFormUI must live at module scope. Defining it
// inside AdminBanners caused React to treat it as a NEW component
// type on every keystroke (because `form` state changes), which
// remounted every <input> and made the user lose focus.
// ─────────────────────────────────────────────────────────────
interface BannerFormUIProps {
  form: BannerForm
  setFormField: <K extends keyof BannerForm>(k: K, v: BannerForm[K]) => void
  products: Product[]
  uploading: boolean
  saving: boolean
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSave: () => void
  onCancel: () => void
}

function BannerFormUI({ form, setFormField, products, uploading, saving, onUpload, onSave, onCancel }: BannerFormUIProps) {
  return (
    <div style={{ background:'#fff', border:B, borderRadius:12, padding:20, marginBottom:16 }}>

      {/* Row 1: eyebrow + title */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:12, marginBottom:12 }} className="grid-2">
        <div>
          <div style={lblS}>Eyebrow (жовтий текст)</div>
          <input value={form.eyebrow} onChange={e => setFormField('eyebrow', e.target.value)} placeholder="Флагман 2026" style={inp}
            onFocus={e => (e.target.style.borderColor = '#F5C200')} onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
        </div>
        <div>
          <div style={lblS}>Заголовок *</div>
          <input value={form.title} onChange={e => setFormField('title', e.target.value)} placeholder="Ausom DT2 Pro" style={inp}
            onFocus={e => (e.target.style.borderColor = '#F5C200')} onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
        </div>
      </div>

      <div style={{ marginBottom:12 }}>
        <div style={lblS}>Підзаголовок</div>
        <textarea value={form.subtitle} onChange={e => setFormField('subtitle', e.target.value)} rows={2}
          placeholder="Подвійний мотор 2×800W, 70 км, 65 км/год."
          style={{ ...inp, resize:'vertical' as const, minHeight:56 }}
          onFocus={e => (e.target.style.borderColor = '#F5C200')} onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }} className="grid-2">
        <div>
          <div style={lblS}>Посилання кнопки</div>
          <input value={form.link} onChange={e => setFormField('link', e.target.value)} placeholder="/product/dt2-pro" style={inp}
            onFocus={e => (e.target.style.borderColor = '#F5C200')} onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
        </div>
        <div>
          <div style={lblS}>Текст кнопки</div>
          <input value={form.cta_label} onChange={e => setFormField('cta_label', e.target.value)} placeholder="Купити зараз" style={inp}
            onFocus={e => (e.target.style.borderColor = '#F5C200')} onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:12, marginBottom:12 }} className="grid-2">
        <div>
          <div style={lblS}>Товар для панелі під банером</div>
          <select value={form.product_slug} onChange={e => setFormField('product_slug', e.target.value)} style={{ ...inp, cursor:'pointer' }}>
            <option value="">— Без товару (показати тільки банер) —</option>
            {products.map(p => (
              <option key={p.id} value={p.slug}>{p.name} (₴{p.price.toLocaleString('uk-UA')})</option>
            ))}
          </select>
          <div style={{ fontSize:11, color:'#BBB', marginTop:4 }}>
            Якщо обрано — під банером покажеться ціна та характеристики цього товару
          </div>
        </div>
        <div>
          <div style={lblS}>Позиція фото</div>
          <select value={form.banner_position} onChange={e => setFormField('banner_position', e.target.value)} style={{ ...inp, cursor:'pointer' }}>
            {POSITIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom:16 }}>
        <div style={lblS}>Зображення *</div>
        {form.image ? (
          <div style={{ position:'relative', aspectRatio:'3/1', borderRadius:8, overflow:'hidden', border:B, background:'#F5F5F5' }}>
            <Image src={form.image} alt="" fill style={{ objectFit:'cover', objectPosition: form.banner_position }} />
            <button type="button" onClick={() => setFormField('image', '')}
              style={{ position:'absolute', top:6, right:6, width:28, height:28, borderRadius:6, background:'rgba(0,0,0,.7)', border:'none', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <X size={14} />
            </button>
          </div>
        ) : (
          <label style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24, borderRadius:8, border:'2px dashed #DDD', cursor:uploading?'wait':'pointer', background:'#FAFAFA' }}>
            <input type="file" accept="image/*" onChange={onUpload} style={{ display:'none' }} disabled={uploading} />
            {uploading ? (
              <div style={{ width:20, height:20, border:'2px solid #F5C200', borderTopColor:'transparent', borderRadius:'50%', animation:'spin .8s linear infinite' }} />
            ) : (
              <>
                <Upload size={20} color="#BBB" />
                <span style={{ fontSize:11, color:'#888', marginTop:6, fontWeight:600 }}>Завантажити (рекомендовано 1920×640)</span>
              </>
            )}
          </label>
        )}
      </div>

      <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
        <button onClick={onCancel}
          style={{ padding:'9px 18px', borderRadius:7, border:B, background:'#fff', fontSize:12, fontWeight:600, color:'#666', cursor:'pointer' }}>
          Скасувати
        </button>
        <button onClick={onSave} disabled={saving}
          style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'9px 18px', borderRadius:7, border:'none', background:'#111', fontSize:12, fontWeight:700, color:'#fff', cursor:saving?'wait':'pointer', opacity:saving?.6:1 }}>
          <Save size={12} /> {saving ? 'Збереження...' : 'Зберегти'}
        </button>
      </div>
    </div>
  )
}

export default function AdminBanners() {
  const [banners,  setBanners]  = useState<Banner[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading,  setLoading]  = useState(true)
  const [editing,  setEditing]  = useState<string | null>(null)
  const [form,     setForm]     = useState<BannerForm>(EMPTY)
  const [showNew,  setShowNew]  = useState(false)
  const [saving,   setSaving]   = useState(false)
  const [uploading, setUploading] = useState(false)

  const load = async () => {
    try {
      const [b, p] = await Promise.all([getAllBanners(), getAllProducts()])
      setBanners(b)
      setProducts(p)
    } catch (err) {
      console.error('[admin/banners] load failed', err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  const setFormField = <K extends keyof BannerForm>(k: K, v: BannerForm[K]) => setForm(p => ({ ...p, [k]: v }))

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file, 'banners')
      setFormField('image', url)
    } catch (err: any) {
      alert('Помилка: ' + (err.message || ''))
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const toPayload = (f: BannerForm) => ({
    title:           f.title.trim(),
    subtitle:        f.subtitle.trim(),
    link:            f.link.trim(),
    image:           f.image,
    eyebrow:         f.eyebrow.trim(),
    product_slug:    f.product_slug || null,
    banner_position: f.banner_position,
    cta_label:       f.cta_label.trim() || 'Купити зараз',
    active:          f.active,
  })

  const handleSaveNew = async () => {
    if (!form.title || !form.image) {
      alert('Заповніть заголовок та завантажте зображення')
      return
    }
    setSaving(true)
    try {
      await createBanner({ ...toPayload(form), position: banners.length })
      setShowNew(false)
      setForm(EMPTY)
      await load()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (id: string) => {
    setSaving(true)
    try {
      await updateBanner(id, toPayload(form))
      setEditing(null)
      setForm(EMPTY)
      await load()
    } catch (e: any) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Видалити банер "${title}"?`)) return
    try { await deleteBanner(id); await load() } catch { alert('Помилка') }
  }

  const toggleActive = async (b: Banner) => {
    try { await updateBanner(b.id, { active: !b.active }); await load() } catch {}
  }

  const startEdit = (b: Banner) => {
    setEditing(b.id)
    setForm({
      title:           b.title || '',
      subtitle:        b.subtitle || '',
      link:            b.link || '',
      image:           b.image || '',
      eyebrow:         b.eyebrow || '',
      product_slug:    b.product_slug || '',
      banner_position: b.banner_position || 'center center',
      cta_label:       b.cta_label || 'Купити зараз',
      active:          b.active,
    })
    setShowNew(false)
  }

  // Shared props bag for both create and edit forms
  const formProps = {
    form, setFormField, products, uploading, saving, onUpload: handleUpload,
  }

  return (
    <AdminShell title="Банери головної" subtitle={`${banners.length} слайдів у Hero`} breadcrumb="Банери">
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}>
        {!showNew && (
          <button onClick={() => { setShowNew(true); setEditing(null); setForm(EMPTY) }}
            style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#111', color:'#fff', fontSize:12, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase' as const, padding:'10px 20px', borderRadius:7, border:'none', cursor:'pointer' }}>
            <Plus size={13} /> Новий банер
          </button>
        )}
      </div>

      {showNew && (
        <BannerFormUI
          {...formProps}
          onSave={handleSaveNew}
          onCancel={() => { setShowNew(false); setForm(EMPTY) }}
        />
      )}

      {loading ? (
        <div style={{ padding:48, textAlign:'center' }}>
          <div style={{ width:32, height:32, border:'2.5px solid #F5C200', borderTopColor:'transparent', borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 12px' }} />
        </div>
      ) : banners.length === 0 && !showNew ? (
        <div style={{ background:'#fff', border:B, borderRadius:12, padding:48, textAlign:'center' }}>
          <div style={{ fontSize:40, marginBottom:12, opacity:.3 }}>🖼️</div>
          <p style={{ fontSize:14, fontWeight:600, color:'#888' }}>Банерів поки немає</p>
          <p style={{ fontSize:13, color:'#BBB', marginTop:4 }}>Додайте перший банер для головної сторінки</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {banners.map((b) => (
            <div key={b.id}>
              {editing === b.id ? (
                <BannerFormUI
                  {...formProps}
                  onSave={() => handleUpdate(b.id)}
                  onCancel={() => { setEditing(null); setForm(EMPTY) }}
                />
              ) : (
                <div style={{ background:'#fff', border:B, borderRadius:12, overflow:'hidden', opacity:b.active?1:.5, transition:'opacity .2s' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:16, padding:16 }}>
                    <GripVertical size={16} color="#DDD" style={{ cursor:'grab', flexShrink:0 }} />

                    {b.image ? (
                      <div style={{ position:'relative', width:160, height:56, borderRadius:6, overflow:'hidden', flexShrink:0, background:'#F5F5F5' }}>
                        <Image src={b.image} alt="" fill style={{ objectFit:'cover', objectPosition:b.banner_position || 'center center' }} />
                      </div>
                    ) : (
                      <div style={{ width:160, height:56, borderRadius:6, background:'#F5F5F5', flexShrink:0 }} />
                    )}

                    <div style={{ flex:1, minWidth:0 }}>
                      {b.eyebrow && (
                        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'#D4A800' }}>{b.eyebrow}</div>
                      )}
                      <div style={{ fontSize:14, fontWeight:700, color:'#111', marginTop:2 }}>{b.title}</div>
                      {b.subtitle && <div style={{ fontSize:12, color:'#888', marginTop:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{b.subtitle}</div>}
                      <div style={{ display:'flex', gap:10, marginTop:4, fontSize:11, color:'#BBB', flexWrap:'wrap' }}>
                        {b.link && <span style={{ fontFamily:'monospace' }}>→ {b.link}</span>}
                        {b.product_slug && <span>· товар: <strong style={{ color:'#666' }}>{b.product_slug}</strong></span>}
                      </div>
                    </div>

                    <div style={{ display:'flex', gap:4, flexShrink:0 }}>
                      <button onClick={() => toggleActive(b)} title={b.active ? 'Вимкнути' : 'Увімкнути'}
                        style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:b.active?'#F0FDF4':'#FEF2F2', border:B, borderRadius:7, cursor:'pointer', color:b.active?'#22C55E':'#EF4444' }}>
                        {b.active ? <Eye size={13} /> : <EyeOff size={13} />}
                      </button>
                      <button onClick={() => startEdit(b)} title="Редагувати"
                        style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F9F9', border:B, borderRadius:7, cursor:'pointer', color:'#666' }}>
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => handleDelete(b.id, b.title)} title="Видалити"
                        style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F9F9', border:B, borderRadius:7, cursor:'pointer', color:'#666' }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </AdminShell>
  )
}
