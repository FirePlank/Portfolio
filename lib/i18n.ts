import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../public/locales/en/common.json";
import fiCommon from "../public/locales/fi/common.json";

const resources = {
  en: {
    common: enCommon,
  },
  fi: {
    common: fiCommon,
  },
} as const;

export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "fi"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const normalizeLanguage = (value: string | null | undefined): SupportedLanguage => {
  if (!value) {
    return DEFAULT_LANGUAGE;
  }

  return value.toLowerCase().startsWith("fi") ? "fi" : "en";
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    ns: ["common"],
    defaultNS: "common",
  });
}

export default i18n;
