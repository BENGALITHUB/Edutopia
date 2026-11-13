import { ArrowUpRight, ChevronDown, FolderKanban, Info, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { Modal } from '../components/Modal'
import { Reveal, SplitHeading } from '../components/motion-ui'
import { ProjectPreview } from '../components/ProjectPreview'
import { COUNSELLING_NOTE, COURSES } from '../data/content'
import type { Course, Tone } from '../data/content'
import { useSite } from '../lib/SiteContext'

const TONE_STYLES: Record<Tone, { badge: string; dot: string; num: string; border: string }> = {
  emerald: {
    badge: 'bg-mint text-emerald border-emerald/20',
    dot: 'bg-emerald',
    num: 'text-emerald bg-mint',
    border: 'hover:border-emerald',
  },
  tangerine: {
    badge: 'bg-tangerine/15 text-charcoal border-tangerine/30',
    dot: 'bg-tangerine',
    num: 'text-charcoal bg-tangerine/20',
    border: 'hover:border-tangerine',
  },
  lime: {
    badge: 'bg-lime/40 text-charcoal border-lime/60',
    dot: 'bg-forest',
    num: 'text-charcoal bg-lime/40',
    border: 'hover:border-forest',
  },
  forest: {
    badge: 'bg-forest/10 text-forest border-forest/20',
    dot: 'bg-forest',
    num: 'text-white bg-forest',
    border: 'hover:border-forest',
  },
  mint: {
    badge: 'bg-mint text-emerald border-emerald/30',
    dot: 'bg-emerald',
    num: 'text-emerald bg-mint',
    border: 'hover:border-emerald',
  },
}

export function Courses() {
  const { courseModal, openCourse, closeCourse, enquire } = useSite()
  const selected = COURSES.find((c) => c.id === courseModal)

  return (
    <section id="courses" aria-labelledby="courses-title" className="relative bg-white py-12 sm:py-16 lg:py-20">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow">Career-Focused Courses</p>
            </Reveal>
            <SplitHeading
              id="courses-title"
              parts={['Pick Your', ['Skill.', 'emerald'], 'Build Your', ['Future.', 'tangerine']]}
              className="mt-5 text-[clamp(2.3rem,5.6vw,4.4rem)] font-bold text-charcoal"
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-4">
            <p className="text-[1.05rem] text-slate leading-relaxed">
              Career-focused learning tracks built around practical skills, projects and mentorship in Kolkata.
            </p>
          </Reveal>
        </div>

        {/* 5 Course Cards Grid */}
        <ul className="mt-10 sm:mt-12 grid gap-6 md:grid-cols-6 lg:gap-8">
          {COURSES.map((c, i) => (
            <Reveal
              as="li"
              key={c.id}
              delay={(i % 3) * 0.08}
              className={i < 2 ? 'md:col-span-3' : 'md:col-span-3 lg:col-span-2 max-lg:last:md:col-span-6'}
            >
              <CourseCard
                course={c}
                onExplore={() => openCourse(c.id)}
                onEnquire={() => enquire(c.short)}
              />
            </Reveal>
          ))}
        </ul>

        {/* Counselling Disclosure Notice */}
        <Reveal>
          <div className="mt-10 flex items-start gap-3.5 rounded-2xl border border-warm-grey bg-ivory p-5 text-[0.98rem] text-slate sm:items-center">
            <Info size={20} className="mt-0.5 shrink-0 text-emerald sm:mt-0" aria-hidden="true" />
            <p>
              <strong className="font-semibold text-charcoal">Official Notice: </strong>
              Course duration, fees, eligibility and batch schedules are shared during your free counselling session. Values are never invented or assumed.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Course Detail Modal */}
      <Modal
        open={!!selected}
        onClose={closeCourse}
        title={selected?.title ?? ''}
        wide
        header={
          selected ? (
            <div className="relative h-48 w-full overflow-hidden bg-ivory sm:h-64">
              <img
                src={selected.image}
                alt={selected.imageAlt}
                width={1000}
                height={640}
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"
              />
              <span className="absolute bottom-4 left-6 rounded-full bg-white/90 px-3.5 py-1 font-display text-xs font-bold text-charcoal uppercase tracking-wider backdrop-blur">
                Offline Track · Kolkata
              </span>
            </div>
          ) : null
        }
      >
        {selected ? (
          <div>
            <p className="mt-3 text-[1.1rem] leading-relaxed text-slate">{selected.description}</p>

            {/* Tags */}
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Course skills and technologies">
              {selected.tags.map((t) => (
                <li
                  key={t}
                  className={`chip border font-medium ${TONE_STYLES[selected.tone].badge}`}
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {/* Curriculum Outline */}
              <div className="rounded-2xl border border-warm-grey bg-ivory p-5">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-charcoal flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald" /> Curriculum Modules
                </h3>
                <ol className="mt-4 space-y-3">
                  {selected.curriculum.map((item, n) => (
                    <li key={item} className="flex items-center gap-3 font-medium text-charcoal text-[0.95rem]">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold ${
                          TONE_STYLES[selected.tone].num
                        }`}
                      >
                        0{n + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Capstone Project Preview */}
              <div className="rounded-2xl border border-warm-grey bg-white p-5 shadow-xs">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-charcoal flex items-center gap-2">
                  <FolderKanban size={16} className="text-tangerine" /> Capstone Project Highlight
                </h3>
                <p className="mt-3 font-display text-lg font-bold text-charcoal">{selected.project}</p>
                <div className="mt-3 h-44">
                  <ProjectPreview kind={selected.projectKind} />
                </div>
                <p className="mt-2 text-xs text-slate">Illustrative simulation of the course project.</p>
              </div>
            </div>

            {/* Note banner */}
            <p className="mt-6 rounded-2xl bg-mint p-4 text-[0.95rem] text-charcoal font-medium">
              ℹ️ {COUNSELLING_NOTE}
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <button
                type="button"
                className="btn btn-tangerine font-semibold"
                onClick={() => enquire(selected.short)}
              >
                Enquire about this course
                <ArrowUpRight size={17} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={closeCourse}
              >
                Back to all courses
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  )
}

interface CourseCardProps {
  course: Course
  onExplore: () => void
  onEnquire: () => void
}

function CourseCard({ course, onExplore, onEnquire }: CourseCardProps) {
  const [curriculumOpen, setCurriculumOpen] = useState(false)
  const style = TONE_STYLES[course.tone]

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-warm-grey bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${style.border}`}
    >
      {/* Top Media */}
      <div className="relative h-52 overflow-hidden bg-ivory">
        <img
          src={course.image}
          alt={course.imageAlt}
          width={800}
          height={520}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent"
        />
        <span
          className={`absolute left-4 top-4 chip border backdrop-blur-md font-semibold ${style.badge}`}
        >
          <span className={`h-2 w-2 rounded-full ${style.dot}`} />
          {course.short}
        </span>
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-[1.45rem] font-bold text-charcoal sm:text-[1.6rem] leading-snug">
          {course.title}
        </h3>
        <p className="mt-2.5 text-[0.96rem] text-slate leading-relaxed">
          {course.description}
        </p>

        {/* Technology Tags */}
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${course.short} skills`}>
          {course.tags.slice(0, 3).map((t) => (
            <li
              key={t}
              className="chip border border-warm-grey bg-ivory text-xs font-medium text-charcoal"
            >
              {t}
            </li>
          ))}
          {course.tags.length > 3 && (
            <li className="chip border border-warm-grey bg-ivory text-xs font-medium text-slate">
              +{course.tags.length - 3} more
            </li>
          )}
        </ul>

        {/* Project Highlight Badge */}
        <div className="mt-5 rounded-2xl border border-warm-grey bg-mint p-3.5 flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald shadow-2xs">
            <FolderKanban size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <span className="block font-display text-[0.72rem] font-bold uppercase tracking-wider text-emerald">
              Project Highlight
            </span>
            <span className="block truncate font-display text-sm font-bold text-charcoal">
              {course.project}
            </span>
          </div>
        </div>

        {/* Expandable Curriculum on Card */}
        <div className="mt-5 border-t border-warm-grey/80 pt-3">
          <button
            type="button"
            aria-expanded={curriculumOpen}
            onClick={() => setCurriculumOpen((o) => !o)}
            className="flex w-full items-center justify-between text-left font-display text-xs font-bold uppercase tracking-wider text-slate hover:text-emerald transition-colors py-1.5"
          >
            <span>Curriculum Modules ({course.curriculum.length})</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${curriculumOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {curriculumOpen && (
            <ol className="mt-3 space-y-2 border-l-2 border-emerald/30 pl-3 text-xs text-charcoal font-medium">
              {course.curriculum.map((m, idx) => (
                <li key={m} className="leading-snug">
                  <span className="font-bold text-emerald">0{idx + 1}.</span> {m}
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-auto pt-6 flex items-center gap-2.5">
          <button
            type="button"
            onClick={onExplore}
            className="btn btn-outline btn-sm flex-1 text-xs sm:text-sm font-semibold hover:border-emerald"
          >
            Explore Course
          </button>
          <button
            type="button"
            onClick={onEnquire}
            className="btn btn-tangerine btn-sm flex-1 text-xs sm:text-sm font-semibold"
          >
            Enquiry
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
