'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/lib/constants';

// Google Place ID from config

interface PlaceDetails {
  formattedAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  name: string;
}

const Footer = () => {
  const { t } = useLanguage();
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
  
  useEffect(() => {
    // Fetch place details from Google Places API
    const fetchPlaceDetails = async () => {
      try {
        const placeId = siteConfig.googlePlaceId;
        const response = await fetch(
          `/api/google-places/details?placeId=${placeId}`
        );
        
        if (response.ok) {
          const data = await response.json();
          setPlaceDetails(data);
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    };
    
    fetchPlaceDetails();
  }, []);
  
  // Get map source URL using Place ID
  const [mapUrl, setMapUrl] = useState<string>('');
  
  useEffect(() => {
    const fetchMapUrl = async () => {
      try {
        const placeId = siteConfig.googlePlaceId;
        const response = await fetch(`/api/google-places/map?placeId=${placeId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.embedUrl) {
            setMapUrl(data.embedUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching map URL:', error);
      }
    };
    fetchMapUrl();
  }, []);
  
  const getMapUrl = () => {
    return mapUrl || `https://www.google.com/maps/embed/v1/place?q=place_id:${siteConfig.googlePlaceId}&zoom=15`;
  };
  
  // Get Google Maps link using Place ID
  const getMapsLink = () => {
    const placeId = siteConfig.googlePlaceId;
    return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  };
  
  const displayAddress = placeDetails?.formattedAddress || 'Al Qaherah, Abdoun, Building Number 24, Amman, Jordan';
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/img/logo/visajo.png"
                alt="Visa Consulting Services"
                width={100}
                height={100}
                loading="lazy"
                className="h-24 w-auto rounded-lg"
              />
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/VisaJor/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Visit our Facebook page"
                title="Visit our Facebook page"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/visa_jo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Visit our Instagram page"
                title="Visit our Instagram page"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  {t('common.services')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  {t('common.aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  {t('common.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info with Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contactInfo')}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={siteConfig.getTelLink()} className="text-gray-300 hover:text-white transition-colors">
                  {siteConfig.getFormattedPhone()}
                </a>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${siteConfig.email}`} className="text-gray-300 hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start">
                <svg className="h-5 w-5 mr-2 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a 
                  href={getMapsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="View office location on Google Maps"
                >
                  {displayAddress}
                </a>
              </div>
            </div>
            {/* Small Map using Google Place ID */}
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg border border-gray-700">
              <a
                href={getMapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
                aria-label="View Visa Jo location on Google Maps"
              >
                <iframe
                  src={getMapUrl()}
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Visa Jo Office Location"
                ></iframe>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            Visa Jo © All Rights Reserved. 2025
          </p>
          <div className="mt-4">
            <Link
              href="/admin/login"
              className="text-white/40 hover:text-red-500 transition-colors duration-300 inline-flex items-center justify-center gap-2 hover:scale-110"
              title="Admin Sign In"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
