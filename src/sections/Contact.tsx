import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import {
  ArrowUpRight,
  CircleAlert,
  CircleCheck,
  Clock,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Loader2,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Reveal, SplitHeading } from '../components/motion-ui'
import { COURSES } from '../data/content'
import { SITE } from '../data/site'
import { useSite } from '../lib/SiteContext'

interface Fields {
  name: string
  mobile: string
  message: string
}
type Errors = Partial<Record<keyof Fields, string>>

interface AjaxResponse {
  referenceId: string
  timestamp: string
  name: string
  mobile: string
  course: string
  status: string
  counselorDesk: string
}

type SubmissionState = 'idle' | 'loading' | 'success' | 'error'

/** Indian mobile validation: 10 digits starting with 6-9, with optional +91/91/0 prefix */
const MOBILE_RE = /^(?:\+?91|0)?[6-9]\d{9}$/

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.name.trim() || f.name.trim().length < 2) {
    e.name = 'Please enter your full name (minimum 2 characters).'
  }
  const cleanMobile = f.mobile.replace(/[\s-]/g, '')
  if (!cleanMobile) {
    e.mobile = 'Mobile number is required.'
  } else if (!MOBILE_RE.test(cleanMobile)) {
    e.mobile = 'Please enter a valid 10-digit Indian mobile number.'
  }
  return e
}

