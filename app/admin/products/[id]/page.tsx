'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createProduct, updateProduct, getAllProducts } from '@/lib/queries'
import { Save, Plus, X, ArrowLeft } from 'lucide-react'
import AdminShell from '../../AdminShell'

interface F { name:string;slug:string;price:string;old_price:string;category:'offroad'|'commuter';voltage:'48v'|'52v'|'60v';motor:'single'|'dual';range_km:string;max_speed:string;weight_kg:string;max_load_kg:string;battery_wh:string;description:string;tag:string;in_stock:boolean;is_new:boolean;is_featured:boolean;features:string[] }

const EMPTY:F = { name:'',slug:'',price:'',old_price:'',category:'commuter',voltage:'48v',motor:'single',range_km:'',max_speed:'',weight_kg:'',max_load_kg:'',battery_wh:'',description:'',tag:'',in_stock:true,is_new:false,is_featured:false,features:[''] }

const B = '1.5px solid #EEEEEE'
const inp:React.CSSProperties = { width:'100%',padding:'11px 14px',background:'#F9F9F9',border:B,borderRadius:8,fontSize:14,color:'#111',outline:'none',fontFamily:'Inter,sans-serif',transition:'border-color .15s' }
const lbl:React.CSSProperties = { display:'block',fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#888',marginBottom:8 }

export default function ProductForm({ params }:{ params:{ id:string } }) {
  const router = useRouter()
  const isNew  = params.id==='new'
  const [form,f]    = useState<F>(EMPTY)
  const [loading,l] = useState(!isNew)
  const [saving,sv] = useState(false)
  const [error,se]  = useState('')

  const set = (k:keyof F,v:unknown)=>f(p=>({...p,[k]:v}))

  useEffect(()=>{
    if(!isNew){ getAllProducts().then(ps=>{ const p=ps.find(x=>x.id===params.id); if(p) f({name:p.name,slug:p.slug,price:String(p.price),old_price:String(p.old_price||''),category:p.category,voltage:p.voltage,motor:p.motor,range_km:String(p.range_km),max_speed:String(p.max_speed),weight_kg:String(p.weight_kg),max_load_kg:String(p.max_load_kg),battery_wh:String(p.battery_wh),description:p.description,tag:p.tag||'',in_stock:p.in_stock,is_new:p.is_new,is_featured:p.is_featured,features:p.features.length?p.features:['']}) }).finally(()=>l(false)) }
  },[isNew,params.id])

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault(); sv(true); se('')
    try {
      const data:any={name:form.name,slug:form.slug,price:parseFloat(form.price),old_price:form.old_price?parseFloat(form.old_price):null,category:form.category,voltage:form.voltage,motor:form.motor,range_km:parseInt(form.range_km),max_speed:parseInt(form.max_speed),weight_kg:parseFloat(form.weight_kg),max_load_kg:parseInt(form.max_load_kg),battery_wh:parseInt(form.battery_wh),description:form.description,tag:form.tag||null,in_stock:form.in_stock,is_new:form.is_new,is_featured:form.is_featured,features:form.features.filter(Boolean),images:[]}
      if(isNew) await createProduct(data); else await updateProduct(params.id,data)
      router.replace('/admin/products')
    } catch(e:any){ se(e.message||'Помилка збереження') } finally{ sv(false) }
  }

  const toggle=(v:boolean):React.CSSProperties=>({ display:'inline-flex',alignItems:'center',justifyContent:'center',padding:'9px 20px',borderRadius:7,border:B,fontSize:13,fontWeight:600,cursor:'pointer',transition:'all .15s',background:v?'#111':'#fff',color:v?'#fff':'#444' })

  const Card=({title,children}:{title:string;children:React.ReactNode})=>(
    <div style={{ background:'#fff',border:B,borderRadius:12,overflow:'hidden',marginBottom:16 }}>
      <div style={{ padding:'14px 20px',borderBottom:B,fontSize:13,fontWeight:700,color:'#111' }}>{title}</div>
      <div style={{ padding:'20px' }}>{children}</div>
    </div>
  )

  const I=({k,lbl:label,p,type='text',req}:{k:keyof F;lbl:string;p:string;type?:string;req?:boolean})=>(
    <div>
      <div style={lbl}>{label}</div>
      <input type={type} value={String(form[k])} onChange={e=>set(k,e.target.value)} required={req} placeholder={p} style={inp}
        onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')}/>
    </div>
  )

  if(loading) return(
    <div style={{ minHeight:'100vh',background:'#F9F9F9',display:'flex',alignItems:'center',justifyContent:'center' }}>
      <div style={{ width:32,height:32,border:'2.5px solid #F5C200',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return(
    <AdminShell title={isNew?'Новий товар':'Редагувати товар'} breadcrumb={isNew?'Новий товар':form.name}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',gap:12 }}>
        <Link href="/admin/products" style={{ display:'inline-flex',alignItems:'center',gap:6,background:'#fff',color:'#444',fontSize:12,fontWeight:600,padding:'9px 18px',borderRadius:7,border:B,textDecoration:'none' }}>
          <ArrowLeft size={13}/> Назад
        </Link>
        <button type="submit" form="pf" disabled={saving} style={{ display:'inline-flex',alignItems:'center',gap:6,background:'#111',color:'#fff',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase' as const,padding:'10px 20px',borderRadius:7,border:'none',cursor:'pointer',opacity:saving?.6:1 }}>
          <Save size={13}/> {saving?'Збереження...':'Зберегти'}
        </button>
      </div>

      {error&&<div style={{ background:'#FEF2F2',border:'1.5px solid #FECACA',color:'#DC2626',padding:'12px 16px',borderRadius:8,fontSize:13,marginBottom:16 }}>{error}</div>}

      <form id="pf" onSubmit={submit}>
        <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr',gap:16 }}>
          <div>
            <Card title="Основна інформація">
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                <I k="name" lbl="Назва *" p="Ausom DT2 Pro" req/>
                <I k="slug" lbl="Slug (URL)" p="dt2-pro"/>
                <div>
                  <div style={lbl}>Опис</div>
                  <textarea value={form.description} onChange={e=>set('description',e.target.value)} rows={4} style={{ ...inp,resize:'vertical' as const }}
                    onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} placeholder="Опис товару..."/>
                </div>
              </div>
            </Card>
            <Card title="Характеристики">
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
                <I k="range_km" lbl="Запас ходу (км)" p="70" type="number"/>
                <I k="max_speed" lbl="Швидкість (км/г)" p="65" type="number"/>
                <I k="battery_wh" lbl="Акумулятор (Wh)" p="1066" type="number"/>
                <I k="weight_kg" lbl="Вага (кг)" p="34" type="number"/>
                <I k="max_load_kg" lbl="Навантаж. (кг)" p="150" type="number"/>
                <I k="tag" lbl="Тег" p="Хіт / Топ / Новинка"/>
              </div>
            </Card>
            <Card title="Особливості">
              <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                {form.features.map((feat,i)=>(
                  <div key={i} style={{ display:'flex',gap:8 }}>
                    <input value={feat} onChange={e=>{const a=[...form.features];a[i]=e.target.value;set('features',a)}} style={{ ...inp,flex:1 }} placeholder={`Особливість ${i+1}`}
                      onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')}/>
                    {form.features.length>1&&(
                      <button type="button" onClick={()=>set('features',form.features.filter((_,j)=>j!==i))} style={{ width:38,height:38,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:'#FEF2F2',border:'1.5px solid #FECACA',borderRadius:7,cursor:'pointer',color:'#EF4444' }}>
                        <X size={14}/>
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={()=>set('features',[...form.features,''])} style={{ display:'inline-flex',alignItems:'center',gap:6,fontSize:12,fontWeight:600,color:'#666',background:'#F9F9F9',border:B,padding:'8px 14px',borderRadius:7,cursor:'pointer',width:'fit-content' }}>
                  <Plus size={12}/> Додати
                </button>
              </div>
            </Card>
          </div>

          <div>
            <Card title="Ціна">
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                <I k="price" lbl="Ціна (₴) *" p="44250" type="number" req/>
                <I k="old_price" lbl="Стара ціна (₴)" p="55300" type="number"/>
              </div>
            </Card>
            <Card title="Параметри">
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                <div>
                  <div style={lbl}>Категорія</div>
                  <select value={form.category} onChange={e=>set('category',e.target.value)} style={{ ...inp,cursor:'pointer' }}>
                    <option value="commuter">Міський</option>
                    <option value="offroad">Позашляховий</option>
                  </select>
                </div>
                <div>
                  <div style={lbl}>Напруга</div>
                  <select value={form.voltage} onChange={e=>set('voltage',e.target.value)} style={{ ...inp,cursor:'pointer' }}>
                    <option value="48v">48V</option><option value="52v">52V</option><option value="60v">60V</option>
                  </select>
                </div>
                <div>
                  <div style={lbl}>Мотор</div>
                  <div style={{ display:'flex',gap:8 }}>
                    <button type="button" onClick={()=>set('motor','single')} style={toggle(form.motor==='single')}>Одиночний</button>
                    <button type="button" onClick={()=>set('motor','dual')} style={toggle(form.motor==='dual')}>Подвійний</button>
                  </div>
                </div>
              </div>
            </Card>
            <Card title="Статус">
              <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
                {([['in_stock','В наявності'],['is_new','Новинка'],['is_featured','На головній']] as [keyof F,string][]).map(([k,l])=>(
                  <label key={String(k)} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer' }}>
                    <span style={{ fontSize:14,color:'#111' }}>{l}</span>
                    <button type="button" onClick={()=>set(k,!form[k])} style={{ width:44,height:24,borderRadius:12,border:'none',cursor:'pointer',background:(form[k] as boolean)?'#F5C200':'#EEE',transition:'background .2s',position:'relative' }}>
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
