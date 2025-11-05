import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getMessages } from 'next-intl/server';
import { IntlProvider } from '@/components/IntlProvider';
import { ContentRefreshProvider } from "@/context/ContentRefreshContext";
import { Analytics } from "@vercel/analytics/react";
import FloatingCallButton from "@/components/FloatingCallButton";
import PWARegistration from "@/components/PWARegistration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  title: "Visa Consulting Services - Professional Visa Assistance",
  description: "Expert visa consulting services for UAE, UK, US, Canada, Australia, India, and Schengen visas. Professional assistance with visa applications, documentation, and travel planning.",
  keywords: "visa consulting, travel visa, schengen visa, UAE visa, UK visa, US visa, Canada visa, Australia visa, India visa",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}) {
  // Get messages for default locale (English)
  // Arabic messages will be loaded in /ar routes
  const messages = await getMessages();
  
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#145EFF" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Keep Apple-specific meta for backward compatibility with older iOS devices */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Visa Jo" />
        <link rel="apple-touch-icon" href="/img/logo/visajo.png" />
        {/* Preload logo image with proper as attribute for immediate use */}
        <link rel="preload" href="/img/logo/visajo.png" as="image" type="image/png" />
        
        {/* VATSIM overlay removal script temporarily disabled */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContentRefreshProvider>
          <IntlProvider messages={messages} defaultLocale="en">
            <PWARegistration />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <FloatingCallButton />
          </IntlProvider>
        </ContentRefreshProvider>
        <Analytics />
      </body>
    </html>
  );
}
