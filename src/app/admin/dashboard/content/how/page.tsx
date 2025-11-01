"use client";
import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useContentRefresh } from '@/context/ContentRefreshContext';
import Link from 'next/link';

interface StepInput {
  title: string;
}

export default function EditHowItWorksPage() {
  const { token } = useAdminAuth();
  const { triggerRefresh } = useContentRefresh();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState<StepInput[]>([{ title: '' }, { title: '' }, { title: '' }, { title: '' }, { title: '' }]);

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
          throw new Error('Failed to load content');
        }
        const data = await res.json();
        console.log('Fetched data:', data);
        setTitle(data.title || '');
        // Ensure exactly 5 steps - pad with empty steps if needed
        const fetchedSteps = Array.isArray(data.steps) && data.steps.length ? data.steps.slice(0, 5) : [];
        const paddedSteps = [
          fetchedSteps[0] || { title: '' },
          fetchedSteps[1] || { title: '' },
          fetchedSteps[2] || { title: '' },
          fetchedSteps[3] || { title: '' },
          fetchedSteps[4] || { title: '' },
        ];
        setSteps(paddedSteps);
      } catch (e: any) {
        console.error('Error loading content:', e);
        setError(e.message || 'Error loading content');
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [token]);

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);
      const res = await fetch('/api/admin/content/how', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, steps }),
      });
      if (!res.ok) throw new Error('Failed to save content');
      await res.json();
      
      // Auto-refresh the data after saving
      const refreshRes = await fetch('/api/admin/content/how', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (refreshRes.ok) {
        const data = await refreshRes.json();
        setTitle(data.title || '');
        // Ensure exactly 5 steps - pad with empty steps if needed
        const fetchedSteps = Array.isArray(data.steps) && data.steps.length ? data.steps.slice(0, 5) : [];
        const paddedSteps = [
          fetchedSteps[0] || { title: '' },
          fetchedSteps[1] || { title: '' },
          fetchedSteps[2] || { title: '' },
          fetchedSteps[3] || { title: '' },
          fetchedSteps[4] || { title: '' },
        ];
        setSteps(paddedSteps);
      }
      
      triggerRefresh();
      alert('Saved successfully');
    } catch (e: any) {
      setError(e.message || 'Error saving content');
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
          <h1 className="text-2xl font-semibold text-white">Edit How It Works</h1>
          <Link href="/admin/dashboard" className="text-blue-400 underline">Back to Dashboard</Link>
        </div>

        {loading && <p className="text-gray-400">Loading content...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && (
          <div className="space-y-6 bg-gray-900 p-8 rounded-lg">
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Steps (5 Steps)</label>
              <div className="space-y-4 mt-3">
                {steps.map((step, idx) => (
                  <div key={`step-${idx}-${step.title.slice(0, 10)}`} className="p-3 bg-gray-800 border border-gray-700 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-300">Step {idx + 1}</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Step title"
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
