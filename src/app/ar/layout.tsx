'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setLocale } = useLanguage();

  useEffect(() => {
    setLocale('ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, [setLocale]);

  return <>{children}</>;
}

