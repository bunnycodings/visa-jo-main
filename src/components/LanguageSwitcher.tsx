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
      
      // Skip admin routes - they are separate for each language
      if (currentPath.startsWith('/admin/')) {
        // Admin routes don't switch languages
        return;
      }
      
      // For other routes, add /ar prefix
      const pathWithoutAr = currentPath.startsWith('/ar') ? currentPath.replace('/ar', '') : currentPath;
      const arabicPath = pathWithoutAr === '/' ? '/ar' : `/ar${pathWithoutAr}`;
      router.push(arabicPath);
    } else {
      // Navigate to English version
      const currentPath = pathname || '/';
      
      // Skip admin routes - they are separate for each language
      if (currentPath.startsWith('/ar/admin/') || currentPath.startsWith('/admin/')) {
        // Admin routes don't switch languages
        return;
      }
      
      // Handle Arabic visa routes - convert to English
      // Check for Arabic visa category patterns
      if (currentPath.includes('فيزا-السفر/') || currentPath.includes('فيزا-شنغن/') || currentPath.startsWith('/ar/visa/')) {
        let countryCode: string;
        
        if (currentPath.startsWith('/ar/visa/')) {
          // Direct /ar/visa/{country} format
          const country = currentPath.split('/ar/visa/')[1];
          countryCode = getCountryFromArabicSlug(country);
        } else {
          // Arabic category format: /ar/فيزا-السفر/{slug} or /ar/فيزا-شنغن/{slug}
          const parts = currentPath.split('/');
          const arabicSlug = parts[parts.length - 1];
          countryCode = getCountryFromArabicSlug(arabicSlug);
        }
        
        const englishPath = `/visa/${countryCode}`;
        router.push(englishPath);
        setLocale(newLocale);
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
        return;
      }
      
      // For other routes, remove /ar prefix
      if (currentPath.startsWith('/ar')) {
        // Remove /ar prefix, handle edge case where path is exactly /ar
        let englishPath = currentPath === '/ar' ? '/' : currentPath.replace('/ar', '');
        
        // Ensure we have a valid path (should never be empty, but just in case)
        if (!englishPath || englishPath.trim() === '') {
          englishPath = '/';
        }
        
        // Ensure path starts with /
        if (!englishPath.startsWith('/')) {
          englishPath = '/' + englishPath;
        }
        
        try {
          router.push(englishPath);
          setLocale(newLocale);
          document.documentElement.dir = 'ltr';
          document.documentElement.lang = 'en';
        } catch (error) {
          console.error('Navigation error:', error);
          // Fallback to window.location if router.push fails
          window.location.href = englishPath;
        }
      } else {
        // Already on English route, just update locale
        setLocale(newLocale);
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
      }
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

