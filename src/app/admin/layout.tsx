'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';

function AdminIntlProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [messages, setMessages] = useState(enMessages);
  
  // Determine locale from pathname - admin routes can be /admin or /ar/admin
  const locale = useMemo(() => {
    if (pathname?.startsWith('/ar/admin')) {
      return 'ar';
    }
    return 'en';
  }, [pathname]);

  // Load messages based on locale
  useEffect(() => {
    if (locale === 'ar') {
      setMessages(arMessages);
    } else {
      setMessages(enMessages);
    }
  }, [locale]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminIntlProvider>{children}</AdminIntlProvider>
    </AdminAuthProvider>
  );
}
