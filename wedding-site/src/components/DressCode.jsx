import { useEffect, useRef } from 'react'
import './DressCode.css'

// Unsplash: garden party / elegant outdoor formal attire
const DRESS_IMG = 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80'

const PALETTE = [
  { name: 'Sage Green', hex: '#8FAF8A', label: 'ladies' },
  { name: 'Dusty Rose', hex: '#C4917B', label: 'ladies' },
  { name: 'Champagne', hex: '#D4B896', label: 'ladies' },
  { name: 'Cornflower Blue', hex: '#8FA8CC', label: 'ladies' },
  { name: 'Lavender', hex: '#B8A9C9', label: 'ladies' },
  { name: 'Marigold', hex: '#D4A03A', label: 'ladies' },
  { name: 'Barong White', hex: '#F5F2ED', label: 'gents' },
]

const RULES = [
  { who: 'Ladies', rule: 'Flowing dresses in festive hues', icon: '✦' },
  { who: 'Gentlemen', rule: 'Barong Tagalog', icon: '✦' },
  { who: 'No', rule: 'White or Black attire', icon: '✕' },
  { who: 'No', rule: 'Denim jeans', icon: '✕' },
  { who: 'No', rule: 'Casual footwear (sandals, running shoes)', icon: '✕' },
  { who: 'Note', rule: 'Garden / grass venue — avoid stilettos', icon: '→' },
]

export default function DressCode() {
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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="dresscode" id="dress-code" aria-label="Dress Code" ref={sectionRef}>
      <div className="section-container">
        <div className="dresscode__grid">
          {/* Left: image */}
          <div className="dresscode__img-col">
            <div className="dresscode__img-wrap">
              <img
                src={DRESS_IMG}
                alt="Garden formal attire peg"
                className="dresscode__img"
                loading="lazy"
              />
              <div className="dresscode__img-label">
                <span className="dresscode__attire-badge">Garden Formal</span>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="dresscode__content-col">
            <span className="section-label">Attire</span>
            <h2 className="dresscode__headline">
              Dress the part.
              <span className="dresscode__headline-accent"> Festive & Formal.</span>
            </h2>

            {/* Color palette */}
            <div className="dresscode__palette-block">
              <p className="dresscode__palette-title">Color Palette</p>
              <div className="dresscode__palette">
                {PALETTE.map((color) => (
                  <div key={color.hex} className="dresscode__swatch-wrap">
                    <div
                      className="dresscode__swatch"
                      style={{ background: color.hex }}
                      title={color.name}
                    />
                    <span className="dresscode__swatch-name">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <ul className="dresscode__rules" role="list">
              {RULES.map((rule, i) => (
                <li key={i} className="dresscode__rule-item">
                  <span
                    className={`dresscode__rule-icon${rule.icon === '✕' ? ' is-no' : ''}`}
                    aria-hidden="true"
                  >
                    {rule.icon}
                  </span>
                  <span>
                    <strong className="dresscode__rule-who">{rule.who}:</strong>{' '}
                    {rule.rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
