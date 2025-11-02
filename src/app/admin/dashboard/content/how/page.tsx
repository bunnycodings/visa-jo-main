"use client";
import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useContentRefresh } from '@/context/ContentRefreshContext';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

interface StepInput {
  title: string;
}

export default function EditHowItWorksPage() {
  const { token } = useAdminAuth();
  const { triggerRefresh } = useContentRefresh();
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState<StepInput[]>([]);

  const isRTL = locale === 'ar';

  useEffect(() => {
    async function fetchContent() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        console.log('Fetching content with token:', token ? 'exists' : 'missing');
        const res = await fetch('/api/admin/content/how', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          console.error('Failed to fetch content:', res.status, res.statusText);
          throw new Error(locale === 'ar' ? 'فشل تحميل المحتوى' : 'Failed to load content');
        }
        const data = await res.json();
        console.log('Fetched data:', data);
        setTitle(data.title || '');
        setSteps(Array.isArray(data.steps) && data.steps.length ? data.steps : [{ title: '' }]);
      } catch (e: any) {
        console.error('Error loading content:', e);
        setError(e.message || (locale === 'ar' ? 'خطأ في تحميل المحتوى' : 'Error loading content'));
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [token, locale]);

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);
      const res = await fetch('/api/admin/content/how', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, steps }),
      });
      if (!res.ok) throw new Error(locale === 'ar' ? 'فشل حفظ المحتوى' : 'Failed to save content');
      await res.json();
      
      // Auto-refresh the data after saving
      const refreshRes = await fetch('/api/admin/content/how', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (refreshRes.ok) {
        const data = await refreshRes.json();
        setTitle(data.title || '');
        setSteps(Array.isArray(data.steps) && data.steps.length ? data.steps : [{ title: '' }]);
      }
      
      triggerRefresh();
      alert(locale === 'ar' ? 'تم الحفظ بنجاح' : 'Saved successfully');
    } catch (e: any) {
      setError(e.message || (locale === 'ar' ? 'خطأ في حفظ المحتوى' : 'Error saving content'));
    } finally {
      setSaving(false);
    }
  }

  function updateStep(index: number, value: string) {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = { title: value };
      return next;
    });
  }

  function addStep() {
    setSteps((prev) => [...prev, { title: '' }]);
  }

  function removeStep(index: number) {
    if (steps.length > 1) {
      setSteps((prev) => prev.filter((_, i) => i !== index));
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
          <h1 className="text-2xl font-semibold text-white">{locale === 'ar' ? 'تحرير كيفية العمل' : 'Edit How It Works'}</h1>
          <Link href="/admin/dashboard" className="text-blue-400 underline">{locale === 'ar' ? 'العودة إلى لوحة التحكم' : 'Back to Dashboard'}</Link>
        </div>

        {loading && <p className="text-gray-400">{locale === 'ar' ? 'جاري تحميل المحتوى...' : 'Loading content...'}</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && (
          <div className="space-y-6 bg-gray-900 p-8 rounded-lg">
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">{locale === 'ar' ? `الخطوات (${steps.length} خطوة)` : `Steps (${steps.length} Steps)`}</label>
                <button
                  onClick={addStep}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {locale === 'ar' ? 'إضافة خطوة' : 'Add Step'}
                </button>
              </div>
              <div className="space-y-4 mt-3">
                {steps.map((step, idx) => (
                  <div key={`step-${idx}`} className="p-4 bg-gray-800 border border-gray-700 rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-300">{locale === 'ar' ? `الخطوة ${idx + 1}` : `Step ${idx + 1}`}</span>
                      <button
                        onClick={() => removeStep(idx)}
                        disabled={steps.length === 1}
                        className={`px-3 py-1 bg-red-600 text-white text-sm rounded transition-colors flex items-center gap-1 ${
                          steps.length === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
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
                      placeholder={locale === 'ar' ? 'عنوان الخطوة' : 'Step title'}
                      value={step.title}
                      onChange={(e) => updateStep(idx, e.target.value)}
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
