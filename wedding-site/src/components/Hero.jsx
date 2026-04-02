import { useEffect, useRef } from 'react'
import './Hero.css'

// Mirrors --ease-out-expo and --dur-slow from index.css
const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)'
const DUR_SLOW = '600ms'

// Unsplash: romantic outdoor garden wedding scene
const HERO_IMG = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80'

export default function Hero() {
  const bgRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Staggered fade-in
    const els = contentRef.current?.querySelectorAll('[data-fade]')
    if (!els) return

    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(32px)'
      el.style.transition = `opacity ${DUR_SLOW} ${EASE_OUT_EXPO} ${i * 120}ms, transform ${DUR_SLOW} ${EASE_OUT_EXPO} ${i * 120}ms`
    })

    const timer = setTimeout(() => {
      els.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
    }, 100)

    // Parallax on scroll — rAF-gated so paint is always in sync with the
    // browser's frame budget. Multiplier 0.25 keeps the bg moving slower
    // than the viewport; the 25% bleed in CSS gives ~150px of room before
    // the edge of the image would be visible.
    let rafId = null
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        if (!bgRef.current) return
        const y = window.scrollY * 0.25
        bgRef.current.style.transform = `translateY(${y}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])


  return (
    <section className="hero" id="hero" aria-label="Hero">
      {/* Background */}
      <div className="hero__bg-wrap">
        <img
          ref={bgRef}
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          className="hero__bg"
          fetchpriority="high"
        />
        <div className="hero__overlay" />
        {/* Film grain */}
        <div className="hero__grain" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="hero__content" ref={contentRef}>
        <div className="hero__logo-wrap" data-fade>
          <img
            src="/the-king-and-alec-wedding.svg"
            alt="The King & Alec Wedding"
            className="hero__logo"
          />
        </div>

        <div className="hero__ctas" data-fade>
          <a href="#rsvp" className="btn-primary hero__btn-primary">RSVP Now</a>
          <a href="https://giftful.com/wishlists/yTAIdIPfLm6rBH81inFF" target="_blank" rel="noopener noreferrer" className="btn-secondary hero__btn-secondary">Gift Registry</a>
        </div>
      </div>

    </section>
  )
}
