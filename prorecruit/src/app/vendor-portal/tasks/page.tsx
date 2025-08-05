'use client';

import { useState } from 'react';
import { VendorPortalHeader } from '@/components/vendor-portal/vendor-portal-header';
import { VendorTasksTable } from '@/components/vendor-portal/vendor-tasks-table';

export default function VendorTasksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  return (
    <div className="space-y-6">
      <VendorPortalHeader />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">משימות</h1>
          <p className="text-gray-600">ניהול המשימות שלך</p>
        </div>
      </div>
      <VendorTasksTable
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
      />
    </div>
  );
} 