import { useState } from 'react'
import { Lock } from 'lucide-react'
import SettingsRow from './SettingsRow'
import Toggle from './Toggle'
import Button from '@/components/ui/Button'

export default function SecuritySection() {
  const [biometric, setBiometric] = useState(false)
  const [showPwForm, setShowPwForm] = useState(false)

  return (
    <div className="px-1 pb-1">
      <SettingsRow
        label="Biometric lock"
        desc="Require fingerprint/face to open Prism"
        control={<Toggle checked={biometric} onChange={setBiometric} />}
      />

      <div className="mt-2">
        <Button variant="outline" size="sm" onClick={() => setShowPwForm((v) => !v)}>
          <Lock size={13} />
          Change password
        </Button>
      </div>

      {showPwForm && (
        <div className="mt-3 space-y-2">
          <input
            type="password"
            placeholder="Current password"
            className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[12px] px-3 py-2.5 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent-purple)]"
          />
          <input
            type="password"
            placeholder="New password"
            className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[12px] px-3 py-2.5 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent-purple)]"
          />
          <Button size="sm" fullWidth>Update password</Button>
        </div>
      )}
    </div>
  )
}