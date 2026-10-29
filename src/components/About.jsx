import { useTranslation } from 'react-i18next'
import { MapPin, CalendarDays, ScrollText, Landmark } from 'lucide-react'
import { IconBadge, Photo, Reveal, Section } from './ui'

export default function About() {
  const { t } = useTranslation()

  const cards = [
    { icon: MapPin, label: t('about.location.label'), value: t('about.location.value') },
    { icon: CalendarDays, label: t('about.opened.label'), value: t('about.opened.value'), ltr: true },
    {
      icon: ScrollText,
      label: t('about.license.label'),
      value: t('about.license.value'),
      ltr: true,
      extra: { label: t('about.license.numberLabel'), value: t('about.license.number') },
    },
    { icon: Landmark, label: t('about.authority.label'), value: t('about.authority.value') },
  ]

  return (
    <Section id="about" eyebrow={t('about.eyebrow')} title={t('about.title')}>
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
        <Reveal as="figure" className="glass relative rounded-[2rem] p-2 lg:sticky lg:top-28">
          <Photo name="teachersGraduates" className="aspect-[4/3] w-full rounded-[1.6rem] lg:aspect-[4/5] lg:object-[50%_20%]" />
          <figcaption className="glass-strong absolute inset-x-5 bottom-5 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-brand-800">
            <MapPin className="size-4 shrink-0 text-accent-500" aria-hidden="true" />
            {t('about.location.value')}
          </figcaption>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {cards.map((c, i) => (
            <Reveal
              key={c.label}
              delay={i * 80}
              className="glass group flex gap-5 rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/75"
            >
              <IconBadge icon={c.icon} tone={i % 2 ? 'accent' : 'brand'} />
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-accent-600">{c.label}</h3>
                <p className="mt-1.5 text-lg font-semibold text-brand-900 rtl:leading-relaxed">
                  {c.ltr ? <bdi dir="ltr">{c.value}</bdi> : c.value}
                </p>
                {c.extra && (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-accent-50 px-3 py-1 text-sm text-accent-700">
                    {c.extra.label}
                    <span className="font-mono font-bold tracking-wider">{c.extra.value}</span>
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
