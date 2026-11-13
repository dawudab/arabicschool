import { useTranslation } from 'react-i18next'
import { ArrowUpRight, CheckCircle2, XCircle } from 'lucide-react'
import { WHATSAPP_URL } from '../constants'
import { Section, WhatsAppIcon } from './ui'

const INCLUDED_KEYS = ['housing', 'wifi', 'kitchen', 'utilities', 'tuition', 'language']

export default function Pricing() {
  const { t } = useTranslation()

  return (
    <Section id="pricing" eyebrow={t('pricing.eyebrow')} title={t('pricing.title')}>
      <div className="reveal mx-auto max-w-3xl">
        <p className="-mt-4 mb-8 text-center text-lg text-slate-600 rtl:text-xl rtl:leading-loose">
          {t('pricing.subtitle')}
        </p>

        <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/40 p-7 shadow-[0_20px_50px_-18px_rgba(44,89,157,0.3)] backdrop-blur-md dark:bg-gray-900/40 sm:p-10">
          {/* Subtle decorative glows */}
          <div
            className="pointer-events-none absolute -top-24 -end-24 size-64 rounded-full bg-gradient-to-br from-accent-300/35 to-transparent blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -start-24 size-64 rounded-full bg-gradient-to-tr from-brand-300/35 to-transparent blur-2xl"
            aria-hidden="true"
          />

          {/* Price Header */}
          <div className="relative border-b border-brand-600/15 pb-8 text-center dark:border-white/15">
            <div className="flex flex-wrap items-baseline justify-center gap-2">
              <span
                className="font-display text-5xl font-extrabold tracking-tight text-gradient-brand dark:text-white sm:text-6xl"
                dir="ltr"
              >
                <bdi>{t('pricing.annual_price')}</bdi>
              </span>
              <span className="text-lg font-semibold text-accent-600 dark:text-accent-300 sm:text-xl">
                {t('pricing.annual_label')}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-200 sm:text-base rtl:text-lg">
              {t('pricing.monthly_breakdown')}
            </p>
          </div>

          {/* Included & Excluded Lists */}
          <div className="relative mt-8 grid gap-8 md:grid-cols-[1.35fr_1fr]">
            <div>
              <h3 className="font-display text-lg font-bold text-brand-800 dark:text-white sm:text-xl">
                {t('pricing.included_title')}
              </h3>
              <ul className="mt-4 space-y-3">
                {INCLUDED_KEYS.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 rounded-2xl border border-white/50 bg-white/55 px-4 py-3 text-brand-950 shadow-2xs dark:border-white/15 dark:bg-white/10 dark:text-slate-100 rtl:text-lg"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>{t(`pricing.included.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div>
                <h3 className="font-display text-lg font-bold text-brand-800 dark:text-white sm:text-xl">
                  {t('pricing.excluded_title')}
                </h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3 rounded-2xl border border-rose-200/70 bg-rose-50/75 px-4 py-3.5 text-rose-950 shadow-2xs dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-100 rtl:text-lg">
                    <XCircle
                      className="mt-0.5 size-5 shrink-0 text-rose-600 dark:text-rose-400"
                      aria-hidden="true"
                    />
                    <span>{t('pricing.excluded.food')}</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-brand-600/10 bg-white/55 p-5 text-center shadow-2xs dark:border-white/15 dark:bg-white/10">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-whatsapp px-6 py-4 text-base font-bold text-brand-950 shadow-lg shadow-whatsapp/25 transition hover:-translate-y-0.5 hover:brightness-105 sm:text-lg"
                >
                  <WhatsAppIcon className="size-6 shrink-0" />
                  <span>{t('pricing.cta')}</span>
                  <ArrowUpRight
                    className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
