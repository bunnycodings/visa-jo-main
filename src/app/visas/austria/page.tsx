import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

export const dynamic = 'force-dynamic';

export default async function AustriaVisaPage() {
  const visas = await getVisasForCountryPage('austria');
  return <VisaDetails country="austria" title="Austria Visa Services" visas={visas} />;
}
