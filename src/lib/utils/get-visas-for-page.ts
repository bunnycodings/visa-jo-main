import { getVisasByCountry } from './db-helpers';
import { autoInitializeDatabase } from './auto-init';

export async function getVisasForCountryPage(country: string) {
  let visas = [];

  try {
    await autoInitializeDatabase();
    visas = await getVisasByCountry(country);
  } catch (error) {
    console.warn('Database connection unavailable:', error);
  }

  return visas;
}

