'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function AdminLanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  
  const isArabicAdmin = pathname?.startsWith('/ar/admin/') || false;
  
  const switchToEnglish = () => {
    if (isArabicAdmin) {
      // Convert /ar/admin/dashboard/visas to /admin/dashboard/visas
      const englishPath = pathname?.replace('/ar/admin/', '/admin/') || '/admin/dashboard';
      router.push(englishPath);
    }
  };
  
  const switchToArabic = () => {
    if (!isArabicAdmin) {
      // Convert /admin/dashboard/visas to /ar/admin/dashboard/visas
      const arabicPath = pathname?.replace('/admin/', '/ar/admin/') || '/ar/admin/dashboard';
      router.push(arabicPath);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={switchToEnglish}
        className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
          !isArabicAdmin
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        title="Switch to English Admin"
      >
        English
      </button>
      <button
        onClick={switchToArabic}
        className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
          isArabicAdmin
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        dir="rtl"
        title="التبديل إلى لوحة التحكم العربية"
      >
        العربية
      </button>
    </div>
  );
}

