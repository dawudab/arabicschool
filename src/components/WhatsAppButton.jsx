import { useTranslation } from 'react-i18next'
import { WHATSAPP_URL } from '../constants'
import { WhatsAppIcon } from './ui'

export default function WhatsAppButton() {
  const { t } = useTranslation()
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp.label')}
      className="group fixed end-5 z-50 flex items-center gap-3 bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:end-8 sm:bottom-8"
    >
      <span className="glass-strong pointer-events-none hidden rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-brand-800 opacity-0 transition-all duration-300 group-hover:opacity-100 sm:block ltr:translate-x-2 rtl:-translate-x-2 group-hover:translate-x-0">
        {t('whatsapp.label')}
      </span>
      <span className="relative flex size-14 items-center justify-center sm:size-16">
        <span className="animate-ping-slow absolute inset-0 rounded-full bg-whatsapp/50" aria-hidden="true" />
        <span className="relative flex size-full items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-brand-900/30 ring-4 ring-white transition-transform group-hover:scale-105">
          <WhatsAppIcon className="size-7 sm:size-8" />
        </span>
      </span>
    </a>
  )
}
