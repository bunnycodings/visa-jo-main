'use client';

import { VisaType } from '@/types/models/VisaApplication';
import { useLanguage } from '@/context/LanguageContext';

interface VisaDetailsProps {
  country: string;
  title?: string;
  visas: VisaType[];
}

// Client component that uses language context
export default function VisaDetails({ country, title, visas }: VisaDetailsProps) {
  const { locale, t } = useLanguage();
  const isRTL = locale === 'ar';

  if (!visas.length) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4 ${isRTL ? 'rtl' : ''}`}>
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

  return (
    <div className={`bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen ${isRTL ? 'rtl' : ''}`}>
      {/* Hero Header - Matching About/Contact pages */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-cyan-300 font-medium">{title || t('visas.title')}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{title || t('visas.title')}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">{t('visas.professionalGuidance')}</p>
        </div>
      </div>

      {/* Visas Container - Matching About/Contact pages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {visas.map((visa) => (
            <div key={visa.name} className="group">
              {/* Main Visa Card - Matching About page card style */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-300">
                
                {/* Card Header */}
                <div className="mb-8 pb-6 border-b border-gray-200">
                  <div className={`flex items-start justify-between gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">{visa.name}</h2>
                      {visa.description && (
                        <p className="text-gray-700 text-lg leading-relaxed">{visa.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div>
                  
                  {/* Embassy Information */}
                  {visa.embassyInfo && (
                    <div className="mb-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
                          </svg>
                        </div>
                        {t('visas.embassyInfo')}
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line ml-16">{visa.embassyInfo}</p>
                    </div>
                  )}

                  {/* Embassy Appointment */}
                  {visa.embassyAppointment && (
                    <div className="mb-8 bg-purple-50 rounded-xl p-6 border border-purple-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6C21,4.9 20.1,4 19,4M19,20H5V9H19V20M5,8V6H19V8H5Z" />
                          </svg>
                        </div>
                        {t('visas.embassyAppointment')}
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line ml-16">{visa.embassyAppointment}</p>
                    </div>
                  )}

                  {/* Main Requirements */}
                  {visa.mainRequirements && (
                    <div className="mb-8 bg-green-50 rounded-xl p-6 border border-green-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9,10A1,1 0 0,0 8,11V18H10V11A1,1 0 0,0 9,10M12,5A1,1 0 0,0 11,6V18H13V6A1,1 0 0,0 12,5M15,15A1,1 0 0,0 14,16V18H16V16A1,1 0 0,0 15,15Z" />
                          </svg>
                        </div>
                        {t('visas.mainRequirements')}
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line ml-16">{visa.mainRequirements}</p>
                    </div>
                  )}

                  {/* Visa Types */}
                  {visa.visaTypes && visa.visaTypes.length > 0 && (
                    <div className="mb-8 bg-orange-50 rounded-xl p-6 border border-orange-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19,6H17V4A1,1 0 0,0 16,3H8A1,1 0 0,0 7,4V6H5A3,3 0 0,0 2,9V19A3,3 0 0,0 5,22H19A3,3 0 0,0 22,19V9A3,3 0 0,0 19,6M9,6H15V5H9V6Z" />
                          </svg>
                        </div>
                        {t('visas.visaTypes')}
                      </h3>
                      <ul className="space-y-3 ml-16">
                        {visa.visaTypes.map((type, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z" />
                              </svg>
                            </div>
                            <span className="text-gray-700 font-medium">{type}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Key Details Grid - Matching About page style */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    
                    {/* Processing Time */}
                    <div className="group/card bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12.5,7H11V13L16.2,16.2L17,15.3L12.5,12.1V7Z" />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-2">{t('visas.processingTime')}</div>
                      <div className="text-2xl font-bold text-gray-900">{visa.processingTime}</div>
                    </div>

                    {/* Validity */}
                    <div className="group/card bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z" />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-2">{t('visas.validity')}</div>
                      <div className="text-2xl font-bold text-gray-900">{visa.validity}</div>
                    </div>

                    {/* Visa Fee */}
                    <div className="group/card bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-300">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover/card:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
                        </svg>
                      </div>
                      <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold mb-2">{t('visas.visaFee')}</div>
                      <div className="text-2xl font-bold text-gray-900">JOD {visa.fees.government.toFixed(2)}</div>
                    </div>

                  </div>

                  {/* Requirements Section - Matching About page style */}
                  {visa.requirements && visa.requirements.length > 0 && (
                    <div className="mb-12">
                      <div className="text-center mb-8">
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-100 text-blue-600 font-medium">
                          {t('visas.requirements')}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                          {t('visas.requirements')} ({visa.requirements.length})
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {visa.requirements.map((req: string, idx: number) => (
                          <div key={idx} className={`flex items-start gap-4 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z" />
                                </svg>
                              </div>
                            </div>
                            <span className="text-gray-700 font-medium leading-relaxed flex-1">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes Section - Matching About page style */}
                  {visa.notes && (
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden mb-8">
                      <div className="absolute inset-0 opacity-50">
                        <div className="w-full h-full" style={{
                          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
                          backgroundSize: '40px 40px'
                        }}></div>
                      </div>
                      <div className="relative z-10">
                        <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white mb-2 text-lg">{t('visas.importantNotes')}</div>
                            <p className="text-blue-100 leading-relaxed">{visa.notes}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Apply Button - Matching About page style */}
                  <div className="pt-6 border-t border-gray-200">
                    <a 
                      href="/contact" 
                      className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      {t('visas.applyNow')}
                      <svg className={`ml-2 h-5 w-5 ${isRTL ? 'mr-2 ml-0 rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section - Matching About page style */}
        <div className="mt-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-50">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-300 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-1 h-16 bg-cyan-300 rounded-full"></div>
              <div>
                <h2 className="text-4xl font-bold">{t('visas.readyToStart')}</h2>
              </div>
            </div>
            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-8">{t('visas.expertTeam')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="px-8 py-4 bg-white text-[#145EFF] font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t('common.contactUs')}
              </a>
              <a 
                href="/" 
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                {t('visas.backToHome')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
