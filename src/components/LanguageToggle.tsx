import { useLanguage } from '../i18n/LanguageContext'
import type { Locale } from '../i18n/translations'

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div className="lang-toggle" role="group" aria-label={t.langToggleAria}>
      {(['de', 'en'] as Locale[]).map((code) => (
        <button
          key={code}
          type="button"
          className={locale === code ? 'on' : ''}
          aria-pressed={locale === code}
          onClick={() => setLocale(code)}
        >
          {code === 'de' ? t.langDe : t.langEn}
        </button>
      ))}
    </div>
  )
}
