import { useTranslation } from 'react-i18next'
import { ArrowUpRight, Phone } from 'lucide-react'
import { PHONE_DISPLAY, WHATSAPP_URL } from '../constants'
import { Reveal, WhatsAppIcon } from './ui'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <section id="contact" className="relative px-4 py-20 sm:px-6 sm:py-24">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 px-6 py-12 text-center shadow-[0_24px_60px_-20px_rgba(44,89,157,0.6)] sm:px-12 sm:py-16">
        <div className="bg-geometric-light pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-32 left-1/2 size-80 -translate-x-1/2 rounded-full bg-brand-300/40 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <span className="glass-dark mx-auto inline-flex size-16 items-center justify-center rounded-2xl text-whatsapp shadow-lg">
            <WhatsAppIcon className="size-8" />
          </span>
          <h2 className="font-display mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t('contact.title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85 rtl:text-xl rtl:leading-loose">{t('contact.desc')}</p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-whatsapp px-8 py-4 text-lg font-bold text-brand-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:brightness-105 sm:w-auto"
            >
              <WhatsAppIcon className="size-6" />
              {t('contact.cta')}
              <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 rtl:-scale-x-100" aria-hidden="true" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/80 transition hover:text-white">
              <Phone className="size-4 text-accent-300" aria-hidden="true" />
              <span>{t('contact.phoneLabel')}:</span>
              <bdi dir="ltr" className="font-semibold tracking-wide">{PHONE_DISPLAY}</bdi>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
