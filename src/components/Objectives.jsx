import { useTranslation } from 'react-i18next'
import { BookOpenCheck, ListChecks, SpellCheck, Sparkles, Trophy } from 'lucide-react'
import { IconBadge, Photo, Reveal, Section } from './ui'

const ICONS = [BookOpenCheck, ListChecks, SpellCheck, Sparkles, Trophy]

export default function Objectives() {
  const { t } = useTranslation()
  const items = t('objectives.items', { returnObjects: true })

  return (
    <Section id="objectives" eyebrow={t('objectives.eyebrow')} title={t('objectives.title')}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(items) &&
          items.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              className={`glass group relative flex flex-col overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-1 hover:border-accent-300 hover:bg-white/75 ${
                i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <span className={`pointer-events-none absolute top-4 end-6 text-6xl font-extrabold text-brand-600/[0.08] transition-colors group-hover:text-accent-400/30 ${i === 0 ? 'sm:hidden' : ''}`} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className={i === 0 ? 'grid items-center gap-6 sm:grid-cols-[1fr_1.1fr]' : ''}>
                <div>
                  <IconBadge icon={ICONS[i % ICONS.length]} tone={i % 2 ? 'accent' : 'brand'} />
                  <h3 className="font-display mt-5 text-xl font-bold text-brand-800 sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600 rtl:text-lg rtl:leading-loose">{item.desc}</p>
                </div>
                {i === 0 && (
                  <Photo name="nafiIjazah" className="aspect-[4/3] w-full rounded-2xl object-[50%_20%] shadow-md ring-4 ring-white/80" />
                )}
              </div>
            </Reveal>
          ))}
      </div>
    </Section>
  )
}
