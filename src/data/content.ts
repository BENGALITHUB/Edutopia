import aiImg from '../assets/img/course-ai.webp'
import dataImg from '../assets/img/course-data.webp'
import designImg from '../assets/img/course-design.webp'
import marketingImg from '../assets/img/course-marketing.webp'
import webImg from '../assets/img/course-web.webp'

export type Tone = 'emerald' | 'tangerine' | 'lime' | 'forest' | 'mint'
export type ProjectKind = 'chatbot' | 'website' | 'campaign' | 'prototype' | 'dashboard'

export interface Course {
  id: string
  title: string
  short: string
  description: string
  tags: string[]
  project: string
  projectKind: ProjectKind
  curriculum: string[]
  image: string
  imageAlt: string
  tone: Tone
}

/** Shared note: fees, durations and schedules are never invented. */
export const COUNSELLING_NOTE = 'Duration, fees, eligibility and batch schedules are shared at counselling.'

export const COURSES: Course[] = [
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    short: 'AI & Machine Learning',
    description: 'Python fundamentals, data science, machine learning, generative AI, prompt engineering and AI project development.',
    tags: ['Python fundamentals', 'Data science', 'Machine learning', 'Generative AI', 'Prompt engineering'],
    project: 'AI-powered chatbot',
    projectKind: 'chatbot',
    curriculum: [
      'Python fundamentals',
      'Data science basics',
      'Machine learning',
      'Generative AI & prompt engineering',
      'Capstone: AI project',
    ],
    image: aiImg,
    imageAlt: 'Learner training an artificial intelligence model on a computer',
    tone: 'emerald',
  },
  {
    id: 'full-stack',
    title: 'Full Stack Web Development',
    short: 'Full Stack Web Development',
    description: 'HTML, CSS, JavaScript, React, backend development, databases, APIs, Git and deployment.',
    tags: ['HTML, CSS & JS', 'React', 'Backend & APIs', 'Databases', 'Git & deployment'],
    project: 'Complete business website',
    projectKind: 'website',
    curriculum: [
      'HTML, CSS & JavaScript',
      'React',
      'Backend & APIs',
      'Databases',
      'Git & deployment',
    ],
    image: webImg,
    imageAlt: 'Developer working on modern full stack code on laptop',
    tone: 'tangerine',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & SEO',
    short: 'Digital Marketing & SEO',
    description: 'Search engine optimization, social media marketing, Google Ads, content strategy, analytics and AI marketing tools.',
    tags: ['SEO', 'Social media marketing', 'Google Ads', 'Content strategy', 'Analytics & AI'],
    project: 'Live marketing campaign',
    projectKind: 'campaign',
    curriculum: [
      'SEO',
      'Social media marketing',
      'Google Ads',
      'Content strategy',
      'Analytics & AI tools',
    ],
    image: marketingImg,
    imageAlt: 'Marketing strategist reviewing digital performance and campaign metrics',
    tone: 'lime',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Graphic Design',
    short: 'UI/UX & Graphic Design',
    description: 'Figma, user research, wireframing, interface design, prototyping, visual design and portfolio development.',
    tags: ['Figma prototyping', 'User research', 'Wireframing', 'Visual design', 'Portfolio'],
    project: 'Interactive mobile app prototype',
    projectKind: 'prototype',
    curriculum: [
      'User research',
      'Wireframing',
      'Figma prototyping',
      'Visual design',
      'Portfolio development',
    ],
    image: designImg,
    imageAlt: 'UI/UX designer crafting mobile interface prototypes in Figma',
    tone: 'forest',
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    short: 'Data Analytics',
    description: 'Excel, SQL, Python, Power BI, data visualization, reporting and business decision-making.',
    tags: ['Excel', 'SQL', 'Python', 'Power BI', 'Reporting & dashboards'],
    project: 'Business intelligence dashboard',
    projectKind: 'dashboard',
    curriculum: [
      'Excel',
      'SQL',
      'Python',
      'Power BI',
      'Reporting & dashboards',
    ],
    image: dataImg,
    imageAlt: 'Data analyst visualizing business metrics and interactive charts',
    tone: 'mint',
  },
]

export const JOURNEY = [
  { stage: 'Stage 1', title: 'Build your foundation', detail: 'Offline training with mentors beside you.' },
  { stage: 'Stage 2', title: 'Practice with projects', detail: 'Hands-on assignments and real briefs.' },
  { stage: 'Stage 3', title: 'Get feedback', detail: 'Regular reviews and mentorship.' },
  { stage: 'Stage 4', title: 'Meet the eligibility requirements', detail: 'Published clearly before you enroll.' },
  { stage: 'Stage 5', title: 'Begin your internship', detail: 'Qualifying workplace experience.' },
  { stage: 'Stage 6', title: 'Launch your next step', detail: 'Portfolio ready, career conversation started.' },
]

