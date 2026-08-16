import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { School, Bot, GraduationCap, Rocket, CheckCircle2, ArrowRight, ImageIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import { services, valuePillars, curriculumPhases, packages } from '../data/siteData'

const iconMap = { School, Bot, GraduationCap, Rocket }

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

export default function Home() {
  const [gallery, setGallery] = useState([])

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => setGallery(data))
      .catch(err => console.error("Failed to load gallery", err))
  }, [])

  return (
    <>
      <Hero />

      {/* Value Proposition */}
      <section className="py-16 lg:py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-multiply"></div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="section-title">Why STEM Quest?</h2>
            <p className="section-subtitle mx-auto">
              We are not a tutoring service. We are a structured, curriculum-aligned STEM programme that delivers progressive coding and robotics education and partners with schools as a long-term educational transformation agent.
            </p>
          </div>
          <motion.div variants={staggerContainer} className="mt-12 grid gap-6 md:grid-cols-3">
            {valuePillars.map((pillar) => (
              <motion.div variants={fadeIn} key={pillar.title} className="card">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600 mb-6 shadow-sm border border-primary-100">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-slate-900">{pillar.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      {gallery.length > 0 && (
        <section className="py-16 lg:py-20 bg-white">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeIn}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="section-title">In Action</h2>
              <p className="section-subtitle mx-auto">
                See how we are transforming classrooms and empowering learners through hands-on STEM education.
              </p>
            </div>
            
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {gallery.map((media, i) => (
                <motion.div 
                  key={media.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="break-inside-avoid group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200"
                >
                  {media.type === 'video' ? (
                    <video src={media.url} controls className="w-full h-auto object-cover" />
                  ) : (
                    <img src={media.url} alt={media.caption} className="w-full h-auto object-cover transition duration-500 group-hover:scale-105" />
                  )}
                  {media.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="text-white p-6 font-medium text-sm leading-tight">{media.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}



      {/* Curriculum Snapshot */}
      <section className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-600/30 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeIn}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">Curriculum Architecture</h2>
            <p className="mt-4 text-lg text-slate-300">
              A progression ladder from foundational computational thinking to advanced project-based innovation.
            </p>
          </div>
          <motion.div variants={staggerContainer} className="mt-16 grid gap-6 md:grid-cols-3">
            {curriculumPhases.map((phase) => (
              <motion.div variants={fadeIn} key={phase.phase} className="rounded-2xl border border-slate-700 bg-slate-800/40 backdrop-blur p-8 transition hover:bg-slate-800/60 hover:border-slate-600">
                <h3 className="font-display text-2xl font-semibold text-primary-400">{phase.phase}</h3>
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-slate-400 font-medium">Tools & Platforms</dt>
                    <dd className="mt-1 text-white text-base">{phase.tools}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Key Skills</dt>
                    <dd className="mt-1 text-white text-base">{phase.skills}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Extras</dt>
                    <dd className="mt-1 text-white text-base">{phase.extras}</dd>
                  </div>
                </dl>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-700 to-primary-600">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeIn}
          className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
            Ready to partner with STEM Quest?
          </h2>
          <p className="mt-6 text-xl text-primary-100 max-w-2xl mx-auto">
            Schools, parents, and educators — take the next step toward future-ready STEM education in South Africa.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/enroll" className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-primary-700 shadow-lg shadow-black/10 hover:bg-primary-50 hover:scale-105 transition">
              Enroll Now
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 px-8 py-4 text-base font-bold text-white hover:bg-white/10 hover:scale-105 transition">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}
