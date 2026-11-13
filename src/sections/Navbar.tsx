import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { Logo } from '../components/Logo'
import { Magnetic } from '../components/motion-ui'
import { NAV } from '../data/site'
import { useActiveSection, useFocusTrap, useScrollLock } from '../lib/hooks'
import { EASE_OUT } from '../lib/motion'
import { onAnchorClick } from '../lib/scroll'

const SECTION_IDS = [
  'top',
  'about',
  'why',
  'courses',
  'fees',
  'internships',
  'certification',
  'community',
  'faq',
  'contact',
]

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const reduced = useReducedMotion()
  const header = useRef<HTMLElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > 20
    if (next !== scrolled) setScrolled(next)
  })
  useFocusTrap(header, open, () => setOpen(false))
  useScrollLock(open)

  return (
    <header
      ref={header}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-warm-grey bg-white/90 shadow-[0_8px_30px_-18px_rgb(8_127_91/0.18)] backdrop-blur-xl'
          : 'border-b border-transparent bg-white/40 backdrop-blur-sm'
      }`}
    >
      <div
        className={`wrap flex items-center justify-between gap-4 transition-[height] duration-300 ${
          scrolled ? 'h-16' : 'h-[76px]'
        }`}
      >
        <a
          href="#top"
          onClick={(e) => onAnchorClick(e, 'top')}
          aria-label="Edutopia Kolkata Home"
          className="rounded-xl focus-visible:outline-emerald"
        >
          <Logo />
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden xl:block">
          <ul className="flex items-center gap-1 bg-ivory/80 p-1.5 rounded-full border border-warm-grey/80 shadow-xs">
            {NAV.map((l) => {
              const on = active === l.id
              return (
                <li key={l.id} className="relative">
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => onAnchorClick(e, l.id)}
                    aria-current={on ? 'true' : undefined}
                    className={`relative z-10 block whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.9rem] font-medium transition-colors ${
                      on ? 'text-white font-semibold' : 'text-slate hover:text-charcoal'
                    }`}
                  >
                    {l.label}
                  </a>
                  {on ? (
                    <m.span
                      layoutId="nav-active-pill"
                      aria-hidden="true"
                      className="absolute inset-0 z-0 rounded-full bg-emerald shadow-xs"
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  ) : null}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2.5">
          <Magnetic className="hidden sm:inline-flex">
            <a
              href="#contact"
              onClick={(e) => onAnchorClick(e, 'contact')}
              className="btn btn-tangerine btn-sm shadow-sm font-semibold"
            >
              Free Counselling
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Magnetic>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-warm-grey bg-white text-charcoal shadow-xs hover:border-emerald hover:text-emerald xl:hidden transition-colors"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Reading Progress Indicator */}
      <m.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-1px] h-[2.5px] origin-left bg-gradient-to-r from-emerald via-lime to-tangerine"
        style={{ scaleX: scrollYProgress, opacity: scrolled ? 1 : 0 }}
      />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open ? (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile site menu"
            className="xl:hidden border-b border-warm-grey bg-white/95 px-6 pb-6 pt-2 backdrop-blur-xl shadow-lg"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <ul className="flex flex-col divide-y divide-warm-grey/60">
              {NAV.map((l) => {
                const on = active === l.id
                return (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={(e) => {
                        setOpen(false)
                        onAnchorClick(e, l.id)
                      }}
                      aria-current={on ? 'true' : undefined}
                      className={`flex items-center justify-between py-3.5 font-display text-[1.05rem] font-medium transition-colors ${
                        on ? 'text-emerald font-bold' : 'text-charcoal hover:text-emerald'
                      }`}
                    >
                      <span>{l.label}</span>
                      {on && <span className="h-2 w-2 rounded-full bg-emerald" />}
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className="mt-5 pt-3">
              <a
                href="#contact"
                onClick={(e) => {
                  setOpen(false)
                  onAnchorClick(e, 'contact')
                }}
                className="btn btn-tangerine w-full justify-center"
              >
                Book Free Counselling
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </m.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
