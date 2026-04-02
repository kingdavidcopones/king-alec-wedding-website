import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Love Story', href: '#love-story' },
  { label: 'Details', href: '#details' },
  { label: 'Entourage', href: '#entourage' },
  { label: 'RSVP', href: '#rsvp' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner">
        <a href="#" className="navbar__logo" aria-label="King & Alec Wedding — Home">
          <img
            src="/king-and-alec-horizontal-color.svg"
            alt="King & Alec"
            height="40"
          />
        </a>

        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#rsvp" className="btn-primary navbar__cta">RSVP</a>

        <button
          className={`navbar__hamburger${menuOpen ? ' is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} className="navbar__mobile-link" onClick={handleLinkClick}>
            {link.label}
          </a>
        ))}
        <a href="#rsvp" className="btn-primary navbar__mobile-cta" onClick={handleLinkClick}>
          RSVP
        </a>
      </div>
    </header>
  )
}
