import VisaDetails from '../../../components/VisaDetails';

// Force dynamic rendering to avoid database calls during static export
export const dynamic = 'force-dynamic';

export default function AustriaVisaPage() {
  return <VisaDetails country="austria" title="Austria Visa Services" />;
}
