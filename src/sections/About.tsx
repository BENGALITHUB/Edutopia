import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Compass, Target } from 'lucide-react'
import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import buildImg from '../assets/img/step-build.webp'
import learnImg from '../assets/img/step-learn.webp'
import ownImg from '../assets/img/step-own.webp'
import practiceImg from '../assets/img/step-practice.webp'
import { Reveal, SplitHeading, Tilt } from '../components/motion-ui'
import { EASE_OUT } from '../lib/motion'

const STEPS = [
  {
    word: 'Learn it.',
    text: 'Start from the fundamentals, in person, with industry mentors guiding you through every concept.',
    img: learnImg,
    alt: 'Mentor teaching ambitious learners in Kolkata classroom',
    tone: 'text-emerald',
    bar: 'bg-emerald',
    tag: 'Step 01 · In-Person Mentorship',
  },
  {
    word: 'Practice it.',
    text: 'Work on assignments, collaborative code sessions, Figma reviews and live case studies.',
    img: practiceImg,
    alt: 'Learner practising coding and problem-solving on laptop',
    tone: 'text-tangerine',
    bar: 'bg-tangerine',
    tag: 'Step 02 · Hands-On Drills',
  },
  {
    word: 'Build it.',
    text: 'Create production-grade capstone projects that reflect actual industry requirements.',
    img: buildImg,
    alt: 'Student team brainstorming and building practical project',
    tone: 'text-forest',
    bar: 'bg-forest',
    tag: 'Step 03 · Industry Capstone',
  },
  {
    word: 'Own it.',
    text: 'Present your work with confidence on your resume, LinkedIn profile and portfolio.',
    img: ownImg,
    alt: 'Confident student presenting completed project to audience',
    tone: 'text-charcoal',
    bar: 'bg-lime',
    tag: 'Step 04 · Career Portfolio',
  },
]

