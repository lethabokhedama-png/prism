import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import SettingsRow from './SettingsRow'
import Toggle from './Toggle'
import Button from '@/components/ui/Button'

export default function StorageSection() {
  const [localOnly, setLocalOnly] = useState(true)
  const [autoCleanup, setAutoCleanup] = useState(false)

  const clearCache = () => {
    if (confirm('Clear local cache? Conversations and settings are not affected.')) {
      // cache clear logic wired to gateway later
    }
  }

  return (
    <div className="px-1 pb-1">
      <div className="rounded-[14px] bg-[var(--bg-primary)] border border-[var(--border-subtle)] px-3 py-3 mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Currently stored</p>
        <div className="space-y-1.5">
          <StorageLine label="Conversations" value="LowDB · local" />
          <StorageLine label="Runtime metrics" value="SQLite · local" />
          <StorageLine label="Uploads & media" value="./data/uploads" />
          <StorageLine label="API keys" value="Encrypted · local" />
        </div>
      </div>

      <SettingsRow
        label="Local-only mode"
        desc="Never sync data outside this machine"
        control={<Toggle checked={localOnly} onChange={setLocalOnly} />}
      />
      <SettingsRow
        label="Auto cleanup"
        desc="Remove cache older than 30 days"
        control={<Toggle checked={autoCleanup} onChange={setAutoCleanup} />}
      />

      <Button variant="danger" size="sm" onClick={clearCache} className="mt-2">
        <Trash2 size={13} />
        Clear local cache
      </Button>
    </div>
  )
}

function StorageLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-[var(--text-secondary)]">{label}</span>
      <span className="text-[11px] text-[var(--text-tertiary)] font-mono">{value}</span>
    </div>
  )
}