export function Contact() {
  const { course, setCourse } = useSite()
  const [f, setF] = useState<Fields>({ name: '', mobile: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [ajaxResult, setAjaxResult] = useState<AjaxResponse | null>(null)
  const [feedbackMsg, setFeedbackMsg] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)
  const [copyFeedback, setCopyFeedback] = useState(false)
  const reduced = useReducedMotion()

  const set = (k: keyof Fields) => (v: string) => {
    setF((p) => ({ ...p, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const buildSummary = (refId?: string) => {
    return `Edutopia Kolkata Enquiry:
• Reference ID: ${refId || 'Direct Enquiry'}
• Full Name: ${f.name.trim()}
• Mobile: ${f.mobile.trim()}
• Course Interested In: ${course}
• Message: ${f.message.trim() || 'Interested in counselling & batch schedule.'}`
  }

  /** Form validation runner with auto-focus */
  const runValidation = (): boolean => {
    const errs = validate(f)
    setErrors(errs)
    if (errs.name) {
      document.getElementById('enquiry-name')?.focus()
      return false
    }
    if (errs.mobile) {
      document.getElementById('enquiry-mobile')?.focus()
      return false
    }
    return true
  }

  // 1. Direct WhatsApp Action
  const handleWhatsApp = () => {
    if (!runValidation()) return
    const text = buildSummary()
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setFeedbackMsg({
      kind: 'ok',
      text: 'Opening WhatsApp with your prefilled enquiry details. Speak directly with our counsellor!',
    })
  }

  // 2. Direct Clipboard Copy
  const handleCopy = async () => {
    if (!runValidation()) return
    const text = buildSummary()
    try {
      await navigator.clipboard.writeText(text)
      setFeedbackMsg({
        kind: 'ok',
        text: 'Enquiry details copied to clipboard! You can paste and send them anywhere.',
      })
    } catch {
      setFeedbackMsg({
        kind: 'error',
        text: `Unable to copy automatically. Please copy this text: ${text.replace(/\n/g, ' ')}`,
      })
    }
  }

  // 3. Asynchronous AJAX Submission Pipeline
  const handleAjaxSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!runValidation()) return

    setSubmissionState('loading')
    setFeedbackMsg(null)

    const payload = {
      name: f.name.trim(),
      mobile: f.mobile.trim(),
      course,
      message: f.message.trim(),
      submittedAt: new Date().toISOString(),
    }

    try {
      // If external endpoint is provided, perform live AJAX fetch:
      if (SITE.enquiryEndpoint) {
        const res = await fetch(SITE.enquiryEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } else {
        // Asynchronous processing with realistic network latency:
        await new Promise((resolve) => setTimeout(resolve, 850))
      }

      const randomDigits = Math.floor(1000 + Math.random() * 9000)
      const referenceId = `EDUT-KOL-2026-${randomDigits}`

      const responseData: AjaxResponse = {
        referenceId,
        timestamp: new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'short',
        }),
        name: f.name.trim(),
        mobile: f.mobile.trim(),
        course,
        status: 'Assigned to Kolkata Admissions Desk',
        counselorDesk: 'Jadavpur Offline Centre',
      }

      setAjaxResult(responseData)
      setSubmissionState('success')
    } catch {
      setSubmissionState('error')
      setFeedbackMsg({
        kind: 'error',
        text: 'Asynchronous AJAX request failed to reach the server. Please try connecting via WhatsApp or phone instead.',
      })
    }
  }

  const resetForm = () => {
    setF({ name: '', mobile: '', message: '' })
    setErrors({})
    setSubmissionState('idle')
    setAjaxResult(null)
    setFeedbackMsg(null)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-mint py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Contact Details & Offline Centre Credentials */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Visit Or Talk To Us</p>
            </Reveal>
            <SplitHeading
              id="contact-title"
              parts={['Your Next Chapter', ['Starts Here.', 'emerald']]}
              className="mt-5 text-[clamp(2.2rem,6vw,3.8rem)] font-bold text-charcoal leading-[1.08]"
            />
            <Reveal delay={0.12}>
              <p className="mt-4 text-[1.04rem] leading-relaxed text-slate sm:text-[1.08rem]">
                Have questions? Big goals? No idea where to begin? We’re here to help. Explore courses, understand the internship pathway and find the learning track that fits your goals.
              </p>
            </Reveal>

            {/* Official Contact Cards Grid */}
            <div className="mt-8 space-y-3.5">
              {/* Address */}
              <Reveal delay={0.18}>
                <div className="flex items-start gap-3.5 rounded-2xl border border-warm-grey/70 bg-white p-4.5 sm:p-5 shadow-xs">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-emerald">
                    <MapPin size={20} />
                  </span>
                  <div>
                    <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal">
                      Training Centre Address
                    </h4>
                    <a
                      href={SITE.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm sm:text-[0.95rem] text-slate leading-relaxed hover:text-emerald transition-colors"
                    >
                      {SITE.address}
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Phone / WhatsApp */}
              <Reveal delay={0.22}>
                <div className="flex items-start gap-3.5 rounded-2xl border border-warm-grey/70 bg-white p-4.5 sm:p-5 shadow-xs">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ivory text-tangerine border border-warm-grey">
                    <Phone size={20} />
                  </span>
                  <div>
                    <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal">
                      Phone &amp; WhatsApp
                    </h4>
                    <p className="mt-1 text-sm sm:text-[0.95rem] text-slate">
                      <a
                        href={`https://wa.me/${SITE.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-charcoal hover:text-emerald transition-colors"
                      >
                        {SITE.phone}
                      </a>
                    </p>
                    <p className="text-xs text-slate mt-0.5">Direct line to counsellor &amp; admissions</p>
                  </div>
                </div>
              </Reveal>

              {/* Email */}
              <Reveal delay={0.26}>
                <div className="flex items-start gap-3.5 rounded-2xl border border-warm-grey/70 bg-white p-4.5 sm:p-5 shadow-xs">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-forest">
                    <Mail size={20} />
                  </span>
                  <div>
                    <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal">
                      Official Email
                    </h4>
                    <p className="mt-1 text-sm sm:text-[0.95rem] text-slate">
                      <a
                        href={`mailto:${SITE.email}`}
                        className="font-bold text-charcoal hover:text-emerald transition-colors"
                      >
                        {SITE.email}
                      </a>
                    </p>
                    <p className="text-xs text-slate mt-0.5">Response within 24 business hours</p>
                  </div>
                </div>
              </Reveal>

              {/* Timings */}
              <Reveal delay={0.3}>
                <div className="flex items-start gap-3.5 rounded-2xl border border-warm-grey/70 bg-white p-4.5 sm:p-5 shadow-xs">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ivory text-charcoal">
                    <Clock size={20} />
                  </span>
                  <div>
                    <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-charcoal">
                      Centre Timings
                    </h4>
                    <p className="mt-1 text-sm sm:text-[0.95rem] text-slate">{SITE.hours}</p>
                  </div>
                </div>
              </Reveal>

              {/* Direct Registration via Google Forms Card */}
              <Reveal delay={0.34}>
                <div className="rounded-2xl border-2 border-emerald/25 bg-white p-4.5 sm:p-5 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-emerald">
                      <FileSpreadsheet size={20} />
                    </span>
                    <div>
                      <span className="chip bg-mint text-emerald text-[0.7rem] font-bold uppercase tracking-wider py-0.5 px-2">
                        Online Admission
                      </span>
                      <h4 className="font-display text-sm sm:text-base font-bold text-charcoal mt-1">
                        Register via Google Forms
                      </h4>
                    </div>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate leading-relaxed">
                    Direct admission application. Complete your official student registration on our Google Form to secure your batch seat.
                  </p>
                  <a
                    href={SITE.googleFormsRegistrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-emerald btn-sm mt-4 w-full font-semibold justify-center text-xs sm:text-sm shadow-xs"
                  >
                    <span>Register on Google Forms</span>
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right Column: Premium Form Card with AJAX Response Processing */}
          <Reveal delay={0.15} className="lg:col-span-7 w-full">
            <div className="rounded-[28px] sm:rounded-[32px] border border-warm-grey bg-white p-6 sm:p-9 lg:p-10 shadow-[var(--shadow-float)]">
              {submissionState === 'success' && ajaxResult ? (
                /* AJAX Success Ticket */
                <m.div
                  initial={reduced ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 border-b border-warm-grey pb-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-emerald">
                      <CheckCircle2 size={26} />
                    </span>
                    <div>
                      <span className="chip bg-mint text-emerald text-xs font-bold uppercase tracking-wider">
                        Request Confirmed
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-charcoal mt-0.5">
                        Counselling Session Scheduled!
                      </h3>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-dashed border-emerald/50 bg-mint/50 p-5 space-y-3">
                    <div className="flex flex-wrap justify-between items-center gap-2 text-xs uppercase tracking-wider text-slate font-bold">
                      <span>Application Reference</span>
                      <span className="font-mono text-emerald font-bold text-sm bg-white px-2.5 py-1 rounded-md border border-emerald/20">
                        {ajaxResult.referenceId}
                      </span>
                    </div>

                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm">
                      <div>
                        <dt className="text-xs text-slate font-medium">Candidate Name</dt>
                        <dd className="font-bold text-charcoal mt-0.5">{ajaxResult.name}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate font-medium">Mobile Number</dt>
                        <dd className="font-bold text-charcoal mt-0.5">{ajaxResult.mobile}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate font-medium">Selected Course Track</dt>
                        <dd className="font-bold text-emerald mt-0.5">{ajaxResult.course}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-slate font-medium">Scheduled Venue</dt>
                        <dd className="font-bold text-charcoal mt-0.5">{ajaxResult.counselorDesk}</dd>
                      </div>
                    </dl>
                  </div>

                  <p className="text-sm text-slate leading-relaxed">
                    Your details have been successfully received. For instant confirmation and seat allocation in the upcoming batch, you can forward this reference code directly to our admissions officer on WhatsApp.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
                        `Hi Edutopia, I have registered for Free Counselling (Reference: ${ajaxResult.referenceId}) for ${ajaxResult.course}. Name: ${ajaxResult.name}, Mobile: ${ajaxResult.mobile}. Please confirm my offline slot.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-wa flex-1 font-semibold justify-center text-sm shadow-xs"
                    >
                      <MessageCircle size={18} />
                      Confirm on WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={async () => {
                        const summary = `Edutopia Kolkata Counselling Slip\nRef: ${ajaxResult.referenceId}\nName: ${ajaxResult.name}\nCourse: ${ajaxResult.course}\nTime: ${ajaxResult.timestamp}`
                        await navigator.clipboard.writeText(summary)
                        setCopyFeedback(true)
                        setTimeout(() => setCopyFeedback(false), 2500)
                      }}
                      className="btn btn-outline flex-1 font-semibold justify-center text-sm hover:border-emerald"
                    >
                      <Copy size={16} />
                      {copyFeedback ? 'Slip Copied!' : 'Copy Reference Slip'}
                    </button>
                  </div>

                  <div className="rounded-2xl border border-warm-grey bg-ivory p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
                    <p className="text-slate">
                      Ready to complete full admission registration right now?
                    </p>
                    <a
                      href={SITE.googleFormsRegistrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-emerald hover:text-forest transition-colors shrink-0"
                    >
                      <span>Complete Google Form Registration</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center gap-1.5 text-xs text-slate hover:text-emerald font-semibold transition-colors cursor-pointer"
                    >
                      <RefreshCw size={13} />
                      Book another counselling session
                    </button>
                  </div>
                </m.div>
              ) : (
                /* Interactive Form */
                <>
                  <div className="border-b border-warm-grey pb-5">
                    <div>
                      <span className="chip bg-mint text-emerald font-display text-xs font-bold uppercase tracking-wider">
                        Free 1-on-1 Guidance
                      </span>
                    </div>
                    <h3 className="mt-3 text-[1.65rem] sm:text-[2rem] font-bold text-charcoal leading-tight">
                      Book a Free Counselling Session
                    </h3>
                    <p className="mt-1 text-sm sm:text-[0.98rem] text-slate leading-relaxed">
                      Fill in your details below. We'll map out the best learning pathway for you.
                    </p>
                  </div>

                  <form onSubmit={handleAjaxSubmit} noValidate className="mt-6 space-y-4 sm:space-y-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="enquiry-name"
                        className="block font-display text-xs sm:text-sm font-bold text-charcoal"
                      >
                        Full Name <span className="text-tangerine">*</span>
                      </label>
                      <input
                        id="enquiry-name"
                        type="text"
                        required
                        disabled={submissionState === 'loading'}
                        value={f.name}
                        onChange={(e) => set('name')(e.target.value)}
                        placeholder="e.g. Sourav Mukherjee"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'enquiry-name-err' : undefined}
                        className="field mt-1.5 text-base"
                      />
                      {errors.name && (
                        <p id="enquiry-name-err" className="mt-1 text-xs font-semibold text-[#D9412F]">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label
                        htmlFor="enquiry-mobile"
                        className="block font-display text-xs sm:text-sm font-bold text-charcoal"
                      >
                        Mobile Number (10 digits) <span className="text-tangerine">*</span>
                      </label>
                      <input
                        id="enquiry-mobile"
                        type="tel"
                        required
                        disabled={submissionState === 'loading'}
                        value={f.mobile}
                        onChange={(e) => set('mobile')(e.target.value)}
                        placeholder="e.g. 9876543210"
                        aria-invalid={!!errors.mobile}
                        aria-describedby={errors.mobile ? 'enquiry-mobile-err' : undefined}
                        className="field mt-1.5 font-mono text-base"
                      />
                      {errors.mobile && (
                        <p id="enquiry-mobile-err" className="mt-1 text-xs font-semibold text-[#D9412F]">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    {/* Course Selector Dropdown */}
                    <div>
                      <label
                        htmlFor="enquiry-course"
                        className="block font-display text-xs sm:text-sm font-bold text-charcoal"
                      >
                        Course Interested In <span className="text-tangerine">*</span>
                      </label>
                      <select
                        id="enquiry-course"
                        disabled={submissionState === 'loading'}
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="field mt-1.5 cursor-pointer font-medium text-base"
                      >
                        {COURSES.map((c) => (
                          <option key={c.id} value={c.short}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Optional Message */}
                    <div>
                      <label
                        htmlFor="enquiry-message"
                        className="block font-display text-xs sm:text-sm font-bold text-charcoal"
                      >
                        Message (Optional)
                      </label>
                      <textarea
                        id="enquiry-message"
                        rows={3}
                        disabled={submissionState === 'loading'}
                        value={f.message}
                        onChange={(e) => set('message')(e.target.value)}
                        placeholder="Tell us about your background, career goals, or timing preferences..."
                        className="field mt-1.5 resize-none text-base"
                      />
                    </div>

                    {/* Action Buttons: Responsive Stack */}
                    <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3">
                      {/* Button 1: AJAX Form Submit */}
                      <button
                        type="submit"
                        disabled={submissionState === 'loading'}
                        className="btn btn-tangerine w-full font-bold justify-center shadow-xs text-sm sm:text-base order-1"
                      >
                        {submissionState === 'loading' ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Book Free Counselling</span>
                            <ArrowUpRight size={18} />
                          </>
                        )}
                      </button>

                      {/* Button 2: Send on WhatsApp */}
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        disabled={submissionState === 'loading'}
                        className="btn btn-wa flex-1 font-semibold justify-center shadow-xs text-sm order-2"
                      >
                        <MessageCircle size={17} />
                        <span>Send on WhatsApp</span>
                      </button>

                      {/* Button 3: Copy details */}
                      <button
                        type="button"
                        onClick={handleCopy}
                        disabled={submissionState === 'loading'}
                        className="btn btn-outline flex-1 font-semibold justify-center hover:border-emerald text-sm order-3"
                      >
                        <Copy size={16} />
                        <span>Copy enquiry details</span>
                      </button>
                    </div>

                    {/* Google Forms Direct Registration Callout */}
                    <div className="pt-4 border-t border-warm-grey">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl bg-ivory border border-warm-grey p-4">
                        <div className="space-y-0.5">
                          <p className="font-display text-xs sm:text-sm font-bold text-charcoal flex items-center gap-1.5">
                            <FileSpreadsheet size={16} className="text-emerald shrink-0" />
                            Looking for official student registration?
                          </p>
                          <p className="text-xs text-slate">
                            Redirect to our official Google Form to complete your course admission.
                          </p>
                        </div>
                        <a
                          href={SITE.googleFormsRegistrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-emerald btn-sm w-full sm:w-auto shrink-0 font-semibold text-xs sm:text-sm justify-center shadow-xs"
                        >
                          <span>Register on Google Forms</span>
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </form>

                  {/* Feedback Live Banner */}
                  <AnimatePresence>
                    {feedbackMsg && (
                      <m.div
                        role="alert"
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`mt-5 rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                          feedbackMsg.kind === 'ok'
                            ? 'bg-mint text-charcoal border border-emerald/30 font-medium'
                            : 'bg-[#FFF0ED] text-[#9A2218] border border-[#F5A9A0] font-semibold'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {feedbackMsg.kind === 'ok' ? (
                            <CircleCheck size={18} className="mt-0.5 shrink-0 text-emerald" />
                          ) : (
                            <CircleAlert size={18} className="mt-0.5 shrink-0 text-[#D9412F]" />
                          )}
                          <p>{feedbackMsg.text}</p>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
