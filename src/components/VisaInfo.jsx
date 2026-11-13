import React from 'react';
import { useTranslation } from 'react-i18next';

export default function VisaInfo() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const requirements = [
    { key: 'passport', icon: '🛂' },
    { key: 'photo', icon: '📸' },
    { key: 'accommodation', icon: '🏫' },
    { key: 'ticket', icon: '✈️' },
  ];

  const steps = ['step1', 'step2', 'step3', 'step4'];

  return (
    <section id="visa" className="py-12 md:py-16 px-4 max-w-6xl mx-auto reveal" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-600/10 text-brand-700 border border-brand-600/20 mb-3">
          {t('visa.badge', 'International Student Travel')}
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-800 mb-3">
          {t('visa.title', 'Mauritania E-Visa & Entry Guide')}
        </h2>
        <p className="text-slate-600 text-base md:text-lg">
          {t('visa.subtitle', 'All international travelers require an official E-Visa prior to boarding their flight to Nouakchott.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Card: Required Documents & Mahdara Support (7 Cols) */}
        <div className="lg:col-span-7 glass-strong rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-brand-900 mb-2">
              {t('visa.requirements_title', 'What You Need to Apply')}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 mb-6">
              {t('visa.requirements_desc', 'Prepare these digital documents before starting your application on the official ANRPTS government portal:')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {requirements.map((req) => (
                <div 
                  key={req.key}
                  className="p-4 rounded-2xl bg-white/75 border border-brand-600/10 flex items-start gap-3"
                >
                  <span className="text-2xl shrink-0" aria-hidden="true">{req.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-brand-900 mb-1">
                      {t(`visa.req_${req.key}_title`)}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {t(`visa.req_${req.key}_desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* School Assistance Callout */}
          <div className="p-4 rounded-2xl bg-brand-600/10 border border-brand-600/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-brand-800 mb-1">
                {t('visa.support_title', 'Need an Official Enrollment & Address Letter?')}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {t('visa.support_desc', 'Once you confirm your study plan with us on WhatsApp, the Mahdara provides the official Toujounine address details and enrollment confirmation needed for your visa request and long-term residency.')}
              </p>
            </div>
            <a
              href="https://wa.me/22233313150"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow transition-all"
            >
              {t('visa.ask_whatsapp', 'Request Details')}
            </a>
          </div>
        </div>

        {/* Right Card: Step-by-Step Process & Official Link (5 Cols) */}
        <div className="lg:col-span-5 glass-strong rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-brand-900 mb-4">
              {t('visa.steps_title', 'Step-by-Step Application')}
            </h3>

            <div className="space-y-4 mb-6">
              {steps.map((stepKey, idx) => (
                <div key={stepKey} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-900">
                      {t(`visa.${stepKey}_title`)}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {t(`visa.${stepKey}_desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Airport Fee Note */}
            <div className="p-3.5 rounded-2xl bg-accent-50 border border-accent-400/40 mb-6 text-xs text-slate-700 leading-relaxed">
              <strong className="text-accent-700 block mb-0.5">
                <span aria-hidden="true">💡</span> {t('visa.fee_note_title', 'Important Arrival Note:')}
              </strong>
              {t('visa.fee_note_desc', 'Print a physical copy of your approved E-Visa before flying. Biometric processing and visa fee payment (~$60 USD / €55 EUR in crisp cash) are completed upon arrival at Nouakchott–Oumtounsy International Airport (NKC).')}
            </div>
          </div>

          {/* Official Portal CTA */}
          <a
            href="https://anrpts.gov.mr/visa/requestvisa"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-center shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>{t('visa.official_portal_cta', 'Apply on Official ANRPTS Portal')}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

      </div>
    </section>
  );
}
