import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

// Force dynamic rendering to avoid database calls during static export
export const dynamic = 'force-dynamic';

export default async function VisaCountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const visas = await getVisasForCountryPage(country);
  // Title will be generated in VisaDetails component based on language
  return <VisaDetails country={country} visas={visas} />;
}
