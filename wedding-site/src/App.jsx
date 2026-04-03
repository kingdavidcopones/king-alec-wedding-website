import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import LoveStory from './components/LoveStory'
import WeddingDetails from './components/WeddingDetails'
import DressCode from './components/DressCode'
import FAQs from './components/FAQs'
import Entourage from './components/Entourage'
import RSVP from './components/RSVP'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Countdown />
        <LoveStory />
        <WeddingDetails />
        <DressCode />
        <FAQs />
        <Entourage />
        <RSVP />
      </main>
      <Footer />
    </>
  )
}

export default App
