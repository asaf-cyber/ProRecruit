'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ClearancesTable } from '@/components/clearances/clearances-table';
import { ClearancesFilters } from '@/components/clearances/clearances-filters';
import { ClearancesHeader } from '@/components/clearances/clearances-header';

export default function ClearancesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedJob, setSelectedJob] = useState('all');
  const [selectedManager, setSelectedManager] = useState('all');

  return (
    <MainLayout>
      <div className="space-y-6">
        <ClearancesHeader />
        <ClearancesFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedJob={selectedJob}
          onJobChange={setSelectedJob}
          selectedManager={selectedManager}
          onManagerChange={setSelectedManager}
        />
        <ClearancesTable
          searchQuery={searchQuery}
          statusFilter={selectedStatus}
          jobFilter={selectedJob}
          managerFilter={selectedManager}
        />
      </div>
    </MainLayout>
  );
} 