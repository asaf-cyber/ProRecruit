'use client';

import { ClientPortalSidebar } from '@/components/client-portal/client-portal-sidebar';

export default function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <ClientPortalSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 