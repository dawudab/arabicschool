import { useTranslation } from 'react-i18next'
import { BookMarked, GraduationCap, Quote, Star } from 'lucide-react'
import { IconBadge, Reveal, Section } from './ui'

// NOTE: the quotes in `testimonials.items` are placeholders — replace them with real, consented testimonials before launch.
export default function Testimonials() {
  const { t } = useTranslation()
  const items = t('testimonials.items', { returnObjects: true })
  const stats = [
    { icon: GraduationCap, value: '75+', label: t('testimonials.graduates'), tone: 'brand' },
    { icon: BookMarked, value: '95', label: t('testimonials.memorizers'), tone: 'accent' },
  ]

  return (
    <Section id="testimonials" eyebrow={t('testimonials.eyebrow')} title={t('testimonials.title')}>
      <Reveal className="-mt-6 mb-10 flex flex-col items-center gap-5">
        <p className="max-w-2xl text-center text-lg text-slate-600 rtl:text-xl rtl:leading-loose">{t('testimonials.intro')}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {stats.map((s) => (
            <div key={s.label} className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
              <IconBadge icon={s.icon} tone={s.tone} className="size-10" />
              <span className={`text-3xl font-extrabold ${s.tone === 'accent' ? 'text-gradient-accent' : 'text-gradient-brand'}`}>{s.value}</span>
              <span className="text-sm font-medium text-slate-600 rtl:text-base">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Swipeable carousel on mobile, grid from md upwards */}
      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0">
        {Array.isArray(items) &&
          items.map((item, i) => (
            <Reveal
              as="li"
              key={i}
              delay={(i % 2) * 100}
              className="glass relative flex w-[85%] shrink-0 snap-center flex-col rounded-3xl p-6 sm:p-7 md:w-auto"
            >
              <figure className="flex flex-1 flex-col">
              <Quote className="absolute top-6 end-6 size-10 text-brand-600/10 rtl:-scale-x-100" aria-hidden="true" />
              <div className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} className="size-4 fill-accent-400 text-accent-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-brand-900 rtl:text-xl rtl:leading-loose">
                <q>{item.quote}</q>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-600/10 pt-5">
                <span className={`flex size-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white ${i % 2 ? 'bg-gradient-to-br from-accent-400 to-accent-600' : 'bg-gradient-to-br from-brand-500 to-brand-700'}`} aria-hidden="true">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold text-brand-900">{item.name}</span>
                  <span className="block text-sm text-slate-500">{item.role}</span>
                </span>
              </figcaption>
              </figure>
            </Reveal>
          ))}
      </ul>
    </Section>
  )
}
