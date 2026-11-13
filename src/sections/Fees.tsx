import {
  ArrowUpRight,
  Check,
  CreditCard,
  PackageCheck,
  ReceiptText,
  AlertCircle,
  FileSpreadsheet,
  Download,
  Loader2,
  CheckCircle2,
} from 'lucide-react'
import { useState } from 'react'
import { Magnetic, Reveal, SplitHeading } from '../components/motion-ui'
import { Modal } from '../components/Modal'
import { COURSES } from '../data/content'
import { SITE } from '../data/site'
import { useSite } from '../lib/SiteContext'

const TBC = 'To be confirmed'
const COLS = ['Duration', 'Total fee', 'Registration', 'Installments'] as const

const DOT_COLORS: Record<string, string> = {
  emerald: 'bg-emerald',
  tangerine: 'bg-tangerine',
  lime: 'bg-lime',
  forest: 'bg-forest',
  mint: 'bg-emerald',
}

export function Fees() {
  const { openLegal } = useSite()
  const [feeModalOpen, setFeeModalOpen] = useState(false)
  const [feeCourse, setFeeCourse] = useState(COURSES[0]!.title)
  const [candidateContact, setCandidateContact] = useState('')
  const [ajaxStatus, setAjaxStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [ajaxReceipt, setAjaxReceipt] = useState<string | null>(null)

  const handleAjaxFeeRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setAjaxStatus('loading')
    // Simulated AJAX request with async network latency
    await new Promise((resolve) => setTimeout(resolve, 800))
    const refCode = `FEE-KOL-${Math.floor(1000 + Math.random() * 9000)}`
    setAjaxReceipt(refCode)
    setAjaxStatus('success')
  }

  const resetFeeModal = () => {
    setFeeModalOpen(false)
    setAjaxStatus('idle')
    setAjaxReceipt(null)
    setCandidateContact('')
  }

  return (
    <section id="fees" aria-labelledby="fees-title" className="relative bg-ivory py-12 sm:py-16 lg:py-20">
      <div className="wrap">
        {/* Affordability Section */}
        <div id="pricing" className="grid gap-8 lg:grid-cols-12 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Pricing &amp; Affordability</p>
            </Reveal>
            <SplitHeading
              id="fees-title"
              parts={['Big Ambitions.', ['Budget-Friendly', 'emerald'], 'Learning.']}
              className="mt-5 text-[clamp(2.2rem,6vw,3.8rem)] font-bold text-charcoal leading-[1.08]"
            />
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-slate sm:text-[1.08rem]">
                Your financial situation shouldn’t decide how far your ambitions can go. Edutopia is committed to practical training with transparent fees and flexible learning options wherever available.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => setFeeModalOpen(true)}
                    className="btn btn-emerald font-semibold w-full sm:w-auto text-sm sm:text-base justify-center"
                  >
                    Request course fees
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </button>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-5 lg:pt-8 w-full">
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                'Transparent course fees',
                'Value-focused programs',
                'Practical learning resources',
                'Student-friendly fee options',
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-2xl border border-warm-grey bg-white p-3.5 sm:p-4 text-[0.92rem] sm:text-[0.95rem] font-medium text-charcoal shadow-xs"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint text-emerald"
                    aria-hidden="true"
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Fee Structure Table Box */}
        <Reveal className="mt-14 sm:mt-18">
          <div className="gborder rounded-[28px] sm:rounded-[32px] bg-white p-2 shadow-[var(--shadow-float)]">
            <div className="rounded-[24px] sm:rounded-[26px] p-5 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-warm-grey pb-5">
                <div>
                  <h3 className="text-[1.65rem] font-bold text-charcoal sm:text-[2rem] leading-tight">
                    Fee structure, clearly laid out.
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm sm:text-[1.02rem] text-slate leading-relaxed">
                    No hidden charges. Every course fee, what it covers and how you can pay is shared in writing before you enroll.
                  </p>
                </div>
                <span className="chip w-fit border border-dashed border-emerald/50 bg-mint text-emerald font-semibold text-xs shrink-0">
                  Fees published at counselling
                </span>
              </div>

              {/* Desktop Responsive Table */}
              <div className="mt-6 hidden md:block overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">Course fee table. All values to be confirmed.</caption>
                  <thead>
                    <tr className="font-display text-[0.8rem] uppercase tracking-[0.14em] text-slate">
                      <th scope="col" className="border-b border-warm-grey pb-3.5 pr-4 font-bold">
                        Course Track
                      </th>
                      {COLS.map((c) => (
                        <th key={c} scope="col" className="border-b border-warm-grey pb-3.5 pr-4 font-bold">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COURSES.map((c) => (
                      <tr key={c.id} className="group transition-colors hover:bg-ivory">
                        <th
                          scope="row"
                          className="border-b border-warm-grey py-4.5 pr-4 font-display text-[1rem] font-semibold text-charcoal"
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${DOT_COLORS[c.tone] ?? 'bg-emerald'}`}
                              aria-hidden="true"
                            />
                            {c.short}
                          </span>
                        </th>
                        {COLS.map((col) => (
                          <td
                            key={col}
                            className="border-b border-warm-grey py-4.5 pr-4 text-[0.92rem] font-medium text-emerald"
                          >
                            {col === 'Total fee' || col === 'Registration'
                              ? '₹ to be confirmed'
                              : TBC}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View */}
              <ul className="mt-5 space-y-3 md:hidden">
                {COURSES.map((c) => (
                  <li key={c.id} className="rounded-2xl border border-warm-grey bg-ivory p-4 shadow-2xs">
                    <p className="flex items-center gap-2 font-display text-[1rem] font-bold text-charcoal">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${DOT_COLORS[c.tone] ?? 'bg-emerald'}`}
                        aria-hidden="true"
                      />
                      {c.short}
                    </p>
                    <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs sm:text-sm">
                      {COLS.map((col) => (
                        <div key={col}>
                          <dt className="text-[0.7rem] uppercase tracking-wider text-slate font-medium">{col}</dt>
                          <dd className="mt-0.5 font-semibold text-emerald">
                            {col === 'Total fee' || col === 'Registration'
                              ? '₹ to be confirmed'
                              : TBC}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </li>
                ))}
              </ul>

              {/* Three Additional Cards */}
              <div className="mt-8 sm:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-warm-grey bg-white p-4.5 sm:p-5 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-emerald">
                    <PackageCheck size={20} />
                  </div>
                  <h4 className="mt-3 font-display text-[1.05rem] font-bold text-charcoal">What's Included</h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate leading-relaxed">
                    Classroom training, learning material, project reviews, mentor support and the completion certificate.
                  </p>
                </div>

                <div className="rounded-2xl border border-warm-grey bg-white p-4.5 sm:p-5 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ivory text-tangerine border border-warm-grey">
                    <CreditCard size={20} />
                  </div>
                  <h4 className="mt-3 font-display text-[1.05rem] font-bold text-charcoal">Payment Options</h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate leading-relaxed">
                    One-time payment or installments. Accepted modes (UPI, card, bank transfer, cash) will be listed here.
                  </p>
                </div>

                <div className="rounded-2xl border border-warm-grey bg-white p-4.5 sm:p-5 shadow-xs sm:col-span-2 lg:col-span-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-forest">
                    <ReceiptText size={20} />
                  </div>
                  <h4 className="mt-3 font-display text-[1.05rem] font-bold text-charcoal">Taxes &amp; Refunds</h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate leading-relaxed">
                    Fees will state whether GST is included. See the{' '}
                    <button
                      type="button"
                      onClick={() => openLegal('refund')}
                      className="font-medium text-emerald underline underline-offset-2 hover:text-forest cursor-pointer"
                    >
                      refund &amp; cancellation policy
                    </button>
                    .
                  </p>
                </div>
              </div>

              {/* Mandatory Notice Banner */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-dashed border-emerald/50 bg-mint p-4.5 sm:p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="mt-0.5 shrink-0 text-emerald" aria-hidden="true" />
                  <p className="text-xs sm:text-sm font-medium text-charcoal leading-snug">
                    <strong>Important Notice: </strong> Final fees apply only once published by Edutopia. Ask for the current fee sheet at counselling.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFeeModalOpen(true)}
                  className="btn btn-tangerine btn-sm shrink-0 font-semibold w-full sm:w-auto justify-center text-xs sm:text-sm"
                >
                  <FileSpreadsheet size={16} />
                  Request the fee sheet
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* AJAX Fee Sheet Request Modal */}
      <Modal open={feeModalOpen} onClose={resetFeeModal} title="Request Official Fee Sheet">
        <div className="mt-3 text-sm text-slate">
          {ajaxStatus === 'success' && ajaxReceipt ? (
            <div className="space-y-5">
              <div className="flex items-center gap-3 rounded-2xl bg-mint p-4 text-charcoal border border-emerald/30">
                <CheckCircle2 size={24} className="text-emerald shrink-0" />
                <div>
                  <p className="font-bold font-display text-sm">Official Fee Sheet Requested</p>
                  <p className="text-xs text-slate">Reference Code: <strong className="font-mono text-emerald">{ajaxReceipt}</strong></p>
                </div>
              </div>

              <div className="rounded-2xl border border-warm-grey bg-ivory p-4 space-y-2 text-xs sm:text-sm">
                <p><strong>Selected Track:</strong> {feeCourse}</p>
                <p><strong>Centre:</strong> Edutopia Kolkata (Jadavpur)</p>
                <p><strong>Notice:</strong> Detailed installment breakdown and batch schedules will be provided at your counselling session.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                    `Hi Edutopia, I requested the fee sheet (Ref: ${ajaxReceipt}) for ${feeCourse}. Please share the current batch fee breakdown.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa flex-1 font-semibold justify-center text-xs sm:text-sm"
                >
                  Receive Sheet on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={resetFeeModal}
                  className="btn btn-outline flex-1 font-semibold justify-center text-xs sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleAjaxFeeRequest} className="space-y-4">
              <p className="leading-relaxed">
                Select your intended course to receive the official fee schedule and installment options directly from our admissions team.
              </p>

              <div>
                <label htmlFor="modal-fee-course" className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                  Select Course
                </label>
                <select
                  id="modal-fee-course"
                  value={feeCourse}
                  onChange={(e) => setFeeCourse(e.target.value)}
                  className="field text-sm"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="modal-fee-contact" className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                  Your Mobile or Email (Optional)
                </label>
                <input
                  id="modal-fee-contact"
                  type="text"
                  value={candidateContact}
                  onChange={(e) => setCandidateContact(e.target.value)}
                  placeholder="e.g. 9876543210 or email@domain.com"
                  className="field text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  type="submit"
                  disabled={ajaxStatus === 'loading'}
                  className="btn btn-emerald flex-1 font-semibold justify-center text-xs sm:text-sm"
                >
                  {ajaxStatus === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Fetching Fee Breakdown...</span>
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      <span>Fetch Fee Breakdown</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetFeeModal}
                  className="btn btn-outline flex-1 font-semibold justify-center text-xs sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </section>
  )
}
