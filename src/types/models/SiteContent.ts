export interface HeroContent {
  bannerText?: string; // small helper text above title
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage?: string; // optional background image URL
  isActive: boolean;
  updatedAt?: Date;
}

export const defaultHeroContent: HeroContent = {
  bannerText: 'Trusted by thousands of travelers',
  title: 'Fast, Easy, and Reliable Visa Services from Jordan',
  subtitle:
    'Apply for your travel visa online — 100+ destinations, expert support, and fast approvals with our streamlined process.',
  ctaText: 'Apply Now',
  ctaHref: '/services',
  backgroundImage: undefined,
  isActive: true,
  updatedAt: new Date(),
};

export interface WhyChooseUsFeature {
  title: string;
  description: string;
}

export interface WhyChooseUsContent {
  badgeText?: string;
  title: string;
  subtitle: string;
  features: WhyChooseUsFeature[];
  isActive: boolean;
  updatedAt?: Date;
}

export const defaultWhyChooseUsContent: WhyChooseUsContent = {
  badgeText: 'Why Choose Us',
  title: 'Your Trusted Visa Partner',
  subtitle: 'We make visa applications simple, fast, and stress-free',
  features: [
    {
      title: 'Trusted by Thousands',
      description: 'Over 10,000 visas processed successfully with 99% approval rate',
    },
    {
      title: '24/7 Customer Support',
      description: 'Get assistance anytime via chat or WhatsApp with our dedicated team',
    },
    {
      title: 'Fast & Secure Process',
      description: 'Simple application with secure online payment and data protection',
    },
  ],
  isActive: true,
  updatedAt: new Date(),
};

export interface PopularDestinationItem {
  name: string;
  flag: string;
  visaType: string;
}

export interface PopularDestinationsContent {
  title: string;
  items: PopularDestinationItem[];
  isActive: boolean;
  updatedAt?: Date;
}

