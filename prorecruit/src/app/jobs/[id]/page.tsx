'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { JobProfile } from '@/components/jobs/job-profile';

interface JobProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function JobProfilePage({ params }: JobProfilePageProps) {
  const [jobId, setJobId] = useState<string>('');

  // Handle async params
  React.useEffect(() => {
    params.then(resolvedParams => {
      setJobId(resolvedParams.id);
    });
  }, [params]);

  return (
    <MainLayout>
      {jobId && (
        <JobProfile jobId={jobId} />
      )}
    </MainLayout>
  );
} 