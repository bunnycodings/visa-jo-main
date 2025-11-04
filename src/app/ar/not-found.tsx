'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function ArabicNotFound() {
  const router = useRouter();
  const { locale, t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-blue-50 rtl" dir="rtl">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            الصفحة غير موجودة
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/ar"
            className="px-8 py-3 bg-[#145EFF] text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            العودة إلى الصفحة الرئيسية
          </Link>
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all"
          >
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
}

