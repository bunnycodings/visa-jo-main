import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

export const dynamic = 'force-dynamic';

export default async function USVisaPage() {
  const visas = await getVisasForCountryPage('us');
  return <VisaDetails country="us" title="US Visa Services" visas={visas} />;
}