export const INTERNSHIP_DISCLAIMER =
  'An internship does not guarantee permanent employment. Eligibility, duration and allocation criteria are shared before enrollment.'

export const CERT_POINTS = [
  'Course completion certificate after meeting assessment requirements',
  'Project-based evaluation to show practical knowledge',
  'Shareable digital credentials, subject to verification availability',
  'Internship completion documentation for eligible students',
  'Guidance on presenting projects on resumes, LinkedIn and portfolios',
]

export const FAQS = [
  {
    q: 'Is Edutopia an offline training center?',
    a: 'Yes. Edutopia is an in-person training center in Kolkata, offering classroom-based learning and practical guidance.',
  },
  {
    q: 'Can beginners join?',
    a: 'Yes. Courses start from the fundamentals and build step by step.',
  },
  {
    q: 'Does every student receive mentorship?',
    a: 'Mentorship is part of every learning track, including doubt-clearing, project reviews and career direction.',
  },
  {
    q: 'Is an internship guaranteed?',
    a: 'Eligible students are supported through a structured internship pathway. Eligibility, duration and allocation criteria are shared before enrollment, and an internship does not guarantee permanent employment.',
  },
  {
    q: 'Are the courses affordable?',
    a: 'We focus on transparent pricing and student-friendly fee options. Ask for current fees at counselling.',
  },
  {
    q: 'Will I receive a certificate?',
    a: 'You receive an institute-issued completion certificate after meeting assessment requirements. It is not an externally accredited qualification.',
  },
]

export type CommunityTone = 'emerald' | 'tangerine' | 'lime' | 'mint' | 'ivory'

export interface CommunityTile {
  label: string
  subtitle: string
  span: string
  tone: CommunityTone
  category: 'classroom' | 'project' | 'workshop' | 'testimonial'
}

/** Community tiles: clearly identified placeholders & showcases until genuine Edutopia media is available. */
export const COMMUNITY_TILES: CommunityTile[] = [
  {
    label: 'Classroom Activities',
    subtitle: 'Collaborative offline studio learning',
    span: 'sm:col-span-2 sm:row-span-2',
    tone: 'emerald',
    category: 'classroom',
  },
  {
    label: 'Project Demonstrations',
    subtitle: 'Live capstone prototype reviews',
    span: '',
    tone: 'tangerine',
    category: 'project',
  },
  {
    label: 'Student Collaboration',
    subtitle: 'Pair programming and design sprints',
    span: 'sm:row-span-2',
    tone: 'mint',
    category: 'classroom',
  },
  {
    label: 'Hands-on Workshops',
    subtitle: 'Weekend deep-dives with mentors',
    span: '',
    tone: 'lime',
    category: 'workshop',
  },
  {
    label: 'Technology Events',
    subtitle: 'Kolkata tech community meetups',
    span: 'sm:col-span-2',
    tone: 'ivory',
    category: 'workshop',
  },
  {
    label: 'Student Achievements',
    subtitle: 'Internship milestones and certificates',
    span: '',
    tone: 'emerald',
    category: 'project',
  },
  {
    label: 'Verified Student Testimonials',
    subtitle: 'Genuine student feedback after completion',
    span: '',
    tone: 'tangerine',
    category: 'testimonial',
  },
]

export type LegalId = 'privacy' | 'terms' | 'refund' | 'internship' | 'accessibility'

export interface LegalDoc {
  id: LegalId
  title: string
  /** Draft notice shown at the top (kept from the original site). */
  draft?: string
  intro?: string
  sections: { heading?: string; text?: string; list?: string[] }[]
  outro?: string
}

const DRAFT_BRACKETS =
  'Draft template. Have a legal professional review it and fill in the bracketed details before relying on it.'

