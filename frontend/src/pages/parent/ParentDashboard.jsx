import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, BookOpen, GraduationCap, Trophy, User, Star, CreditCard, CheckCircle, Clock } from 'lucide-react'

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [resources, setResources] = useState([])
  const [childData, setChildData] = useState(null)
  const [payments, setPayments] = useState([])
  const navigate = useNavigate()
  
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (!token || user.role !== 'parent') {
      navigate('/login')
      return
    }
    fetchChildData()
    fetchResources()
    fetchPayments()
  }, [])

  const fetchChildData = async () => {
    try {
      const res = await fetch('/api/parent/child', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        setChildData(await res.json())
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/resources', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setResources(data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/parent/payments', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        setPayments(await res.json())
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const handleUploadPayment = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData()
    formData.append('amount', form.amount.value)
    formData.append('reference', form.reference.value)
    formData.append('file', form.file.files[0])
    try {
      const res = await fetch('/api/parent/payments', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })
      if (!res.ok) throw new Error(await res.text())
      form.reset()
      fetchPayments()
      alert('Proof of payment submitted successfully! Waiting for verification.')
    } catch (err) {
      alert(err.message)
    }
  }

  // Calculate Progress if child exists
  let progressPercent = 0
  let nextLevelXP = 100
  if (childData) {
    const levels = [0, 100, 300, 600, 1000, 2000]
    let prevLevelXP = 0
    for (let i = 0; i < levels.length; i++) {
      if (childData.xp >= levels[i]) {
        prevLevelXP = levels[i]
        nextLevelXP = levels[i+1] || 2000
      }
    }
    progressPercent = Math.min(100, Math.max(0, ((childData.xp - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100))
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: GraduationCap },
    { id: 'billing', label: 'Billing & Payments', icon: CreditCard }
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold font-display">Parent Portal</h2>
          <p className="text-slate-400 text-sm mt-1">{user.name}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === tab.id ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {activeTab === 'dashboard' && (
            <>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 font-display">Welcome, {user.name}</h1>
                <p className="mt-2 text-slate-600">
                  Monitor your child's STEM progress and access learning materials.
                </p>
              </div>

              {/* Linked Child Analytics */}
              {childData ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="h-5 w-5 text-emerald-600" />
                      <h2 className="text-xl font-bold text-slate-900">{childData.name}'s Progress</h2>
                    </div>
                    <p className="text-sm text-slate-500 mb-6">{childData.email}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-xl flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        <span className="font-bold">Rank: {childData.level}</span>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-xl flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-500" />
                        <span className="font-bold">{childData.xp} XP</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span className="text-slate-600">Progress to Next Rank</span>
                        <span className="text-emerald-600 font-bold">{childData.xp} / {nextLevelXP} XP</span>
                      </div>
                      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-64 h-48 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center p-6">
                    <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                      <Trophy className="h-8 w-8" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">Great Job!</p>
                    <p className="text-xs text-slate-500 mt-1">{childData.name} is on track to becoming an Innovator.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                  <User className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h2 className="text-lg font-bold text-slate-900">No Child Linked</h2>
                  <p className="text-slate-500 mt-2">Please contact the teacher to link a student account to your profile.</p>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                  Available Learning Resources
                </h2>
                
                {resources.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    No resources have been uploaded yet.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {resources.map((r, i) => (
                      <div key={i} className="border border-slate-200 p-5 rounded-xl flex flex-col hover:border-primary-300 transition shadow-sm">
                        <h3 className="font-semibold text-lg text-slate-900">{r.title}</h3>
                        <p className="text-sm text-slate-600 mt-2 flex-1">{r.description}</p>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                          <span className="text-xs text-slate-500 uppercase font-semibold">
                            {r.originalName.split('.').pop()} file
                          </span>
                          <a href={r.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline">
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 font-display">Billing & Payments</h1>
                <p className="mt-2 text-slate-600">Manage your STEM Quest program payments.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Banking Details */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary-600" />
                    Banking Details for EFT
                  </h2>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-3">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500 text-sm">Bank Name</span>
                      <span className="font-semibold text-slate-900 text-sm">FNB South Africa</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500 text-sm">Account Name</span>
                      <span className="font-semibold text-slate-900 text-sm">STEM Quest Labs</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500 text-sm">Account Number</span>
                      <span className="font-semibold text-slate-900 text-sm">62001122334</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-sm">Branch Code</span>
                      <span className="font-semibold text-slate-900 text-sm">250655</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-4 italic">
                    * Please use your child's name as the payment reference.
                  </p>
                </div>

                {/* Upload Proof */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Upload Proof of Payment</h2>
                  <form onSubmit={handleUploadPayment} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Amount Paid (ZAR)</label>
                      <input name="amount" type="number" required className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2.5 border" placeholder="e.g. 500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Payment Reference</label>
                      <input name="reference" required className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2.5 border" placeholder="e.g. Sipho Dlamini" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Proof Document (PDF/Image)</label>
                      <input name="file" type="file" required className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                    </div>
                    <button type="submit" className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition">
                      Submit Payment
                    </button>
                  </form>
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Payment History</h2>
                {payments.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    No payment history found.
                  </div>
                ) : (
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Reference</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {payments.map(p => (
                          <tr key={p.id}>
                            <td className="px-4 py-4 text-sm text-slate-900">{new Date(p.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-4 text-sm text-slate-600">{p.reference}</td>
                            <td className="px-4 py-4 text-sm font-bold text-slate-900">R {p.amount}</td>
                            <td className="px-4 py-4 text-sm">
                              {p.status === 'verified' ? (
                                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full text-xs font-bold">
                                  <CheckCircle className="h-3 w-3" /> Verified
                                </span>
                              ) : p.status === 'rejected' ? (
                                <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs font-bold">
                                  Rejected
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-100 px-2 py-1 rounded-full text-xs font-bold">
                                  <Clock className="h-3 w-3" /> Pending
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
