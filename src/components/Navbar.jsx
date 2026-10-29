import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe } from 'lucide-react'
import { LANGUAGES } from '../i18n'
import { NAV_ITEMS, WHATSAPP_URL, NATIVE_NAME, LATIN_NAME } from '../constants'
import { Logo, WhatsAppIcon } from './ui'

function LanguageSwitcher({ full = false }) {
  const { t, i18n } = useTranslation()
  return (
    <div role="group" aria-label={t('nav.language')} className="flex items-center gap-1 rounded-full border border-brand-600/15 bg-white/60 p-1">
      {!full && <Globe className="mx-1 size-4 text-brand-400" aria-hidden="true" />}
      {LANGUAGES.map((l) => {
        const active = i18n.resolvedLanguage === l.code
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            onClick={() => i18n.changeLanguage(l.code)}
            aria-pressed={active}
            title={l.label}
            className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${full ? 'flex-1 text-sm' : ''} ${
              active ? 'bg-brand-600 text-white shadow' : 'text-brand-900/70 hover:bg-brand-600/10 hover:text-brand-700'
            } ${l.code === 'ar' ? 'font-amiri text-sm' : ''}`}
          >
            {full ? l.label : l.short}
          </button>
        )
      })}
    </div>
  )
}

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isAr = i18n.resolvedLanguage === 'ar'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        className={`mx-auto max-w-6xl rounded-2xl transition-all duration-300 ${
          scrolled || open ? 'glass-strong' : 'border border-transparent'
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <a href="#home" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <Logo className="size-11 shrink-0" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="font-amiri truncate text-lg font-bold text-brand-700">{NATIVE_NAME}</span>
              {!isAr && <span className="truncate text-[11px] font-medium text-accent-600">{LATIN_NAME}</span>}
            </span>
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.map((key) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  className="rounded-full px-3 py-2 text-sm font-medium text-brand-900/75 transition-colors hover:bg-brand-600/10 hover:text-brand-700"
                >
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border border-brand-600/15 bg-white/60 text-brand-700 transition hover:bg-white xl:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 xl:hidden ${
            open ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="min-h-0">
            <ul className="flex flex-col gap-1 border-t border-brand-600/10 px-3 pt-3">
              {NAV_ITEMS.map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-brand-900/85 transition hover:bg-brand-600/5 hover:text-brand-700"
                  >
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 p-4">
              <LanguageSwitcher full />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 font-semibold text-brand-950"
              >
                <WhatsAppIcon />
                {t('hero.ctaPrimary')}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
