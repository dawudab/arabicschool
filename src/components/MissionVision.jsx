import { useTranslation } from 'react-i18next'
import { Target, Eye } from 'lucide-react'
import { IconBadge, Photo, Reveal, Section } from './ui'

export default function MissionVision() {
  const { t } = useTranslation()
  const items = [
    { icon: Target, tone: 'accent', label: t('mission.missionLabel'), text: t('mission.missionText'), glow: 'from-accent-300/40' },
    { icon: Eye, tone: 'brand', label: t('mission.visionLabel'), text: t('mission.visionText'), glow: 'from-brand-300/40' },
  ]

  const card = (item, i) => (
    <Reveal key={item.label} delay={i * 120} className="glass relative overflow-hidden rounded-3xl p-7 sm:p-9">
      <div className={`pointer-events-none absolute -top-24 -end-24 size-64 rounded-full bg-gradient-to-br ${item.glow} to-transparent blur-2xl`} aria-hidden="true" />
      <span className="font-amiri pointer-events-none absolute -bottom-10 end-6 text-[10rem] leading-none text-brand-600/[0.07] select-none" aria-hidden="true">
        ”
      </span>
      <div className="relative flex items-center gap-4">
        <IconBadge icon={item.icon} tone={item.tone} />
        <h3 className="font-display text-2xl font-bold text-gradient-brand sm:text-3xl">{item.label}</h3>
      </div>
      <p className="relative mt-6 text-lg leading-relaxed text-slate-700 sm:text-xl rtl:text-[1.35rem] rtl:leading-loose">{item.text}</p>
    </Reveal>
  )

  return (
    <Section id="mission" eyebrow={t('mission.eyebrow')} title={t('mission.title')}>
      <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_0.8fr_1fr]">
        {card(items[0], 0)}
        <Reveal as="figure" delay={60} className="glass rounded-3xl p-2">
          <Photo name="teacherStudent" className="aspect-[4/3] size-full rounded-[1.25rem] object-[50%_25%] lg:aspect-auto" />
        </Reveal>
        {card(items[1], 1)}
      </div>
    </Section>
  )
}
