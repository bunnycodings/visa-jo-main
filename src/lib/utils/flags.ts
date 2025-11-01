/**
 * Utility function to get local flag image paths
 * Uses PNG files from public/img/flag/ when available
 */

export const getFlagPath = (countryName: string): string => {
  // Map country names to local PNG files that exist in public/img/flag/
  const flagMap: Record<string, string> = {
    // PNG files (confirmed to exist in public/img/flag/)
    'Canada': '/img/flag/canada.png',
    'United Kingdom': '/img/flag/uk.png',
    'UK': '/img/flag/uk.png',
    'USA': '/img/flag/us.png',
    'US': '/img/flag/us.png',
    'United States': '/img/flag/us.png',
    'UAE': '/img/flag/uae.png',
    'Australia': '/img/flag/australia.png',
    'India': '/img/flag/india.png',
    'Spain': '/img/flag/spain.png',
    'France': '/img/flag/france.png',
    'Italy': '/img/flag/italy.png',
    'Germany': '/img/flag/germany.png',
    'Austria': '/img/flag/austria.png',
    'Netherlands': '/img/flag/netherlands.png',
    'Greece': '/img/flag/greece.svg',
    'Belgium': '/img/flag/belgium.svg',
    'Switzerland': '/img/flag/switzerland.svg',
    'Portugal': '/img/flag/portugal.svg',
    'Sweden': '/img/flag/sweden.svg',
    'Norway': '/img/flag/norway.svg',
    'Denmark': '/img/flag/denmark.svg',
    'Finland': '/img/flag/finland.svg',
    'Poland': '/img/flag/poland.svg',
    'Czech Republic': '/img/flag/czech-republic.svg',
    'Hungary': '/img/flag/hungary.svg',
    'Romania': '/img/flag/romania.svg',
    'Bulgaria': '/img/flag/bulgaria.svg',
    'Russia': '/img/flag/russia.svg',
    'China': '/img/flag/china.svg',
    'Japan': '/img/flag/japan.svg',
    'South Korea': '/img/flag/south-korea.svg',
    'Thailand': '/img/flag/thailand.svg',
    'Singapore': '/img/flag/singapore.svg',
    'Malaysia': '/img/flag/malaysia.svg',
    'Indonesia': '/img/flag/indonesia.svg',
    'Philippines': '/img/flag/philippines.svg',
    'Vietnam': '/img/flag/vietnam.svg',
    'New Zealand': '/img/flag/new-zealand.svg',
    'Mexico': '/img/flag/mexico.svg',
    'Brazil': '/img/flag/brazil.svg',
    'Argentina': '/img/flag/argentina.svg',
    'Chile': '/img/flag/chile.svg',
    'South Africa': '/img/flag/south-africa.svg',
    'Turkey': '/img/flag/turkey.svg',
    'Israel': '/img/flag/israel.svg',
    'Jordan': '/img/flag/jordan.svg',
    'Lebanon': '/img/flag/lebanon.svg',
    'Egypt': '/img/flag/egypt.svg',
    'Saudi Arabia': '/img/flag/saudi-arabia.svg',
    'Qatar': '/img/flag/qatar.svg',
    'Kuwait': '/img/flag/kuwait.svg',
    'Oman': '/img/flag/oman.svg',
    'Bahrain': '/img/flag/bahrain.svg',
    'Pakistan': '/img/flag/pakistan.svg',
    'Bangladesh': '/img/flag/bangladesh.svg',
    'Sri Lanka': '/img/flag/sri-lanka.svg',
    'Nepal': '/img/flag/nepal.svg',
    'Iran': '/img/flag/iran.svg',
    'Iraq': '/img/flag/iraq.svg',
    'Panama': '/img/flag/panama.svg',
    'Algeria': '/img/flag/algeria.svg',
    'Morocco': '/img/flag/morocco.svg',
    'Tunisia': '/img/flag/tunisia.svg',
    'Kenya': '/img/flag/kenya.svg',
    'Iceland': '/img/flag/iceland.svg',
  };
  
  // Return mapped flag if available
  const mapped = flagMap[countryName];
  if (mapped) return mapped;
  
  // Fallback: try PNG first, then SVG
  const normalizedName = countryName.toLowerCase().replace(/\s+/g, '-');
  return `/img/flag/${normalizedName}.png`;
};

/**
 * Get flag path with external URL fallback
 */
export const getFlagPathWithFallback = (
  countryName: string, 
  fallbackUrl?: string
): string => {
  const localPath = getFlagPath(countryName);
  // For now, return local path - error handling will use fallback in components
  return localPath;
};

