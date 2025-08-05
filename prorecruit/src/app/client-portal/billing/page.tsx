'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/client-portal/client-portal-header';
import { ClientPurchaseOrdersTable } from '@/components/client-portal/client-purchase-orders-table';
import { ClientInvoicesTable } from '@/components/client-portal/client-invoices-table';

export default function ClientBillingPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'invoices'>('orders');

  return (
    <div className="space-y-6">
      <ClientPortalHeader />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">הזמנות וחיובים</h1>
          <p className="text-gray-600">ניהול הזמנות רכש וחשבוניות</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 space-x-reverse">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'orders'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            הזמנות רכש
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'invoices'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            חשבוניות
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' ? (
        <ClientPurchaseOrdersTable />
      ) : (
        <ClientInvoicesTable />
      )}
    </div>
  );
} 