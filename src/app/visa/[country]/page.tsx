import VisaDetails from '@/components/VisaDetails';

// Force dynamic rendering to avoid database calls during static export
export const dynamic = 'force-dynamic';

export default function VisaCountryPage({ params }: { params: { country: string } }) {
  const { country } = params;
  return <VisaDetails country={country} title={`Visa Information for ${country.toUpperCase()}`} />;
}