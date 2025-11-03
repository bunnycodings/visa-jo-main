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
                <div className="relative w-16 h-16 flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110">
                  <img
                    src="/img/icons/whatapp.png"
                    alt="WhatsApp"
                    className="w-16 h-16 object-contain"
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
                <div className="relative w-16 h-16 flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110">
                  <img
                    src="/img/icons/call.png"
                    alt="Call"
                    className="w-16 h-16 object-contain"
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
          <div className="relative w-16 h-16 flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110">
            {isExpanded ? (
              <svg className="w-8 h-8 text-gray-700 transition-transform duration-300 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <img
                src="/img/icons/call.png"
                alt="Contact"
                className="w-16 h-16 object-contain"
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
