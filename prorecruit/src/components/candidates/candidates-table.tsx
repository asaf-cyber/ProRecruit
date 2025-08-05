'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useResponsive } from '@/hooks/use-responsive';
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

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

interface CandidatesTableProps {
  searchQuery: string;
  statusFilter: string;
  sourceFilter: string;
  candidates: Candidate[];
  onEditCandidate: (candidate: Candidate) => void;
  onDeleteCandidate: (candidateId: string) => void;
  onContactCandidate: (candidate: Candidate) => void;
  onStatusChange: (candidate: Candidate) => void;
  selectedCandidates: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export function CandidatesTable({ 
  searchQuery, 
  statusFilter, 
  sourceFilter, 
  candidates, 
  onEditCandidate, 
  onDeleteCandidate, 
  onContactCandidate,
  onStatusChange,
  selectedCandidates,
  onSelectionChange 
}: CandidatesTableProps) {
  const router = useRouter();
  const { isMobile, isTablet } = useResponsive();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);


  const getStatusBadge = (status: string) => {
    const statusConfig = {
      applied: { label: 'הוגשה מועמדות', color: 'bg-blue-100 text-blue-800', icon: Clock },
      phone_screen: { label: 'שיחת טלפון', color: 'bg-yellow-100 text-yellow-800', icon: Phone },
      interview: { label: 'בראיון', color: 'bg-purple-100 text-purple-800', icon: Calendar },
      offer: { label: 'הצעה', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { label: 'נדחה', color: 'bg-red-100 text-red-800', icon: XCircle },
      hired: { label: 'הועסק', color: 'bg-emerald-100 text-emerald-800', icon: Star }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, color: 'bg-gray-100 text-gray-800', icon: AlertCircle };
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon size={12} className="ml-1" />
        {config.label}
      </span>
    );
  };

  const getSourceBadge = (source: string) => {
    const sourceConfig = {
      'LinkedIn': { label: 'LinkedIn', color: 'bg-blue-100 text-blue-800' },
      'חבר מביא חבר': { label: 'חבר מביא חבר', color: 'bg-green-100 text-green-800' },
      'אתר החברה': { label: 'אתר החברה', color: 'bg-purple-100 text-purple-800' },
      'לוח דרושים': { label: 'לוח דרושים', color: 'bg-orange-100 text-orange-800' },
      'פנייה ישירה': { label: 'פנייה ישירה', color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = sourceConfig[source as keyof typeof sourceConfig] || { label: source, color: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.currentRole.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || candidate.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleViewCandidate = (candidateId: string) => {
    router.push(`/candidates/${candidateId}`);
  };

  const handleEditCandidate = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      onEditCandidate(candidate);
    }
  };

  const handleDeleteCandidate = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate && confirm(`האם אתה בטוח שברצונך למחוק את ${candidate.firstName} ${candidate.lastName}?`)) {
      onDeleteCandidate(candidateId);
    }
  };

  const handleContactCandidate = (candidate: Candidate) => {
    onContactCandidate(candidate);
  };

  const handleSelectCandidate = (candidateId: string, isSelected: boolean) => {
    if (isSelected) {
      onSelectionChange([...selectedCandidates, candidateId]);
    } else {
      onSelectionChange(selectedCandidates.filter(id => id !== candidateId));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      onSelectionChange(filteredCandidates.map(c => c.id));
    } else {
      onSelectionChange([]);
    }
  };

  const isAllSelected = filteredCandidates.length > 0 && selectedCandidates.length === filteredCandidates.length;
  const isPartiallySelected = selectedCandidates.length > 0 && selectedCandidates.length < filteredCandidates.length;

