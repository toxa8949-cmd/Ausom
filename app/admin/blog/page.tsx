'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, deletePost } from '@/lib/queries'
import { BlogPost } from '@/lib/types'
import { Pencil, Trash2, Plus, Search, FileText } from 'lucide-react'
import AdminShell from '../AdminShell'

const B = '1.5px solid #EEEEEE'

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    getAllPosts().then(setPosts).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Видалити "${title}"?`)) return
    setDeleting(id)
    try { await deletePost(id); setPosts(p => p.filter(x => x.id !== id)) }
    catch { alert('Помилка видалення') }
    finally { setDeleting(null) }
  }

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminShell title="Блог" subtitle={`${posts.length} статей`} breadcrumb="Блог">
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',gap:12 }}>
        <div style={{ position:'relative',flex:1,maxWidth:360 }}>
          <Search size={14} style={{ position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#BBB',pointerEvents:'none' }} />
          <input type="text" placeholder="Пошук статей..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width:'100%',padding:'10px 14px 10px 38px',background:'#fff',border:B,borderRadius:8,fontSize:13,color:'#111',outline:'none',fontFamily:'Inter,sans-serif' }}
            onFocus={e => (e.target.style.borderColor = '#F5C200')}
            onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
        </div>
        <Link href="/admin/blog/new" style={{ display:'inline-flex',alignItems:'center',gap:6,background:'#111',color:'#fff',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase' as const,padding:'10px 20px',borderRadius:7,textDecoration:'none' }}>
          <Plus size={13} /> Нова стаття
        </Link>
      </div>

      <div style={{ background:'#fff',border:B,borderRadius:12,overflow:'hidden' }}>
        {loading ? (
          <div style={{ padding:48,textAlign:'center' }}>
            <div style={{ width:32,height:32,border:'2.5px solid #F5C200',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto 12px' }} />
            <p style={{ color:'#888',fontSize:13 }}>Завантаження...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding:48,textAlign:'center' }}>
            <FileText size={32} color="#DDD" style={{ margin:'0 auto 12px' }} />
            <p style={{ color:'#888',fontSize:14,fontWeight:600 }}>Статей поки немає</p>
            <p style={{ color:'#BBB',fontSize:13,marginTop:4 }}>Створіть першу статтю</p>
          </div>
        ) : (
          <table style={{ width:'100%',borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#FAFAFA',borderBottom:B }}>
                {['Зображення','Заголовок','Категорія','Дата',''].map(h => (
                  <th key={h} style={{ padding:'10px 16px',textAlign:'left',fontSize:10,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase' as const,color:'#AAA' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} style={{ borderBottom:i < filtered.length - 1 ? B : 'none',transition:'background .1s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FAFAFA'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}>
                  <td style={{ padding:'10px 16px',width:72 }}>
                    {p.cover_image ? (
                      <div style={{ position:'relative',width:56,height:40,borderRadius:6,overflow:'hidden',background:'#F5F5F5' }}>
                        <Image src={p.cover_image} alt="" fill style={{ objectFit:'cover' }} />
                      </div>
                    ) : (
                      <div style={{ width:56,height:40,borderRadius:6,background:'#F5F5F5',display:'flex',alignItems:'center',justifyContent:'center' }}>
                        <FileText size={16} color="#DDD" />
                      </div>
                    )}
                  </td>
                  <td style={{ padding:'10px 16px' }}>
                    <div style={{ fontWeight:600,fontSize:14,color:'#111' }}>{p.title}</div>
                    <div style={{ fontSize:12,color:'#888',marginTop:2,maxWidth:400,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{p.excerpt}</div>
                  </td>
                  <td style={{ padding:'10px 16px' }}>
                    <span style={{ fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:20,background:'#FFF8E6',color:'#92600A' }}>
                      {p.category}
                    </span>
                  </td>
                  <td style={{ padding:'10px 16px',fontSize:12,color:'#888' }}>
                    {new Date(p.published_at).toLocaleDateString('uk-UA')}
                  </td>
                  <td style={{ padding:'10px 16px' }}>
                    <div style={{ display:'flex',gap:4,justifyContent:'flex-end' }}>
                      <Link href={`/admin/blog/${p.id}`} style={{ width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',background:'#F9F9F9',border:B,borderRadius:7,color:'#666',textDecoration:'none' }}>
                        <Pencil size={13} />
                      </Link>
                      <button onClick={() => handleDelete(p.id, p.title)} disabled={deleting === p.id}
                        style={{ width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',background:'#F9F9F9',border:B,borderRadius:7,color:'#666',cursor:'pointer',opacity:deleting === p.id ? .6 : 1 }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </AdminShell>
  )
}
