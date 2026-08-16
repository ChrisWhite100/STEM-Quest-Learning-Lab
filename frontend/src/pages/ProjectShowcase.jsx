import { motion } from 'framer-motion'
import { Code2, Cpu, Star, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'Automated Plant Waterer',
    student: 'Sipho D. (Age 14)',
    role: 'Innovator',
    category: 'Robotics / IoT',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'An Arduino-based system that monitors soil moisture and automatically waters plants using a mini water pump. Includes a dashboard to view moisture history.'
  },
  {
    title: 'Eco-Tracker App',
    student: 'Thandiwe M. (Age 12)',
    role: 'Engineer',
    category: 'App Development',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'A mobile app built with React Native that helps students track their daily carbon footprint and suggests eco-friendly activities in their community.'
  },
  {
    title: 'Solar Tracker Robot',
    student: 'Lethu K. (Age 15)',
    role: 'STEM Master',
    category: 'Robotics',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'A dual-axis solar tracker built with Raspberry Pi and servo motors that automatically rotates solar panels to face the sun throughout the day.'
  }
]

export default function ProjectShowcase() {
  return (
    <div className="min-h-screen bg-slate-900 pt-20 pb-24 text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-slate-300 font-semibold text-sm mb-6 border border-slate-700"
        >
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> Hall of Fame
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold font-display mb-6"
        >
          Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Project Showcase</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-400 max-w-3xl mx-auto"
        >
          Explore the incredible inventions, apps, and robotics projects created by our talented STEM Quest students.
        </motion.p>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 group hover:border-emerald-500 transition duration-300 shadow-2xl flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition duration-300 z-10"></div>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
                <div className="absolute top-4 right-4 z-20 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 flex items-center gap-2">
                  <project.icon className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{project.category}</span>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition">{project.title}</h3>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-slate-300">
                    {project.student.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{project.student}</p>
                    <p className="text-xs text-emerald-400 font-bold">{project.role}</p>
                  </div>
                </div>

                <p className="text-slate-400 mb-8 flex-1 text-sm leading-relaxed">{project.description}</p>
                
                <button className="flex items-center justify-center gap-2 w-full py-3 bg-slate-700 hover:bg-emerald-600 text-white rounded-xl font-bold transition duration-300">
                  <ExternalLink className="h-4 w-4" /> View Project Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