export function About() {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const step = STEPS[active]!

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const d =
      e.key === 'ArrowDown' || e.key === 'ArrowRight'
        ? 1
        : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
        ? -1
        : 0
    if (!d) return
    e.preventDefault()
    const next = (i + d + STEPS.length) % STEPS.length
    setActive(next)
    document.getElementById(`phil-tab-${next}`)?.focus()
  }

  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-white py-12 sm:py-16 lg:py-20">
      <div className="wrap">
        {/* Editorial Intro: Asymmetric Grid */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">About Edutopia</p>
            </Reveal>
            <SplitHeading
              id="about-title"
              parts={['Not Another Classroom. A', ['Launchpad', 'emerald'], 'for Your Future.']}
              className="mt-5 text-[clamp(2.2rem,5.6vw,4.2rem)] font-bold text-charcoal leading-[1.08]"
            />
          </div>
          <Reveal delay={0.12} className="lg:col-span-5 lg:pt-8">
            <p className="font-display text-[1.2rem] sm:text-[1.35rem] font-semibold leading-snug text-charcoal">
              Real skills. Real people. <span className="text-tangerine">Real possibilities.</span>
            </p>
            <p className="mt-4 text-[1rem] sm:text-[1.05rem] leading-relaxed text-slate">
              Edutopia is an offline, skill-based training center in Kolkata committed to making career-focused education practical, affordable and accessible.
            </p>
            <p className="mt-3.5 text-[0.98rem] sm:text-[1.02rem] leading-relaxed text-slate">
              Learning should go beyond textbooks and certificates. Students deserve the chance to experiment, collaborate, solve problems and see how industries actually work. Whether you’re a college student, a complete beginner or someone upgrading your skills, Edutopia is built to feel exciting, supportive and meaningful.
            </p>
          </Reveal>
        </div>

        {/* Philosophy: Four Animated Visual Statements */}
        <div className="mt-16 sm:mt-24 lg:mt-28">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-end sm:justify-between border-b border-warm-grey pb-5">
            <div>
              <Reveal>
                <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-emerald">
                  Our Core Philosophy
                </p>
              </Reveal>
              <h3 className="mt-1 font-display text-xl sm:text-3xl font-bold text-charcoal">
                Four stages to real skill mastery
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate">Tap or hover any statement to inspect the learning phase.</p>
          </div>

          <div className="mt-6 sm:mt-8 grid items-stretch gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left: Tab Selectors */}
            <div className="lg:col-span-7">
              <div role="tablist" aria-label="Our philosophy statements" aria-orientation="vertical">
                {STEPS.map((s, i) => {
                  const on = i === active
                  return (
                    <Reveal key={s.word} delay={i * 0.05}>
                      <button
                        type="button"
                        role="tab"
                        id={`phil-tab-${i}`}
                        aria-selected={on}
                        aria-controls="phil-panel"
                        tabIndex={on ? 0 : -1}
                        onClick={() => setActive(i)}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onKeyDown={(e) => onKey(e, i)}
                        className="group relative flex w-full items-baseline gap-3 sm:gap-6 border-b border-warm-grey py-3.5 sm:py-5 text-left transition-colors focus-visible:outline-emerald cursor-pointer"
                      >
                        <span
                          className={`font-display text-xs sm:text-sm font-bold transition-colors duration-300 ${
                            on ? s.tone : 'text-slate/60'
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <span className="flex-1">
                          <span
                            className={`block font-display text-[clamp(1.75rem,6vw,4.2rem)] font-bold leading-[1] tracking-[-0.04em] transition-[color,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                              on
                                ? `${s.tone} translate-x-1.5 sm:translate-x-3`
                                : 'text-charcoal/25 group-hover:text-charcoal/50'
                            }`}
                          >
                            {s.word}
                          </span>
                          <span
                            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                              on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                          >
                            <span className="overflow-hidden">
                              <span className="block max-w-lg pl-1.5 pt-2 text-sm sm:text-[1rem] text-slate leading-relaxed">
                                {s.text}
                              </span>
                            </span>
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`absolute bottom-[-1px] left-0 h-[3px] rounded-full transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                            s.bar
                          } ${on ? 'w-full' : 'w-0'}`}
                        />
                      </button>
                    </Reveal>
                  )
                })}
              </div>
            </div>

            {/* Right: Responsive Interactive Image Canvas */}
            <div className="lg:col-span-5">
              <div
                id="phil-panel"
                role="tabpanel"
                aria-labelledby={`phil-tab-${active}`}
                className="relative h-full min-h-[300px] sm:min-h-[360px] overflow-hidden rounded-[26px] sm:rounded-[32px] bg-ivory p-2.5 sm:p-3 shadow-[var(--shadow-card)] border border-warm-grey"
              >
                <AnimatePresence mode="wait">
                  <m.div
                    key={step.word}
                    initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? undefined : { opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="relative h-full w-full overflow-hidden rounded-[20px] sm:rounded-[26px]"
                  >
                    <img
                      src={step.img}
                      alt={step.alt}
                      width={1000}
                      height={900}
                      className="h-full min-h-[290px] sm:min-h-[340px] w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white">
                      <span className="inline-block rounded-full bg-white/20 backdrop-blur px-3 py-1 font-display text-[0.72rem] sm:text-[0.78rem] font-semibold text-lime">
                        {step.tag}
                      </span>
                      <p className="mt-2 font-display text-xl sm:text-2xl font-bold leading-tight">{step.word}</p>
                      <p className="mt-1 text-xs sm:text-sm text-white/90 leading-snug">{step.text}</p>
                    </div>
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Bento Cards */}
        <div className="mt-14 sm:mt-20 grid gap-5 sm:gap-6 md:grid-cols-2">
          {/* Mission Card */}
          <Reveal>
            <Tilt max={4} className="group relative h-full overflow-hidden rounded-[28px] sm:rounded-[32px] border border-warm-grey bg-mint p-6 sm:p-9 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald text-white shadow-xs">
                  <Target size={22} aria-hidden="true" />
                </span>
                <span className="chip bg-white/80 text-emerald font-display text-xs font-bold uppercase tracking-wider">
                  Our Mission
                </span>
              </div>
              <h4 className="mt-5 font-display text-xl sm:text-2xl font-bold text-charcoal">
                Practical, accessible, quality training.
              </h4>
              <p className="mt-3 text-sm sm:text-[1.02rem] leading-relaxed text-slate">
                “To make quality, industry-relevant training accessible to every ambitious learner through affordable courses, personalized mentorship, practical experience and meaningful internship opportunities.”
              </p>
            </Tilt>
          </Reveal>

          {/* Vision Card */}
          <Reveal delay={0.1}>
            <Tilt max={4} className="group relative h-full overflow-hidden rounded-[28px] sm:rounded-[32px] border border-warm-grey bg-ivory p-6 sm:p-9 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tangerine text-charcoal shadow-xs">
                  <Compass size={22} aria-hidden="true" />
                </span>
                <span className="chip bg-white text-charcoal font-display text-xs font-bold uppercase tracking-wider border border-warm-grey">
                  Our Vision
                </span>
              </div>
              <h4 className="mt-5 font-display text-xl sm:text-2xl font-bold text-charcoal">
                A future-ready learning community.
              </h4>
              <p className="mt-3 text-sm sm:text-[1.02rem] leading-relaxed text-slate">
                “To build a future-ready learning community where every student, regardless of background, has the confidence, skills and practical exposure to pursue meaningful career opportunities.”
              </p>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
