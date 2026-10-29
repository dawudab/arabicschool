import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MissionVision from './components/MissionVision'
import Objectives from './components/Objectives'
import Activities from './components/Activities'
import Achievements from './components/Achievements'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-brand-50" />
      <div className="bg-geometric absolute inset-0 opacity-[0.05]" />
      <div className="absolute -top-40 -start-40 size-[32rem] rounded-full bg-brand-300/35 blur-3xl" />
      <div className="absolute top-1/3 -end-48 size-[30rem] rounded-full bg-accent-300/30 blur-3xl" />
      <div className="absolute -bottom-40 start-1/4 size-[28rem] rounded-full bg-brand-200/40 blur-3xl" />
    </div>
  )
}

export default function App() {
  return (
    <div className="relative isolate min-h-dvh overflow-x-clip">
      <Background />
      <Navbar />
      <main>
        <Hero />
        <About />
        <MissionVision />
        <Objectives />
        <Activities />
        <Achievements />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
