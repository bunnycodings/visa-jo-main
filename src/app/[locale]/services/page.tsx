'use client';

import type { ServicesContent } from '@/types/models/SiteContent';
import { defaultServicesContent } from '@/types/models/SiteContent';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ServicesPage() {
  const t = useTranslations();
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
  const title = 'Our Services';
  const items = defaultServicesContent.items;

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-cyan-300 font-medium">Our Services</span>
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
                  href={`/visa/${visa.country}`}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transition-all border border-white/20 hover:border-white/40"
                >
                  <div className="text-3xl mb-2">{getCountryFlag(visa.country)}</div>
                  <div className="text-sm font-medium">{visa.country.toUpperCase()}</div>
                  <div className="text-xs text-blue-100 mt-1">{visa.name}</div>
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

        {/* Types Of Visa Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19,6H17V4A1,1 0 0,0 16,3H8A1,1 0 0,0 7,4V6H5A3,3 0 0,0 2,9V19A3,3 0 0,0 5,22H19A3,3 0 0,0 22,19V9A3,3 0 0,0 19,6M9,6H15V5H9V6Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{t('services.visaTypes') || 'Types Of Visa'}</h2>
                <p className="text-blue-100">{t('services.visaTypesDesc') || 'Different visa categories available for your travel needs'}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Tourist Visa</h3>
                <p className="text-blue-100 text-sm">Allows an individual to enter a foreign nation for the purpose of leisure and tourism</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Visitor Visa</h3>
                <p className="text-blue-100 text-sm">For family members or friends who reside outside of the host country</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20,6H16V4A2,2 0 0,0 14,2H10A2,2 0 0,0 8,4V6H4A1,1 0 0,0 3,7V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7A1,1 0 0,0 20,6M10,4H14V6H10V4M19,19H5V8H19V19Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Business Visa</h3>
                <p className="text-blue-100 text-sm">For those planning to conduct business in the host country</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Events Visa</h3>
                <p className="text-blue-100 text-sm">This visa is necessary for participation in cultural, educational, or sporting events or conferences</p>
              </div>
            </div>
          </div>
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
