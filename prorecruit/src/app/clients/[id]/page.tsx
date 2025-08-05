'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ClientDetails } from '@/components/clients/client-details';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ClientDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ClientDetailsPage({ params }: ClientDetailsPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [clientId, setClientId] = useState<string>('');

  // Handle async params
  React.useEffect(() => {
    params.then(resolvedParams => {
      setClientId(resolvedParams.id);
    });
  }, [params]);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} className="ml-2" />
          חזור לרשימת לקוחות
        </button>

        {/* Client Details */}
        {clientId && (
          <ClientDetails clientId={clientId} activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
    </MainLayout>
  );
} 