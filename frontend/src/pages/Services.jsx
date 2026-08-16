import { School, Bot, GraduationCap, Rocket, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services, curriculumPhases } from '../data/siteData'

const iconMap = { School, Bot, GraduationCap, Rocket }

const serviceImages = [
  '/uploads/media__1786618591901.jpg',
  '/uploads/media__1786618591929.jpg',
  '/uploads/media__1786618591964.jpg',
  '/uploads/media__1786618591901.jpg', // reuse first for 4th service
]

const detailedServices = [
  {
    ...services[0],
    details: [
      'Timetable-integrated delivery across multiple grades',
      'Monthly retainer contracts for predictable partnership',
      'Progressive curriculum from Foundation to Senior Phase',
      'Termly assessment reports and learner portfolios',
      'Alignment with school development priorities',
    ],
  },
  {
    ...services[1],
    details: [
      'Structured co-curricular programme beyond the timetable',
      'Deeper engagement with coding and robotics projects',
      'Competition preparation (e.g. FLL-style challenges)',
      'Peer collaboration and showcase opportunities',
      'Suitable for intermediate and senior phase learners',
    ],
  },
  {
    ...services[2],
    details: [
      'Hands-on pedagogical training in computational thinking',
      'Tools: Scratch, Micro:bit, Arduino, unplugged activities',
      'Confidence-building for sustained classroom delivery',
      'Monthly support options under Silver/Gold packages',
      'Workshops available as standalone or package-included',
    ],
  },
  {
    ...services[3],
    details: [
      'Intensive project-based coding and innovation camps',
      'Held during school holidays',
      'Real-world problem solving and portfolio building',
      'Open to individual learners and school groups',
      'Ideal for accelerated skill development',
    ],
  },
]

export default function Services() {
  return (
    <div>
      <section className="bg-slate-900 text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Our Services</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Structured STEM delivery through school partnerships, robotics clubs, teacher training, and holiday bootcamps.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {detailedServices.map((service, idx) => {
            const Icon = iconMap[service.icon] || Rocket
            const reverse = idx % 2 === 1
            return (
              <div
                key={service.id}
                className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-4 font-display text-2xl md:text-3xl font-bold text-slate-900">{service.title}</h2>
                  <p className="mt-3 text-slate-600 leading-relaxed">{service.description}</p>
                  <ul className="mt-6 space-y-2">
                    {service.details.map((d, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-500" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 min-h-[280px]">
                  <img
                    src={serviceImages[idx]}
                    alt={service.title}
                    className="w-full h-full object-cover min-h-[280px] transition duration-500 hover:scale-105"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Curriculum Progression</h2>
          <p className="section-subtitle mx-auto text-center">
            From foundational computational thinking to advanced project-based innovation.
          </p>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 pr-4 font-semibold text-slate-900">Phase</th>
                  <th className="py-3 pr-4 font-semibold text-slate-900">Tools & Platforms</th>
                  <th className="py-3 pr-4 font-semibold text-slate-900">Key Skills</th>
                  <th className="py-3 font-semibold text-slate-900">Extra Services</th>
                </tr>
              </thead>
              <tbody>
                {curriculumPhases.map((row) => (
                  <tr key={row.phase} className="border-b border-slate-100">
                    <td className="py-4 pr-4 font-medium text-primary-700">{row.phase}</td>
                    <td className="py-4 pr-4 text-slate-600">{row.tools}</td>
                    <td className="py-4 pr-4 text-slate-600">{row.skills}</td>
                    <td className="py-4 text-slate-600">{row.extras}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary-600 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-2xl font-bold text-white">Interested in partnering?</h2>
          <p className="mt-2 text-primary-100">Talk to us about school contracts, clubs, or workshops.</p>
          <Link to="/contact" className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
