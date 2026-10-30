import { useTranslation } from 'react-i18next'
import { ArrowRight, BookOpenCheck, CheckCircle2, MonitorSmartphone, School, ScrollText, SpellCheck, Users } from 'lucide-react'
import { WHATSAPP_URL } from '../constants'
import { IconBadge, Reveal, Section } from './ui'

const ICONS = [SpellCheck, BookOpenCheck, ScrollText]
const TONES = ['brand', 'accent', 'brand']

export default function Programs() {
  const { t } = useTranslation()
  const items = t('programs.items', { returnObjects: true })

  return (
    <Section id="programs" eyebrow={t('programs.eyebrow')} title={t('programs.title')}>
      <Reveal className="mx-auto -mt-6 mb-12 max-w-2xl text-center text-lg text-slate-600 rtl:text-xl rtl:leading-loose">
        {t('programs.intro')}
      </Reveal>

      <ol className="grid gap-6 lg:grid-cols-3">
        {Array.isArray(items) &&
          items.map((p, i) => {
            const featured = i === 1
            return (
              <Reveal
                as="li"
                key={i}
                delay={i * 100}
                className={`relative flex flex-col rounded-3xl p-7 transition duration-300 hover:-translate-y-1 sm:p-8 ${
                  featured
                    ? 'bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-[0_24px_50px_-20px_rgba(44,89,157,0.7)]'
                    : 'glass hover:bg-white/75'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  {featured ? (
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/25 bg-white/15 text-white">
                      <BookOpenCheck className="size-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  ) : (
                    <IconBadge icon={ICONS[i]} tone={TONES[i]} />
                  )}
                  <span className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide ${featured ? 'bg-accent-400 text-brand-950' : 'bg-brand-600/10 text-brand-700'}`}>
                    {t('programs.stage')} {i + 1}
                  </span>
                </div>

                <h3 className={`font-display mt-6 text-2xl font-bold ${featured ? 'text-white' : 'text-brand-800'}`}>{p.title}</h3>
                <p className={`mt-1 text-sm font-semibold rtl:text-base ${featured ? 'text-accent-300' : 'text-accent-600'}`}>{p.subtitle}</p>
                <p className={`mt-4 leading-relaxed rtl:text-lg rtl:leading-loose ${featured ? 'text-white/85' : 'text-slate-600'}`}>{p.desc}</p>

                <ul className="mt-6 space-y-3">
                  {p.points.map((point) => (
                    <li key={point} className={`flex items-start gap-3 rtl:text-lg ${featured ? 'text-white' : 'text-brand-900'}`}>
                      <CheckCircle2 className={`mt-0.5 size-5 shrink-0 ${featured ? 'text-accent-300' : 'text-accent-500'}`} aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <div className={`flex flex-wrap gap-2 border-t pt-5 text-xs font-medium ${featured ? 'border-white/15' : 'border-brand-600/10'}`}>
                    {[
                      [Users, `${t('programs.levelLabel')} ${p.level}`],
                      [School, t('hero.inPerson')],
                      [MonitorSmartphone, t('hero.online')],
                    ].map(([Icon, label]) => (
                      <span key={label} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 rtl:text-sm ${featured ? 'bg-white/10 text-white' : 'bg-brand-50 text-brand-700'}`}>
                        <Icon className="size-3.5" aria-hidden="true" />
                        {label}
                      </span>
                    ))}
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition ${
                      featured ? 'bg-white text-brand-700 hover:bg-accent-50' : 'border border-brand-600/15 bg-white/70 text-brand-700 hover:bg-white'
                    }`}
                  >
                    {t('programs.cta')}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </Reveal>
            )
          })}
      </ol>
    </Section>
  )
}
