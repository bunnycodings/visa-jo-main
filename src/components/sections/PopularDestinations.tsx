'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getFlagPath } from '@/lib/utils/flags';

interface DestinationItem {
  name: string;
  flag: string;
  visaType: string;
}

interface PopularDestinationsProps {
  title?: string;
  items?: DestinationItem[];
}

// Map country names to their visa page slugs
const countryToSlug: Record<string, string> = {
  'Greece': '/visa/greece',
  'Canada': '/visas/canada',
  'United Kingdom': '/visas/uk',
  'Spain': '/visas/spain',
  'France': '/visas/france',
  'Italy': '/visas/italy',
  'Austria': '/visas/austria',
  'Germany': '/visas/germany',
  'Netherlands': '/visas/netherlands',
  'USA': '/visas/us',
  'US': '/visas/us',
  'United States': '/visas/us',
  'UAE': '/visas/uae',
  'Australia': '/visas/australia',
  'India': '/visas/india',
};


// Flag Image component with fallback
const FlagImage = ({ src, fallbackSrc, alt }: { src: string; fallbackSrc: string; alt: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <Image
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt}
      width={80}
      height={56}
      className="w-full h-full object-contain p-1"
      unoptimized={true}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
};

const PopularDestinations = ({ title = 'Popular Destinations', items = [
  { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png', visaType: 'visa' },
  { name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png', visaType: 'visa' },
  { name: 'Spain', flag: 'https://flagcdn.com/w40/es.png', visaType: 'visa' },
  { name: 'France', flag: 'https://flagcdn.com/w40/fr.png', visaType: 'visa' },
  { name: 'Italy', flag: 'https://flagcdn.com/w40/it.png', visaType: 'visa' },
  { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png', visaType: 'visa' },
  { name: 'Austria', flag: 'https://flagcdn.com/w40/at.png', visaType: 'visa' },
]}: PopularDestinationsProps) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((destination, index) => (
            <div key={index} className="group relative rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 overflow-hidden border border-gray-200">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-500 rounded-xl pointer-events-none"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-300 pointer-events-none"></div>
              
              <div className="flex justify-center mb-4 relative z-10">
                <div className="w-20 h-14 rounded-lg overflow-hidden shadow-md border-2 border-gray-100 group-hover:border-blue-400 group-hover:shadow-blue-200/50 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 bg-white flex items-center justify-center">
                  <FlagImage 
                    src={getFlagPath(destination.name)}
                    fallbackSrc={destination.flag}
                    alt={`${destination.name} flag`}
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 relative z-10">
                {destination.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 relative z-10">
                {destination.visaType}
              </p>
              {countryToSlug[destination.name] ? (
                <Link
                  href={countryToSlug[destination.name]}
                  className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-300 inline-block hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  Apply Now
                  <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              ) : (
                <div className="relative z-10 bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold text-sm cursor-not-allowed inline-block">
                  Coming Soon
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
