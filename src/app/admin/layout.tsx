import type { Metadata } from 'next';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export const metadata: Metadata = {
  title: 'Admin | Órbita Studio',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dash-shell">
      <AdminSidebar />
      <div className="dash-main">
        <DashboardHeader />
        <main className="dash-content">{children}</main>
      </div>
    </div>
  );
}