  // Mobile Card View Component
  const MobileCardView = () => (
    <div className="space-y-4">
      {filteredCandidates.map((candidate) => (
        <div key={candidate.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCandidates.includes(candidate.id)}
                onChange={(e) => handleSelectCandidate(candidate.id, e.target.checked)}
                className="ml-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {candidate.firstName} {candidate.lastName}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{candidate.currentRole}</div>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowActionsMenu(showActionsMenu === candidate.id ? null : candidate.id)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MoreHorizontal size={16} className="text-gray-600 dark:text-gray-300" />
              </button>
              {showActionsMenu === candidate.id && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="py-1">
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        handleViewCandidate(candidate.id);
                        setShowActionsMenu(null);
                      }}
                    >
                      <Eye size={16} className="ml-3" />
                      הצג פרטים
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        handleEditCandidate(candidate.id);
                        setShowActionsMenu(null);
                      }}
                    >
                      <Edit size={16} className="ml-3" />
                      ערוך מועמד
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        handleContactCandidate(candidate);
                        setShowActionsMenu(null);
                      }}
                    >
                      <Phone size={16} className="ml-3" />
                      צור קשר
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        onStatusChange(candidate);
                        setShowActionsMenu(null);
                      }}
                    >
                      <RefreshCw size={16} className="ml-3" />
                      שנה סטטוס
                    </button>
                    <hr className="my-1 border-gray-200 dark:border-gray-600" />
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => {
                        handleDeleteCandidate(candidate.id);
                        setShowActionsMenu(null);
                      }}
                    >
                      <Trash2 size={16} className="ml-3" />
                      מחק מועמד
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">סטטוס:</span>
              {getStatusBadge(candidate.status)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">מקור:</span>
              {getSourceBadge(candidate.source)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">חברה:</span>
              <span className="text-sm text-gray-900 dark:text-white">{candidate.company}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">מגייס:</span>
              <span className="text-sm text-gray-900 dark:text-white">{candidate.recruiter}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">הגשה:</span>
              <span className="text-sm text-gray-900 dark:text-white">{new Date(candidate.appliedDate).toLocaleDateString('he-IL')}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Phone size={12} className="ml-1" />
              {candidate.phone}
              <Mail size={12} className="ml-3 mr-1" />
              {candidate.email}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (isMobile) {
    return (
      <div className="space-y-4">
        <MobileCardView />
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">לא נמצאו מועמדים</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">נסה לשנות את הפילטרים או הוסף מועמד חדש.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isPartiallySelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                מועמד
              </th>
              {!isTablet && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  תפקיד נוכחי
                </th>
              )}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                מקור
              </th>
              {!isTablet && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  מגייס
                </th>
              )}
              {!isTablet && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  תאריך הגשה
                </th>
              )}
              {!isTablet && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  פעילות אחרונה
                </th>
              )}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200" onClick={() => handleViewCandidate(candidate.id)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectCandidate(candidate.id, e.target.checked);
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                      </span>
                    </div>
                    <div className="mr-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {candidate.firstName} {candidate.lastName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{candidate.email}</div>
                      <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 mt-1">
                        <Phone size={12} className="ml-1" />
                        {candidate.phone}
                      </div>
                    </div>
                  </div>
                </td>
                {!isTablet && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{candidate.currentRole}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{candidate.company}</div>
                    <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 mt-1">
                      <MapPin size={12} className="ml-1" />
                      {candidate.location}
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(candidate.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getSourceBadge(candidate.source)}
                </td>
                {!isTablet && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {candidate.recruiter}
                  </td>
                )}
                {!isTablet && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(candidate.appliedDate).toLocaleDateString('he-IL')}
                  </td>
                )}
                {!isTablet && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(candidate.lastActivity).toLocaleDateString('he-IL')}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowActionsMenu(showActionsMenu === candidate.id ? null : candidate.id);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <MoreHorizontal size={16} className="text-gray-600 dark:text-gray-300" />
                    </button>

                    {showActionsMenu === candidate.id && (
                      <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                        <div className="py-1">
                          <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewCandidate(candidate.id);
                              setShowActionsMenu(null);
                            }}
                          >
                            <Eye size={16} className="ml-3" />
                            הצג פרטים
                          </button>
                          <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCandidate(candidate.id);
                              setShowActionsMenu(null);
                            }}
                          >
                            <Edit size={16} className="ml-3" />
                            ערוך מועמד
                          </button>
                          <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleContactCandidate(candidate);
                              setShowActionsMenu(null);
                            }}
                          >
                            <Phone size={16} className="ml-3" />
                            צור קשר
                          </button>
                          <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              onStatusChange(candidate);
                              setShowActionsMenu(null);
                            }}
                          >
                            <RefreshCw size={16} className="ml-3" />
                            שנה סטטוס
                          </button>
                          <hr className="my-1 border-gray-200 dark:border-gray-600" />
                          <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCandidate(candidate.id);
                              setShowActionsMenu(null);
                            }}
                          >
                            <Trash2 size={16} className="ml-3" />
                            מחק מועמד
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">לא נמצאו מועמדים</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">נסה לשנות את הפילטרים או הוסף מועמד חדש.</p>
        </div>
      )}
    </div>
  );
} 