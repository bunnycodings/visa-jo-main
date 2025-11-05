// Route segment config to prevent static generation
export const dynamic = 'force-dynamic';

export default function ContactInboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

