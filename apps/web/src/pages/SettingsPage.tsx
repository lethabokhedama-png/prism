import { motion } from 'framer-motion'
import {
  Sparkles,
  KeyRound,
  Palette,
  HardDrive,
  Mic2,
  ShieldCheck,
  DatabaseZap,
  Info,
  LogOut
} from 'lucide-react'
import { pageVariants } from '@/styles/motion'
import PageHeader from '@/components/layout/PageHeader'
import SettingsAccordion from '@/components/settings/SettingsAccordion'
import PersonalizationSection from '@/components/settings/PersonalizationSection'
import ApiKeysSection from '@/components/settings/ApiKeysSection'
import AppearanceSection from '@/components/settings/AppearanceSection'
import StorageSection from '@/components/settings/StorageSection'
import VoiceSection from '@/components/settings/VoiceSection'
import SecuritySection from '@/components/settings/SecuritySection'
import DataControlsSection from '@/components/settings/DataControlsSection'
import AboutSection from '@/components/settings/AboutSection'

export default function SettingsPage() {
  const logout = () => {
    if (confirm('Log out of Prism?')) {
      // wired to auth flow later
    }
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col h-full">
      <PageHeader title="Settings" showBack />

      <div className="flex-1 overflow-y-auto px-3 pb-8">
        <SettingsAccordion icon={Sparkles} title="Personalization" subtitle="Name, avatar, usage" defaultOpen>
          <PersonalizationSection />
        </SettingsAccordion>

        <SettingsAccordion icon={KeyRound} title="API Keys" subtitle="Providers & auto-detection">
          <ApiKeysSection />
        </SettingsAccordion>

        <SettingsAccordion icon={Palette} title="Appearance" subtitle="Theme, live stats">
          <AppearanceSection />
        </SettingsAccordion>

        <SettingsAccordion icon={HardDrive} title="Storage" subtitle="Where your data lives">
          <StorageSection />
        </SettingsAccordion>

        <SettingsAccordion icon={Mic2} title="Voice" subtitle="Speech in & out">
          <VoiceSection />
        </SettingsAccordion>

        <SettingsAccordion icon={ShieldCheck} title="Security & Login" subtitle="Lock & password">
          <SecuritySection />
        </SettingsAccordion>

        <SettingsAccordion icon={DatabaseZap} title="Data Controls" subtitle="Export or delete">
          <DataControlsSection />
        </SettingsAccordion>

        <SettingsAccordion icon={Info} title="About" subtitle="Version & license">
          <AboutSection />
        </SettingsAccordion>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 mt-4 py-3 rounded-[16px] text-red-400 text-[14px] font-semibold bg-red-500/8"
        >
          <LogOut size={15} />
          Log out
        </button>
      </div>
    </motion.div>
  )
}