export const defaultPopularDestinationsContent: PopularDestinationsContent = {
  title: 'Popular Destinations',
  items: [
    { name: 'UAE', flag: 'https://flagcdn.com/w40/ae.png', visaType: 'Travel Visa' },
    { name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png', visaType: 'Visitor Visa' },
    { name: 'United States', flag: 'https://flagcdn.com/w40/us.png', visaType: 'Tourist Visa' },
    { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png', visaType: 'Visitor Visa' },
    { name: 'Australia', flag: 'https://flagcdn.com/w40/au.png', visaType: 'Tourist Visa' },
    { name: 'India', flag: 'https://flagcdn.com/w40/in.png', visaType: 'Tourist Visa' },
    { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png', visaType: 'Schengen Visa' },
    { name: 'France', flag: 'https://flagcdn.com/w40/fr.png', visaType: 'Schengen Visa' },
    { name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png', visaType: 'Schengen Visa' },
    { name: 'Spain', flag: 'https://flagcdn.com/w40/es.png', visaType: 'Schengen Visa' },
    { name: 'Italy', flag: 'https://flagcdn.com/w40/it.png', visaType: 'Schengen Visa' },
    { name: 'Austria', flag: 'https://flagcdn.com/w40/at.png', visaType: 'Schengen Visa' },
  ],
  isActive: true,
  updatedAt: new Date(),
};

export interface HowItWorksStep {
  title: string;
}

export interface HowItWorksContent {
  title: string;
  steps: HowItWorksStep[];
  isActive: boolean;
  updatedAt?: Date;
}

export const defaultHowItWorksContent: HowItWorksContent = {
  title: 'How It Works',
  steps: [
    { title: 'Initial consultation with our experts' },
    { title: 'Document preparation and verification' },
    { title: 'Visa application submission' },
    { title: 'Status tracking and follow-up' },
    { title: 'Visa approval and collection' },
  ],
  isActive: true,
  updatedAt: new Date(),
};

export interface TestimonialItem {
  name: string;
  location: string;
  rating: number;
  quote: string;
}

export interface TestimonialsContent {
  title: string;
  items: TestimonialItem[];
  isActive: boolean;
  updatedAt?: Date;
}

export const defaultTestimonialsContent: TestimonialsContent = {
  title: 'Testimonials',
  items: [
    {
      name: 'Sarah Johnson',
      location: 'USA',
      rating: 5,
      quote:
        'Excellent service! They made my visa application process so smooth and stress-free. Highly recommended!',
    },
    {
      name: 'Ahmed Al-Rashid',
      location: 'Jordan',
      rating: 5,
      quote:
        'Professional team with great attention to detail. My Schengen visa was approved in record time.',
    },
    {
      name: 'Maria Garcia',
      location: 'Spain',
      rating: 5,
      quote:
        'Outstanding support throughout the entire process. The team was always available to answer my questions.',
    },
  ],
  isActive: true,
  updatedAt: new Date(),
};

// About page content
export interface AboutWhyItem { title: string; description: string; }

export interface AboutContent {
  title: string;
  intro: string;
  story: string;
  whyTitle: string;
  whyItems: AboutWhyItem[];
  missionTitle: string;
  missionText: string;
  isActive: boolean;
  updatedAt?: Date;
}

export const defaultAboutContent: AboutContent = {
  title: 'About Us',
  intro: 'We are dedicated to making visa applications simple, fast, and stress-free.',
  story:
    'Founded with the mission to simplify travel, our team provides expert guidance and end-to-end support for visa applications across the globe.',
  whyTitle: 'Why Choose Us?',
  whyItems: [
    { title: 'Quality Service', description: 'Expert consultants ensuring accurate applications and reliable support.' },
    { title: 'Fast Processing', description: 'Streamlined workflows to help you get approvals quickly.' },
    { title: 'Customer Care', description: 'Friendly assistance throughout your journey with 24/7 availability.' },
  ],
  missionTitle: 'Our Mission',
  missionText:
    'To deliver reliable, efficient, and personalized visa services that empower seamless global travel.',
  isActive: true,
  updatedAt: new Date(),
};

// Contact page content
export interface ContactInfoItem { title: string; details: string; description?: string; }
export interface ContactSocialLinks { facebook?: string; instagram?: string; whatsapp?: string; }

export interface ContactContent {
  title: string;
  subtitle: string;
  intro?: string;
  infoTitle?: string;
  infoItems?: Array<{ label: string; value: string }>;
  contactInfo: ContactInfoItem[];
  social: ContactSocialLinks;
  officeTitle: string;
  officeCity: string;
  isActive: boolean;
  updatedAt?: Date;
}

// Helper function to get default contact content using environment variables
export function getDefaultContactContent(): ContactContent {
  const siteAddress = process.env.SITE_ADDRESS || process.env.CONTACT_ADDRESS || 'Al Qaherah, Abdoun, Building Number 24, Amman-Jordan';
  const siteEmail = process.env.SITE_EMAIL || process.env.CONTACT_EMAIL || 'info@visa-jo.com';
  const sitePhone = process.env.SITE_PHONE || process.env.CONTACT_PHONE || '0796090319';
  const businessHours = process.env.BUSINESS_HOURS || 'Mon - Fri: 09:00 AM - 18:00 PM';
  const facebookUrl = process.env.FACEBOOK_URL || '#';
  const instagramUrl = process.env.INSTAGRAM_URL || '#';
  
  // Format phone number
  const formatPhone = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('962')) {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
    } else if (digits.startsWith('0')) {
      return `+962 ${digits.slice(1, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }
    return phone;
  };

  return {
    title: 'Get In Touch',
    subtitle:
      "Ready to start your visa application? Contact us today for expert guidance and personalized service.",
    contactInfo: [
      { title: 'Phone', details: formatPhone(sitePhone), description: 'Call us for immediate assistance' },
      { title: 'Email', details: siteEmail, description: 'Send us your questions anytime' },
      { title: 'Address', details: siteAddress, description: 'Visit our office for consultations' },
      { title: 'Working Hours', details: businessHours, description: 'We are here to help' },
    ],
    social: { facebook: facebookUrl, instagram: instagramUrl, whatsapp: '#'},
    officeTitle: 'Visit Our Office',
    officeCity: siteAddress.split(',')[siteAddress.split(',').length - 1]?.trim() || 'Amman, Jordan',
    isActive: true,
    updatedAt: new Date(),
  };
}

export const defaultContactContent: ContactContent = getDefaultContactContent();

// Services page content
export interface ServiceItem { category: string; icon: string; description: string; features: string[]; href?: string; }

export interface ServicesContent {
  title: string;
  items: ServiceItem[];
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  isActive: boolean;
  updatedAt?: Date;
}

export const defaultServicesContent: ServicesContent = {
  title: 'Our Services',
  items: [
    {
      category: 'Visa Consultations',
      icon: '📋',
      description: 'Expert guidance on visa preparations, requirements, and document processing',
      features: [
        'Personalized visa consultation',
        'Expert advice on visa preparations',
        'Document processing assistance',
        'Embassy partnership benefits',
        'Dedicated team support'
      ],
      href: '/services'
    },
    {
      category: 'Certification Translation',
      icon: '🌐',
      description: 'Professional document translation services for visa applications',
      features: [
        'Certified document translation',
        'Multiple language support',
        'Official certification',
        'Fast turnaround times',
        'Quality assurance guarantee'
      ],
      href: '/services'
    },
    {
      category: 'Travel Insurance',
      icon: '🛡️',
      description: 'Comprehensive travel and health insurance coverage',
      features: [
        'Travel medical insurance',
        'Trip cancellation coverage',
        'Emergency assistance',
        '24/7 support hotline',
        'Flexible coverage options'
      ],
      href: '/services'
    },
    {
      category: 'Hotel Reservations',
      icon: '🏨',
      description: 'Hotel reservations worldwide to support your visa application',
      features: [
        'Verified hotel bookings',
        'Flexible cancellation options',
        'Great deals and discounts',
        'Suitable for visa requirements',
        '24/7 customer support'
      ],
      href: '/services'
    },
    {
      category: 'Flight Bookings',
      icon: '✈️',
      description: 'Flight bookings with flexible options for your travel needs',
      features: [
        'Best price deals',
        'Multiple airline options',
        'Flexible booking arrangements',
        'Round-trip and multi-city',
        'Completed in one place'
      ],
      href: '/services'
    },
    {
      category: 'Trip Plans',
      icon: '🗺️',
      description: 'Complete travel itinerary planning and coordination',
      features: [
        'Customized itineraries',
        'Local expert recommendations',
        'Activity bookings',
        'Transportation arrangements',
        'Emergency support'
      ],
      href: '/services/trip-plans'
    }
  ],
  ctaPrimaryText: 'Get Free Consultation',
  ctaPrimaryHref: '/contact',
  ctaSecondaryText: 'Call +962 79 6090 319',
  ctaSecondaryHref: 'tel:+962796090319',
  isActive: true,
  updatedAt: new Date(),
};