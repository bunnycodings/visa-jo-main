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
  bannerText: 'Visa Office in Jordan',
  title: 'Visa Office in Jordan',
  subtitle:
    'Are you planning to travel abroad but unsure of the visa application process? Our Visa Office in Jordan is here to assist you with every aspect of your visa application process. We understand that obtaining a travel visa can be a complex and time-consuming process, with specific requirements and regulations that must be met to ensure the success of your application. That\'s why our team of experienced professionals is here to help you choose the best destination and apply for the most appropriate visa type based on your individual needs and circumstances. We offer expert visa consultations, preparation of visa requirements, and full visa processing services from start to finish, ensuring that your application is handled efficiently and effectively. Furthermore, traveling has numerous benefits for your physical and psychological well-being, and we believe that a lack of time or money should not hold you back from exploring new places. With low-cost flights and flexible travel options, it\'s easier than ever to travel, even if you have a full-time job or a family to take care of. So, don\'t let anything hold you back from your travel dreams – contact our Visa Office in Jordan today to get started on your visa application process and experience the joys of travel!',
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
  title: 'Get Your Visa',
  steps: [
    { title: 'Schedule Your Consultation' },
    { title: 'Document Review & Preparation' },
    { title: 'Complete Application Submission' },
    { title: 'Application Review & Processing' },
    { title: 'Visa Approval & Delivery' },
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
  intro: 'VisaJo provides expert consultations to help you choose the best destination and visa type that suits your needs.',
  story:
    'Our dedicated team ensures speed and accuracy in every service, including certified translations, flight bookings, hotel reservations, and trip plans—making sure you\'re fully prepared for your journey.',
  whyTitle: 'What We Do…',
  whyItems: [
    { title: 'Visa Consultations', description: 'Expert guidance on visa preparations, requirements, and document processing' },
    { title: 'Certified Translation', description: 'Professional document translation services' },
    { title: 'Travel Insurance', description: 'Comprehensive travel and health insurance coverage' },
    { title: 'Hotel Reservations', description: 'Hotel reservations worldwide to support your visa application' },
    { title: 'Flight Bookings', description: 'Flight bookings with flexible options for your travel needs' },
    { title: 'Trip Plan', description: 'Complete travel itinerary planning and coordination' },
  ],
  missionTitle: 'Our Mission',
  missionText:
    'VisaJo provides expert consultations to help you choose the best destination and visa type that suits your needs. Our dedicated team ensures speed and accuracy in every service, including certified translations, flight bookings, hotel reservations, and trip plans—making sure you\'re fully prepared for your journey.',
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
      category: 'Certified Translation',
      icon: '🌐',
      description: 'Professional document translation services',
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
      category: 'Insurance',
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
      category: 'Hotel Bookings',
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
      category: 'Trip Plan',
      icon: '🗺️',
      description: 'Complete travel itinerary planning and coordination',
      features: [
        'Customized itineraries',
        'Local expert recommendations',
        'Activity bookings',
        'Transportation arrangements',
        'Emergency support'
      ],
      href: '/services'
    }
  ],
  ctaPrimaryText: 'Get Free Consultation',
  ctaPrimaryHref: '/contact',
  ctaSecondaryText: 'Call +962 79 6090 319',
  ctaSecondaryHref: 'tel:+962796090319',
  isActive: true,
  updatedAt: new Date(),
};

export interface PageMetadata {
  page: string; // page identifier: 'home', 'about', 'contact', 'services', 'visa-uae', etc.
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  author?: string;
  isActive: boolean;
  updatedAt?: Date;
}

