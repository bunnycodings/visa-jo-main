import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

export const dynamic = 'force-dynamic';

export default async function AustraliaVisaPage() {
  const visas = await getVisasForCountryPage('australia');
  return <VisaDetails country="australia" title="Australia Visa Services" visas={visas} />;
}
