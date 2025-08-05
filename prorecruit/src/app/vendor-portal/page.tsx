'use client';

import { useState } from 'react';
import { VendorPortalHeader } from '@/components/vendor-portal/vendor-portal-header';
import { VendorPortalDashboard } from '@/components/vendor-portal/vendor-portal-dashboard';

export default function VendorPortalPage() {
  return (
    <div className="space-y-6">
      <VendorPortalHeader />
      <VendorPortalDashboard />
    </div>
  );
} 