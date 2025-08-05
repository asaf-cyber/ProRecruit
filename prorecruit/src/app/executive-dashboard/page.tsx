'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ExecutiveSummaryBar } from '@/components/executive-dashboard/executive-summary-bar';
import { ExecutiveFilters } from '@/components/executive-dashboard/executive-filters';
import { ExecutiveKPIs } from '@/components/executive-dashboard/executive-kpis';
import { ExecutiveCharts } from '@/components/executive-dashboard/executive-charts';
import { ExecutiveAlerts } from '@/components/executive-dashboard/executive-alerts';
import { AIInsights } from '@/components/executive-dashboard/ai-insights';

export default function ExecutiveDashboardPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [dateRange, setDateRange] = useState('last-quarter');
  const [jobType, setJobType] = useState('all');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Executive Summary Bar */}
        <ExecutiveSummaryBar />
        
        {/* Filters Panel */}
        <ExecutiveFilters
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedClient={selectedClient}
          onClientChange={setSelectedClient}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          jobType={jobType}
          onJobTypeChange={setJobType}
        />

        {/* AI Insights */}
        <AIInsights />

        {/* KPIs */}
        <ExecutiveKPIs
          department={selectedDepartment}
          client={selectedClient}
          dateRange={dateRange}
          jobType={jobType}
        />

        {/* Charts */}
        <ExecutiveCharts
          department={selectedDepartment}
          client={selectedClient}
          dateRange={dateRange}
          jobType={jobType}
        />

        {/* Alerts */}
        <ExecutiveAlerts />
      </div>
    </MainLayout>
  );
} 