import Sidebar from '@/components/Sidebar';

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-areia-100">
      <Sidebar />
      <main className="flex-1 px-6 py-8 md:px-12 md:py-10 max-w-6xl">
        {children}
      </main>
    </div>
  );
}
