'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { AboutContent, AboutWhyItem } from '@/types/models/SiteContent';

export default function EditAboutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    (async () => {
      try {
        const res = await fetch('/api/admin/content/about', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          if (res.status === 401) { router.push('/admin/login'); return; }
          throw new Error('Failed to load content');
        }
        const data = await res.json();
        setContent(data);
      } catch (e) {
        console.error(e);
        setError('Could not load About content');
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  function updateField<K extends keyof AboutContent>(key: K, value: AboutContent[K]) {
    if (!content) return;
    setContent({ ...content, [key]: value });
  }

  function updateWhyItem(index: number, field: keyof AboutWhyItem, value: string) {
    if (!content) return;
    const next = [...content.whyItems];
    next[index] = { ...next[index], [field]: value };
    setContent({ ...content, whyItems: next });
  }

  function addWhyItem() {
    if (!content) return;
    setContent({ ...content, whyItems: [...content.whyItems, { title: '', description: '' }] });
  }

  function removeWhyItem(index: number) {
    if (!content) return;
    const next = content.whyItems.filter((_, i) => i !== index);
    setContent({ ...content, whyItems: next });
  }

  async function handleSave() {
    if (!content) return;
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/content/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error('Failed to save content');
      
      // Auto-refresh the data after saving
      const refreshRes = await fetch('/api/admin/content/about', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (refreshRes.ok) {
        const data = await refreshRes.json();
        setContent(data);
      }
      
      setSuccess('Content saved successfully');
    } catch (e) {
      console.error(e);
      setError('Failed to save content');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-6 bg-black text-white">Loading...</div>;
  if (error) return <div className="p-6 text-red-400 bg-black">{error}</div>;
  if (!content) return <div className="p-6 bg-black text-white">No content</div>;

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4 text-white">Edit About Page</h1>
          <Link href="/admin/dashboard" className="text-blue-400 hover:text-blue-300 underline">Back to Dashboard</Link>
        </div>

        {success && <div className="p-3 bg-green-900 text-green-300 rounded">{success}</div>}
        {error && <div className="p-3 bg-red-900 text-red-300 rounded">{error}</div>}

        <div className="bg-gray-900 p-8 rounded-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" value={content.title}
                     onChange={(e) => updateField('title', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Intro</label>
              <input className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" value={content.intro}
                     onChange={(e) => updateField('intro', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Our Story</label>
            <textarea className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" rows={4} value={content.story}
                      onChange={(e) => updateField('story', e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Why Title</label>
            <input className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" value={content.whyTitle}
                   onChange={(e) => updateField('whyTitle', e.target.value)} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-300">Why Items</label>
              <button onClick={addWhyItem} className="px-3 py-1 bg-[#145EFF] text-white rounded hover:bg-[#145EFF]">Add</button>
            </div>
            <div className="space-y-3">
              {content.whyItems.map((item, idx) => (
                <div key={idx} className="bg-gray-800 border border-gray-700 p-3 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input className="bg-gray-700 text-white border border-gray-600 px-3 py-2 rounded" placeholder="Title" value={item.title}
                           onChange={(e) => updateWhyItem(idx, 'title', e.target.value)} />
                    <input className="bg-gray-700 text-white border border-gray-600 px-3 py-2 rounded" placeholder="Description" value={item.description}
                           onChange={(e) => updateWhyItem(idx, 'description', e.target.value)} />
                  </div>
                  <div className="text-right mt-2">
                    <button onClick={() => removeWhyItem(idx)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mission Title</label>
              <input className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" value={content.missionTitle}
                     onChange={(e) => updateField('missionTitle', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mission Text</label>
              <textarea className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" rows={3} value={content.missionText}
                        onChange={(e) => updateField('missionText', e.target.value)} />
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save Changes</button>
            <button onClick={() => router.push('/admin/dashboard')} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">Back to Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
}
