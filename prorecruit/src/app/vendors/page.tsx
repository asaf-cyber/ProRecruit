'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { VendorsHeader } from '@/components/vendors/vendors-header';
import { VendorsFilters } from '@/components/vendors/vendors-filters';
import { VendorsTable } from '@/components/vendors/vendors-table';

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <MainLayout>
      <div className="space-y-6">
        <VendorsHeader />
        <VendorsFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSpecialization={selectedSpecialization}
          onSpecializationChange={setSelectedSpecialization}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
        <VendorsTable
          searchQuery={searchQuery}
          specializationFilter={selectedSpecialization}
          statusFilter={selectedStatus}
        />
      </div>
    </MainLayout>
  );
} 