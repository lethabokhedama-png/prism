import PrismLogo from '@/components/ui/PrismLogo'

export default function AboutSection() {
  return (
    <div className="px-1 pb-1">
      <div className="flex items-center gap-3 mb-3">
        <PrismLogo size={28} />
        <div>
          <p className="text-[14px] font-bold text-[var(--text-primary)]">Prism</p>
          <p className="text-[11px] text-[var(--text-tertiary)]">v0.1.0 · self-hosted</p>
        </div>
      </div>
      <div className="space-y-1.5">
        <AboutLine label="Build" value="0.4.2" />
        <AboutLine label="License" value="MIT" />
        <AboutLine label="Repository" value="github.com/lethabokhedama-png/prism" />
      </div>
    </div>
  )
}

function AboutLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-[var(--text-secondary)]">{label}</span>
      <span className="text-[11px] text-[var(--text-tertiary)] font-mono truncate max-w-[180px]">{value}</span>
    </div>
  )
}