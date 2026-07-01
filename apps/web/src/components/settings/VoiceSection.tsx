import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import SettingsRow from './SettingsRow'
import Toggle from './Toggle'

const STT_PROVIDERS = ['Whisper (local)', 'Deepgram']
const TTS_PROVIDERS = ['ElevenLabs', 'Coqui (local)', 'System voice']

export default function VoiceSection() {
  const [autoPlay, setAutoPlay] = useState(false)
  const [stt, setStt] = useState(STT_PROVIDERS[0])
  const [tts, setTts] = useState(TTS_PROVIDERS[0])

  return (
    <div className="px-1 pb-1">
      <SettingsRow
        label="Speech to text"
        control={
          <PickerButton value={stt} options={STT_PROVIDERS} onChange={setStt} />
        }
      />
      <SettingsRow
        label="Text to speech"
        control={
          <PickerButton value={tts} options={TTS_PROVIDERS} onChange={setTts} />
        }
      />
      <SettingsRow
        label="Auto-play responses"
        desc="Speak AI replies automatically"
        control={<Toggle checked={autoPlay} onChange={setAutoPlay} />}
      />
    </div>
  )
}

function PickerButton({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  const cycle = () => {
    const idx = options.indexOf(value)
    onChange(options[(idx + 1) % options.length])
  }
  return (
    <button onClick={cycle} className="flex items-center gap-1 text-[12px] font-medium text-[var(--text-secondary)]">
      {value}
      <ChevronRight size={13} className="text-[var(--text-tertiary)]" />
    </button>
  )
}