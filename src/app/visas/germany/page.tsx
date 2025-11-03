import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

// Force dynamic rendering to avoid database calls during static export
export const dynamic = 'force-dynamic';

export default async function GermanyVisaPage() {
  const visas = await getVisasForCountryPage('germany');
  // Title will be generated in VisaDetails component based on language
  return <VisaDetails country="germany" visas={visas} />;
}
