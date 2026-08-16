import { Link } from 'react-router-dom'
import { Rocket } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Decorative floating robot — background accent */}
      <div
        className="pointer-events-none select-none absolute bottom-4 right-4 sm:right-8 opacity-30 text-[7rem] sm:text-[10rem] md:text-[13rem] leading-none overflow-hidden"
        style={{
          animation: 'floatRobot 5s ease-in-out infinite',
          filter: 'sepia(1) saturate(8) hue-rotate(195deg) brightness(0.55)'
        }}
      >
        🤖
      </div>

      <style>{`
        @keyframes floatRobot {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          50% { transform: translateY(-18px) rotate(4deg); }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 mb-6">
              <Rocket className="h-4 w-4" />
              Future-Ready Education
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Unlocking Potential Through{' '}
              <span className="text-primary-600">STEM Education</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
              At STEM Quest Learning Lab, we empower learners and educators with future-ready skills through Coding, Robotics, and STEM education. Practical, engaging, and aligned with a progression-based curriculum from Foundation to Senior Phase.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/enroll" className="btn-primary">
                Enroll Your Child
              </Link>
              <Link to="/contact" className="btn-secondary">
                Partner With Us
              </Link>
            </div>
          </div>

          {/* Logo Showcase */}
          <div className="relative flex items-center justify-center">
            {/* Glowing ring effect behind logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-primary-500/10 blur-3xl"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-primary-400/20 blur-2xl animate-pulse"></div>
            </div>

            {/* Logo card */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-white shadow-2xl shadow-primary-900/15 border border-slate-100 p-6 sm:p-8 flex items-center justify-center">
                <img
                  src="/logo.jpg"
                  alt="STEM Quest Learning Lab Logo"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
              <div className="text-center">
                <p className="font-display text-xl font-bold text-slate-900">STEM Quest Learning Lab</p>
                <p className="text-sm text-primary-600 font-medium mt-1">Coding • Robotics • Innovation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
