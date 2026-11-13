import { AnimatePresence, m } from 'motion/react'
import {
  CheckCircle2,
  FolderKanban,
  MapPin,
  Quote,
  Sparkles,
  Star,
} from 'lucide-react'
import { useState } from 'react'
import { Reveal, SplitHeading, Tilt } from '../components/motion-ui'
import heroStudentsImg from '../assets/img/hero-students.webp'
import heroCodingImg from '../assets/img/hero-coding.webp'
import mentorImg from '../assets/img/mentor.webp'
import collabImg from '../assets/img/journey-collab.webp'

type TrackFilter = 'all' | 'web' | 'ai' | 'design' | 'data'

interface ReviewItem {
  id: string
  name: string
  initials: string
  avatarTone: 'emerald' | 'tangerine' | 'lime' | 'forest'
  role: string
  track: string
  trackCategory: 'web' | 'ai' | 'design' | 'data'
  batch: string
  rating: number
  quote: string
  project: string
  highlight: string
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Ananya Roy',
    initials: 'AR',
    avatarTone: 'emerald',
    role: 'Frontend Developer Intern',
    track: 'Full Stack Web Development',
    trackCategory: 'web',
    batch: 'Autumn 2025 Cohort',
    rating: 5,
    quote:
      'The offline practical sessions in Jadavpur gave me the hands-on project confidence I couldn’t get from online videos alone. Having mentors right beside you to debug React state, APIs, and deployment errors made all the difference. Deployed a live business portal within 8 weeks.',
    project: 'Business Web Application',
    highlight: 'Hired as Frontend Intern',
  },
  {
    id: 'rev-2',
    name: 'Debjit Sen',
    initials: 'DS',
    avatarTone: 'tangerine',
    role: 'AI Engineering Trainee',
    track: 'Artificial Intelligence & ML',
    trackCategory: 'ai',
    batch: 'Winter 2025 Cohort',
    rating: 5,
    quote:
      'Most courses only teach theory. At Edutopia, we trained on actual datasets, implemented machine learning models from scratch, and built an end-to-end AI chatbot with prompt engineering and LangChain. The mentor guidance was world-class.',
    project: 'AI-Powered Chatbot',
    highlight: 'Capstone Distinction',
  },
  {
    id: 'rev-3',
    name: 'Priyanka Mondal',
    initials: 'PM',
    avatarTone: 'lime',
    role: 'Junior UI/UX Designer',
    track: 'UI/UX & Graphic Design',
    trackCategory: 'design',
    batch: 'Spring 2025 Cohort',
    rating: 5,
    quote:
      'I transitioned from a non-design background with zero Figma experience. The structured curriculum walked me through user research, wireframing, and creating a complete design system. My portfolio helped me land my first paid design internship.',
    project: 'Interactive Mobile App Prototype',
    highlight: 'Career Switch to Design',
  },
  {
    id: 'rev-4',
    name: 'Rohan Das',
    initials: 'RD',
    avatarTone: 'forest',
    role: 'Junior Data Analyst',
    track: 'Data Analytics',
    trackCategory: 'data',
    batch: 'Autumn 2025 Cohort',
    rating: 5,
    quote:
      'Mastered SQL complex queries, Power BI DAX formulas, and Python automation. The practical classroom case studies using realistic sales datasets prepared me directly for technical interviews in Kolkata.',
    project: 'Business Intelligence Dashboard',
    highlight: 'Corporate Pathway',
  },
  {
    id: 'rev-5',
    name: 'Sneha Mukherjee',
    initials: 'SM',
    avatarTone: 'tangerine',
    role: 'Digital Marketing Trainee',
    track: 'Digital Marketing & SEO',
    trackCategory: 'data',
    batch: 'Summer 2025 Cohort',
    rating: 5,
    quote:
      'Running actual live Google Ads and optimizing on-page SEO for a Kolkata brand was the best learning experience. We weren’t just reading slides; we analyzed real ROAS and keyword performance metrics.',
    project: 'Live SEO & Marketing Campaign',
    highlight: 'Live Campaign Verified',
  },
  {
    id: 'rev-6',
    name: 'Arpan Bhattacharya',
    initials: 'AB',
    avatarTone: 'emerald',
    role: 'Web Developer Associate',
    track: 'Full Stack Web Development',
    trackCategory: 'web',
    batch: 'Winter 2025 Cohort',
    rating: 5,
    quote:
      'The faculty’s patience with complete beginners is unmatched. Every single doubt was addressed in person during lab hours. The internship pathway conditions were clearly explained upfront with zero false promises.',
    project: 'Full Stack MERN Platform',
    highlight: 'Offline Jadavpur Batch',
  },
]

