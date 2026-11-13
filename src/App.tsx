import { LazyMotion, MotionConfig } from 'motion/react'
import { CursorRing, WhatsAppFab } from './components/Floaters'
import { SiteProvider } from './lib/SiteContext'
import { About } from './sections/About'
import { Certification } from './sections/Certification'
import { Community } from './sections/Community'
import { Contact } from './sections/Contact'
import { Courses } from './sections/Courses'
import { Faq } from './sections/Faq'
import { Fees } from './sections/Fees'
import { Footer, LegalDialogs } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Journey } from './sections/Journey'
import { Navbar } from './sections/Navbar'
import { Why } from './sections/Why'

// Animation features load asynchronously in their own chunk
const loadFeatures = () => import('./lib/motionFeatures').then((r) => r.default)

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <SiteProvider>
          <div id="app-shell" className="min-h-screen bg-white text-charcoal selection:bg-lime selection:text-charcoal">
            {/* Accessible Skip Link */}
            <a
              href="#main"
              className="sr-only rounded-full bg-charcoal px-5 py-3 font-display font-semibold text-white shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:outline-emerald"
            >
              Skip to main content
            </a>
            <Navbar />
            <main id="main" tabIndex={-1} className="outline-none">
              <Hero />
              <About />
              <Why />
              <Courses />
              <Fees />
              <Journey />
              <Certification />
              <Community />
              <Faq />
              <Contact />
            </main>
            <Footer />
            <WhatsAppFab />
          </div>
          <LegalDialogs />
          <CursorRing />
        </SiteProvider>
      </LazyMotion>
    </MotionConfig>
  )
}
