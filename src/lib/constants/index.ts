// Site configuration from environment variables
export * from './site';

// Application constants
export const APP_CONFIG = {
  name: 'Visa Consulting Services',
  description: 'Professional visa assistance for UAE, UK, US, Canada, Australia, India, and Schengen visas',
  contact: {
    phone: '+962 79 6090 319',
    email: 'info@visaconsulting.com',
    facebook: 'https://facebook.com/VisaJor/',
    instagram: 'https://www.instagram.com/visa_jo/',
  },
  officeHours: {
    weekdays: '9:00 AM - 6:00 PM',
    saturday: '9:00 AM - 2:00 PM',
    sunday: 'Closed',
  },
} as const;

// Visa types and countries
export const VISA_TYPES = {
  TRAVEL: [
    { name: 'UAE Visa', code: 'uae', href: '/visas/uae' },
    { name: 'UK Visa', code: 'uk', href: '/visas/uk' },
    { name: 'US Visa', code: 'us', href: '/visas/us' },
    { name: 'Canada Visa', code: 'canada', href: '/visas/canada' },
    { name: 'Australia Visa', code: 'australia', href: '/visas/australia' },
    { name: 'India Visa', code: 'india', href: '/visas/india' },
  ],
  SCHENGEN: [
    { name: 'Germany Visa', code: 'germany', href: '/visas/germany' },
    { name: 'France Visa', code: 'france', href: '/visas/france' },
    { name: 'Netherlands Visa', code: 'netherlands', href: '/visas/netherlands' },
    { name: 'Spain Visa', code: 'spain', href: '/visas/spain' },
    { name: 'Italy Visa', code: 'italy', href: '/visas/italy' },
    { name: 'Austria Visa', code: 'austria', href: '/visas/austria' },
  ],
} as const;

// Services
export const SERVICES = [
  {
    category: 'Visa Consultations',
    icon: '📋',
    description: 'Expert guidance on visa requirements and application processes',
    href: '/services'
  },
  {
    category: 'Certification Translation',
    icon: '🌐',
    description: 'Professional document translation services for visa applications',
    href: '/services'
  },
  {
    category: 'Insurance',
    icon: '🛡️',
    description: 'Comprehensive travel and health insurance coverage',
    href: '/services'
  },
  {
    category: 'Hotel Bookings',
    icon: '🏨',
    description: 'Best deals on accommodation worldwide',
    href: '/services'
  },
  {
    category: 'Flight Bookings',
    icon: '✈️',
    description: 'Competitive airfare and flight arrangements',
    href: '/services'
  },
  {
    category: 'Trip Plans',
    icon: '🗺️',
    description: 'Complete travel itinerary planning and coordination',
    href: '/services'
  }
] as const;
