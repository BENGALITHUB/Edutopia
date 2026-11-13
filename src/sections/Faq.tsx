import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { AccordionItem } from '../components/Accordion'
import { Reveal, SplitHeading } from '../components/motion-ui'
import { FAQS } from '../data/content'
import { useSite } from '../lib/SiteContext'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const { enquire } = useSite()

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-white py-12 sm:py-16 lg:py-20">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Sticky Left Info Box */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow">Clear Answers</p>
            </Reveal>
            <SplitHeading
              id="faq-title"
              parts={['Questions,', ['Answered.', 'emerald']]}
              className="mt-5 text-[clamp(2.3rem,5.2vw,4rem)] font-bold text-charcoal"
            />
            <Reveal delay={0.15}>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-slate">
                Have more specific questions about batch timings, mentor availability or course prerequisites? We’re always here to help.
              </p>
              <div className="mt-7">
                <button
                  type="button"
                  onClick={() => enquire('General FAQ Enquiry')}
                  className="btn btn-outline hover:border-emerald font-semibold"
                >
                  Ask a question
                  <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right Accordion List */}
        <Reveal className="lg:col-span-8">
          <div className="divide-y divide-warm-grey border-y border-warm-grey">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                title={f.q}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
                buttonClassName="text-charcoal hover:text-emerald transition-colors"
              >
                <p className="max-w-2xl pb-6 text-[1.04rem] leading-relaxed text-slate">
                  {f.a}
                </p>
              </AccordionItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
