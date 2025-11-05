'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useEffect } from 'react';

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Set document direction and language for Arabic
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  return <>{children}</>;
}

