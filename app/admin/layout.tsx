'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)
  const [authed,   setAuthed]   = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setAuthed(true)
      else if (pathname !== '/admin/login') router.replace('/admin/login')
      setChecking(false)
    })
  }, [pathname, router])

  if (pathname === '/admin/login') return <>{children}</>

  if (checking) return (
    <div style={{ minHeight:'100vh', background:'#F9F9F9', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:32, height:32, border:'2.5px solid #F5C200', borderTopColor:'transparent', borderRadius:'50%', animation:'spin .8s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (!authed) return null
  return <>{children}</>
}
