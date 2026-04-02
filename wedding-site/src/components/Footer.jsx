import './Footer.css'

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

        <div className="footer__center">
          <p className="footer__date">April 10, 2027</p>
          <p className="footer__venue">Our Haven, Tagaytay City</p>
        </div>

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
          <p className="footer__copy">
            Made with love for King &amp; Alec &mdash; April 10, 2027
          </p>
          <a href="#rsvp" className="footer__back-cta btn-primary footer__rsvp-btn">
            RSVP
          </a>
        </div>
      </div>
    </footer>
  )
}
