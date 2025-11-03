import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

export const dynamic = 'force-dynamic';

export default async function SpainVisaPage() {
  const visas = await getVisasForCountryPage('spain');
  return <VisaDetails country="spain" title="Spain Visa Services" visas={visas} />;
}
