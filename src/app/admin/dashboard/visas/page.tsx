'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { VisaType } from '@/types/models/VisaApplication';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

const VisaListPage = () => {
  const router = useRouter();
  const { locale } = useLanguage();
  const [visas, setVisas] = useState<VisaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isRTL = locale === 'ar';

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const response = await fetch('/api/admin/visas', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/admin/login');
            return;
          }
          throw new Error('Failed to fetch visas');
        }

        const data = await response.json();
        setVisas(data);
      } catch (err) {
        console.error(err);
        setError(locale === 'ar' ? 'فشل تحميل التأشيرات. حاول مرة أخرى.' : 'Failed to load visas. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVisas();
  }, [router, locale]);

  const handleDeleteVisa = async (visaName: string) => {
    if (!confirm(locale === 'ar' ? 'هل أنت متأكد من حذف هذه التأشيرة؟' : 'Are you sure you want to delete this visa?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/visas/${encodeURIComponent(visaName)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete visa');
      }

      // Remove the deleted visa from the state
      setVisas(visas.filter(visa => visa.name !== visaName));
    } catch (err) {
      console.error(err);
      setError(locale === 'ar' ? 'فشل حذف التأشيرة. حاول مرة أخرى.' : 'Failed to delete visa. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-white flex justify-center items-center ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-900 text-lg">{locale === 'ar' ? 'جاري تحميل التأشيرات...' : 'Loading visas...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{locale === 'ar' ? 'إدارة التأشيرات' : 'Manage Visas'}</h1>
            <p className="text-gray-600">{locale === 'ar' ? 'إضافة أو تحرير أو حذف معلومات التأشيرات' : 'Add, edit, or delete visa information'}</p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link 
              href="/admin/dashboard/visas/new" 
              className="flex items-center gap-2 px-6 py-3 bg-[#145EFF] text-white rounded-lg hover:bg-[#145EFF] transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {locale === 'ar' ? 'إضافة تأشيرة جديدة' : 'Add New Visa'}
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {visas.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'ar' ? 'لا توجد تأشيرات' : 'No Visas Found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {locale === 'ar' ? 'ابدأ بإضافة أول تأشيرة' : 'Start by adding your first visa'}
            </p>
            <Link 
              href="/admin/dashboard/visas/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#145EFF] text-white rounded-lg hover:bg-[#145EFF]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {locale === 'ar' ? 'إضافة التأشيرة الأولى' : 'Add First Visa'}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'ar' ? 'الاسم' : 'Name'}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'ar' ? 'الدولة' : 'Country'}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'ar' ? 'النوع' : 'Category'}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'ar' ? 'التكلفة الإجمالية' : 'Total Cost'}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'ar' ? 'الحالة' : 'Status'}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {visas.map((visa) => (
                  <tr key={visa.name} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{visa.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{visa.country}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{visa.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">JOD {visa.fees.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        visa.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {visa.isActive ? (locale === 'ar' ? 'نشط' : 'Active') : (locale === 'ar' ? 'غير نشط' : 'Inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2 flex gap-2">
                      <Link 
                        href={`/admin/dashboard/visas/edit/${encodeURIComponent(visa.name)}`}
                        className="px-4 py-2 bg-[#145EFF] text-white rounded-lg hover:bg-[#145EFF] transition-colors text-xs font-medium"
                      >
                        {locale === 'ar' ? 'تحرير' : 'Edit'}
                      </Link>
                      <button 
                        onClick={() => handleDeleteVisa(visa.name)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-medium"
                      >
                        {locale === 'ar' ? 'حذف' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisaListPage;
