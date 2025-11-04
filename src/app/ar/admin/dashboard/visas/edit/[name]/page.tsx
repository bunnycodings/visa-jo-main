'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { use } from 'react';
import EditVisaPage from '@/app/admin/dashboard/visas/edit/[name]/page';
import ArabicAdminDashboardLayout from '@/components/admin/ArabicAdminDashboardLayout';

export default function ArabicEditVisaPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { setLocale } = useLanguage();
  const resolvedParams = use(params);

  useEffect(() => {
    // Ensure locale is set to Arabic
    setLocale('ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, [setLocale]);

  return (
    <ArabicAdminDashboardLayout>
      <EditVisaPage params={Promise.resolve(resolvedParams)} />
    </ArabicAdminDashboardLayout>
  );
}

