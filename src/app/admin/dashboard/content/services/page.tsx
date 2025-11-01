'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { ServicesContent, ServiceItem } from '@/types/models/SiteContent';

export default function EditServicesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [content, setContent] = useState<ServicesContent | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    (async () => {
      try {
        const res = await fetch('/api/admin/content/services', {
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
        setError('Could not load Services content');
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  function updateField<K extends keyof ServicesContent>(key: K, value: ServicesContent[K]) {
    if (!content) return;
    setContent({ ...content, [key]: value });
  }

  function updateItem(index: number, field: keyof ServiceItem, value: any) {
    if (!content) return;
    const next = [...content.items];
    next[index] = { ...next[index], [field]: value };
    setContent({ ...content, items: next });
  }

  function addItem() {
    if (!content) return;
    setContent({ ...content, items: [...content.items, { category: '', icon: '', description: '', features: [] }] });
  }

  function removeItem(index: number) {
    if (!content) return;
    setContent({ ...content, items: content.items.filter((_, i) => i !== index) });
  }

  function addFeature(index: number) {
    if (!content) return;
    const next = [...content.items];
    const features = next[index].features || [];
    next[index].features = [...features, ''];
    setContent({ ...content, items: next });
  }

  function updateFeature(index: number, fi: number, value: string) {
    if (!content) return;
    const next = [...content.items];
    const features = [...(next[index].features || [])];
    features[fi] = value;
    next[index].features = features;
    setContent({ ...content, items: next });
  }

  function removeFeature(index: number, fi: number) {
    if (!content) return;
    const next = [...content.items];
    next[index].features = (next[index].features || []).filter((_, i) => i !== fi);
    setContent({ ...content, items: next });
  }

  async function handleSave() {
    if (!content) return;
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/content/services', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error('Failed to save content');
      
      // Auto-refresh the data after saving
      const refreshRes = await fetch('/api/admin/content/services', {
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
          <h1 className="text-2xl font-bold mb-4 text-white">Edit Services Page</h1>
          <Link href="/admin/dashboard" className="text-blue-400 hover:text-blue-300 underline">Back to Dashboard</Link>
        </div>

        {success && <div className="p-3 bg-green-900 text-green-300 rounded">{success}</div>}
        {error && <div className="p-3 bg-red-900 text-red-300 rounded">{error}</div>}

        <div className="bg-gray-900 p-8 rounded-lg space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" value={content.title}
                   onChange={(e) => updateField('title', e.target.value)} />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-300">Service Items</label>
              <button onClick={addItem} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Add</button>
            </div>
          </div>

          <div className="space-y-4">
            {content.items.map((item, idx) => (
              <div key={idx} className="bg-gray-800 border border-gray-700 p-4 rounded">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input className="bg-gray-700 text-white border border-gray-600 px-3 py-2 rounded" placeholder="Category" value={item.category}
                         onChange={(e) => updateItem(idx, 'category', e.target.value)} />
                  <input className="bg-gray-700 text-white border border-gray-600 px-3 py-2 rounded" placeholder="Icon (emoji)" value={item.icon}
                         onChange={(e) => updateItem(idx, 'icon', e.target.value)} />
                  <input className="bg-gray-700 text-white border border-gray-600 px-3 py-2 rounded" placeholder="Description" value={item.description}
                         onChange={(e) => updateItem(idx, 'description', e.target.value)} />
                  <input className="bg-gray-700 text-white border border-gray-600 px-3 py-2 rounded" placeholder="Href" value={item.href || ''}
                         onChange={(e) => updateItem(idx, 'href', e.target.value)} />
                </div>

                <div className="mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-300">Features</span>
                    <button onClick={() => addFeature(idx)} className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add Feature</button>
                  </div>
                  <div className="space-y-2">
                    {(item.features || []).map((f, fi) => (
                      <div key={fi} className="flex gap-2">
                        <input className="flex-1 bg-gray-700 text-white border border-gray-600 px-3 py-2 rounded" placeholder="Feature" value={f}
                               onChange={(e) => updateFeature(idx, fi, e.target.value)} />
                        <button onClick={() => removeFeature(idx, fi)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Remove</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-right mt-3">
                  <button onClick={() => removeItem(idx)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Remove Item</button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Primary CTA Text</label>
              <input className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" value={content.ctaPrimaryText || ''}
                     onChange={(e) => updateField('ctaPrimaryText', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Primary CTA Href</label>
              <input className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" value={content.ctaPrimaryHref || ''}
                     onChange={(e) => updateField('ctaPrimaryHref', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Secondary CTA Text</label>
              <input className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" value={content.ctaSecondaryText || ''}
                     onChange={(e) => updateField('ctaSecondaryText', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Secondary CTA Href</label>
              <input className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded" value={content.ctaSecondaryHref || ''}
                     onChange={(e) => updateField('ctaSecondaryHref', e.target.value)} />
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
