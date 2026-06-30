import { cn } from '@/lib/cn'

interface PrismLogoProps {
  size?: number
  className?: string
  animate?: boolean
}

export default function PrismLogo({ size = 28, className, animate }: PrismLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(animate && 'transition-transform duration-300', className)}
    >
      <polygon
        points="16,2 30,28 2,28"
        fill="#000000"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="16" y1="2" x2="24" y2="28" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.9" />
      <line x1="16" y1="2" x2="20" y2="28" stroke="#3B82F6" strokeWidth="0.75" strokeOpacity="0.7" />
    </svg>
  )
}
