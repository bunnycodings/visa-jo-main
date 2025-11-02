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
                <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.869 1.23c-.039.022-.077.045-.115.067L2.897 2.897a.939.939 0 00-1.33 1.33l3.868 3.868a9.87 9.87 0 001.23 4.869.942.942 0 001.33.001l1.329-1.33a.943.943 0 00-.001-1.33 7.988 7.988 0 11-11.312 0 .943.943 0 00-1.33 1.33 9.87 9.87 0 001.23 4.869l-3.868 3.868a.939.939 0 001.33 1.33l3.868-3.868a9.87 9.87 0 004.869 1.23h.004a9.864 9.864 0 100-19.728"/>
                  </svg>
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
                <div className="relative w-20 h-20 bg-gradient-to-br from-[#145EFF] to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.048 1.024a11.042 11.042 0 010 1.586l-2.048 1.024a1 1 0 00-.502.756l-1.498 4.493a1 1 0 00-.948.684H5a2 2 0 01-2-2V5z" />
                  </svg>
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
          <div className="relative w-20 h-20 bg-gradient-to-br from-[#145EFF] to-indigo-700 hover:from-blue-600 hover:to-indigo-800 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 border-4 border-white">
            {isExpanded ? (
              <svg className="w-10 h-10 text-white transition-transform duration-300 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
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
