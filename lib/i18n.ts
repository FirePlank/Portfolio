import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enCommon from '../public/locales/en/common.json';
import fiCommon from '../public/locales/fi/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  fi: {
    common: fiCommon,
  },
};

// Detect browser language, default to Finnish if Finnish, otherwise English
const getBrowserLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('fi') ? 'fi' : 'en';
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getBrowserLanguage(),
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    ns: ['common'],
    defaultNS: 'common',
  });

export default i18n;
