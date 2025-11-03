import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

export const dynamic = 'force-dynamic';

export default async function GermanyVisaPage() {
  const visas = await getVisasForCountryPage('germany');
  return <VisaDetails country="germany" title="Germany Visa Services" visas={visas} />;
}
