'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import VisaEditForm from '@/components/admin/VisaEditForm';
import { VisaType } from '@/types/models/VisaApplication';
import Link from 'next/link';

interface EditVisaPageProps {
  params: Promise<{ name: string }>;
}

const EditVisaPage = ({ params }: EditVisaPageProps) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const visaName = decodeURIComponent(resolvedParams.name);
  
  const [visaData, setVisaData] = useState<VisaType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchVisaData = async () => {
      try {
        const response = await fetch(`/api/admin/visas/${encodeURIComponent(visaName)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/admin/login');
            return;
          }
          throw new Error('Failed to fetch visa data');
        }

        const data = await response.json();
        setVisaData(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load visa data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVisaData();
  }, [visaName, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading visa data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/admin/dashboard/visas" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Visas
          </Link>
          <div className="bg-red-50 border-l-4 border-red-600 text-red-700 p-6 rounded-lg shadow-md">
            <h3 className="font-bold mb-2">Error Loading Visa</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <Link href="/admin/dashboard/visas" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Visas
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-lg shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Visa Details</h1>
                <p className="text-gray-600 mt-1">{visaName}</p>
              </div>
            </div>
          </div>
          
          {visaData && <VisaEditForm visaData={visaData} isEditing={true} />}
        </div>
      </div>
    </div>
  );
};

export default EditVisaPage;