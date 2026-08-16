import { problemPoints, company } from '../data/siteData'
import { Target, Lightbulb, MapPin } from 'lucide-react'

export default function About() {
  return (
    <div>
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">About STEM Quest</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            {company.mission}
          </p>
        </div>
      </section>

      {/* Mission & Problem */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm uppercase tracking-wider">
                <Target className="h-4 w-4" />
                The Challenge
              </div>
              <h2 className="mt-2 section-title">The STEM Education Gap in South Africa</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                South Africa stands at a pivotal crossroads. Its national development agenda and digitisation drive demand a workforce fluent in technology, computational thinking, and innovation. Yet the educational infrastructure that would produce such a workforce remains fundamentally underprepared.
              </p>
              <ul className="mt-6 space-y-3">
                {problemPoints.map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-primary-50 border border-primary-100 p-8">
              <div className="flex items-center gap-2 text-primary-700 font-semibold text-sm uppercase tracking-wider">
                <Lightbulb className="h-4 w-4" />
                Our Response
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">A Practical, Scalable Solution</h3>
              <p className="mt-4 text-slate-700 leading-relaxed">
                STEM Quest is a structured coding and robotics education enterprise. We deliver progressive, school-integrated STEM education through learner programmes, educator training, and long-term school partnerships.
              </p>
              <p className="mt-4 text-slate-700 leading-relaxed">
                This gap represents not only a social challenge but a commercial and developmental opportunity. Schools are actively seeking structured, credible STEM partners. Parents are investing in their children's future readiness. Government and development finance institutions are prioritising technology education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location note */}
      <section className="py-12 bg-primary-50 border-y border-primary-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-4 justify-center text-center sm:text-left">
          <MapPin className="h-8 w-8 text-primary-600 shrink-0" />
          <div>
            <p className="font-semibold text-slate-900">Based in South Africa • Serving schools nationwide</p>
          </div>
        </div>
      </section>
    </div>
  )
}
