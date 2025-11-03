import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

export const dynamic = 'force-dynamic';

export default async function UAEVisaPage() {
  const visas = await getVisasForCountryPage('uae');
  return <VisaDetails country="uae" title="UAE Visa Services" visas={visas} />;
}
