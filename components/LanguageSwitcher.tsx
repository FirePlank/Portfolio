"use client";
import { useTranslation } from "react-i18next";

import { normalizeLanguage, type SupportedLanguage } from "@/lib/i18n";

const LANGUAGE_STORAGE_KEY = "portfolio-language";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const activeLanguage = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language);

  const toggleLanguage = (lang: SupportedLanguage) => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    void i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-2 text-white">
      <button
        type="button"
        onClick={() => toggleLanguage("en")}
        className={`cursor-pointer hover:text-accent transition-all ${activeLanguage === "en" ? "text-accent font-semibold" : ""}`}
      >
        EN
      </button>
      <span className="text-white/60">|</span>
      <button
        type="button"
        onClick={() => toggleLanguage("fi")}
        className={`cursor-pointer hover:text-accent transition-all ${activeLanguage === "fi" ? "text-accent font-semibold" : ""}`}
      >
        FI
      </button>
    </div>
  );
};

export default LanguageSwitcher;
