import { useTranslation } from 'react-i18next'
import { Lightbulb, Brain, HeartHandshake } from 'lucide-react'
import { IconBadge, Photo, Reveal, Section } from './ui'

const ICONS = [Lightbulb, Brain, HeartHandshake]

export default function Activities() {
  const { t } = useTranslation()
  const items = t('activities.items', { returnObjects: true })

  return (
    <Section id="activities" eyebrow={t('activities.eyebrow')} title={t('activities.title')}>
      <Reveal className="mx-auto -mt-6 mb-10 max-w-2xl text-center text-lg text-slate-600 rtl:text-xl rtl:leading-loose">
        {t('activities.intro')}
      </Reveal>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-[16%] top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-accent-400/70 to-transparent md:block" aria-hidden="true" />
        <ol className="grid gap-5 md:grid-cols-3">
          {Array.isArray(items) &&
            items.map((text, i) => (
              <Reveal as="li" key={i} delay={i * 120} className="glass relative flex flex-col items-center rounded-3xl p-7 text-center">
                <IconBadge icon={ICONS[i % ICONS.length]} tone={i === 1 ? 'accent' : 'brand'} className="size-14" />
                <span className="mt-4 text-xs font-bold tracking-widest text-accent-600">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 text-lg font-medium text-brand-900 rtl:text-xl rtl:leading-loose">{text}</p>
              </Reveal>
            ))}
        </ol>
      </div>
      <Reveal as="figure" className="glass relative mt-8 rounded-[2rem] p-2">
        <Photo name="celebration" className="aspect-[4/3] w-full rounded-[1.6rem] object-[50%_25%] sm:aspect-[21/9]" />
        <figcaption className="absolute inset-x-2 bottom-2 rounded-b-[1.6rem] bg-gradient-to-t from-brand-950/85 via-brand-950/40 to-transparent px-6 pt-16 pb-5 text-lg font-semibold text-white sm:px-8 sm:text-xl">
          {t('activities.photoCaption')}
        </figcaption>
      </Reveal>
    </Section>
  )
}
