'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: 'en' | 'ar') => {
    setLocale(newLocale);
    setIsOpen(false);
    // Update document direction for RTL
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
      >
        <span className="text-sm font-medium">{locale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-24 bg-gray-900 rounded-lg shadow-lg z-50 border border-gray-700">
            <button
              onClick={() => switchLanguage('en')}
              className={`w-full text-left px-4 py-2 text-sm rounded-t-lg transition-colors ${
                locale === 'en' 
                  ? 'bg-[#145EFF] text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              English
            </button>
            <button
              onClick={() => switchLanguage('ar')}
              className={`w-full text-left px-4 py-2 text-sm rounded-b-lg transition-colors ${
                locale === 'ar' 
                  ? 'bg-[#145EFF] text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              العربية
            </button>
          </div>
        </>
      )}
    </div>
  );
}

