import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, BookOpen, Download, Trophy, Zap, Star, Code2 } from 'lucide-react'
import CodePlayground from '../../components/CodePlayground'

export default function StudentDashboard() {
  const [resources, setResources] = useState([])
  const [studentData, setStudentData] = useState(null)
  const navigate = useNavigate()
  
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    fetchStudentData()
    fetchResources()
  }, [])

  const fetchStudentData = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) {
        navigate('/login')
        return
      }
      const data = await res.json()
      if (data.role !== 'student') {
        navigate('/login')
        return
      }
      setStudentData(data)
    } catch (err) {
      console.error('Failed to fetch student data')
    }
  }

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/resources', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setResources(await res.json())
    } catch (err) {
      console.error(err)
    }
  }

  const completeChallenge = async () => {
    try {
      const res = await fetch('/api/student/xp', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: 50 })
      })
      if (res.ok) {
        const data = await res.json()
        setStudentData(prev => ({ ...prev, xp: data.xp, level: data.level }))
        alert(`Awesome! You earned 50 XP. You are now a ${data.level}!`)
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

  if (!studentData) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>

  // Calculate Progress
  const levels = [0, 100, 300, 600, 1000, 2000]
  const currentXP = studentData.xp
  let nextLevelXP = 100
  let prevLevelXP = 0
  for (let i = 0; i < levels.length; i++) {
    if (currentXP >= levels[i]) {
      prevLevelXP = levels[i]
      nextLevelXP = levels[i+1] || 2000
    }
  }
  const progressPercent = Math.min(100, Math.max(0, ((currentXP - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100))

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-20">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">SQ</div>
              <h1 className="text-xl font-bold font-display text-slate-900 hidden sm:block">Student HQ</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-bold text-yellow-700">{studentData.xp} XP</span>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 w-full space-y-12">
        
        {/* Gamification Dashboard */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary-500/20 blur-[80px] rounded-full"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-4 border border-white/20">
                <Trophy className="h-4 w-4 text-primary-400" />
                <span className="text-xs font-bold text-primary-100 uppercase tracking-wider">Current Rank</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{studentData.level}</h2>
              <p className="text-slate-300">Keep coding and innovating to reach the next rank!</p>
              
              <button onClick={completeChallenge} className="mt-6 flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-primary-500/30">
                <Zap className="h-5 w-5 fill-white" />
                Submit Project (+50 XP)
              </button>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex justify-between text-sm font-medium mb-3">
                <span className="text-slate-300">Progress to Next Rank</span>
                <span className="text-primary-400 font-bold">{studentData.xp} / {nextLevelXP} XP</span>
              </div>
              <div className="h-4 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary-500 to-pink-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">Earn {nextLevelXP - currentXP} more XP to level up!</p>
            </div>
          </div>
        </section>

        {/* Live Coding Playground */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-md">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">Innovation Lab</h2>
              <p className="text-sm text-slate-600">Write, test, and preview your HTML/CSS/JS code instantly.</p>
            </div>
          </div>
          <CodePlayground />
        </section>

        {/* Learning Resources */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center shadow-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-display">Learning Resources</h2>
              <p className="text-sm text-slate-600">Access your class notes, videos, and project files.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md hover:-translate-y-1 transition duration-300">
                <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2">{r.title}</h3>
                <p className="text-sm text-slate-600 flex-1 mb-6 line-clamp-3">{r.description}</p>
                <a href={r.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-700 text-sm font-bold rounded-xl border border-slate-200 transition">
                  <Download className="h-4 w-4" />
                  Download / View
                </a>
              </div>
            ))}
            {resources.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed">
                No resources have been uploaded yet.
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  )
}
