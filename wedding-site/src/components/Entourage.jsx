import { useEffect, useRef } from 'react'
import './Entourage.css'

const ENTOURAGE = [
  {
    role: 'Principal Sponsors',
    color: 'var(--color-orange)',
    pairs: true,
    members: [
      'Mr. Mark Martin & Mrs. Lara Martin',
      'Mr. Macairog Santos Jr. & Mrs. Mickey Santos',
      'Mr. George De Guzman & Mrs. Lyn Laguisma',
      'Mr. Joseph Magtalas & Mrs. Anne Magtalas',
      'Mr. Hepty Santos Jr. & Mrs. Vivian Santos',
      'Ms. Mayette Acuna & Ms. Josephine Garcia',
    ],
  },
  {
    role: 'Secondary Sponsors',
    color: 'var(--color-pink)',
    subsections: [
      { label: 'Candle', members: ['Miguel Jerico Onofre', 'Nicole Laguisma'] },
      { label: 'Veil', members: ['Marc Arnold Mateo', 'Jiane Trishia Magtalas'] },
      { label: 'Cord', members: ['John Lenmer Laguisma', 'Marian Angelique Garcia'] },
    ],
  },
  {
    role: 'Best Man',
    color: 'var(--color-blue)',
    members: ['Eric Marc Martin'],
  },
  {
    role: "Groom's Men",
    color: 'var(--color-blue)',
    members: [
      'Justin Lope',
      'Lesther Laguisma',
      'Justin Guevara',
      'Anton Geronimo',
      'Aizen Paman',
      'Rafael San Andres',
      'Jed Bambo',
    ],
  },
  {
    role: 'Men of Honor',
    color: 'var(--color-violet)',
    members: ['Rhoal Mica Esteban', 'Elijah Esteban'],
  },
  {
    role: 'Lady of Honor',
    color: 'var(--color-violet)',
    members: ['Kimberly Dianne Copones'],
  },
  {
    role: 'Maid of Honor',
    color: 'var(--color-pink)',
    members: ['Trisha Calucod'],
  },
  {
    role: "Bride's Maids",
    color: 'var(--color-pink)',
    members: [
      'Noelle Lim',
      'Chin Wong',
      'Kaye Atendido',
      'Chynna Esteban',
      'Jaila Villacarlos',
      'Bea Villanueva',
      'Mikaela Onofre',
    ],
  },
  {
    role: 'Flower Girls',
    color: 'var(--color-yellow)',
    members: [
      'Julia Bagares',
      'Zyreen Castillo',
      'Francine Casino',
      'Blessie Marie Atendido',
      'Jastine Javier',
      'Micaiah Castroverde',
      'Ashzaira Rodriguez',
      'Mischa Calison',
      'Nika Tamayo',
    ],
  },
  {
    role: 'Bearers',
    color: 'var(--color-green)',
    subsections: [
      { label: 'Bible Bearer', members: ['TBA'] },
      { label: 'Ring Bearer', members: ['Archie'] },
      { label: 'Coin Bearer', members: ['Bruno'] },
    ],
  },
]

function EntourageGroup({ group, delay }) {
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
    <div
      className="entourage__group"
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3
        className="entourage__role"
        style={{ '--accent-color': group.color }}
      >
        {group.role}
      </h3>

      {group.subsections ? (
        <div className="entourage__subsections">
          {group.subsections.map((sub, i) => (
            <div key={i} className="entourage__subsection">
              <p className="entourage__sublabel">{sub.label}</p>
              {sub.members.map((name, j) => (
                <p key={j} className="entourage__name">{name}</p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <ul className="entourage__names" role="list">
          {group.members.map((name, i) => (
            <li key={i} className="entourage__name">{name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Entourage() {
  return (
    <section className="entourage" id="entourage" aria-label="Wedding Entourage">
      <div className="section-container">
        <div className="entourage__header">
          <span className="section-label">The People</span>
          <h2 className="entourage__headline">
            Our{' '}
            <span className="entourage__headline-accent">Entourage</span>
          </h2>
        </div>

        <div className="entourage__grid">
          {ENTOURAGE.map((group, i) => (
            <EntourageGroup key={i} group={group} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  )
}
