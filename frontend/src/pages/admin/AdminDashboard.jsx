import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Users, BookOpen, MessageSquare, FileText, Image, CreditCard, CheckCircle, XCircle, Trash2 } from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('enrollments')
  const [data, setData] = useState({ enrollments: [], contacts: [], users: [], resources: [], gallery: [], payments: [] })
  const navigate = useNavigate()
  
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (!token || user.role !== 'admin' || user.email?.toLowerCase() !== 'thandolwethumagaya@gmail.com') {
      navigate('/login')
      return
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` }
      const [enrollmentsRes, contactsRes, usersRes, resourcesRes, galleryRes, paymentsRes] = await Promise.all([
        fetch('/api/admin/enrollments', { headers }),
        fetch('/api/admin/contacts', { headers }),
        fetch('/api/admin/users', { headers }),
        fetch('/api/resources', { headers }),
        fetch('/api/gallery', { headers }),
        fetch('/api/admin/payments', { headers })
      ])
      setData({
        enrollments: await enrollmentsRes.json(),
        contacts: await contactsRes.json(),
        users: await usersRes.json(),
        resources: await resourcesRes.json(),
        gallery: await galleryRes.json(),
        payments: await paymentsRes.json()
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const handleApproveEnrollment = async (id) => {
    if (!window.confirm('Approve this enrollment? This will automatically create Parent and Student accounts and send email notifications.')) return
    try {
      const res = await fetch(`/api/admin/enrollments/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' })
      })
      if (!res.ok) throw new Error('Failed to approve')
      alert('Enrollment approved! Student & Parent accounts generated and email notification sent.')
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleVerifyPayment = async (id, status) => {
    try {
      await fetch(`/api/admin/payments/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleUploadResource = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData()
    formData.append('title', form.title.value)
    formData.append('description', form.description.value)
    formData.append('file', form.file.files[0])
    try {
      await fetch('/api/admin/resources', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })
      form.reset()
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDeleteResource = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return
    try {
      const res = await fetch(`/api/admin/resources/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to delete resource')
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleUploadGallery = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData()
    formData.append('caption', form.caption.value)
    formData.append('file', form.file.files[0])
    try {
      await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })
      form.reset()
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media item?')) return
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to delete media item')
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const tabs = [
    { id: 'enrollments', label: 'Enrollments', icon: FileText },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'contacts', label: 'Messages', icon: MessageSquare }
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold font-display">Teacher Portal</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 flex flex-wrap md:flex-col gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 md:flex-none flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === tab.id ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
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
      <div className="flex-1 overflow-auto p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
          
          {activeTab === 'enrollments' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Enrollment Applications</h1>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Learner</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Parent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Programme</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {data.enrollments.map((e, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{e.learnerName} (Gr {e.learnerGrade})</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{e.parentName}<br/><span className="text-xs text-slate-400">{e.parentEmail} • {e.parentPhone}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{e.programme} - {e.packageInterest}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${e.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {e.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {(!e.status || e.status === 'pending') && (
                            <button onClick={() => handleApproveEnrollment(e.id)} className="text-emerald-600 hover:text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-md">
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Verify Parent Payments</h1>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount & Ref</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Proof</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {data.payments.map((p, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{p.userEmail}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-bold">
                          R {p.amount}<br/><span className="text-xs text-slate-500 font-normal">Ref: {p.reference}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <a href={p.proofUrl} target="_blank" rel="noreferrer" className="text-primary-600 hover:underline">View Receipt</a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : p.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          {p.status === 'pending' && (
                            <>
                              <button onClick={() => handleVerifyPayment(p.id, 'verified')} className="text-emerald-600 hover:bg-emerald-50 p-1 rounded transition" title="Verify">
                                <CheckCircle className="h-5 w-5" />
                              </button>
                              <button onClick={() => handleVerifyPayment(p.id, 'rejected')} className="text-red-600 hover:bg-red-50 p-1 rounded transition" title="Reject">
                                <XCircle className="h-5 w-5" />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                    {data.payments.length === 0 && (
                      <tr><td colSpan="6" className="px-6 py-8 text-center text-slate-500">No payments found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Manage Users</h1>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {data.users.map((u, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{u.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{u.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 capitalize">{u.role}{u.studentEmail ? ` (Linked: ${u.studentEmail})` : ''}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Other Tabs (Contacts, Resources, Gallery) */}
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Messages</h1>
              <div className="space-y-4">
                {data.contacts.map((c, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{c.name}</h3>
                        <p className="text-sm text-slate-500">{c.email} • {c.organisation}</p>
                      </div>
                      <span className="text-xs text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-700 text-sm">{c.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Manage Resources</h1>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold mb-4">Upload New Resource</h2>
                <form onSubmit={handleUploadResource} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Title</label>
                      <input name="title" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">File</label>
                      <input name="file" type="file" required className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Description</label>
                    <textarea name="description" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"></textarea>
                  </div>
                  <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">Upload Resource</button>
                </form>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {data.resources.map((r, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex gap-4 justify-between items-start">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 bg-primary-100 text-primary-600 flex items-center justify-center rounded-lg shrink-0">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{r.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">{r.description}</p>
                        <a href={r.url} target="_blank" rel="noreferrer" className="text-primary-600 text-sm font-medium mt-2 inline-block hover:underline">View / Download</a>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteResource(r.id)} className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition" title="Delete Resource">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Manage Gallery</h1>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold mb-4">Upload New Media (Image/Video)</h2>
                <form onSubmit={handleUploadGallery} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Caption / Title</label>
                      <input name="caption" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border" placeholder="E.g., Students at the robotics workshop" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">File</label>
                      <input name="file" type="file" accept="image/*,video/*" required className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                    </div>
                  </div>
                  <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">Upload Media</button>
                </form>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {data.gallery.map((media, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative group">
                    {media.type === 'video' ? (
                      <video src={media.url} controls className="w-full h-48 object-cover bg-slate-900" />
                    ) : (
                      <img src={media.url} alt={media.caption} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4 flex justify-between items-center">
                      <div className="truncate">
                        <p className="font-medium text-slate-900 text-sm truncate">{media.caption || 'No caption'}</p>
                        <p className="text-xs text-slate-500 mt-1">{new Date(media.createdAt).toLocaleDateString()}</p>
                      </div>
                      <button onClick={() => handleDeleteGallery(media.id)} className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg transition shrink-0 ml-2" title="Delete Media">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
