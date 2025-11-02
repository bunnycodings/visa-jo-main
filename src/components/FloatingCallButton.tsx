'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/constants/site';

const FloatingCallButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Show button after page loads
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  const telLink = siteConfig.getTelLink();
  const whatsappLink = siteConfig.getWhatsAppLink();

  return (
    <>
      {/* Floating Call Button */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4 items-end">
        {/* Expanded Options */}
        {isExpanded && (
          <div className="flex flex-col gap-4 animate-fade-in">
            {/* WhatsApp Button with Label */}
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-lg">
                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">WhatsApp</span>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center flex-shrink-0"
                title="Chat with us on WhatsApp"
                onClick={() => setIsExpanded(false)}
              >
                <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 overflow-hidden">
                  <img
                    src="/img/icons/whatapp.png"
                    alt="WhatsApp"
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </a>
            </div>

            {/* Phone Call Button with Label */}
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-2xl px-4 py-3 shadow-lg">
                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">Call Us</span>
              </div>
              <a
                href={telLink}
                className="group relative flex items-center justify-center flex-shrink-0"
                title="Call us"
                onClick={() => setIsExpanded(false)}
              >
                <div className="absolute inset-0 bg-[#145EFF] rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-[#145EFF] to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 overflow-hidden">
                  <img
                    src="/img/icons/call.png"
                    alt="Call"
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </a>
            </div>
          </div>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group relative flex items-center justify-center flex-shrink-0"
          title={isExpanded ? "Close" : "Contact us"}
        >
          <div className="absolute inset-0 bg-[#145EFF] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-150"></div>
          <div className="relative w-20 h-20 bg-gradient-to-br from-[#145EFF] to-indigo-700 hover:from-blue-600 hover:to-indigo-800 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 border-4 border-white overflow-hidden">
            {isExpanded ? (
              <svg className="w-10 h-10 text-white transition-transform duration-300 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <img
                src="/img/icons/call.png"
                alt="Contact"
                className="w-12 h-12 object-contain animate-pulse"
              />
            )}
          </div>
        </button>
      </div>

      {/* Backdrop to close menu when clicking outside */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsExpanded(false)}
        ></div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default FloatingCallButton;
