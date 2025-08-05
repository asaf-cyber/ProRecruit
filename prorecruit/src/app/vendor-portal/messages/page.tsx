'use client';

import { useState } from 'react';
import { VendorPortalHeader } from '@/components/vendor-portal/vendor-portal-header';
import { VendorMessagesChat } from '@/components/vendor-portal/vendor-messages-chat';

export default function VendorMessagesPage() {
  return (
    <div className="space-y-6">
      <VendorPortalHeader />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">הודעות</h1>
          <p className="text-gray-600">צ&apos;אט פנימי עם הצוות</p>
        </div>
      </div>
      <VendorMessagesChat />
    </div>
  );
} 