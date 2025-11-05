import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { useEffect } from 'react';

export default async function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get messages for Arabic locale
  const messages = await getMessages({ locale: 'ar' });

  // Set document direction on client side
  if (typeof document !== 'undefined') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }

  return (
    <NextIntlClientProvider messages={messages} locale="ar">
      {children}
    </NextIntlClientProvider>
  );
}

