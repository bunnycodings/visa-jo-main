'use client';

import { VisaType } from '@/types/models/VisaApplication';

interface VisaDetailsProps {
  country: string;
  title?: string;
}

// Server component: renders visas from MySQL
export default async function VisaDetails({ country, title }: VisaDetailsProps) {
  const { getVisasByCountry } = await import('@/lib/utils/db-helpers');
  const { autoInitializeDatabase } = await import('@/lib/utils/auto-init');

  let visas: VisaType[] = [];

  try {
    await autoInitializeDatabase();
    visas = await getVisasByCountry(country);
  } catch (error) {
    console.warn('Database connection unavailable during build:', error);
  }

  if (!visas.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">No Visas Available</h2>
          <p className="text-gray-600 text-lg mb-8">We don't currently have visa information for this country. Please check back soon!</p>
          <a href="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all">
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm border border-white/30">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19,6H17V4A1,1 0 0,0 16,3H8A1,1 0 0,0 7,4V6H5A3,3 0 0,0 2,9V19A3,3 0 0,0 5,22H19A3,3 0 0,0 22,19V9A3,3 0 0,0 19,6M9,6H15V5H9V6Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{title || 'Visa Services'}</h1>
              <p className="text-blue-100 text-lg mt-2">Professional visa solutions and expert guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visas Container */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {visas.map((visa) => (
            <div key={visa.name} className="group">
              {/* Main Visa Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-8 py-8">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{visa.name}</h2>
                      {visa.description && (
                        <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">{visa.description}</p>
                      )}
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-md">
                      <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Status</div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        visa.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {visa.isActive ? '✓ Active' : '○ Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  
                  {/* Key Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    
                    {/* Processing Time */}
                    <div className="group/card">
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100 h-full hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-orange-600 p-3 rounded-lg">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12.5,7H11V13L16.2,16.2L17,15.3L12.5,12.1V7Z" />
                            </svg>
                          </div>
                          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Processing Time</div>
                        </div>
                        <div className="text-xl font-bold text-gray-900">{visa.processingTime}</div>
                      </div>
                    </div>

                    {/* Validity */}
                    <div className="group/card">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 h-full hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-blue-600 p-3 rounded-lg">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z" />
                            </svg>
                          </div>
                          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Validity</div>
                        </div>
                        <div className="text-xl font-bold text-gray-900">{visa.validity}</div>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="group/card">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 h-full hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-purple-600 p-3 rounded-lg">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19,6H17V4A1,1 0 0,0 16,3H8A1,1 0 0,0 7,4V6H5A3,3 0 0,0 2,9V19A3,3 0 0,0 5,22H19A3,3 0 0,0 22,19V9A3,3 0 0,0 19,6M9,6H15V5H9V6Z" />
                            </svg>
                          </div>
                          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Category</div>
                        </div>
                        <div className="text-xl font-bold text-gray-900 capitalize">{visa.category}</div>
                      </div>
                    </div>

                    {/* Total Fee */}
                    <div className="group/card">
                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100 h-full hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-emerald-600 p-3 rounded-lg">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
                            </svg>
                          </div>
                          <div className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Total Cost</div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">JOD {visa.fees.total.toFixed(2)}</div>
                      </div>
                    </div>

                  </div>

                  {/* Fee Breakdown */}
                  <div className="mb-12">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                      </svg>
                      Fee Breakdown
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                        <div className="text-sm text-gray-600 uppercase tracking-wide font-semibold mb-2">Services Fee</div>
                        <div className="text-3xl font-bold text-gray-900">JOD {visa.fees.consultation.toFixed(2)}</div>
                        <p className="text-sm text-gray-600 mt-3">Our professional consulting and document preparation service</p>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                        <div className="text-sm text-gray-600 uppercase tracking-wide font-semibold mb-2">Government Fee</div>
                        <div className="text-3xl font-bold text-gray-900">JOD {visa.fees.government.toFixed(2)}</div>
                        <p className="text-sm text-gray-600 mt-3">Official government visa processing fee</p>
                      </div>
                    </div>
                  </div>

                  {/* Requirements Section */}
                  {visa.requirements && visa.requirements.length > 0 && (
                    <div className="mb-12">
                      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9,10A1,1 0 0,0 8,11V18H10V11A1,1 0 0,0 9,10M12,5A1,1 0 0,0 11,6V18H13V6A1,1 0 0,0 12,5M15,15A1,1 0 0,0 14,16V18H16V16A1,1 0 0,0 15,15Z" />
                        </svg>
                        Requirements ({visa.requirements.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {visa.requirements.map((req: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100 hover:shadow-md transition-all">
                            <div className="flex-shrink-0 mt-1">
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M10,17L5,12L6.41,10.59L10,14.17L17.59,6.58L19,8L10,17Z" />
                              </svg>
                            </div>
                            <span className="text-gray-700 font-medium">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes Section */}
                  {visa.notes && (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
                      <div className="flex items-start gap-4">
                        <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                        </svg>
                        <div>
                          <div className="font-bold text-amber-900 mb-2">Important Notes</div>
                          <p className="text-amber-800 leading-relaxed">{visa.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Card Footer */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 px-8 py-6 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Last updated: {new Date(visa.updatedAt || '').toLocaleDateString()}
                  </div>
                  <a href="/contact" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                    Apply Now →
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Visa Journey?</h2>
          <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">Our expert team is here to guide you through every step of the process. Get in touch for personalized assistance.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg">
              Contact Us
            </a>
            <a href="/" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition-all">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}