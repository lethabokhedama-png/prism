import { Download, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function DataControlsSection() {
  const exportData = () => {
    // wired to gateway export endpoint later
  }

  const deleteAccount = () => {
    if (confirm('This permanently deletes all conversations, keys, and settings. Continue?')) {
      // wired to gateway delete endpoint later
    }
  }

  return (
    <div className="px-1 pb-1 space-y-2">
      <Button variant="outline" size="sm" fullWidth onClick={exportData}>
        <Download size={13} />
        Export all data
      </Button>
      <Button variant="danger" size="sm" fullWidth onClick={deleteAccount}>
        <Trash2 size={13} />
        Delete account & all data
      </Button>
    </div>
  )
}