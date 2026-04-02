import { useEffect, useRef } from 'react'
import './GiftRegistry.css'

export default function GiftRegistry() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="gift" id="gift-registry" aria-label="Gift Registry" ref={sectionRef}>
      <div className="section-container">

        {/* ── Headline statement ── */}
        <div className="gift__header">
          <span className="section-label">Gift Registry</span>
          <h2 className="gift__headline">
            Your presence is<br />
            the greatest{' '}
            <span className="gift__headline-accent">gift.</span>
          </h2>
        </div>

        {/* ── Body row — copy left, QR right ── */}
        <div className="gift__body-row">
          <div className="gift__copy">
            <p className="gift__body">
              If you'd like to share a little extra love, we've prepared a gift registry
              to help us start our new chapter together. We'd also be so grateful for{' '}
              <span className="gift__highlight">cash gifts</span> if you prefer —
              please reach out to us directly.
            </p>
            <p className="gift__scan-prompt">
              Gift registry details will be shared closer to the big day.
            </p>
          </div>

          {/* QR — replace gift__qr-placeholder with <img> once the real QR is ready */}
          <div className="gift__qr-block">
            <div className="gift__qr-wrap" aria-label="QR Code for gift registry, coming soon">
              <div className="gift__qr-placeholder">
                <span className="gift__qr-accent">QR</span>
              </div>
            </div>
            <p className="gift__qr-note">coming soon</p>
          </div>
        </div>

      </div>
    </section>
  )
}
