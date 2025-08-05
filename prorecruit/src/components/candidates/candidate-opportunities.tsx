'use client';

import { useState } from 'react';
import { 
  Plus, 
  Briefcase, 
  Building2, 
  Calendar, 
  Users,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { OpportunityDetailsModal } from './opportunity-details-modal';

interface Opportunity {
  id: string;
  jobTitle: string;
  company: string;
  status: 'applied' | 'in_process' | 'interview' | 'offer' | 'rejected' | 'hired';
  appliedDate: string;
  lastActivity: string;
  hiringManager: string;
  recruiter: string;
  salary?: string;
  location: string;
}

interface CandidateOpportunitiesProps {
  candidateId: string;
}

export function CandidateOpportunities({ candidateId }: CandidateOpportunitiesProps) {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  // Mock opportunities data
  const opportunities: Opportunity[] = [
    {
      id: '1',
      jobTitle: 'מפתח Full Stack',
      company: 'Microsoft ישראל',
      status: 'interview',
      appliedDate: '2024-01-10',
      lastActivity: '2024-01-15',
      hiringManager: 'שרה כהן',
      recruiter: 'דוד לוי',
      salary: '₪25,000 - ₪35,000',
      location: 'תל אביב'
    },
    {
      id: '2',
      jobTitle: 'מפתח Frontend',
      company: 'Google ישראל',
      status: 'applied',
      appliedDate: '2024-01-12',
      lastActivity: '2024-01-12',
      hiringManager: 'מיכל ישראלי',
      recruiter: 'יוסי גולדברג',
      salary: '₪20,000 - ₪30,000',
      location: 'תל אביב'
    },
    {
      id: '3',
      jobTitle: 'מפתח Backend',
      company: 'Amazon ישראל',
      status: 'rejected',
      appliedDate: '2024-01-08',
      lastActivity: '2024-01-14',
      hiringManager: 'רונית שפירא',
      recruiter: 'דוד לוי',
      location: 'חיפה'
    }
  ];

  // Mock available jobs
  const availableJobs = [
    { id: '1', title: 'מפתח React', company: 'StartupXYZ', location: 'תל אביב' },
    { id: '2', title: 'מפתח Node.js', company: 'TechCorp', location: 'חיפה' },
    { id: '3', title: 'מפתח Python', company: 'DataTech', location: 'ירושלים' },
    { id: '4', title: 'מפתח DevOps', company: 'CloudSys', location: 'תל אביב' }
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      applied: { label: 'הוגשה מועמדות', color: 'bg-blue-100 text-blue-800', icon: Clock },
      in_process: { label: 'בתהליך', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
      interview: { label: 'בראיון', color: 'bg-purple-100 text-purple-800', icon: Users },
      offer: { label: 'הצעה', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { label: 'נדחה', color: 'bg-red-100 text-red-800', icon: XCircle },
      hired: { label: 'הועסק', color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle }
    };
    
    const statusConfig = config[status as keyof typeof config];
    const Icon = statusConfig.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
        <Icon size={12} className="ml-1" />
        {statusConfig.label}
      </span>
    );
  };

  const handleAssignJob = () => {
    if (selectedJob) {
      // Here you would typically save to backend
      console.log('Assigning job:', selectedJob);
      setShowAssignModal(false);
      setSelectedJob('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">הזדמנויות</h3>
        <button
          onClick={() => setShowAssignModal(true)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2"
        >
          <Plus size={16} className="ml-2" />
          שייך למשרה אחרת
        </button>
      </div>

      {/* Assign Job Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">שייך למשרה אחרת</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedJob === job.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedJob(job.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <p className="text-sm text-gray-500">{job.location}</p>
                      </div>
                      {selectedJob === job.id && (
                        <CheckCircle size={20} className="text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ביטול
              </button>
              <button
                onClick={handleAssignJob}
                disabled={!selectedJob}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                שייך משרה
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Opportunities List */}
      <div className="space-y-4">
        {opportunities.map((opportunity) => (
          <div 
            key={opportunity.id} 
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
            onClick={() => setSelectedOpportunity(opportunity)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                  <Briefcase size={20} className="text-blue-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 space-x-reverse mb-2">
                    <h4 className="font-medium text-gray-900 hover:text-blue-600">{opportunity.jobTitle}</h4>
                    {getStatusBadge(opportunity.status)}
                  </div>
                  
                  <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Building2 size={14} className="ml-1" />
                      {opportunity.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="ml-1" />
                      {opportunity.location}
                    </div>
                    {opportunity.salary && (
                      <div className="flex items-center">
                        <span className="font-medium">{opportunity.salary}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500 mb-2">
                    <div>
                      <span className="font-medium">מנהל מגייס:</span> {opportunity.hiringManager}
                    </div>
                    <div>
                      <span className="font-medium">מגייס:</span> {opportunity.recruiter}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                    <div>
                      <span className="font-medium">תאריך הגשה:</span> {new Date(opportunity.appliedDate).toLocaleDateString('he-IL')}
                    </div>
                    <div>
                      <span className="font-medium">פעילות אחרונה:</span> {new Date(opportunity.lastActivity).toLocaleDateString('he-IL')}
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <span className="text-xs text-blue-600 hover:text-blue-800">לחץ לפרטים מלאים →</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <button 
                  className="p-1 rounded hover:bg-gray-100" 
                  title="פתח משרה"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://company.com/jobs/${opportunity.id}`, '_blank');
                  }}
                >
                  <ExternalLink size={16} />
                </button>
                <button 
                  className="p-1 rounded hover:bg-gray-100" 
                  title="ערוך"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('עריכת הזדמנות');
                  }}
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="p-1 rounded hover:bg-gray-100" 
                  title="הסר"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirm('האם להסיר מהמשרה?');
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {opportunities.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">אין הזדמנויות עדיין</h3>
          <p className="mt-1 text-sm text-gray-500">שייך את המועמד למשרה כדי להתחיל.</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">סיכום הזדמנויות</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{opportunities.filter(o => o.status === 'applied').length}</div>
            <div className="text-sm text-gray-600">הוגשו</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{opportunities.filter(o => o.status === 'interview').length}</div>
            <div className="text-sm text-gray-600">בראיון</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{opportunities.filter(o => o.status === 'offer').length}</div>
            <div className="text-sm text-gray-600">הצעה</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{opportunities.filter(o => o.status === 'rejected').length}</div>
            <div className="text-sm text-gray-600">נדחו</div>
          </div>
        </div>
      </div>

      {/* Opportunity Details Modal */}
      <OpportunityDetailsModal
        isOpen={selectedOpportunity !== null}
        onClose={() => setSelectedOpportunity(null)}
        opportunity={selectedOpportunity}
        onEdit={(opportunity) => {
          alert('עריכת הזדמנות: ' + opportunity.jobTitle);
        }}
        onDelete={(opportunityId) => {
          alert('הסרת הזדמנות: ' + opportunityId);
        }}
        onStatusChange={(opportunityId, newStatus) => {
          alert(`שינוי סטטוס של הזדמנות ${opportunityId} ל-${newStatus}`);
        }}
      />
    </div>
  );
} 