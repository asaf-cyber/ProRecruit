'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { SalesPortalHeader } from '@/components/sales-portal/sales-portal-header';
import { SalesPortalSidebar } from '@/components/sales-portal/sales-portal-sidebar';
import { SalesDashboard } from '@/components/sales-portal/sales-dashboard';
import { SalesClients } from '@/components/sales-portal/sales-clients';
import { SalesOrders } from '@/components/sales-portal/sales-orders';
import { SalesChat } from '@/components/sales-portal/sales-chat';

export default function SalesPortalPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SalesDashboard />;
      case 'clients':
        return <SalesClients />;
      case 'orders':
        return <SalesOrders />;
      case 'chat':
        return <SalesChat />;
      default:
        return <SalesDashboard />;
    }
  };

  return (
    <MainLayout>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <SalesPortalSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <SalesPortalHeader />
          
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 