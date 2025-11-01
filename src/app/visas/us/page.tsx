import VisaDetails from '../../../components/VisaDetails';

// Force dynamic rendering to avoid database calls during static export
export const dynamic = 'force-dynamic';

export default function USVisaPage() {
  return <VisaDetails country="us" title="US Visa Services" />;
}
