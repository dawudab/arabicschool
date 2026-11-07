import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function AcademicProgress() {
  const { t, i18n } = useTranslation()
  const [activeLevel, setActiveLevel] = useState(0)
  const isRTL = i18n.dir() === 'rtl'

  const levels = [
    {
      id: 1,
      title: t('levels.1.title', 'Level 1'),
      hizbs: t('levels.1.hizbs', '10 - 20 Hizbs'),
      desc: t('levels.1.desc', 'Foundation and initial memorization.'),
    },
    {
      id: 2,
      title: t('levels.2.title', 'Level 2'),
      hizbs: t('levels.2.hizbs', '20 - 40 Hizbs'),
      desc: t('levels.2.desc', 'Intermediate memorization and revision.'),
    },
    {
      id: 3,
      title: t('levels.3.title', 'Level 3'),
      hizbs: t('levels.3.hizbs', '40 - 60 Hizbs'),
      desc: t('levels.3.desc', "Completion of the entire Holy Qur'an."),
    },
    {
      id: 4,
      title: t('levels.4.title', 'Ijazah & Texts'),
      hizbs: t('levels.4.hizbs', 'Ijazah Track'),
      desc: t('levels.4.desc', 'Mastery, connected chain, and classical texts.'),
    },
  ]

  return (
    <div className="reveal mx-auto w-full max-w-4xl px-4 py-8 sm:px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <h2 className="font-display mb-10 text-center text-3xl font-bold text-brand-800 sm:text-4xl">
        {t('academic_structure', 'Academic Structure')}
      </h2>

      {/* Progress Bar & Dots (forced dir="ltr" so line always fills left-to-right from 1 to 4) */}
      <div className="relative mb-12 flex items-center justify-between" dir="ltr">
        {/* Background Track */}
        <div className="absolute top-1/2 left-0 z-0 h-1.5 w-full -translate-y-1/2 rounded-full bg-brand-200/75" />

        {/* Active Track */}
        <div
          className="absolute top-1/2 left-0 z-0 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-brand-600 to-accent-400 transition-all duration-500 ease-in-out"
          style={{ width: `${(activeLevel / (levels.length - 1)) * 100}%` }}
        />

        {/* Level Dots */}
        {levels.map((level, index) => (
          <button
            key={level.id}
            type="button"
            onClick={() => setActiveLevel(index)}
            aria-pressed={activeLevel === index}
            className={`relative z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-bold shadow-md transition-all duration-300 ${
              activeLevel >= index
                ? 'scale-110 bg-brand-600 text-white shadow-brand-600/40 ring-4 ring-accent-300/40'
                : 'border border-brand-600/15 bg-white text-slate-600 hover:bg-brand-50'
            }`}
          >
            {level.id}
          </button>
        ))}
      </div>

      {/* Active Level Details (Glassmorphism Card) */}
      <div className="glass-strong min-h-[160px] rounded-2xl p-8 text-center shadow-xl transition-all duration-500">
        <h3 className="font-display mb-2 text-2xl font-bold text-brand-900 transition-opacity duration-300">
          {levels[activeLevel].title}
        </h3>
        <p className="mb-4 text-lg font-semibold text-accent-600">
          {levels[activeLevel].hizbs}
        </p>
        <p className="mx-auto max-w-2xl text-slate-600 rtl:text-lg rtl:leading-loose">
          {levels[activeLevel].desc}
        </p>
      </div>
    </div>
  )
}
