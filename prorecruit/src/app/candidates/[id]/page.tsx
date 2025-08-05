'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { CandidateProfile } from '@/components/candidates/candidate-profile';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CandidateProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CandidateProfilePage({ params }: CandidateProfilePageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [candidateId, setCandidateId] = useState<string>('');

  // Handle async params
  React.useEffect(() => {
    params.then(resolvedParams => {
      setCandidateId(resolvedParams.id);
    });
  }, [params]);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} className="ml-2" />
          חזור לרשימת מועמדים
        </button>

        {/* Candidate Profile */}
        {candidateId && (
          <CandidateProfile candidateId={candidateId} activeTab={activeTab} onTabChange={setActiveTab} />
        )}
      </div>
    </MainLayout>
  );
} 