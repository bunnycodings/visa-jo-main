'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import DashboardContent from '@/components/admin/DashboardContent';

export default function ArabicAdminDashboard() {
  const { setLocale } = useLanguage();

  useEffect(() => {
    // Ensure locale is set to Arabic
    setLocale('ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, [setLocale]);

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}

