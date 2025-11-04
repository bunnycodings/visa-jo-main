'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setLocale, locale } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    // Force Arabic locale immediately when on /ar routes
    if (pathname?.startsWith('/ar') && locale !== 'ar') {
      setLocale('ar');
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }
  }, [pathname, locale, setLocale]);

  // Also set on mount
  useEffect(() => {
    setLocale('ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, [setLocale]);

  return <>{children}</>;
}

