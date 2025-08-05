'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { VendorHeader } from '@/components/vendors/vendor-header';
import { VendorDetails } from '@/components/vendors/vendor-details';
import { VendorServices } from '@/components/vendors/vendor-services';
import { VendorBilling } from '@/components/vendors/vendor-billing';
import { VendorEmployees } from '@/components/vendors/vendor-employees';

interface VendorDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function VendorDetailPage({ params }: VendorDetailPageProps) {
  const [vendorId, setVendorId] = useState<string>('');
  const [activeTab, setActiveTab] = useState('details');

  // Handle async params
  React.useEffect(() => {
    params.then(resolvedParams => {
      setVendorId(resolvedParams.id);
    });
  }, [params]);

  const tabs = [
    { id: 'details', label: 'פרטים', icon: '📋' },
    { id: 'services', label: 'שירותים ותמחור', icon: '💰' },
    { id: 'billing', label: 'חיובים ותשלומים', icon: '🧾' },
    { id: 'employees', label: 'עובדים ומועמדים', icon: '👥' }
  ];

  return (
    <MainLayout>
      {vendorId && (
        <div className="space-y-6">
          <VendorHeader vendorId={vendorId} />
          
          {/* Tabs */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 space-x-reverse px-6" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="ml-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'details' && <VendorDetails vendorId={vendorId} />}
              {activeTab === 'services' && <VendorServices vendorId={vendorId} />}
              {activeTab === 'billing' && <VendorBilling vendorId={vendorId} />}
              {activeTab === 'employees' && <VendorEmployees vendorId={vendorId} />}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
} 