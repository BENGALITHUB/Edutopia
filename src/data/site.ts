/**
 * ─────────────────────────────────────────────────────────────
 *  EDUTOPIA KOLKATA — SITE CONFIGURATION
 *  Authoritative contact details & navigation
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  name: 'Edutopia',
  brand: 'Edutopia Kolkata',
  tagline: 'Learn. Create. Grow.',
  city: 'Kolkata, West Bengal, India',

  /** Supplied official contact details */
  address: '44, Shyama Pally, Bapuji Nagar, Jadavpur, Kolkata, West Bengal 700032, India',
  phone: '+91 8981031078',
  phoneRaw: '+918981031078',
  whatsapp: '918981031078',
  email: 'contact@bengalithub.com',

  hours: 'Monday – Saturday: 10:00 AM – 7:00 PM',
  mapUrl: 'https://maps.google.com/?q=44,+Shyama+Pally,+Bapuji+Nagar,+Jadavpur,+Kolkata,+West+Bengal+700032',

  /** Optional external form endpoint if configured */
  enquiryEndpoint: '',

  /** Official Google Forms registration URL (redirects to Google Forms) */
  googleFormsRegistrationUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSe5E6ViyYQ8sdiuUpeuVHbPc2vt8lf6aM2IsIi2JvvcC2yxGg/viewform?usp=dialog',

  /** Social media channels (redirectable fallback links, ready to be updated) */
  socials: {
    Instagram: 'https://instagram.com/edutopia_kolkata',
    LinkedIn: 'https://linkedin.com/company/edutopia-kolkata',
    YouTube: 'https://youtube.com/@edutopia-kolkata',
    Facebook: 'https://facebook.com/edutopiakolkata',
  } as Record<string, string>,
}

export const NAV = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'why', label: 'Why Us' },
  { id: 'courses', label: 'Courses' },
  { id: 'fees', label: 'Fees' },
  { id: 'internships', label: 'Internships' },
  { id: 'certification', label: 'Certification' },
  { id: 'faq', label: 'FAQs' },
  { id: 'contact', label: 'Contact' },
] as const

export function whatsappUrl(text: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
}
