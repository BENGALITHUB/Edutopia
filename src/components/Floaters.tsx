import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { whatsappUrl } from '../data/site'
import { useFinePointer } from '../lib/motion'

/** Floating WhatsApp button. Opens chat when configured, otherwise jumps to the enquiry form. */
export function WhatsAppFab() {
  const cls =
    'fixed bottom-[calc(env(safe-area-inset-bottom,0px)+20px)] right-[20px] z-40 flex h-14 items-center gap-2.5 rounded-full bg-[#25D366] px-5 font-display font-semibold text-[#07351A] shadow-[0_12px_32px_-8px_rgb(37_211_102/0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-6px_rgb(37_211_102/0.75)] max-sm:w-14 max-sm:justify-center max-sm:px-0'
  const icon = (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current shrink-0" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.3-.5.1-1.2.1-3.800-1-3.200-1.400-5.200-4.600-5.400-4.800-.2-.2-1.300-1.700-1.300-3.200s.800-2.300 1.100-2.600c.300-.3.600-.4.800-.4h.600c.200 0 .400 0 .600.5l.900 2.200c.1.2.1.4 0 .6l-.400.6-.500.5c-.2.2-.3.4-.1.7.2.3.800 1.300 1.700 2.100 1.200 1 2.200 1.400 2.500 1.500.300.2.500.1.700-.1l1-1.200c.200-.3.400-.2.700-.1l2.100 1c.300.2.500.2.600.4.1.1.1.8-.2 1.500z" />
    </svg>
  )

  return (
    <a
      href={whatsappUrl('Hi Edutopia, I would like to book a free counselling session and learn more about your courses.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Edutopia on WhatsApp"
      className={cls}
    >
      {icon}
      <span className="max-sm:hidden">Chat on WhatsApp</span>
    </a>
  )
}

/**
 * Desktop-only cursor accent: an emerald ring that trails the pointer and reacts to interactive elements.
 * Uses Emerald Green theme without obscuring the default system cursor.
 */
export function CursorRing() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const x = useSpring(useMotionValue(-100), { stiffness: 320, damping: 30, mass: 0.5 })
  const y = useSpring(useMotionValue(-100), { stiffness: 320, damping: 30, mass: 0.5 })
  const [hot, setHot] = useState(false)
  const [seen, setSeen] = useState(false)
  const enabled = fine && !reduced

  useEffect(() => {
    if (!enabled) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setSeen(true)
      const t = e.target as Element | null
      const isHot = !!t?.closest?.('a, button, [role="tab"], summary, select, input, textarea')
      setHot((h) => (h === isHot ? h : isHot))
    }
    const leave = () => setSeen(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <m.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90]" style={{ x, y }}>
      <m.span
        className="absolute -left-4 -top-4 block h-8 w-8 rounded-full border-[1.5px] border-emerald/60"
        animate={{
          scale: hot ? 1.85 : 1,
          opacity: seen ? (hot ? 0.9 : 0.45) : 0,
          backgroundColor: hot ? 'rgba(8,127,91,0.08)' : 'rgba(8,127,91,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
    </m.div>
  )
}
