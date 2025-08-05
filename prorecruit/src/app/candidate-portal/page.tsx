'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { CandidatePortalHeader } from '@/components/candidate-portal/candidate-portal-header';
import { CandidatePortalSidebar } from '@/components/candidate-portal/candidate-portal-sidebar';
import { CandidateDashboard } from '@/components/candidate-portal/candidate-dashboard';
import { CandidateApplications } from '@/components/candidate-portal/candidate-applications';
import { CandidateInterviews } from '@/components/candidate-portal/candidate-interviews';
import { CandidateDocuments } from '@/components/candidate-portal/candidate-documents';
import { CandidateMessages } from '@/components/candidate-portal/candidate-messages';

export default function CandidatePortalPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <CandidateDashboard />;
      case 'applications':
        return <CandidateApplications />;
      case 'interviews':
        return <CandidateInterviews />;
      case 'documents':
        return <CandidateDocuments />;
      case 'messages':
        return <CandidateMessages />;
      default:
        return <CandidateDashboard />;
    }
  };

  return (
    <MainLayout>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <CandidatePortalSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <CandidatePortalHeader />
          
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 