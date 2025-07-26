"use client";
import { useEffect } from 'react';
import '../lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
}

const I18nProvider = ({ children }: I18nProviderProps) => {
  useEffect(() => {
    // Initialize i18n on client side
  }, []);

  return <>{children}</>;
};

export default I18nProvider;
