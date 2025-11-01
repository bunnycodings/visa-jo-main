/**
 * Site-wide configuration from environment variables
 * These values should be set in .env.local file
 */

export const siteConfig = {
  // Site Information
  address: process.env.SITE_ADDRESS || 'Al Qaherah, Abdoun, Building Number 24, Amman-Jordan',
  email: process.env.SITE_EMAIL || process.env.CONTACT_EMAIL || 'info@visa-jo.com',
  phone: process.env.SITE_PHONE || process.env.CONTACT_PHONE || '0796090319',
  
  // Contact Information
  contactEmail: process.env.CONTACT_EMAIL || 'info@visa-jo.com',
  contactPhone: process.env.CONTACT_PHONE || '0796090319',
  contactAddress: process.env.CONTACT_ADDRESS || 'Al Qaherah, Abdoun, Building Number 24, Amman-Jordan',
  businessHours: process.env.BUSINESS_HOURS || 'Mon - Fri: 09:00 AM - 18:00 PM',
  
  // Social Media Links
  facebookUrl: process.env.FACEBOOK_URL || '#',
  twitterUrl: process.env.TWITTER_URL || '#',
  instagramUrl: process.env.INSTAGRAM_URL || '#',
  
  // Helper functions to format phone numbers
  getFormattedPhone: () => {
    const phone = siteConfig.phone.replace(/\D/g, ''); // Remove all non-digits
    if (phone.startsWith('962')) {
      return `+${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(8)}`;
    } else if (phone.startsWith('0')) {
      return `+962 ${phone.slice(1, 3)} ${phone.slice(3, 6)} ${phone.slice(6)}`;
    }
    return phone;
  },
  
  getTelLink: () => {
    const phone = siteConfig.phone.replace(/\D/g, '');
    if (phone.startsWith('962')) {
      return `tel:+${phone}`;
    } else if (phone.startsWith('0')) {
      return `tel:+962${phone.slice(1)}`;
    }
    return `tel:${phone}`;
  },
  
  getWhatsAppLink: () => {
    const phone = siteConfig.phone.replace(/\D/g, '');
    let whatsappNumber = phone;
    if (phone.startsWith('0')) {
      whatsappNumber = `962${phone.slice(1)}`;
    } else if (!phone.startsWith('962')) {
      whatsappNumber = `962${phone}`;
    }
    return `https://wa.me/${whatsappNumber}`;
  },
};

