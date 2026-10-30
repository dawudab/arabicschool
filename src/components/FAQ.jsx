import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, MessageCircleQuestion } from 'lucide-react'
import { WHATSAPP_URL } from '../constants'
import { IconBadge, Reveal, Section, WhatsAppIcon } from './ui'

function Item({ q, a, open, onToggle }) {
  const id = useId()
  return (
    <div className={`glass overflow-hidden rounded-2xl transition-colors ${open ? 'bg-white/80' : ''}`}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-start font-semibold text-brand-900 sm:px-6 sm:py-5 sm:text-lg rtl:text-lg rtl:sm:text-xl"
        >
          {q}
          <span className={`flex size-8 shrink-0 items-center justify-center rounded-full transition ${open ? 'rotate-180 bg-accent-400 text-brand-950' : 'bg-brand-600/10 text-brand-600'}`}>
            <ChevronDown className="size-4" aria-hidden="true" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="min-h-0">
          <p className="px-5 pb-5 leading-relaxed text-slate-600 sm:px-6 rtl:text-lg rtl:leading-loose" hidden={!open}>
            {a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true })
  const [open, setOpen] = useState(0)

  return (
    <Section id="faq" eyebrow={t('faq.eyebrow')} title={t('faq.title')}>
      <div className="grid items-start gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <Reveal className="glass rounded-3xl p-7 sm:p-8 lg:sticky lg:top-28">
          <IconBadge icon={MessageCircleQuestion} tone="accent" />
          <p className="mt-5 text-lg leading-relaxed text-slate-600 rtl:text-xl rtl:leading-loose">{t('faq.intro')}</p>
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
            <p className="font-display text-xl font-bold">{t('faq.ctaTitle')}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 font-semibold text-brand-950 transition hover:brightness-105"
            >
              <WhatsAppIcon />
              {t('faq.cta')}
            </a>
          </div>
        </Reveal>

        <Reveal delay={100} className="space-y-3">
          {Array.isArray(items) &&
            items.map((item, i) => (
              <Item key={i} q={item.q} a={item.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
        </Reveal>
      </div>
    </Section>
  )
}
