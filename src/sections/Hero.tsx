import { AnimatePresence, m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { ArrowDown, ArrowRight, Bot, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import codingImg from '../assets/img/hero-coding.webp'
import studentsImg from '../assets/img/hero-students.webp'
import { Magnetic } from '../components/motion-ui'
import { EASE_OUT, useFinePointer } from '../lib/motion'
import { onAnchorClick } from '../lib/scroll'

const ROTATING_WORDS = ['doing.', 'building.', 'growing.']

const HIGHLIGHT_BADGES = [
  { label: 'Practical training', dot: 'bg-emerald' },
  { label: 'Personal mentorship', dot: 'bg-tangerine' },
  { label: 'Internship pathway', dot: 'bg-lime ring-1 ring-forest/30' },
]

/** Parallax layer that responds to pointer movement */
function Parallax({
  mx,
  my,
  depth,
  className,
  children,
}: {
  mx: MotionValue<number>
  my: MotionValue<number>
  depth: number
  className?: string
  children: ReactNode
}) {
  const x = useTransform(mx, (v) => v * depth)
  const y = useTransform(my, (v) => v * depth)
  return (
    <m.div style={{ x, y }} className={className}>
      {children}
    </m.div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const lift = useTransform(scrollYProgress, [0, 1], [0, -60])

  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [reduced])

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!fine || reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  const enter = (delay: number, y = 20) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, ease: EASE_OUT, delay },
        }

  const pop = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, scale: 0.88, y: 16 },
          animate: { opacity: 1, scale: 1, y: 0 },
          transition: { duration: 0.85, ease: EASE_OUT, delay },
        }

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-white pt-[80px] sm:pt-[96px]"
    >
      {/* Background Grid & Atmospheric Glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-55 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,#000,transparent)]" />
        {/* Emerald Ambient */}
        <div className="absolute -right-[10%] -top-[15%] h-[480px] w-[480px] sm:h-[580px] sm:w-[580px] animate-blob rounded-full bg-[radial-gradient(closest-side,rgb(8_127_91/0.14),transparent)]" />
        {/* Tangerine Ambient */}
        <div className="absolute -left-[12%] top-[35%] h-[420px] w-[420px] sm:h-[500px] sm:w-[500px] animate-blob rounded-full bg-[radial-gradient(closest-side,rgb(255_138_61/0.12),transparent)] [animation-delay:-7s]" />
        {/* Lime Ambient */}
        <div className="absolute bottom-[-10%] right-[25%] h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] animate-blob rounded-full bg-[radial-gradient(closest-side,rgb(217_242_105/0.18),transparent)] [animation-delay:-13s]" />
      </div>

      <div className="wrap relative grid items-center gap-x-10 gap-y-8 pb-10 lg:grid-cols-12 lg:pb-14">
        {/* Left Column: Copy & CTAs */}
        <div className="relative z-10 lg:col-span-7">
          {/* Eyebrow */}
          <m.div {...enter(0)}>
            <p className="inline-flex items-center gap-2 rounded-full border border-warm-grey bg-ivory py-1 pl-1.5 pr-3.5 text-xs sm:text-[0.86rem] font-medium text-charcoal shadow-2xs max-w-full truncate">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald px-2 py-0.5 font-display text-[0.7rem] sm:text-[0.74rem] font-bold text-white uppercase tracking-wider shrink-0">
                <Sparkles size={11} aria-hidden="true" /> Offline Centre
              </span>
              <span className="truncate">Kolkata’s next-generation learning space</span>
            </p>
          </m.div>

          {/* Primary Headline with Rotating Final Word */}
          <m.h1
            id="hero-title"
            {...enter(0.18)}
            className="mt-5 sm:mt-6 text-[clamp(2.15rem,7.4vw,5.2rem)] font-bold leading-[1.04] tracking-[-0.04em] text-charcoal"
          >
            <span>Stop just learning. </span>
            <br className="hidden sm:inline" />
            <span className="inline-flex items-baseline flex-wrap gap-x-2.5 sm:gap-x-3">
              <span>Start</span>
              <span className="relative inline-block min-w-[3.4ch] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <m.span
                    key={ROTATING_WORDS[wordIndex]}
                    initial={reduced ? false : { y: 44, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduced ? undefined : { y: -44, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="inline-block text-emerald underline decoration-lime decoration-4 underline-offset-6"
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </m.span>
                </AnimatePresence>
              </span>
            </span>
          </m.h1>

          {/* Supporting Content */}
          <m.p
            {...enter(0.35)}
            className="mt-5 sm:mt-6 max-w-[56ch] text-[1.02rem] sm:text-[1.18rem] leading-relaxed text-slate"
          >
            Your future deserves more than lectures. At Edutopia, we turn curiosity into career-ready skills through hands-on training, real-world projects, dedicated mentorship and structured internship opportunities.
          </m.p>

          {/* Action Buttons: Responsive Stack */}
          <m.div {...enter(0.48)} className="mt-7 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => onAnchorClick(e, 'contact')}
                className="btn btn-tangerine group w-full sm:w-auto font-semibold justify-center text-sm sm:text-base"
              >
                <span>Book a free counselling session</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#courses"
                onClick={(e) => onAnchorClick(e, 'courses')}
                className="btn btn-outline w-full sm:w-auto font-semibold hover:border-emerald justify-center text-sm sm:text-base"
              >
                Explore courses
              </a>
            </Magnetic>
          </m.div>

          {/* Highlight Badges */}
          <m.ul {...enter(0.62)} className="mt-8 sm:mt-9 flex flex-wrap gap-2 sm:gap-2.5" aria-label="Core highlights">
            {HIGHLIGHT_BADGES.map((b) => (
              <li
                key={b.label}
                className="chip border border-warm-grey bg-ivory py-1.5 sm:py-2 text-xs sm:text-[0.88rem] font-medium text-charcoal shadow-2xs"
              >
                <span className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full ${b.dot}`} aria-hidden="true" />
                {b.label}
              </li>
            ))}
          </m.ul>
        </div>

        {/* Right Column: Visual Composition with Student Photos & Floating Bento UI */}
        <m.div
          style={reduced ? undefined : { y: lift }}
          className="relative mx-auto w-full max-w-[500px] lg:col-span-5 lg:max-w-none"
        >
          <div className="relative aspect-[4/5] sm:aspect-[5/6]">
            {/* 3D Shape 1: Emerald Sphere */}
            <Parallax mx={mx} my={my} depth={-36} className="absolute -left-[4%] top-[5%] z-0">
              <div
                aria-hidden="true"
                className="h-20 w-20 sm:h-28 sm:w-28 animate-floaty rounded-full bg-[radial-gradient(circle_at_30%_28%,#D9F269,#087F5B_65%,#054734)] shadow-[0_20px_40px_-16px_rgb(8_127_91/0.55)]"
              />
            </Parallax>

            {/* 3D Shape 2: Tangerine Prism */}
            <Parallax mx={mx} my={my} depth={30} className="absolute -right-[2%] bottom-[22%] z-30">
              <div
                aria-hidden="true"
                className="h-14 w-14 sm:h-20 sm:w-20 animate-floaty-slow rounded-[18px] sm:rounded-[22px] bg-[linear-gradient(140deg,#FFB37A,#FF8A3D)] shadow-[0_18px_32px_-14px_rgb(255_138_61/0.7)] [transform:rotate(16deg)]"
              />
            </Parallax>

            {/* 3D Shape 3: Lime Radial Ring */}
            <Parallax mx={mx} my={my} depth={-18} className="absolute right-[6%] -top-[4%] z-0">
              <svg aria-hidden="true" viewBox="0 0 120 120" className="h-20 w-20 sm:h-28 sm:w-28 animate-spin-slow">
                <circle
                  cx="60"
                  cy="60"
                  r="44"
                  fill="none"
                  stroke="#D9F269"
                  strokeWidth="11"
                  strokeDasharray="6 12"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              </svg>
            </Parallax>

            {/* Main Photography Mask */}
            <m.div {...pop(0.22)} className="absolute inset-y-0 left-[6%] sm:left-[8%] right-0 z-10">
              <Parallax mx={mx} my={my} depth={-10} className="h-full">
                <div className="grain relative h-full overflow-hidden rounded-[120px_28px_28px_28px] sm:rounded-[220px_44px_44px_44px] bg-mint shadow-[var(--shadow-float)] border border-warm-grey">
                  <img
                    src={studentsImg}
                    alt="Students collaborating hands-on at Edutopia Kolkata"
                    width={1100}
                    height={1300}
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent"
                  />
                </div>
              </Parallax>
            </m.div>

            {/* Secondary Coding In-Action Photo */}
            <m.div {...pop(0.42)} className="absolute -left-[2%] bottom-[6%] z-20 w-[48%] sm:w-[47%]">
              <Parallax mx={mx} my={my} depth={18}>
                <div className="overflow-hidden rounded-[20px] sm:rounded-[26px] border-[4px] sm:border-[5px] border-white bg-mint-light shadow-[var(--shadow-float)]">
                  <img
                    src={codingImg}
                    alt="Two learners pair-programming on a laptop in Kolkata classroom"
                    width={700}
                    height={560}
                    decoding="async"
                    className="aspect-[5/4] w-full object-cover"
                  />
                </div>
              </Parallax>
            </m.div>

            {/* Floating Card: AI Project Preview */}
            <m.div {...pop(0.6)} className="absolute right-0 sm:right-[-4%] top-[10%] sm:top-[12%] z-30 w-[60%] sm:w-[58%] max-w-[210px] sm:max-w-[250px]">
              <Parallax mx={mx} my={my} depth={28}>
                <div className="rounded-[18px] sm:rounded-[22px] border border-white/80 bg-white/95 p-3 sm:p-3.5 shadow-[var(--shadow-float)] backdrop-blur-md">
                  <p className="flex items-center gap-1.5 font-display text-[0.68rem] sm:text-[0.72rem] font-bold uppercase tracking-[0.12em] text-emerald">
                    <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-lg bg-mint text-emerald">
                      <Bot size={13} aria-hidden="true" />
                    </span>
                    Project Preview
                  </p>
                  <p className="mt-1.5 font-display text-xs sm:text-[0.98rem] font-semibold leading-tight text-charcoal">
                    AI-powered chatbot
                  </p>
                  <div aria-hidden="true" className="mt-2 space-y-1.5">
                    <div className="ml-auto w-[76%] rounded-[10px_10px_2px_10px] bg-emerald px-2 py-1 text-[0.62rem] sm:text-[0.68rem] text-white font-medium">
                      How do I build AI models?
                    </div>
                    <div className="dot-typing flex w-fit gap-1 rounded-[10px_10px_10px_2px] bg-mint px-2.5 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                    </div>
                  </div>
                </div>
              </Parallax>
            </m.div>

            {/* Floating Card: 4-Stage Pathway Pill */}
            <m.div {...pop(0.8)} className="absolute bottom-[-3%] right-[2%] sm:right-[4%] z-30 w-[65%] sm:w-[64%] max-w-[250px] sm:max-w-[275px]">
              <Parallax mx={mx} my={my} depth={-24}>
                <div className="rounded-[18px] sm:rounded-[22px] bg-charcoal p-3 sm:p-4 text-white shadow-[var(--shadow-float)] border border-forest">
                  <p className="font-display text-[0.68rem] sm:text-[0.72rem] font-bold uppercase tracking-[0.14em] text-lime">
                    Your Pathway
                  </p>
                  <ol aria-label="Learn, practice, build, own" className="mt-2.5 flex items-center">
                    {['Learn', 'Practice', 'Build', 'Own'].map((s, i) => (
                      <li key={s} className="flex flex-1 items-center last:flex-none">
                        <span className="flex flex-col items-center gap-1">
                          <m.span
                            aria-hidden="true"
                            className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-lime shadow-2xs"
                            initial={reduced ? false : { scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 1.2 + i * 0.18,
                              type: 'spring',
                              stiffness: 300,
                              damping: 18,
                            }}
                          />
                          <span className="text-[0.62rem] sm:text-[0.66rem] font-medium text-white/85">{s}</span>
                        </span>
                        {i < 3 ? (
                          <span aria-hidden="true" className="mx-1 mb-3.5 h-[2px] flex-1 overflow-hidden rounded bg-white/20">
                            <m.span
                              className="block h-full origin-left bg-lime"
                              initial={reduced ? false : { scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 1.3 + i * 0.18, duration: 0.35 }}
                            />
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </div>
              </Parallax>
            </m.div>

            {/* Floating Badge: Tagline Pill */}
            <m.div {...pop(0.95)} className="absolute left-[10%] top-[-2%] z-30">
              <Parallax mx={mx} my={my} depth={14}>
                <span className="inline-block -rotate-6 rounded-full bg-lime px-3 py-1.5 sm:px-4 sm:py-2 font-display text-xs sm:text-[0.84rem] font-bold text-charcoal shadow-[0_10px_20px_-8px_rgb(217_242_105/0.8)] border border-emerald/20">
                  Learn. Create. Grow.
                </span>
              </Parallax>
            </m.div>
          </div>
        </m.div>
      </div>

      {/* Marquee Ticker Divider */}
      <div className="relative border-y border-warm-grey bg-ivory">
        <a
          href="#about"
          onClick={(e) => onAnchorClick(e, 'about')}
          aria-label="Scroll to About section"
          className="absolute -top-6 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-warm-grey bg-white text-charcoal shadow-[var(--shadow-card)] transition-colors hover:bg-mint hover:text-emerald"
        >
          <ArrowDown size={18} aria-hidden="true" />
        </a>
        <div aria-hidden="true" className="fade-x overflow-hidden py-4 sm:py-5">
          <div className="flex w-max motion-safe:animate-marquee">
            {[0, 1].map((k) => (
              <div key={k} className="flex shrink-0 items-center">
                {[
                  'AI & Machine Learning',
                  'Full Stack Web Development',
                  'Digital Marketing & SEO',
                  'UI/UX & Graphic Design',
                  'Data Analytics',
                  'Learn. Create. Grow.',
                ].map((t, i) => (
                  <span
                    key={`${k}-${t}`}
                    className="flex items-center font-display text-[0.95rem] sm:text-[1.25rem] font-semibold tracking-tight text-charcoal/80"
                  >
                    <span className="px-4 sm:px-8">{t}</span>
                    <span
                      className={`h-2 w-2 rotate-45 rounded-[2px] ${
                        ['bg-emerald', 'bg-tangerine', 'bg-lime', 'bg-forest', 'bg-emerald', 'bg-tangerine'][i]
                      }`}
                    />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
