'use client';

import { useState } from 'react';
import { 
  User, 
  Clock, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Download,
  Edit,
  Plus,
  Tag,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { CandidateHeader } from './candidate-header';
import { CandidateDetails } from './candidate-details';
import { CandidateTimeline } from './candidate-timeline';
import { CandidateNotes } from './candidate-notes';
import { CandidateFiles } from './candidate-files';
import { CandidateInterviews } from './candidate-interviews';
import { CandidateOpportunities } from './candidate-opportunities';

interface CandidateProfileProps {
  candidateId: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function CandidateProfile({ candidateId, activeTab, onTabChange }: CandidateProfileProps) {
  // Mock candidate data
  const candidate = {
    id: candidateId,
    firstName: 'דוד',
    lastName: 'כהן',
    email: 'david.cohen@email.com',
    phone: '+972-50-123-4567',
    address: 'תל אביב, ישראל',
    linkedin: 'linkedin.com/in/davidcohen',
    currentRole: 'מפתח Full Stack',
    company: 'TechCorp',
    experience: '5 שנים',
    education: 'תואר ראשון במדעי המחשב',
    source: 'LinkedIn',
    status: 'interview',
    tags: ['Senior', 'דחוף', 'הופנה ע"י גלית'],
    lastActivity: '2024-01-15',
    resumeUrl: '/resume.pdf',
    uniformResumeUrl: '/uniform-resume.pdf'
  };

  const tabs = [
    { id: 'details', label: 'פרטים', icon: User },
    { id: 'timeline', label: 'ציר זמן', icon: Clock },
    { id: 'notes', label: 'הערות ומשוב', icon: MessageSquare },
    { id: 'files', label: 'קבצים', icon: FileText },
    { id: 'interviews', label: 'ראיונות ואירועים', icon: Calendar },
    { id: 'opportunities', label: 'הזדמנויות', icon: Briefcase }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      applied: { label: 'הוגשה מועמדות', color: 'bg-blue-100 text-blue-800', icon: Clock },
      phone_screen: { label: 'שיחת טלפון', color: 'bg-yellow-100 text-yellow-800', icon: Phone },
      interview: { label: 'בראיון', color: 'bg-purple-100 text-purple-800', icon: Calendar },
      offer: { label: 'הצעה', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { label: 'נדחה', color: 'bg-red-100 text-red-800', icon: XCircle },
      hired: { label: 'הועסק', color: 'bg-emerald-100 text-emerald-800', icon: Star }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon size={16} className="ml-2" />
        {config.label}
      </span>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <CandidateDetails candidate={candidate} />;
      case 'timeline':
        return <CandidateTimeline candidateId={candidateId} />;
      case 'notes':
        return <CandidateNotes candidateId={candidateId} />;
      case 'files':
        return <CandidateFiles candidateId={candidateId} />;
      case 'interviews':
        return <CandidateInterviews candidateId={candidateId} />;
      case 'opportunities':
        return <CandidateOpportunities candidateId={candidateId} />;
      default:
        return <CandidateDetails candidate={candidate} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Fixed Header Panel */}
      <CandidateHeader candidate={candidate} getStatusBadge={getStatusBadge} />

      {/* Sticky Tabs Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 rounded-t-xl">
          <nav className="flex space-x-8 space-x-reverse px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  style={{
                    position: 'relative'
                  }}
                >
                  <Icon size={16} className="ml-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 min-h-[600px]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
} 