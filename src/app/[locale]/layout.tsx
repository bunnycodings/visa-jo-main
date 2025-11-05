import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingCallButton from '@/components/FloatingCallButton';
import PWARegistration from '@/components/PWARegistration';
import { ContentRefreshProvider } from '@/context/ContentRefreshContext';
import { Analytics } from '@vercel/analytics/react';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const currentLocale = await getLocale();

  return (
    <NextIntlClientProvider messages={messages} locale={currentLocale}>
      <ContentRefreshProvider>
        <PWARegistration />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingCallButton />
      </ContentRefreshProvider>
      <Analytics />
    </NextIntlClientProvider>
  );
}

