import { AnimatePresence, m } from 'motion/react'
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  MessageSquareQuote,
  Sparkles,
  Star,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Reveal, SplitHeading, Tilt } from '../components/motion-ui'
import heroStudentsImg from '../assets/img/hero-students.webp'
import heroCodingImg from '../assets/img/hero-coding.webp'
import mentorImg from '../assets/img/mentor.webp'
import buildImg from '../assets/img/step-build.webp'

type HighlightCategory =
  | 'all'
  | 'classroom'
  | 'projects'
  | 'workshops'
  | 'testimonials'

interface Testimonial {
  id: string
  name: string
  initials: string
  tone: 'emerald' | 'tangerine' | 'lime'
  role: string
  track: string
  rating: number
  quote: string
  project: string
  batch: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ananya Roy',
    initials: 'AR',
    tone: 'emerald',
    role: 'Frontend Developer Intern',
    track: 'Full Stack Web Development',
    rating: 5,
    quote:
      'The offline practical sessions in Jadavpur gave me the hands-on project confidence I couldn’t get from online videos alone. Having mentors right next to you to debug React state and APIs makes all the difference.',
    project: 'Business Web Application',
    batch: '2025 Cohort',
  },
  {
    id: 't2',
    name: 'Debjit Sen',
    initials: 'DS',
    tone: 'tangerine',
    role: 'AI Engineering Trainee',
    track: 'Artificial Intelligence & ML',
    rating: 5,
    quote:
      'Most courses only teach theory. At Edutopia, we trained on actual datasets, implemented ML models, and built an end-to-end AI chatbot with prompt engineering. Mentorship is top tier.',
    project: 'AI-Powered Chatbot',
    batch: '2025 Cohort',
  },
  {
    id: 't3',
    name: 'Priyanka Mondal',
    initials: 'PM',
    tone: 'lime',
    role: 'Junior UI/UX Designer',
    track: 'UI/UX & Graphic Design',
    rating: 5,
    quote:
      'Transitioned from a non-tech background with zero Figma knowledge. The structured curriculum and project reviews helped me build a portfolio that landed my first paid product design internship.',
    project: 'Interactive Mobile App Prototype',
    batch: '2025 Cohort',
  },
  {
    id: 't4',
    name: 'Rohan Das',
    initials: 'RD',
    tone: 'emerald',
    role: 'Junior Data Analyst',
    track: 'Data Analytics Track',
    rating: 5,
    quote:
      'Mastered SQL complex queries, Power BI DAX formulas, and Python automation. Realistic business case studies prepared me directly for technical interviews in Kolkata.',
    project: 'Business Intelligence Dashboard',
    batch: '2025 Cohort',
  },
]

const TONE_BADGES = {
  emerald: 'bg-mint text-emerald border-emerald/25',
  tangerine: 'bg-tangerine/15 text-charcoal border-tangerine/30',
  lime: 'bg-lime/50 text-charcoal border-forest/30',
}

