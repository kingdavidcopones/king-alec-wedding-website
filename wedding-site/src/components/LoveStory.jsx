import { useEffect, useRef } from 'react'
import './LoveStory.css'

const GALLERY_ITEMS = [
  {
    src: 'https://images.unsplash.com/photo-1529634806015-b5958f0b5f93?auto=format&fit=crop&w=900&q=80',
    caption: 'The beginning of everything.',
    size: 'large',
    bw: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    caption: 'Best friends, always.',
    size: 'small',
    bw: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1494883759339-0b042055a4ee?auto=format&fit=crop&w=1000&q=80',
    caption: 'And in 2023, everything changed.',
    size: 'medium',
    bw: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1511285560929-80b5c7f90db3?auto=format&fit=crop&w=700&q=80',
    caption: 'Choosing each other, every day.',
    size: 'tall',
    bw: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    caption: 'Our haven.',
    size: 'large',
    bw: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1537726235470-8504e3beef77?auto=format&fit=crop&w=600&q=80',
    caption: 'November 2025.',
    size: 'small',
    bw: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80',
    caption: 'She said yes.',
    size: 'medium',
    bw: false,
  },
]

export default function LoveStory() {
  const galleryTrackRef = useRef(null)
  const galleryWrapRef = useRef(null)
  const paragraphRefs = useRef([])

  // ── Scroll-triggered paragraph fade-ins ─────────────────────────────────
  useEffect(() => {
    const observers = []
    paragraphRefs.current.forEach((el) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            obs.disconnect()
          }
        },
        { threshold: 0.15 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // ── GSAP horizontal scroll gallery ──────────────────────────────────────
  useEffect(() => {
    // Skip on mobile — CSS switches the gallery to a vertical stack
    if (window.innerWidth <= 768) return

    let ctx = null
    let mounted = true

    const initGSAP = () => {
      if (!mounted) return

      Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]).then(([{ default: gsap }, { ScrollTrigger }]) => {
        if (!mounted) return

        gsap.registerPlugin(ScrollTrigger)

        const track = galleryTrackRef.current
        const wrap = galleryWrapRef.current
        if (!track || !wrap) return

        // Build the animation inside a context so revert() cleans everything
        ctx = gsap.context(() => {
          const getDistance = () => track.scrollWidth - wrap.offsetWidth

          gsap.to(track, {
            x: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top top',
              end: () => `+=${getDistance()}`,
              scrub: 1.2,        // slight lag — feels weighty, not snappy
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
        })

        // Recalculate after images finish loading (lazy widths may differ)
        const refresh = () => {
          if (mounted) ScrollTrigger.refresh(true)
        }
        window.addEventListener('load', refresh, { once: true })
        // Belt-and-suspenders: also refresh 800ms after mount
        const timer = setTimeout(refresh, 800)

        // Store timer ref for cleanup
        ctx._timer = timer
      })
    }

    initGSAP()

    return () => {
      mounted = false
      if (ctx) {
        clearTimeout(ctx._timer)
        ctx.revert()
      }
    }
  }, [])

  const addParagraphRef = (el) => {
    if (el && !paragraphRefs.current.includes(el)) {
      paragraphRefs.current.push(el)
    }
  }

  return (
    <section className="love-story" id="love-story" aria-label="Love Story">
      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <div className="section-container love-story__intro">
        <span className="section-label">Their Story</span>
        <div className="love-story__headline-block">
          <h2 className="love-story__headline">
            <span className="love-story__headline-main">A love that was</span>
            <span className="love-story__headline-accent">always there</span>
          </h2>
        </div>
      </div>

      {/* ── Narrative paragraphs ──────────────────────────────────────────── */}
      <div className="love-story__narrative">
        <div className="love-story__paragraph love-story__paragraph--left" ref={addParagraphRef}>
          <div className="love-story__para-inner">
            <p>
              Their story did not begin with grand gestures or dramatic first meetings.
              It started long before they even realized it, as{' '}
              <em className="love-story__em">childhood churchmates.</em>
            </p>
          </div>
        </div>

        <div className="love-story__paragraph love-story__paragraph--right" ref={addParagraphRef}>
          <div className="love-story__para-inner">
            <p>
              In 2016, Precious and King reconnected and quickly became best friends —
              the kind who shared everything, from everyday stories to their{' '}
              <em className="love-story__em love-story__em--pink">"love problems."</em>{' '}
              Through the years, they walked side by side in different seasons of life,
              never really knowing that the love they were both looking for was already right there.
            </p>
          </div>
        </div>

        <div className="love-story__paragraph love-story__paragraph--center" ref={addParagraphRef}>
          <div className="love-story__para-inner love-story__para-inner--wide">
            <p>
              In 2023, something changed. What was once easy and familiar grew into something
              deeper and more intentional. They chose each other, not just as best friends,
              but as{' '}
              <em className="love-story__em love-story__em--blue">partners.</em>
            </p>
          </div>
        </div>
      </div>

      {/* ── Horizontal prenup gallery ─────────────────────────────────────── */}
      <div className="love-story__gallery-section" ref={galleryWrapRef}>
        <div className="love-story__gallery-track" ref={galleryTrackRef}>
          {GALLERY_ITEMS.map((item, i) => (
            <div key={i} className={`love-story__gallery-item love-story__gallery-item--${item.size}`}>
              <div className="love-story__gallery-img-wrap">
                {/*
                  NOT lazy — images must be in the DOM and sized before GSAP
                  reads scrollWidth. Lazy loading would report 0 width initially
                  and break the scroll distance calculation.
                */}
                <img
                  src={item.src}
                  alt={item.caption}
                  className={`love-story__gallery-img${item.bw ? ' is-bw' : ''}`}
                />
                <div className="love-story__gallery-grain" aria-hidden="true" />
              </div>
              <p className="love-story__gallery-caption">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Closing narrative ─────────────────────────────────────────────── */}
      <div className="section-container love-story__outro">
        <div className="love-story__paragraph love-story__paragraph--left" ref={addParagraphRef}>
          <div className="love-story__para-inner">
            <p>
              In November 2025, King proposed the day before Precious turned 26 —
              making it a birthday she will never forget.
            </p>
          </div>
        </div>

        <div
          className="love-story__paragraph love-story__paragraph--right love-story__paragraph--closing"
          ref={addParagraphRef}
        >
          <div className="love-story__para-inner">
            <blockquote className="love-story__quote">
              From childhood churchmates to best friends to forever —
              their story is proof that sometimes, the greatest love is the one
              that has been there all along.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
