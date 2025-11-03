import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

export const dynamic = 'force-dynamic';

export default async function ItalyVisaPage() {
  const visas = await getVisasForCountryPage('italy');
  return <VisaDetails country="italy" title="Italy Visa Services" visas={visas} />;
}
