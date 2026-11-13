import { MessageSquareQuote } from 'lucide-react'
import { useState } from 'react'
import { Reveal, SplitHeading, Tilt } from '../components/motion-ui'
import heroStudentsImg from '../assets/img/hero-students.webp'
import heroCodingImg from '../assets/img/hero-coding.webp'
import mentorImg from '../assets/img/mentor.webp'
import collabImg from '../assets/img/journey-collab.webp'
import buildImg from '../assets/img/step-build.webp'
import ownImg from '../assets/img/step-own.webp'

type Category = 'all' | 'classroom' | 'projects' | 'workshops' | 'testimonials'

interface GalleryItem {
  id: string
  title: string
  subtitle: string
  category: Category
  img?: string
  quote?: string
  author?: string
  role?: string
  span: string
  badge: string
}

const ITEMS: GalleryItem[] = [
  {
    id: 'c1',
    title: 'Collaborative Learning Space',
    subtitle: 'Offline cohorts solving challenges together at our Kolkata centre',
    category: 'classroom',
    img: heroStudentsImg,
    span: 'md:col-span-2 md:row-span-2',
    badge: 'Classroom',
  },
  {
    id: 'p1',
    title: 'Hands-on Pair Programming',
    subtitle: 'Students debugging full stack applications side by side',
    category: 'projects',
    img: heroCodingImg,
    span: 'md:col-span-1',
    badge: 'Pair Coding',
  },
  {
    id: 't1',
    title: 'Verified Student Milestone',
    subtitle: 'Transparent feedback from our recent cohort',
    quote:
      'The offline practical sessions in Jadavpur gave me the hands-on project confidence I couldn’t get from online videos alone. Having mentors right next to you makes all the difference.',
    author: 'Recent Batch Learner',
    role: 'Full Stack Development Track',
    category: 'testimonials',
    span: 'md:col-span-1 md:row-span-2',
    badge: 'Verified Feedback',
  },
  {
    id: 'w1',
    title: 'Mentor-Guided Code Reviews',
    subtitle: 'Weekly architecture critiques and doubt-clearing sessions',
    category: 'workshops',
    img: mentorImg,
    span: 'md:col-span-1',
    badge: 'Mentorship',
  },
  {
    id: 'p2',
    title: 'Capstone Design Sprints',
    subtitle: 'Building responsive interfaces and prototype wireframes',
    category: 'projects',
    img: buildImg,
    span: 'md:col-span-1',
    badge: 'Design Sprint',
  },
  {
    id: 'c2',
    title: 'Team Collaboration Hub',
    subtitle: 'Brainstorming real-world problem statements and client briefs',
    category: 'classroom',
    img: collabImg,
    span: 'md:col-span-2',
    badge: 'Team Sprints',
  },
  {
    id: 'w2',
    title: 'Student Project Showcases',
    subtitle: 'Presenting live capstone projects to peers and mentors',
    category: 'workshops',
    img: ownImg,
    span: 'md:col-span-1',
    badge: 'Showcase',
  },
]

export function Community() {
  const [filter, setFilter] = useState<Category>('all')

  const filtered = filter === 'all' ? ITEMS : ITEMS.filter((item) => item.category === filter)

  return (
    <section id="community" aria-labelledby="community-title" className="relative bg-ivory py-24 sm:py-32">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow">Student Community</p>
            </Reveal>
            <SplitHeading
              id="community-title"
              parts={['Good Skills.', ['Great People.', 'emerald'], ['Better Futures.', 'tangerine']]}
              className="mt-5 text-[clamp(2.3rem,5.6vw,4.4rem)] font-bold text-charcoal"
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-4">
            <p className="text-[1.05rem] text-slate leading-relaxed">
              Learning is better when you’re surrounded by people who inspire you. Connect, collaborate, share ideas and grow together in a welcoming offline space in Kolkata.
            </p>
          </Reveal>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap gap-2">
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
              className={`chip transition-all duration-200 cursor-pointer text-xs font-semibold ${
                filter === cat
                  ? 'bg-emerald text-white shadow-xs'
                  : 'bg-white border border-warm-grey text-slate hover:text-charcoal hover:border-emerald'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Masonry / Bento Gallery Grid */}
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {filtered.map((item, i) => (
            <Reveal
              as="li"
              key={item.id}
              delay={(i % 4) * 0.07}
              className={`${item.span} group flex flex-col`}
            >
              {item.img ? (
                /* Photo Card */
                <Tilt
                  max={3}
                  className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[28px] border border-warm-grey bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-full min-h-[200px] w-full overflow-hidden bg-mint flex-1">
                    <img
                      src={item.img}
                      alt={item.title}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"
                    />
                    <span className="absolute left-4 top-4 chip border border-white/40 bg-white/80 font-display text-xs font-bold text-charcoal backdrop-blur shadow-2xs">
                      {item.badge}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <h4 className="font-display text-lg font-bold leading-snug">{item.title}</h4>
                      <p className="mt-1 text-xs text-white/85 line-clamp-2">{item.subtitle}</p>
                    </div>
                  </div>
                </Tilt>
              ) : (
                /* Testimonial / Feedback Card */
                <Tilt
                  max={4}
                  className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-warm-grey bg-mint p-7 shadow-[var(--shadow-card)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald shadow-2xs">
                      <MessageSquareQuote size={22} />
                    </span>
                    <span className="chip border border-emerald/20 bg-white text-xs font-bold text-emerald">
                      {item.badge}
                    </span>
                  </div>

                  <blockquote className="my-6">
                    <p className="text-[1.02rem] leading-relaxed text-charcoal font-medium italic">
                      “{item.quote}”
                    </p>
                  </blockquote>

                  <div className="border-t border-emerald/20 pt-4">
                    <p className="font-display text-sm font-bold text-charcoal">{item.author}</p>
                    <p className="text-xs text-slate font-medium">{item.role}</p>
                  </div>
                </Tilt>
              )}
            </Reveal>
          ))}
        </ul>

        {/* Note on Authenticity */}
        <Reveal>
          <div className="mt-10 rounded-2xl border border-warm-grey bg-white p-5 text-center text-sm text-slate shadow-2xs">
            <p>
              🌟 <strong>Authenticity commitment:</strong> We showcase genuine offline classroom activities, real peer projects, and transparent learner reviews. No generic fabricated stock personas.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
