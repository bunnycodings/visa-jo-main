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

  // Route mapping between English and Arabic pages
  // This ensures each Arabic page maps to its corresponding English page
  const routeMap: Record<string, { en: string; ar: string }> = {
    '/': { en: '/', ar: '/ar' },
    '/about': { en: '/about', ar: '/ar/about' },
    '/contact': { en: '/contact', ar: '/ar/contact' },
    '/services': { en: '/services', ar: '/ar/services' },
  };
  
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
    
    if (newLocale === 'ar') {
      // Navigate to Arabic page
      
      // Handle visa routes - convert to Arabic URLs
      if (currentPath.startsWith('/visa/')) {
        const country = currentPath.split('/visa/')[1]?.split('/')[0] || '';
        if (country) {
          const arabicPath = getArabicVisaUrl(country);
          setLocale(newLocale);
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = 'ar';
          window.location.href = arabicPath;
          return;
        }
      }
      
      // Handle Arabic visa routes - already on Arabic visa route
      if (currentPath.includes('فيزا-السفر') || currentPath.includes('فيزا-شنغن') || currentPath.startsWith('/ar/visa/')) {
        setLocale(newLocale);
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
        return;
      }
      
      // Check route map first for exact matches
      if (routeMap[currentPath]) {
        const targetPath = routeMap[currentPath].ar;
        setLocale(newLocale);
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
        window.location.href = targetPath;
        return;
      }
      
      // For other routes, add /ar prefix to get Arabic page
      const pathWithoutAr = currentPath.startsWith('/ar') ? currentPath.replace(/^\/ar/, '') : currentPath;
      const arabicPath = pathWithoutAr === '/' ? '/ar' : `/ar${pathWithoutAr}`;
      setLocale(newLocale);
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      window.location.href = arabicPath;
    } else {
      // Navigate to English page
      
      // Handle Arabic visa routes - convert to English
      if (currentPath.includes('فيزا-السفر/') || currentPath.includes('فيزا-شنغن/') || currentPath.startsWith('/ar/visa/')) {
        let countryCode: string = '';
        
        if (currentPath.startsWith('/ar/visa/')) {
          // Direct /ar/visa/{country} format
          const country = currentPath.split('/ar/visa/')[1]?.split('/')[0] || '';
          countryCode = getCountryFromArabicSlug(country);
        } else {
          // Arabic category format: /ar/فيزا-السفر/{slug} or /ar/فيزا-شنغن/{slug}
          const parts = currentPath.split('/');
          const arabicSlug = parts[parts.length - 1] || '';
          countryCode = getCountryFromArabicSlug(arabicSlug);
        }
        
        if (countryCode) {
          const englishPath = `/visa/${countryCode}`;
          setLocale(newLocale);
          document.documentElement.dir = 'ltr';
          document.documentElement.lang = 'en';
          window.location.href = englishPath;
          return;
        }
      }
      
      // Check route map first for Arabic pages mapping to English pages
      const routeKey = Object.keys(routeMap).find(key => {
        const arPath = routeMap[key].ar;
        return currentPath === arPath || currentPath.startsWith(arPath + '/');
      });
      if (routeKey) {
        const targetPath = routeMap[routeKey].en;
        setLocale(newLocale);
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
        window.location.href = targetPath;
        return;
      }
      
      // For other Arabic routes, remove /ar prefix to get English page
      if (currentPath.startsWith('/ar')) {
        // Remove /ar prefix, handle edge case where path is exactly /ar
        let englishPath = currentPath === '/ar' ? '/' : currentPath.replace(/^\/ar/, '');
        
        // Ensure we have a valid path
        if (!englishPath || englishPath.trim() === '') {
          englishPath = '/';
        }
        
        // Ensure path starts with /
        if (!englishPath.startsWith('/')) {
          englishPath = '/' + englishPath;
        }
        
        setLocale(newLocale);
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
        window.location.href = englishPath;
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

