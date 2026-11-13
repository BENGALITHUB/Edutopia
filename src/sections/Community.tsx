import {
  CheckCircle2,
  FolderKanban,
  MessageSquareQuote,
  Sparkles,
  Star,
} from 'lucide-react'
import { useState } from 'react'
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
  tone: 'emerald' | 'tangerine' | 'lime' | 'forest'
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
      'Most courses only teach theory. At Edutopia, we trained on actual datasets, implemented ML models from scratch, and built an end-to-end AI chatbot with prompt engineering. Mentorship is top tier.',
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
    tone: 'forest',
    role: 'Junior Data Analyst',
    track: 'Data Analytics Track',
    rating: 5,
    quote:
      'Mastered SQL complex queries, Power BI DAX formulas, and Python automation. Realistic business case studies prepared me directly for technical interviews in Kolkata.',
    project: 'Business Intelligence Dashboard',
    batch: '2025 Cohort',
  },
  {
    id: 't5',
    name: 'Sneha Mukherjee',
    initials: 'SM',
    tone: 'tangerine',
    role: 'Digital Marketing Trainee',
    track: 'Digital Marketing & SEO',
    rating: 5,
    quote:
      'Running actual live Google Ads and optimizing on-page SEO for a Kolkata brand was the best learning experience. We analyzed real ROAS and keyword performance metrics.',
    project: 'Live SEO & Marketing Campaign',
    batch: '2025 Cohort',
  },
  {
    id: 't6',
    name: 'Arpan Bhattacharya',
    initials: 'AB',
    tone: 'emerald',
    role: 'Web Developer Associate',
    track: 'Full Stack Web Development',
    rating: 5,
    quote:
      'The faculty’s patience with complete beginners is unmatched. Every single doubt was addressed in person during lab hours with clear career direction.',
    project: 'Full Stack MERN Platform',
    batch: '2025 Cohort',
  },
]

const TONE_BADGES = {
  emerald: 'bg-mint text-emerald border-emerald/25',
  tangerine: 'bg-tangerine/15 text-charcoal border-tangerine/30',
  lime: 'bg-lime/50 text-charcoal border-forest/30',
  forest: 'bg-forest/10 text-forest border-forest/20',
}

