'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Store, Truck, Bell } from 'lucide-react'
import AdminShell from '../AdminShell'

const B = '1.5px solid #EEEEEE'
const inp: React.CSSProperties = { width:'100%',padding:'11px 14px',background:'#F9F9F9',border:B,borderRadius:8,fontSize:14,color:'#111',outline:'none',fontFamily:'Inter,sans-serif',transition:'border-color .15s' }
const lbl: React.CSSProperties = { display:'block',fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#888',marginBottom:8 }

async function loadSetting(key: string, fallback: any) {
  const { data } = await supabase.from('settings').select('value').eq('key', key).single()
  return data?.value ?? fallback
}

async function saveSetting(key: string, value: any) {
  await supabase.from('settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
}

const STORE_DEFAULT = { name:'Ausom Ukraine', email:'support@ausom.ua', phone:'+38 (067) 000-00-00', address:'м. Київ, вул. Хрещатик 1', currency:'UAH' }
const DELIVERY_DEFAULT = { freeShipping:true, freeFrom:'0', novaPoshta:true, ukrPoshta:true, courier:true }
const NOTIF_DEFAULT = { newOrder:true, orderStatus:true, lowStock:false, newsletter:true }

export default function AdminSettings() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('store')

  const [store, setStore] = useState(STORE_DEFAULT)
  const [delivery, setDelivery] = useState(DELIVERY_DEFAULT)
  const [notifications, setNotifications] = useState(NOTIF_DEFAULT)

  useEffect(() => {
    Promise.all([
      loadSetting('store', STORE_DEFAULT),
      loadSetting('delivery', DELIVERY_DEFAULT),
      loadSetting('notifications', NOTIF_DEFAULT),
    ]).then(([s, d, n]) => {
      setStore(s); setDelivery(d); setNotifications(n)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await Promise.all([
        saveSetting('store', store),
        saveSetting('delivery', delivery),
        saveSetting('notifications', notifications),
      ])
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e: any) {
      alert('Помилка збереження: ' + (e.message || ''))
    } finally {
      setSaving(false)
    }
  }

  const Card = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
    <div style={{ background:'#fff',border:B,borderRadius:12,overflow:'hidden',marginBottom:16 }}>
      <div style={{ padding:'14px 20px',borderBottom:B,fontSize:13,fontWeight:700,color:'#111',display:'flex',alignItems:'center',gap:8 }}>
        <Icon size={14} color="#D4A800" />{title}
      </div>
      <div style={{ padding:20 }}>{children}</div>
    </div>
  )

  const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <label style={{ display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer',padding:'4px 0' }}>
      <span style={{ fontSize:14,color:'#111' }}>{label}</span>
      <button type="button" onClick={onChange}
        style={{ width:44,height:24,borderRadius:12,border:'none',cursor:'pointer',background:checked?'#F5C200':'#EEE',transition:'background .2s',position:'relative' }}>
        <span style={{ position:'absolute',top:3,width:18,height:18,borderRadius:'50%',background:'#fff',boxShadow:'0 1px 4px rgba(0,0,0,.2)',transition:'left .2s',left:checked?23:3 }} />
      </button>
    </label>
  )

  const tabs = [
    { id:'store', label:'Магазин', Icon: Store },
    { id:'delivery', label:'Доставка', Icon: Truck },
    { id:'notifications', label:'Сповіщення', Icon: Bell },
  ]

  if (loading) return (
    <AdminShell title="Налаштування" breadcrumb="Налаштування">
      <div style={{ padding:48,textAlign:'center' }}>
        <div style={{ width:32,height:32,border:'2.5px solid #F5C200',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto' }} />
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </AdminShell>
  )

  return (
    <AdminShell title="Налаштування" breadcrumb="Налаштування">
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20 }}>
        <div style={{ display:'flex',gap:4,background:'#fff',border:B,borderRadius:10,padding:4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ display:'flex',alignItems:'center',gap:6,padding:'8px 16px',borderRadius:7,border:'none',cursor:'pointer',fontSize:13,fontWeight:600,transition:'all .15s',
                background:tab===t.id?'#111':'transparent',color:tab===t.id?'#fff':'#666' }}>
              <t.Icon size={13} />{t.label}
            </button>
          ))}
        </div>
        <button onClick={handleSave} disabled={saving}
          style={{ display:'inline-flex',alignItems:'center',gap:6,background:saved?'#22C55E':'#111',color:'#fff',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase' as const,padding:'10px 20px',borderRadius:7,border:'none',cursor:'pointer',transition:'background .2s' }}>
          <Save size={13} />{saving ? 'Збереження...' : saved ? 'Збережено ✓' : 'Зберегти'}
        </button>
      </div>

      {tab === 'store' && (
        <Card title="Інформація про магазин" icon={Store}>
          <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
            <div>
              <div style={lbl}>Назва магазину</div>
              <input value={store.name} onChange={e => setStore({...store, name:e.target.value})} style={inp}
                onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} />
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
              <div>
                <div style={lbl}>Email</div>
                <input value={store.email} onChange={e => setStore({...store, email:e.target.value})} style={inp}
                  onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} />
              </div>
              <div>
                <div style={lbl}>Телефон</div>
                <input value={store.phone} onChange={e => setStore({...store, phone:e.target.value})} style={inp}
                  onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} />
              </div>
            </div>
            <div>
              <div style={lbl}>Адреса</div>
              <input value={store.address} onChange={e => setStore({...store, address:e.target.value})} style={inp}
                onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} />
            </div>
            <div>
              <div style={lbl}>Валюта</div>
              <select value={store.currency} onChange={e => setStore({...store, currency:e.target.value})} style={{...inp,cursor:'pointer'}}>
                <option value="UAH">₴ Гривня (UAH)</option>
                <option value="USD">$ Долар (USD)</option>
                <option value="EUR">€ Євро (EUR)</option>
              </select>
            </div>
          </div>
        </Card>
      )}

      {tab === 'delivery' && (
        <Card title="Налаштування доставки" icon={Truck}>
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <Toggle label="Безкоштовна доставка" checked={delivery.freeShipping} onChange={() => setDelivery({...delivery, freeShipping:!delivery.freeShipping})} />
            {delivery.freeShipping && (
              <div>
                <div style={lbl}>Безкоштовно від (₴)</div>
                <input type="number" value={delivery.freeFrom} onChange={e => setDelivery({...delivery, freeFrom:e.target.value})} style={inp} placeholder="0 — завжди безкоштовно"
                  onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')} />
              </div>
            )}
            <div style={{ height:1,background:'#EEE' }} />
            <p style={{ fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'#888' }}>Способи доставки</p>
            <Toggle label="Нова Пошта" checked={delivery.novaPoshta} onChange={() => setDelivery({...delivery, novaPoshta:!delivery.novaPoshta})} />
            <Toggle label="Укрпошта" checked={delivery.ukrPoshta} onChange={() => setDelivery({...delivery, ukrPoshta:!delivery.ukrPoshta})} />
            <Toggle label="Кур'єр (Київ)" checked={delivery.courier} onChange={() => setDelivery({...delivery, courier:!delivery.courier})} />
          </div>
        </Card>
      )}

      {tab === 'notifications' && (
        <Card title="Сповіщення" icon={Bell}>
          <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
            <Toggle label="Нове замовлення" checked={notifications.newOrder} onChange={() => setNotifications({...notifications, newOrder:!notifications.newOrder})} />
            <Toggle label="Зміна статусу замовлення" checked={notifications.orderStatus} onChange={() => setNotifications({...notifications, orderStatus:!notifications.orderStatus})} />
            <Toggle label="Мало товару на складі" checked={notifications.lowStock} onChange={() => setNotifications({...notifications, lowStock:!notifications.lowStock})} />
            <Toggle label="Нова підписка на розсилку" checked={notifications.newsletter} onChange={() => setNotifications({...notifications, newsletter:!notifications.newsletter})} />
          </div>
        </Card>
      )}
    </AdminShell>
  )
}
