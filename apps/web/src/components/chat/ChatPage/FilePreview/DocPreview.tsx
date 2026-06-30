import { FileText, Archive, File } from 'lucide-react'
import type { Attachment } from '@/types/chat.types'

const icons = {
  pdf:   FileText,
  zip:   Archive,
  text:  FileText,
  other: File,
}

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`
}

export default function DocPreview({ file }: { file: Attachment }) {
  const Icon = icons[file.type as keyof typeof icons] ?? File
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-[14px] bg-[var(--bg-elevated)] ring-2 ring-[var(--outline-user)] max-w-[200px]">
      <Icon size={18} className="text-[var(--accent-blue)] flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-[var(--text-primary)] truncate">{file.name}</p>
        <p className="text-[10px] text-[var(--text-tertiary)]">{fmtSize(file.size)}</p>
      </div>
    </div>
  )
}
