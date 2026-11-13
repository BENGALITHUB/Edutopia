import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useId } from 'react'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../lib/motion'

interface AccordionItemProps {
  title: ReactNode
  open: boolean
  onToggle: () => void
  children: ReactNode
  /** Heading level wrapper for document outline. */
  as?: 'h3' | 'h4' | 'div'
  buttonClassName?: string
  compact?: boolean
}

/** Single controlled disclosure with smooth height animation and ARIA wiring. */
export function AccordionItem({
  title,
  open,
  onToggle,
  children,
  as: Tag = 'h3',
  buttonClassName = '',
  compact = false,
}: AccordionItemProps) {
  const id = useId()
  const reduced = useReducedMotion()
  return (
    <div>
      <Tag>
        <button
          type="button"
          id={`${id}-b`}
          aria-expanded={open}
          aria-controls={`${id}-p`}
          onClick={onToggle}
          className={`flex w-full items-center justify-between gap-5 text-left font-display font-semibold ${
            compact ? 'min-h-11 text-[0.98rem]' : 'min-h-16 py-5 text-[1.1rem] sm:text-[1.25rem]'
          } ${buttonClassName}`}
        >
          <span>{title}</span>
          <span
            aria-hidden="true"
            className={`flex shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              compact ? 'h-7 w-7' : 'h-10 w-10'
            } ${
              open
                ? 'rotate-45 border-emerald bg-emerald text-white shadow-sm'
                : 'border-warm-grey bg-white text-charcoal hover:border-emerald hover:text-emerald'
            }`}
          >
            <Plus size={compact ? 15 : 18} />
          </span>
        </button>
      </Tag>
      <AnimatePresence initial={false}>
        {open ? (
          <m.div
            id={`${id}-p`}
            role="region"
            aria-labelledby={`${id}-b`}
            className="overflow-hidden"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE_OUT }}
          >
            {children}
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
