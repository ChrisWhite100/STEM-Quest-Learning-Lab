import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import { navLinks, company } from '../data/siteData'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-slate-900">
            <img src="/logo.jpg" alt="STEM Quest Logo" className="h-10 w-10 object-contain rounded-lg" />
            <span className="hidden sm:inline">STEM Quest</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary-600">
              Login
            </Link>
            <Link to="/enroll" className="btn-primary text-sm py-2.5 px-5">
              Enroll Now
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-slate-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-base font-medium ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-3 block w-full text-center rounded-lg px-3 py-2 text-base font-medium border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Login
            </Link>
            <Link
              to="/enroll"
              onClick={() => setOpen(false)}
              className="mt-3 block w-full text-center btn-primary"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
