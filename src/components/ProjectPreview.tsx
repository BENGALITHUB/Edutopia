import type { ReactNode } from 'react'
import type { ProjectKind } from '../data/content'

/** Small illustrative UI mock for each course's showcase project (decorative). */
export function ProjectPreview({ kind }: { kind: ProjectKind }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-full min-h-[150px] w-full overflow-hidden rounded-2xl border border-warm-grey bg-white p-3.5 text-[0.72rem]"
    >
      {MOCK[kind]}
    </div>
  )
}

const bar = (w: string, c = 'bg-charcoal/10') => (
  <span className={`block h-1.5 rounded-full ${c}`} style={{ width: w }} />
)

const MOCK: Record<ProjectKind, ReactNode> = {
  chatbot: (
    <div className="flex h-full flex-col justify-end gap-1.5">
      <div className="w-[66%] rounded-[12px_12px_12px_3px] bg-mint px-2.5 py-1.5 text-charcoal font-medium">
        Hi! How do I build an AI agent?
      </div>
      <div className="ml-auto w-[62%] rounded-[12px_12px_3px_12px] bg-emerald px-2.5 py-1.5 text-white font-medium">
        Start with Python & LLM prompt chains!
      </div>
      <div className="w-[74%] space-y-1.5 rounded-[12px_12px_12px_3px] bg-mint px-2.5 py-2">
        {bar('92%', 'bg-emerald/30')}
        {bar('64%', 'bg-emerald/30')}
      </div>
      <div className="mt-1 flex items-center gap-2 rounded-full border border-warm-grey bg-ivory px-3 py-1.5 text-slate">
        <span>Type a prompt...</span>
        <span className="ml-auto h-3.5 w-3.5 rounded-full bg-emerald" />
      </div>
    </div>
  ),
  website: (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-tangerine" />
        <span className="h-2 w-2 rounded-full bg-lime" />
        <span className="h-2 w-2 rounded-full bg-emerald" />
        <span className="ml-2 h-2.5 flex-1 rounded-full bg-warm-grey-light" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5 rounded-xl bg-mint p-3">
        {bar('55%', 'bg-emerald')}
        {bar('80%', 'bg-charcoal/15')}
        <span className="mt-1 h-3.5 w-14 rounded-full bg-tangerine" />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-7 rounded-lg bg-warm-grey-light" />
        ))}
      </div>
    </div>
  ),
  campaign: (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between font-semibold text-charcoal">
        <span>Campaign Reach</span>
        <span className="rounded-full bg-emerald/15 px-2 py-0.5 text-xs font-bold text-emerald">Live · +340%</span>
      </div>
      <svg viewBox="0 0 200 70" className="w-full flex-1" preserveAspectRatio="none">
        <path
          d="M0 60 C 30 55, 45 40, 70 42 S 110 20, 135 24 S 175 8, 200 6 V 70 H 0 Z"
          fill="#FF8A3D"
          fillOpacity="0.15"
        />
        <path
          d="M0 60 C 30 55, 45 40, 70 42 S 110 20, 135 24 S 175 8, 200 6"
          fill="none"
          stroke="#FF8A3D"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="grid grid-cols-3 gap-1.5 text-center text-slate">
        {['SEO', 'Google Ads', 'Analytics'].map((t) => (
          <span key={t} className="rounded-lg bg-ivory py-1 font-medium border border-warm-grey/60">
            {t}
          </span>
        ))}
      </div>
    </div>
  ),
  prototype: (
    <div className="flex h-full items-center justify-center gap-3">
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`flex h-[130px] w-[70px] flex-col gap-1.5 rounded-[16px] border-2 border-charcoal bg-white p-1.5 shadow-sm ${
            i ? 'translate-y-2' : '-translate-y-2'
          }`}
        >
          <span className={`h-8 rounded-[8px] ${i ? 'bg-lime' : 'bg-mint'}`} />
          {bar('80%')}
          {bar('55%')}
          <span className="mt-auto h-3.5 rounded-full bg-emerald" />
        </div>
      ))}
      <svg viewBox="0 0 40 20" className="absolute left-1/2 top-1/2 w-8 -translate-x-1/2 -translate-y-1/2">
        <path
          d="M2 14 C 12 2, 28 2, 36 12 M36 12 l-6 -1 M36 12 l-1 -6"
          fill="none"
          stroke="#087F5B"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  ),
  dashboard: (
    <div className="flex h-full flex-col gap-2">
      <div className="grid grid-cols-3 gap-1.5">
        {['bg-mint', 'bg-ivory', 'bg-warm-grey-light'].map((c, idx) => (
          <div key={idx} className={`space-y-1 rounded-lg p-1.5 ${c} border border-warm-grey/50`}>
            {bar('60%', 'bg-charcoal/25')}
            {bar('35%', 'bg-emerald')}
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-end gap-1.5 rounded-xl bg-ivory p-2.5 border border-warm-grey/40">
        {[35, 60, 45, 82, 55, 95, 72].map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-sm transition-all duration-300 ${
              i === 5 ? 'bg-tangerine' : 'bg-emerald/75'
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  ),
}
