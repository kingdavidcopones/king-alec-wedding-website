import { useEffect, useRef } from 'react'
import './WeddingDetails.css'

const SCHEDULE = [
  { time: '3:30 PM', label: 'Guest Arrival', note: 'Light refreshments will be served.' },
  { time: '4:00 PM', label: 'Wedding Ceremony', note: null },
  { time: '5:30 PM', label: 'Cocktail Hour', note: null },
  { time: '7:00 PM', label: 'Reception', note: null },
]

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3485.998364607661!2d120.86648957460231!3d14.144698786289378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd82c6ec8c3e05%3A0xfbb55f885037e7a4!2sOur%20Haven%20Events%20Place!5e1!3m2!1sen!2sph!4v1775106545014!5m2!1sen!2sph'

export default function WeddingDetails() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="details" id="details" aria-label="Wedding Details" ref={sectionRef}>

      {/* ── Date display ── */}
      <div className="section-container">
        <div className="details__top">
          <span className="section-label">The Day</span>
          <div className="details__date-lockup">
            <span className="details__join-us">join us on</span>
            <p className="details__date-line">April 10,</p>
            <p className="details__year-line">2027</p>
          </div>
        </div>

        {/* ── Venue strip ── */}
        <div className="details__venue-row">
          <p className="details__venue-name">Our Haven, Tagaytay</p>
          <p className="details__venue-note">Ceremony &amp; Reception in one place</p>
        </div>

        {/* ── Schedule — horizontal ── */}
        <ol className="details__schedule-row" role="list">
          {SCHEDULE.map((item, i) => (
            <li
              key={i}
              className="details__schedule-item"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="details__schedule-time">{item.time}</span>
              <span className="details__schedule-label">{item.label}</span>
              {item.note && <span className="details__schedule-note">{item.note}</span>}
            </li>
          ))}
        </ol>
      </div>

      {/* ── Map — full bleed ── */}
      <div className="details__map-bleed">
        <iframe
          src={MAP_SRC}
          title="Our Haven Events Place, Tagaytay"
          aria-label="Map to Our Haven Events Place, Tagaytay"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* ── Parking footnote ── */}
      <div className="section-container">
        <div className="details__parking">
          <svg
            className="details__parking-icon"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" />
            <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
          </svg>
          <p>
            The venue provides parking space for up to{' '}
            <strong>80 cars</strong>, ensuring ample parking for all guests.
          </p>
        </div>
      </div>

    </section>
  )
}
