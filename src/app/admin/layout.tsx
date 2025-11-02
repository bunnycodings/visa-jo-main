'use client';
import React from 'react';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import { LanguageProvider } from '@/context/LanguageContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </LanguageProvider>
  );
}
