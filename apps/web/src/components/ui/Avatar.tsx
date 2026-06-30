import { cn } from '@/lib/cn'

interface AvatarProps {
  name?: string
  src?: string | null
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-16 h-16 text-xl',
}

function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'
}

export default function Avatar({ name = '', src, size = 'md', className }: AvatarProps) {
  return (
    <div className={cn('rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-[var(--accent-purple)] text-white font-semibold select-none', sizes[size], className)}>
      {src
        ? <img src={src} alt={name} className="w-full h-full object-cover" />
        : <span>{initials(name)}</span>
      }
    </div>
  )
}
