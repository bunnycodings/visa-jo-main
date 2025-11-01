'use client';

import Link from 'next/link';

const Hero = ({ bannerText, title, subtitle, ctaText, ctaHref, isActive = true, backgroundImage }: { bannerText?: string; title?: string; subtitle?: string; ctaText?: string; ctaHref?: string; isActive?: boolean; backgroundImage?: string; }) => {

  if (!isActive) {
    return null;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-700 z-0 overflow-hidden">
        {/* Optional background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}></div>
        {/* Enhanced pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px), 
                              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
            backgroundSize: '30px 30px, 25px 25px'
          }}></div>
        </div>
        
        {/* Animated floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 -right-20 w-96 h-96 bg-cyan-400 opacity-10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-blue-500 opacity-10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content with animations */}
          <div className="text-center lg:text-left">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-cyan-300 font-medium">{bannerText || 'Trusted by thousands of travelers'}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">{title || 'Fast, Easy, and Reliable Visa Services from Jordan'}</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
              {subtitle || 'Apply for your travel visa online — 100+ destinations, expert support, and fast approvals with our streamlined process.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href={ctaHref || '/services'}
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-1 hover:scale-105"
              >
                {ctaText || 'Apply Now'}
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-white/5 transform hover:-translate-y-1"
              >
                Check Visa Requirements
              </Link>
            </div>
          </div>
          
          {/* Right side - Modern travel illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 p-1 rounded-full">
                <div className="bg-gradient-to-br from-indigo-900 to-blue-800 rounded-full p-6">
                  <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 -left-12 w-8 h-8 bg-cyan-300 rounded-full opacity-60 animate-ping-slow"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-ping-slow animation-delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;