import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';
import { getCountryFromArabicSlug } from '@/lib/utils/arabic-slugs';
import { notFound } from 'next/navigation';

// Force dynamic rendering to avoid database calls during static export
export const dynamic = 'force-dynamic';

export default async function ArabicVisaCountryPage({ params }: { params: Promise<{ country: string }> }) {
  try {
    const { country } = await params;
    
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
    
    // Validate country code
    const validCountries = ['uae', 'uk', 'us', 'canada', 'australia', 'india', 'germany', 'france', 'netherlands', 'spain', 'italy', 'austria'];
    const countryLower = countryCode.toLowerCase();
    
    if (!validCountries.includes(countryLower)) {
      notFound();
    }
    
    const visas = await getVisasForCountryPage(countryLower);
    // Title will be generated in VisaDetails component based on language
    return <VisaDetails country={countryLower} visas={visas} />;
  } catch (error) {
    console.error('Error in ArabicVisaCountryPage:', error);
    notFound();
  }
}

