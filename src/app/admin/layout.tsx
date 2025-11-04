'use client';
import React, { useEffect } from 'react';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { useLanguage } from '@/context/LanguageContext';

function EnglishAdminWrapper({ children }: { children: React.ReactNode }) {
  const { setLocale } = useLanguage();
  
  useEffect(() => {
    setLocale('en');
    if (typeof document !== 'undefined') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, [setLocale]);

  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <EnglishAdminWrapper>{children}</EnglishAdminWrapper>
      </AdminAuthProvider>
    </LanguageProvider>
  );
}
