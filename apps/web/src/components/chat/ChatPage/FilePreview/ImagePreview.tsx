import type { Attachment } from '@/types/chat.types'

export default function ImagePreview({ file }: { file: Attachment }) {
  return (
    <div className="relative rounded-[14px] overflow-hidden ring-2 ring-[var(--outline-user)] w-20 h-20 flex-shrink-0">
      <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
    </div>
  )
}
