import { getAllVisas } from '@/lib/utils/db-helpers';
import { getAllVisas as getFallbackVisas } from '@/lib/data/visas';
import VisaDetails from '@/components/VisaDetails';
import { notFound } from 'next/navigation';
import { getCountryFromArabicSlug } from '@/lib/utils/arabic-slugs';
import { autoInitializeDatabase } from '@/lib/utils/auto-init';

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
    
    // Try to get visas from database
    let visas = [];
    try {
      await autoInitializeDatabase();
      const allVisas = await getAllVisas();
      visas = allVisas.filter(v => {
        const visaCountry = v.country?.toLowerCase().trim();
        return visaCountry === countryLower;
      });
    } catch (error: any) {
      // If database fails, use fallback data
      console.log('Database unavailable, using fallback data');
      const allVisas = getFallbackVisas();
      visas = allVisas.filter(v => {
        const visaCountry = v.country?.toLowerCase().trim();
        return visaCountry === countryLower;
      });
    }
    
    // Title will be generated in VisaDetails component based on language
    return <VisaDetails country={countryLower} visas={visas} />;
  } catch (error) {
    console.error('Error in VisaCountryPage:', error);
    notFound();
  }
}
