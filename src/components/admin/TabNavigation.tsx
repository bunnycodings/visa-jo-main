'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

interface TabItem {
  id: string;
  href: string;
  label: { en: string; ar: string };
  icon: React.ReactNode;
  children?: TabItem[];
}

interface TabNavigationProps {
  tabs: TabItem[];
  showSubTabs?: boolean;
}

export default function TabNavigation({ tabs, showSubTabs = true }: TabNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLanguage();
  const isRTL = locale === 'ar';

  const activeTab = tabs.find(tab => {
    if (tab.href === pathname) return true;
    if (tab.children) {
      return tab.children.some(child => pathname?.startsWith(child.href));
    }
    return pathname?.startsWith(tab.href);
  });

  const activeSubTabs = activeTab?.children || [];

  const isActive = (href: string) => {
    if (href === pathname) return true;
    return pathname?.startsWith(href);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      {/* Main Tabs */}
      <div className="max-w-full overflow-x-auto">
        <nav className={`flex ${isRTL ? 'flex-row-reverse' : ''} border-b border-gray-200`} aria-label="Main navigation">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={`
                group relative flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap
                ${
                  isActive(tab.href)
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <span className={isActive(tab.href) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}>
                {tab.icon}
              </span>
              <span>{tab.label[locale as 'en' | 'ar']}</span>
              {isActive(tab.href) && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Sub Tabs */}
      {showSubTabs && activeSubTabs.length > 0 && (
        <div className="max-w-full overflow-x-auto bg-gray-50">
          <nav className={`flex ${isRTL ? 'flex-row-reverse' : ''}`} aria-label="Sub navigation">
                  {activeSubTabs.map((subTab) => (
                <Link
                  key={subTab.id}
                  href={subTab.href}
                  className={`
                    group relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap
                    ${
                      isActive(subTab.href)
                        ? 'border-blue-600 text-blue-600 bg-white'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  {subTab.icon && (
                    <span className={isActive(subTab.href) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}>
                      {subTab.icon}
                    </span>
                  )}
                  <span>{subTab.label[locale as 'en' | 'ar']}</span>
                  {isActive(subTab.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </Link>
              ))}
          </nav>
        </div>
      )}
    </div>
  );
}

