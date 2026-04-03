import { useEffect, useRef } from 'react'
import './Entourage.css'


function SplitName({ children }) {
  if (typeof children !== 'string') return children
  const chars = children.split('')
  return (
    <span className="split-text" aria-label={children}>
      <span className="split-text__inner" aria-hidden="true">
        {chars.map((char, i) => (
          <span key={i} className="char char--base" style={{ '--char-index': i }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
      <span className="split-text__inner split-text__inner--hover" aria-hidden="true">
        {chars.map((char, i) => (
          <span key={i} className="char char--hover" style={{ '--char-index': i }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  )
}


function EntourageBox({ delay, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
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
    <div className="entourage__box" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function Entourage() {
  return (
    <section className="entourage" id="entourage" aria-label="Wedding Entourage">
      <div className="section-container">

        {/* Header */}
        <div className="entourage__header">
          <span className="section-label">The People</span>
          <h2 className="entourage__headline">
            <span className="entourage__headline-main">MEET THE</span>
            <span className="entourage__headline-accent">entourage</span>
          </h2>
        </div>

        <div className="entourage__boxes">
          {/* Box 1: Principal Sponsors */}
          <EntourageBox delay={0}>
            <h3 className="entourage__box-title" style={{ color: 'var(--color-pink)' }}>Principal Sponsors</h3>
            <div className="entourage__grid-3">
              <div className="entourage__col">
                <div className="entourage__pair">
                  <div className="entourage__name"><SplitName>Mr. Mark Martin</SplitName></div>
                  <div className="entourage__name"><SplitName>Mrs. Lara Martin</SplitName></div>
                </div>
                <div className="entourage__pair">
                  <div className="entourage__name"><SplitName>Mr. Joseph Magtalas</SplitName></div>
                  <div className="entourage__name"><SplitName>Mrs. Anne Magtalas</SplitName></div>
                </div>
              </div>
              <div className="entourage__col">
                <div className="entourage__pair">
                  <div className="entourage__name"><SplitName>Mr. Macairog Santos Jr.</SplitName></div>
                  <div className="entourage__name"><SplitName>Mrs. Mickey Santos</SplitName></div>
                </div>
                <div className="entourage__pair">
                  <div className="entourage__name"><SplitName>Mr. Hepty Santos Jr.</SplitName></div>
                  <div className="entourage__name"><SplitName>Mrs. Vivian Santos</SplitName></div>
                </div>
              </div>
              <div className="entourage__col">
                <div className="entourage__pair">
                  <div className="entourage__name"><SplitName>Mr. George De Guzman</SplitName></div>
                  <div className="entourage__name"><SplitName>Mrs. Lyn Laguisma</SplitName></div>
                </div>
                <div className="entourage__pair">
                  <div className="entourage__name"><SplitName>Ms. Mayette Acuna</SplitName></div>
                  <div className="entourage__name"><SplitName>Ms. Josephine Garcia</SplitName></div>
                </div>
              </div>
            </div>
          </EntourageBox>

          {/* Box 2: Secondary Sponsors */}
          <EntourageBox delay={50}>
            <h3 className="entourage__box-title" style={{ color: 'var(--color-green)' }}>Secondary Sponsors</h3>
            <div className="entourage__grid-3">
              <div className="entourage__col">
                <div className="entourage__sub-role entourage__sub-role--first">Candle</div>
                <div className="entourage__pair">
                  <div className="entourage__name"><SplitName>Miguel Jerico Onofre</SplitName></div>
                  <div className="entourage__name"><SplitName>Nicole Yhna Laguisma</SplitName></div>
                </div>
              </div>
              <div className="entourage__col">
                <div className="entourage__sub-role entourage__sub-role--first">Veil</div>
                <div className="entourage__pair">
                  <div className="entourage__name"><SplitName>Marc Arnold Mateo</SplitName></div>
                  <div className="entourage__name"><SplitName>Jiane Trishia Magtalas</SplitName></div>
                </div>
              </div>
              <div className="entourage__col">
                <div className="entourage__sub-role entourage__sub-role--first">Cord</div>
                <div className="entourage__pair">
                  <div className="entourage__name"><SplitName>John Lenmer Laguisma</SplitName></div>
                  <div className="entourage__name"><SplitName>Marian Angelique Garcia</SplitName></div>
                </div>
              </div>
            </div>
          </EntourageBox>

          {/* Box 3: Groom's */}
          <EntourageBox delay={100}>
            <h3 className="entourage__box-title" style={{ color: 'var(--color-orange)' }}>Groom's</h3>
            <div className="entourage__col" style={{ width: '100%' }}>
              <div className="entourage__sub-role entourage__sub-role--first">Best man</div>
              <div className="entourage__pair">
                <div className="entourage__name"><SplitName>Eric Marc Martin</SplitName></div>
              </div>

              <div className="entourage__sub-role">Groomsmen</div>
              <div className="entourage__grid-3">
                <div className="entourage__col">
                  <div className="entourage__pair">
                    <div className="entourage__name"><SplitName>Lesther Laguisma</SplitName></div>
                    <div className="entourage__name"><SplitName>Rafael San Andres</SplitName></div>
                  </div>
                </div>
                <div className="entourage__col">
                  <div className="entourage__pair">
                    <div className="entourage__name"><SplitName>Aizen Jarence Paman</SplitName></div>
                    <div className="entourage__name"><SplitName>Jedidiah Job Bambo</SplitName></div>
                    <div className="entourage__name"><SplitName>Anton Gerard Geronimo</SplitName></div>
                  </div>
                </div>
                <div className="entourage__col">
                  <div className="entourage__pair">
                    <div className="entourage__name"><SplitName>Justin Edward Lope</SplitName></div>
                    <div className="entourage__name"><SplitName>Justin David Guevara</SplitName></div>
                  </div>
                </div>
              </div>
            </div>
          </EntourageBox>

          {/* Box 4: Bride's */}
          <EntourageBox delay={150}>
            <h3 className="entourage__box-title" style={{ color: 'var(--color-blue)' }}>Bride's</h3>
            <div className="entourage__col" style={{ width: '100%' }}>
              <div className="entourage__grid-3">
                <div className="entourage__col">
                  <div className="entourage__sub-role entourage__sub-role--first">Men of Honor</div>
                  <div className="entourage__pair">
                    <div className="entourage__name"><SplitName>Rhoal Mica Esteban</SplitName></div>
                    <div className="entourage__name"><SplitName>Elijah Esteban</SplitName></div>
                  </div>
                </div>
                <div className="entourage__col">
                  <div className="entourage__sub-role entourage__sub-role--first">Maid of Honor</div>
                  <div className="entourage__pair">
                    <div className="entourage__name"><SplitName>Trisha Calucod</SplitName></div>
                  </div>
                </div>
                <div className="entourage__col">
                  <div className="entourage__sub-role entourage__sub-role--first">Lady of Honor</div>
                  <div className="entourage__pair">
                    <div className="entourage__name"><SplitName>Kimberly Dianne Copones</SplitName></div>
                  </div>
                </div>
              </div>

              <div className="entourage__sub-role">Bridesmaids</div>
              <div className="entourage__grid-3">
                <div className="entourage__col">
                  <div className="entourage__pair">
                    <div className="entourage__name"><SplitName>Mikaela Onofre</SplitName></div>
                    <div className="entourage__name"><SplitName>Chynna Esteban</SplitName></div>
                  </div>
                </div>
                <div className="entourage__col">
                  <div className="entourage__pair">
                    <div className="entourage__name"><SplitName>Jaila Villacarlos</SplitName></div>
                    <div className="entourage__name"><SplitName>Bea Villanueva</SplitName></div>
                    <div className="entourage__name"><SplitName>Noelle Lim</SplitName></div>
                  </div>
                </div>
                <div className="entourage__col">
                  <div className="entourage__pair">
                    <div className="entourage__name"><SplitName>Chin Wong</SplitName></div>
                    <div className="entourage__name"><SplitName>Kaye Atendido</SplitName></div>
                  </div>
                </div>
              </div>

              <div className="entourage__sub-role">Flower Girls</div>
              <div className="entourage__grid-3">
                <div className="entourage__col">
                  <div className="entourage__pair">
                    <div className="entourage__name"><SplitName>Blessie Marie Atendido</SplitName></div>
                    <div className="entourage__name"><SplitName>Julia Bagares</SplitName></div>
                    <div className="entourage__name"><SplitName>Ashzaira Rodriguez</SplitName></div>
                  </div>
                </div>
                <div className="entourage__col">
                  <div className="entourage__pair">
                    <div className="entourage__name"><SplitName>Zyreen Gwyneth Castillo</SplitName></div>
                    <div className="entourage__name"><SplitName>Jastine Javier</SplitName></div>
                    <div className="entourage__name"><SplitName>Mischa Calison</SplitName></div>
                  </div>
                </div>
                <div className="entourage__col">
                  <div className="entourage__pair">
                    <div className="entourage__name"><SplitName>Francine Casiño</SplitName></div>
                    <div className="entourage__name"><SplitName>Micaiah Castroverde</SplitName></div>
                    <div className="entourage__name"><SplitName>Nika Tamayo</SplitName></div>
                  </div>
                </div>
              </div>
            </div>
          </EntourageBox>

          {/* Box 5: Bearers */}
          <EntourageBox delay={200}>
            <h3 className="entourage__box-title" style={{ color: 'var(--color-yellow)' }}>Bearers</h3>
            <div className="entourage__grid-3">
              <div className="entourage__col">
                <div className="entourage__sub-role entourage__sub-role--first">Bible</div>
                <div className="entourage__pair">
                  <div className="entourage__name"><SplitName>TBA</SplitName></div>
                </div>
              </div>
              <div className="entourage__col">
                <div className="entourage__sub-role entourage__sub-role--first">Ring</div>
                <div className="entourage__pair">
                  <div className="entourage__name"><SplitName>Archie</SplitName></div>
                </div>
              </div>
              <div className="entourage__col">
                <div className="entourage__sub-role entourage__sub-role--first">Coin</div>
                <div className="entourage__pair">
                  <div className="entourage__name"><SplitName>Bruno</SplitName></div>
                </div>
              </div>
            </div>
          </EntourageBox>

        </div>
      </div>
    </section>
  )
}