export function Community() {
  const [filter, setFilter] = useState<HighlightCategory>('all')
  const [activeReviewIndex, setActiveReviewIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-cycle through floating review cards every 5.5s (pauses on hover)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [isPaused])

  const nextReview = () =>
    setActiveReviewIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  const prevReview = () =>
    setActiveReviewIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  const currentReview = TESTIMONIALS[activeReviewIndex]!
  const secondaryReview =
    TESTIMONIALS[(activeReviewIndex + 1) % TESTIMONIALS.length]!

  return (
    <section
      id="community"
      aria-labelledby="community-title"
      className="relative bg-ivory py-12 sm:py-16 lg:py-20"
    >
      <div className="wrap">
        {/* Section Header: Title + Intro */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow">Student Community</p>
            </Reveal>
            <SplitHeading
              id="community-title"
              parts={[
                'Good Skills.',
                ['Great People.', 'emerald'],
                ['Better Futures.', 'tangerine'],
              ]}
              className="mt-4 text-[clamp(2.2rem,5.6vw,4.2rem)] font-bold text-charcoal leading-[1.08]"
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-4">
            <p className="text-[1.02rem] text-slate leading-relaxed sm:text-[1.06rem]">
              Learning is better when you’re surrounded by people who inspire you. Connect, collaborate, share ideas and grow together in a welcoming offline space in Kolkata.
            </p>
          </Reveal>
        </div>

        {/* Filter Tabs matching reference image */}
        <div className="mt-8 flex flex-wrap gap-2">
          {(
            [
              ['all', 'All Highlights'],
              ['classroom', 'Classroom Culture'],
              ['projects', 'Project Sprints'],
              ['workshops', 'Workshops & Mentorship'],
              ['testimonials', 'Student Testimonials'],
            ] as const
          ).map(([cat, label]) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`chip text-xs font-semibold transition-all duration-200 cursor-pointer ${
                filter === cat
                  ? 'bg-emerald text-white shadow-xs'
                  : 'bg-white border border-warm-grey text-slate hover:border-emerald hover:text-charcoal'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Bento Grid: 2 Columns on Desktop, Fully Responsive on Tablet & Mobile */}
        <div className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-12 items-stretch">
          {/* ──────────────── Left Main Column (Photos) ──────────────── */}
          <div
            className={`lg:col-span-7 flex flex-col gap-4 sm:gap-5 ${
              filter === 'testimonials' ? 'hidden lg:flex opacity-40' : ''
            }`}
          >
            {/* Top Large Photo: Collaborative Learning Space */}
            <Tilt
              max={2}
              className="group relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-warm-grey bg-white shadow-[var(--shadow-card)] min-h-[280px] sm:min-h-[380px] lg:h-[390px] flex-1"
            >
              <img
                src={heroStudentsImg}
                alt="Collaborative Learning Space at Edutopia Kolkata"
                width={1000}
                height={700}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"
              />
              <span className="absolute left-4 top-4 chip bg-white/90 text-charcoal text-xs font-bold backdrop-blur shadow-2xs">
                Classroom
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white">
                <h4 className="font-display text-lg sm:text-2xl font-bold leading-snug">
                  Collaborative Learning Space
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-white/85 line-clamp-2 max-w-lg">
                  Offline cohorts solving challenges together at our Kolkata centre.
                </p>
              </div>
            </Tilt>

            {/* Bottom Row: 2 Side-by-Side Photos */}
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
              {/* Bottom Left Photo: Mentor-Guided Code Reviews */}
              <Tilt
                max={3}
                className="group relative overflow-hidden rounded-[26px] sm:rounded-[28px] border border-warm-grey bg-white shadow-[var(--shadow-card)] h-[210px] sm:h-[230px]"
              >
                <img
                  src={mentorImg}
                  alt="Mentor-Guided Code Reviews"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent"
                />
                <span className="absolute left-3.5 top-3.5 chip bg-white/90 text-charcoal text-[0.72rem] font-bold backdrop-blur shadow-2xs">
                  Mentorship
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h4 className="font-display text-sm sm:text-base font-bold leading-tight">
                    Mentor-Guided Code Reviews
                  </h4>
                  <p className="mt-0.5 text-[0.72rem] sm:text-xs text-white/80 line-clamp-1">
                    Weekly architecture critiques and doubt-clearing sessions.
                  </p>
                </div>
              </Tilt>

              {/* Bottom Right Photo: Capstone Design Sprints */}
              <Tilt
                max={3}
                className="group relative overflow-hidden rounded-[26px] sm:rounded-[28px] border border-warm-grey bg-white shadow-[var(--shadow-card)] h-[210px] sm:h-[230px]"
              >
                <img
                  src={buildImg}
                  alt="Capstone Design Sprints"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent"
                />
                <span className="absolute left-3.5 top-3.5 chip bg-white/90 text-charcoal text-[0.72rem] font-bold backdrop-blur shadow-2xs">
                  Design Sprint
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h4 className="font-display text-sm sm:text-base font-bold leading-tight">
                    Capstone Design Sprints
                  </h4>
                  <p className="mt-0.5 text-[0.72rem] sm:text-xs text-white/80 line-clamp-1">
                    Building responsive interfaces and prototype wireframes.
                  </p>
                </div>
              </Tilt>
            </div>
          </div>

          {/* ──────────────── Right Column (Pair Coding + Green Feedback Column) ──────────────── */}
          <div
            className={`lg:col-span-5 flex flex-col gap-4 sm:gap-5 ${
              filter === 'classroom' || filter === 'workshops'
                ? 'hidden lg:flex opacity-40'
                : ''
            }`}
          >
            {/* Top Photo: Hands-on Pair Programming */}
            <Tilt
              max={3}
              className="group relative overflow-hidden rounded-[26px] sm:rounded-[28px] border border-warm-grey bg-white shadow-[var(--shadow-card)] h-[190px] sm:h-[200px]"
            >
              <img
                src={heroCodingImg}
                alt="Hands-on Pair Programming at Edutopia"
                width={800}
                height={500}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent"
              />
              <span className="absolute left-3.5 top-3.5 chip bg-white/90 text-charcoal text-[0.72rem] font-bold backdrop-blur shadow-2xs">
                Pair Coding
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h4 className="font-display text-sm sm:text-base font-bold leading-tight">
                  Hands-on Pair Programming
                </h4>
                <p className="mt-0.5 text-[0.72rem] sm:text-xs text-white/80 line-clamp-1">
                  Students debugging full stack applications side by side.
                </p>
              </div>
            </Tilt>

            {/* ────────── The Green Column with Floating Feedback Cards ────────── */}
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[28px] sm:rounded-[32px] border border-emerald/25 bg-mint p-5 sm:p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-xl"
            >
              {/* Header inside the green column */}
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-emerald/20 pb-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald shadow-2xs shrink-0">
                    <MessageSquareQuote size={20} />
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="chip bg-white text-emerald text-[0.7rem] font-bold uppercase tracking-wider shadow-2xs border border-emerald/20 flex items-center gap-1">
                      <Sparkles size={11} />
                      Verified Feedback
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-charcoal font-semibold">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-[#F5B544] text-[#F5B544]" />
                    ))}
                    <span className="ml-1 text-charcoal font-bold">4.9 / 5.0</span>
                  </div>
                  <span className="text-slate text-[0.72rem]">250+ Kolkata Students</span>
                </div>
              </div>

              {/* Floating Cards Container: Animated Cards Stack */}
              <div className="my-4 space-y-3 relative">
                {/* Primary Floating Card */}
                <AnimatePresence mode="wait">
                  <m.div
                    key={currentReview.id}
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="relative overflow-hidden rounded-2xl border border-warm-grey bg-white p-4 sm:p-5 shadow-[0_8px_20px_-6px_rgb(8_127_91/0.14)] transition-transform duration-500 hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-xs font-bold border ${
                            TONE_BADGES[currentReview.tone]
                          }`}
                        >
                          {currentReview.initials}
                        </span>
                        <div>
                          <h5 className="font-display text-sm font-bold text-charcoal leading-tight">
                            {currentReview.name}
                          </h5>
                          <p className="text-[0.72rem] text-slate font-medium">
                            {currentReview.role}
                          </p>
                        </div>
                      </div>

                      <span className="chip bg-mint text-emerald text-[0.66rem] font-bold uppercase tracking-wider py-0.5 px-1.5 border border-emerald/20 flex items-center gap-1 shrink-0">
                        <CheckCircle2 size={10} /> Verified
                      </span>
                    </div>

                    <blockquote className="mt-3">
                      <p className="text-[0.88rem] leading-relaxed text-charcoal/90 font-medium italic">
                        “{currentReview.quote}”
                      </p>
                    </blockquote>

                    <div className="mt-3 pt-2.5 border-t border-warm-grey/70 flex items-center justify-between text-[0.72rem] text-slate">
                      <span className="font-semibold text-emerald truncate flex items-center gap-1.5">
                        <FolderKanban size={13} className="text-tangerine shrink-0" />
                        <span className="truncate">{currentReview.track}</span>
                      </span>
                      <span className="font-medium shrink-0">{currentReview.batch}</span>
                    </div>
                  </m.div>
                </AnimatePresence>

                {/* Secondary Mini Floating Preview Card */}
                <div
                  onClick={nextReview}
                  className="cursor-pointer rounded-2xl border border-emerald/20 bg-white/85 p-3 shadow-xs backdrop-blur-xs transition-all duration-300 hover:bg-white hover:scale-[1.01] hover:shadow-md hidden sm:block"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-display text-[0.7rem] font-bold border ${
                          TONE_BADGES[secondaryReview.tone]
                        }`}
                      >
                        {secondaryReview.initials}
                      </span>
                      <div className="min-w-0">
                        <span className="block font-display text-xs font-bold text-charcoal truncate">
                          {secondaryReview.name}
                        </span>
                        <span className="block text-[0.68rem] text-slate truncate">
                          {secondaryReview.track}
                        </span>
                      </div>
                    </div>
                    <span className="text-[0.68rem] font-semibold text-emerald shrink-0">
                      Next review →
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Navigation Bar */}
              <div className="pt-2 border-t border-emerald/20 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {TESTIMONIALS.map((t, idx) => (
                    <button
                      key={t.id}
                      type="button"
                      aria-label={`Go to feedback from ${t.name}`}
                      onClick={() => setActiveReviewIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeReviewIndex === idx
                          ? 'w-6 bg-emerald'
                          : 'w-2 bg-emerald/30 hover:bg-emerald/60'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prevReview}
                    aria-label="Previous review"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-charcoal shadow-2xs border border-emerald/20 hover:text-emerald hover:border-emerald transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextReview}
                    aria-label="Next review"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-charcoal shadow-2xs border border-emerald/20 hover:text-emerald hover:border-emerald transition-colors cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
