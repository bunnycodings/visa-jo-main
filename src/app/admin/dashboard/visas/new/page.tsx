'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import VisaEditForm from '@/components/admin/VisaEditForm';

const NewVisaPage = () => {
  const router = useRouter();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Visa</h1>
        <p className="text-gray-600">Create a new visa type with all details</p>
      </div>
      
      <VisaEditForm />
    </div>
  );
};

export default NewVisaPage;