import { useState } from 'react'
import { CheckCircle2, UserPlus } from 'lucide-react'
import { packages } from '../data/siteData'

export default function Enroll() {
  const [form, setForm] = useState({
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    learnerName: '',
    learnerGrade: '',
    programme: 'robotics-club',
    packageInterest: '',
    notes: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    // Validate 10-digit South African Phone Number
    const saPhoneRegex = /^(0[1-9]\d{8}|\+27[1-9]\d{8})$/
    const cleanedPhone = form.parentPhone.replace(/\s+/g, '')
    if (!saPhoneRegex.test(cleanedPhone)) {
      setStatus('error')
      setErrorMsg('Please enter a valid 10-digit South African phone number starting with 0 (e.g. 0821234567 or 0111234567).')
      return
    }

    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, parentPhone: cleanedPhone }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong')
      }
      setStatus('success')
      setForm({
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        learnerName: '',
        learnerGrade: '',
        programme: 'robotics-club',
        packageInterest: '',
        notes: '',
      })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Failed to submit. Please try again or contact us directly.')
    }
  }

  return (
    <div>
      <section className="bg-slate-900 text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Enroll</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Register interest for a learner, school partnership, or workshop. We will follow up with next steps.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {status === 'success' ? (
            <div className="card flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 className="h-12 w-12 text-accent-500" />
              <h3 className="mt-4 font-display text-xl font-semibold text-slate-900">Enrollment interest received</h3>
              <p className="mt-2 text-slate-600">Thank you. Our team will contact you shortly with programme details and next steps.</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-semibold text-primary-600 hover:underline"
              >
                Submit another enrollment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-6">
              <div className="flex items-center gap-2 text-primary-600">
                <UserPlus className="h-5 w-5" />
                <h2 className="font-display text-lg font-semibold text-slate-900">Enrollment form</h2>
              </div>

              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-slate-900">Parent / Guardian</legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="parentName" className="block text-sm font-medium text-slate-700">Full name *</label>
                    <input
                      id="parentName"
                      name="parentName"
                      required
                      value={form.parentName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="parentEmail" className="block text-sm font-medium text-slate-700">Email *</label>
                    <input
                      id="parentEmail"
                      name="parentEmail"
                      type="email"
                      required
                      value={form.parentEmail}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="parentPhone" className="block text-sm font-medium text-slate-700">South African Phone Number *</label>
                  <input
                    id="parentPhone"
                    name="parentPhone"
                    type="tel"
                    required
                    placeholder="e.g. 0821234567"
                    value={form.parentPhone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                  />
                  <p className="mt-1 text-xs text-slate-500">10-digit South African mobile or landline number</p>
                </div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-slate-900">Learner</legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="learnerName" className="block text-sm font-medium text-slate-700">Learner name *</label>
                    <input
                      id="learnerName"
                      name="learnerName"
                      required
                      value={form.learnerName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="learnerGrade" className="block text-sm font-medium text-slate-700">Grade / Phase</label>
                    <input
                      id="learnerGrade"
                      name="learnerGrade"
                      placeholder="e.g. Grade 5 / Intermediate"
                      value={form.learnerGrade}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                    />
                  </div>
                </div>
              </fieldset>

              <div>
                <label htmlFor="programme" className="block text-sm font-medium text-slate-700">Programme of interest *</label>
                <select
                  id="programme"
                  name="programme"
                  required
                  value={form.programme}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                >
                  <option value="robotics-club">After-school Robotics Club</option>
                  <option value="holiday-bootcamp">Holiday Bootcamp</option>
                  <option value="school-via-parent">School programme (via parent)</option>
                  <option value="teacher-training">Teacher Training (educator)</option>
                </select>
              </div>

              <div>
                <label htmlFor="packageInterest" className="block text-sm font-medium text-slate-700">
                  School package (if applicable)
                </label>
                <select
                  id="packageInterest"
                  name="packageInterest"
                  value={form.packageInterest}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                >
                  <option value="">— Select if school partnership —</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (R {p.monthlyFee.toLocaleString()}/mo)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Additional notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none resize-y"
                />
              </div>

              {status === 'error' && <p className="text-sm text-red-600">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full disabled:opacity-60"
              >
                {status === 'loading' ? 'Submitting…' : 'Submit enrollment interest'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
