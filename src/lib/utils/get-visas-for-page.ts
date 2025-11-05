import { getVisasByCountry } from './db-helpers';
import { autoInitializeDatabase } from './auto-init';
import { VisaType } from '@/types/models/VisaApplication';

export async function getVisasForCountryPage(country: string): Promise<VisaType[]> {
  let visas: VisaType[] = [];

  try {
    await autoInitializeDatabase();
    
    const countryLower = country.toLowerCase().trim();
    
    // Define all possible variations for each country
    const variations: Record<string, string[]> = {
      'uae': ['uae', 'UAE', 'United Arab Emirates', 'united arab emirates', 'emirates'],
      'australia': ['australia', 'Australia', 'AU', 'au'],
      'uk': ['uk', 'UK', 'United Kingdom', 'united kingdom', 'Great Britain', 'great britain', 'britain'],
      'us': ['us', 'US', 'USA', 'usa', 'United States', 'united states', 'america'],
      'canada': ['canada', 'Canada', 'CA', 'ca'],
      'india': ['india', 'India', 'IN', 'in'],
      'germany': ['germany', 'Germany', 'DE', 'de'],
      'france': ['france', 'France', 'FR', 'fr'],
      'netherlands': ['netherlands', 'Netherlands', 'NL', 'nl', 'Holland', 'holland'],
      'spain': ['spain', 'Spain', 'ES', 'es'],
      'italy': ['italy', 'Italy', 'IT', 'it'],
      'austria': ['austria', 'Austria', 'AT', 'at']
    };
    
    // Get all variations for this country
    const countryVariations = variations[countryLower] || [country];
    
    // Try each variation until we find results
    for (const variation of countryVariations) {
      visas = await getVisasByCountry(variation);
      if (visas.length > 0) {
        console.log(`[getVisasForCountryPage] Found ${visas.length} visa(s) using variation: "${variation}" for country: "${country}"`);
        break;
      }
    }
    
    // If still no results, try a more flexible search using LIKE
    if (visas.length === 0) {
      console.log(`[getVisasForCountryPage] Trying flexible search for country: "${country}"`);
      visas = await getVisasByCountryFlexible(country);
    }
    
    // Log detailed info for debugging
    if (visas.length === 0) {
      console.log(`[getVisasForCountryPage] No visas found for country: "${country}"`);
      console.log(`[getVisasForCountryPage] Tried all variations: ${countryVariations.join(', ')}`);
    } else {
      console.log(`[getVisasForCountryPage] Successfully found ${visas.length} visa(s) for country: "${country}"`);
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

// Flexible search that uses LIKE for partial matches
async function getVisasByCountryFlexible(country: string): Promise<VisaType[]> {
  const { query } = await import('./mysql');
  const { VisaRow } = await import('@/types/models/VisaApplication');
  
  try {
    // Try LIKE search with the country code
    const countryLower = country.toLowerCase().trim();
    const rows = await query<VisaRow>(
      `SELECT * FROM visas 
       WHERE (LOWER(country) LIKE LOWER(?) OR LOWER(country) LIKE LOWER(?)) 
       AND is_active = 1 
       ORDER BY name ASC`,
      [`%${countryLower}%`, `${countryLower}%`]
    );
    
    if (rows.length > 0) {
      console.log(`[getVisasByCountryFlexible] Found ${rows.length} visa(s) using LIKE search for: "${country}"`);
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        country: row.country,
        category: row.category,
        requirements: JSON.parse(row.requirements),
        processingTime: row.processing_time,
        validity: row.validity,
        fees: JSON.parse(row.fees),
        description: row.description,
        notes: row.notes,
        embassyInfo: row.embassy_info || null,
        embassyAppointment: row.embassy_appointment || null,
        mainRequirements: row.main_requirements || null,
        visaTypes: row.visa_types ? JSON.parse(row.visa_types) : null,
        heroImage: row.hero_image || null,
        nameAr: row.name_ar || null,
        descriptionAr: row.description_ar || null,
        notesAr: row.notes_ar || null,
        embassyInfoAr: row.embassy_info_ar || null,
        embassyAppointmentAr: row.embassy_appointment_ar || null,
        mainRequirementsAr: row.main_requirements_ar || null,
        requirementsAr: row.requirements_ar ? JSON.parse(row.requirements_ar) : null,
        visaTypesAr: row.visa_types_ar ? JSON.parse(row.visa_types_ar) : null,
        processingTimeAr: row.processing_time_ar || null,
        validityAr: row.validity_ar || null,
        isActive: Boolean(row.is_active),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    }
  } catch (error) {
    console.error(`[getVisasByCountryFlexible] Error in flexible search:`, error);
  }
  
  return [];
}

