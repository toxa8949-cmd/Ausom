'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createProduct, updateProduct, getAllProducts, uploadImage, deleteImage } from '@/lib/queries'
import { Save, Plus, X, ArrowLeft, Upload } from 'lucide-react'
import AdminShell from '../../AdminShell'

interface F {
  name:string;slug:string;price:string;old_price:string
  brand:'ausom'|'kukirin'
  category:'offroad'|'commuter';voltage:'36v'|'48v'|'52v'|'60v'|'72v';motor:'single'|'dual'
  range_km:string;max_speed:string;weight_kg:string;max_load_kg:string;battery_wh:string;description:string;tag:string
  in_stock:boolean;is_new:boolean;is_featured:boolean;features:string[];images:string[]
}

const EMPTY: F = {
  name:'',slug:'',price:'',old_price:'',
  brand:'ausom',
  category:'commuter',voltage:'48v',motor:'single',
  range_km:'',max_speed:'',weight_kg:'',max_load_kg:'',battery_wh:'',description:'',tag:'',
  in_stock:true,is_new:false,is_featured:false,features:[''],images:[]
}

const B = '1.5px solid #EEEEEE'
const inp: React.CSSProperties = { width:'100%',padding:'11px 14px',background:'#F9F9F9',border:B,borderRadius:8,fontSize:14,color:'#111',outline:'none',fontFamily:'Inter,sans-serif',transition:'border-color .15s' }
const lbl: React.CSSProperties = { display:'block',fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#888',marginBottom:8 }

// ─────────────────────────────────────────────────────────────
// CRITICAL: This component MUST be defined at module scope, not inside
// ProductFormInner. Defining it inside the parent causes React to treat
// <Card> as a NEW component type on every parent re-render — which
// re-mounts all children (including <input>), and the input loses focus
// after every single keystroke.
// ─────────────────────────────────────────────────────────────
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background:'#fff',border:B,borderRadius:12,overflow:'hidden',marginBottom:16 }}>
      <div style={{ padding:'14px 20px',borderBottom:B,fontSize:13,fontWeight:700,color:'#111' }}>{title}</div>
      <div style={{ padding:'20px' }}>{children}</div>
    </div>
  )
}

