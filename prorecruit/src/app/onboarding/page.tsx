'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { OnboardingHeader } from '@/components/onboarding/onboarding-header';
import { OnboardingTable } from '@/components/onboarding/onboarding-table';
import { OnboardingFilters } from '@/components/onboarding/onboarding-filters';
import { OnboardingStats } from '@/components/onboarding/onboarding-stats';

export default function OnboardingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedManager, setSelectedManager] = useState('all');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <OnboardingHeader />

        {/* Stats Cards */}
        <OnboardingStats />

        {/* Filters and Search */}
        <OnboardingFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedManager={selectedManager}
          onManagerChange={setSelectedManager}
        />

        {/* Onboarding Table */}
        <OnboardingTable 
          searchQuery={searchQuery}
          statusFilter={selectedStatus}
          departmentFilter={selectedDepartment}
          managerFilter={selectedManager}
        />
      </div>
    </MainLayout>
  );
} 