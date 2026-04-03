import { useState, useRef, useEffect } from 'react'
import './RSVP.css'

export default function RSVP() {
  const [guestList, setGuestList] = useState([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('')
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const sectionRef = useRef(null)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const filtered = query.length > 0
    ? guestList.filter((g) => g.toLowerCase().includes(query.toLowerCase()))
    : []

  useEffect(() => {
    fetch('/api/guests')
      .then((r) => r.json())
      .then((data) => setGuestList(data.guests ?? []))
      .catch(() => { }) // fails silently; user can still type and we validate on submit
  }, [])

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

  const handleReset = () => {
    setSubmitted(false)
    setSelected('')
    setQuery('')
    setError('')
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selected) {
      setError('Please select your name from the guest list.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: selected }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
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

              <button
                type="submit"
                className="btn-primary rsvp__submit"
                disabled={submitting}
              >
                {submitting ? 'Confirming…' : 'Confirm Attendance'}
              </button>
            </form>
          ) : (
            <div className="rsvp__success" role="status">
              <p className="rsvp__success-name">{selected}</p>
              <p className="rsvp__success-msg">We can't wait to celebrate with you!</p>
              <p className="rsvp__success-date">See you on April 10, 2027.</p>
              <div className="rsvp__success-footer">
                <button className="rsvp__success-reset" onClick={handleReset}>
                  RSVP Another?
                </button>
                <div className="rsvp__success-sign">
                  <span className="rsvp__success-love">love,</span>
                  <img
                    src="/king-and-alec-faces.svg"
                    alt="King & Alec"
                    className="rsvp__success-logo"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
