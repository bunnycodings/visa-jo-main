'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getArabicVisaUrl, getCountryFromArabicSlug } from '@/lib/utils/arabic-slugs';
import { getAlternateLanguageRoute } from '@/lib/utils/route-mapping';

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

  // Helper function to get clean path without query params or hash
  const getCleanPath = (path: string): string => {
    return path.split('?')[0].split('#')[0];
  };

  const switchLanguage = (newLocale: 'en' | 'ar') => {
    setIsOpen(false);
    const currentPath = getCleanPath(pathname || '/');
    
    // Skip admin routes - they are separate for each language
    if (currentPath.startsWith('/admin/') || currentPath.startsWith('/ar/admin/')) {
      return;
    }
    
    // Use the route mapping utility to get the alternate language route
    let targetPath: string | null = null;
    
    // Handle visa routes separately
    if (newLocale === 'ar' && currentPath.startsWith('/visa/')) {
      // English visa to Arabic visa
      const country = currentPath.split('/visa/')[1]?.split('/')[0] || '';
      if (country) {
        targetPath = getArabicVisaUrl(country);
      }
    } else if (newLocale === 'en' && (currentPath.includes('فيزا-السفر/') || currentPath.includes('فيزا-شنغن/') || currentPath.startsWith('/ar/visa/'))) {
      // Arabic visa to English visa
      let countryCode: string = '';
      
      if (currentPath.startsWith('/ar/visa/')) {
        const country = currentPath.split('/ar/visa/')[1]?.split('/')[0] || '';
        countryCode = getCountryFromArabicSlug(country);
      } else {
        const parts = currentPath.split('/');
        const arabicSlug = parts[parts.length - 1] || '';
        countryCode = getCountryFromArabicSlug(arabicSlug);
      }
      
      if (countryCode) {
        targetPath = `/visa/${countryCode}`;
      }
    } else {
      // For regular pages, use the route mapping
      targetPath = getAlternateLanguageRoute(currentPath, newLocale);
    }
    
    // If we found a target path, navigate to it
    if (targetPath) {
      setLocale(newLocale);
      document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLocale;
      window.location.href = targetPath;
    } else {
      // Fallback: just update locale if already on the correct route
      setLocale(newLocale);
      document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLocale;
    }
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

