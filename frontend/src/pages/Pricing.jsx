import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { packages, revenueStreams } from '../data/siteData'

export default function Pricing() {
  return (
    <div>
      <section className="bg-slate-900 text-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Pricing & Packages</h1>
            Transparent school partnership tiers and additional programme pricing. All amounts in Rand (R).
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">School Partnership Packages</h2>
          <p className="section-subtitle mx-auto text-center">
            Designed to suit different budgets, grade coverage requirements, and implementation readiness.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl border bg-white p-8 shadow-sm ${
                  pkg.popular ? 'border-primary-500 ring-2 ring-primary-500/20 scale-[1.02]' : 'border-slate-200'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-slate-900">{pkg.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-slate-900">
                    {pkg.currency} {pkg.monthlyFee.toLocaleString()}
                  </span>
                  <span className="text-slate-500"> / month</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-accent-500" />
                    {pkg.sessionsPerWeek} sessions per week
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-accent-500" />
                    Grades covered: {pkg.gradesCovered}
                  </li>
                  <li className="flex items-center gap-2">
                    {pkg.teacherTraining ? (
                      <Check className="h-5 w-5 text-accent-500" />
                    ) : (
                      <X className="h-5 w-5 text-slate-300" />
                    )}
                    Teacher training: {pkg.teacherTraining || 'Not included'}
                  </li>
                  <li className="flex items-center gap-2">
                    {pkg.roboticsClub ? (
                      <Check className="h-5 w-5 text-accent-500" />
                    ) : (
                      <X className="h-5 w-5 text-slate-300" />
                    )}
                    Robotics club: {pkg.roboticsClub ? 'Included' : 'Not included'}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-accent-500" />
                    Assessment: {pkg.assessment}
                  </li>
                </ul>
                <Link
                  to="/contact"
                  className={`mt-8 block w-full text-center rounded-xl py-3 text-sm font-semibold transition ${
                    pkg.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'border-2 border-primary-600 text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  Request this package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-12 text-center">
        <Link to="/enroll" className="btn-primary">
          Start Enrollment
        </Link>
      </section>
    </div>
  )
}
