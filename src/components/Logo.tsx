/**
 * Edutopia wordmark: Emerald green emblem with lime & tangerine accents,
 * paired with a bold Space Grotesk logotype.
 * Strictly adheres to the Emerald × Tangerine × Lime palette (zero purple or blue).
 */
export function Logo({ light = false, size = 'md' }: { light?: boolean; size?: 'md' | 'lg' }) {
  const big = size === 'lg'
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg
        width={big ? 44 : 34}
        height={big ? 44 : 34}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Emerald Squircle */}
        <rect width="40" height="40" rx="12" fill="#087F5B" />
        {/* Subtle geometric inner glow */}
        <rect x="1" y="1" width="38" height="38" rx="11" stroke="#D9F269" strokeOpacity="0.25" strokeWidth="1.5" />
        {/* Modern "E" bars */}
        <path d="M12 12h16M12 20h11M12 28h16" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
        {/* Fresh Lime spark accent */}
        <circle cx="28.5" cy="20" r="3.2" fill="#D9F269" />
      </svg>
      <span
        className={`font-display font-bold tracking-[-0.04em] ${
          big ? 'text-[2.2rem]' : 'text-[1.45rem]'
        } ${light ? 'text-white' : 'text-charcoal'}`}
      >
        Edutopia<span className="text-tangerine">.</span>
      </span>
    </span>
  )
}
