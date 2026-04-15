'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Zap, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [email,    setEmail]   = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]  = useState(false)
  const [loading,  setLoading] = useState(false)
  const [error,    setError]   = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Невірний email або пароль'); setLoading(false) }
    else router.replace('/admin')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="w-full max-w-[380px]">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <Zap size={20} className="text-[var(--brand)]" strokeWidth={2.5}/>
          <span className="font-display text-[26px] tracking-[.08em] text-white">AUSOM UA</span>
          <sup className="font-sans text-[10px] font-bold text-[var(--brand)] tracking-normal -mt-2">Admin</sup>
        </div>

        <div className="bg-[#111111] border border-[var(--border)] rounded-2xl p-8">
          <h1 className="font-display text-[28px] text-white tracking-wide mb-1">Вхід</h1>
          <p className="text-[13px] text-[#666] mb-7">Адмін-панель Ausom Ukraine</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[.08em] text-[#666] mb-2">Email</label>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="admin@ausom.ua"
                className="w-full bg-[#1A1A1A] border border-[var(--border)] rounded-lg px-4 py-3 text-[14px] text-white placeholder:text-[#666] outline-none focus:border-[var(--brand)] transition-colors"/>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[.08em] text-[#666] mb-2">Пароль</label>
              <div className="relative">
                <input type={showPw?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••"
                  className="w-full bg-[#1A1A1A] border border-[var(--border)] rounded-lg px-4 py-3 pr-11 text-[14px] text-white placeholder:text-[#666] outline-none focus:border-[var(--brand)] transition-colors"/>
                <button type="button" onClick={()=>setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white transition-colors">
                  {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2 disabled:opacity-60">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-[#111]/40 border-t-[var(--black)] rounded-full animate-spin"/>Вхід...</>
              ) : 'Увійти'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
