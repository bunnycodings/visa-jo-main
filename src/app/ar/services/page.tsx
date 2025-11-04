'use client';

import type { ServicesContent } from '@/types/models/SiteContent';
import { defaultServicesContent } from '@/types/models/SiteContent';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function ArabicServicesPage() {
  const { t } = useLanguage();
  // Static list of visa services for static export
  const staticVisas = [
    { country: 'uae', name: 'UAE Visa' },
    { country: 'uk', name: 'UK Visa' },
    { country: 'us', name: 'US Visa' },
    { country: 'canada', name: 'Canada Visa' },
    { country: 'australia', name: 'Australia Visa' },
    { country: 'india', name: 'India Visa' },
    { country: 'germany', name: 'Germany Visa' },
    { country: 'france', name: 'France Visa' },
    { country: 'netherlands', name: 'Netherlands Visa' },
    { country: 'spain', name: 'Spain Visa' },
    { country: 'italy', name: 'Italy Visa' },
    { country: 'austria', name: 'Austria Visa' },
  ];

  // Use default content for static export
  const title = t('services.title');
  const items = defaultServicesContent.items;

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-cyan-300 font-medium">{t('services.title')}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
        </div>

        {/* Visa Services Dropdown Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19,6H17V4A1,1 0 0,0 16,3H8A1,1 0 0,0 7,4V6H5A3,3 0 0,0 2,9V19A3,3 0 0,0 5,22H19A3,3 0 0,0 22,19V9A3,3 0 0,0 19,6M9,6H15V5H9V6Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{t('services.availableVisaServices')}</h2>
                <p className="text-blue-100">{t('services.selectDestination')}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {staticVisas.map((visa) => (
                <Link
                  key={visa.name}
                  href={`/ar/visa/${visa.country}`}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transition-all border border-white/20 hover:border-white/40"
                >
                  <div className="text-3xl mb-2">{getCountryFlag(visa.country)}</div>
                  <div className="text-sm font-medium">{t(`countries.${visa.country}`)}</div>
                  <div className="text-xs text-blue-100 mt-1">{t('visas.visa')} {t(`countries.${visa.country}`)}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {items.map((item, idx: number) => (
            <div key={idx} className="group bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-4xl">{item.icon}</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.category}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
              {item.features && item.features.length > 0 && (
                <ul className="space-y-3">
                  {item.features.map((f: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-start gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9,16.17L4.83,12l-1.42,1.41L9,19L21,7l-1.41-1.41L9,16.17Z" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    uae: '🇦🇪',
    uk: '🇬🇧',
    us: '🇺🇸',
    canada: '🇨🇦',
    australia: '🇦🇺',
    india: '🇮🇳',
    cyprus: '🇨🇾',
    brazil: '🇧🇷',
    oman: '🇴🇲',
    germany: '🇩🇪',
    france: '🇫🇷',
    netherlands: '🇳🇱',
    spain: '🇪🇸',
    italy: '🇮🇹',
    austria: '🇦🇹',
  };
  return flags[country] || '🌍';
}

