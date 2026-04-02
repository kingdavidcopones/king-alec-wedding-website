import { useState, useRef, useEffect } from 'react'
import './FAQs.css'

const FAQ_DATA = [
  {
    q: 'What time should I arrive?',
    a: 'Guests are requested to arrive by 3:30 PM to allow time to be seated before the ceremony begins at 4:00 PM. Light refreshments will be served prior to the ceremony.',
  },
  {
    q: 'Is the ceremony unplugged?',
    a: 'The ceremony is not unplugged. Guests are welcome to take photos and videos during the ceremony. Kindly be mindful and present as we exchange our vows.',
  },
  {
    q: 'Can I wear anything in the color palette?',
    a: 'For ladies, yes — as long as the attire follows a garden formal dress code. For gentlemen, wearing a barong is highly encouraged.',
  },
  {
    q: 'Is this an adult-only wedding?',
    a: 'As much as we love your little ones, this will be an adult-only celebration. We hope this gives you the chance to relax and fully enjoy the evening, perhaps even as a special date night for parents.',
  },
  {
    q: 'Can I bring a plus one?',
    a: 'Due to limited capacity, attendance is strictly by invitation only. Please refer to the seats reserved under your name.',
  },
  {
    q: 'Are there recommended hotels nearby?',
    a: 'For guests who wish to stay nearby, rooms are available at Shalom Hotel Cavite. You may mention that you are attending King and Alec\'s wedding to be accommodated alongside fellow guests.',
  },
  {
    q: 'Is parking available?',
    a: 'The venue provides parking space for up to 80 cars, ensuring ample parking for all guests.',
  },
  {
    q: 'Should I bring a gift?',
    a: 'Your presence at our wedding is the greatest gift. Should you wish to give more, a gift registry is available via QR code at the reception.',
  },
  {
    q: 'When is the RSVP deadline?',
    a: 'Kindly confirm your attendance on or before March 1, 2027. Your prompt response will help us finalize seating arrangements and guest numbers. If we do not hear from you by then, we will assume you are unable to attend.',
  },
  {
    q: 'What happens if I don\'t RSVP?',
    a: 'Due to venue capacity, only guests who have confirmed their attendance will be accommodated. Kindly note that no RSVP means no reserved seat.',
  },
]

function AccordionItem({ question, answer, isOpen, onToggle, index }) {
  const bodyRef = useRef(null)

  // Drive max-height through a useEffect so we always read scrollHeight
  // from the committed DOM — avoids the "undefinedpx" edge case on first
  // render and ensures the measured height is always accurate.
  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) {
      // Set to the natural content height so CSS transition can animate to it
      el.style.maxHeight = el.scrollHeight + 'px'
    } else {
      el.style.maxHeight = '0px'
    }
  }, [isOpen])

  return (
    <div className={`faq__item${isOpen ? ' is-open' : ''}`}>
      <button
        className="faq__question"
        aria-expanded={isOpen}
        onClick={onToggle}
        id={`faq-btn-${index}`}
        aria-controls={`faq-body-${index}`}
      >
        <span className="faq__question-text">{question}</span>
        <span className="faq__icon" aria-hidden="true">
          <span className="faq__icon-bar faq__icon-bar--h" />
          <span className="faq__icon-bar faq__icon-bar--v" />
        </span>
      </button>
      <div
        className="faq__body"
        id={`faq-body-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        ref={bodyRef}
      >
        <p className="faq__answer">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null)
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
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="faqs" id="faqs" aria-label="Frequently Asked Questions" ref={sectionRef}>
      <div className="section-container">
        <div className="faqs__header">
          <span className="section-label">FAQs</span>
          <div className="faqs__headline-block">
            <h2 className="faqs__headline">
              <span className="faqs__headline-main">Got questions?</span>
              <span className="faqs__headline-accent">We have answers.</span>
            </h2>
          </div>
        </div>

        <div className="faqs__list" role="list">
          {FAQ_DATA.map((item, i) => (
            <AccordionItem
              key={i}
              index={i}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
