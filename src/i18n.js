import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from './locales/ar.json'
import en from './locales/en.json'
import fr from './locales/fr.json'

export const LANGUAGES = [
  { code: 'ar', label: 'العربية', short: 'ع', dir: 'rtl' },
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'fr', label: 'Français', short: 'FR', dir: 'ltr' },
]
const CODES = LANGUAGES.map((l) => l.code)
const DEFAULT_LANG = 'ar'
const STORAGE_KEY = 'mahdara-lang'

const pathLang = () => {
  const seg = window.location.pathname.split('/')[1]
  return CODES.includes(seg) ? seg : null
}

const storedLang = () => {
  const v = localStorage.getItem(STORAGE_KEY)
  return CODES.includes(v) ? v : null
}

const syncDocument = (lng) => {
  const html = document.documentElement
  html.lang = lng
  html.dir = i18n.dir(lng)
  document.title = i18n.t('meta.title')
  document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('meta.description'))
  localStorage.setItem(STORAGE_KEY, lng)
  if (pathLang() !== lng) {
    window.history.replaceState(null, '', `/${lng}${window.location.search}${window.location.hash}`)
  }
}

i18n.on('languageChanged', syncDocument)

i18n.use(initReactI18next).init({
  resources: { ar: { translation: ar }, en: { translation: en }, fr: { translation: fr } },
  lng: pathLang() ?? storedLang() ?? DEFAULT_LANG,
  supportedLngs: CODES,
  // French is wired up but not yet translated: fall back to English, everything else to Arabic.
  fallbackLng: { fr: ['en'], default: [DEFAULT_LANG] },
  interpolation: { escapeValue: false },
})

window.addEventListener('popstate', () => {
  const lng = pathLang()
  if (lng && lng !== i18n.language) i18n.changeLanguage(lng)
})

export default i18n
