import type { Metadata } from 'next';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export const metadata: Metadata = {
  title: 'Painel | Órbita Studio',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dash-shell">
      <Sidebar />
      <div className="dash-main">
        <DashboardHeader />
        <main className="dash-content">{children}</main>
      </div>
    </div>
  );
}
