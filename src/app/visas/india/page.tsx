import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

export const dynamic = 'force-dynamic';

export default async function IndiaVisaPage() {
  const visas = await getVisasForCountryPage('india');
  return <VisaDetails country="india" title="India Visa Services" visas={visas} />;
}
