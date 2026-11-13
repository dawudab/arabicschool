import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', rate: 1, nameKey: 'usd', decimals: 0 },
  EUR: { symbol: '€', code: 'EUR', rate: 0.92, nameKey: 'eur', decimals: 0 },
  GBP: { symbol: '£', code: 'GBP', rate: 0.79, nameKey: 'gbp', decimals: 0 },
  MRU: { symbol: 'MRU', code: 'MRU', rate: 40, nameKey: 'mru', decimals: 0 },
  MRO: { symbol: 'MRO', code: 'MRO', rate: 400, nameKey: 'mro', decimals: 0 },
};

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const [currency, setCurrency] = useState('USD');
  const [months, setMonths] = useState(12);
  const [foodTier, setFoodTier] = useState('none'); // 'none', 'cooking', 'local'

  // Base monthly figures in USD ($1,625 / 12 = $135.4167)
  const baseMonthlyTuitionUSD = 1625 / 12;
  const foodCostsUSD = {
    none: 0,
    cooking: 75, // ~$75/mo using the free student kitchen
    local: 130,  // ~$130/mo eating at local Mauritanian spots
  };

  const currentCurrency = CURRENCIES[currency];

  const formatPrice = (usdAmount) => {
    const converted = usdAmount * currentCurrency.rate;
    const rounded = Math.round(converted);
    const formatted = rounded.toLocaleString('en-US');

    if (['USD', 'EUR', 'GBP'].includes(currency)) {
      return `${currentCurrency.symbol}${formatted}`;
    }
    return `${formatted} ${currentCurrency.symbol}`;
  };

  const tuitionTotalUSD = baseMonthlyTuitionUSD * months;
  const foodTotalUSD = foodCostsUSD[foodTier] * months;
  const grandTotalUSD = tuitionTotalUSD + foodTotalUSD;

  // Breakdown percentages for the visual bar
  const housingUtilitiesShare = Math.round(((tuitionTotalUSD * 0.45) / grandTotalUSD) * 100);
  const instructionShare = Math.round(((tuitionTotalUSD * 0.55) / grandTotalUSD) * 100);
  const foodShare = 100 - housingUtilitiesShare - instructionShare;

  const includedFeatures = [
    { key: 'housing', icon: '🏠' },
    { key: 'tuition', icon: '📖' },
    { key: 'language', icon: '🗣️' },
    { key: 'wifi', icon: '📶' },
    { key: 'kitchen', icon: '🍳' },
    { key: 'utilities', icon: '⚡' },
  ];

  return (
    <section id="pricing" className="py-12 md:py-16 px-4 max-w-6xl mx-auto reveal" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-600/10 text-brand-700 border border-brand-600/20 mb-3">
          {t('pricing.badge', 'Transparent Tuition & Living')}
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-800 mb-3">
          {t('pricing.title', 'Tuition & Accommodation Calculator')}
        </h2>
        <p className="text-slate-600 text-base md:text-lg">
          {t('pricing.subtitle', "Everything you need for an immersive, distraction-free Qur'anic journey in Mauritania.")}
        </p>
      </div>

      {/* Currency Switcher Bar */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
        <span className="text-xs font-medium text-slate-600 mx-2">
          {t('pricing.select_currency', 'Currency:')}
        </span>
        <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl glass border border-white/60">
          {Object.keys(CURRENCIES).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setCurrency(code)}
              className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 ${
                currency === code
                  ? 'bg-brand-600 text-white shadow-md scale-105'
                  : 'text-slate-600 hover:text-brand-800 hover:bg-brand-50/60'
              }`}
            >
              {t(`pricing.currencies.${CURRENCIES[code].nameKey}`, code)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Estimator Card (7 Cols) */}
        <div className="lg:col-span-7 glass-strong rounded-3xl p-6 md:p-8 shadow-xl">
          
          {/* Top Price Display Banner */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-6 border-b border-brand-600/15 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-accent-600 mb-1">
                {t('pricing.estimated_total', 'Estimated Total')} ({months}{' '}
                {months === 1 ? t('pricing.month', 'Month') : t('pricing.months', 'Months')})
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display text-4xl md:text-5xl font-extrabold text-brand-900 tracking-tight transition-all duration-300"
                  dir="ltr"
                >
                  <bdi>{formatPrice(grandTotalUSD)}</bdi>
                </span>
              </div>
            </div>
            <div className="sm:text-end bg-brand-600/10 border border-brand-600/20 px-4 py-2.5 rounded-2xl">
              <p className="text-xs text-slate-600">
                {t('pricing.monthly_average', 'Monthly Average')}
              </p>
              <p className="text-lg font-bold text-brand-700">
                <bdi dir="ltr">{formatPrice(grandTotalUSD / months)}</bdi>{' '}
                <span className="text-xs font-normal">/ {t('pricing.mo', 'mo')}</span>
              </p>
            </div>
          </div>

          {/* 1. Study Duration Slider */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
              <label htmlFor="duration-slider" className="text-sm font-bold text-brand-900">
                {t('pricing.duration_label', '1. Select Study Duration')}
              </label>
              <div className="flex gap-2">
                {[1, 3, 6, 12].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMonths(preset)}
                    className={`cursor-pointer px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                      months === preset
                        ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                        : 'bg-white/70 text-slate-600 border-brand-600/20 hover:border-brand-500 hover:text-brand-800'
                    }`}
                  >
                    {preset === 12 ? t('pricing.full_year', '1 Year') : `${preset}m`}
                  </button>
                ))}
              </div>
            </div>
            <input
              id="duration-slider"
              type="range"
              min="1"
              max="12"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full h-2 bg-brand-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>1 {t('pricing.month', 'Month')}</span>
              <span>6 {t('pricing.months', 'Months')}</span>
              <span>
                12 {t('pricing.months', 'Months')} ({t('pricing.standard', 'Standard')})
              </span>
            </div>
          </div>

          {/* 2. Optional Food Estimator (Since food is excluded from tuition) */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
              <span className="text-sm font-bold text-brand-900">
                {t('pricing.food_estimator_label', '2. Personal Food Budget Estimator (Optional)')}
              </span>
              <span className="text-xs text-accent-600 font-semibold">
                {t('pricing.not_in_tuition', '*Paid separately by student')}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'none', titleKey: 'food_none', descKey: 'food_none_desc', cost: 0 },
                { id: 'cooking', titleKey: 'food_cook', descKey: 'food_cook_desc', cost: 75 },
                { id: 'local', titleKey: 'food_local', descKey: 'food_local_desc', cost: 130 },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFoodTier(option.id)}
                  className={`cursor-pointer p-3.5 rounded-2xl border text-start transition-all flex flex-col justify-between ${
                    foodTier === option.id
                      ? 'bg-brand-600/10 border-brand-600 ring-2 ring-brand-600/25'
                      : 'bg-white/60 border-brand-600/15 hover:bg-white/85'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-bold text-xs md:text-sm text-brand-900">
                        {t(`pricing.${option.titleKey}`)}
                      </span>
                      <span className="text-xs font-extrabold text-accent-600">
                        {option.cost === 0
                          ? t('pricing.tuition_only', 'Base')
                          : `+${formatPrice(option.cost)}/${t('pricing.mo', 'mo')}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {t(`pricing.${option.descKey}`)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Visual Proportional Breakdown Bar */}
          <div className="bg-brand-50/70 p-4 rounded-2xl border border-brand-600/15">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
              {t('pricing.cost_allocation', 'Visual Cost Breakdown')}
            </p>
            
            {/* Stacked Bar */}
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-brand-100 mb-4" dir="ltr">
              <div
                style={{ width: `${instructionShare}%` }}
                className="bg-brand-600 transition-all duration-500"
                title={t('pricing.legend_tuition', 'Tuition & Bilingual Teachers')}
              />
              <div
                style={{ width: `${housingUtilitiesShare}%` }}
                className="bg-brand-400 transition-all duration-500"
                title={t('pricing.legend_housing', 'Housing, Wi-Fi & Utilities')}
              />
              {foodShare > 0 && (
                <div
                  style={{ width: `${foodShare}%` }}
                  className="bg-accent-400 transition-all duration-500"
                  title={t('pricing.legend_food', 'Est. Personal Food')}
                />
              )}
            </div>

            {/* Legend & Itemized Amounts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-600 shrink-0" />
                <div>
                  <p className="text-slate-600">{t('pricing.legend_tuition', 'Study & Teachers')}</p>
                  <p className="font-bold text-brand-900" dir="ltr">
                    <bdi>{formatPrice(tuitionTotalUSD * 0.55)}</bdi>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-400 shrink-0" />
                <div>
                  <p className="text-slate-600">{t('pricing.legend_housing', 'Housing & Utilities')}</p>
                  <p className="font-bold text-brand-900" dir="ltr">
                    <bdi>{formatPrice(tuitionTotalUSD * 0.45)}</bdi>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent-400 shrink-0" />
                <div>
                  <p className="text-slate-600">{t('pricing.legend_food', 'Est. Personal Food')}</p>
                  <p className="font-bold text-brand-900">
                    {foodTotalUSD > 0 ? (
                      <bdi dir="ltr">{formatPrice(foodTotalUSD)}</bdi>
                    ) : (
                      t('pricing.not_selected', 'Not Selected')
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: What's Included & Excluded (5 Cols) */}
        <div className="lg:col-span-5 glass-strong rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <h3 className="font-display text-xl font-bold text-brand-900">
                {t('pricing.included_title', 'Included in School Package')}
              </h3>
              <span className="text-xs font-bold text-brand-700 bg-brand-600/10 px-3 py-1 rounded-full" dir="ltr">
                <bdi>{formatPrice(tuitionTotalUSD)}</bdi>
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
              {includedFeatures.map((item) => (
                <div 
                  key={item.key}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/75 border border-brand-600/10"
                >
                  <span className="text-lg shrink-0 mt-0.5" aria-hidden="true">{item.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-brand-900">
                      {t(`pricing.included.${item.key}_title`)}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {t(`pricing.included.${item.key}_desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Excluded Box */}
            <div className="p-4 rounded-2xl bg-accent-50 border border-accent-400/40 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent-700 mb-1 flex items-center gap-1.5">
                <span aria-hidden="true">⚠️</span> {t('pricing.excluded_title', 'Not Included in Tuition')}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {t(
                  'pricing.excluded.food_detail',
                  "Daily meals and groceries are at the student's personal expense. However, full access to the equipped student kitchen is provided free of charge."
                )}
              </p>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/22233313150"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-center shadow-lg shadow-brand-600/25 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>{t('pricing.cta', 'Inquire & Register via WhatsApp')}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
