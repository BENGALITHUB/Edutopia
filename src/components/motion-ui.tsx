import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'
import { EASE_OUT, useFinePointer } from '../lib/motion'

/* ── Reveal: one-time scroll reveal (transform + opacity) ───────────────── */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'article'
}) {
  const reduced = useReducedMotion()
  const M = m[as]
  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </M>
  )
}

/* ── SplitHeading: staggered word reveal from behind a mask ─────────────── */
export type HeadTone = 'emerald' | 'tangerine' | 'lime' | 'forest' | 'charcoal' | 'white' | 'slate'
/** A word group: plain string, or [text, tone] for a highlighted run. */
export type HeadPart = string | [string, HeadTone]

const TONE: Record<HeadTone, string> = {
  emerald: 'text-emerald',
  tangerine: 'text-tangerine',
  lime: 'text-emerald',
  forest: 'text-forest',
  charcoal: 'text-charcoal',
  white: 'text-white',
  slate: 'text-slate',
}

interface SplitHeadingProps {
  as?: 'h1' | 'h2' | 'h3'
  parts: HeadPart[]
  className?: string
  id?: string
  immediate?: boolean
  delay?: number
}

export function SplitHeading({
  as: Tag = 'h2',
  parts,
  className = '',
  id,
  immediate = false,
  delay = 0,
}: SplitHeadingProps) {
  const reduced = useReducedMotion()
  const words = parts.flatMap((p) => {
    const [text, tone] = typeof p === 'string' ? [p, undefined] : p
    return text.split(' ').filter(Boolean).map((w) => ({ w, tone }))
  })
  const full = words.map((x) => x.w).join(' ')

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {words.map((x, i) => (
          <span key={i} className={x.tone ? TONE[x.tone] : undefined}>
            {x.w}{' '}
          </span>
        ))}
      </Tag>
    )
  }

  const view = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -12% 0px' } }

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{full}</span>
      <m.span
        aria-hidden="true"
        initial="hidden"
        {...view}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      >
        {words.map((x, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <m.span
                className={`inline-block ${x.tone ? TONE[x.tone] : ''}`}
                variants={{
                  hidden: { y: '110%', rotate: 4 },
                  show: { y: '0%', rotate: 0, transition: { duration: 0.85, ease: EASE_OUT } },
                }}
              >
                {x.w}
              </m.span>
            </span>{' '}
          </span>
        ))}
      </m.span>
    </Tag>
  )
}

/* ── Magnetic: element leans toward the cursor (fine pointers only) ─────── */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 })

  if (!fine || reduced) return <span className={`inline-flex ${className ?? ''}`}>{children}</span>

  const move = (e: PointerEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <m.span
      className={`inline-flex ${className ?? ''}`}
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
    </m.span>
  )
}

/* ── Tilt: subtle 3D tilt + cursor sheen ────────────────────────────────── */
export function Tilt({
  children,
  className = '',
  max = 5,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  if (!fine || reduced) return <div className={className}>{children}</div>

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * max * 2)
    rx.set((0.5 - py) * max * 2)
    e.currentTarget.style.setProperty('--mx', `${px * 100}%`)
    e.currentTarget.style.setProperty('--my', `${py * 100}%`)
  }
  const leave = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <m.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
    </m.div>
  )
}

/* ── ImageReveal: mask wipe + settle zoom on scroll, soft zoom on hover ─── */
interface ImageRevealProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  width: number
  height: number
  eager?: boolean
  delay?: number
}

export function ImageReveal({
  src,
  alt,
  className = '',
  imgClassName = '',
  width,
  height,
  eager = false,
  delay = 0,
}: ImageRevealProps) {
  const reduced = useReducedMotion()
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      className={`h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover/img:scale-[1.05] ${imgClassName}`}
    />
  )
  if (reduced) return <div className={`group/img relative overflow-hidden ${className}`}>{img}</div>
  return (
    <m.div
      className={`group/img relative overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.1, ease: EASE_OUT, delay }}
    >
      <m.div
        className="h-full w-full"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: EASE_OUT, delay }}
      >
        {img}
      </m.div>
    </m.div>
  )
}
