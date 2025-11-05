'use client';

import { useEffect } from 'react';
import { use } from 'react';
import EditVisaPage from '@/app/admin/dashboard/visas/edit/[name]/page';
import ArabicAdminDashboardLayout from '@/components/admin/ArabicAdminDashboardLayout';

export default function ArabicEditVisaPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const resolvedParams = use(params);
  
  useEffect(() => {
    // Ensure locale is set to Arabic
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  return (
    <ArabicAdminDashboardLayout>
      <EditVisaPage params={Promise.resolve(resolvedParams)} />
    </ArabicAdminDashboardLayout>
  );
}