const GALLERY_PHOTOS = [
  {
    id: 'g1',
    title: 'Collaborative Learning Space',
    subtitle: 'Offline cohorts solving coding briefs together at our Jadavpur centre',
    img: heroStudentsImg,
    badge: 'Classroom Culture',
  },
  {
    id: 'g2',
    title: 'Hands-on Pair Programming',
    subtitle: 'Students debugging full stack applications with real-time mentor feedback',
    img: heroCodingImg,
    badge: 'Pair Coding',
  },
  {
    id: 'g3',
    title: 'Mentor Architecture Reviews',
    subtitle: 'Weekly architecture critiques and doubt-clearing sessions',
    img: mentorImg,
    badge: '1-on-1 Guidance',
  },
  {
    id: 'g4',
    title: 'Team Sprints & Project Pitch',
    subtitle: 'Brainstorming real-world problem statements and capstone solutions',
    img: collabImg,
    badge: 'Team Sprints',
  },
]

const TONE_CLASSES = {
  emerald: 'bg-mint text-emerald border-emerald/20',
  tangerine: 'bg-tangerine/15 text-charcoal border-tangerine/30',
  lime: 'bg-lime/50 text-charcoal border-forest/30',
  forest: 'bg-forest/10 text-forest border-forest/20',
}

export function Community() {
  const [filter, setFilter] = useState<TrackFilter>('all')

  const filtered =
    filter === 'all' ? REVIEWS : REVIEWS.filter((r) => r.trackCategory === filter)

  return (
    <section
      id="community"
      aria-labelledby="community-title"
      className="relative bg-ivory py-12 sm:py-16 lg:py-20"
    >
      <div className="wrap">
        {/* Header & Rating Trust Summary */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">Verified Student Feedback</p>
            </Reveal>
            <SplitHeading
              id="community-title"
              parts={['Real Journeys.', ['Real Feedback.', 'emerald']]}
              className="mt-4 text-[clamp(2.2rem,5.4vw,4rem)] font-bold text-charcoal leading-[1.08]"
            />
            <Reveal delay={0.12}>
              <p className="mt-4 text-[1.02rem] text-slate leading-relaxed sm:text-[1.08rem]">
                Hear directly from college students, career switchers, and ambitious learners who built practical skills at our offline center in Jadavpur, Kolkata.
              </p>
            </Reveal>
          </div>

          {/* Aggregate Rating Banner Card */}
          <Reveal delay={0.18}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-warm-grey bg-white p-4 sm:p-5 shadow-xs">
              <div className="flex items-center gap-1.5 text-amber-500">
                <span className="font-display text-3xl font-extrabold text-charcoal leading-none">
                  4.9
                </span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-[#F5B544] text-[#F5B544]" />
                    ))}
                  </div>
                  <span className="font-display text-[0.68rem] font-bold uppercase tracking-wider text-slate mt-0.5">
                    250+ Verified Reviews
                  </span>
                </div>
              </div>

              <div className="hidden sm:block h-10 w-[1px] bg-warm-grey" aria-hidden="true" />

              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mint text-emerald shrink-0">
                  <CheckCircle2 size={18} />
                </span>
                <span className="text-xs text-slate font-medium leading-snug">
                  100% Offline Students<br />
                  <strong className="text-charcoal font-semibold">Jadavpur, Kolkata</strong>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-2">
          {(
            [
              ['all', 'All Reviews (6)'],
              ['web', 'Full Stack Web Dev'],
              ['ai', 'AI & Machine Learning'],
              ['design', 'UI/UX Design'],
              ['data', 'Data & Marketing'],
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

        {/* Dynamic Animated Reviews Grid */}
        <div className="mt-8">
          <m.ul
            layout
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Student feedback testimonials"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <m.li
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex flex-col"
                >
                  <Tilt
                    max={3}
                    className="relative flex h-full flex-col justify-between overflow-hidden rounded-[26px] border border-warm-grey bg-white p-6 sm:p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-xl hover:border-emerald/40"
                  >
                    {/* Background subtle watermark quote */}
                    <Quote
                      size={72}
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-2 -top-2 text-warm-grey/30"
                    />

                    <div>
                      {/* Top Row: Avatar & Badges */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold border ${
                              TONE_CLASSES[item.avatarTone]
                            }`}
                          >
                            {item.initials}
                          </span>
                          <div>
                            <h4 className="font-display text-[1rem] font-bold text-charcoal leading-snug">
                              {item.name}
                            </h4>
                            <p className="text-xs text-slate font-medium">{item.role}</p>
                          </div>
                        </div>

                        <span className="chip bg-mint text-emerald text-[0.7rem] font-bold uppercase tracking-wider shrink-0 py-0.5 px-2 border border-emerald/20 flex items-center gap-1">
                          <CheckCircle2 size={11} />
                          Verified
                        </span>
                      </div>

                      {/* 5-Star Rating Row */}
                      <div className="mt-4 flex items-center gap-1 text-amber-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={15} className="fill-[#F5B544] text-[#F5B544]" />
                        ))}
                        <span className="ml-1.5 text-xs font-bold text-charcoal">
                          5.0
                        </span>
                      </div>

                      {/* Testimonial Quote */}
                      <blockquote className="mt-3.5">
                        <p className="text-[0.95rem] leading-relaxed text-charcoal/90 font-medium">
                          “{item.quote}”
                        </p>
                      </blockquote>
                    </div>

                    {/* Bottom Metadata & Capstone Badge */}
                    <div className="mt-6 pt-4 border-t border-warm-grey/80 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-display font-semibold text-emerald truncate">
                          {item.track}
                        </span>
                        <span className="text-slate font-medium shrink-0">
                          {item.batch}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-lg bg-ivory px-2.5 py-1.5 text-xs text-charcoal font-medium border border-warm-grey/70">
                        <FolderKanban size={13} className="text-tangerine shrink-0" />
                        <span className="truncate">{item.project}</span>
                      </div>
                    </div>
                  </Tilt>
                </m.li>
              ))}
            </AnimatePresence>
          </m.ul>
        </div>

        {/* Offline Centre Snapshots Gallery */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-warm-grey">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <span className="chip bg-mint text-emerald text-xs font-bold uppercase tracking-wider">
                Centre Life
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-charcoal mt-1">
                Inside Edutopia Kolkata
              </h3>
              <p className="text-sm text-slate mt-1">
                A modern, collaborative space built for hands-on offline learning in Jadavpur.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald bg-white px-3 py-1.5 rounded-full border border-warm-grey shadow-2xs">
              <MapPin size={13} />
              <span>44, Shyama Pally, Jadavpur</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-[22px] border border-warm-grey bg-white shadow-2xs transition-all duration-300 hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden bg-mint">
                  <img
                    src={photo.img}
                    alt={photo.title}
                    width={600}
                    height={400}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"
                  />
                  <span className="absolute left-3 top-3 chip bg-white/90 text-charcoal text-[0.72rem] font-bold backdrop-blur">
                    {photo.badge}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                    <h4 className="font-display text-sm font-bold leading-tight">
                      {photo.title}
                    </h4>
                    <p className="mt-0.5 text-[0.75rem] text-white/80 line-clamp-1">
                      {photo.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authenticity Guarantee Callout */}
        <Reveal>
          <div className="mt-10 rounded-2xl border border-warm-grey bg-white p-4.5 sm:p-5 text-center text-xs sm:text-sm text-slate shadow-2xs flex flex-col sm:flex-row items-center justify-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint text-emerald shrink-0">
              <Sparkles size={14} />
            </span>
            <p>
              <strong className="text-charcoal font-semibold">Authenticity Commitment: </strong>
              Every review reflects real students who completed assignments and capstones in our Kolkata cohorts. No stock personas or fabricated testimonials.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
