import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';
import { notFound } from 'next/navigation';
import { getCountryFromArabicSlug } from '@/lib/utils/arabic-slugs';

// Force dynamic rendering to avoid database calls during static export
export const dynamic = 'force-dynamic';

export default async function VisaCountryPage({ 
  params 
}: { 
  params: Promise<{ locale: string; country: string }> 
}) {
  try {
    const { locale, country } = await params;
    
    // Convert Arabic slug to country code if needed
    let countryCode = getCountryFromArabicSlug(country);
    
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
    console.error('Error in VisaCountryPage:', error);
    notFound();
  }
}
