import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Attachment } from '@/types/chat.types'
import ImagePreview from './ImagePreview'
import DocPreview from './DocPreview'

interface Props {
  files: Attachment[]
  onRemove?: (id: string) => void
}

export default function FilePreview({ files, onRemove }: Props) {
  if (!files.length) return null
  return (
    <div className="flex gap-2 flex-wrap px-4 pt-2">
      {files.map((file) => (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative"
        >
          {file.type === 'image' ? <ImagePreview file={file} /> : <DocPreview file={file} />}
          {onRemove && (
            <button
              onClick={() => onRemove(file.id)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center"
            >
              <X size={10} className="text-[var(--text-secondary)]" />
            </button>
          )}
        </motion.div>
      ))}
    </div>
  )
}
