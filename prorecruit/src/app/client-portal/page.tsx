'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/client-portal/client-portal-header';
import { ClientPortalDashboard } from '@/components/client-portal/client-portal-dashboard';

export default function ClientPortalPage() {
  return (
    <div className="space-y-6">
      <ClientPortalHeader />
      <ClientPortalDashboard />
    </div>
  );
} 