export const LEGAL: LegalDoc[] = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    draft: DRAFT_BRACKETS,
    sections: [
      {
        heading: 'Who we are',
        text: 'Edutopia, 44, Shyama Pally, Bapuji Nagar, Jadavpur, Kolkata, West Bengal 700032, India. Contact: contact@bengalithub.com.',
      },
      {
        heading: 'What we collect',
        list: [
          'Details you give us: name, mobile number, email, course interest and messages.',
          'Basic technical data, such as device type and pages visited, if analytics are enabled.',
        ],
      },
      {
        heading: 'How we use it',
        list: [
          'To respond to enquiries and arrange counselling.',
          'To manage admissions, attendance, certificates and internship coordination.',
          'To share updates you have asked for.',
        ],
      },
      {
        heading: 'Sharing',
        text: 'We do not sell personal data. We share it only with service providers who help us run Edutopia, with internship partners for enrolled students who have agreed to it, or where the law requires.',
      },
      {
        heading: 'Retention and security',
        text: 'We keep data only as long as needed for these purposes and use reasonable safeguards to protect it.',
      },
      {
        heading: 'Your rights',
        text: 'You may ask to access, correct or delete your personal data, or withdraw consent, by writing to contact@bengalithub.com, in line with the Digital Personal Data Protection Act, 2023 (DPDP Act).',
      },
    ],
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    draft: DRAFT_BRACKETS,
    sections: [
      {
        heading: 'Enrollment',
        text: 'Enrollment is confirmed once the registration fee is paid and the admission form is accepted. Course content, duration and batch timings may be adjusted with notice.',
      },
      {
        heading: 'Fees',
        text: 'Fees are as stated in the written fee sheet at enrollment. Installment dates must be kept; late payment may affect access to classes or certificates.',
      },
      {
        heading: 'Attendance and conduct',
        text: 'Students are expected to attend regularly, respect others and use equipment responsibly. Edutopia may act on misconduct, including removal from a batch.',
      },
      {
        heading: 'Certificates',
        text: 'Certificates are issued by Edutopia after attendance and assessment requirements are met. They are institute-issued and are not an externally accredited qualification unless stated otherwise.',
      },
      {
        heading: 'Student work',
        text: 'You keep ownership of your own projects. You allow Edutopia to showcase them for learning and promotion, unless you tell us in writing that you do not.',
      },
      {
        heading: 'Liability and law',
        text: 'Edutopia does not promise any particular job, salary or exam result. These terms are governed by the laws of India, with courts at Kolkata having jurisdiction.',
      },
    ],
  },
  {
    id: 'refund',
    title: 'Refund & Cancellation Policy',
    draft: 'Draft template. Have a legal professional review it and replace every bracket with your actual terms.',
    sections: [
      {
        heading: 'Before the course starts',
        text: 'If you cancel in writing at least [X] days before your batch begins, we refund the fees paid, less [registration fee / Y%] as an administrative charge.',
      },
      {
        heading: 'After the course starts',
        text: 'If you cancel within [X] days of the first class, we refund [Y%] of the fees paid. After that, fees are not refundable, except where Edutopia cancels or cannot run a batch.',
      },
      {
        heading: 'If Edutopia cancels',
        text: 'If we cancel a batch or cannot provide the course, you may choose a full refund or a transfer to another batch.',
      },
      {
        heading: 'How to request',
        text: 'Write to contact@bengalithub.com with your name, course and payment details. Approved refunds are paid to the original payment method within [X] working days.',
      },
    ],
  },
  {
    id: 'internship',
    title: 'Internship Terms',
    draft: 'Draft template. Replace every bracket with your confirmed internship policy before publishing.',
    sections: [
      {
        heading: 'Eligibility',
        text: 'Students qualify after completing their course, meeting the attendance minimum of [X%], passing the assessments and submitting required projects.',
      },
      {
        heading: 'Allocation and duration',
        text: 'Placements depend on available partner opportunities and the student’s skills and performance. Internships last [X weeks/months] and may be on-site, remote or hybrid.',
      },
      {
        heading: 'Stipend',
        text: 'Internships may be paid or unpaid, as stated in the placement offer. [Edutopia’s stipend position to be confirmed.]',
      },
      {
        heading: 'What it is not',
        text: 'An internship is a learning experience. It does not guarantee permanent employment.',
      },
      {
        heading: 'Conduct and documentation',
        text: 'Interns follow the host organization’s rules. Eligible students who complete their internship receive completion documentation.',
      },
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    intro: 'We want everyone to be able to use this website and our learning space.',
    sections: [
      {
        list: [
          'The site works with keyboards and screen readers, and shows clear focus outlines.',
          'It adapts to phones, tablets and desktops, and respects your reduced-motion setting.',
          'Our offline centre’s access details, such as step-free entry, will be listed once the address is confirmed.',
        ],
      },
    ],
    outro: 'If something is hard to use, write to contact@bengalithub.com and we will help and fix it.',
  },
]
