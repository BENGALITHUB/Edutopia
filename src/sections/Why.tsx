import { m, useReducedMotion } from 'motion/react'
import { BadgeIndianRupee, Check, Hammer, Route, Sprout, Users, Terminal } from 'lucide-react'
import mentorImg from '../assets/img/mentor.webp'
import { Reveal, SplitHeading, Tilt } from '../components/motion-ui'
import { EASE_OUT } from '../lib/motion'

const sheen =
  'before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:bg-[radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,0%),rgb(255_255_255/0.4),transparent_50%)]'

export function Why() {
  const reduced = useReducedMotion()
  return (
    <section id="why" aria-labelledby="why-title" className="relative bg-ivory py-24 sm:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">Why choose Edutopia</p>
            </Reveal>
            <SplitHeading
              id="why-title"
              parts={['Your Growth.', ['Our Priority.', 'emerald']]}
              className="mt-5 text-[clamp(2.3rem,5.6vw,4.4rem)] font-bold text-charcoal"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-[1.05rem] text-slate">
              Five commitments that shape every course, every batch and every learner’s career journey with us in Kolkata.
            </p>
          </Reveal>
        </div>

        {/* Five Interactive Bento Cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-6 lg:gap-6">
          {/* Bento Card 1 — Internship Pathway (Hero Bento Card) */}
          <Reveal className="md:col-span-6 lg:col-span-4">
            <Tilt
              max={3}
              className={`group relative h-full overflow-hidden rounded-[32px] bg-emerald p-8 text-white shadow-[var(--shadow-float)] sm:p-10 ${sheen}`}
            >
              <span
                aria-hidden="true"
                className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[36px] border-white/10 transition-transform duration-700 group-hover:scale-110"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-16 right-20 h-44 w-44 rounded-full bg-lime/20 blur-2xl"
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-charcoal shadow-sm"
                    aria-hidden="true"
                  >
                    <Route size={26} />
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-1 font-display text-xs font-bold text-lime uppercase tracking-wider backdrop-blur">
                    Pathway
                  </span>
                </div>
                <h3 className="mt-6 text-[1.85rem] font-bold sm:text-[2.3rem] leading-tight">
                  Internship Pathway
                </h3>
                <p className="mt-3 max-w-xl text-[1.02rem] text-white/90 leading-relaxed">
                  Move beyond the classroom with a structured internship pathway that helps eligible students gain practical workplace exposure. Terms, eligibility, duration and allocation criteria are shared before enrollment.
                </p>
                <ol aria-label="Train, qualify, intern pathway" className="mt-8 flex max-w-lg items-center">
                  {['Train', 'Qualify', 'Intern'].map((s, i) => (
                    <li key={s} className="flex flex-1 items-center last:flex-none">
                      <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 font-display text-sm font-semibold text-white backdrop-blur shadow-xs">
                        {s}
                      </span>
                      {i < 2 ? (
                        <span aria-hidden="true" className="mx-2 h-[2px] flex-1 overflow-hidden rounded bg-white/25">
                          <m.span
                            className="block h-full origin-left bg-lime"
                            initial={reduced ? false : { scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.35 + i * 0.3 }}
                          />
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            </Tilt>
          </Reveal>

          {/* Bento Card 2 — Mentorship for Everyone (Tall Card with Photo) */}
          <Reveal delay={0.1} className="md:col-span-3 lg:col-span-2 lg:row-span-2">
            <Tilt
              max={3}
              className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-warm-grey bg-white shadow-[var(--shadow-card)]"
            >
              <div className="relative h-56 overflow-hidden lg:h-auto lg:flex-1">
                <img
                  src={mentorImg}
                  alt="Mentor offering one-on-one guidance to students"
                  width={900}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                />
                <span
                  className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-tangerine text-charcoal shadow-md"
                  aria-hidden="true"
                >
                  <Users size={22} />
                </span>
              </div>
              <div className="p-7 sm:p-8">
                <span className="chip bg-mint text-emerald font-display text-xs font-bold uppercase tracking-wider">
                  1-on-1 Guidance
                </span>
                <h3 className="mt-3 text-[1.6rem] font-bold text-charcoal">Mentorship for Everyone</h3>
                <p className="mt-3 text-[0.98rem] text-slate leading-relaxed">
                  No learner gets left behind. Get personal academic guidance, doubt-clearing sessions, project reviews and career direction from dedicated mentors.
                </p>
              </div>
            </Tilt>
          </Reveal>

          {/* Bento Card 3 — Affordable, Accessible */}
          <Reveal delay={0.06} className="md:col-span-3 lg:col-span-2">
            <Tilt
              max={4}
              className="group relative h-full overflow-hidden rounded-[32px] border border-warm-grey bg-white p-7 shadow-[var(--shadow-card)] sm:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-mint to-lime opacity-70 transition-transform duration-500 group-hover:scale-125"
              />
              <span
                className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-charcoal text-white"
                aria-hidden="true"
              >
                <BadgeIndianRupee size={22} />
              </span>
              <h3 className="relative mt-6 text-[1.5rem] font-bold text-charcoal">Affordable, Accessible</h3>
              <p className="relative mt-2.5 text-[0.96rem] text-slate leading-relaxed">
                Build valuable skills without breaking your budget, with transparent pricing and practical value.
              </p>
              <ul className="relative mt-5 space-y-2 text-[0.9rem] font-medium text-charcoal">
                {['Transparent course fees', 'Student-friendly fee options'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-emerald font-bold"
                      aria-hidden="true"
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Tilt>
          </Reveal>

          {/* Bento Card 4 — Hands-on Experience */}
          <Reveal delay={0.12} className="md:col-span-3 lg:col-span-2">
            <Tilt
              max={4}
              className="group relative h-full overflow-hidden rounded-[32px] border border-warm-grey bg-white p-7 shadow-[var(--shadow-card)] sm:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-tangerine/15 transition-transform duration-500 group-hover:scale-125"
              />
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-white"
                aria-hidden="true"
              >
                <Hammer size={22} />
              </span>
              <h3 className="mt-6 text-[1.5rem] font-bold text-charcoal">Hands-on Experience</h3>
              <p className="mt-2.5 text-[0.96rem] text-slate leading-relaxed">
                Don’t just watch tutorials. Work on assignments, collaborative projects and case studies that reflect real industry needs.
              </p>
              <div className="mt-5 rounded-xl border border-warm-grey bg-ivory p-3 font-mono text-xs text-charcoal flex items-center gap-2">
                <Terminal size={14} className="text-emerald shrink-0" />
                <span className="truncate">build --capstone --production</span>
              </div>
            </Tilt>
          </Reveal>

          {/* Bento Card 5 — Beginner-Friendly */}
          <Reveal delay={0.18} className="md:col-span-3 lg:col-span-2">
            <Tilt
              max={4}
              className="group relative h-full overflow-hidden rounded-[32px] border border-warm-grey bg-white p-7 shadow-[var(--shadow-card)] sm:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute -left-6 -bottom-6 h-28 w-28 rounded-full bg-lime/40 transition-transform duration-500 group-hover:scale-125"
              />
              <span
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime text-charcoal"
                aria-hidden="true"
              >
                <Sprout size={22} />
              </span>
              <h3 className="mt-6 text-[1.5rem] font-bold text-charcoal">Beginner-Friendly</h3>
              <p className="mt-2.5 text-[0.96rem] text-slate leading-relaxed">
                Start from the fundamentals and progress to advanced skills with an easy-to-follow, structured approach.
              </p>
              <div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate">
                <span className="rounded-md bg-mint px-2 py-1 text-emerald">Zero prerequisite</span>
                <span className="text-tangerine">→ Career Ready</span>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
