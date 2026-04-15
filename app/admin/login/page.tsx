'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Невірний email або пароль')
      setLoading(false)
    } else {
      router.replace('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-display text-3xl tracking-widest text-white">
            AUSOM <span className="text-[#ff5c00]">UA</span>
          </span>
          <p className="text-white/40 text-sm mt-2">Адмін-панель</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#ff5c00] rounded-xl flex items-center justify-center">
              <Lock size={18} color="white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Вхід</h1>
              <p className="text-[#888884] text-sm">Введи свої дані для входу</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@ausom.ua"
                required
                className="w-full bg-[#f4f4f2] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff5c00] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Пароль</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#f4f4f2] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#ff5c00] transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888884] hover:text-[#0b0b0b]"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Вхід...
                </span>
              ) : 'Увійти'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
