import { useState } from 'react'
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { company } from '../data/siteData'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organisation: '',
    interest: 'school-partnership',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong')
      }
      setStatus('success')
      setForm({ name: '', email: '', organisation: '', interest: 'school-partnership', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Failed to send. Please try again or email us directly.')
    }
  }

  return (
    <div>
      <section className="bg-slate-900 text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Schools, parents, educators, and partners — we would be honoured to explore how STEM Quest can serve you.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-xl font-semibold text-slate-900">Get in touch</h2>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                  Whether you represent a school seeking a STEM partner, a parent looking for after-school or holiday programmes, or an organisation interested in collaboration — reach out.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Email</p>
                    <a href={`mailto:${company.email}`} className="text-sm text-primary-600 hover:underline">
                      {company.email}
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Location</p>
                    <p className="text-sm text-slate-600">{company.location}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-primary-50 border border-primary-100 p-4 text-sm text-slate-700">
                <p className="font-medium text-primary-800">For schools</p>
                <p className="mt-1">We offer structured partnership proposals aligned to your development priorities. Initial conversations typically lead to a formal proposal within 1–2 weeks.</p>
              </div>
            </div>

            <div className="lg:col-span-3">
              {status === 'success' ? (
                <div className="card flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 className="h-12 w-12 text-accent-500" />
                  <h3 className="mt-4 font-display text-xl font-semibold text-slate-900">Message sent</h3>
                  <p className="mt-2 text-slate-600">Thank you. We will respond as soon as possible.</p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-semibold text-primary-600 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                        Full name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="organisation" className="block text-sm font-medium text-slate-700">
                      School / Organisation
                    </label>
                    <input
                      id="organisation"
                      name="organisation"
                      value={form.organisation}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-slate-700">
                      I am interested in
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    >
                      <option value="school-partnership">School partnership</option>
                      <option value="robotics-club">After-school robotics club</option>
                      <option value="teacher-training">Teacher training workshop</option>
                      <option value="holiday-bootcamp">Holiday bootcamp</option>
                      <option value="other">Other / general enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-y"
                    />
                  </div>
                  {status === 'error' && (
                    <p className="text-sm text-red-600">{errorMsg}</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full sm:w-auto disabled:opacity-60"
                  >
                    {status === 'loading' ? 'Sending…' : (
                      <>
                        <Send className="h-4 w-4" /> Send message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
