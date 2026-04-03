import { useEffect, useRef } from 'react'
import './WeddingDetails.css'

const SCHEDULE = [
  { time: '3:30 PM', label: 'Guest Arrival', note: 'Light refreshments will be served.' },
  { time: '4:00 PM', label: 'Wedding Ceremony', note: null },
  { time: '5:30 PM', label: 'Cocktail Hour', note: null },
  { time: '7:00 PM', label: 'Reception', note: null },
]

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!4v1775210178496!6m8!1m7!1sLEsGm6N7gvFeTZw-rt-WDA!2m2!1d14.14495665999267!2d120.8690200957345!3f112.4554418928526!4f-23.11673910648291!5f0.7820865974627469'

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
      <div className="section-container">
        <div className="details__grid">

          {/* ── Col 1: The Anchor ── */}
          <div className="details__col-anchor">
            <span className="section-label">The Day</span>
            <div className="details__date-lockup">
              <p className="details__date-line">April 10,</p>
              <p className="details__year-line">2027</p>
              <span className="details__see-you" aria-hidden="true">See you there!</span>
            </div>
            <div className="details__venue-block">
              <p className="details__venue-name">Our Haven, Indang, Cavite</p>
              <p className="details__schedule-note">Ceremony &amp; Reception in one place.</p>
            </div>
          </div>

          {/* ── Col 2: The Schedule Timeline ── */}
          <div className="details__col-timeline">
            <ol className="details__schedule" role="list">
              {SCHEDULE.map((item, i) => (
                <li
                  key={i}
                  className="details__schedule-item"
                  style={{
                    '--node-delay': `${i * 120}ms`,
                    '--item-delay': `${i * 90}ms`,
                  }}
                >
                  <span className="details__schedule-time">{item.time}</span>
                  <span className="details__schedule-label">{item.label}</span>
                  {item.note && <span className="details__schedule-note">{item.note}</span>}
                </li>
              ))}
            </ol>
          </div>

          {/* ── Col 3: The Map & Logistics ── */}
          <div className="details__col-map">
            <div className="details__map-container">
              <iframe
                src={MAP_SRC}
                title="Our Haven Events Place, Tagaytay"
                aria-label="Map to Our Haven Events Place, Tagaytay"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
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

        </div>
      </div>
    </section>
  )
}
