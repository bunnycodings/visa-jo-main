"use client";
import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useContentRefresh } from '@/context/ContentRefreshContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

interface FeatureInput {
  title: string;
  description: string;
}

export default function EditWhyChooseUsPage() {
  const { token } = useAdminAuth();
  const { triggerRefresh } = useContentRefresh();
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [badgeText, setBadgeText] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [features, setFeatures] = useState<FeatureInput[]>([]);

  const isRTL = locale === 'ar';

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/content/why', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(locale === 'ar' ? 'فشل تحميل المحتوى' : 'Failed to load content');
        const data = await res.json();
        setBadgeText(data.badgeText || '');
        setTitle(data.title || '');
        setSubtitle(data.subtitle || '');
        setFeatures(
          Array.isArray(data.features) && data.features.length
            ? data.features.map((f: any) => ({ title: f.title || '', description: f.description || '' }))
            : [{ title: '', description: '' }]
        );
      } catch (e: any) {
        setError(e.message || (locale === 'ar' ? 'خطأ في تحميل المحتوى' : 'Error loading content'));
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchContent();
  }, [token, locale]);

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);
      const res = await fetch('/api/admin/content/why', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          badgeText,
          title,
          subtitle,
          features,
        }),
      });
      if (!res.ok) throw new Error(locale === 'ar' ? 'فشل حفظ المحتوى' : 'Failed to save content');
      triggerRefresh();
      alert(locale === 'ar' ? 'تم الحفظ بنجاح' : 'Saved successfully');
    } catch (e: any) {
      setError(e.message || (locale === 'ar' ? 'خطأ في حفظ المحتوى' : 'Error saving content'));
    } finally {
      setSaving(false);
    }
  }

  function updateFeature(index: number, field: keyof FeatureInput, value: string) {
    setFeatures((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addFeature() {
    setFeatures((prev) => [...prev, { title: '', description: '' }]);
  }

  function removeFeature(index: number) {
    if (features.length > 1) {
      setFeatures((prev) => prev.filter((_, i) => i !== index));
    }
  }

  if (!token) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-black text-white">
        <p className="text-red-400">{locale === 'ar' ? 'يجب أن تكون مسجل دخول كمشرف لتحرير المحتوى' : 'You must be logged in as admin to edit content.'}</p>
        <Link href="/admin/login" className="text-blue-400 underline">{locale === 'ar' ? 'اذهب إلى دخول المشرف' : 'Go to Admin Login'}</Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-white py-8 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-white">{locale === 'ar' ? 'تحرير لماذا تختارنا' : 'Edit Why Choose Us'}</h1>
          <Link href="/admin/dashboard" className="text-blue-400 underline">{locale === 'ar' ? 'العودة إلى لوحة التحكم' : 'Back to Dashboard'}</Link>
        </div>

        {loading && <p className="text-gray-400">{locale === 'ar' ? 'جاري تحميل المحتوى...' : 'Loading content...'}</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && (
          <div className="space-y-6 bg-gray-900 p-8 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{locale === 'ar' ? 'نص الشارة' : 'Badge Text'}</label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{locale === 'ar' ? 'العنوان' : 'Title'}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{locale === 'ar' ? 'الوصف الفرعي' : 'Subtitle'}</label>
              <textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">{locale === 'ar' ? `الميزات (${features.length} ميزة)` : `Features (${features.length} Features)`}</label>
                <button
                  onClick={addFeature}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {locale === 'ar' ? 'إضافة ميزة' : 'Add Feature'}
                </button>
              </div>
              <div className="space-y-4 mt-3">
                {features.map((feature, idx) => (
                  <div key={idx} className="p-4 bg-gray-800 border border-gray-700 rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-300">{locale === 'ar' ? `الميزة ${idx + 1}` : `Feature ${idx + 1}`}</span>
                      <button
                        onClick={() => removeFeature(idx)}
                        disabled={features.length === 1}
                        className={`px-3 py-1 bg-red-600 text-white text-sm rounded transition-colors flex items-center gap-1 ${
                          features.length === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {locale === 'ar' ? 'حذف' : 'Delete'}
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder={locale === 'ar' ? 'عنوان الميزة' : 'Feature title'}
                      value={feature.title}
                      onChange={(e) => updateFeature(idx, 'title', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md mb-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder={locale === 'ar' ? 'وصف الميزة' : 'Feature description'}
                      value={feature.description}
                      onChange={(e) => updateFeature(idx, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700"
              >
                {saving ? (locale === 'ar' ? 'جاري الحفظ...' : 'Saving...') : (locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes')}
              </button>
              <Link href="/" className="text-gray-400 hover:text-white underline">{locale === 'ar' ? 'عرض الصفحة الرئيسية' : 'View Homepage'}</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
