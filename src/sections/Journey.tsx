import { m, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { ArrowUpRight, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { useRef, useState } from 'react'
import collabImg from '../assets/img/journey-collab.webp'
import launchImg from '../assets/img/journey-launch.webp'
import { ImageReveal, Magnetic, Reveal, SplitHeading } from '../components/motion-ui'
import { INTERNSHIP_DISCLAIMER, JOURNEY } from '../data/content'
import { useSite } from '../lib/SiteContext'

export function Journey() {
  const list = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { enquire } = useSite()
  const [reached, setReached] = useState(0)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 60%'] })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const n = Math.min(JOURNEY.length, Math.floor(p * JOURNEY.length + 0.35))
    setReached((cur) => (cur === n ? cur : n))
  })

  return (
    <section
      id="internships"
      aria-labelledby="journey-title"
      className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
    >
      {/* Background Soft Bloom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-24 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgb(232_247_238/0.8),transparent)]"
      />

      <div className="wrap relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky Left Column: Editorial Intro & Media */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="eyebrow">Internship Journey</p>
              </Reveal>
              <SplitHeading
                id="journey-title"
                parts={['Your Skills Deserve', ['Real-World', 'emerald'], 'Experience.']}
                className="mt-5 text-[clamp(2.3rem,5.2vw,4rem)] font-bold text-charcoal"
              />
              <Reveal delay={0.15}>
                <p className="mt-6 text-[1.05rem] leading-relaxed text-slate">
                  A certificate shows what you’ve learned. Practical experience shows what you can do. Our internship pathway helps qualifying students take their learning into real professional environments.
                </p>
              </Reveal>

              {/* High-Quality Photo Composition */}
              <div className="relative mt-10 hidden h-[310px] lg:block">
                <ImageReveal
                  src={collabImg}
                  alt="Students collaborating on client briefs at Edutopia"
                  width={900}
                  height={1000}
                  className="absolute left-0 top-0 h-[290px] w-[60%] rounded-[28px_28px_28px_110px] shadow-[var(--shadow-float)] border border-warm-grey"
                />
                <ImageReveal
                  src={launchImg}
                  alt="Intern celebrating a successful project deployment"
                  width={900}
                  height={700}
                  delay={0.2}
                  className="absolute bottom-0 right-0 h-[195px] w-[52%] rounded-[24px] border-[5px] border-white shadow-[var(--shadow-float)]"
                />
              </div>
            </div>
          </div>

          {/* Timeline: 6 Stages */}
          <div className="lg:col-span-7">
            <ol ref={list} className="relative">
              {/* Vertical Scroll Progress Line */}
              <span
                aria-hidden="true"
                className="absolute bottom-6 left-[27px] top-6 w-[3px] rounded-full bg-warm-grey"
              >
                <m.span
                  className="block h-full w-full origin-top rounded-full bg-gradient-to-b from-emerald via-lime to-tangerine"
                  style={reduced ? undefined : { scaleY: scrollYProgress }}
                />
              </span>

              {JOURNEY.map((s, i) => {
                const on = reduced || i < reached
                return (
                  <li key={s.title} className="relative flex gap-5 pb-7 last:pb-0 sm:gap-7">
                    <span
                      aria-hidden="true"
                      className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] font-display text-[1.05rem] font-bold transition-all duration-500 ${
                        on
                          ? 'scale-100 border-emerald bg-emerald text-white shadow-[0_10px_24px_-8px_rgb(8_127_91/0.6)]'
                          : 'scale-90 border-warm-grey bg-white text-slate'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <div
                      className={`flex-1 rounded-[26px] border p-6 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:p-7 ${
                        on
                          ? 'translate-x-0 border-warm-grey bg-white opacity-100 shadow-[var(--shadow-card)]'
                          : 'translate-x-3 border-transparent bg-ivory opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xs font-bold uppercase tracking-wider text-emerald">
                          {s.stage}
                        </span>
                        {on && <CheckCircle2 size={16} className="text-emerald" />}
                      </div>
                      <h3 className="mt-1 text-[1.35rem] font-bold text-charcoal sm:text-[1.6rem]">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[0.98rem] text-slate leading-relaxed">{s.detail}</p>
                    </div>
                  </li>
                )
              })}
            </ol>

            {/* Mandatory Disclaimer Box */}
            <Reveal>
              <div className="mt-10 flex gap-4 rounded-[24px] border border-dashed border-tangerine/70 bg-tangerine/10 p-5 sm:p-6 text-[0.98rem] text-charcoal">
                <ShieldAlert size={24} className="mt-0.5 shrink-0 text-tangerine" aria-hidden="true" />
                <p className="leading-relaxed">
                  <strong className="font-display font-bold">Mandatory Disclaimer: </strong>
                  {INTERNSHIP_DISCLAIMER}
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => enquire('Internship Program')}
                    className="btn btn-emerald font-semibold"
                  >
                    Explore the internship program
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </button>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
