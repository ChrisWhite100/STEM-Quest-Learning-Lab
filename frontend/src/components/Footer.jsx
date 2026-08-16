import { Link } from 'react-router-dom'
import { Zap, Mail, MapPin } from 'lucide-react'
import { company, navLinks } from '../data/siteData'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-white">
              <img src="/logo.jpg" alt="STEM Quest Logo" className="h-8 w-8 object-contain rounded-lg" />
              STEM Quest Learning Lab
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed">
              {company.tagline}. Bridging the gap between the digital economy's demands and the foundational skills South Africa's young people receive.
            </p>
            <p className="mt-4 text-xs text-slate-500 italic">
              "Commit your work to the Lord, and your plans will be established." — Proverbs 16:3
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/enroll" className="text-sm hover:text-white transition">
                  Enroll
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary-400" />
                <span>{company.location}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-primary-400" />
                <a href={`mailto:${company.email}`} className="hover:text-white transition">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-slate-500">
          <p>© {company.year} STEM Quest Learning Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
