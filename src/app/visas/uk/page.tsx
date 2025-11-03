import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

export const dynamic = 'force-dynamic';

export default async function UKVisaPage() {
  const visas = await getVisasForCountryPage('uk');
  return <VisaDetails country="uk" title="UK Visa Services" visas={visas} />;
}
