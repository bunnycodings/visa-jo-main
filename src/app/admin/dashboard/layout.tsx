// Route segment config to prevent static generation for all admin dashboard routes
export const dynamic = 'force-dynamic';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

