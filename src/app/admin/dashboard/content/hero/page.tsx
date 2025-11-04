'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useContentRefresh } from '@/context/ContentRefreshContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import TabNavigation from '@/components/admin/TabNavigation';
import { adminTabs } from '@/lib/admin-tabs';

interface HeroFormState {
  bannerText?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage?: string;
  isActive: boolean;
}

export default function AdminHeroContentPage() {
  const [form, setForm] = useState<HeroFormState>({
    bannerText: '',
    title: '',
    subtitle: '',
    ctaText: '',
    ctaHref: '/services',
    backgroundImage: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [fileInput, setFileInput] = useState<File | null>(null);
  const router = useRouter();
  const { triggerRefresh } = useContentRefresh();
  // English admin - force English only
  const isRTL = false;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchContent = async () => {
      try {
        const res = await fetch('/api/admin/content/hero', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error(`Failed to load content (${res.status})`);
        }
        const data = await res.json();
        setForm({
          bannerText: data.bannerText || '',
          title: data.title || '',
          subtitle: data.subtitle || '',
          ctaText: data.ctaText || '',
          ctaHref: data.ctaHref || '/services',
          backgroundImage: data.backgroundImage || '',
          isActive: data.isActive ?? true,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [router]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileInput(file);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!fileInput) {
      setError('Please select an image');
      return;
    }

    setUploading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', fileInput);
      formData.append('category', 'backgrounds');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || (locale === 'ar' ? 'فشل تحميل الصورة' : 'Failed to upload image'));
      }

      const data = await res.json();
      setForm((prev) => ({ ...prev, backgroundImage: data.url }));
      setFileInput(null);
      setSuccess(locale === 'ar' ? 'تم تحميل الصورة بنجاح' : 'Image uploaded successfully');
      
      // Reset file input
      const input = document.getElementById('image-upload') as HTMLInputElement;
      if (input) input.value = '';
    } catch (err: any) {
      setError(err.message || (locale === 'ar' ? 'فشل تحميل الصورة' : 'Failed to upload image'));
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/content/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bannerText: form.bannerText?.trim() || undefined,
          title: form.title.trim(),
          subtitle: form.subtitle.trim(),
          ctaText: form.ctaText.trim(),
          ctaHref: form.ctaHref.trim(),
          backgroundImage: form.backgroundImage?.trim() || undefined,
          isActive: form.isActive
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || (locale === 'ar' ? 'فشل حفظ المحتوى' : 'Failed to save content'));
      }
      setSuccess(locale === 'ar' ? 'تم تحديث المحتوى بنجاح' : 'Hero content updated successfully');
      triggerRefresh();
    } catch (err: any) {
      setError(err.message || (locale === 'ar' ? 'فشل حفظ المحتوى' : 'Failed to save content'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <TabNavigation tabs={adminTabs} />
      <div className="max-w-5xl mx-auto mt-6">

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#145EFF] p-3 rounded-xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{locale === 'ar' ? 'تحرير البانر الرئيسي' : 'Edit Homepage Hero'}</h1>
              <p className="text-gray-600 mt-1">{locale === 'ar' ? 'تحديث قسم البانر الرئيسي' : 'Update the main banner section'}</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">{locale === 'ar' ? 'جاري تحميل المحتوى...' : 'Loading content...'}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-600 text-red-800 rounded-md">
                  <span className="font-semibold">{error}</span>
                </div>
              )}
              {success && (
                <div className="p-4 bg-green-50 border-l-4 border-green-600 text-green-800 rounded-md">
                  <span className="font-semibold">{success}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{locale === 'ar' ? 'نص البانر (صغير)' : 'Banner Text (small)'}</label>
                <input
                  type="text"
                  name="bannerText"
                  value={form.bannerText}
                  onChange={onChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={locale === 'ar' ? 'موثوق به من قبل آلاف المسافرين' : 'Trusted by thousands of travelers'}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{locale === 'ar' ? 'العنوان' : 'Title'}</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={locale === 'ar' ? 'خدمات التأشيرات السريعة والموثوقة' : 'Fast, Easy, and Reliable Visa Services from Jordan'}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">{locale === 'ar' ? 'الوصف الفرعي' : 'Subtitle'}</label>
                <textarea
                  name="subtitle"
                  value={form.subtitle}
                  onChange={onChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder={locale === 'ar' ? 'قدم طلبك للحصول على التأشيرة...' : 'Apply for your travel visa online...'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{locale === 'ar' ? 'نص الزر' : 'CTA Text'}</label>
                  <input
                    type="text"
                    name="ctaText"
                    value={form.ctaText}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder={locale === 'ar' ? 'ابدأ الآن' : 'Apply Now'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">{locale === 'ar' ? 'رابط الزر' : 'CTA Link'}</label>
                  <input
                    type="text"
                    name="ctaHref"
                    value={form.ctaHref}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="/services"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {locale === 'ar' ? 'صورة الخلفية' : 'Background Image'}
                </h3>

                <div className="space-y-4">
                  {/* File Upload Input */}
                  <div className="flex gap-3">
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="flex-1 px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg text-gray-900 bg-white cursor-pointer hover:border-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleUpload}
                      disabled={!fileInput || uploading}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 font-semibold transition-all"
                    >
                      {uploading ? (locale === 'ar' ? 'جاري التحميل...' : 'Uploading...') : (locale === 'ar' ? 'تحميل' : 'Upload')}
                    </button>
                  </div>

                  {/* Current Image Preview */}
                  {form.backgroundImage && (
                    <div className="relative">
                      <p className="text-sm text-gray-600 mb-2">{locale === 'ar' ? 'الصورة الحالية:' : 'Current Image:'}</p>
                      <div className="relative h-40 rounded-lg overflow-hidden border-2 border-gray-300 bg-gray-100">
                        <img
                          src={form.backgroundImage}
                          alt="Background"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, backgroundImage: '' }))}
                          className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-all"
                        >
                          {locale === 'ar' ? 'حذف' : 'Delete'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 break-all">{form.backgroundImage}</p>
                    </div>
                  )}

                  {/* Manual URL Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">{locale === 'ar' ? 'أو أدخل رابط الصورة يدويا' : 'Or enter image URL manually'}</label>
                    <input
                      type="text"
                      name="backgroundImage"
                      value={form.backgroundImage}
                      onChange={onChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="https://... or /uploads/backgrounds/..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={form.isActive}
                  onChange={onToggle}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-900">{locale === 'ar' ? 'عرض هذا القسم على الصفحة الرئيسية' : 'Show this section on the homepage'}</label>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#145EFF] text-white rounded-lg hover:bg-[#145EFF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 font-semibold shadow-md hover:shadow-lg transition-all"
                  disabled={saving}
                >
                  {saving ? (locale === 'ar' ? 'جاري الحفظ...' : 'Saving...') : (locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
