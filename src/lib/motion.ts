import { useState, useSyncExternalStore } from 'react'
import { useReducedMotion } from 'motion/react'
import type { Transition, Variants } from 'motion/react'

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1]

export const springSoft: Transition = { type: 'spring', stiffness: 260, damping: 28, mass: 0.8 }
export const springSnappy: Transition = { type: 'spring', stiffness: 420, damping: 32 }

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
}

export const staggerParent = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

function subscribeMedia(query: string) {
  return (cb: () => void) => {
    if (typeof window === 'undefined' || !window.matchMedia) return () => {}
    const mq = window.matchMedia(query)
    mq.addEventListener?.('change', cb)
    return () => mq.removeEventListener?.('change', cb)
  }
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false),
    () => false,
  )
}

/** Fine pointer + hover capable (mouse / trackpad). Touch devices return false. */
export function useFinePointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}

/** Reduced motion from OS setting OR the Save-Data hint. */
export function useCalmMode(): boolean {
  const reduced = useReducedMotion() ?? false
  const [saveData] = useState(() => {
    if (typeof navigator === 'undefined') return false
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } }
    return Boolean(nav.connection?.saveData)
  })
  return reduced || saveData
}

export function usePageVisible(): boolean {
  return useSyncExternalStore(
    (cb) => {
      document.addEventListener('visibilitychange', cb)
      return () => document.removeEventListener('visibilitychange', cb)
    },
    () => document.visibilityState !== 'hidden',
    () => true,
  )
}
