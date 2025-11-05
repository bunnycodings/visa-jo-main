import { getVisasByCountry } from './db-helpers';
import { autoInitializeDatabase } from './auto-init';
import { VisaType } from '@/types/models/VisaApplication';

export async function getVisasForCountryPage(country: string): Promise<VisaType[]> {
  let visas: VisaType[] = [];

  try {
    await autoInitializeDatabase();
    
    // Try exact match first
    visas = await getVisasByCountry(country);
    
    // If no results, try common variations
    if (visas.length === 0) {
      const variations: Record<string, string[]> = {
        'uae': ['UAE', 'United Arab Emirates'],
        'australia': ['Australia', 'AU'],
        'uk': ['UK', 'United Kingdom', 'Great Britain'],
        'us': ['US', 'USA', 'United States'],
        'canada': ['Canada', 'CA'],
        'india': ['India', 'IN'],
        'germany': ['Germany', 'DE'],
        'france': ['France', 'FR'],
        'netherlands': ['Netherlands', 'NL', 'Holland'],
        'spain': ['Spain', 'ES'],
        'italy': ['Italy', 'IT'],
        'austria': ['Austria', 'AT']
      };
      
      const countryLower = country.toLowerCase();
      if (variations[countryLower]) {
        for (const variation of variations[countryLower]) {
          visas = await getVisasByCountry(variation);
          if (visas.length > 0) {
            console.log(`[getVisasForCountryPage] Found visas using variation: "${variation}"`);
            break;
          }
        }
      }
    }
    
    // Log detailed info for debugging
    if (visas.length === 0) {
      console.log(`[getVisasForCountryPage] No visas found for country: "${country}"`);
      console.log(`[getVisasForCountryPage] Tried variations but still no results`);
    } else {
      console.log(`[getVisasForCountryPage] Found ${visas.length} visa(s) for country: "${country}"`);
    }
  } catch (error: any) {
    console.error(`[getVisasForCountryPage] Error fetching visas for ${country}:`, error);
    console.error(`[getVisasForCountryPage] Error details:`, {
      message: error?.message,
      code: error?.code,
      stack: error?.stack?.split('\n').slice(0, 3)
    });
    // Return empty array on error
  }

  return visas;
}

