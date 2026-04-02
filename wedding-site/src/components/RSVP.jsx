import { useState, useRef, useEffect } from 'react'
import './RSVP.css'

// Guest list — searchable dropdown
const GUEST_LIST = [
  // Principal Sponsors
  'Mark Martin', 'Lara Martin',
  'Macairog Santos Jr.', 'Mickey Santos',
  'George De Guzman', 'Lyn Laguisma',
  'Joseph Magtalas', 'Anne Magtalas',
  'Hepty Santos Jr.', 'Vivian Santos',
  'Mayette Acuna', 'Josephine Garcia',
  // Secondary Sponsors
  'Miguel Jerico Onofre', 'Nicole Laguisma',
  'Marc Arnold Mateo', 'Jiane Trishia Magtalas',
  'John Lenmer Laguisma', 'Marian Angelique Garcia',
  // Wedding Party
  'Eric Marc Martin',
  'Justin Lope', 'Lesther Laguisma', 'Justin Guevara',
  'Anton Geronimo', 'Aizen Paman', 'Rafael San Andres', 'Jed Bambo',
  'Rhoal Mica Esteban', 'Elijah Esteban',
  'Kimberly Dianne Copones',
  'Trisha Calucod',
  'Noelle Lim', 'Chin Wong', 'Kaye Atendido',
  'Chynna Esteban', 'Jaila Villacarlos', 'Bea Villanueva', 'Mikaela Onofre',
  // Kids
  'Julia Bagares', 'Zyreen Castillo', 'Francine Casino',
  'Blessie Marie Atendido', 'Jastine Javier', 'Micaiah Castroverde',
  'Ashzaira Rodriguez', 'Mischa Calison', 'Nika Tamayo',
  'Archie', 'Bruno',
].sort()

export default function RSVP() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('')
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const sectionRef = useRef(null)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const filtered = query.length > 0
    ? GUEST_LIST.filter((g) => g.toLowerCase().includes(query.toLowerCase()))
    : []

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

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectGuest = (name) => {
    setSelected(name)
    setQuery(name)
    setOpen(false)
    setError('')
  }

  const handleInput = (e) => {
    const val = e.target.value
    setQuery(val)
    setSelected('')
    setOpen(val.length > 0)
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selected) {
      setError('Please select your name from the guest list.')
      return
    }
    setSubmitted(true)
  }

  return (
    <section className="rsvp" id="rsvp" aria-label="RSVP" ref={sectionRef}>
      <div className="rsvp__bg-accent" aria-hidden="true" />
      <div className="section-container rsvp__container">
        <div className="rsvp__inner">
          <div className="rsvp__text">
            <span className="section-label rsvp__label">RSVP</span>
            <h2 className="rsvp__headline">
              Will you
              <span className="rsvp__headline-accent"> join us?</span>
            </h2>
            <p className="rsvp__deadline">
              Please RSVP by{' '}
              <strong>March 1, 2027</strong>
            </p>
            <p className="rsvp__policy">
              Your timely response will help us finalize seating arrangements.
              If we don't hear from you by then, we'll assume you are unable to attend.
            </p>
            <p className="rsvp__policy rsvp__policy--note">
              Due to venue capacity, only guests who have confirmed their attendance
              will be accommodated. <strong>No RSVP means no reserved seat.</strong>
            </p>
          </div>

          {!submitted ? (
            <form className="rsvp__form" onSubmit={handleSubmit} noValidate>
              <div className="rsvp__field">
                <label htmlFor="rsvp-name" className="rsvp__field-label">
                  Your Name
                </label>
                <div className="rsvp__combobox-wrap">
                  <input
                    id="rsvp-name"
                    ref={inputRef}
                    type="text"
                    className={`rsvp__input${error ? ' has-error' : ''}`}
                    placeholder="Type your name to search…"
                    value={query}
                    onChange={handleInput}
                    onFocus={() => query.length > 0 && setOpen(true)}
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-expanded={open}
                    aria-controls="rsvp-dropdown"
                    aria-haspopup="listbox"
                    role="combobox"
                  />
                  {open && filtered.length > 0 && (
                    <ul
                      className="rsvp__dropdown"
                      id="rsvp-dropdown"
                      role="listbox"
                      aria-label="Guest list suggestions"
                      ref={dropdownRef}
                    >
                      {filtered.map((name) => (
                        <li
                          key={name}
                          role="option"
                          aria-selected={name === selected}
                          className={`rsvp__dropdown-item${name === selected ? ' is-selected' : ''}`}
                          onMouseDown={(e) => {
                            e.preventDefault()
                            selectGuest(name)
                          }}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}
                  {open && query.length > 0 && filtered.length === 0 && (
                    <div className="rsvp__dropdown rsvp__dropdown--empty" role="alert">
                      No guest found. Please contact us to verify your invitation.
                    </div>
                  )}
                </div>
                {error && (
                  <p className="rsvp__error" role="alert" aria-live="polite">
                    {error}
                  </p>
                )}
              </div>

              <button type="submit" className="btn-primary rsvp__submit">
                Confirm Attendance
              </button>
            </form>
          ) : (
            <div className="rsvp__success" role="status">
              <p className="rsvp__success-icon" aria-hidden="true">✦</p>
              <p className="rsvp__success-name">{selected}</p>
              <p className="rsvp__success-msg">
                We can't wait to celebrate with you!
                <br />
                See you on April 10, 2027.
              </p>
              <p className="rsvp__success-note">
                (Please note: this is a preview. Final RSVP system will be integrated closer to the date.)
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
