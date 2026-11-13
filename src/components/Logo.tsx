import logoImg from '../assets/edutopia-logo.jpg'

interface LogoProps {
  light?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'horizontal' | 'mark' | 'full'
  className?: string
}

/**
 * Official Edutopia Kolkata Logo
 * Renders the authentic graduation cap + E tech emblem and wordmark.
 */
export function Logo({
  light = false,
  size = 'md',
  variant = 'horizontal',
  className = '',
}: LogoProps) {
  const isLarge = size === 'lg'
  const isSmall = size === 'sm'

  if (variant === 'full') {
    return (
      <span className={`inline-flex items-center select-none ${className}`}>
        <img
          src={logoImg}
          alt="Edutopia Kolkata"
          className={`${
            isLarge ? 'h-20 sm:h-24' : isSmall ? 'h-12' : 'h-14 sm:h-16'
          } w-auto object-contain mix-blend-multiply`}
        />
      </span>
    )
  }

  if (variant === 'mark') {
    return (
      <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5 border border-warm-grey/80 shadow-2xs">
        <img
          src={logoImg}
          alt="Edutopia Emblem"
          className="h-[155%] w-[155%] max-w-none object-cover object-top mix-blend-multiply"
        />
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      {/* Official Emblem Frame */}
      <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5 border border-warm-grey/80 shadow-2xs transition-transform duration-300 group-hover:scale-105">
        <img
          src={logoImg}
          alt="Edutopia Emblem"
          className="h-[155%] w-[155%] max-w-none object-cover object-top mix-blend-multiply"
        />
      </span>

      {/* Logotype + Official Tagline */}
      <span className="flex flex-col">
        <span
          className={`font-display font-bold tracking-tight leading-none ${
            isLarge
              ? 'text-2xl sm:text-3xl'
              : isSmall
              ? 'text-lg'
              : 'text-[1.35rem] sm:text-[1.5rem]'
          } ${light ? 'text-white' : 'text-charcoal'}`}
        >
          Edutopia<span className="text-emerald">.</span>
        </span>
        <span
          className={`font-display text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-wider mt-0.5 ${
            light ? 'text-white/70' : 'text-slate'
          }`}
        >
          Upskill · Empower · Stay Relevant
        </span>
      </span>
    </span>
  )
}
