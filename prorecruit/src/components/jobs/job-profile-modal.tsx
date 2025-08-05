'use client';

import { useState, useEffect } from 'react';
import { 
  X, 
  Edit, 
  Play, 
  Pause, 
  Archive,
  Users,
  FileText,
  Clock,
  Building2,
  MapPin,
  DollarSign,
  Shield,
  Calendar,
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Star,
  Eye,
  UserPlus
} from 'lucide-react';
import { JobRequisition } from '@/app/jobs/page';
import { JobCandidatesManager } from './job-candidates-manager';

interface JobProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobs: JobRequisition[];
  onEditJob: (jobId: string) => void;
  onStatusChange: (jobId: string, newStatus: JobRequisition['status']) => void;
}

export function JobProfileModal({ 
  isOpen, 
  onClose, 
  jobId, 
  jobs, 
  onEditJob, 
  onStatusChange 
}: JobProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'candidates' | 'timeline'>('details');
  const [showCandidatesManager, setShowCandidatesManager] = useState(false);
  
  const job = jobs.find(j => j.id === jobId);

  if (!isOpen || !job) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'פורסמה';
      case 'draft':
        return 'טיוטה';
      case 'closed':
        return 'סגורה';
      case 'on_hold':
        return 'מושהית';
      default:
        return status;
    }
  };

  const tabs = [
    { id: 'details', label: 'פרטי משרה', icon: FileText },
    { id: 'candidates', label: 'מועמדים', icon: Users },
    { id: 'timeline', label: 'ציר זמן', icon: Clock }
  ];

  const handleStatusChange = (newStatus: JobRequisition['status']) => {
    onStatusChange(jobId, newStatus);
  };

  const renderCandidatesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">מועמדים ({job.candidatesCount})</h3>
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={() => setShowCandidatesManager(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            <UserPlus className="w-4 h-4 ml-2" />
            נהל מועמדים
          </button>
          <span className="text-sm text-gray-600">
            ממוצע ימים לגיוס: {job.averageDaysToHire || 'לא זמין'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{job.candidatesCount}</div>
          <div className="text-sm text-gray-600">סה״כ מועמדים</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{job.applications.length}</div>
          <div className="text-sm text-gray-600">בתהליך פעיל</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{job.averageDaysToHire || 0}</div>
          <div className="text-sm text-gray-600">ממוצע ימים לגיוס</div>
        </div>
      </div>

      {job.applications.length > 0 ? (
        <div className="space-y-4">
          {job.applications.map((application) => (
            <div key={application.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {application.candidateName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{application.candidateName}</h4>
                    <p className="text-sm text-gray-600">הגיש מועמדות ב-{new Date(application.appliedDate).toLocaleDateString('he-IL')}</p>
                    <div className="flex items-center space-x-2 space-x-reverse mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        application.status === 'interview_scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {application.status === 'interview_scheduled' ? 'ראיון מתוזמן' : application.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center pt-4">
            <button
              onClick={() => setShowCandidatesManager(true)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              הצג את כל המועמדים →
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">אין מועמדים עדיין</h4>
          <p className="text-gray-600 mb-4">עדיין לא הגישו מועמדות למשרה זו</p>
          <button
            onClick={() => setShowCandidatesManager(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            הוסף מועמד ראשון
          </button>
        </div>
      )}
    </div>
  );

  const renderTimelineTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">ציר זמן</h3>
      
      {job.timeline.length > 0 ? (
        <div className="flow-root">
          <ul className="-mb-8">
            {job.timeline.map((event, eventIdx) => (
              <li key={event.id}>
                <div className="relative pb-8">
                  {eventIdx !== job.timeline.length - 1 ? (
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
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-900 font-medium">{event.title}</p>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                      <div className="text-left whitespace-nowrap text-sm text-gray-500">
                        <time dateTime={event.timestamp}>
                          {new Date(event.timestamp).toLocaleDateString('he-IL')}
                        </time>
                        <p className="text-xs">{event.author}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">אין עדכונים בציר הזמן</p>
        </div>
      )}
    </div>
  );

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">פרטים בסיסיים</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <Building2 className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">מחלקה</p>
              <p className="font-medium text-gray-900">{job.department}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">מיקום</p>
              <p className="font-medium text-gray-900">{job.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <DollarSign className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">טווח שכר</p>
              <p className="font-medium text-gray-900">
                ₪{job.salaryRange.min.toLocaleString()} - ₪{job.salaryRange.max.toLocaleString()}
              </p>
            </div>
          </div>
          {job.securityClearance && (
            <div className="flex items-center space-x-3 space-x-reverse">
              <Shield className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">דרגת ביטחון</p>
                <p className="font-medium text-gray-900">{job.securityClearance}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recruiting Manager */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">מנהל מגייס</h3>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{job.recruitingManager.name}</p>
            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{job.recruitingManager.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Client Information */}
      {job.client && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">פרטי לקוח</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{job.client.name}</p>
              <p className="text-sm text-gray-600">
                סוג לקוח: {job.client.type === 'civil' ? 'אזרחי' : 'ביטחוני'}
              </p>
            </div>
            {job.purchaseOrder && (
              <div className="text-left">
                <p className="text-sm text-gray-600">הזמנת רכש</p>
                <p className="font-medium text-gray-900">{job.purchaseOrder.poNumber}</p>
                <p className="text-sm text-gray-600">₪{job.purchaseOrder.amount.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Job Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">תיאור המשרה</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
        </div>
      </div>

      {/* Requirements */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">דרישות</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700 whitespace-pre-wrap">{job.requirements}</p>
        </div>
      </div>

      {/* Tags */}
      {job.tags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">תגים</h3>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Calendar className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-600">תאריך יצירה</p>
          </div>
          <p className="font-medium text-gray-900 mt-1">
            {new Date(job.createdDate).toLocaleDateString('he-IL')}
          </p>
        </div>
        {job.publishDate && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Calendar className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-600">תאריך פרסום</p>
            </div>
            <p className="font-medium text-gray-900 mt-1">
              {new Date(job.publishDate).toLocaleDateString('he-IL')}
            </p>
          </div>
        )}
        {job.closeDate && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Calendar className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-600">תאריך סגירה</p>
            </div>
            <p className="font-medium text-gray-900 mt-1">
              {new Date(job.closeDate).toLocaleDateString('he-IL')}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
              <div className="flex items-center space-x-2 space-x-reverse mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                  {getStatusLabel(job.status)}
                </span>
                <span className="text-sm text-gray-600">מועמדים: {job.candidatesCount}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Status Actions */}
            <div className="flex items-center space-x-2 space-x-reverse">
              {job.status === 'draft' && (
                <button
                  onClick={() => handleStatusChange('published')}
                  className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  <Play className="w-4 h-4 ml-1" />
                  פרסם
                </button>
              )}
              {job.status === 'published' && (
                <>
                  <button
                    onClick={() => handleStatusChange('on_hold')}
                    className="flex items-center px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
                  >
                    <Pause className="w-4 h-4 ml-1" />
                    השהה
                  </button>
                  <button
                    onClick={() => handleStatusChange('closed')}
                    className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                  >
                    <Archive className="w-4 h-4 ml-1" />
                    סגור
                  </button>
                </>
              )}
              {job.status === 'on_hold' && (
                <button
                  onClick={() => handleStatusChange('published')}
                  className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  <Play className="w-4 h-4 ml-1" />
                  חדש פרסום
                </button>
              )}
            </div>

            <button
              onClick={() => onEditJob(jobId)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Edit className="w-4 h-4 ml-2" />
              ערוך
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 space-x-reverse px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'details' | 'candidates' | 'timeline')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 space-x-reverse ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'details' && renderDetailsTab()}
          {activeTab === 'candidates' && renderCandidatesTab()}
          {activeTab === 'timeline' && renderTimelineTab()}
        </div>
      </div>

      {/* Candidates Manager Modal */}
      <JobCandidatesManager
        isOpen={showCandidatesManager}
        onClose={() => setShowCandidatesManager(false)}
        job={job}
      />
    </div>
  );
}