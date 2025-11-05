import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getFlagPath } from '@/lib/utils/flags';
import { getServiceIcon } from '@/lib/utils/service-icons';

// Service Icon component with fallback
const ServiceIcon = ({ serviceName }: { serviceName: string }) => {
  const [useEmoji, setUseEmoji] = useState(false);
  const emojiMap: Record<string, string> = {
    'Visa Consultations': '📋',
    'Certificated Translations': '🌐',
    'Insurance': '🛡️',
    'Hotel Bookings': '🏨',
    'Flight Bookings': '✈️',
    'Trip Plan': '🗺️'
  };

  if (useEmoji) {
    return <span className="text-2xl">{emojiMap[serviceName] || '🔧'}</span>;
  }

  return (
    <Image
      src={getServiceIcon(serviceName)}
      alt={`${serviceName} icon`}
      width={40}
      height={40}
      className="object-contain p-2"
      unoptimized={true}
      onError={() => setUseEmoji(true)}
    />
  );
};

const Services = () => {
  const travelVisas = [
    { name: 'UAE Visa', description: 'Tourist, business, and work visas for UAE', href: '/visa/uae', flag: getFlagPath('UAE') },
    { name: 'UK Visa', description: 'Visit, work, and study visas for United Kingdom', href: '/visa/uk', flag: getFlagPath('United Kingdom') },
    { name: 'US Visa', description: 'Tourist, business, and immigrant visas for USA', href: '/visa/us', flag: getFlagPath('United States') },
    { name: 'Canada Visa', description: 'Visitor, work, and study permits for Canada', href: '/visa/canada', flag: getFlagPath('Canada') },
    { name: 'Australia Visa', description: 'Tourist, work, and student visas for Australia', href: '/visa/australia', flag: getFlagPath('Australia') },
    { name: 'India Visa', description: 'Tourist, business, and medical visas for India', href: '/visa/india', flag: getFlagPath('India') },
  ];

  const schengenVisas = [
    { name: 'Germany Visa', description: 'Schengen visa for Germany', href: '/visa/germany' },
    { name: 'France Visa', description: 'Schengen visa for France', href: '/visa/france' },
    { name: 'Netherlands Visa', description: 'Schengen visa for Netherlands', href: '/visa/netherlands' },
    { name: 'Spain Visa', description: 'Schengen visa for Spain', href: '/visa/spain' },
    { name: 'Italy Visa', description: 'Schengen visa for Italy', href: '/visa/italy' },
    { name: 'Austria Visa', description: 'Schengen visa for Austria', href: '/visa/austria' },
  ];

  const ourServices = [
    { name: 'Visa Consultations', description: 'Expert guidance on visa requirements and processes', href: '/services' },
    { name: 'Certificated Translations', description: 'Professional document translation services', href: '/services' },
    { name: 'Insurance', description: 'Travel and health insurance coverage', href: '/services' },
    { name: 'Hotel Bookings', description: 'Best deals on accommodation worldwide', href: '/services' },
    { name: 'Flight Bookings', description: 'Competitive airfare and flight arrangements', href: '/services' },
    { name: 'Trip Plan', description: 'Complete travel itinerary planning', href: '/services' },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#145EFF]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-300 to-purple-300 mx-8 drop-shadow-2xl">
              Our Visa & Travel Services
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Comprehensive visa assistance and travel services to make your journey 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-semibold"> seamless and stress-free</span>
          </p>
        </div>

        {/* Travel Visas */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-12 text-center drop-shadow-lg">
            🌍 Travel Visas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelVisas.map((visa, index) => (
              <div 
                key={visa.name} 
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Image 
                      src={visa.flag} 
                      alt={`${visa.name} flag`}
                      width={32}
                      height={24}
                      className="object-contain p-1"
                      unoptimized={true}
                      onError={(e) => {
                        // Fallback to external URL if local flag fails
                        const countryCode = visa.name.includes('UAE') ? 'ae' : 
                                          visa.name.includes('UK') ? 'gb' :
                                          visa.name.includes('US') ? 'us' :
                                          visa.name.includes('Canada') ? 'ca' :
                                          visa.name.includes('Australia') ? 'au' :
                                          visa.name.includes('India') ? 'in' : 'ae';
                        (e.target as HTMLImageElement).src = `https://flagcdn.com/w40/${countryCode}.png`;
                      }}
                    />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">{visa.name}</h4>
                  <p className="text-gray-300 leading-relaxed">{visa.description}</p>
                </div>
                <Link
                  href={visa.href}
                  className="inline-flex items-center text-blue-300 hover:text-blue-200 font-semibold group-hover:translate-x-2 transition-all duration-300"
                >
                  Learn More
                  <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 mb-6 drop-shadow-2xl">
              ⭐ Why Choose Us?
            </h3>
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
              <span className="mx-6 text-lg text-gray-300 font-semibold">Trusted by thousands of satisfied customers</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
            </div>
            <div className="flex justify-center space-x-12 text-sm text-gray-300">
              <span className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3 animate-pulse"></span>
                Fastest submission process
              </span>
              <span className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full mr-3 animate-pulse" style={{ animationDelay: '0.5s' }}></span>
                Quick and most convenient
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Row 1 */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">Established Company</h4>
              <p className="text-gray-300 leading-relaxed">A company that has been operating for a long time with a clear and established location.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors duration-300">Official Documentation</h4>
              <p className="text-gray-300 leading-relaxed">Can issue official quotations and tax invoices for all services.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors duration-300">Full Submission Management</h4>
              <p className="text-gray-300 leading-relaxed">Manages all submissions on behalf of customers; no need to travel (for some countries).</p>
            </div>

            {/* Row 2 */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors duration-300">Complete Travel Arrangements</h4>
              <p className="text-gray-300 leading-relaxed">Customers don't need to reserve flights and hotels; we handle all reservations.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors duration-300">Professional Form Handling</h4>
              <p className="text-gray-300 leading-relaxed">Fills out forms and books appointments with submission centers by our professional team.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">Comprehensive Support</h4>
              <p className="text-gray-300 leading-relaxed">Answers customer questions comprehensively and provides detailed guidance.</p>
            </div>

            {/* Row 3 */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">24/7 Customer Support</h4>
              <p className="text-gray-300 leading-relaxed">Very easy to contact us; we answer calls 24 hours a day for your convenience.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">Guaranteed Timely Results</h4>
              <p className="text-gray-300 leading-relaxed">Guaranteed timely results for your travel plans with no delays.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">No Hidden Fees</h4>
              <p className="text-gray-300 leading-relaxed">Expedited submission for all customer cases with no additional charges.</p>
            </div>

            {/* Row 4 */}
            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-rose-300 transition-colors duration-300">Expert Staff Support</h4>
              <p className="text-gray-300 leading-relaxed">Expert staff available to take care of customers at submission centers.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors duration-300">Problem Resolution</h4>
              <p className="text-gray-300 leading-relaxed">Solves all problems that customers are concerned about with expert solutions.</p>
            </div>

            <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl">
              <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors duration-300">Global Visa Expertise</h4>
              <p className="text-gray-300 leading-relaxed">Expertise in visas worldwide, all types, guaranteed by our track record with no disappointment.</p>
            </div>
          </div>
        </div>

        {/* Our Services */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
            <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 mx-8 drop-shadow-lg">
              🛠️ Additional Services
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ourServices.map((service, index) => (
              <div 
                key={service.name} 
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-2xl hover:shadow-3xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 bg-white/10">
                    <ServiceIcon serviceName={service.name} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">{service.name}</h4>
                  <p className="text-gray-300 leading-relaxed">{service.description}</p>
                </div>
                <Link
                  href={service.href}
                  className="inline-flex items-center text-blue-300 hover:text-blue-200 font-semibold group-hover:translate-x-2 transition-all duration-300"
                >
                  Learn More
                  <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
