'use client';

import { useState, useEffect } from 'react';
import { getFlagPath } from '@/lib/utils/flags';

const WorldMap = () => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const countries = [
    {
      id: 'uk',
      name: 'United Kingdom',
      nameThai: 'อังกฤษ',
      image: getFlagPath('United Kingdom'),
      position: { top: '25%', left: '45%' },
      href: '/visas/uk'
    },
    {
      id: 'belgium',
      name: 'Belgium',
      nameThai: 'เบลเยียม',
      image: getFlagPath('Belgium'),
      position: { top: '28%', left: '48%' },
      href: '/visas/belgium'
    },
    {
      id: 'italy',
      name: 'Italy',
      nameThai: 'อิตาลี',
      image: getFlagPath('Italy'),
      position: { top: '35%', left: '50%' },
      href: '/visas/italy'
    },
    {
      id: 'france',
      name: 'France',
      nameThai: 'ฝรั่งเศษ',
      image: getFlagPath('France'),
      position: { top: '30%', left: '47%' },
      href: '/visas/france'
    },
    {
      id: 'usa',
      name: 'United States',
      nameThai: 'สหรัฐอเมริกา',
      image: getFlagPath('United States'),
      position: { top: '32%', left: '20%' },
      href: '/visas/us'
    },
    {
      id: 'mexico',
      name: 'Mexico',
      nameThai: 'เม็กซิโก',
      image: getFlagPath('Mexico'),
      position: { top: '40%', left: '18%' },
      href: '/visas/mexico'
    },
    {
      id: 'canada',
      name: 'Canada',
      nameThai: 'แคนนาดา',
      image: getFlagPath('Canada'),
      position: { top: '20%', left: '18%' },
      href: '/visas/canada'
    },
    {
      id: 'panama',
      name: 'Panama',
      nameThai: 'ปานามา',
      image: getFlagPath('Panama'),
      position: { top: '45%', left: '22%' },
      href: '/visas/panama'
    },
    {
      id: 'russia',
      name: 'Russia',
      nameThai: 'รัสเซีย',
      image: getFlagPath('Russia'),
      position: { top: '15%', left: '65%' },
      href: '/visas/russia'
    },
    {
      id: 'sweden',
      name: 'Sweden',
      nameThai: 'สวีเดน',
      image: getFlagPath('Sweden'),
      position: { top: '18%', left: '52%' },
      href: '/visas/sweden'
    },
    {
      id: 'india',
      name: 'India',
      nameThai: 'อินเดีย',
      image: getFlagPath('India'),
      position: { top: '45%', left: '70%' },
      href: '/visas/india'
    },
    {
      id: 'china',
      name: 'China',
      nameThai: 'จีน',
      image: getFlagPath('China'),
      position: { top: '35%', left: '75%' },
      href: '/visas/china'
    },
    {
      id: 'australia',
      name: 'Australia',
      nameThai: 'ออสเตรเลีย',
      image: getFlagPath('Australia'),
      position: { top: '70%', left: '80%' },
      href: '/visas/australia'
    },
    {
      id: 'newzealand',
      name: 'New Zealand',
      nameThai: 'นิวซีแลนด์',
      image: getFlagPath('New Zealand'),
      position: { top: '75%', left: '90%' },
      href: '/visas/newzealand'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(244,65,53,0.5)] to-[rgba(244,65,53,0.5)]"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mx-6">
              Global Visa Services
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(244,65,53,0.5)] to-[rgba(244,65,53,0.5)]"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide visa services to countries worldwide. Click on any country to learn more about our services.
          </p>
        </div>

        {/* World Map with Markers - Matching the original HTML structure */}
        <div className="elementor-widget-container">
          <div 
            className="bdt-marker-wrapper bdt-inline bdt-dark bdt-marker-animated relative"
            id="bdt-marker-7d1be50"
          >
            {/* World Map Background */}
            <img
              loading="lazy"
              decoding="async"
              width="1556"
              height="768"
              src="https://shalomvisapower.com/wp-content/uploads/2025/05/fintech-dotted-map.png"
              className="attachment-full size-full w-full h-auto rounded-lg"
              alt="World Map"
              srcSet="https://shalomvisapower.com/wp-content/uploads/2025/05/fintech-dotted-map.png 1556w, https://shalomvisapower.com/wp-content/uploads/2025/05/fintech-dotted-map-300x148.png 300w, https://shalomvisapower.com/wp-content/uploads/2025/05/fintech-dotted-map-1024x505.png 1024w, https://shalomvisapower.com/wp-content/uploads/2025/05/fintech-dotted-map-768x379.png 768w, https://shalomvisapower.com/wp-content/uploads/2025/05/fintech-dotted-map-1536x758.png 1536w, https://shalomvisapower.com/wp-content/uploads/2025/05/fintech-dotted-map-650x321.png 650w"
              sizes="(max-width: 1556px) 100vw, 1556px"
            />
            
            {/* Country Markers */}
            {countries.map((country, index) => (
              <a
                key={country.id}
                className="bdt-marker-item bdt-position-absolute bdt-marker bdt-icon bdt-tippy-tooltip cursor-pointer transition-all duration-300 hover:scale-110"
                data-tippy-content={`<p>${country.nameThai}</p>`}
                target="_self"
                href={country.href}
                data-tippy=""
                data-tippy-placement="top"
                data-tippy-animation="shift-toward"
                data-tippy-arrow="false"
                style={{
                  top: country.position.top,
                  left: country.position.left,
                }}
                onMouseEnter={() => setHoveredCountry(country.id)}
                onMouseLeave={() => setHoveredCountry(null)}
                aria-expanded="false"
              >
                <img
                  loading="lazy"
                  decoding="async"
                  width="147"
                  height="104"
                  src={country.image}
                  className="attachment-thumbnail size-thumbnail w-12 h-8 rounded shadow-lg border-2 border-white hover:border-blue-500 transition-all duration-300 object-contain bg-white p-0.5"
                  alt={`${country.name} flag`}
                  onError={(e) => {
                    // Fallback to external URL if local flag doesn't exist
                    const countryCode = country.id === 'uk' ? 'gb' : country.id === 'usa' ? 'us' : country.id;
                    (e.target as HTMLImageElement).src = `https://flagcdn.com/w80/${countryCode}.png`;
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldMap;
