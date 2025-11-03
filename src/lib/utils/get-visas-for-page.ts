import { getVisasByCountry } from './db-helpers';
import { autoInitializeDatabase } from './auto-init';
import { VisaType } from '@/types/models/VisaApplication';

export async function getVisasForCountryPage(country: string): Promise<VisaType[]> {
  let visas: VisaType[] = [];

  try {
    await autoInitializeDatabase();
    visas = await getVisasByCountry(country);
    
    // Log if no visas found for debugging
    if (visas.length === 0) {
      console.log(`No visas found for country: ${country}. Database may need initialization.`);
    }
  } catch (error) {
    console.error(`Error fetching visas for ${country}:`, error);
    // Return empty array on error
  }

  return visas;
}

