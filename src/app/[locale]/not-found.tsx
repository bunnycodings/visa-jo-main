'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('errors');
  const isArabic = locale === 'ar';

  useEffect(() => {
    // Try to redirect old /visas/ routes to /visa/
    if (pathname?.includes('/visas/')) {
      const country = pathname.split('/visas/')[1];
      router.replace(`/${locale}/visa/${country}`);
      return;
    }
  }, [pathname, router, locale]);

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-blue-50 ${isArabic ? 'rtl' : ''}`}>
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {isArabic ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {isArabic 
              ? 'عذراً، الصفحة التي تبحث عنها غير موجودة.'
              : "Sorry, the page you're looking for doesn't exist."}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}`}
            className="px-8 py-3 bg-[#145EFF] text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            {isArabic ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}
          </Link>
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all"
          >
            {isArabic ? 'رجوع' : 'Go Back'}
          </button>
        </div>
      </div>
    </div>
  );
}

