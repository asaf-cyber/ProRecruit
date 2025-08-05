'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ClearanceCandidateProfile } from '@/components/clearances/clearance-candidate-profile';

interface ClearanceCandidatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ClearanceCandidatePage({ params }: ClearanceCandidatePageProps) {
  const [candidateId, setCandidateId] = useState<string>('');

  // Handle async params
  React.useEffect(() => {
    params.then(resolvedParams => {
      setCandidateId(resolvedParams.id);
    });
  }, [params]);

  return (
    <MainLayout>
      {candidateId && (
        <ClearanceCandidateProfile candidateId={candidateId} />
      )}
    </MainLayout>
  );
} 