export default function ProductFormInner({ id }: { id: string }) {
  const router = useRouter()
  const isNew = id === 'new'
  const [form, setForm] = useState<F>(EMPTY)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof F, v: unknown) => setForm(p => ({ ...p, [k]: v }))

  useEffect(() => {
    if (!isNew) {
      getAllProducts().then(ps => {
        const p = ps.find(x => x.id === id)
        if (p) setForm({
          name:p.name,slug:p.slug,price:String(p.price),old_price:String(p.old_price||''),
          brand: (p.brand === 'kukirin' ? 'kukirin' : 'ausom'),
          category:p.category,voltage:p.voltage,motor:p.motor,range_km:String(p.range_km),
          max_speed:String(p.max_speed),weight_kg:String(p.weight_kg),max_load_kg:String(p.max_load_kg),
          battery_wh:String(p.battery_wh),description:p.description,tag:p.tag||'',
          in_stock:p.in_stock,is_new:p.is_new,is_featured:p.is_featured,
          features:p.features.length?p.features:[''],images:p.images||[]
        })
      }).finally(() => setLoading(false))
    }
  }, [isNew, id])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)
    try {
      const urls: string[] = []
      for (const file of Array.from(files)) {
        const url = await uploadImage(file, 'products')
        urls.push(url)
      }
      set('images', [...form.images, ...urls])
    } catch (err: any) {
      alert('Помилка завантаження: ' + (err.message || ''))
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const removeImage = async (idx: number) => {
    const url = form.images[idx]
    try { await deleteImage(url) } catch {}
    set('images', form.images.filter((_, i) => i !== idx))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError('')
    try {
      const data: any = {
        name:form.name,slug:form.slug,price:parseFloat(form.price),
        old_price:form.old_price?parseFloat(form.old_price):null,
        brand:form.brand,
        category:form.category,voltage:form.voltage,motor:form.motor,
        range_km:parseInt(form.range_km),max_speed:parseInt(form.max_speed),
        weight_kg:parseFloat(form.weight_kg),max_load_kg:parseInt(form.max_load_kg),
        battery_wh:parseInt(form.battery_wh),description:form.description,
        tag:form.tag||null,in_stock:form.in_stock,is_new:form.is_new,
        is_featured:form.is_featured,features:form.features.filter(Boolean),
        images:form.images
      }
      if (isNew) await createProduct(data); else await updateProduct(id, data)
      router.replace('/admin/products')
    } catch (e: any) { setError(e.message || 'Помилка збереження') }
    finally { setSaving(false) }
  }

  const toggle = (v: boolean): React.CSSProperties => ({
    display:'inline-flex',alignItems:'center',justifyContent:'center',
    padding:'9px 20px',borderRadius:7,border:B,fontSize:13,fontWeight:600,
    cursor:'pointer',transition:'all .15s',
    background:v?'#111':'#fff',color:v?'#fff':'#444'
  })
  const brandToggle = (v: boolean): React.CSSProperties => ({
    ...toggle(v),
    background: v ? '#F5C200' : '#fff',
    color:      v ? '#111'    : '#444',
    borderColor:v ? '#F5C200' : '#EEEEEE',
  })

  if (loading) return (
    <div style={{ minHeight:'100vh',background:'#F9F9F9',display:'flex',alignItems:'center',justifyContent:'center' }}>
      <div style={{ width:32,height:32,border:'2.5px solid #F5C200',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <AdminShell title={isNew ? 'Новий товар' : 'Редагувати товар'} breadcrumb={isNew ? 'Новий товар' : form.name}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',gap:12 }}>
        <Link href="/admin/products" style={{ display:'inline-flex',alignItems:'center',gap:6,background:'#fff',color:'#444',fontSize:12,fontWeight:600,padding:'9px 18px',borderRadius:7,border:B,textDecoration:'none' }}>
          <ArrowLeft size={13}/> Назад
        </Link>
        <button type="submit" form="pf" disabled={saving} style={{ display:'inline-flex',alignItems:'center',gap:6,background:'#111',color:'#fff',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase' as const,padding:'10px 20px',borderRadius:7,border:'none',cursor:'pointer',opacity:saving?.6:1 }}>
          <Save size={13}/> {saving ? 'Збереження...' : 'Зберегти'}
        </button>
      </div>

      {error && <div style={{ background:'#FEF2F2',border:'1.5px solid #FECACA',color:'#DC2626',padding:'12px 16px',borderRadius:8,fontSize:13,marginBottom:16 }}>{error}</div>}

      <form id="pf" onSubmit={submit}>
        <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr',gap:16 }} className="grid-2-1">
          <div>
            <Card title="Основна інформація">
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                <div><div style={lbl}>Назва *</div><input value={form.name} onChange={e => set('name', e.target.value)} required placeholder="Ausom DT2 Pro" style={inp} onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} /></div>
                <div><div style={lbl}>Slug (URL)</div><input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="dt2-pro" style={inp} onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} /></div>
                <div><div style={lbl}>Опис</div><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4} style={{...inp,resize:'vertical' as const}} placeholder="Опис товару..." onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} /></div>
              </div>
            </Card>

            <Card title="Зображення">
              <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:14 }}>
                {form.images.map((url, i) => (
                  <div key={i} style={{ position:'relative',aspectRatio:'1',borderRadius:8,overflow:'hidden',border:B,background:'#F9F9F9' }}>
                    <Image src={url} alt={`Фото ${i+1}`} fill style={{ objectFit:'cover' }} />
                    <button type="button" onClick={() => removeImage(i)} style={{ position:'absolute',top:4,right:4,width:24,height:24,borderRadius:6,background:'rgba(0,0,0,.7)',border:'none',color:'#fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center' }}><X size={12}/></button>
                    {i===0 && <span style={{ position:'absolute',bottom:4,left:4,fontSize:9,fontWeight:700,background:'#F5C200',color:'#111',padding:'2px 6px',borderRadius:4 }}>ГОЛОВНЕ</span>}
                  </div>
                ))}
                <label style={{ aspectRatio:'1',borderRadius:8,border:'2px dashed #DDD',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:uploading?'wait':'pointer',background:'#FAFAFA' }}>
                  <input type="file" accept="image/*" multiple onChange={handleUpload} style={{ display:'none' }} disabled={uploading} />
                  {uploading ? <div style={{ width:20,height:20,border:'2px solid #F5C200',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite' }}/> : <><Upload size={18} color="#BBB"/><span style={{ fontSize:10,color:'#BBB',marginTop:6,fontWeight:600 }}>Додати</span></>}
                </label>
              </div>
              <p style={{ fontSize:11,color:'#BBB' }}>Перше зображення — головне. JPG, PNG, WebP до 5MB.</p>
            </Card>

            <Card title="Характеристики">
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
                <div><div style={lbl}>Запас ходу (км)</div><input type="number" value={form.range_km} onChange={e => set('range_km', e.target.value)} placeholder="70" style={inp} onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} /></div>
                <div><div style={lbl}>Швидкість (км/г)</div><input type="number" value={form.max_speed} onChange={e => set('max_speed', e.target.value)} placeholder="65" style={inp} onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} /></div>
                <div><div style={lbl}>Акумулятор (Wh)</div><input type="number" value={form.battery_wh} onChange={e => set('battery_wh', e.target.value)} placeholder="1066" style={inp} onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} /></div>
                <div><div style={lbl}>Вага (кг)</div><input type="number" value={form.weight_kg} onChange={e => set('weight_kg', e.target.value)} placeholder="34" style={inp} onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} /></div>
                <div><div style={lbl}>Навантаж. (кг)</div><input type="number" value={form.max_load_kg} onChange={e => set('max_load_kg', e.target.value)} placeholder="150" style={inp} onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} /></div>
                <div><div style={lbl}>Тег</div><input value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="Хіт / Топ / Новинка" style={inp} onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} /></div>
              </div>
            </Card>

            <Card title="Особливості">
              <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                {form.features.map((feat, i) => (
                  <div key={i} style={{ display:'flex',gap:8 }}>
                    <input value={feat} onChange={e => { const a=[...form.features]; a[i]=e.target.value; set('features',a) }} style={{...inp,flex:1}} placeholder={`Особливість ${i+1}`} onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} />
                    {form.features.length>1 && <button type="button" onClick={() => set('features',form.features.filter((_,j)=>j!==i))} style={{ width:38,height:38,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:'#FEF2F2',border:'1.5px solid #FECACA',borderRadius:7,cursor:'pointer',color:'#EF4444' }}><X size={14}/></button>}
                  </div>
                ))}
                <button type="button" onClick={() => set('features',[...form.features,''])} style={{ display:'inline-flex',alignItems:'center',gap:6,fontSize:12,fontWeight:600,color:'#666',background:'#F9F9F9',border:B,padding:'8px 14px',borderRadius:7,cursor:'pointer',width:'fit-content' }}><Plus size={12}/> Додати</button>
              </div>
            </Card>
          </div>

          <div>
            <Card title="Бренд">
              <div style={{ display:'flex',gap:8 }}>
                <button type="button" onClick={() => set('brand','ausom')} style={brandToggle(form.brand==='ausom')}>Ausom</button>
                <button type="button" onClick={() => set('brand','kukirin')} style={brandToggle(form.brand==='kukirin')}>Kukirin</button>
              </div>
              <p style={{ fontSize:11, color:'#BBB', marginTop:10, lineHeight:1.5 }}>
                Kukirin — товари партнера. Не впливає на візуал, тільки на фільтр у меню сайту.
              </p>
            </Card>

            <Card title="Ціна">
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                <div><div style={lbl}>Ціна (₴) *</div><input type="number" value={form.price} onChange={e => set('price', e.target.value)} required placeholder="44250" style={inp} onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} /></div>
                <div><div style={lbl}>Стара ціна (₴)</div><input type="number" value={form.old_price} onChange={e => set('old_price', e.target.value)} placeholder="55300" style={inp} onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} /></div>
              </div>
            </Card>
            <Card title="Параметри">
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                <div><div style={lbl}>Категорія</div><select value={form.category} onChange={e => set('category',e.target.value as F['category'])} style={{...inp,cursor:'pointer'}}><option value="commuter">Міський</option><option value="offroad">Позашляховий</option></select></div>
                <div><div style={lbl}>Напруга</div><select value={form.voltage} onChange={e => set('voltage',e.target.value as F['voltage'])} style={{...inp,cursor:'pointer'}}><option value="36v">36V</option><option value="48v">48V</option><option value="52v">52V</option><option value="60v">60V</option><option value="72v">72V</option></select></div>
                <div>
                  <div style={lbl}>Мотор</div>
                  <div style={{ display:'flex',gap:8 }}>
                    <button type="button" onClick={() => set('motor','single')} style={toggle(form.motor==='single')}>Одиночний</button>
                    <button type="button" onClick={() => set('motor','dual')} style={toggle(form.motor==='dual')}>Подвійний</button>
                  </div>
                </div>
              </div>
            </Card>
            <Card title="Статус">
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                {([['in_stock','В наявності'],['is_new','Новинка'],['is_featured','На головній']] as [keyof F,string][]).map(([k,la]) => (
                  <label key={String(k)} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer' }}>
                    <span style={{ fontSize:14,color:'#111' }}>{la}</span>
                    <button type="button" onClick={() => set(k,!form[k])} style={{ width:44,height:24,borderRadius:12,border:'none',cursor:'pointer',background:(form[k] as boolean)?'#F5C200':'#EEE',transition:'background .2s',position:'relative' }}>
                      <span style={{ position:'absolute',top:3,width:18,height:18,borderRadius:'50%',background:'#fff',boxShadow:'0 1px 4px rgba(0,0,0,.2)',transition:'left .2s',left:(form[k] as boolean)?23:3 }}/>
                    </button>
                  </label>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </form>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </AdminShell>
  )
}
