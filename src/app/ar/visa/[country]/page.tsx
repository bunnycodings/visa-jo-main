import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';
import { getCountryFromArabicSlug, decodeArabicSlug } from '@/lib/utils/arabic-slugs';

// Force dynamic rendering to avoid database calls during static export
export const dynamic = 'force-dynamic';

export default async function ArabicVisaCountryPage({ params }: { params: { country: string } }) {
  const { country } = params;
  
  // The middleware should have already converted Arabic slugs to country codes
  // But handle both cases: Arabic slug or English country code
  let countryCode: string;
  
  try {
    // Try to decode if URL-encoded
    const decoded = decodeURIComponent(country);
    countryCode = getCountryFromArabicSlug(decoded);
    
    // If still Arabic text, try without decoding
    if (countryCode === decoded || countryCode === country) {
      countryCode = getCountryFromArabicSlug(country);
    }
    
    // If still not found, assume it's already an English country code
    if (countryCode === decoded || countryCode === country) {
      countryCode = country.toLowerCase();
    }
  } catch {
    // If decoding fails, use as-is
    countryCode = getCountryFromArabicSlug(country) || country.toLowerCase();
  }
  
  const visas = await getVisasForCountryPage(countryCode);
  // Title will be generated in VisaDetails component based on language
  return <VisaDetails country={countryCode} visas={visas} />;
}

