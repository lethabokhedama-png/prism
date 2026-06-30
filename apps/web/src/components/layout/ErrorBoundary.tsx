import React from 'react'
import { RefreshCw, AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'Something went wrong' }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('Prism render error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8 text-center bg-[var(--bg-primary)]">
          <div className="w-14 h-14 rounded-[20px] bg-red-500/10 flex items-center justify-center mb-4">
            <AlertTriangle size={24} className="text-red-400" />
          </div>
          <p className="text-[16px] font-semibold text-[var(--text-primary)] mb-1">Something broke</p>
          <p className="text-[13px] text-[var(--text-tertiary)] mb-5 max-w-[260px] leading-relaxed">
            {this.state.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[16px] bg-[var(--accent-purple)] text-white text-[14px] font-semibold"
          >
            <RefreshCw size={15} />
            Reload Prism
          </button>
        </div>
      )
    }
    return this.props.children
  }
}