import { ArrowUpRight, Award, Check } from 'lucide-react'
import { Magnetic, Reveal, SplitHeading, Tilt } from '../components/motion-ui'
import { CERT_POINTS } from '../data/content'
import { useSite } from '../lib/SiteContext'

export function Certification() {
  const { enquire } = useSite()

  return (
    <section
      id="certification"
      aria-labelledby="cert-title"
      className="relative overflow-hidden bg-mint py-24 sm:py-32"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full border-[36px] border-emerald/10"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full border-[36px] border-gold/15"
      />

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Certification Value */}
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">Certification &amp; Credentials</p>
          </Reveal>
          <SplitHeading
            id="cert-title"
            parts={['Your Hard Work Deserves', ['Recognition.', 'emerald']]}
            className="mt-5 text-[clamp(2.3rem,5.2vw,4rem)] font-bold text-charcoal"
          />
          <Reveal delay={0.12}>
            <p className="mt-5 font-display text-[1.25rem] font-semibold text-charcoal">
              Build skills worth showing. Earn recognition worth sharing.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-3.5">
            {CERT_POINTS.map((p, i) => (
              <Reveal
                as="li"
                key={p}
                delay={0.05 * i}
                className="flex items-start gap-3.5 rounded-2xl bg-white/85 px-4.5 py-3.5 text-[0.98rem] text-charcoal shadow-xs border border-warm-grey/60"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald text-white"
                  aria-hidden="true"
                >
                  <Check size={13} strokeWidth={3} />
                </span>
                <span className="font-medium">{p}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <p className="mt-6 text-[0.95rem] text-slate font-medium">
              * Certificates are institute-issued by Edutopia. They are not externally accredited qualifications.
            </p>
            <div className="mt-7">
              <Magnetic>
                <button
                  type="button"
                  onClick={() => enquire('Certification & Credentials')}
                  className="btn btn-emerald font-semibold"
                >
                  Discover the Certification Pathway
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Floating Certificate Mockup with Green & Champagne-Gold Details */}
        <Reveal delay={0.15} className="lg:col-span-6">
          <div className="relative mx-auto max-w-[560px] py-6">
            <span
              aria-hidden="true"
              className="absolute inset-x-6 inset-y-0 -rotate-4 rounded-[28px] bg-emerald/15"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-6 inset-y-3 rotate-2 rounded-[28px] bg-[#C9A45C]/20"
            />

            <Tilt max={7} className="relative">
              <div
                role="img"
                aria-label="Sample Edutopia certificate of completion with emerald and champagne-gold border styling."
                className="grain relative -rotate-1 overflow-hidden rounded-[26px] bg-[#FCFAF5] p-3 shadow-[var(--shadow-float)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:rotate-0 border border-warm-grey"
              >
                <div className="relative rounded-[18px] border-[2px] border-[#C9A45C]/80 px-6 py-9 text-center sm:px-10 sm:py-12 bg-white">
                  {/* Inner Emerald & Gold Filigree Frame */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-2 rounded-[12px] border border-emerald/25 pointer-events-none"
                  />

                  {/* Eyebrow Label */}
                  <p className="font-display text-[0.72rem] font-bold uppercase tracking-[0.24em] text-slate">
                    Sample · institute-issued certificate
                  </p>

                  {/* Brand Logotype */}
                  <div className="mt-5 flex items-center justify-center gap-2">
                    <span className="h-6 w-6 rounded-lg bg-emerald flex items-center justify-center text-white font-display text-xs font-bold">
                      E
                    </span>
                    <span className="font-display text-[1.2rem] font-bold tracking-tight text-charcoal">
                      Edutopia<span className="text-tangerine">.</span>
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <h4 className="mt-5 font-display text-[clamp(1.6rem,4.4vw,2.4rem)] font-bold leading-none tracking-[-0.03em] text-charcoal">
                    Certificate of Completion
                  </h4>

                  {/* Ribbon Divider */}
                  <span
                    aria-hidden="true"
                    className="mx-auto mt-5 block h-[2.5px] w-28 rounded bg-gradient-to-r from-[#C9A45C] via-emerald to-[#C9A45C]"
                  />

                  {/* Verification statement */}
                  <p className="mx-auto mt-6 max-w-[34ch] text-[1.02rem] text-slate leading-relaxed">
                    This certifies that <strong className="font-display text-charcoal font-bold">Your Name</strong> has completed a course at Edutopia.
                  </p>

                  {/* Signatory and Gold Seal */}
                  <div className="mt-8 flex items-end justify-between gap-4 text-left">
                    <div>
                      <span aria-hidden="true" className="block h-[1.5px] w-28 bg-charcoal/30" />
                      <p className="mt-1.5 text-[0.7rem] uppercase tracking-[0.14em] font-semibold text-slate">
                        Authorised signatory
                      </p>
                      <p className="text-xs text-charcoal font-display font-medium">Edutopia Kolkata</p>
                    </div>

                    {/* Champagne Gold Medallion */}
                    <span
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(from_0deg,#C9A45C,#F3E2B6,#C9A45C,#F3E2B6,#C9A45C)] p-[3.5px] shadow-md"
                      aria-hidden="true"
                    >
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-white text-emerald">
                        <Award size={26} />
                      </span>
                    </span>
                  </div>

                  {/* Mandatory Sub-disclaimer */}
                  <p className="mt-7 text-[0.74rem] font-semibold text-slate/80">
                    Not an externally accredited qualification
                  </p>
                </div>
              </div>
            </Tilt>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
