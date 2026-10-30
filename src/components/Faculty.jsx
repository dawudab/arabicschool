import { useTranslation } from 'react-i18next'
import { BadgeCheck, CalendarDays, FileCheck2, MapPin, UserRound } from 'lucide-react'
import { NATIVE_NAME } from '../constants'
import { Logo, Reveal, Section } from './ui'

function DirectorCard() {
  const { t } = useTranslation()
  const facts = [
    [CalendarDays, t('hero.since')],
    [FileCheck2, t('footer.license')],
    [MapPin, t('about.location.value')],
  ]

  return (
    <Reveal className="glass relative flex flex-col overflow-hidden rounded-3xl p-7 sm:p-9">
      <div className="pointer-events-none absolute -top-24 -start-24 size-72 rounded-full bg-brand-300/30 blur-3xl" aria-hidden="true" />
      <div className="relative flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-6 sm:text-start">
        <div className="relative shrink-0">
          <div className="flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-800 p-1 shadow-lg shadow-brand-900/20">
            <div className="flex size-full items-center justify-center rounded-full bg-white">
              <UserRound className="size-14 text-brand-600" strokeWidth={1.25} aria-hidden="true" />
            </div>
          </div>
          <Logo className="absolute -end-1 -bottom-1 size-10 ring-4 ring-white" />
        </div>
        <div className="mt-5 sm:mt-0">
          <p className="text-sm font-semibold text-accent-600 rtl:text-base">{t('faculty.director.role')}</p>
          <h3 className="font-display mt-1 text-2xl font-bold text-brand-800 sm:text-3xl">{t('faculty.director.name')}</h3>
        </div>
      </div>
      <p className="relative mt-6 text-lg leading-relaxed text-slate-700 rtl:text-xl rtl:leading-loose">{t('faculty.director.bio')}</p>
      <ul className="relative mt-auto flex flex-wrap gap-2 pt-6">
        {facts.map(([Icon, label]) => (
          <li key={label} className="inline-flex items-center gap-2 rounded-full border border-brand-600/10 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-brand-800">
            <Icon className="size-4 text-accent-500" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

function KeyFigures() {
  const { t } = useTranslation()
  const figures = [
    ['95', t('achievements.stats.memorizers'), 'accent'],
    ['75', t('achievements.stats.graduates'), 'brand'],
    ['½', `${t('achievements.competition.highlight')} · ${t('achievements.competition.year')}`, 'brand'],
    ['2017', t('about.opened.label'), 'accent'],
  ]
  return (
    <Reveal delay={80} className="glass grid flex-1 grid-cols-2 gap-3 rounded-3xl p-4 sm:p-5">
      {figures.map(([value, label, tone]) => (
        <div key={label} className="flex flex-col justify-center rounded-2xl border border-brand-600/10 bg-white/70 p-4 text-center">
          <span className={`text-3xl font-extrabold sm:text-4xl ${tone === 'accent' ? 'text-gradient-accent' : 'text-gradient-brand'}`}>{value}</span>
          <span className="mt-1 text-xs leading-snug font-medium text-slate-600 sm:text-sm rtl:text-sm">{label}</span>
        </div>
      ))}
    </Reveal>
  )
}

function Attestation() {
  const { t, i18n } = useTranslation()
  const isAr = i18n.resolvedLanguage === 'ar'
  const f = (key) => t(`faculty.attestation.fields.${key}`)
  const rows = [
    [f('institution'), `${t('hero.title')} ${t('hero.titleSuffix')}`],
    [f('licenseNo'), t('about.license.number'), true],
    [f('licenseDate'), t('about.license.value'), true],
    [f('opened'), t('about.opened.value'), true],
    [f('location'), t('about.location.value')],
    [f('director'), t('about.director.value')],
  ]

  return (
    <Reveal delay={120} className="relative rounded-3xl bg-white p-2 shadow-[0_24px_60px_-24px_rgba(44,89,157,0.45)]">
      <div className="relative overflow-hidden rounded-[1.25rem] border-[3px] border-double border-brand-600/40 bg-gradient-to-b from-accent-50/60 to-white px-6 py-8 sm:px-10">
        <div className="bg-geometric pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />
        <span className="absolute top-4 end-4 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow">
          <BadgeCheck className="size-3.5 text-accent-300" aria-hidden="true" />
          {t('faculty.attestation.badge')}
        </span>

        <header className="relative text-center">
          {!isAr && (
            <p className="font-amiri text-sm text-slate-500" lang="ar" dir="rtl">الجمهورية الإسلامية الموريتانية</p>
          )}
          <p className="mt-0.5 text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase rtl:text-base rtl:tracking-normal">{t('faculty.attestation.country')}</p>
          <p className="mt-1 text-xs text-accent-600">{t('faculty.attestation.motto')}</p>
          <div className="mx-auto my-4 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-12 bg-brand-600/30" />
            <span className="size-2 rotate-45 bg-accent-400" />
            <span className="h-px w-12 bg-brand-600/30" />
          </div>
          <p className="font-display text-lg font-bold text-brand-800 sm:text-xl">{t('faculty.attestation.ministry')}</p>
          <p className="mt-1 text-sm text-slate-600">{t('faculty.attestation.directorate')}</p>
        </header>

        <div className="relative mt-7 text-center">
          <h3 className="font-display text-2xl font-bold text-gradient-brand sm:text-3xl">{t('faculty.attestation.title')}</h3>
          <p className="mt-1 text-xs font-semibold tracking-wider text-accent-600 uppercase rtl:tracking-normal rtl:text-sm">{t('faculty.attestation.subtitle')}</p>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-slate-700 rtl:text-lg rtl:leading-loose">{t('faculty.attestation.statement')}</p>
        </div>

        <dl className="relative mt-7 divide-y divide-dashed divide-brand-600/15 rounded-2xl border border-brand-600/10 bg-white/80">
          {rows.map(([label, value, ltr]) => (
            <div key={label} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <dt className="shrink-0 text-xs font-semibold text-slate-500 uppercase rtl:text-sm rtl:normal-case">{label}</dt>
              <dd className={`font-semibold text-brand-900 sm:text-end ${label === f('licenseNo') ? 'font-mono text-lg tracking-widest text-accent-600' : ''}`}>
                {ltr ? <bdi dir="ltr">{value}</bdi> : value}
              </dd>
            </div>
          ))}
        </dl>

        <footer className="relative mt-6 flex items-center gap-3 text-xs text-slate-500 rtl:text-sm">
          <Logo className="size-9 shrink-0" />
          <p>
            <span className="font-amiri font-bold text-brand-700" lang="ar">{NATIVE_NAME}</span>
            <span className="mx-1.5">·</span>
            {t('faculty.attestation.note')}
          </p>
        </footer>
      </div>
    </Reveal>
  )
}

export default function Faculty() {
  const { t } = useTranslation()
  return (
    <Section id="faculty" eyebrow={t('faculty.eyebrow')} title={t('faculty.title')}>
      <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col gap-6">
          <DirectorCard />
          <KeyFigures />
        </div>
        <Attestation />
      </div>
    </Section>
  )
}
