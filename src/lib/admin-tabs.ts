export interface TabItem {
  id: string;
  href: string;
  label: { en: string; ar: string };
  icon: React.ReactNode;
  children?: TabItem[];
}

export const adminTabs: TabItem[] = [
  {
    id: 'dashboard',
    href: '/admin/dashboard',
    label: { en: 'Dashboard', ar: 'لوحة التحكم' },
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'visas',
    href: '/admin/dashboard/visas',
    label: { en: 'Visas', ar: 'التأشيرات' },
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
  {
    id: 'content',
    href: '/admin/dashboard/content/hero',
    label: { en: 'Content', ar: 'المحتوى' },
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    children: [
      { id: 'hero', href: '/admin/dashboard/content/hero', label: { en: 'Hero', ar: 'البانر الرئيسي' }, icon: null },
      { id: 'popular', href: '/admin/dashboard/content/popular', label: { en: 'Destinations', ar: 'الوجهات' }, icon: null },
      { id: 'how', href: '/admin/dashboard/content/how', label: { en: 'How It Works', ar: 'كيفية العمل' }, icon: null },
      { id: 'services', href: '/admin/dashboard/content/services', label: { en: 'Services', ar: 'الخدمات' }, icon: null },
      { id: 'about', href: '/admin/dashboard/content/about', label: { en: 'About', ar: 'حول' }, icon: null },
      { id: 'contact', href: '/admin/dashboard/content/contact', label: { en: 'Contact', ar: 'اتصل بنا' }, icon: null },
      { id: 'metadata', href: '/admin/dashboard/content/metadata', label: { en: 'SEO Metadata', ar: 'بيانات SEO' }, icon: null },
    ],
  },
  {
    id: 'settings',
    href: '/admin/dashboard/account',
    label: { en: 'Settings', ar: 'الإعدادات' },
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

