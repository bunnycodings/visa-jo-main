'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getArabicVisaUrl, getCountryFromArabicSlug } from '@/lib/utils/arabic-slugs';

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
      
      // Handle visa routes - convert to Arabic URLs
      if (currentPath.startsWith('/visa/')) {
        const country = currentPath.split('/visa/')[1];
        const arabicPath = getArabicVisaUrl(country);
        router.push(arabicPath);
        setLocale(newLocale);
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
        return;
      }
      
      // Handle Arabic visa routes - keep as is
      if (currentPath.includes('فيزا-السفر') || currentPath.includes('فيزا-شنغن')) {
        // Already on Arabic visa route, just update locale
        setLocale(newLocale);
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
        return;
      }
      
      // For other routes, add /ar prefix
      const pathWithoutAr = currentPath.startsWith('/ar') ? currentPath.replace('/ar', '') : currentPath;
      const arabicPath = pathWithoutAr === '/' ? '/ar' : `/ar${pathWithoutAr}`;
      router.push(arabicPath);
    } else {
      // Navigate to English version
      const currentPath = pathname || '/';
      
      // Handle Arabic visa routes - convert to English
      if (currentPath.includes('فيزا-السفر/') || currentPath.includes('فيزا-شنغن/')) {
        const parts = currentPath.split('/');
        const arabicSlug = parts[parts.length - 1];
        const countryCode = getCountryFromArabicSlug(arabicSlug);
        const englishPath = `/visa/${countryCode}`;
        router.push(englishPath);
        setLocale(newLocale);
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
        return;
      }
      
      // Remove /ar prefix for other routes
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

