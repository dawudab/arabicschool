import { useTranslation } from 'react-i18next'
import { Award, BookMarked, CalendarHeart, GraduationCap, Medal, Moon, ScrollText, Star, Users } from 'lucide-react'
import { useCountUp, useInView } from '../hooks'
import { IconBadge, Photo, Reveal, Section } from './ui'

const HONOR_PHOTOS = ['honorCertificate1', 'honorCertificate2', 'youngHafiz']

const PLACE_STYLES = [
  'from-accent-300 to-accent-500 text-brand-950',
  'from-brand-400 to-brand-600 text-white',
  'from-brand-200 to-brand-400 text-brand-950',
]
const PLACE_NUMBERS = [1, 3, 5]

function StatCard({ icon, tone, value, label, delay }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const count = useCountUp(value, inView)
  return (
    <Reveal delay={delay} className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <div ref={ref} className="flex items-center gap-5">
        <IconBadge icon={icon} tone={tone} className="size-14" />
        <div>
          <div className={`text-5xl font-extrabold tabular-nums sm:text-6xl ${tone === 'accent' ? 'text-gradient-accent' : 'text-gradient-brand'}`}>{count}</div>
          <div className="mt-1 text-base font-medium text-slate-600 sm:text-lg">{label}</div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Achievements() {
  const { t } = useTranslation()
  const winners = t('achievements.competition.winners', { returnObjects: true })
  const courses = t('achievements.courses.items', { returnObjects: true })
  const programs = t('achievements.programs.items', { returnObjects: true })

  return (
    <Section id="achievements" eyebrow={t('achievements.eyebrow')} title={t('achievements.title')}>
      <div className="grid gap-5 sm:grid-cols-2">
        <StatCard icon={BookMarked} tone="accent" value={95} label={t('achievements.stats.memorizers')} delay={0} />
        <StatCard icon={GraduationCap} tone="brand" value={75} label={t('achievements.stats.graduates')} delay={100} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-5">
        <Reveal className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-3">
          <div className="pointer-events-none absolute -top-20 -start-20 size-60 rounded-full bg-accent-300/30 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent-400 px-3 py-1 text-sm font-bold text-brand-950">{t('achievements.competition.year')}</span>
            <span className="rounded-full border border-brand-600/15 bg-white/70 px-3 py-1 text-sm text-brand-700">
              {t('achievements.competition.division')}
            </span>
          </div>
          <h3 className="font-display relative mt-5 flex items-center gap-3 text-2xl font-bold text-brand-800 sm:text-3xl">
            <Award className="size-7 shrink-0 text-accent-500" aria-hidden="true" />
            {t('achievements.competition.title')}
          </h3>
          <p className="relative mt-3 text-slate-600 rtl:text-lg rtl:leading-loose">{t('achievements.competition.desc')}</p>
          <div className="relative mt-5 inline-flex items-center gap-2 rounded-2xl border border-accent-400/40 bg-accent-50 px-4 py-2.5 text-accent-700">
            <Users className="size-5" aria-hidden="true" />
            <span className="font-semibold">{t('achievements.competition.highlight')}</span>
            <span className="text-2xl font-extrabold text-accent-600">½</span>
          </div>

          <ol className="relative mt-7 space-y-4 border-s border-dashed border-brand-600/25 ps-6">
            {Array.isArray(winners) &&
              winners.map((w, i) => (
                <li key={i} className="relative">
                  <span
                    className={`absolute top-1/2 -start-[2.55rem] flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br text-sm font-extrabold shadow-md ring-4 ring-white ${PLACE_STYLES[i]}`}
                    aria-hidden="true"
                  >
                    {PLACE_NUMBERS[i]}
                  </span>
                  <div className="flex flex-col gap-1 rounded-2xl border border-brand-600/10 bg-white/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-semibold text-brand-900 rtl:text-lg">{w.name}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-600">
                      <Medal className="size-4" aria-hidden="true" />
                      {w.place}
                    </span>
                  </div>
                </li>
              ))}
          </ol>
        </Reveal>

        <div className="flex flex-col gap-5 lg:col-span-2">
          <Reveal delay={100} className="glass rounded-3xl p-6 sm:p-7">
            <div className="flex items-center gap-4">
              <IconBadge icon={BookMarked} />
              <div>
                <h3 className="font-display text-xl font-bold text-brand-800">{t('achievements.courses.title')}</h3>
                <p className="text-sm text-slate-500">{t('achievements.courses.desc')}</p>
              </div>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {Array.isArray(courses) &&
                courses.map((c) => (
                  <li key={c} className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-4 py-2 font-medium text-brand-800 rtl:text-lg">
                    <Star className="size-3.5 fill-accent-400 text-accent-400" aria-hidden="true" />
                    {c}
                  </li>
                ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="glass flex-1 rounded-3xl p-6 sm:p-7">
            <h3 className="font-display text-xl font-bold text-brand-800">{t('achievements.programs.title')}</h3>
            <ul className="mt-5 space-y-3">
              {Array.isArray(programs) &&
                programs.map((p, i) => (
                  <li key={i} className="flex gap-4 rounded-2xl border border-brand-600/10 bg-white/70 p-4">
                    <IconBadge icon={i === 0 ? Moon : CalendarHeart} tone={i === 0 ? 'accent' : 'brand'} className="size-11" />
                    <div className="min-w-0">
                      <p className="font-semibold text-brand-900 rtl:text-lg">{p.name}</p>
                      <q className="mt-1 block text-sm text-accent-700 italic rtl:not-italic rtl:text-base">{p.tagline}</q>
                    </div>
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <Reveal className="glass mt-5 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <IconBadge icon={ScrollText} tone="accent" />
          <div>
            <h3 className="font-display text-xl font-bold text-brand-800 sm:text-2xl">{t('achievements.honors.title')}</h3>
            <p className="text-sm text-slate-500 rtl:text-base">{t('achievements.honors.desc')}</p>
          </div>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {HONOR_PHOTOS.map((name) => (
            <li key={name}>
              <figure>
                <div className="overflow-hidden rounded-2xl ring-4 ring-white/80 shadow-md">
                  <Photo name={name} className="aspect-[4/3] w-full object-[50%_20%] transition duration-700 hover:scale-105" />
                </div>
                <figcaption className="mt-3 text-sm text-slate-600 rtl:text-base">{t(`photos.${name}`)}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
