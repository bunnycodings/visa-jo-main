import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

export const dynamic = 'force-dynamic';

export default async function FranceVisaPage() {
  const visas = await getVisasForCountryPage('france');
  return <VisaDetails country="france" title="France Visa Services" visas={visas} />;
}
