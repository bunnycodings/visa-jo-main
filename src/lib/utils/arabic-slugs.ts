/**
 * Arabic slug mappings for URL generation
 * Maps English country codes to Arabic URL slugs
 */

export const arabicSlugs: Record<string, string> = {
  // Travel visas
  'uae': 'فيزا-الإمارات',
  'uk': 'فيزا-بريطانيا',
  'us': 'فيزا-أمريكا',
  'canada': 'فيزا-كندا',
  'australia': 'فيزا-أستراليا',
  'india': 'فيزا-الهند',
  
  // Schengen visas
  'germany': 'فيزا-ألمانيا',
  'france': 'فيزا-فرنسا',
  'netherlands': 'فيزا-هولندا',
  'spain': 'فيزا-إسبانيا',
  'italy': 'فيزا-إيطاليا',
  'austria': 'فيزا-النمسا',
};

// Reverse mapping: Arabic slug to English country code
export const arabicSlugToCountry: Record<string, string> = {
  'فيزا-الإمارات': 'uae',
  'فيزا-بريطانيا': 'uk',
  'فيزا-أمريكا': 'us',
  'فيزا-كندا': 'canada',
  'فيزا-أستراليا': 'australia',
  'فيزا-الهند': 'india',
  'فيزا-ألمانيا': 'germany',
  'فيزا-فرنسا': 'france',
  'فيزا-هولندا': 'netherlands',
  'فيزا-إسبانيا': 'spain',
  'فيزا-إيطاليا': 'italy',
  'فيزا-النمسا': 'austria',
};

// Category slugs
export const arabicCategorySlugs = {
  travel: 'فيزا-السفر',
  schengen: 'فيزا-شنغن',
};

/**
 * Get Arabic slug for a country code
 */
export function getArabicSlug(country: string): string {
  return arabicSlugs[country.toLowerCase()] || country;
}

/**
 * Get English country code from Arabic slug
 * Handles both encoded and decoded slugs
 */
export function getCountryFromArabicSlug(slug: string): string {
  // Try direct match first
  if (arabicSlugToCountry[slug]) {
    return arabicSlugToCountry[slug];
  }
  
  // Try URL-decoded version
  try {
    const decoded = decodeURIComponent(slug);
    if (arabicSlugToCountry[decoded]) {
      return arabicSlugToCountry[decoded];
    }
  } catch {
    // Not URL-encoded, continue
  }
  
  // Check if it's already an English country code
  const lowerSlug = slug.toLowerCase();
  const englishCountries = ['uae', 'uk', 'us', 'canada', 'australia', 'india', 'germany', 'france', 'netherlands', 'spain', 'italy', 'austria'];
  if (englishCountries.includes(lowerSlug)) {
    return lowerSlug;
  }
  
  return slug;
}

/**
 * Check if a country is a travel visa country
 */
export function isTravelVisaCountry(country: string): boolean {
  const travelCountries = ['uae', 'uk', 'us', 'canada', 'australia', 'india'];
  return travelCountries.includes(country.toLowerCase());
}

/**
 * Get Arabic category slug based on country
 */
export function getArabicCategorySlug(country: string): string {
  return isTravelVisaCountry(country) 
    ? arabicCategorySlugs.travel 
    : arabicCategorySlugs.schengen;
}

/**
 * Generate Arabic URL for a visa page
 * Next.js will handle URL encoding automatically
 */
export function getArabicVisaUrl(country: string): string {
  const categorySlug = getArabicCategorySlug(country);
  const countrySlug = getArabicSlug(country);
  // Return unencoded - Next.js router will handle encoding
  return `/ar/${categorySlug}/${countrySlug}`;
}

/**
 * Decode Arabic slug from URL
 */
export function decodeArabicSlug(encoded: string): string {
  try {
    return decodeURIComponent(encoded);
  } catch {
    return encoded;
  }
}

