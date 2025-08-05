'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/client-portal/client-portal-header';
import { ClientChatInterface } from '@/components/client-portal/client-chat-interface';

export default function ClientChatPage() {
  return (
    <div className="space-y-6">
      <ClientPortalHeader />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">צ&apos;אט ותקשורת</h1>
          <p className="text-gray-600">תקשורת ישירה עם הצוות</p>
        </div>
      </div>

      <ClientChatInterface />
    </div>
  );
} 