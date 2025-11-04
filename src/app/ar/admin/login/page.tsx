'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import AdminLogin from '@/app/admin/login/page';

export default function ArabicAdminLogin() {
  const router = useRouter();
  const { setLocale } = useLanguage();

  useEffect(() => {
    // Ensure locale is set to Arabic
    setLocale('ar');
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, [setLocale]);

  return <AdminLogin />;
}

