'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Невірний email або пароль'); setLoading(false) }
    else router.replace('/admin')
  }

  const border = '1.5px solid #EEEEEE'
  const inp: React.CSSProperties = {
    width:'100%', padding:'12px 16px',
    background:'#F9F9F9', border, borderRadius:8,
    fontSize:14, color:'#111', outline:'none',
    fontFamily:'Inter,sans-serif', transition:'border-color .15s',
  }

  return (
    <div style={{ minHeight:'100vh', background:'#F9F9F9', display:'flex', alignItems:'center', justifyContent:'center', padding:24, fontFamily:'Inter,sans-serif' }}>
      <div style={{ width:'100%', maxWidth:380 }}>

        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:36 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="#F5C200"/>
          </svg>
          <span style={{ fontWeight:800, fontSize:20, letterSpacing:'-.02em', color:'#111' }}>AUSOM UA</span>
          <span style={{ fontSize:9, fontWeight:800, background:'#111', color:'#fff', padding:'2px 7px', borderRadius:4, letterSpacing:'.04em' }}>ADMIN</span>
        </div>

        <div style={{ background:'#fff', border, borderRadius:14, padding:32 }}>
          <h1 style={{ fontSize:24, fontWeight:800, letterSpacing:'-.02em', color:'#111', marginBottom:6 }}>Вхід</h1>
          <p style={{ fontSize:13, color:'#888', marginBottom:24 }}>Адмін-панель Ausom Ukraine</p>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'#888', marginBottom:8 }}>Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="admin@ausom.ua" style={inp}
                onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')}/>
            </div>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'#888', marginBottom:8 }}>Пароль</label>
              <div style={{ position:'relative' }}>
                <input type={showPw?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••" style={{ ...inp, paddingRight:44 }}
                  onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')}/>
                <button type="button" onClick={()=>setShowPw(!showPw)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#AAA', display:'flex' }}>
                  {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            {error && (
              <p style={{ fontSize:13, color:'#DC2626', background:'#FEF2F2', border:'1px solid #FECACA', padding:'10px 14px', borderRadius:8 }}>{error}</p>
            )}

            <button type="submit" disabled={loading} style={{
              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
              background:'#111', color:'#fff', fontSize:13, fontWeight:700,
              letterSpacing:'.06em', textTransform:'uppercase' as const,
              padding:'13px', borderRadius:8, border:'none', cursor:'pointer',
              opacity: loading ? .6 : 1, marginTop:4,
              fontFamily:'Inter,sans-serif',
            }}>
              {loading ? <><span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'spin .7s linear infinite' }}/> Вхід...</> : 'Увійти'}
            </button>
          </form>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
