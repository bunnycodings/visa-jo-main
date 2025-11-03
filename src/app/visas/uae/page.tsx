import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

// Force dynamic rendering to avoid database calls during static export
export const dynamic = 'force-dynamic';

export default async function UAEVisaPage() {
  const visas = await getVisasForCountryPage('uae');
  // For UAE, only show the first visa entry to match other country pages
  const uaeVisas = visas.length > 0 ? [visas[0]] : [];
  // Title will be generated in VisaDetails component based on language
  return <VisaDetails country="uae" visas={uaeVisas} />;
}
