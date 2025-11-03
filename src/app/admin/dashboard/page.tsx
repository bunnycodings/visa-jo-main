'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import DashboardLayout from '@/components/admin/DashboardLayout';
import TabNavigation from '@/components/admin/TabNavigation';
import { adminTabs } from '@/lib/admin-tabs';

const AdminDashboard = () => {
  const router = useRouter();
  const { locale } = useLanguage();
  const [username, setUsername] = useState('Admin');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
  }, [router]);

  const isRTL = locale === 'ar';

  return (
    <DashboardLayout>
      {/* Tab Navigation */}
      <TabNavigation tabs={adminTabs} />

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 mb-8 text-white mt-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{locale === 'ar' ? `أهلا بعودتك، ${username}! 👋` : `Welcome back, ${username}! 👋`}</h2>
              <p className="text-blue-100">{locale === 'ar' ? 'إدارة محتوى الموقع ومعلومات التأشيرات من مكان واحد' : 'Manage your website content and visa information from one place'}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">{locale === 'ar' ? 'حالة النظام' : 'System Status'}</p>
                    <p className="font-semibold">{locale === 'ar' ? 'جميع الأنظمة تعمل بشكل طبيعي' : 'All Systems Operational'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{locale === 'ar' ? 'إجمالي التأشيرات' : 'Total Visas'}</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{locale === 'ar' ? 'صفحات المحتوى' : 'Content Pages'}</p>
                <p className="text-2xl font-bold text-gray-900">7</p>
              </div>
              <div className="bg-green-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{locale === 'ar' ? 'حالة النظام' : 'System Status'}</p>
                <p className="text-2xl font-bold text-green-600">{locale === 'ar' ? 'مستقر' : 'Stable'}</p>
              </div>
              <div className="bg-green-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{locale === 'ar' ? 'آخر تحديث' : 'Last Updated'}</p>
                <p className="text-lg font-bold text-gray-900">{locale === 'ar' ? 'اليوم' : 'Today'}</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-green-500 w-1 h-6 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">{locale === 'ar' ? 'الروابط السريعة' : 'Quick Links'}</h2>
          </div>
          <p className="text-gray-600 mb-4">{locale === 'ar' ? 'الوصول السريع لصفحات الموقع' : 'Quick access to your website pages'}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-all group"
            >
              <span className="text-2xl">🏠</span>
              <span className="font-medium text-gray-700 group-hover:text-blue-600">{locale === 'ar' ? 'الصفحة الرئيسية' : 'Homepage'}</span>
            </Link>
            <Link
              href="/about"
              target="_blank"
              className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-all group"
            >
              <span className="text-2xl">📄</span>
              <span className="font-medium text-gray-700 group-hover:text-blue-600">{locale === 'ar' ? 'حول' : 'About Page'}</span>
            </Link>
            <Link
              href="/services"
              target="_blank"
              className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-all group"
            >
              <span className="text-2xl">🎁</span>
              <span className="font-medium text-gray-700 group-hover:text-blue-600">{locale === 'ar' ? 'الخدمات' : 'Services'}</span>
            </Link>
            <Link
              href="/contact"
              target="_blank"
              className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-all group"
            >
              <span className="text-2xl">✉️</span>
              <span className="font-medium text-gray-700 group-hover:text-blue-600">{locale === 'ar' ? 'اتصل بنا' : 'Contact'}</span>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
