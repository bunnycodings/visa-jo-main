'use client';

import { useEffect, useState } from 'react';

const WhyChooseUs = ({ badgeText, title, subtitle, features }: { badgeText?: string; title?: string; subtitle?: string; features?: { title: string; description: string; }[] }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('why-choose-us');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = (features && features.length ? features : [
    { title: 'Trusted by Thousands', description: 'Over 10,000 visas processed successfully with 99% approval rate' },
    { title: '24/7 Customer Support', description: 'Get assistance anytime via chat or WhatsApp with our dedicated team' },
    { title: 'Fast & Secure Process', description: 'Simple application with secure online payment and data protection' },
  ]);

  const gradientColors = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-cyan-500 to-blue-600'
  ];

  const icons = [
    <svg key="trust" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    <svg key="support" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 10h-1.26A8 8 0 109 20h9a2 2 0 002-2v-6a2 2 0 00-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V8z" />
    </svg>,
    <svg key="secure" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ];

  return (
    <section id="why-choose-us" className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 shadow-sm">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            <span className="text-blue-600 font-semibold text-sm">{badgeText || 'Why Choose Us'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
            {title || 'Your Trusted Visa Partner'}
          </h2>
          <p className="max-w-2xl mx-auto text-base text-gray-600 leading-relaxed">
            {subtitle || 'We make visa applications simple, fast, and stress-free'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative bg-white rounded-xl shadow-lg p-8 text-center transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} hover:shadow-2xl hover:-translate-y-2 hover:scale-102 border border-gray-100 overflow-hidden`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl"
                style={{ background: index === 0 ? 'linear-gradient(135deg, #3b82f6, #4f46e5)' : index === 1 ? 'linear-gradient(135deg, #a855f7, #ec4899)' : 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}
              ></div>
              
              {/* Icon with animated background */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className={`absolute -inset-2 bg-gradient-to-br ${gradientColors[index]} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${gradientColors[index]} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <div className="text-white">
                      {icons[index]}
                    </div>
                  </div>
                  {/* Decorative dots */}
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-400 rounded-full opacity-60 group-hover:animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-400 rounded-full opacity-60 group-hover:animate-ping" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {feature.description}
              </p>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
