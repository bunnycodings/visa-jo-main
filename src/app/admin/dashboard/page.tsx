'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  const isRTL = locale === 'ar';

  const contentCards = [
    { href: '/admin/dashboard/content/hero', label: locale === 'ar' ? 'بانر الصفحة الرئيسية' : 'Homepage Hero', icon: '🎯', color: 'bg-blue-500', description: locale === 'ar' ? 'تحرير قسم البانر الرئيسي' : 'Edit main banner section' },
    { href: '/admin/dashboard/content/popular', label: locale === 'ar' ? 'الوجهات الشهيرة' : 'Popular Destinations', icon: '🌍', color: 'bg-purple-500', description: locale === 'ar' ? 'إدارة بطاقات الوجهات' : 'Manage destination cards' },
    { href: '/admin/dashboard/content/how', label: locale === 'ar' ? 'كيفية العمل' : 'How It Works', icon: '⚙️', color: 'bg-teal-500', description: locale === 'ar' ? 'تحرير خطوات العملية' : 'Edit process steps' },
    { href: '/admin/dashboard/content/about', label: locale === 'ar' ? 'صفحة حول' : 'About Page', icon: '📝', color: 'bg-amber-500', description: locale === 'ar' ? 'تحديث معلومات الشركة' : 'Update company information' },
    { href: '/admin/dashboard/content/contact', label: locale === 'ar' ? 'صفحة الاتصال' : 'Contact Page', icon: '📞', color: 'bg-lime-500', description: locale === 'ar' ? 'تحرير تفاصيل الاتصال' : 'Edit contact details' },
    { href: '/admin/dashboard/content/services', label: locale === 'ar' ? 'صفحة الخدمات' : 'Services Page', icon: '🛎️', color: 'bg-cyan-500', description: locale === 'ar' ? 'إدارة عروض الخدمات' : 'Manage service offerings' },
    { href: '/admin/dashboard/content/metadata', label: locale === 'ar' ? 'بيانات SEO' : 'Page SEO Metadata', icon: '🔍', color: 'bg-indigo-500', description: locale === 'ar' ? 'إدارة العناوين والكلمات المفتاحية' : 'Manage titles, descriptions & keywords' },
    { href: '/admin/dashboard/visas', label: locale === 'ar' ? 'إدارة التأشيرات' : 'Manage Visas', icon: '✈️', color: 'bg-green-500', description: locale === 'ar' ? 'تحرير معلومات التأشيرات' : 'Edit visa information' },
    { href: '/admin/dashboard/account', label: locale === 'ar' ? 'إعدادات الحساب' : 'Account Settings', icon: '🔐', color: 'bg-orange-500', description: locale === 'ar' ? 'تغيير كلمة المرور وإدارة المستخدمين' : 'Change password & manage users' },
  ];

  const quickLinks = [
    { href: '/', label: locale === 'ar' ? 'الصفحة الرئيسية' : 'Homepage', icon: '🏠' },
    { href: '/about', label: locale === 'ar' ? 'حول' : 'About Page', icon: '📄' },
    { href: '/services', label: locale === 'ar' ? 'الخدمات' : 'Services', icon: '🎁' },
    { href: '/contact', label: locale === 'ar' ? 'اتصل بنا' : 'Contact', icon: '✉️' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{locale === 'ar' ? 'لوحة تحكم المشرف' : 'Admin Dashboard'}</h1>
                <p className="text-sm text-gray-600">{locale === 'ar' ? 'نظام إدارة المحتوى' : 'Content Management System'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{locale === 'ar' ? `أهلا بعودتك، ${username}! 👋` : `Welcome back, ${username}! 👋`}</h2>
              <p className="text-blue-100">{locale === 'ar' ? 'إدارة محتوى الموقع ومعلومات التأشيرات من مكان واحد' : 'Manage your website content and visa information from one place'}</p>
            </div>
            <div className="hidden md:block">
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

        {/* Content Management Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-500 w-1 h-6 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">{locale === 'ar' ? 'إدارة المحتوى' : 'Content Management'}</h2>
          </div>
          <p className="text-gray-600 mb-6">{locale === 'ar' ? 'إدارة أقسام ولوحات الموقع' : 'Manage your website content sections and pages'}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contentCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className={`${card.color} text-2xl p-3 rounded-lg shadow-md group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {card.label}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-blue-600 font-medium group-hover:gap-2 transition-all">
                  {locale === 'ar' ? 'تحرير المحتوى' : 'Edit Content'}
                  <svg className={`w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-green-500 w-1 h-6 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">{locale === 'ar' ? 'الروابط السريعة' : 'Quick Links'}</h2>
          </div>
          <p className="text-gray-600 mb-4">{locale === 'ar' ? 'الوصول السريع لصفحات الموقع' : 'Quick access to your website pages'}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target="_blank"
                className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-all group"
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="font-medium text-gray-700 group-hover:text-blue-600">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;