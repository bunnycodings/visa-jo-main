"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VisaEditButton({ name }: { name: string }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      setIsAdmin(Boolean(token));
    } catch {
      setIsAdmin(false);
    }
  }, []);

  if (!isAdmin) return null;

  return (
    <Link
      href={`/admin/dashboard/visas/edit/${encodeURIComponent(name)}`}
      className="inline-flex items-center px-3 py-1 text-sm bg-amber-600 text-white rounded hover:bg-amber-700"
      title={`Edit ${name}`}
    >
      Edit
      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5h2M5 7h14M5 12h14M5 17h14" />
      </svg>
    </Link>
  );
}