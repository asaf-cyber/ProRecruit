'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { CandidatesTable } from '@/components/candidates/candidates-table';
import { CandidatesFilters } from '@/components/candidates/candidates-filters';
import { CandidatesHeader } from '@/components/candidates/candidates-header';
import { AddCandidateModal } from '@/components/candidates/add-candidate-modal';
import { EditCandidateModal } from '@/components/candidates/edit-candidate-modal';
import { ContactCandidateModal } from '@/components/candidates/contact-candidate-modal';
import { StatusChangeModal } from '@/components/candidates/status-change-modal';
import { BulkActions } from '@/components/candidates/bulk-actions';
import { StatsDetailModal } from '@/components/candidates/stats-detail-modal';
import { EnhancedCandidateCard } from '@/components/candidates/enhanced-candidate-card';
import { AIInsightsPanel } from '@/components/candidates/ai-insights-panel';
import { CVParser } from '@/components/candidates/cv-parser';
import { PDFGenerator } from '@/components/candidates/pdf-generator';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentRole: string;
  company: string;
  location: string;
  status: 'applied' | 'phone_screen' | 'interview' | 'offer' | 'rejected' | 'hired';
  source: string;
  appliedDate: string;
  lastActivity: string;
  recruiter: string;
}

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showCVParser, setShowCVParser] = useState(false);
  const [showPDFGenerator, setShowPDFGenerator] = useState(false);
  const [selectedStatType, setSelectedStatType] = useState<'total' | 'active' | 'interview' | 'hired'>('total');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  // Candidates data state
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      firstName: 'דוד',
      lastName: 'כהן',
      email: 'david.cohen@email.com',
      phone: '+972-50-123-4567',
      currentRole: 'מפתח Full Stack',
      company: 'TechCorp',
      location: 'תל אביב',
      status: 'interview',
      source: 'LinkedIn',
      appliedDate: '2024-01-10',
      lastActivity: '2024-01-15',
      recruiter: 'שרה כהן'
    },
    {
      id: '2',
      firstName: 'מיכל',
      lastName: 'ישראלי',
      email: 'michal.israeli@email.com',
      phone: '+972-52-987-6543',
      currentRole: 'מפתחת Frontend',
      company: 'StartupXYZ',
      location: 'חיפה',
      status: 'applied',
      source: 'חבר מביא חבר',
      appliedDate: '2024-01-12',
      lastActivity: '2024-01-12',
      recruiter: 'דוד לוי'
    },
    {
      id: '3',
      firstName: 'יוסי',
      lastName: 'גולדברג',
      email: 'yossi.goldberg@email.com',
      phone: '+972-54-456-7890',
      currentRole: 'מפתח Backend',
      company: 'BigTech Inc',
      location: 'ירושלים',
      status: 'offer',
      source: 'אתר החברה',
      appliedDate: '2024-01-08',
      lastActivity: '2024-01-14',
      recruiter: 'מיכל ישראלי'
    },
    {
      id: '4',
      firstName: 'רונית',
      lastName: 'שפירא',
      email: 'ronit.shapira@email.com',
      phone: '+972-53-111-2222',
      currentRole: 'מפתחת DevOps',
      company: 'CloudSys',
      location: 'תל אביב',
      status: 'rejected',
      source: 'לוח דרושים',
      appliedDate: '2024-01-05',
      lastActivity: '2024-01-13',
      recruiter: 'יוסי גולדברג'
    }
  ]);
  
  // Event handlers
  const handleAddCandidate = (candidateData: Record<string, unknown>) => {
    const newCandidate: Candidate = {
      ...candidateData,
      id: Date.now().toString(),
      status: 'applied' as const,
      appliedDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      recruiter: 'אסף מנהל'
    };
    setCandidates(prev => [newCandidate, ...prev]);
  };
  
  const handleEditCandidate = (candidateData: Candidate) => {
    setCandidates(prev => prev.map(c => c.id === candidateData.id ? candidateData : c));
  };
  
  const handleDeleteCandidate = (candidateId: string) => {
    setCandidates(prev => prev.filter(c => c.id !== candidateId));
  };
  
  const openEditModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowEditModal(true);
  };
  
  const openContactModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowContactModal(true);
  };

  const openStatusModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowStatusModal(true);
  };

  const handleStatusChange = (candidateId: string, newStatus: string, note?: string) => {
    setCandidates(prev => prev.map(c => 
      c.id === candidateId 
        ? { ...c, status: newStatus as Candidate['status'], lastActivity: new Date().toISOString().split('T')[0] }
        : c
    ));
    // Here you could also log the status change with the note
    console.log(`Status changed for candidate ${candidateId} to ${newStatus}`, note ? `Note: ${note}` : '');
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  // Bulk actions handlers
  const handleBulkStatusChange = (candidateIds: string[], newStatus: string) => {
    setCandidates(prev => prev.map(c => 
      candidateIds.includes(c.id) 
        ? { ...c, status: newStatus as Candidate['status'], lastActivity: new Date().toISOString().split('T')[0] }
        : c
    ));
    setSelectedCandidates([]);
  };

  const handleBulkDelete = (candidateIds: string[]) => {
    setCandidates(prev => prev.filter(c => !candidateIds.includes(c.id)));
    setSelectedCandidates([]);
  };

  const handleBulkExport = (candidateIds: string[]) => {
    const candidatesToExport = candidates.filter(c => candidateIds.includes(c.id));
    const csvContent = "data:text/csv;charset=utf-8," + 
      "שם פרטי,שם משפחה,אימייל,טלפון,תפקיד,חברה,סטטוס,מקור\n" +
      candidatesToExport.map(c => 
        `${c.firstName},${c.lastName},${c.email},${c.phone},${c.currentRole},${c.company},${c.status},${c.source}`
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `selected-candidates-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectAllCandidates = () => {
    setSelectedCandidates(candidates.map(c => c.id));
  };

  const handleClearSelection = () => {
    setSelectedCandidates([]);
  };

  const handleStatClick = (statType: 'total' | 'active' | 'interview' | 'hired') => {
    setSelectedStatType(statType);
    setShowStatsModal(true);
  };

  const handleViewCandidate = (candidateId: string) => {
    // Navigate to candidate details page
    window.location.href = `/candidates/${candidateId}`;
  };

  const handleCandidateAction = (candidateId: string, action: string) => {
    if (action === 'view') {
      handleViewCandidate(candidateId);
    }
    // Add other actions as needed
  };

  const handleCVParserSave = (parsedData: Record<string, unknown>, generatedPDF?: Blob) => {
    const personalInfo = parsedData.personalInfo as Record<string, string>;
    const experience = parsedData.experience as Array<Record<string, string>>;
    
    const newCandidate: Candidate = {
      id: Date.now().toString(),
      firstName: personalInfo?.firstName || 'לא צוין',
      lastName: personalInfo?.lastName || 'לא צוין',
      email: personalInfo?.email || 'לא צוין',
      phone: personalInfo?.phone || 'לא צוין',
      currentRole: experience?.[0]?.position || 'לא צוין',
      company: experience?.[0]?.company || 'לא צוין',
      location: personalInfo?.address || 'לא צוין',
      status: 'applied',
      source: 'עיבוד CV אוטומטי',
      appliedDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      recruiter: 'אסף מנהל'
    };
    
    setCandidates(prev => [newCandidate, ...prev]);
    
    if (generatedPDF) {
      // Handle PDF download/storage
      const url = URL.createObjectURL(generatedPDF);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${personalInfo?.firstName || 'candidate'}-${personalInfo?.lastName || 'cv'}-CV.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleGeneratePDF = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setShowPDFGenerator(true);
  };

  const handlePDFGenerated = (pdfBlob: Blob, template: Record<string, unknown>) => {
    // Handle the generated PDF
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedCandidate?.firstName}-${selectedCandidate?.lastName}-CV-${template.name as string || 'template'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBulkPDFGenerate = (candidateIds: string[]) => {
    // For bulk PDF generation, we'll just generate for the first selected candidate as an example
    // In a real implementation, you might show a different UI for bulk PDF generation
    const firstCandidate = candidates.find(c => candidateIds.includes(c.id));
    if (firstCandidate) {
      handleGeneratePDF(firstCandidate);
    }
  };

  // Calculate stats from current candidates
  const candidatesStats = {
    total: candidates.length,
    active: candidates.filter(c => !['rejected', 'hired'].includes(c.status)).length,
    interview: candidates.filter(c => c.status === 'interview').length,
    hiredThisMonth: candidates.filter(c => c.status === 'hired').length
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <CandidatesHeader 
          onAddCandidate={openAddModal}
          candidatesCount={candidatesStats.total}
          activeCandidatesCount={candidatesStats.active}
          interviewCandidatesCount={candidatesStats.interview}
          hiredThisMonthCount={candidatesStats.hiredThisMonth}
          onStatClick={handleStatClick}
          onShowAIInsights={() => setShowAIInsights(true)}
          onShowCVParser={() => setShowCVParser(true)}
        />

        {/* Filters and Search */}
        <CandidatesFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedSource={selectedSource}
          onSourceChange={setSelectedSource}
        />

        {/* Bulk Actions */}
        <BulkActions
          selectedCandidates={selectedCandidates}
          totalCandidates={candidates.length}
          onBulkStatusChange={handleBulkStatusChange}
          onBulkDelete={handleBulkDelete}
          onBulkExport={handleBulkExport}
          onBulkPDFGenerate={handleBulkPDFGenerate}
          onSelectAll={handleSelectAllCandidates}
          onClearSelection={handleClearSelection}
        />

        {/* View Toggle */}
        <div className="flex items-center justify-end space-x-2 space-x-reverse">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              viewMode === 'table' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            טבלה
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              viewMode === 'cards' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            כרטיסים
          </button>
        </div>

        {/* Candidates Display */}
        {viewMode === 'table' ? (
          <CandidatesTable 
            searchQuery={searchQuery}
            statusFilter={selectedStatus}
            sourceFilter={selectedSource}
            candidates={candidates}
            onEditCandidate={openEditModal}
            onDeleteCandidate={handleDeleteCandidate}
            onContactCandidate={openContactModal}
            onStatusChange={openStatusModal}
            selectedCandidates={selectedCandidates}
            onSelectionChange={setSelectedCandidates}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates
              .filter(candidate => {
                const matchesSearch = candidate.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   candidate.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                   candidate.currentRole.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesStatus = selectedStatus === 'all' || candidate.status === selectedStatus;
                const matchesSource = selectedSource === 'all' || candidate.source === selectedSource;
                return matchesSearch && matchesStatus && matchesSource;
              })
              .map((candidate) => (
                <EnhancedCandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={selectedCandidates.includes(candidate.id)}
                  onSelect={(candidateId, isSelected) => {
                    if (isSelected) {
                      setSelectedCandidates(prev => [...prev, candidateId]);
                    } else {
                      setSelectedCandidates(prev => prev.filter(id => id !== candidateId));
                    }
                  }}
                  onView={handleViewCandidate}
                  onEdit={openEditModal}
                  onDelete={handleDeleteCandidate}
                  onContact={openContactModal}
                  onStatusChange={openStatusModal}
                  showNotifications={true}
                />
              ))}
          </div>
        )}
        
        {/* Modals */}
        <AddCandidateModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCandidate}
        />
        
        <EditCandidateModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCandidate(null);
          }}
          candidate={selectedCandidate}
          onSave={handleEditCandidate}
        />
        
        <ContactCandidateModal
          isOpen={showContactModal}
          onClose={() => {
            setShowContactModal(false);
            setSelectedCandidate(null);
          }}
          candidate={selectedCandidate}
        />
        
        <StatusChangeModal
          isOpen={showStatusModal}
          onClose={() => {
            setShowStatusModal(false);
            setSelectedCandidate(null);
          }}
          candidate={selectedCandidate}
          onStatusChange={handleStatusChange}
        />
        
        <StatsDetailModal
          isOpen={showStatsModal}
          onClose={() => setShowStatsModal(false)}
          statType={selectedStatType}
          candidates={candidates}
          onViewCandidate={handleViewCandidate}
          onContactCandidate={openContactModal}
        />
        
        <AIInsightsPanel
          candidates={candidates}
          isOpen={showAIInsights}
          onClose={() => setShowAIInsights(false)}
          onCandidateAction={handleCandidateAction}
        />
        
        <CVParser
          isOpen={showCVParser}
          onClose={() => setShowCVParser(false)}
          onSave={handleCVParserSave}
        />
        
        {selectedCandidate && (
          <PDFGenerator
            candidate={selectedCandidate}
            isOpen={showPDFGenerator}
            onClose={() => {
              setShowPDFGenerator(false);
              setSelectedCandidate(null);
            }}
            onGenerate={handlePDFGenerated}
          />
        )}
      </div>
    </MainLayout>
  );
} 