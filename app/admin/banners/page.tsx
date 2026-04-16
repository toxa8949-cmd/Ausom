'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getAllBanners, createBanner, updateBanner, deleteBanner, uploadImage, Banner } from '@/lib/queries'
import { Plus, Trash2, Save, Upload, X, GripVertical, Eye, EyeOff } from 'lucide-react'
import AdminShell from '../AdminShell'

const B = '1.5px solid #EEEEEE'
const inp: React.CSSProperties = { width:'100%',padding:'10px 14px',background:'#F9F9F9',border:B,borderRadius:8,fontSize:13,color:'#111',outline:'none',fontFamily:'Inter,sans-serif' }

interface BannerForm {
  title: string; subtitle: string; link: string; image: string; active: boolean
}

const EMPTY: BannerForm = { title:'', subtitle:'', link:'', image:'', active:true }

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<BannerForm>(EMPTY)
  const [showNew, setShowNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const load = () => getAllBanners().then(setBanners).catch(() => {}).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const set = (k: keyof BannerForm, v: any) => setForm(p => ({ ...p, [k]: v }))

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file, 'banners')
      set('image', url)
    } catch (err: any) { alert('Помилка: ' + (err.message || '')) }
    finally { setUploading(false); e.target.value = '' }
  }

  const handleSaveNew = async () => {
    if (!form.title || !form.image) { alert('Заповніть назву та завантажте зображення'); return }
    setSaving(true)
    try {
      await createBanner({ ...form, position: banners.length })
      setShowNew(false); setForm(EMPTY); await load()
    } catch (e: any) { alert(e.message) }
    finally { setSaving(false) }
  }

  const handleUpdate = async (id: string) => {
    setSaving(true)
    try {
      await updateBanner(id, form)
      setEditing(null); setForm(EMPTY); await load()
    } catch (e: any) { alert(e.message) }
    finally { setSaving(false) }
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
    setForm({ title:b.title, subtitle:b.subtitle, link:b.link, image:b.image, active:b.active })
    setShowNew(false)
  }

  const BannerFormUI = ({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) => (
    <div style={{ background:'#fff',border:B,borderRadius:12,padding:20,marginBottom:16 }}>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12 }}>
        <div>
          <div style={{ fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'#888',marginBottom:6 }}>Заголовок *</div>
          <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Весняний розпродаж" style={inp}
            onFocus={e => (e.target.style.borderColor = '#F5C200')} onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
        </div>
        <div>
          <div style={{ fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'#888',marginBottom:6 }}>Підзаголовок</div>
          <input value={form.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="Знижки до -20%" style={inp}
            onFocus={e => (e.target.style.borderColor = '#F5C200')} onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
        </div>
      </div>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'#888',marginBottom:6 }}>Посилання</div>
        <input value={form.link} onChange={e => set('link', e.target.value)} placeholder="/sale" style={inp}
          onFocus={e => (e.target.style.borderColor = '#F5C200')} onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
      </div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'#888',marginBottom:6 }}>Зображення *</div>
        {form.image ? (
          <div style={{ position:'relative',aspectRatio:'3/1',borderRadius:8,overflow:'hidden',border:B }}>
            <Image src={form.image} alt="" fill style={{ objectFit:'cover' }} />
            <button type="button" onClick={() => set('image', '')}
              style={{ position:'absolute',top:6,right:6,width:28,height:28,borderRadius:6,background:'rgba(0,0,0,.7)',border:'none',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}>
              <X size={14} />
            </button>
          </div>
        ) : (
          <label style={{ display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px',borderRadius:8,border:'2px dashed #DDD',cursor:uploading?'wait':'pointer',background:'#FAFAFA' }}>
            <input type="file" accept="image/*" onChange={handleUpload} style={{ display:'none' }} disabled={uploading} />
            {uploading ? (
              <div style={{ width:20,height:20,border:'2px solid #F5C200',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite' }} />
            ) : (
              <>
                <Upload size={20} color="#BBB" />
                <span style={{ fontSize:11,color:'#888',marginTop:6,fontWeight:600 }}>Завантажити (рекомендовано 1920×640)</span>
              </>
            )}
          </label>
        )}
      </div>
      <div style={{ display:'flex',gap:8,justifyContent:'flex-end' }}>
        <button onClick={onCancel} style={{ padding:'9px 18px',borderRadius:7,border:B,background:'#fff',fontSize:12,fontWeight:600,color:'#666',cursor:'pointer' }}>Скасувати</button>
        <button onClick={onSave} disabled={saving}
          style={{ display:'inline-flex',alignItems:'center',gap:6,padding:'9px 18px',borderRadius:7,border:'none',background:'#111',fontSize:12,fontWeight:700,color:'#fff',cursor:'pointer',opacity:saving?.6:1 }}>
          <Save size={12} /> {saving ? 'Збереження...' : 'Зберегти'}
        </button>
      </div>
    </div>
  )

  return (
    <AdminShell title="Банери" subtitle={`${banners.length} банерів`} breadcrumb="Банери">
      <div style={{ display:'flex',justifyContent:'flex-end',marginBottom:20 }}>
        {!showNew && (
          <button onClick={() => { setShowNew(true); setEditing(null); setForm(EMPTY) }}
            style={{ display:'inline-flex',alignItems:'center',gap:6,background:'#111',color:'#fff',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase' as const,padding:'10px 20px',borderRadius:7,border:'none',cursor:'pointer' }}>
            <Plus size={13} /> Новий банер
          </button>
        )}
      </div>

      {showNew && <BannerFormUI onSave={handleSaveNew} onCancel={() => { setShowNew(false); setForm(EMPTY) }} />}

      {loading ? (
        <div style={{ padding:48,textAlign:'center' }}>
          <div style={{ width:32,height:32,border:'2.5px solid #F5C200',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto 12px' }} />
        </div>
      ) : banners.length === 0 && !showNew ? (
        <div style={{ background:'#fff',border:B,borderRadius:12,padding:48,textAlign:'center' }}>
          <div style={{ fontSize:40,marginBottom:12,opacity:.3 }}>🖼️</div>
          <p style={{ fontSize:14,fontWeight:600,color:'#888' }}>Банерів поки немає</p>
          <p style={{ fontSize:13,color:'#BBB',marginTop:4 }}>Додайте перший банер для головної сторінки</p>
        </div>
      ) : (
        <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
          {banners.map((b) => (
            <div key={b.id}>
              {editing === b.id ? (
                <BannerFormUI onSave={() => handleUpdate(b.id)} onCancel={() => { setEditing(null); setForm(EMPTY) }} />
              ) : (
                <div style={{ background:'#fff',border:B,borderRadius:12,overflow:'hidden',opacity:b.active?1:.5,transition:'opacity .2s' }}>
                  <div style={{ display:'flex',alignItems:'center',gap:16,padding:16 }}>
                    <GripVertical size={16} color="#DDD" style={{ cursor:'grab',flexShrink:0 }} />

                    {b.image ? (
                      <div style={{ position:'relative',width:160,height:56,borderRadius:6,overflow:'hidden',flexShrink:0,background:'#F5F5F5' }}>
                        <Image src={b.image} alt="" fill style={{ objectFit:'cover' }} />
                      </div>
                    ) : (
                      <div style={{ width:160,height:56,borderRadius:6,background:'#F5F5F5',flexShrink:0 }} />
                    )}

                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ fontSize:14,fontWeight:700,color:'#111' }}>{b.title}</div>
                      {b.subtitle && <div style={{ fontSize:12,color:'#888',marginTop:2 }}>{b.subtitle}</div>}
                      {b.link && <div style={{ fontSize:11,color:'#BBB',marginTop:2,fontFamily:'monospace' }}>{b.link}</div>}
                    </div>

                    <div style={{ display:'flex',gap:4,flexShrink:0 }}>
                      <button onClick={() => toggleActive(b)} title={b.active ? 'Вимкнути' : 'Увімкнути'}
                        style={{ width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',background:b.active?'#F0FDF4':'#FEF2F2',border:B,borderRadius:7,cursor:'pointer',color:b.active?'#22C55E':'#EF4444' }}>
                        {b.active ? <Eye size={13} /> : <EyeOff size={13} />}
                      </button>
                      <button onClick={() => startEdit(b)}
                        style={{ width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',background:'#F9F9F9',border:B,borderRadius:7,cursor:'pointer',color:'#666' }}>
                        <Save size={13} />
                      </button>
                      <button onClick={() => handleDelete(b.id, b.title)}
                        style={{ width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',background:'#F9F9F9',border:B,borderRadius:7,cursor:'pointer',color:'#666' }}>
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
