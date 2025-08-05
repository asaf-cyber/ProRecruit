'use client';

import { useState } from 'react';
import { X, Users, UserPlus, Clock, TrendingUp, Eye, Phone, Mail } from 'lucide-react';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentRole: string;
  company: string;
  status: string;
  source: string;
  appliedDate: string;
  lastActivity: string;
  recruiter: string;
}

interface StatsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  statType: 'total' | 'active' | 'interview' | 'hired';
  candidates: Candidate[];
  onViewCandidate: (candidateId: string) => void;
  onContactCandidate: (candidate: Candidate) => void;
}

export function StatsDetailModal({ 
  isOpen, 
  onClose, 
  statType, 
  candidates,
  onViewCandidate,
  onContactCandidate
}: StatsDetailModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const getStatConfig = () => {
    switch (statType) {
      case 'total':
        return {
          title: 'כל המועמדים במערכת',
          icon: Users,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100 dark:bg-blue-900',
          candidates: candidates
        };
      case 'active':
        return {
          title: 'מועמדים פעילים',
          icon: UserPlus,
          color: 'text-green-600',
          bgColor: 'bg-green-100 dark:bg-green-900',
          candidates: candidates.filter(c => !['rejected', 'hired'].includes(c.status))
        };
      case 'interview':
        return {
          title: 'מועמדים בראיון',
          icon: Clock,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100 dark:bg-purple-900',
          candidates: candidates.filter(c => c.status === 'interview')
        };
      case 'hired':
        return {
          title: 'הועסקו החודש',
          icon: TrendingUp,
          color: 'text-orange-600',
          bgColor: 'bg-orange-100 dark:bg-orange-900',
          candidates: candidates.filter(c => c.status === 'hired')
        };
      default:
        return {
          title: 'מועמדים',
          icon: Users,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100 dark:bg-gray-900',
          candidates: []
        };
    }
  };

  const config = getStatConfig();
  const Icon = config.icon;

  const filteredCandidates = config.candidates.filter(candidate =>
    candidate.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      applied: { label: 'הוגשה מועמדות', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      phone_screen: { label: 'שיחת טלפון', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
      interview: { label: 'בראיון', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
      offer: { label: 'הצעה', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      rejected: { label: 'נדחה', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
      hired: { label: 'הועסק', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' }
    };
    
    const statusInfo = statusConfig[status as keyof typeof statusConfig] || { 
      label: status, 
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' 
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${config.bgColor} mr-3`}>
              <Icon className={`w-6 h-6 ${config.color}`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {config.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {config.candidates.length} מועמדים
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חיפוש מועמדים..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {filteredCandidates.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 space-x-reverse flex-1">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 space-x-reverse mb-1">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {candidate.firstName} {candidate.lastName}
                          </h3>
                          {getStatusBadge(candidate.status)}
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {candidate.currentRole} • {candidate.company}
                        </p>
                        
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mt-1 space-x-4 space-x-reverse">
                          <span className="flex items-center">
                            <Mail size={12} className="ml-1" />
                            {candidate.email}
                          </span>
                          <span className="flex items-center">
                            <Phone size={12} className="ml-1" />
                            {candidate.phone}
                          </span>
                          <span>
                            מגייס: {candidate.recruiter}
                          </span>
                        </div>
                        
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          הגשה: {new Date(candidate.appliedDate).toLocaleDateString('he-IL')} • 
                          פעילות: {new Date(candidate.lastActivity).toLocaleDateString('he-IL')}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => onViewCandidate(candidate.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        title="הצג פרטי מועמד"
                      >
                        <Eye size={16} />
                      </button>
                      
                      <button
                        onClick={() => onContactCandidate(candidate)}
                        className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                        title="צור קשר"
                      >
                        <Phone size={16} />
                      </button>
                      
                      <button
                        onClick={() => onContactCandidate(candidate)}
                        className="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                        title="שלח אימייל"
                      >
                        <Mail size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                {searchQuery ? 'לא נמצאו תוצאות' : 'אין מועמדים'}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchQuery ? 'נסה חיפוש אחר' : 'לא נמצאו מועמדים בקטגוריה זו'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            מציג {filteredCandidates.length} מתוך {config.candidates.length} מועמדים
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}