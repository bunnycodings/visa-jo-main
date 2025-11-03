import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

export const dynamic = 'force-dynamic';

export default async function CanadaVisaPage() {
  const visas = await getVisasForCountryPage('canada');
  return <VisaDetails country="canada" title="Canada Visa Services" visas={visas} />;
}
