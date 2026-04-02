import { useState, useEffect, useRef } from 'react'
import './Countdown.css'

// Target: April 10, 2027 4:00 PM PHT (UTC+8)
const TARGET = new Date('2027-04-10T16:00:00+08:00').getTime()

function pad(n) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function getTimeLeft() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function CountUnit({ value, label }) {
  const prevRef = useRef(value)
  const [flipping, setFlipping] = useState(false)

  useEffect(() => {
    if (prevRef.current !== value) {
      prevRef.current = value
      const tOn = setTimeout(() => setFlipping(true), 0)
      const tOff = setTimeout(() => setFlipping(false), 300)
      return () => {
        clearTimeout(tOn)
        clearTimeout(tOff)
      }
    }
  }, [value])

  return (
    <div className="countdown__unit">
      <div className={`countdown__value${flipping ? ' is-flipping' : ''}`}>
        {pad(value)}
      </div>
      <span className="countdown__label">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())
  const sectionRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  // Scroll fade-in
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
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="countdown" id="countdown" ref={sectionRef} aria-label="Countdown to wedding">
      <div className="section-container">
        <p className="countdown__heading">
          <span className="countdown__accent">counting down to</span>
          <span className="countdown__date-label">April 10, 2027</span>
        </p>
        <div className="countdown__grid" role="timer" aria-live="polite" aria-atomic="true">
          <CountUnit value={time.days} label="Days" />
          <div className="countdown__sep" aria-hidden="true">:</div>
          <CountUnit value={time.hours} label="Hours" />
          <div className="countdown__sep" aria-hidden="true">:</div>
          <CountUnit value={time.minutes} label="Minutes" />
          <div className="countdown__sep" aria-hidden="true">:</div>
          <CountUnit value={time.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  )
}
