'use client';

import { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  ArrowRight,
  Download,
  Upload,
  Star,
  MessageSquare,
  FileText,
  Target
} from 'lucide-react';
import { JobRequisition } from '@/app/jobs/page';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'screening' | 'interview_scheduled' | 'interview_completed' | 'offer_made' | 'hired' | 'rejected';
  source: 'direct' | 'linkedin' | 'indeed' | 'referral' | 'headhunter';
  appliedDate: string;
  resumeUrl?: string;
  rating: number; // 1-5 stars
  notes: string;
  tags: string[];
  interviews: Array<{
    id: string;
    type: 'phone' | 'video' | 'onsite' | 'technical';
    date: string;
    interviewer: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    feedback?: string;
    rating?: number;
  }>;
  timeline: Array<{
    id: string;
    type: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
    title: string;
    description: string;
    timestamp: string;
    author: string;
  }>;
}

interface JobCandidatesManagerProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobRequisition;
  onUpdateCandidates?: (candidates: Candidate[]) => void;
}

export function JobCandidatesManager({ 
  isOpen, 
  onClose, 
  job, 
  onUpdateCandidates 
}: JobCandidatesManagerProps) {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'דוד כהן',
      email: 'david.cohen@example.com',
      phone: '050-1234567',
      status: 'interview_scheduled',
      source: 'linkedin',
      appliedDate: '2024-01-16',
      rating: 4,
      notes: 'מועמד מעולה עם ניסיון רב בReact ו-Node.js',
      tags: ['Senior', 'Full Stack'],
      interviews: [
        {
          id: 'int1',
          type: 'phone',
          date: '2024-01-20T10:00:00Z',
          interviewer: 'שרה לוי',
          status: 'scheduled'
        }
      ],
      timeline: [
        {
          id: 't1',
          type: 'applied',
          title: 'הגיש מועמדות',
          description: 'המועמד הגיש מועמדות דרך LinkedIn',
          timestamp: '2024-01-16T09:00:00Z',
          author: 'מערכת'
        }
      ]
    },
    {
      id: '2',
      name: 'רחל רוזן',
      email: 'rachel.rosen@example.com',
      phone: '052-9876543',
      status: 'new',
      source: 'direct',
      appliedDate: '2024-01-18',
      rating: 3,
      notes: 'מועמדת עם פוטנציאל, צריך להעמיק יותר בראיון',
      tags: ['Mid-level', 'Frontend'],
      interviews: [],
      timeline: [
        {
          id: 't2',
          type: 'applied',
          title: 'הגיש מועמדות',
          description: 'המועמדת הגישה מועמדות דרך האתר',
          timestamp: '2024-01-18T14:30:00Z',
          author: 'מערכת'
        }
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showCandidateDetails, setShowCandidateDetails] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);

  if (!isOpen) return null;

  const getStatusConfig = (status: Candidate['status']) => {
    switch (status) {
      case 'new':
        return { color: 'bg-blue-100 text-blue-800', label: 'חדש' };
      case 'screening':
        return { color: 'bg-yellow-100 text-yellow-800', label: 'מיון ראשוני' };
      case 'interview_scheduled':
        return { color: 'bg-purple-100 text-purple-800', label: 'ראיון מתוזמן' };
      case 'interview_completed':
        return { color: 'bg-indigo-100 text-indigo-800', label: 'ראיון הושלם' };
      case 'offer_made':
        return { color: 'bg-orange-100 text-orange-800', label: 'הצעה נשלחה' };
      case 'hired':
        return { color: 'bg-green-100 text-green-800', label: 'נקלט' };
      case 'rejected':
        return { color: 'bg-red-100 text-red-800', label: 'נדחה' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: status };
    }
  };

  const getSourceIcon = (source: Candidate['source']) => {
    switch (source) {
      case 'linkedin':
        return '💼';
      case 'indeed':
        return '🔍';
      case 'referral':
        return '👥';
      case 'headhunter':
        return '🎯';
      default:
        return '📧';
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || candidate.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleStatusChange = (candidateId: string, newStatus: Candidate['status']) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId 
        ? { 
            ...candidate, 
            status: newStatus,
            timeline: [...candidate.timeline, {
              id: Date.now().toString(),
              type: newStatus as any,
              title: `סטטוס עודכן ל${getStatusConfig(newStatus).label}`,
              description: `הסטטוס של המועמד עודכן ל${getStatusConfig(newStatus).label}`,
              timestamp: new Date().toISOString(),
              author: 'מעדכן המערכת'
            }]
          }
        : candidate
    ));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">ניהול מועמדים</h2>
              <p className="text-blue-100 mt-1">{job.title} - {filteredCandidates.length} מועמדים</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <XCircle size={24} />
            </button>
          </div>
        </div>

        <div className="flex h-full">
          {/* Candidates List */}
          <div className="w-1/2 border-l border-gray-200 overflow-y-auto max-h-[70vh]">
            {/* Filters */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3 space-x-reverse mb-3">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="חיפוש מועמדים..."
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <UserPlus size={16} className="ml-1" />
                  הוסף מועמד
                </button>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="all">כל הסטטוסים</option>
                  <option value="new">חדש</option>
                  <option value="screening">מיון ראשוני</option>
                  <option value="interview_scheduled">ראיון מתוזמן</option>
                  <option value="interview_completed">ראיון הושלם</option>
                  <option value="offer_made">הצעה נשלחה</option>
                  <option value="hired">נקלט</option>
                  <option value="rejected">נדחה</option>
                </select>
                
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="all">כל המקורות</option>
                  <option value="direct">ישיר</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="indeed">Indeed</option>
                  <option value="referral">המלצה</option>
                  <option value="headhunter">כלה״ר</option>
                </select>
              </div>
            </div>

            {/* Candidates List */}
            <div className="divide-y divide-gray-200">
              {filteredCandidates.map((candidate) => {
                const statusConfig = getStatusConfig(candidate.status);
                return (
                  <div
                    key={candidate.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedCandidate?.id === candidate.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setShowCandidateDetails(true);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 space-x-reverse">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 mt-1">
                            <Mail className="w-3 h-3" />
                            <span>{candidate.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                            <Phone className="w-3 h-3" />
                            <span>{candidate.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                            <span className="text-xs text-gray-500">
                              {getSourceIcon(candidate.source)} {candidate.source}
                            </span>
                            {renderStars(candidate.rating)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowActionsMenu(showActionsMenu === candidate.id ? null : candidate.id);
                          }}
                          className="p-1 rounded hover:bg-gray-200"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {showActionsMenu === candidate.id && (
                          <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <div className="py-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(candidate.id, 'interview_scheduled');
                                  setShowActionsMenu(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Calendar className="w-4 h-4 ml-3" />
                                קבע ראיון
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(candidate.id, 'offer_made');
                                  setShowActionsMenu(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                              >
                                <CheckCircle className="w-4 h-4 ml-3" />
                                שלח הצעה
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(candidate.id, 'rejected');
                                  setShowActionsMenu(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4 ml-3" />
                                דחה מועמדות
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Candidate Details */}
          <div className="w-1/2 overflow-y-auto max-h-[70vh]">
            {selectedCandidate ? (
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h3>
                    <div className="flex items-center space-x-2 space-x-reverse mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusConfig(selectedCandidate.status).color}`}>
                        {getStatusConfig(selectedCandidate.status).label}
                      </span>
                      {renderStars(selectedCandidate.rating)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                      <MessageSquare className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                      <Phone className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">פרטי קשר</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedCandidate.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedCandidate.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>הגיש מועמדות ב-{new Date(selectedCandidate.appliedDate).toLocaleDateString('he-IL')}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">הערות</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-gray-700">{selectedCandidate.notes}</p>
                  </div>
                </div>

                {/* Tags */}
                {selectedCandidate.tags.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">תגים</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interviews */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">ראיונות</h4>
                  {selectedCandidate.interviews.length > 0 ? (
                    <div className="space-y-3">
                      {selectedCandidate.interviews.map((interview) => (
                        <div key={interview.id} className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">{interview.type} - {interview.interviewer}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(interview.date).toLocaleDateString('he-IL')} {new Date(interview.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                              interview.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {interview.status === 'completed' ? 'הושלם' :
                               interview.status === 'scheduled' ? 'מתוזמן' : 'בוטל'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">אין ראיונות מתוזמנים</p>
                  )}
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">ציר זמן</h4>
                  <div className="flow-root">
                    <ul className="-mb-8">
                      {selectedCandidate.timeline.map((event, eventIdx) => (
                        <li key={event.id}>
                          <div className="relative pb-8">
                            {eventIdx !== selectedCandidate.timeline.length - 1 ? (
                              <span
                                className="absolute top-4 right-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div className="relative flex space-x-3 space-x-reverse">
                              <div>
                                <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                  <CheckCircle className="w-5 h-5 text-white" />
                                </span>
                              </div>
                              <div className="min-w-0 flex-1 pt-1.5">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                  <p className="text-sm text-gray-600">{event.description}</p>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                  <time dateTime={event.timestamp}>
                                    {new Date(event.timestamp).toLocaleDateString('he-IL')} בשעה {new Date(event.timestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                                  </time>
                                  <span className="mr-2">על ידי {event.author}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>בחר מועמד להצגת פרטים</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}