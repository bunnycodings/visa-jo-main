'use client';

import { NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IntlProviderProps {
  children: React.ReactNode;
}

export function IntlProvider({ children }: IntlProviderProps) {
  const pathname = usePathname();
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const currentLocale = pathname?.startsWith('/ar') ? 'ar' : 'en';
    
    if (currentLocale !== locale) {
      setLocale(currentLocale);
    }
    
    // Update document attributes
    if (typeof document !== 'undefined') {
      document.documentElement.dir = currentLocale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = currentLocale;
    }
  }, [pathname, locale]);

  // Messages are provided by next-intl's server-side configuration
  // No need to manually load them - next-intl handles it automatically
  return (
    <NextIntlClientProvider 
      locale={locale}
      timeZone="Asia/Amman"
    >
      {children}
    </NextIntlClientProvider>
  );
}

