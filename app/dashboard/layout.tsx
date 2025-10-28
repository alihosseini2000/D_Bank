// app/dashboard/layout.tsx
import { Header } from '../(layout)/Header';
import { Sidebar } from '../(layout)/Sidebar';
import { Footer } from '../(layout)/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 pt-16">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}