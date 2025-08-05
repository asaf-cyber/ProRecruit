'use client';

import { useState } from 'react';
import { VendorPortalHeader } from '@/components/vendor-portal/vendor-portal-header';
import { VendorBillingTable } from '@/components/vendor-portal/vendor-billing-table';
import { VendorInvoiceForm } from '@/components/vendor-portal/vendor-invoice-form';

export default function VendorBillingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  return (
    <div className="space-y-6">
      <VendorPortalHeader />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">חיובים ותשלומים</h1>
          <p className="text-gray-600">ניהול החשבוניות והתשלומים שלך</p>
        </div>
        <button
          onClick={() => setShowInvoiceForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          חשבונית חדשה
        </button>
      </div>
      <VendorBillingTable
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      {showInvoiceForm && (
        <VendorInvoiceForm
          onClose={() => setShowInvoiceForm(false)}
          onSubmit={(data) => {
            console.log('New invoice:', data);
            setShowInvoiceForm(false);
          }}
        />
      )}
    </div>
  );
} 