'use client';

import { useEffect } from 'react';
import DashboardLayout from '@/components/admin/DashboardLayout';

export default function ArabicAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Ensure locale is set to Arabic
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  return <DashboardLayout>{children}</DashboardLayout>;
}

