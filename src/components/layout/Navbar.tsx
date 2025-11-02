'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { getFlagPath } from '@/lib/utils/flags';
import { getServiceIcon } from '@/lib/utils/service-icons';
import { siteConfig } from '@/lib/constants';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const { t, locale } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAdminLoggedIn(!!localStorage.getItem('token'));
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!activeDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const travelVisaItems = [
    { name: 'UAE Visa', href: '/visas/uae' },
    { name: 'UK Visa', href: '/visas/uk' },
    { name: 'US Visa', href: '/visas/us' },
    { name: 'Canada Visa', href: '/visas/canada' },
    { name: 'Australia Visa', href: '/visas/australia' },
    { name: 'India Visa', href: '/visas/india' },
  ];

  const schengenVisaItems = [
    { name: 'Germany Visa', href: '/visas/germany' },
    { name: 'France Visa', href: '/visas/france' },
    { name: 'Netherlands Visa', href: '/visas/netherlands' },
    { name: 'Spain Visa', href: '/visas/spain' },
    { name: 'Italy Visa', href: '/visas/italy' },
    { name: 'Austria Visa', href: '/visas/austria' },
  ];

  const servicesItems = [
    { name: 'Visa Consultations', href: '/services#consultations' },
    { name: 'Certification Translation', href: '/services#translation' },
    { name: 'Insurance', href: '/services#insurance' },
    { name: 'Hotel Bookings', href: '/services#hotels' },
    { name: 'Flight Bookings', href: '/services#flights' },
    { name: 'Trip Plans', href: '/services#trip-plans' },
  ];

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="bg-black/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative">
              <Image
                src="/img/logo/visajo.png"
                alt="Visa Consulting Services"
                width={120}
                height={120}
                priority
                className="h-20 w-auto rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  Visa Consulting
                </span>
                <div className="text-sm text-gray-300 font-medium">
                  {t('navbar.professionalServices')}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              <Link
                href="/"
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-gray-800 relative group"
              >
                {t('common.home')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Travel Visa Dropdown */}
              <div className="relative group dropdown-container">
                <button
                  onClick={() => toggleDropdown('travel')}
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center hover:bg-gray-800 relative"
                >
                  {t('navbar.travelVisa')}
                  <svg 
                    className={`ml-2 h-4 w-4 transition-transform duration-300 ${activeDropdown === 'travel' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </button>
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute left-0 mt-3 w-64 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 py-3 z-50 transition-all duration-300 ${
                    activeDropdown === 'travel' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-3'
                  }`}>
                  <div className="px-4 py-3 border-b border-gray-700">
                    <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center">
                      <span className="mr-2">🌍</span>
                      {t('navbar.travelVisa')}s
                    </h3>
                  </div>
                  {travelVisaItems.map((item) => {
                    const countryName = item.name.split(' ')[0];
                    const flagPath = getFlagPath(countryName);
                    const fallbackUrl = `https://flagcdn.com/w40/${countryName === 'UK' ? 'gb' : countryName.toLowerCase()}.png`;
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-gray-300 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white transition-all duration-200 flex items-center group/item"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <img 
                          src={flagPath} 
                          alt={`${countryName} flag`}
                          className="w-8 h-6 mr-3 object-contain group-hover/item:scale-110 transition-transform duration-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = fallbackUrl;
                          }}
                        />
                        <span className="font-medium">{item.name}</span>
                        <svg className="ml-auto h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Schengen Visas Dropdown */}
              <div className="relative group dropdown-container">
                <button
                  onClick={() => toggleDropdown('schengen')}
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center hover:bg-gray-800 relative"
                >
                  Schengen Visas
                  <svg 
                    className={`ml-2 h-4 w-4 transition-transform duration-300 ${activeDropdown === 'schengen' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </button>
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute left-0 mt-3 w-64 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 py-3 z-50 transition-all duration-300 ${
                    activeDropdown === 'schengen' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-3'
                  }`}>
                  <div className="px-4 py-3 border-b border-gray-700">
                    <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center">
                      <span className="mr-2">🇪🇺</span>
                      {t('navbar.schengenVisa')}
                    </h3>
                  </div>
                  {schengenVisaItems.map((item) => {
                    const countryName = item.name.split(' ')[0];
                    const flagPath = getFlagPath(countryName);
                    const fallbackUrl = `https://flagcdn.com/w40/${countryName === 'UK' ? 'gb' : countryName.toLowerCase()}.png`;
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-gray-300 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white transition-all duration-200 flex items-center group/item"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <img 
                          src={flagPath} 
                          alt={`${countryName} flag`}
                          className="w-8 h-6 mr-3 object-contain group-hover/item:scale-110 transition-transform duration-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = fallbackUrl;
                          }}
                        />
                        <span className="font-medium">{item.name}</span>
                        <svg className="ml-auto h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Our Services Dropdown */}
              <div className="relative group dropdown-container">
                <button
                  onClick={() => toggleDropdown('services')}
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center hover:bg-gray-800 relative"
                >
                  {t('navbar.ourServices')}
                  <svg 
                    className={`ml-2 h-4 w-4 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </button>
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute left-0 mt-3 w-72 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 py-3 z-50 transition-all duration-300 ${
                    activeDropdown === 'services' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-3'
                  }`}>
                  <div className="px-4 py-3 border-b border-gray-700">
                    <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center">
                      <span className="mr-2">⚙️</span>
                      {t('navbar.ourServices')}
                    </h3>
                  </div>
                  {servicesItems.map((item) => {
                    const iconPath = getServiceIcon(item.name);
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm text-gray-300 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white transition-all duration-200 flex items-center group/item"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="w-8 h-8 mr-3 rounded-lg bg-gray-700 flex items-center justify-center group-hover/item:bg-gray-600 transition-colors duration-200">
                          <img 
                            src={iconPath} 
                            alt={`${item.name} icon`}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              // Fallback to SVG if PNG doesn't exist
                              const fallbackMap: Record<string, string> = {
                                'Visa Consultations': '/img/icons/consultation.svg',
                                'Certification Translation': '/img/icons/translation.svg',
                                'Insurance': '/img/icons/insurance.svg',
                                'Hotel Bookings': '/img/icons/hotel.svg',
                                'Flight Bookings': '/img/icons/flight.svg',
                                'Trip Plans': '/img/icons/trip-plan.svg'
                              };
                              (e.target as HTMLImageElement).src = fallbackMap[item.name] || '/img/icons/consultation.svg';
                            }}
                          />
                        </div>
                        <span className="font-medium">{item.name}</span>
                        <svg className="ml-auto h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <Link
                href="/about"
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-gray-800 relative group"
              >
                {t('common.aboutUs')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <a
                href={siteConfig.getTelLink()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:scale-105 relative group flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinecap="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t('common.callUs')}
                <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <div className="ml-[5px]">
                <LanguageSwitcher />
              </div>
              {isAdminLoggedIn && (
                <Link
                  href="/admin/dashboard"
                  className="ml-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-gray-700"
                  title="Admin Dashboard"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white p-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
            >
              <svg className="h-6 w-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-gray-900/95 backdrop-blur-md border-t border-gray-700 shadow-lg max-h-[calc(100vh-96px)] overflow-y-auto">
              <Link
                href="/"
                className="text-gray-300 hover:text-white block px-4 py-3 rounded-lg text-base font-semibold hover:bg-gray-800 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 {t('common.home')}
              </Link>
              
              <div className="space-y-1">
                <div className="text-gray-300 px-4 py-2 text-base font-bold flex items-center">
                  <span className="mr-2">🌍</span>
                  {t('navbar.travelVisa')}
                </div>
                {travelVisaItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-white block px-8 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-1">
                <div className="text-gray-300 px-4 py-2 text-base font-bold flex items-center">
                  <span className="mr-2">🇪🇺</span>
                  {t('navbar.schengenVisa')}
                </div>
                {schengenVisaItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-white block px-8 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-1">
                <div className="text-gray-300 px-4 py-2 text-base font-bold flex items-center">
                  <span className="mr-2">⚙️</span>
                  {t('navbar.ourServices')}
                </div>
                {servicesItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-white block px-8 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.aboutUs')}
              </Link>

              <a
                href={siteConfig.getTelLink()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center px-3 py-3 rounded-md text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 gap-2 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinecap="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t('common.callUs')}
              </a>

              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
              
              {isAdminLoggedIn ? (
                <Link
                  href="/admin/dashboard"
                  className="bg-blue-600 text-white flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 mt-4"
                  onClick={() => setIsMenuOpen(false)}
                  title="Admin Dashboard"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v4H3zM3 9h18v12H3z" />
                  </svg>
                  {t('navbar.adminDashboard')}
                </Link>
              ) : (
                <Link
                  href="/admin/login"
                  className="bg-blue-400 text-white flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 mt-4"
                  onClick={() => setIsMenuOpen(false)}
                  title="Admin Login"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('navbar.adminLogin')}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;