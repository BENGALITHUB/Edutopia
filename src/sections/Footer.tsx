import {
  Home,
  Users,
  Target,
  GraduationCap,
  Briefcase,
  Award,
  Mail,
  BookOpen,
  Coins,
  Building,
  HelpCircle,
  MapPin,
  Phone,
  FileText,
  ShieldCheck,
  IndianRupee,
  FileCheck,
  Accessibility,
} from 'lucide-react'
import { Logo } from '../components/Logo'
import { Modal } from '../components/Modal'
import { LEGAL } from '../data/content'
import type { LegalId } from '../data/content'
import { SITE } from '../data/site'
import { useSite } from '../lib/SiteContext'
import { onAnchorClick } from '../lib/scroll'

const YEAR = 2026

const QUICK_LINKS = [
  { id: 'top', label: 'Home', icon: Home },
  { id: 'about', label: 'About Us', icon: Users },
  { id: 'about', label: 'Mission & Vision', icon: Target },
  { id: 'courses', label: 'Courses', icon: GraduationCap },
  { id: 'internships', label: 'Internship Program', icon: Briefcase },
  { id: 'certification', label: 'Certification', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
] as const

const STUDENT_RESOURCES = [
  { id: 'contact', label: 'Admission Enquiry', icon: GraduationCap, type: 'anchor' },
  { id: 'courses', label: 'Curriculum', icon: BookOpen, type: 'anchor' },
  { id: 'fees', label: 'Course Fees', icon: Coins, type: 'anchor' },
  { id: 'internship', label: 'Internship Policy', icon: Building, type: 'legal' },
  { id: 'faq', label: 'FAQs', icon: HelpCircle, type: 'anchor' },
] as const

const LEGAL_ITEMS: { id: LegalId; label: string; icon: typeof FileText }[] = [
  { id: 'privacy', label: 'Privacy Policy', icon: FileText },
  { id: 'terms', label: 'Terms & Conditions', icon: ShieldCheck },
  { id: 'refund', label: 'Refund & Cancellation Policy', icon: IndianRupee },
  { id: 'internship', label: 'Internship Terms', icon: FileCheck },
  { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
]

/* Custom crisp SVGs for Social Channels matching the reference image */
function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function YoutubeIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function Footer() {
  const { openLegal } = useSite()

  const socials = [
    { name: 'Instagram', icon: InstagramIcon, url: SITE.socials.Instagram || 'https://instagram.com' },
    { name: 'LinkedIn', icon: LinkedinIcon, url: SITE.socials.LinkedIn || 'https://linkedin.com' },
    { name: 'YouTube', icon: YoutubeIcon, url: SITE.socials.YouTube || 'https://youtube.com' },
    { name: 'Facebook', icon: FacebookIcon, url: SITE.socials.Facebook || 'https://facebook.com' },
  ]

  return (
    <footer className="relative bg-[#F7F4EE] px-4 py-8 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Floating Bento Card */}
        <div className="relative overflow-hidden rounded-[32px] border border-warm-grey bg-[#FAF8F5] p-6 sm:p-10 shadow-[0_4px_24px_rgba(32,40,32,0.04)] border-b-[4px] border-b-emerald">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 items-start">
            {/* Column 1: Brand & Tagline */}
            <div className="lg:col-span-3 flex flex-col items-start">
              <a
                href="#top"
                onClick={(e) => onAnchorClick(e, 'top')}
                aria-label="Edutopia Kolkata"
                className="inline-block transition-transform duration-200 hover:scale-102"
              >
                <Logo />
              </a>

              {/* Serif Tagline with Orange Underline */}
              <div className="mt-6">
                <h3 className="font-serif text-[1.65rem] font-bold tracking-tight text-charcoal sm:text-[1.85rem] leading-none">
                  Learn. Create. Grow.
                </h3>
                <span className="block h-[2.5px] w-8 rounded-full bg-tangerine mt-2.5" aria-hidden="true" />
              </div>

              {/* Description */}
              <p className="mt-4 text-[0.92rem] leading-relaxed text-slate max-w-[270px]">
                Empowering Kolkata’s next generation with practical skills, personalized mentorship, accessible education and career-focused learning.
              </p>

              {/* Badge Pill */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-mint px-3.5 py-1.5 text-xs font-semibold text-emerald shadow-2xs">
                <MapPin size={13} className="shrink-0 text-emerald" />
                <span>Offline Practical Centre · Kolkata</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-charcoal mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-[0.92rem]">
                {QUICK_LINKS.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => onAnchorClick(e, item.id)}
                        className="group flex items-center gap-2.5 text-slate hover:text-emerald transition-colors font-medium py-0.5"
                      >
                        <Icon size={15} className="shrink-0 text-slate/75 group-hover:text-emerald transition-colors" />
                        <span>{item.label}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Column 3: Student Resources */}
            <div className="lg:col-span-2">
              <h4 className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-charcoal mb-4">
                Student Resources
              </h4>
              <ul className="space-y-2.5 text-[0.92rem]">
                {STUDENT_RESOURCES.map((item) => {
                  const Icon = item.icon
                  if (item.type === 'legal') {
                    return (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => openLegal('internship')}
                          className="group flex items-center gap-2.5 text-slate hover:text-emerald transition-colors font-medium py-0.5 text-left cursor-pointer"
                        >
                          <Icon size={15} className="shrink-0 text-slate/75 group-hover:text-emerald transition-colors" />
                          <span>{item.label}</span>
                        </button>
                      </li>
                    )
                  }
                  return (
                    <li key={item.label}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => onAnchorClick(e, item.id)}
                        className="group flex items-center gap-2.5 text-slate hover:text-emerald transition-colors font-medium py-0.5"
                      >
                        <Icon size={15} className="shrink-0 text-slate/75 group-hover:text-emerald transition-colors" />
                        <span>{item.label}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Column 4: Connect & Social Channels */}
            <div className="lg:col-span-3">
              <h4 className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-charcoal mb-4">
                Connect
              </h4>

              {/* Address */}
              <div className="flex items-start gap-2.5 text-[0.9rem] text-slate">
                <MapPin size={16} className="shrink-0 text-emerald mt-1" />
                <a
                  href={SITE.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-snug hover:text-emerald transition-colors"
                  title="View on Google Maps"
                >
                  44, Shyama Pally, Bapuji Nagar, Jadavpur, Kolkata, West Bengal 700032, India
                </a>
              </div>

              {/* Phone / WhatsApp */}
              <div className="mt-3.5 flex items-start gap-2.5 text-[0.9rem] text-slate">
                <Phone size={16} className="shrink-0 text-emerald mt-1" />
                <div>
                  <span className="block text-xs text-slate">Phone / WhatsApp:</span>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-charcoal hover:text-emerald transition-colors text-[0.95rem]"
                  >
                    {SITE.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="mt-3 flex items-start gap-2.5 text-[0.9rem] text-slate">
                <Mail size={16} className="shrink-0 text-emerald mt-1" />
                <div>
                  <span className="block text-xs text-slate">Email:</span>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-bold text-charcoal hover:text-emerald transition-colors text-[0.92rem]"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>

              {/* Social Channels Sub-section */}
              <div className="mt-6 pt-2">
                <h5 className="font-display text-[0.72rem] font-bold uppercase tracking-[0.14em] text-charcoal mb-3">
                  Social Channels
                </h5>
                <div className="flex items-center gap-2">
                  {socials.map((s) => {
                    const Icon = s.icon
                    return (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Edutopia on ${s.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF2EC] text-charcoal border border-[#D5E4D8] shadow-2xs hover:bg-emerald hover:text-white hover:border-emerald transition-all duration-200"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Column 5: Legal & Policy */}
            <div className="lg:col-span-2">
              <h4 className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-charcoal mb-4">
                Legal &amp; Policy
              </h4>
              <ul className="space-y-2.5 text-[0.92rem]">
                {LEGAL_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => openLegal(item.id)}
                        className="group flex items-center gap-2.5 text-slate hover:text-emerald transition-colors font-medium py-0.5 text-left cursor-pointer w-full"
                      >
                        <Icon size={15} className="shrink-0 text-slate/75 group-hover:text-emerald transition-colors" />
                        <span className="leading-tight">{item.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Card Bottom Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-warm-grey pt-5 text-xs sm:text-sm text-slate gap-3">
            <p>© {YEAR} Edutopia. All rights reserved.</p>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-tangerine font-light">|</span>
              <p className="font-serif italic text-charcoal/85 text-[0.92rem]">
                Build skills today. Create opportunities tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Legal Dialogs Modal */}
      <LegalDialogs />
    </footer>
  )
}

/** Legal documents shown in an accessible dialog (retaining complete original text and draft warnings). */
export function LegalDialogs() {
  const { legal, closeLegal } = useSite()
  const doc = LEGAL.find((d) => d.id === legal)

  return (
    <Modal open={!!doc} onClose={closeLegal} title={doc?.title ?? ''}>
      {doc ? (
        <div className="mt-4 text-[0.98rem] text-slate leading-relaxed">
          {doc.draft ? (
            <div className="rounded-xl border border-dashed border-tangerine/80 bg-tangerine/10 px-4 py-3 text-[0.9rem] font-medium text-charcoal">
              <strong className="font-bold">⚠️ Draft Policy Notice: </strong>
              {doc.draft}
            </div>
          ) : null}

          {doc.intro ? <p className="mt-4 font-medium text-charcoal">{doc.intro}</p> : null}

          {doc.sections.map((s, i) => (
            <div key={i} className="mt-6 border-t border-warm-grey/60 pt-4 first:border-0 first:pt-0">
              {s.heading ? (
                <h3 className="font-display text-[1.15rem] font-bold tracking-normal text-charcoal">
                  {s.heading}
                </h3>
              ) : null}
              {s.text ? <p className="mt-2 text-slate leading-relaxed">{s.text}</p> : null}
              {s.list ? (
                <ul className="mt-2.5 list-disc space-y-2 pl-5 text-slate">
                  {s.list.map((li) => (
                    <li key={li} className="leading-relaxed">
                      {li}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          {doc.outro ? <p className="mt-6 font-medium text-charcoal">{doc.outro}</p> : null}

          <div className="mt-8 border-t border-warm-grey pt-5 flex justify-end">
            <button
              type="button"
              onClick={closeLegal}
              className="btn btn-emerald font-semibold"
            >
              Close document
            </button>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}
