import './Footer.css'

const NAV_LINKS = [
  { label: 'Their Story', href: '#love-story' },
  { label: 'Details', href: '#details' },
  { label: 'Entourage', href: '#entourage' },
  { label: 'RSVP', href: '#rsvp' },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="section-container footer__inner">

        <div className="footer__logo-wrap">
          <img
            src="/king-and-alec-logo-white.svg"
            alt="King & Alec"
            className="footer__logo"
          />
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="footer__nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__contact">
          <p className="footer__contact-label">RSVP Contact</p>
          <a href="tel:+639163821657" className="footer__contact-item">
            <span className="footer__contact-name">King David Copones</span>
            <span className="footer__contact-num">(+63) 916 382 1657</span>
          </a>
          <a href="tel:+639275569304" className="footer__contact-item">
            <span className="footer__contact-name">Precious Alec Esteban</span>
            <span className="footer__contact-num">(+63) 927 556 9304</span>
          </a>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="section-container footer__bottom-inner">
          <p className="footer__copy">King &amp; Alec Wedding 2027</p>
          <a href="mailto:kingalec.wedding@gmail.com" className="footer__email">
            kingalec.wedding@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
