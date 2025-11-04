'use client';

import { VisaType } from '@/types/models/VisaApplication';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';

interface VisaDetailsProps {
  country: string;
  title?: string;
  visas: VisaType[];
}

// Helper function to get country name in current language
const getCountryName = (countryCode: string, locale: string): string => {
  const countryMap: Record<string, { en: string; ar: string }> = {
    uae: { en: 'UAE', ar: 'الإمارات العربية المتحدة' },
    uk: { en: 'UK', ar: 'المملكة المتحدة' },
    us: { en: 'USA', ar: 'الولايات المتحدة' },
    canada: { en: 'Canada', ar: 'كندا' },
    australia: { en: 'Australia', ar: 'أستراليا' },
    india: { en: 'India', ar: 'الهند' },
    germany: { en: 'Germany', ar: 'ألمانيا' },
    france: { en: 'France', ar: 'فرنسا' },
    netherlands: { en: 'Netherlands', ar: 'هولندا' },
    spain: { en: 'Spain', ar: 'إسبانيا' },
    italy: { en: 'Italy', ar: 'إيطاليا' },
    austria: { en: 'Austria', ar: 'النمسا' },
  };
  
  const country = countryMap[countryCode.toLowerCase()];
  if (!country) return countryCode.toUpperCase();
  return locale === 'ar' ? country.ar : country.en;
};

