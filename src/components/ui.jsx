import { useTranslation } from 'react-i18next'
import { useInView } from '../hooks'
import { NATIVE_NAME, photo } from '../constants'

export function Photo({ name, className = '', eager = false }) {
  const { t } = useTranslation()
  return (
    <img
      src={photo(name).src}
      alt={t(`photos.${name}`)}
      width="1024"
      height="768"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`object-cover ${className}`}
    />
  )
}

export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`relative px-4 py-20 sm:px-6 sm:py-24 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center sm:mb-16">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent-600 uppercase rtl:tracking-normal">
              <span className="h-px w-6 bg-accent-400/70" />
              {eyebrow}
              <span className="h-px w-6 bg-accent-400/70" />
            </span>
          )}
          <h2 className="font-display mt-3 text-3xl font-bold text-brand-800 sm:text-4xl lg:text-5xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

const TONES = {
  brand: 'border-brand-600/15 from-brand-100 to-white text-brand-600',
  accent: 'border-accent-400/30 from-accent-100 to-white text-accent-600',
}

export function IconBadge({ icon: Icon, tone = 'brand', className = '' }) {
  return (
    <span
      className={`inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border bg-white bg-gradient-to-br shadow-sm ${TONES[tone]} ${className}`}
    >
      <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
    </span>
  )
}

export function Logo({ className = 'size-10' }) {
  return (
    <img
      src="/logo-mark.png"
      alt={NATIVE_NAME}
      width="256"
      height="256"
      className={`rounded-full bg-white object-cover shadow-sm ${className}`}
    />
  )
}

export function WhatsAppIcon({ className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.53A11.32 11.32 0 0 0 12.05.63C5.77.63.66 5.74.66 12.02c0 2 .52 3.96 1.52 5.69L.57 23.6l6.04-1.58a11.37 11.37 0 0 0 5.44 1.38h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.34-8.05z" />
    </svg>
  )
}
