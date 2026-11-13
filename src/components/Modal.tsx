import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap, useScrollLock } from '../lib/hooks'
import { EASE_OUT } from '../lib/motion'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  /** Optional media/header area rendered above title. */
  header?: ReactNode
  wide?: boolean
}

/** Accessible modal: focus trap, Escape, backdrop click, focus restore, inert page. */
export function Modal({ open, onClose, title, children, header, wide = false }: ModalProps) {
  const panel = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const shell = document.getElementById('app-shell')
    if (!shell) return
    if (open) shell.setAttribute('inert', '')
    else shell.removeAttribute('inert')
    return () => shell.removeAttribute('inert')
  }, [open])

  useFocusTrap(panel, open, onClose)
  useScrollLock(open)

  return createPortal(
    <AnimatePresence>
      {open ? (
        <m.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          <div
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-[3px]"
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            initial={reduced ? false : { opacity: 0, y: 44, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className={`relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[32px] bg-white shadow-[var(--shadow-float)] sm:rounded-[32px] border border-warm-grey ${
              wide ? 'max-w-4xl' : 'max-w-2xl'
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-warm-grey bg-white/90 text-charcoal shadow-sm backdrop-blur transition hover:bg-mint hover:text-emerald"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <div className="overflow-y-auto overscroll-contain">
              {header}
              <div className="p-6 sm:p-9">
                <h2 id="modal-title" className="pr-12 text-[clamp(1.6rem,3.4vw,2.2rem)] font-bold text-charcoal">
                  {title}
                </h2>
                {children}
              </div>
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
