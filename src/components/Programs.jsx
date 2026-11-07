import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  Award,
  BookOpen,
  BookOpenCheck,
  GraduationCap,
  Library,
  MonitorSmartphone,
  School,
  ScrollText,
  Sparkles,
  SpellCheck,
} from 'lucide-react'
import { WHATSAPP_URL } from '../constants'
import { IconBadge, Reveal, Section } from './ui'

const STAGE_ICONS = [
  SpellCheck,
  BookOpen,
  BookOpenCheck,
  Sparkles,
  ScrollText,
  Award,
  Library,
  GraduationCap,
]

export default function Programs() {
  const { t } = useTranslation()
  const stages = t('programs.stages', { returnObjects: true })

  return (
    <Section id="programs" eyebrow={t('programs.eyebrow')} title={t('programs.title')}>
      <Reveal className="mx-auto -mt-4 mb-10 max-w-3xl text-center text-lg text-slate-600 rtl:text-xl rtl:leading-loose">
        {t('programs.intro')}
      </Reveal>

      {/* 8 Study Stages */}
      <div>
        <Reveal className="mb-6 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-start">
          <div>
            <h3 className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
              {t('programs.stagesTitle')}
            </h3>
            <p className="mt-1 text-sm text-slate-600 sm:text-base rtl:text-lg">
              {t('programs.stagesSubtitle')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              [School, t('hero.inPerson')],
              [MonitorSmartphone, t('hero.online')],
            ].map(([Icon, label]) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-600/15 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-xs rtl:text-sm"
              >
                <Icon className="size-3.5 text-accent-500" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.isArray(stages) &&
            stages.map((stage, i) => {
              const Icon = STAGE_ICONS[i % STAGE_ICONS.length]
              const isHighlighted = i === 5
              return (
                <Reveal
                  as="li"
                  key={i}
                  delay={i * 60}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl p-6 transition duration-300 hover:-translate-y-1 ${
                    isHighlighted
                      ? 'bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-[0_20px_45px_-18px_rgba(44,89,157,0.65)]'
                      : 'glass hover:border-accent-300 hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    {isHighlighted ? (
                      <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-white">
                        <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                    ) : (
                      <IconBadge icon={Icon} tone={i % 2 === 0 ? 'brand' : 'accent'} />
                    )}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide ${
                        isHighlighted
                          ? 'bg-accent-400 text-brand-950'
                          : 'bg-brand-600/10 text-brand-700'
                      }`}
                    >
                      {t('programs.stage')} {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h4
                    className={`font-display mt-5 text-xl font-bold ${
                      isHighlighted ? 'text-white' : 'text-brand-800'
                    }`}
                  >
                    {stage.title}
                  </h4>
                  {stage.subtitle && (
                    <p
                      className={`mt-1 text-xs font-semibold tracking-wide ${
                        isHighlighted ? 'text-accent-200' : 'text-accent-600'
                      }`}
                    >
                      {stage.subtitle}
                    </p>
                  )}
                  <p
                    className={`mt-3 text-sm leading-relaxed rtl:text-base rtl:leading-relaxed ${
                      isHighlighted ? 'text-white/85' : 'text-slate-600'
                    }`}
                  >
                    {stage.desc}
                  </p>
                </Reveal>
              )
            })}
        </ol>
      </div>

      <Reveal delay={150} className="mt-10 flex justify-center">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-7 py-4 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
        >
          {t('programs.cta')}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
            aria-hidden="true"
          />
        </a>
      </Reveal>
    </Section>
  )
}
