import type { MouseEvent } from 'react'

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

/** Smoothly scroll to a same-page section (honours reduced motion) and update the hash. */
export function scrollToId(id: string, opts: { focus?: boolean } = {}): void {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  try {
    history.replaceState(null, '', `#${id}`)
  } catch {
    /* sandboxed contexts may block history */
  }
  if (opts.focus) {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
}

export function scrollElementToCenter(el: Element): void {
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' })
}

/** Click handler for in-page anchor links. Keeps native href for no-JS and middle-click. */
export function onAnchorClick(e: MouseEvent<HTMLAnchorElement>, id: string, after?: () => void): void {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
  e.preventDefault()
  if (after) {
    // Let the caller close overlays / release scroll lock before scrolling.
    after()
    window.setTimeout(() => scrollToId(id, { focus: true }), 60)
  } else {
    scrollToId(id, { focus: true })
  }
}
