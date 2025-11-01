'use client';

interface HowItWorksProps {
  title?: string;
  steps?: { title: string; icon?: string }[];
}

const HowItWorks = ({ title = 'How It Works', steps = [
  { title: 'Initial consultation with our experts', icon: '📞' },
  { title: 'Document preparation and verification', icon: '📋' },
  { title: 'Visa application submission', icon: '✍️' },
  { title: 'Status tracking and follow-up', icon: '📊' },
  { title: 'Visa approval and collection', icon: '✅' },
]}: HowItWorksProps) => {
  const getStepIcon = (index: number, customIcon?: string) => {
    if (customIcon) {
      return <span className="text-4xl">{customIcon}</span>;
    }
    
    const icons = [
      <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>,
      <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>,
      <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>,
      <svg key="4" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>,
      <svg key="5" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
    ];
    return icons[index % icons.length];
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Professional Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gray-100 border border-gray-200">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12h.01M15 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <span className="text-gray-600 font-semibold text-xs uppercase tracking-wider">Our Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {title}
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Professional visa application process in {steps.length} clear steps
          </p>
        </div>
        
        {/* Professional Steps Container */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-16 left-12 right-12">
            <div className="relative" style={{ height: '2px' }}>
              <div className="absolute inset-0 bg-gray-200"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 hover:border-blue-300">
                  {/* Step number in a professional badge */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  
                  {/* Professional icon container */}
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-300">
                      {step.icon ? (
                        <span className="text-3xl">{step.icon}</span>
                      ) : (
                        <div className="text-blue-600">
                          {getStepIcon(index)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Professional step title */}
                  <h3 className="text-base font-semibold text-center text-gray-900 mb-3 min-h-[56px] flex items-center justify-center leading-tight">
                    {step.title}
                  </h3>
                </div>
                
                {/* Professional arrow connector for mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Professional CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-t-4 border-blue-600 rounded-lg shadow-sm p-10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Begin Your Visa Process?</h3>
            <p className="text-gray-600 mb-6">Contact our professional team for expert assistance</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-sm"
              >
                Get Started Now
              </a>
              <a 
                href="/services"
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
