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
  // Initialize locale based on pathname if available
  const getInitialLocale = (): Locale => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path.startsWith('/ar') ? 'ar' : 'en';
    }
    return 'en';
  };

  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [messages, setMessages] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Set document attributes immediately on first render
  useEffect(() => {
    const initialLocale = getInitialLocale();
    if (typeof document !== 'undefined') {
      document.documentElement.dir = initialLocale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = initialLocale;
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    // Preload both languages for faster switching
    Promise.all([
      import(`../../messages/${locale}.json`),
      import(`../../messages/${locale === 'ar' ? 'en' : 'ar'}.json`)
    ]).then(([currentMsgs]) => {
      setMessages(currentMsgs.default);
      setIsLoading(false);
      // Update document direction and lang
      if (typeof document !== 'undefined') {
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = locale;
      }
    }).catch((err) => {
      console.error('Failed to load messages:', err);
      setIsLoading(false);
    });
  }, [locale]);

  // Sync with pathname changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkPathname = () => {
        const pathLocale = window.location.pathname.startsWith('/ar') ? 'ar' : 'en';
        if (pathLocale !== locale) {
          setLocale(pathLocale);
        }
      };
      
      checkPathname();
      // Listen for navigation events
      window.addEventListener('popstate', checkPathname);
      return () => window.removeEventListener('popstate', checkPathname);
    }
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