// Client component that uses language context
export default function VisaDetails({ country, title, visas }: VisaDetailsProps) {
  const { locale, t } = useLanguage();
  const isRTL = locale === 'ar';

  // Helper function to get translated content from visa data Arabic fields
  const getTranslatedContent = (visa: VisaType, field: string, defaultValue: string): string => {
    if (locale === 'ar') {
      switch (field) {
        case 'name': return visa.nameAr || defaultValue;
        case 'description': return visa.descriptionAr || defaultValue;
        case 'embassyInfo': return visa.embassyInfoAr || defaultValue;
        case 'embassyAppointment': return visa.embassyAppointmentAr || defaultValue;
        case 'mainRequirements': return visa.mainRequirementsAr || defaultValue;
        case 'notes': return visa.notesAr || defaultValue;
        case 'processingTime': return visa.processingTimeAr || defaultValue;
        case 'validity': return visa.validityAr || defaultValue;
        default: return defaultValue;
      }
    }
    return defaultValue;
  };

  if (!visas.length) {
    return (
      <div className={`bg-white min-h-screen flex items-center justify-center px-4 ${isRTL ? 'rtl' : ''}`}>
        <div className="text-center max-w-2xl">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#145EFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('visas.noVisasAvailable')}</h2>
          <p className="text-gray-600 text-lg mb-8">{t('visas.noVisasMessage')}</p>
          <a href="/" className="inline-block px-8 py-3 bg-[#145EFF] text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
            {t('visas.backToHome')}
          </a>
        </div>
      </div>
    );
  }

  // Get hero image from first visa if available
  const heroImage = visas.length > 0 && visas[0].heroImage ? visas[0].heroImage : null;

  return (
    <main className={`bg-white min-h-screen ${isRTL ? 'rtl' : ''}`}>
      {/* Hero Header - Matching index page style */}
      <header className="relative py-20 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
        {/* Hero Image Background */}
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={heroImage}
              alt={`${getCountryName(country, locale)} visa hero`}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/50 to-indigo-50/50"></div>
          </div>
        )}
        
        {/* Background decoration - matching WhyChooseUs */}
        {!heroImage && (
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 shadow-sm">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              <span className="text-blue-600 font-semibold text-sm">{t('visas.title')}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
              {title || (locale === 'ar' 
                ? `${t('visas.title')} - ${getCountryName(country, locale)}`
                : `${t('visas.title')} for ${getCountryName(country, locale)}`)}
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
              {t('visas.professionalGuidance')}
            </p>
          </div>
        </div>
      </header>

      {/* Visas Container - Matching index page sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {visas.map((visa) => (
            <article key={visa.name} className="group">
              {/* Main Visa Card - Matching WhyChooseUs card style */}
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:border-blue-300 overflow-hidden">
                
                {/* Card Header with Hero Image Behind Title */}
                <header className="mb-8 pb-6 border-b border-gray-200 relative">
                  <div className={`flex items-start justify-between gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-1 relative">
                      {/* Hero Image Behind Title */}
                      {visa.heroImage && (
                        <div className="absolute -inset-4 -z-10 overflow-hidden rounded-xl opacity-10">
                          <img
                            src={visa.heroImage}
                            alt={`${visa.name} background`}
                            className="w-full h-full object-cover blur-[4.4px]"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight relative z-10">
                        {getTranslatedContent(visa, 'name', visa.name)}
                      </h2>
                      {visa.description && (
                        <p className="text-gray-700 leading-relaxed text-lg relative z-10">
                          {getTranslatedContent(visa, 'description', visa.description)}
                        </p>
                      )}
                    </div>
                  </div>
                </header>

                {/* Card Body */}
                <div>
                  
                  {/* Embassy Information */}
                  {visa.embassyInfo && (
                    <section className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200" aria-labelledby={`embassy-info-${visa.name}`}>
                      <h3 id={`embassy-info-${visa.name}`} className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="relative" aria-hidden="true">
                          <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                          <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                            </svg>
                          </div>
                        </div>
                        {t('visas.embassyInfo')}
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line ml-20 text-lg">
                        {getTranslatedContent(visa, 'embassyInfo', visa.embassyInfo)}
                      </p>
                    </section>
                  )}

                  {/* Embassy Appointment */}
                  {visa.embassyAppointment && (
                    <section className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200" aria-labelledby={`embassy-appointment-${visa.name}`}>
                      <h3 id={`embassy-appointment-${visa.name}`} className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="relative" aria-hidden="true">
                          <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                          <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6C21,4.9 20.1,4 19,4M19,20H5V9H19V20M5,8V6H19V8H5Z" />
                            </svg>
                          </div>
                        </div>
                        {t('visas.embassyAppointment')}
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line ml-20 text-lg">
                        {getTranslatedContent(visa, 'embassyAppointment', visa.embassyAppointment)}
                      </p>
                    </section>
                  )}

                  {/* Main Requirements */}
                  {visa.mainRequirements && (
                    <section className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200" aria-labelledby={`main-requirements-${visa.name}`}>
                      <h3 id={`main-requirements-${visa.name}`} className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="relative" aria-hidden="true">
                          <div className="absolute -inset-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                          <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9,10A1,1 0 0,0 8,11V18H10V11A1,1 0 0,0 9,10M12,5A1,1 0 0,0 11,6V18H13V6A1,1 0 0,0 12,5M15,15A1,1 0 0,0 14,16V18H16V16A1,1 0 0,0 15,15Z" />
                            </svg>
                          </div>
                        </div>
                        {t('visas.mainRequirements')}
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line ml-20 text-lg">
                        {getTranslatedContent(visa, 'mainRequirements', visa.mainRequirements)}
                      </p>
                    </section>
                  )}

                  {/* Visa Types */}
                  {visa.visaTypes && visa.visaTypes.length > 0 && (
                    <section className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200" aria-labelledby={`visa-types-${visa.name}`}>
                      <h3 id={`visa-types-${visa.name}`} className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="relative" aria-hidden="true">
                          <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                          <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19,6H17V4A1,1 0 0,0 16,3H8A1,1 0 0,0 7,4V6H5A3,3 0 0,0 2,9V19A3,3 0 0,0 5,22H19A3,3 0 0,0 22,19V9A3,3 0 0,0 19,6M9,6H15V5H9V6Z" />
                            </svg>
                          </div>
                        </div>
                        {t('visas.visaTypes')}
                      </h3>
                      <ul className="space-y-3 ml-20">
                        {visa.visaTypes.map((type, idx) => {
                          const translatedType = (locale === 'ar' && visa.visaTypesAr && visa.visaTypesAr[idx]) 
                            ? visa.visaTypesAr[idx] 
                            : type;
                          return (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1" aria-hidden="true">
                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z" />
                                </svg>
                              </div>
                              <span className="text-gray-700 font-medium text-lg">{translatedType}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  )}
                  
                  {/* Key Details Grid - Matching WhyChooseUs style */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    
                    {/* Processing Time */}
                    <div className="group/card bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:border-blue-300 overflow-hidden">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl blur-lg opacity-0 group-hover/card:opacity-30 transition-opacity duration-500"></div>
                        <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg mb-6 group-hover/card:scale-110 transition-transform duration-500">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12.5,7H11V13L16.2,16.2L17,15.3L12.5,12.1V7Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-2">{t('visas.processingTime')}</div>
                      <div className="text-2xl font-bold text-gray-900">{getTranslatedContent(visa, 'processingTime', visa.processingTime)}</div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>

                    {/* Validity */}
                    <div className="group/card bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:border-blue-300 overflow-hidden">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl blur-lg opacity-0 group-hover/card:opacity-30 transition-opacity duration-500"></div>
                        <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-6 group-hover/card:scale-110 transition-transform duration-500">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-2">{t('visas.validity')}</div>
                      <div className="text-2xl font-bold text-gray-900">{getTranslatedContent(visa, 'validity', visa.validity)}</div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>

                    {/* Visa Fee */}
                    <div className="group/card bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:border-blue-300 overflow-hidden">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl blur-lg opacity-0 group-hover/card:opacity-30 transition-opacity duration-500"></div>
                        <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg mb-6 group-hover/card:scale-110 transition-transform duration-500">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-2">{t('visas.visaFee')}</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {typeof visa.fees.government === 'string' && visa.fees.government.includes('-') 
                          ? (locale === 'ar' 
                              ? `JOD ${visa.fees.government} دينار` 
                              : `JOD ${visa.fees.government}`)
                          : (locale === 'ar' 
                              ? `${Number(visa.fees.government).toFixed(2)} دينار` 
                              : `JOD ${Number(visa.fees.government).toFixed(2)}`)
                        }
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>

                  </div>

                  {/* Requirements Section - Matching index page style */}
                  {visa.requirements && visa.requirements.length > 0 && (
                    <section className="mb-12" aria-labelledby={`requirements-${visa.name}`}>
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 shadow-sm">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                          </svg>
                          <span className="text-blue-600 font-semibold text-sm">{t('visas.requirements')}</span>
                        </div>
                        <h3 id={`requirements-${visa.name}`} className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
                          {t('visas.requirements')} ({visa.requirements.length})
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {visa.requirements.map((req: string, idx: number) => {
                          const translatedReq = (locale === 'ar' && visa.requirementsAr && visa.requirementsAr[idx]) 
                            ? visa.requirementsAr[idx] 
                            : req;
                          return (
                            <div key={idx} className={`flex items-start gap-4 bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <div className="flex-shrink-0 mt-1" aria-hidden="true">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z" />
                                  </svg>
                                </div>
                              </div>
                              <span className="text-gray-900 font-medium leading-relaxed flex-1 text-lg">{translatedReq}</span>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Notes Section - Matching index page style */}
                  {visa.notes && (
                    <aside className="bg-gradient-to-r from-gray-50 to-blue-50 border-t-4 border-blue-600 rounded-lg shadow-sm p-8 mb-8" aria-labelledby={`notes-${visa.name}`}>
                      <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 id={`notes-${visa.name}`} className="font-bold text-gray-900 mb-2 text-xl">{t('visas.importantNotes')}</h4>
                          <p className="text-gray-800 leading-relaxed text-lg">
                            {getTranslatedContent(visa, 'notes', visa.notes || '')}
                          </p>
                        </div>
                      </div>
                    </aside>
                  )}

                  {/* Apply Button - Matching HowItWorks CTA style */}
                  <div className="pt-6 border-t border-gray-200">
                    <a 
                      href="/contact" 
                      className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-[#145EFF] text-white text-lg rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                      aria-label={locale === 'ar' ? `تقديم طلب للحصول على ${visa.name}` : `Apply now for ${visa.name}`}
                    >
                      {t('visas.applyNow')}
                      <svg className={`ml-2 h-5 w-5 ${isRTL ? 'mr-2 ml-0 rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>

                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section - Matching HowItWorks CTA style */}
        <section className="mt-16" aria-labelledby="cta-heading">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t-4 border-blue-600 rounded-lg shadow-sm p-10 max-w-3xl mx-auto text-center">
            <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{t('visas.readyToStart')}</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{t('visas.expertTeam')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="px-6 py-3 bg-[#145EFF] text-white text-lg rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                aria-label={locale === 'ar' ? 'تواصل معنا لتقديم طلب التأشيرة' : 'Contact us to apply for a visa'}
              >
                {t('common.contactUs')}
              </a>
              <a 
                href="/" 
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 text-lg rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold"
                aria-label={locale === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Return to home page'}
              >
                {t('visas.backToHome')}
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
