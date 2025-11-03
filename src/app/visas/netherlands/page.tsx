import { getVisasForCountryPage } from '@/lib/utils/get-visas-for-page';
import VisaDetails from '@/components/VisaDetails';

export const dynamic = 'force-dynamic';

export default async function NetherlandsVisaPage() {
  const visas = await getVisasForCountryPage('netherlands');
  return <VisaDetails country="netherlands" title="Netherlands Visa Services" visas={visas} />;
}
