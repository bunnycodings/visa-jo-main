import VisaDetails from '../../../components/VisaDetails';

// Force dynamic rendering to avoid database calls during static export
export const dynamic = 'force-dynamic';

export default function UAEVisaPage() {
  return <VisaDetails country="uae" title="UAE Visa Services" />;
}
