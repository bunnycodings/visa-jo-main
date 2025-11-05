'use client';

import { NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IntlProviderProps {
  children: React.ReactNode;
  messages: any;
  defaultLocale?: string;
}

export function IntlProvider({ children, messages, defaultLocale = 'en' }: IntlProviderProps) {
  const pathname = usePathname();
  const [locale, setLocale] = useState(defaultLocale);
  const [localeMessages, setLocaleMessages] = useState(messages);

  useEffect(() => {
    const currentLocale = pathname?.startsWith('/ar') ? 'ar' : 'en';
    
    if (currentLocale !== locale) {
      setLocale(currentLocale);
      
      // Load messages for the current locale
      import(`../../messages/${currentLocale}.json`)
        .then((module) => {
          setLocaleMessages(module.default);
        })
        .catch(() => {
          // Fallback to default messages
          setLocaleMessages(messages);
        });
    }
    
    // Update document attributes
    if (typeof document !== 'undefined') {
      document.documentElement.dir = currentLocale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = currentLocale;
    }
  }, [pathname, locale, messages]);

  return (
    <NextIntlClientProvider messages={localeMessages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}

