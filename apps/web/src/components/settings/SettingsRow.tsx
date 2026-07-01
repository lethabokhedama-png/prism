import type { ReactNode } from 'react'

interface Props {
  label: string
  desc?: string
  control: ReactNode
}

export default function SettingsRow({ label, desc, control }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <div className="min-w-0">
        <p className="text-[13.5px] font-medium text-[var(--text-primary)]">{label}</p>
        {desc && <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5 leading-relaxed">{desc}</p>}
      </div>
      <div className="flex-shrink-0">{control}</div>
    </div>
  )
}