'use client';
import React, { useEffect } from 'react';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { useLanguage } from '@/context/LanguageContext';

function ArabicAdminWrapper({ children }: { children: React.ReactNode }) {
  const { setLocale } = useLanguage();
  
  useEffect(() => {
    setLocale('ar');
    if (typeof document !== 'undefined') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }
  }, [setLocale]);

  return <>{children}</>;
}

export default function ArabicAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <ArabicAdminWrapper>{children}</ArabicAdminWrapper>
      </AdminAuthProvider>
    </LanguageProvider>
  );
}
