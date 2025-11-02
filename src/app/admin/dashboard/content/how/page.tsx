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
  const [steps, setSteps] = useState<StepInput[]>(Array(5).fill({ title: '' }));

  const isRTL = locale === 'ar';

  useEffect(() => {
    async function fetchContent() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch('/api/admin/content/how', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error(locale === 'ar' ? 'فشل تحميل المحتوى' : 'Failed to load content');
        }
        const data = await res.json();
        setTitle(data.title || '');
        let fetchedSteps = Array.isArray(data.steps) && data.steps.length ? [...data.steps] : [];
        // Pad to always show 5 steps
        while (fetchedSteps.length < 5) {
          fetchedSteps.push({ title: '' });
        }
        setSteps(fetchedSteps);
      } catch (e: any) {
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
        body: JSON.stringify({ title, steps: steps.filter(s => s.title.trim()) }),
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

  function updateStep(index: number, value: string) {
    const newSteps = [...steps];
    newSteps[index] = { title: value };
    setSteps(newSteps);
  }

  if (!token) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-gray-50 text-gray-900">
        <p className="text-red-600">{locale === 'ar' ? 'يجب أن تكون مسجل دخول كمشرف' : 'You must be logged in as admin'}</p>
        <Link href="/admin/login" className="text-blue-600 underline">{locale === 'ar' ? 'دخول' : 'Login'}</Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{locale === 'ar' ? 'تحرير كيفية العمل' : 'Edit How It Works'}</h1>
            <p className="text-gray-600">{locale === 'ar' ? 'قم بتحديث خطوات عملية الحصول على التأشيرة' : 'Update the visa application process steps'}</p>
          </div>
          <Link href="/admin/dashboard" className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            {locale === 'ar' ? '← العودة' : 'Back →'}
          </Link>
        </div>

        {loading && <div className="text-center py-12"><div className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>}
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}

        {!loading && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Title */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-900 mb-3">{locale === 'ar' ? 'العنوان الرئيسي' : 'Main Title'}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Get Your Visa"
              />
            </div>

            {/* Steps Grid */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 w-1 h-8 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">{locale === 'ar' ? 'خطوات العملية (5 خطوات)' : 'Process Steps (5 Steps)'}</h2>
              </div>

              {/* Steps in responsive grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {steps.map((step, idx) => (
                  <div key={`step-${idx}`} className="group">
                    {/* Step number badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-sm">{idx + 1}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-600">{locale === 'ar' ? `الخطوة ${idx + 1}` : `Step ${idx + 1}`}</span>
                    </div>

                    {/* Step input */}
                    <input
                      type="text"
                      placeholder={locale === 'ar' ? `أدخل عنوان الخطوة ${idx + 1}` : `Enter step ${idx + 1} title`}
                      value={step.title}
                      onChange={(e) => updateStep(idx, e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-blue-300 bg-gray-50 group-hover:bg-white"
                    />
                  </div>
                ))}
              </div>

              {/* Step descriptions hint */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">{locale === 'ar' ? 'نصيحة:' : 'Tip:'}</span>{' '}
                  {locale === 'ar' 
                    ? 'اترك حقل خطوة فارغًا لإزالة هذه الخطوة. يمكنك إضافة ما يصل إلى 5 خطوات.'
                    : 'Leave a step field empty to remove it. You can add up to 5 steps.'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-6 border-t-2 border-gray-200">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (locale === 'ar' ? '💾 جاري الحفظ...' : '💾 Saving...') : (locale === 'ar' ? '💾 حفظ التغييرات' : '💾 Save Changes')}
              </button>
              <Link href="/" className="px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-all">
                {locale === 'ar' ? '👁️ عرض الموقع' : '👁️ View Site'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
