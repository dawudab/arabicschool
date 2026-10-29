import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarDays, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { photo } from '../constants'
import { Photo, Reveal, Section } from './ui'

const ITEMS = [
  'studentsCertificates',
  'femaleGraduates',
  'teacherStudent',
  'ijazahRecipient',
  'youngHafiz',
  'teachersGraduates',
  'honorCertificate1',
  'nafiIjazah',
  'celebration',
  'honorCertificate2',
].map(photo)

// lg: 4-column mosaic — [0 0 1 2] [0 0 3 4] [5 5 6 7] [8 8 9 9]; mobile: 2 columns, first and last full width
const LAYOUT = [
  'col-span-2 lg:row-span-2',
  'aspect-square lg:aspect-auto',
  'aspect-square lg:aspect-auto',
  'aspect-square lg:aspect-auto',
  'aspect-square lg:aspect-auto',
  'aspect-square lg:col-span-2 lg:aspect-auto',
  'aspect-square lg:aspect-auto',
  'aspect-square lg:aspect-auto',
  'aspect-square lg:col-span-2 lg:aspect-auto',
  'col-span-2 aspect-[4/3] sm:aspect-[2/1] lg:aspect-auto',
]

function Lightbox({ index, onClose, onNavigate }) {
  const { t, i18n } = useTranslation()
  const closeRef = useRef(null)
  const isRtl = i18n.dir() === 'rtl'
  const total = ITEMS.length
  const current = ITEMS[index]

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(isRtl ? -1 : 1)
      if (e.key === 'ArrowLeft') onNavigate(isRtl ? 1 : -1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isRtl, onClose, onNavigate])

  const navBtn = 'absolute top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full glass-dark text-white transition hover:bg-white/25 sm:size-12'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('gallery.title')}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-950/90 p-4 backdrop-blur-sm sm:p-10"
      onClick={onClose}
    >
      <button ref={closeRef} type="button" onClick={onClose} aria-label={t('gallery.close')} className="glass-dark absolute top-4 end-4 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full text-white transition hover:bg-white/25">
        <X className="size-5" />
      </button>
      <button type="button" onClick={(e) => (e.stopPropagation(), onNavigate(-1))} aria-label={t('gallery.prev')} className={`${navBtn} start-3 sm:start-6`}>
        <ChevronLeft className="size-6 rtl:-scale-x-100" />
      </button>
      <button type="button" onClick={(e) => (e.stopPropagation(), onNavigate(1))} aria-label={t('gallery.next')} className={`${navBtn} end-3 sm:end-6`}>
        <ChevronRight className="size-6 rtl:-scale-x-100" />
      </button>

      <figure className="flex max-h-full w-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          key={current.src}
          src={current.src}
          alt={t(`photos.${current.key}`)}
          width="1024"
          height="768"
          className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl"
        />
        <figcaption className="mt-4 flex w-full items-center justify-between gap-4 text-white/90">
          <span className="text-base sm:text-lg">{t(`photos.${current.key}`)}</span>
          <span className="shrink-0 text-sm text-white/60 tabular-nums" dir="ltr">
            {index + 1} / {total}
          </span>
        </figcaption>
      </figure>
    </div>
  )
}

export default function Gallery() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const navigate = useCallback((step) => setOpen((i) => (i + step + ITEMS.length) % ITEMS.length), [])

  return (
    <Section id="gallery" eyebrow={t('gallery.eyebrow')} title={t('gallery.title')}>
      <Reveal className="-mt-6 mb-10 flex justify-center">
        <p className="glass inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl px-5 py-3 text-center text-brand-800 rtl:text-lg">
          <span>{t('gallery.desc')}</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-accent-600">
            <CalendarDays className="size-4" aria-hidden="true" />
            <bdi dir="ltr">{t('gallery.date')}</bdi>
          </span>
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[13rem] lg:grid-cols-4">
        {ITEMS.map((p, i) => (
          <Reveal key={p.key} delay={(i % 4) * 70} className={`glass group relative overflow-hidden rounded-3xl p-1.5 ${LAYOUT[i]}`}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${t('gallery.view')}: ${t(`photos.${p.key}`)}`}
              className="relative block size-full cursor-zoom-in overflow-hidden rounded-[1.25rem]"
            >
              <Photo name={p.key} className={`size-full object-[50%_20%] transition duration-700 group-hover:scale-105 ${i === 0 ? 'aspect-[4/3] lg:aspect-auto' : ''}`} />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-950/80 via-brand-950/10 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="flex w-full items-center justify-between gap-3 text-start text-sm font-medium text-white sm:text-base">
                  {t(`photos.${p.key}`)}
                  <Expand className="size-4 shrink-0" aria-hidden="true" />
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {open !== null && <Lightbox index={open} onClose={close} onNavigate={navigate} />}
    </Section>
  )
}
