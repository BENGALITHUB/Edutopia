import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { COURSES } from '../data/content'
import type { LegalId } from '../data/content'
import { scrollToId } from './scroll'

interface SiteState {
  /** Course preselected in the enquiry form. */
  course: string
  setCourse: (c: string) => void
  /** Preselect a course (optional) and jump to the enquiry form. */
  enquire: (courseTitle?: string) => void
  legal: LegalId | null
  openLegal: (id: LegalId) => void
  closeLegal: () => void
  courseModal: string | null
  openCourse: (id: string) => void
  closeCourse: () => void
}

const Ctx = createContext<SiteState | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [course, setCourse] = useState(COURSES[0]!.short)
  const [legal, setLegal] = useState<LegalId | null>(null)
  const [courseModal, setCourseModal] = useState<string | null>(null)

  const enquire = useCallback((courseTitle?: string) => {
    if (courseTitle) setCourse(courseTitle)
    setCourseModal(null)
    // Wait for any modal to release scroll lock before scrolling.
    window.setTimeout(() => {
      scrollToId('contact')
      document.getElementById('enquiry-name')?.focus({ preventScroll: true })
    }, 90)
  }, [])

  const value = useMemo<SiteState>(
    () => ({
      course,
      setCourse,
      enquire,
      legal,
      openLegal: setLegal,
      closeLegal: () => setLegal(null),
      courseModal,
      openCourse: setCourseModal,
      closeCourse: () => setCourseModal(null),
    }),
    [course, enquire, legal, courseModal],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useSite(): SiteState {
  const v = useContext(Ctx)
  if (!v) throw new Error('useSite must be used inside <SiteProvider>')
  return v
}
