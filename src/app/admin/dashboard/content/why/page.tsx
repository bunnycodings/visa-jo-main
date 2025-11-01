"use client";
import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useContentRefresh } from '@/context/ContentRefreshContext';
import Link from 'next/link';

interface FeatureInput {
  title: string;
  description: string;
}

export default function EditWhyChooseUsPage() {
  const { token } = useAdminAuth();
  const { triggerRefresh } = useContentRefresh();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [badgeText, setBadgeText] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [features, setFeatures] = useState<FeatureInput[]>([{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }]);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/content/why', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to load content');
        const data = await res.json();
        setBadgeText(data.badgeText || '');
        setTitle(data.title || '');
        setSubtitle(data.subtitle || '');
        setFeatures(
          Array.isArray(data.features) && data.features.length
            ? data.features.map((f: any) => ({ title: f.title || '', description: f.description || '' }))
            : features
        );
      } catch (e: any) {
        setError(e.message || 'Error loading content');
      } finally {
        setLoading(false);
      }
    }
    if (token) fetchContent();
  }, [token]);

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
        body: JSON.stringify({ badgeText, title, subtitle, features }),
      });
      if (!res.ok) throw new Error('Failed to save content');
      await res.json();
      
      // Auto-refresh the data after saving
      const refreshRes = await fetch('/api/admin/content/why', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (refreshRes.ok) {
        const data = await refreshRes.json();
        setBadgeText(data.badgeText || '');
        setTitle(data.title || '');
        setSubtitle(data.subtitle || '');
        setFeatures(Array.isArray(data.features) && data.features.length ? data.features : features);
      }
      
      triggerRefresh();
      alert('Saved successfully');
    } catch (e: any) {
      setError(e.message || 'Error saving content');
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

  if (!token) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-black text-white">
        <p className="text-red-400">You must be logged in as admin to edit content.</p>
        <Link href="/admin/login" className="text-blue-400 underline">Go to Admin Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-white">Edit "Why Choose Us" Section</h1>
          <Link href="/admin/dashboard" className="text-blue-400 underline">Back to Dashboard</Link>
        </div>

        {loading && <p className="text-gray-400">Loading content...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && (
          <div className="space-y-6 bg-gray-900 p-8 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Badge Text</label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Features (3 Features)</label>
              <div className="space-y-4 mt-3">
                {features.map((f, idx) => (
                  <div key={idx} className="p-3 bg-gray-800 border border-gray-700 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-300">Feature {idx + 1}</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Feature Title"
                      value={f.title}
                      onChange={(e) => updateFeature(idx, 'title', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                    <textarea
                      placeholder="Feature Description"
                      value={f.description}
                      onChange={(e) => updateFeature(idx, 'description', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
                      rows={3}
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
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <Link href="/" className="text-gray-400 hover:text-white underline">View Homepage</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
