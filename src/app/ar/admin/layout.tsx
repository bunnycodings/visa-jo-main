'use client';
import React, { useEffect } from 'react';
import { AdminAuthProvider } from '@/context/AdminAuthContext';

function ArabicAdminWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }
  }, []);

  return <>{children}</>;
}

export default function ArabicAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <ArabicAdminWrapper>{children}</ArabicAdminWrapper>
    </AdminAuthProvider>
  );
}
