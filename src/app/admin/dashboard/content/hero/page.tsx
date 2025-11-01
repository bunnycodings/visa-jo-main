'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useContentRefresh } from '@/context/ContentRefreshContext';

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
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter();
  const { triggerRefresh } = useContentRefresh();

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
        throw new Error(err.error || 'Failed to save content');
      }
      setSuccess('Hero content updated successfully');
      triggerRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Homepage Hero</h1>
              <p className="text-gray-600 mt-1">Update the main banner section</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading content...</p>
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
                <label className="block text-sm font-bold text-gray-900 mb-2">Banner Text (small)</label>
                <input
                  type="text"
                  name="bannerText"
                  value={form.bannerText}
                  onChange={onChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Trusted by thousands of travelers"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Fast, Easy, and Reliable Visa Services from Jordan"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Subtitle</label>
                <textarea
                  name="subtitle"
                  value={form.subtitle}
                  onChange={onChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Apply for your travel visa online — 100+ destinations, expert support..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">CTA Text</label>
                  <input
                    type="text"
                    name="ctaText"
                    value={form.ctaText}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Apply Now"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">CTA Link</label>
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

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Background Image URL (optional)</label>
                <input
                  type="text"
                  name="backgroundImage"
                  value={form.backgroundImage}
                  onChange={onChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="https://..."
                />
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
                <label htmlFor="isActive" className="text-sm font-medium text-gray-900">Show this section on the homepage</label>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 font-semibold shadow-md hover:shadow-lg transition-all"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
