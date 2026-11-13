import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { NAV_ITEMS, WHATSAPP_URL, NATIVE_NAME, LATIN_NAME } from '../constants'
import { Logo, WhatsAppIcon } from './ui'
import { LanguageSwitcher } from './LanguageSwitcher'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isAr = (i18n.language || i18n.resolvedLanguage) === 'ar'

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
            <LanguageSwitcher showLabel={true} />
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
