/**
 * Arabic slug utilities for visa URLs
 * Maps country codes to Arabic slugs and vice versa
 */

// Arabic slug to country code mapping
const arabicSlugs: Record<string, string> = {
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

// Country code to Arabic slug mapping
const countryToArabicSlug: Record<string, string> = {
  'uae': 'فيزا-الإمارات',
  'uk': 'فيزا-بريطانيا',
  'us': 'فيزا-أمريكا',
  'canada': 'فيزا-كندا',
  'australia': 'فيزا-أستراليا',
  'india': 'فيزا-الهند',
  'germany': 'فيزا-ألمانيا',
  'france': 'فيزا-فرنسا',
  'netherlands': 'فيزا-هولندا',
  'spain': 'فيزا-إسبانيا',
  'italy': 'فيزا-إيطاليا',
  'austria': 'فيزا-النمسا',
};

/**
 * Convert Arabic slug to country code
 * @param slug - Arabic slug (e.g., 'فيزا-الإمارات')
 * @returns Country code (e.g., 'uae')
 */
export function getCountryFromArabicSlug(slug: string): string {
  const decoded = decodeURIComponent(slug);
  return arabicSlugs[decoded] || arabicSlugs[slug] || slug;
}

/**
 * Convert country code to Arabic slug
 * @param country - Country code (e.g., 'uae')
 * @returns Arabic slug (e.g., 'فيزا-الإمارات')
 */
export function getArabicSlug(country: string): string {
  const countryLower = country.toLowerCase().trim();
  return countryToArabicSlug[countryLower] || country;
}

/**
 * Get Arabic visa URL for a country
 * @param country - Country code (e.g., 'uae')
 * @returns Arabic visa URL (e.g., '/ar/visa/فيزا-الإمارات')
 */
export function getArabicVisaUrl(country: string): string {
  const arabicSlug = getArabicSlug(country);
  return `/ar/visa/${arabicSlug}`;
}

