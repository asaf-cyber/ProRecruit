'use client';

import { VendorPortalSidebar } from '@/components/vendor-portal/vendor-portal-sidebar';

export default function VendorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <VendorPortalSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 