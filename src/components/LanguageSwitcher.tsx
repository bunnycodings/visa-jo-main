'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Sync locale with pathname
  useEffect(() => {
    const pathLocale = pathname?.startsWith('/ar') ? 'ar' : 'en';
    if (pathLocale !== locale) {
      setLocale(pathLocale);
      document.documentElement.dir = pathLocale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = pathLocale;
    }
  }, [pathname, locale, setLocale]);

  const switchLanguage = (newLocale: 'en' | 'ar') => {
    setIsOpen(false);
    
    if (newLocale === 'ar') {
      // Navigate to Arabic version
      const currentPath = pathname || '/';
      // Remove /ar prefix if it exists, then add it
      const pathWithoutAr = currentPath.startsWith('/ar') ? currentPath.replace('/ar', '') : currentPath;
      const arabicPath = pathWithoutAr === '/' ? '/ar' : `/ar${pathWithoutAr}`;
      router.push(arabicPath);
    } else {
      // Navigate to English version
      const currentPath = pathname || '/';
      // Remove /ar prefix if it exists
      const englishPath = currentPath.startsWith('/ar') ? currentPath.replace('/ar', '') || '/' : currentPath;
      router.push(englishPath);
    }
    
    // Update locale and document direction
    setLocale(newLocale);
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
      >
        <span className="text-sm font-medium">{(pathname?.startsWith('/ar') ? 'ar' : 'en').toUpperCase()}</span>
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
                !pathname?.startsWith('/ar')
                  ? 'bg-[#145EFF] text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              English
            </button>
            <button
              onClick={() => switchLanguage('ar')}
              className={`w-full text-left px-4 py-2 text-sm rounded-b-lg transition-colors ${
                pathname?.startsWith('/ar')
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

