'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import DashboardLayout from '@/components/admin/DashboardLayout';

export default function ArabicAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setLocale } = useLanguage();

  useEffect(() => {
    // Ensure locale is set to Arabic
    setLocale('ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, [setLocale]);

  return <DashboardLayout>{children}</DashboardLayout>;
}

