import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';
import { getCountryFromArabicSlug } from '@/lib/utils/arabic-slugs';

// Force dynamic rendering to avoid database calls during static export
export const dynamic = 'force-dynamic';

export default async function ArabicTravelVisaPage({ params }: { params: { country: string } }) {
  const { country: arabicSlug } = params;
  // Convert Arabic slug to English country code
  const countryCode = getCountryFromArabicSlug(arabicSlug);
  const visas = await getVisasForCountryPage(countryCode);
  // Title will be generated in VisaDetails component based on language
  return <VisaDetails country={countryCode} visas={visas} />;
}

