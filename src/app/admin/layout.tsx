'use client';
import React, { useEffect } from 'react';
import { AdminAuthProvider } from '@/context/AdminAuthContext';

function EnglishAdminWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, []);

  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <EnglishAdminWrapper>{children}</EnglishAdminWrapper>
    </AdminAuthProvider>
  );
}
