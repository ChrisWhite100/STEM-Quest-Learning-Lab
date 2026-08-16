import { motion } from 'framer-motion'
import { Rocket, Sprout, Droplets, Zap, ArrowRight, ShieldCheck } from 'lucide-react'

const challenges = [
  {
    title: 'Smart Agri-Tech IoT',
    category: 'Agriculture & Tech',
    icon: Sprout,
    color: 'from-emerald-500 to-green-600',
    description: 'Design an IoT soil moisture sensor system using Arduino to help South Africa farmers optimize water usage during droughts.',
    xpReward: 500,
    status: 'Active'
  },
  {
    title: 'Clean Water Robotics',
    category: 'Environment',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    description: 'Build a prototype of an autonomous robotic boat that can identify and collect plastic waste from local rivers.',
    xpReward: 800,
    status: 'Active'
  },
  {
    title: 'Renewable Energy Grid',
    category: 'Energy',
    icon: Zap,
    color: 'from-yellow-500 to-amber-600',
    description: 'Code a Python simulation that balances energy distribution between solar grids and battery storage for rural schools.',
    xpReward: 600,
    status: 'Upcoming'
  }
]

export default function InnovationHub() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-6"
        >
          <Rocket className="h-4 w-4" /> Real-World Problem Solving
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold font-display text-slate-900 mb-6"
        >
          Innovation <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-600">Challenge Hub</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 max-w-3xl mx-auto"
        >
          Apply your coding and robotics skills to solve pressing challenges in South Africa and across Africa. Earn massive XP, build your portfolio, and make a real difference.
        </motion.p>
      </section>

      {/* Challenges Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition duration-300 group flex flex-col h-full"
            >
              <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${challenge.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition duration-300`}>
                <challenge.icon className="h-8 w-8 text-white" />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{challenge.category}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${challenge.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {challenge.status}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{challenge.title}</h3>
              <p className="text-slate-600 mb-8 flex-1">{challenge.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary-500" />
                  <span className="font-bold text-slate-900">{challenge.xpReward} XP</span>
                </div>
                <button className="flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition">
                  Join Challenge <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
