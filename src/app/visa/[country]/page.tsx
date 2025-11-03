import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

// Force dynamic rendering to avoid database calls during static export
export const dynamic = 'force-dynamic';

export default async function VisaCountryPage({ params }: { params: { country: string } }) {
  const { country } = params;
  const visas = await getVisasForCountryPage(country);
  return <VisaDetails country={country} title={`Visa Information for ${country.toUpperCase()}`} visas={visas} />;
}
