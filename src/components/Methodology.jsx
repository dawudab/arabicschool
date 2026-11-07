import { useTranslation } from 'react-i18next'
import {
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Repeat,
  Scale,
  Sparkles,
} from 'lucide-react'
import { IconBadge, Reveal, Section } from './ui'

const SUBJECT_ICONS = [BookOpen, Scale, GraduationCap]

export default function Methodology() {
  const { t } = useTranslation()
  const categories = t('methodology.subjects.categories', { returnObjects: true })
  const methods = t('methodology.methods.items', { returnObjects: true })
  const evaluations = t('methodology.evaluation.items', { returnObjects: true })

  return (
    <Section id="methodology" eyebrow={t('methodology.eyebrow')} title={t('methodology.title')}>
      <Reveal className="mx-auto -mt-4 mb-10 max-w-3xl text-center text-lg text-slate-600 rtl:text-xl rtl:leading-loose">
        {t('methodology.intro')}
      </Reveal>

      {/* 1. Core Subjects (المواد الدراسية) */}
      <Reveal className="glass relative mb-8 overflow-hidden rounded-3xl p-7 sm:p-9">
        <div
          className="pointer-events-none absolute -top-24 -end-24 size-64 rounded-full bg-gradient-to-br from-brand-300/35 to-transparent blur-2xl"
          aria-hidden="true"
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <IconBadge icon={BookOpen} tone="brand" />
            <div>
              <h3 className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
                {t('methodology.subjects.title')}
              </h3>
              <p className="mt-1 text-sm text-slate-600 sm:text-base rtl:text-lg">
                {t('methodology.subjects.summary')}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-8 grid gap-5 lg:grid-cols-3">
          {Array.isArray(categories) &&
            categories.map((cat, i) => {
              const CatIcon = SUBJECT_ICONS[i % SUBJECT_ICONS.length]
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-brand-600/10 bg-white/75 p-6 shadow-xs transition hover:border-accent-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <CatIcon className="size-5" aria-hidden="true" />
                    </span>
                    <h4 className="font-display text-lg font-bold text-brand-800 sm:text-xl">
                      {cat.name}
                    </h4>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Array.isArray(cat.items) &&
                      cat.items.map((subj) => (
                        <span
                          key={subj}
                          className="inline-flex items-center gap-1.5 rounded-full border border-brand-600/15 bg-brand-50/70 px-3.5 py-1.5 text-xs font-semibold text-brand-800 rtl:text-sm"
                        >
                          <Sparkles className="size-3 text-accent-500" aria-hidden="true" />
                          {subj}
                        </span>
                      ))}
                  </div>
                </div>
              )
            })}
        </div>
      </Reveal>

      {/* 2. Teaching Methods & 3. Evaluation System */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Teaching Methods (النظام التعليمي والأساليب) */}
        <Reveal delay={100} className="glass relative flex flex-col overflow-hidden rounded-3xl p-7 sm:p-9">
          <div
            className="pointer-events-none absolute -bottom-20 -start-20 size-56 rounded-full bg-gradient-to-tr from-accent-300/30 to-transparent blur-2xl"
            aria-hidden="true"
          />
          <div className="relative flex items-center gap-4">
            <IconBadge icon={Repeat} tone="accent" />
            <h3 className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
              {t('methodology.methods.title')}
            </h3>
          </div>
          <p className="relative mt-4 text-base leading-relaxed text-slate-600 rtl:text-lg rtl:leading-loose">
            {t('methodology.methods.summary')}
          </p>

          <ul className="relative mt-6 space-y-3">
            {Array.isArray(methods) &&
              methods.map((method, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-brand-600/10 bg-white/70 px-4 py-3 text-brand-900 shadow-2xs rtl:text-lg"
                >
                  <CheckCircle2 className="size-5 shrink-0 text-accent-500" aria-hidden="true" />
                  <span className="font-medium">{method}</span>
                </li>
              ))}
          </ul>
        </Reveal>

        {/* Evaluation System (نظام التقييم) */}
        <Reveal delay={180} className="glass relative flex flex-col overflow-hidden rounded-3xl p-7 sm:p-9">
          <div
            className="pointer-events-none absolute -top-20 -end-20 size-56 rounded-full bg-gradient-to-bl from-brand-300/35 to-transparent blur-2xl"
            aria-hidden="true"
          />
          <div className="relative flex items-center gap-4">
            <IconBadge icon={ClipboardCheck} tone="brand" />
            <h3 className="font-display text-2xl font-bold text-brand-800 sm:text-3xl">
              {t('methodology.evaluation.title')}
            </h3>
          </div>
          <p className="relative mt-4 text-base leading-relaxed text-slate-600 rtl:text-lg rtl:leading-loose">
            {t('methodology.evaluation.summary')}
          </p>

          <ol className="relative mt-6 grid gap-3 sm:grid-cols-2">
            {Array.isArray(evaluations) &&
              evaluations.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-brand-600/10 bg-white/70 px-4 py-3.5 text-brand-900 shadow-2xs rtl:text-lg"
                >
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}
