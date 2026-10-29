import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, BadgeCheck, MonitorSmartphone, School, BookOpen } from 'lucide-react'
import { WHATSAPP_URL, NATIVE_NAME, LATIN_NAME } from '../constants'
import { Photo, Reveal, WhatsAppIcon } from './ui'

export default function Hero() {
  const { t, i18n } = useTranslation()
  const isAr = i18n.resolvedLanguage === 'ar'

  return (
    <section id="home" className="relative px-4 pt-12 pb-20 sm:px-6 sm:pt-20 lg:pt-24 lg:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div className="text-center lg:text-start">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-brand-700 sm:text-sm">
              <BadgeCheck className="size-4 text-accent-500" aria-hidden="true" />
              {t('hero.badge')}
            </span>
          </Reveal>

          <Reveal delay={100}>
            <p className={`mt-6 inline-block text-accent-600 ${isAr ? 'text-sm font-semibold tracking-wide' : 'font-amiri text-2xl sm:text-3xl'}`} lang={isAr ? 'en' : 'ar'} dir={isAr ? 'ltr' : 'rtl'}>
              {isAr ? LATIN_NAME : NATIVE_NAME}
            </p>
            <h1 className="font-display mt-3 text-4xl leading-tight font-bold text-brand-700 sm:text-5xl lg:text-6xl rtl:leading-snug">
              {t('hero.title')
                .split(' ')
                .map((word, i) => (
                  <Fragment key={i}>
                    {i > 0 && ' '}
                    <span className="whitespace-nowrap">{word}</span>
                  </Fragment>
                ))}
              <span className="mt-2 block text-2xl font-semibold text-ink sm:text-3xl lg:text-[2.1rem]">
                {t('hero.titleSuffix')}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 sm:text-xl lg:mx-0 rtl:leading-loose">
              {t('hero.subtitle')}
            </p>
          </Reveal>

          <Reveal delay={300} className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-br from-accent-300 to-accent-500 px-7 py-4 text-base font-bold text-brand-950 shadow-lg shadow-accent-500/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent-500/35"
            >
              <WhatsAppIcon className="size-5" />
              {t('hero.ctaPrimary')}
            </a>
            <a
              href="#contact"
              className="glass group inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-semibold text-brand-700 transition hover:bg-white/80"
            >
              {t('hero.ctaSecondary')}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={400} className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <Chip icon={School} label={t('hero.inPerson')} />
            <Chip icon={MonitorSmartphone} label={t('hero.online')} />
            <Chip icon={BookOpen} label={t('hero.since')} />
          </Reveal>
        </div>

        <Reveal delay={250} className="relative mx-auto w-full max-w-lg pb-10 sm:pb-12">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand-300/40 via-transparent to-accent-300/40 blur-2xl" aria-hidden="true" />
          <figure className="glass relative rounded-[2rem] p-2 sm:p-2.5 lg:rotate-1">
            <Photo name="studentsCertificates" eager className="aspect-[4/3] w-full rounded-[1.6rem]" />
          </figure>
          <figure className="glass absolute bottom-0 start-2 w-[42%] -rotate-3 rounded-2xl p-1.5 sm:start-0 lg:-start-8">
            <Photo name="femaleGraduates" eager className="aspect-square w-full rounded-xl object-top" />
          </figure>
          <StatBadge className="-top-4 end-2 sm:-end-4" value="95" label={t('achievements.stats.memorizers')} />
          <StatBadge className="end-2 bottom-2 sm:-end-4 sm:bottom-4" value="75" label={t('achievements.stats.graduates')} tone="brand" />
        </Reveal>
      </div>
    </section>
  )
}

function StatBadge({ value, label, tone = 'accent', className = '' }) {
  return (
    <div className={`glass-strong absolute flex items-center gap-3 rounded-2xl px-3.5 py-2.5 ${className}`}>
      <span className={`text-2xl font-extrabold sm:text-3xl ${tone === 'accent' ? 'text-gradient-accent' : 'text-gradient-brand'}`}>{value}</span>
      <span className="max-w-[7.5rem] text-xs leading-snug font-medium text-slate-600">{label}</span>
    </div>
  )
}

function Chip({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/10 bg-white/60 px-3.5 py-1.5 text-sm font-medium text-brand-800">
      <Icon className="size-4 text-accent-500" aria-hidden="true" />
      {label}
    </span>
  )
}