export function Community() {
  const [filter, setFilter] = useState<HighlightCategory>('all')

  return (
    <section
      id="community"
      aria-labelledby="community-title"
      className="relative bg-ivory py-12 sm:py-16 lg:py-20"
    >
      <div className="wrap">
        {/* Section Header */}
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

        {/* Filter Pills matching exact reference image */}
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

        {/* Bento Grid: Left photo composition & Right green column with multiple floating cards */}
        <div className="mt-8 grid gap-4 sm:gap-5 lg:grid-cols-12 items-start">
          {/* ──────────────── Left Main Column (Photos) ──────────────── */}
          <div
            className={`lg:col-span-7 flex flex-col gap-4 sm:gap-5 ${
              filter === 'testimonials' ? 'hidden lg:flex opacity-35' : ''
            }`}
          >
            {/* Top Large Photo: Collaborative Learning Space */}
            <Tilt
              max={2}
              className="group relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-warm-grey bg-white shadow-[var(--shadow-card)] h-[340px] sm:h-[400px] lg:h-[440px] shrink-0"
            >
              <img
                src={heroStudentsImg}
                alt="Collaborative Learning Space at Edutopia Kolkata"
                width={1000}
                height={700}
                loading="lazy"
                className="h-full w-full object-cover object-[center_top] transition-transform duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
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
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 shrink-0">
              {/* Bottom Left Photo: Mentor-Guided Code Reviews */}
              <Tilt
                max={3}
                className="group relative overflow-hidden rounded-[26px] sm:rounded-[28px] border border-warm-grey bg-white shadow-[var(--shadow-card)] h-[180px] sm:h-[190px] lg:h-[195px]"
              >
                <img
                  src={mentorImg}
                  alt="Mentor-Guided Code Reviews"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
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
                className="group relative overflow-hidden rounded-[26px] sm:rounded-[28px] border border-warm-grey bg-white shadow-[var(--shadow-card)] h-[180px] sm:h-[190px] lg:h-[195px]"
              >
                <img
                  src={buildImg}
                  alt="Capstone Design Sprints"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
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

          {/* ──────────────── Right Column (Pair Coding + Green Multiple Feedback Column) ──────────────── */}
          <div
            className={`lg:col-span-5 flex flex-col gap-4 sm:gap-5 ${
              filter === 'classroom' || filter === 'workshops'
                ? 'hidden lg:flex opacity-35'
                : ''
            }`}
          >
            {/* Top Photo: Hands-on Pair Programming */}
            <Tilt
              max={3}
              className="group relative overflow-hidden rounded-[26px] sm:rounded-[28px] border border-warm-grey bg-white shadow-[var(--shadow-card)] h-[160px] sm:h-[170px] lg:h-[175px] shrink-0"
            >
              <img
                src={heroCodingImg}
                alt="Hands-on Pair Programming at Edutopia"
                width={800}
                height={500}
                loading="lazy"
                className="h-full w-full object-cover object-[center_20%] transition-transform duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
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

            {/* ────────── The Green Column with MULTIPLE Rolling Feedback Cards ────────── */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] sm:rounded-[32px] border border-emerald/25 bg-mint p-4.5 sm:p-5 lg:p-6 shadow-[var(--shadow-card)] h-[420px] sm:h-[450px] lg:h-[460px] shrink-0">
              {/* Header inside the green column */}
              <div className="border-b border-emerald/20 pb-3 shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald shadow-2xs shrink-0">
                      <MessageSquareQuote size={18} />
                    </span>
                    <span className="chip bg-white text-emerald text-[0.7rem] font-bold uppercase tracking-wider shadow-2xs border border-emerald/20 flex items-center gap-1">
                      <Sparkles size={11} />
                      Verified Feedback
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 bg-white px-2.5 py-1 rounded-full border border-emerald/20 text-xs font-bold text-charcoal shadow-2xs">
                    <Star size={12} className="fill-[#F5B544] text-[#F5B544]" />
                    <span>4.9</span>
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate font-medium">
                  Verified student reviews from our Kolkata cohorts (Hover to pause).
                </p>
              </div>

              {/* Rolling Feedback Cards Window (Takes middle height with hidden overflow) */}
              <div className="marquee-track relative flex-1 min-h-0 overflow-hidden my-2.5">
                {/* Subtle top/bottom fade gradients */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-mint to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-mint to-transparent"
                />

                {/* Continuous rolling track with 2 synchronized groups */}
                <div className="flex flex-col gap-3">
                  {/* Group 1 */}
                  <div className="marquee-group flex flex-col gap-3 shrink-0">
                    {TESTIMONIALS.map((item) => (
                      <div
                        key={`g1-${item.id}`}
                        className="rounded-2xl border border-warm-grey/80 bg-white p-3.5 sm:p-4 shadow-[0_4px_16px_-4px_rgb(8_127_91/0.12)] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-emerald/40"
                      >
                        {/* Top Row: Avatar & Name */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-display text-xs font-bold border ${
                                TONE_BADGES[item.tone]
                              }`}
                            >
                              {item.initials}
                            </span>
                            <div className="min-w-0">
                              <h5 className="font-display text-xs sm:text-sm font-bold text-charcoal leading-tight truncate">
                                {item.name}
                              </h5>
                              <p className="text-[0.68rem] sm:text-[0.72rem] text-slate font-medium truncate">
                                {item.role}
                              </p>
                            </div>
                          </div>

                          <span className="chip bg-mint text-emerald text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-1.5 border border-emerald/20 flex items-center gap-1 shrink-0">
                            <CheckCircle2 size={10} /> Verified
                          </span>
                        </div>

                        {/* Stars */}
                        <div className="mt-2 flex items-center gap-0.5 text-amber-500">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} size={11} className="fill-[#F5B544] text-[#F5B544]" />
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="mt-2">
                          <p className="text-[0.8rem] sm:text-[0.84rem] leading-relaxed text-charcoal/90 font-medium italic">
                            “{item.quote}”
                          </p>
                        </blockquote>

                        {/* Project Tag & Batch */}
                        <div className="mt-2.5 pt-2 border-t border-warm-grey/60 flex items-center justify-between text-[0.68rem] text-slate">
                          <span className="font-semibold text-emerald truncate flex items-center gap-1">
                            <FolderKanban size={11} className="text-tangerine shrink-0" />
                            <span className="truncate">{item.track}</span>
                          </span>
                          <span className="font-medium shrink-0">{item.batch}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Group 2 (Identical duplicate for seamless continuous loop) */}
                  <div className="marquee-group flex flex-col gap-3 shrink-0" aria-hidden="true">
                    {TESTIMONIALS.map((item) => (
                      <div
                        key={`g2-${item.id}`}
                        className="rounded-2xl border border-warm-grey/80 bg-white p-3.5 sm:p-4 shadow-[0_4px_16px_-4px_rgb(8_127_91/0.12)] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-emerald/40"
                      >
                        {/* Top Row: Avatar & Name */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-display text-xs font-bold border ${
                                TONE_BADGES[item.tone]
                              }`}
                            >
                              {item.initials}
                            </span>
                            <div className="min-w-0">
                              <h5 className="font-display text-xs sm:text-sm font-bold text-charcoal leading-tight truncate">
                                {item.name}
                              </h5>
                              <p className="text-[0.68rem] sm:text-[0.72rem] text-slate font-medium truncate">
                                {item.role}
                              </p>
                            </div>
                          </div>

                          <span className="chip bg-mint text-emerald text-[0.65rem] font-bold uppercase tracking-wider py-0.5 px-1.5 border border-emerald/20 flex items-center gap-1 shrink-0">
                            <CheckCircle2 size={10} /> Verified
                          </span>
                        </div>

                        {/* Stars */}
                        <div className="mt-2 flex items-center gap-0.5 text-amber-500">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} size={11} className="fill-[#F5B544] text-[#F5B544]" />
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="mt-2">
                          <p className="text-[0.8rem] sm:text-[0.84rem] leading-relaxed text-charcoal/90 font-medium italic">
                            “{item.quote}”
                          </p>
                        </blockquote>

                        {/* Project Tag & Batch */}
                        <div className="mt-2.5 pt-2 border-t border-warm-grey/60 flex items-center justify-between text-[0.68rem] text-slate">
                          <span className="font-semibold text-emerald truncate flex items-center gap-1">
                            <FolderKanban size={11} className="text-tangerine shrink-0" />
                            <span className="truncate">{item.track}</span>
                          </span>
                          <span className="font-medium shrink-0">{item.batch}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom footer badge of the green column */}
              <div className="pt-2.5 border-t border-emerald/20 flex items-center justify-between text-[0.7rem] text-charcoal font-medium shrink-0 mt-auto">
                <span className="flex items-center gap-1 text-emerald font-semibold">
                  <CheckCircle2 size={12} />
                  100% Offline Students
                </span>
                <span className="text-slate">Jadavpur, Kolkata</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
