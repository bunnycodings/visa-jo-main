import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { ContentRefreshProvider } from "@/context/ContentRefreshContext";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visa Consulting Services - Professional Visa Assistance",
  description: "Expert visa consulting services for UAE, UK, US, Canada, Australia, India, and Schengen visas. Professional assistance with visa applications, documentation, and travel planning.",
  keywords: "visa consulting, travel visa, schengen visa, UAE visa, UK visa, US visa, Canada visa, Australia visa, India visa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* VATSIM overlay removal script temporarily disabled */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContentRefreshProvider>
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ContentRefreshProvider>
        <Analytics />
      </body>
    </html>
  );
}
