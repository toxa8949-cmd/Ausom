'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[var(--text)] py-16">
        <div className="container-wide">
          <span className="section-label">Контакти</span>
          <h1 className="section-heading text-white">
            Зв'яжись <span className="text-[var(--brand-dk)]">з нами</span>
          </h1>
        </div>
      </div>

      <div className="container-wide py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact info */}
          <div>
            <h2 className="text-xl font-bold mb-8">Наші контакти</h2>
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'support@ausom.ua' },
                { icon: Phone, label: 'Телефон', value: '+38 (067) 000-00-00' },
                { icon: MapPin, label: 'Адреса', value: 'м. Київ, вул. Хрещатик 1' },
                { icon: Clock, label: 'Години роботи', value: 'Пн–Пт: 9:00–18:00' },
              ].map(c => {
                const Icon = c.icon
                return (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-[var(--bg-surface)] rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[var(--brand-dk)]" />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-3)] font-medium uppercase tracking-wider mb-0.5">{c.label}</div>
                      <div className="font-semibold">{c.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-xl font-bold mb-8">Написати нам</h2>
            {sent ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-bold text-lg mb-2">Повідомлення надіслано!</h3>
                <p className="text-[var(--text-3)] text-sm">Ми відповімо протягом 24 годин.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: 'name', label: "Ім'я", type: 'text', placeholder: 'Іван Іванов' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'ivan@email.com' },
                  { id: 'phone', label: 'Телефон', type: 'tel', placeholder: '+38 (067) 000-00-00' },
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-sm font-medium mb-1.5">{f.label}</label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      className="w-full bg-[var(--bg-surface)] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--brand-dk)] transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Повідомлення</label>
                  <textarea
                    rows={5}
                    placeholder="Ваше питання або коментар..."
                    required
                    className="w-full bg-[var(--bg-surface)] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--brand-dk)] transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  Надіслати повідомлення
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
