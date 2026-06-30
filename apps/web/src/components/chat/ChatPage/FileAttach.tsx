import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Paperclip } from 'lucide-react'
import { springs } from '@/styles/motion'
import type { Attachment } from '@/types/chat.types'

interface Props {
  onFiles: (files: Attachment[]) => void
}

function uid() { return Math.random().toString(36).slice(2, 10) }

export default function FileAttach({ onFiles }: Props) {
  const ref = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const attachments: Attachment[] = files.map((f) => ({
      id: uid(),
      name: f.name,
      type: f.type.startsWith('image/') ? 'image'
          : f.type === 'application/pdf' ? 'pdf'
          : f.type === 'text/plain' ? 'text'
          : f.name.endsWith('.zip') ? 'zip'
          : 'other',
      url: URL.createObjectURL(f),
      size: f.size,
      mimeType: f.type,
    }))
    onFiles(attachments)
    e.target.value = ''
  }

  return (
    <>
      <input
        ref={ref}
        type="file"
        multiple
        accept="image/*,.pdf,.txt,.zip,.md,.json,.ts,.tsx,.py,.js"
        onChange={handleChange}
        className="hidden"
      />
      <motion.button
        whileTap={{ scale: 0.88, transition: springs.snappy }}
        onClick={() => ref.current?.click()}
        className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-tertiary)] hover:bg-white/6 transition-colors"
      >
        <Paperclip size={18} strokeWidth={1.8} />
      </motion.button>
    </>
  )
}
