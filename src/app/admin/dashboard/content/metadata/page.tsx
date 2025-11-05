'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { PageMetadata } from '@/types/models/SiteContent';

export default function PageMetadataPage() {
  const router = useRouter();
  const locale = useLocale();
  const [pages, setPages] = useState<PageMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingPage, setEditingPage] = useState<PageMetadata | null>(null);

  const isRTL = locale === 'ar';

  const pageOptions = [
    { id: 'home', label: locale === 'ar' ? 'الصفحة الرئيسية' : 'Homepage' },
    { id: 'about', label: locale === 'ar' ? 'حول' : 'About' },
    { id: 'contact', label: locale === 'ar' ? 'اتصل بنا' : 'Contact' },
    { id: 'services', label: locale === 'ar' ? 'الخدمات' : 'Services' },
    { id: 'visa-uae', label: 'UAE Visa' },
    { id: 'visa-uk', label: 'UK Visa' },
    { id: 'visa-us', label: 'US Visa' },
    { id: 'visa-canada', label: 'Canada Visa' },
    { id: 'visa-australia', label: 'Australia Visa' },
    { id: 'visa-india', label: 'India Visa' },
    { id: 'visa-germany', label: 'Germany Visa' },
    { id: 'visa-france', label: 'France Visa' },
    { id: 'visa-netherlands', label: 'Netherlands Visa' },
    { id: 'visa-spain', label: 'Spain Visa' },
    { id: 'visa-italy', label: 'Italy Visa' },
    { id: 'visa-austria', label: 'Austria Visa' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchMetadata();
  }, [router]);

  const fetchMetadata = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/metadata', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch metadata');
      const data = await res.json();
      setPages(Array.isArray(data) ? data : Object.values(data));
    } catch (err: any) {
      setError(err.message || (locale === 'ar' ? 'فشل تحميل البيانات' : 'Failed to load metadata'));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingPage) return;
    
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/metadata', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingPage),
      });

      if (!res.ok) throw new Error('Failed to save metadata');
      
      setSuccess(locale === 'ar' ? 'تم حفظ البيانات بنجاح' : 'Metadata saved successfully');
      setEditingPage(null);
      fetchMetadata();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || (locale === 'ar' ? 'فشل الحفظ' : 'Failed to save'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {locale === 'ar' ? 'العودة' : 'Back'}
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#145EFF] p-3 rounded-xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{locale === 'ar' ? 'إدارة بيانات الصفحات' : 'Page SEO Metadata'}</h1>
              <p className="text-gray-600 mt-1">{locale === 'ar' ? 'تحرير الوصف والكلمات المفتاحية لكل صفحة' : 'Edit titles, descriptions, and keywords for search engines'}</p>
            </div>
          </div>

          {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}
          {success && <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">{success}</div>}

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : editingPage ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{locale === 'ar' ? 'الصفحة' : 'Page'}</label>
                <select value={editingPage.page} onChange={(e) => setEditingPage({ ...editingPage, page: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900 bg-white">
                  {pageOptions.map(page => (
                    <option key={page.id} value={page.id}>{page.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{locale === 'ar' ? 'العنوان (Title)' : 'Page Title'}</label>
                <input type="text" value={editingPage.title} onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900" placeholder="Page title for browsers and search engines" />
                <p className="text-xs text-gray-500 mt-1">{editingPage.title.length}/60 {locale === 'ar' ? 'حرف' : 'characters'}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{locale === 'ar' ? 'الوصف (Description)' : 'Meta Description'}</label>
                <textarea value={editingPage.description} onChange={(e) => setEditingPage({ ...editingPage, description: e.target.value })} rows={3} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900" placeholder="Brief description shown in search results" />
                <p className="text-xs text-gray-500 mt-1">{editingPage.description.length}/160 {locale === 'ar' ? 'حرف' : 'characters'}</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{locale === 'ar' ? 'الكلمات المفتاحية (Keywords)' : 'Keywords'}</label>
                <input type="text" value={editingPage.keywords} onChange={(e) => setEditingPage({ ...editingPage, keywords: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900" placeholder="Comma-separated keywords (e.g. visa, travel, UAE)" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">OG Title (Social Media)</label>
                <input type="text" value={editingPage.ogTitle || ''} onChange={(e) => setEditingPage({ ...editingPage, ogTitle: e.target.value })} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900" placeholder="Title for social media sharing" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">OG Description (Social Media)</label>
                <textarea value={editingPage.ogDescription || ''} onChange={(e) => setEditingPage({ ...editingPage, ogDescription: e.target.value })} rows={2} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900" placeholder="Description for social media sharing" />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="isActive" checked={editingPage.isActive} onChange={(e) => setEditingPage({ ...editingPage, isActive: e.target.checked })} className="h-5 w-5 text-blue-600 border-gray-300 rounded" />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-900">{locale === 'ar' ? 'نشط' : 'Active'}</label>
              </div>

              <div className="flex gap-4 justify-end pt-6 border-t-2 border-gray-200">
                <button onClick={() => setEditingPage(null)} className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  {locale === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-[#145EFF] text-white rounded-lg hover:bg-[#145EFF] disabled:opacity-50">
                  {saving ? (locale === 'ar' ? 'جاري الحفظ...' : 'Saving...') : (locale === 'ar' ? 'حفظ' : 'Save')}
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'ar' ? 'الصفحة' : 'Page'}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'ar' ? 'العنوان' : 'Title'}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'ar' ? 'الوصف' : 'Description'}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'ar' ? 'الحالة' : 'Status'}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{locale === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page.page} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{pageOptions.find(p => p.id === page.page)?.label || page.page}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">{page.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">{page.description}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${page.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {page.isActive ? (locale === 'ar' ? 'نشط' : 'Active') : (locale === 'ar' ? 'غير نشط' : 'Inactive')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button onClick={() => setEditingPage(page)} className="px-4 py-2 bg-[#145EFF] text-white rounded-lg hover:bg-[#145EFF] transition-colors text-xs font-medium">
                          {locale === 'ar' ? 'تحرير' : 'Edit'}
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
    </div>
  );
}
