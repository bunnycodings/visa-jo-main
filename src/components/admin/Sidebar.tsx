'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface NavItem {
  href: string;
  label: { en: string; ar: string };
  icon: React.ReactNode;
  badge?: number;
  children?: NavItem[];
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  const navItems: NavItem[] = [
    {
      href: '/admin/dashboard',
      label: { en: 'Dashboard', ar: 'لوحة التحكم' },
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      href: '/admin/dashboard/visas',
      label: { en: 'Visas', ar: 'التأشيرات' },
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      ),
    },
    {
      href: '#',
      label: { en: 'Content', ar: 'المحتوى' },
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      children: [
        { href: '/admin/dashboard/content/hero', label: { en: 'Hero', ar: 'البانر الرئيسي' }, icon: null },
        { href: '/admin/dashboard/content/popular', label: { en: 'Destinations', ar: 'الوجهات' }, icon: null },
        { href: '/admin/dashboard/content/how', label: { en: 'How It Works', ar: 'كيفية العمل' }, icon: null },
        { href: '/admin/dashboard/content/services', label: { en: 'Services', ar: 'الخدمات' }, icon: null },
        { href: '/admin/dashboard/content/about', label: { en: 'About', ar: 'حول' }, icon: null },
        { href: '/admin/dashboard/content/contact', label: { en: 'Contact', ar: 'اتصل بنا' }, icon: null },
        { href: '/admin/dashboard/content/metadata', label: { en: 'SEO Metadata', ar: 'بيانات SEO' }, icon: null },
      ],
    },
    {
      href: '/admin/dashboard/account',
      label: { en: 'Settings', ar: 'الإعدادات' },
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className={`fixed ${isRTL ? 'right-0' : 'left-0'} top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-40 shadow-lg`}>
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Visa Jo</h1>
            <p className="text-xs text-gray-500">{locale === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {item.label[locale as 'en' | 'ar']}
                  </div>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive(child.href)
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {child.icon && <span className="text-gray-400">{child.icon}</span>}
                      <span>{child.label[locale as 'en' | 'ar']}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={isActive(item.href) ? 'text-blue-600' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label[locale as 'en' | 'ar']}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <div className="px-3">
          <LanguageSwitcher />
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>{locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
        </button>
      </div>
    </div>
  );
}

