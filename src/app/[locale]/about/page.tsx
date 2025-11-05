import type { AboutContent } from '@/types/models/SiteContent';

export default async function AboutPage() {
  // Use default content for static export
  const title = 'About Us';
  const intro = 'We are dedicated to making visa applications simple, fast, and stress-free.';
  const story = 'Founded with the mission to simplify travel, our team provides expert guidance and end-to-end support for visa applications across the globe.';
  const whyTitle = 'Why Choose Us?';
  const whyItems = [
    { title: 'Quality Service', description: 'Expert consultants ensuring accurate applications and reliable support.' },
    { title: 'Fast Processing', description: 'Streamlined workflows to help you get approvals quickly.' },
    { title: 'Customer Care', description: 'Friendly assistance throughout your journey with 24/7 availability.' },
  ];
  const missionTitle = 'Our Mission';
  const missionText = 'To deliver reliable, efficient, and personalized visa services that empower seamless global travel.';

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-cyan-300 font-medium">About Us</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">{intro}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="order-2 lg:order-1">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-100 text-blue-600 font-medium">Our Story</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Building Trust Since Day One</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{story}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-cyan-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span className="font-semibold">Trusted Service</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span className="font-semibold">Expert Team</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl p-8 h-full flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
              <div className="relative z-10 text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <div className="text-white/90">
                  <div className="text-5xl font-bold mb-2">10,000+</div>
                  <div className="text-lg">Successful Visa Applications</div>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute top-10 -right-10 w-40 h-40 bg-cyan-300 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute bottom-10 -left-10 w-32 h-32 bg-blue-300 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-100 text-indigo-600 font-medium">Why Choose Us</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{whyTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyItems.map((item, idx) => (
              <div key={idx} className="group bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-50">
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-300 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-16 bg-cyan-300 rounded-full"></div>
              <div>
                <div className="text-sm text-cyan-300 mb-2 uppercase tracking-wide font-semibold">Our Commitment</div>
                <h2 className="text-4xl font-bold">{missionTitle}</h2>
              </div>
            </div>
            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl">{missionText}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Expert Team</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Fast Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
