"use client";
import { useEffect } from "react";

import i18n, { DEFAULT_LANGUAGE, normalizeLanguage } from "../lib/i18n";

interface I18nProviderProps {
  children: React.ReactNode;
}

const LANGUAGE_STORAGE_KEY = "portfolio-language";

const I18nProvider = ({ children }: I18nProviderProps) => {
  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const detectedLanguage = normalizeLanguage(storedLanguage ?? window.navigator.language);

    if (i18n.language !== detectedLanguage) {
      void i18n.changeLanguage(detectedLanguage);
    }

    if (!storedLanguage) {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, detectedLanguage);
    }
  }, []);

  useEffect(() => {
    if (i18n.language) {
      document.documentElement.lang = normalizeLanguage(i18n.language);
    } else {
      document.documentElement.lang = DEFAULT_LANGUAGE;
    }
  }, []);

  return <>{children}</>;
};

export default I18nProvider;
