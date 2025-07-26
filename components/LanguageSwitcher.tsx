"use client";
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-2 text-white">
      <button
        onClick={() => toggleLanguage('en')}
        className={`hover:text-accent transition-all ${
          i18n.language === 'en' ? 'text-accent font-semibold' : ''
        }`}
      >
        EN
      </button>
      <span className="text-white/60">|</span>
      <button
        onClick={() => toggleLanguage('fi')}
        className={`hover:text-accent transition-all ${
          i18n.language === 'fi' ? 'text-accent font-semibold' : ''
        }`}
      >
        FI
      </button>
    </div>
  );
};

export default LanguageSwitcher;
