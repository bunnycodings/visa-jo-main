/**
 * Utility function to get service icon image paths
 * Uses PNG files from public/img/icons/
 */

export const getServiceIcon = (serviceName: string): string => {
  const iconMap: Record<string, string> = {
    'Visa Consultations': '/img/icons/visa.png',
    'Certificated Translations': '/img/icons/translate.png',
    'Certification Translation': '/img/icons/translate.png', // Legacy support
    'Insurance': '/img/icons/insurance.png',
    'Travel Insurance': '/img/icons/insurance.png',
    'Hotel Bookings': '/img/icons/h-booking.png',
    'Hotel Reservations': '/img/icons/h-booking.png',
    'Flight Bookings': '/img/icons/flight-book.png',
    'Trip Plan': '/img/icons/trip.png',
    'Trip Plans': '/img/icons/trip.png', // Legacy support
  };
  
  return iconMap[serviceName] || '/img/icons/visa.png';
};

