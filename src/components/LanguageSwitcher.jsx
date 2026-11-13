import { useTranslation } from 'react-i18next'
import { Check, Globe } from 'lucide-react'
import { LANGUAGES } from '../i18n'

export function LanguageSwitcher({ full = false, showLabel = true, className = '' }) {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language || i18n.resolvedLanguage

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={`inline-flex items-center gap-1 rounded-full border border-brand-600/20 bg-white/80 p-1 shadow-xs backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-1 ps-2 pe-1 text-brand-600">
        <Globe className="size-4 shrink-0" aria-hidden="true" />
        {showLabel && !full && (
          <span className="hidden text-xs font-semibold text-brand-700/80 md:inline">
            {t('nav.language')}:
          </span>
        )}
      </div>
      {LANGUAGES.map((l) => {
        const active = currentLang === l.code || currentLang?.startsWith(`${l.code}-`)
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            onClick={() => i18n.changeLanguage(l.code)}
            aria-pressed={active}
            title={l.label}
            className={`cursor-pointer rounded-full px-3 py-1.5 font-semibold transition-all select-none ${
              full ? 'flex-1 text-sm' : 'text-xs'
            } ${
              active
                ? 'bg-brand-600 text-white shadow-sm ring-2 ring-accent-400/40'
                : 'text-brand-900/75 hover:bg-brand-600/10 hover:text-brand-800'
            } ${l.code === 'ar' ? 'font-amiri text-sm' : ''}`}
          >
            {full ? l.label : (showLabel ? l.label : l.short)}
          </button>
        )
      })}
    </div>
  )
}

/**
 * Floating quick language switch pill visible on mobile and desktop
 * positioned at bottom-start (opposite to WhatsApp button at bottom-end).
 */
export function FloatingLanguagePill() {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language || i18n.resolvedLanguage

  return (
    <div
      className="fixed start-4 z-40 flex items-center bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:start-6 sm:bottom-6"
      role="region"
      aria-label={t('nav.language')}
    >
      <div className="glass-strong flex items-center gap-1 rounded-full p-1.5 shadow-lg ring-1 ring-brand-600/15">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <Globe className="size-4" aria-hidden="true" />
        </span>
        <div className="flex items-center gap-1">
          {LANGUAGES.map((l) => {
            const active = currentLang === l.code || currentLang?.startsWith(`${l.code}-`)
            return (
              <button
                key={l.code}
                type="button"
                lang={l.code}
                onClick={() => i18n.changeLanguage(l.code)}
                aria-pressed={active}
                title={l.label}
                className={`relative flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-brand-900/80 hover:bg-brand-600/10 hover:text-brand-800'
                } ${l.code === 'ar' ? 'font-amiri text-sm px-3' : ''}`}
              >
                {active && <Check className="size-3" aria-hidden="true" />}
                <span>{l.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
