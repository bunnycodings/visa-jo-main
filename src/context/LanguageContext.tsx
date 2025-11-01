'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'en' | 'ar';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const [messages, setMessages] = useState<Record<string, any>>({});

  useEffect(() => {
    import(`../../messages/${locale}.json`).then((msgs) => {
      setMessages(msgs.default);
    });
  }, [locale]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

