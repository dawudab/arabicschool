import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, Calculator, Plane, HelpCircle, PhoneCall, ChevronRight } from 'lucide-react'
import { NAV_ITEMS, FOOTER_NAV, WHATSAPP_URL, NATIVE_NAME, LATIN_NAME } from '../constants'
import { Logo, WhatsAppIcon } from './ui'
import { LanguageSwitcher } from './LanguageSwitcher'

const UTILITY_LINKS = [
  { key: 'pricing', icon: Calculator, accent: 'bg-brand-600/10 text-brand-700 border-brand-600/20' },
  { key: 'visa', icon: Plane, accent: 'bg-accent-400/15 text-accent-600 border-accent-400/30' },
  { key: 'faq', icon: HelpCircle, accent: 'bg-brand-600/10 text-brand-700 border-brand-600/20' },
  { key: 'contact', icon: PhoneCall, accent: 'bg-brand-600/10 text-brand-700 border-brand-600/20' },
]

const SECTION_LINKS = FOOTER_NAV.filter(
  (key) => !['pricing', 'visa', 'faq', 'contact'].includes(key)
)

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const isAr = (i18n.language || i18n.resolvedLanguage) === 'ar'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointerDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  const handleSectionNavigate = (e, id) => {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', `#${id}`)
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.replaceState(null, '', '#home')
    }
  }

  return (
    <header className="sticky top-0 z-50 px-2.5 pt-2.5 sm:px-6 sm:pt-3">
      <nav
        ref={navRef}
        className={`mx-auto max-w-6xl rounded-2xl transition-all duration-200 ${
          scrolled || open ? 'glass-strong shadow-lg shadow-brand-950/10' : 'border border-transparent'
        }`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3">
          <a
            href="#home"
            onClick={(e) => handleSectionNavigate(e, 'home')}
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
          >
            <Logo className="size-10 shrink-0 sm:size-11" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="font-amiri truncate text-base font-bold text-brand-700 sm:text-lg">
                {NATIVE_NAME}
              </span>
              {!isAr && (
                <span className="truncate text-[11px] font-medium text-accent-600">
                  {LATIN_NAME}
                </span>
              )}
            </span>
          </a>

          {/* Primary desktop links */}
          <ul className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.filter((k) => !['faq', 'contact'].includes(k)).map((key) => (
              <li key={key}>
                <a
                  href={`#${key}`}
                  onClick={(e) => handleSectionNavigate(e, key)}
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-brand-900/75 transition-colors hover:bg-brand-600/10 hover:text-brand-700"
                >
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions: WhatsApp + Unified Menu Button */}
          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl bg-whatsapp px-3.5 py-2 text-sm font-semibold text-brand-950 shadow-xs transition hover:brightness-105 md:inline-flex"
            >
              <WhatsAppIcon className="size-4" />
              <span>{t('hero.ctaPrimary')}</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="unified-menu-drawer"
              aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition select-none sm:px-3.5 sm:py-2.5 ${
                open
                  ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                  : 'border-brand-600/15 bg-white/80 text-brand-800 hover:bg-white'
              }`}
            >
              {open ? <X className="size-4 shrink-0" /> : <Menu className="size-4 shrink-0" />}
              <span>{t('nav.menu', 'Menu')}</span>
            </button>
          </div>
        </div>

        {/* Unified Scrollable Menu Drawer for Desktop & Mobile */}
        {open && (
          <div
            id="unified-menu-drawer"
            className="max-h-[calc(100dvh-5.25rem)] overflow-y-auto overscroll-contain border-t border-brand-600/10 rounded-b-2xl"
          >
            {/* 1. Top Utility Bar: Language Switcher (Immediately accessible) */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-600/10 bg-brand-50/60 px-3.5 py-2.5 sm:px-5">
              <span className="text-xs font-bold tracking-wider text-brand-800/80 uppercase">
                {t('nav.select_language', t('nav.language', 'Language'))}
              </span>
              <LanguageSwitcher showLabel />
            </div>

            <div className="space-y-4 p-3.5 sm:space-y-5 sm:p-5">
              {/* 2. Highlighted Student Utilities: Pricing, E-Visa, FAQ, Contact */}
              <div>
                <p className="mb-2 text-[11px] font-bold tracking-wider text-brand-700/70 uppercase">
                  {t('nav.utilities', 'Admissions & Student Utilities')}
                </p>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                  {UTILITY_LINKS.map(({ key, icon: Icon, accent }) => (
                    <a
                      key={key}
                      href={`#${key}`}
                      onClick={(e) => handleSectionNavigate(e, key)}
                      className="group flex items-center justify-between gap-2 rounded-xl border border-brand-600/15 bg-white/85 p-2.5 transition hover:border-brand-600/35 hover:bg-white hover:shadow-xs sm:p-3"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-lg border ${accent}`}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="truncate text-xs font-bold text-brand-950 group-hover:text-brand-700 sm:text-sm">
                          {t(`nav.${key}`)}
                        </span>
                      </span>
                      <ChevronRight className="hidden size-4 shrink-0 text-brand-600/50 transition-transform group-hover:translate-x-0.5 sm:block rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* 3. All Site Sections Directory */}
              <div>
                <p className="mb-2 text-[11px] font-bold tracking-wider text-brand-700/70 uppercase">
                  {t('nav.allSections', 'Explore Sections')}
                </p>
                <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5">
                  {SECTION_LINKS.map((key) => (
                    <li key={key}>
                      <a
                        href={`#${key}`}
                        onClick={(e) => handleSectionNavigate(e, key)}
                        className="block truncate rounded-xl border border-brand-600/10 bg-white/50 px-3 py-2 text-xs font-semibold text-brand-900/85 transition hover:border-brand-600/25 hover:bg-white hover:text-brand-700 sm:text-sm"
                      >
                        {t(`nav.${key}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Mobile WhatsApp Quick Action */}
              <div className="pt-1 md:hidden">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-semibold text-brand-950 shadow-xs transition hover:brightness-105"
                >
                  <WhatsAppIcon className="size-4" />
                  <span>{t('hero.ctaPrimary')}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
