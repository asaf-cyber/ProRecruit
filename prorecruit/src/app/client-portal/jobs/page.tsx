'use client';

import { useState } from 'react';
import { ClientPortalHeader } from '@/components/client-portal/client-portal-header';
import { ClientJobsTable } from '@/components/client-portal/client-jobs-table';
import { ClientCandidatesList } from '@/components/client-portal/client-candidates-list';

export default function ClientJobsPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <ClientPortalHeader />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">משרות ומועמדים</h1>
          <p className="text-gray-600">ניהול המשרות והמועמדים שלך</p>
        </div>
      </div>

      {!selectedJob ? (
        <ClientJobsTable
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onJobSelect={setSelectedJob}
        />
      ) : (
        <ClientCandidatesList
          jobId={selectedJob}
          onBack={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
} 