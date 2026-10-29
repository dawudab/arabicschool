import { useTranslation } from 'react-i18next'
import { MapPin } from 'lucide-react'
import { LATIN_NAME, NATIVE_NAME, NAV_ITEMS } from '../constants'
import { Logo } from './ui'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="relative bg-brand-950 px-4 pt-12 pb-28 text-white sm:px-6">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600 via-accent-400 to-brand-600" aria-hidden="true" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center lg:flex-row lg:items-start lg:justify-between lg:text-start">
        <div className="flex flex-col items-center gap-3 lg:items-start">
          <div className="flex items-center gap-3">
            <Logo className="size-14 ring-2 ring-white/20" />
            <div>
              <p className="font-amiri text-xl font-bold text-white" lang="ar">{NATIVE_NAME}</p>
              <p className="text-xs text-accent-300" lang="en">{LATIN_NAME}</p>
            </div>
          </div>
          <p className="inline-flex items-center gap-1.5 text-sm text-white/65">
            <MapPin className="size-4 text-accent-300" aria-hidden="true" />
            {t('about.location.value')}
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/75">
            {NAV_ITEMS.map((key) => (
              <li key={key}>
                <a href={`#${key}`} className="transition hover:text-accent-300">{t(`nav.${key}`)}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row">
        <p>© {new Date().getFullYear()} {t('hero.title')}. {t('footer.rights')}</p>
        <p>{t('footer.license')}</p>
      </div>
    </footer>
  )
}