export const defaultPageMetadata: Record<string, PageMetadata> = {
  home: {
    page: 'home',
    title: 'Fast & Reliable Visa Services from Jordan | Visa Consulting',
    description: 'Professional visa consulting services for 100+ destinations including UAE, UK, US, Canada, Australia, and Schengen visas. Expert guidance and fast processing.',
    keywords: 'visa services, travel visa, visa consulting, UAE visa, UK visa, US visa, Canada visa, visa assistance, Amman, Jordan',
    ogTitle: 'Visa Consulting - Your Trusted Visa Partner',
    ogDescription: 'Apply for your travel visa online with expert support',
    isActive: true,
    updatedAt: new Date(),
  },
  about: {
    page: 'about',
    title: 'About Us | Professional Visa Consulting Services | Visa Jo',
    description: 'Learn about our professional visa consulting team with years of experience helping thousands of travelers get their visas approved quickly and reliably.',
    keywords: 'about visa consulting, visa company, professional visa services, trusted visa consultant, visa expertise, Amman Jordan',
    ogTitle: 'About Visa Consulting',
    ogDescription: 'Professional visa consulting with 10+ years of experience',
    isActive: true,
    updatedAt: new Date(),
  },
  contact: {
    page: 'contact',
    title: 'Contact Us | Visa Consulting Services | Get in Touch',
    description: 'Contact our professional visa consulting team for personalized assistance. Call us, email, or visit our office in Amman, Jordan.',
    keywords: 'contact visa consulting, visa support, customer service, visa help, reach us, Amman contact',
    ogTitle: 'Contact Visa Consulting',
    ogDescription: 'Get in touch with our visa experts',
    isActive: true,
    updatedAt: new Date(),
  },
  services: {
    page: 'services',
    title: 'Our Services | Visa Consulting & Travel Solutions',
    description: 'Complete visa consulting services including visa applications, document translation, insurance, flight bookings, hotel reservations, and trip planning.',
    keywords: 'visa services, consultation, translation, insurance, flight booking, hotel reservation, trip planning, travel solutions',
    ogTitle: 'Visa Consulting Services',
    ogDescription: 'Complete travel and visa solutions in one place',
    isActive: true,
    updatedAt: new Date(),
  },
  'visa-uae': {
    page: 'visa-uae',
    title: 'UAE Visa | Professional Visa Consulting | Visa Jo',
    description: 'Get your UAE visa quickly and easily. Professional consulting for Dubai, Abu Dhabi, and all UAE Emirates. Expert guidance and fast processing.',
    keywords: 'UAE visa, Dubai visa, Abu Dhabi visa, Emirates visa, UAE visit visa, work visa',
    ogTitle: 'UAE Visa Services',
    ogDescription: 'Apply for your UAE visa with expert guidance',
    isActive: true,
    updatedAt: new Date(),
  },
  'visa-uk': {
    page: 'visa-uk',
    title: 'UK Visa | Professional Visa Consulting | Visa Jo',
    description: 'Apply for your UK visa with our professional consulting services. Tourist, student, work, and family visas. Fast and reliable.',
    keywords: 'UK visa, British visa, student visa UK, work visa UK, tourist visa, family visa',
    ogTitle: 'UK Visa Services',
    ogDescription: 'UK visa application assistance from experts',
    isActive: true,
    updatedAt: new Date(),
  },
  'visa-us': {
    page: 'visa-us',
    title: 'US Visa | Professional Visa Consulting | Visa Jo',
    description: 'Professional US visa consulting services for all visa types. Tourist, student, work, and immigrant visas. Expert guidance guaranteed.',
    keywords: 'US visa, American visa, tourist visa, student visa, work visa, green card, immigration',
    ogTitle: 'US Visa Services',
    ogDescription: 'US visa application with professional guidance',
    isActive: true,
    updatedAt: new Date(),
  },
  'visa-canada': {
    page: 'visa-canada',
    title: 'Canada Visa | Professional Visa Consulting | Visa Jo',
    description: 'Get your Canada visa with our expert consulting. Tourist, student, work, and PR visas. Fast processing and reliable service.',
    keywords: 'Canada visa, Canadian visa, tourist visa, student visa, work visa, express entry, PR',
    ogTitle: 'Canada Visa Services',
    ogDescription: 'Canada visa assistance from experienced consultants',
    isActive: true,
    updatedAt: new Date(),
  },
  'visa-australia': {
    page: 'visa-australia',
    title: 'Australia Visa | Professional Visa Consulting | Visa Jo',
    description: 'Apply for your Australia visa with professional guidance. Tourist, student, work, and skilled migration visas available.',
    keywords: 'Australia visa, Australian visa, tourist visa, student visa, work visa, skilled migration',
    ogTitle: 'Australia Visa Services',
    ogDescription: 'Australia visa consulting with expert advice',
    isActive: true,
    updatedAt: new Date(),
  },
  'visa-india': {
    page: 'visa-india',
    title: 'India Visa | Professional Visa Consulting | Visa Jo',
    description: 'Get your India visa easily with our consulting services. Tourist, business, and employment visas with fast processing.',
    keywords: 'India visa, Indian visa, tourist visa, business visa, employment visa, eVisa',
    ogTitle: 'India Visa Services',
    ogDescription: 'India visa application made easy',
    isActive: true,
    updatedAt: new Date(),
  },
  'visa-germany': {
    page: 'visa-germany',
    title: 'Germany Visa | Schengen Visa | Professional Consulting | Visa Jo',
    description: 'Apply for your Germany/Schengen visa with expert assistance. Tourist, business, and student visas. Fast and reliable service.',
    keywords: 'Germany visa, Schengen visa, tourist visa, business visa, student visa, Europe travel',
    ogTitle: 'Germany Visa Services',
    ogDescription: 'Germany and Schengen visa consulting',
    isActive: true,
    updatedAt: new Date(),
  },
  'visa-france': {
    page: 'visa-france',
    title: 'France Visa | Schengen Visa | Professional Consulting | Visa Jo',
    description: 'Get your France/Schengen visa with professional guidance. All visa types available including tourist, business, and student visas.',
    keywords: 'France visa, Schengen visa, tourist visa, Paris visa, business visa, student visa',
    ogTitle: 'France Visa Services',
    ogDescription: 'France and Schengen visa expertise',
    isActive: true,
    updatedAt: new Date(),
  },
  'visa-netherlands': {
    page: 'visa-netherlands',
    title: 'Netherlands Visa | Schengen Visa | Professional Consulting | Visa Jo',
    description: 'Apply for your Netherlands/Schengen visa. Expert consulting for all visa types with fast and reliable processing.',
    keywords: 'Netherlands visa, Schengen visa, Amsterdam visa, tourist visa, business visa, work visa',
    ogTitle: 'Netherlands Visa Services',
    ogDescription: 'Netherlands and Schengen visa assistance',
    isActive: true,
    updatedAt: new Date(),
  },
  'visa-spain': {
    page: 'visa-spain',
    title: 'Spain Visa | Schengen Visa | Professional Consulting | Visa Jo',
    description: 'Get your Spain/Schengen visa with professional guidance. Tourist, business, and student visas with expert support.',
    keywords: 'Spain visa, Schengen visa, Madrid visa, Barcelona visa, tourist visa, business visa',
    ogTitle: 'Spain Visa Services',
    ogDescription: 'Spain and Schengen visa consulting services',
    isActive: true,
    updatedAt: new Date(),
  },
  'visa-italy': {
    page: 'visa-italy',
    title: 'Italy Visa | Schengen Visa | Professional Consulting | Visa Jo',
    description: 'Apply for your Italy/Schengen visa with expert assistance. All visa types available with fast and reliable service.',
    keywords: 'Italy visa, Schengen visa, Rome visa, tourist visa, business visa, student visa',
    ogTitle: 'Italy Visa Services',
    ogDescription: 'Italy and Schengen visa expertise',
    isActive: true,
    updatedAt: new Date(),
  },
  'visa-austria': {
    page: 'visa-austria',
    title: 'Austria Visa | Schengen Visa | Professional Consulting | Visa Jo',
    description: 'Get your Austria/Schengen visa with professional guidance. Complete visa consulting for all application types.',
    keywords: 'Austria visa, Schengen visa, Vienna visa, tourist visa, business visa, work visa',
    ogTitle: 'Austria Visa Services',
    ogDescription: 'Austria and Schengen visa consulting',
    isActive: true,
    updatedAt: new Date(),
  },
};