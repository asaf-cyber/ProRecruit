'use client';

import { useState } from 'react';
import { 
  X, 
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
  MapPin,
  DollarSign,
  Mail,
  Phone,
  User,
  FileText,
  MessageSquare,
  Star,
  Copy,
  Send,
  History
} from 'lucide-react';

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

interface OpportunityDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity | null;
  onEdit?: (opportunity: Opportunity) => void;
  onDelete?: (opportunityId: string) => void;
  onStatusChange?: (opportunityId: string, newStatus: string) => void;
}

export function OpportunityDetailsModal({ 
  isOpen, 
  onClose, 
  opportunity, 
  onEdit, 
  onDelete, 
  onStatusChange 
}: OpportunityDetailsModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showStatusChange, setShowStatusChange] = useState(false);

  if (!isOpen || !opportunity) return null;

  const getStatusBadge = () => {
    const config = {
      applied: { label: 'הוגשה מועמדות', color: 'bg-blue-100 text-blue-800', icon: Clock },
      in_process: { label: 'בתהליך', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
      interview: { label: 'בראיון', color: 'bg-purple-100 text-purple-800', icon: Users },
      offer: { label: 'הצעה', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { label: 'נדחה', color: 'bg-red-100 text-red-800', icon: XCircle },
      hired: { label: 'הועסק', color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle }
    };
    
    const statusConfig = config[opportunity.status];
    const Icon = statusConfig.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
        <Icon size={16} className="ml-1" />
        {statusConfig.label}
      </span>
    );
  };

  const handleDelete = async () => {
    if (!confirm('האם אתה בטוח שברצונך להסיר את המועמד מהמשרה הזו?')) return;
    
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onDelete?.(opportunity.id);
      onClose();
    } catch (error) {
      console.error('Error removing opportunity:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Mock additional opportunity details
  const mockDetails = {
    jobDescription: 'מחפשים מפתח Full Stack מנוסה עם ידע ב-React, Node.js ו-TypeScript. התפקיד כולל פיתוח תכונות חדשות, תחזוקת קוד קיים, ועבודה עם צוות מפתחים מקצועי.',
    requirements: [
      'לפחות 5 שנות ניסיון בפיתוח Full Stack',
      'ידע מתקדם ב-React ו-Node.js',
      'ניסיון עם TypeScript',
      'הבנה בעבודה עם בסיסי נתונים (MongoDB/PostgreSQL)',
      'ניסיון עם Git ו-CI/CD'
    ],
    benefits: [
      'אופציות מניות',
      'ביטוח בריאות פרטי',
      '25 ימי חופשה',
      'אפשרות עבודה מהבית',
      'קורסים והשתלמויות'
    ],
    timeline: [
      { date: '2024-01-10', event: 'הוגשה מועמדות', status: 'completed' },
      { date: '2024-01-12', event: 'סקירת קורות חיים', status: 'completed' },
      { date: '2024-01-15', event: 'ראיון טלפוני', status: 'completed' },
      { date: '2024-01-18', event: 'ראיון טכני', status: 'scheduled' },
      { date: '2024-01-22', event: 'ראיון עם מנהל', status: 'pending' }
    ],
    feedback: opportunity.status === 'interview' ? {
      overallRating: 4.2,
      technicalSkills: 4.5,
      communication: 4.0,
      culturalFit: 4.0,
      comments: 'מועמד חזק טכנית, תקשורת טובה, מתאים לתרבות החברה'
    } : null,
    contacts: {
      hiringManager: {
        name: opportunity.hiringManager,
        email: `${opportunity.hiringManager.replace(' ', '.')}@${opportunity.company.replace(' ', '').toLowerCase()}.com`,
        phone: '+972-50-123-4567'
      },
      recruiter: {
        name: opportunity.recruiter,
        email: `${opportunity.recruiter.replace(' ', '.')}@company.com`,
        phone: '+972-50-987-6543'
      }
    }
  };

  const statusOptions = [
    { value: 'applied', label: 'הוגשה מועמדות' },
    { value: 'in_process', label: 'בתהליך' },
    { value: 'interview', label: 'בראיון' },
    { value: 'offer', label: 'הצעה' },
    { value: 'rejected', label: 'נדחה' },
    { value: 'hired', label: 'הועסק' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center ml-4">
                <Briefcase size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {opportunity.jobTitle}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center">
                  <Building2 size={14} className="ml-1" />
                  {opportunity.company}
                  <MapPin size={14} className="mx-2" />
                  {opportunity.location}
                </p>
                <div className="flex items-center space-x-3 space-x-reverse mt-2">
                  {getStatusBadge()}
                  {opportunity.salary && (
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {opportunity.salary}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Description */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  תיאור התפקיד
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {mockDetails.jobDescription}
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  דרישות התפקיד
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <ul className="space-y-2">
                    {mockDetails.requirements.map((req, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle size={16} className="text-green-500 ml-2 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  הטבות
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <ul className="space-y-2">
                    {mockDetails.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                        <Star size={16} className="text-yellow-500 ml-2 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  ציר זמן הגיוס
                </h3>
                <div className="space-y-3">
                  {mockDetails.timeline.map((item, index) => (
                    <div key={index} className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className={`w-3 h-3 rounded-full ml-3 ${
                        item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'scheduled' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.event}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(item.date)}
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status === 'completed' ? 'הושלם' :
                         item.status === 'scheduled' ? 'מתוכנן' : 'ממתין'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Status & Contacts */}
            <div className="space-y-6">
              {/* Status Management */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  ניהול סטטוס
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">סטטוס נוכחי:</span>
                      {getStatusBadge()}
                    </div>
                    <button
                      onClick={() => setShowStatusChange(true)}
                      className="w-full mt-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      שנה סטטוס
                    </button>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">הוגש:</span>
                      <span className="text-gray-900 dark:text-white">{formatDate(opportunity.appliedDate)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="font-medium text-gray-700 dark:text-gray-300">עדכון אחרון:</span>
                      <span className="text-gray-900 dark:text-white">{formatDate(opportunity.lastActivity)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback (if in interview stage) */}
              {mockDetails.feedback && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    משוב מראיונות
                  </h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">דירוג כללי:</span>
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-500 ml-1" />
                        <span className="text-sm font-medium">{mockDetails.feedback.overallRating}/5</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">כישורים טכניים:</span>
                        <span className="font-medium">{mockDetails.feedback.technicalSkills}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">תקשורת:</span>
                        <span className="font-medium">{mockDetails.feedback.communication}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">התאמה תרבותית:</span>
                        <span className="font-medium">{mockDetails.feedback.culturalFit}/5</span>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-blue-200">
                      <p className="text-xs text-gray-600 dark:text-gray-400">{mockDetails.feedback.comments}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Contacts */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  אנשי קשר
                </h3>
                <div className="space-y-3">
                  {/* Hiring Manager */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">מנהל מגייס</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <User size={14} className="text-gray-400 ml-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{mockDetails.contacts.hiringManager.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail size={14} className="text-gray-400 ml-2" />
                        <a 
                          href={`mailto:${mockDetails.contacts.hiringManager.email}`}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {mockDetails.contacts.hiringManager.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone size={14} className="text-gray-400 ml-2" />
                        <a 
                          href={`tel:${mockDetails.contacts.hiringManager.phone}`}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {mockDetails.contacts.hiringManager.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Recruiter */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">מגייס</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <User size={14} className="text-gray-400 ml-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{mockDetails.contacts.recruiter.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail size={14} className="text-gray-400 ml-2" />
                        <a 
                          href={`mailto:${mockDetails.contacts.recruiter.email}`}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {mockDetails.contacts.recruiter.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone size={14} className="text-gray-400 ml-2" />
                        <a 
                          href={`tel:${mockDetails.contacts.recruiter.phone}`}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {mockDetails.contacts.recruiter.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  פעולות מהירות
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => window.open(`https://company.com/jobs/${opportunity.id}`, '_blank')}
                    className="w-full flex items-center justify-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <ExternalLink size={14} className="ml-1" />
                    פתח משרה באתר
                  </button>
                  
                  <button
                    onClick={() => navigator.clipboard.writeText(opportunity.id)}
                    className="w-full flex items-center justify-center px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    <Copy size={14} className="ml-1" />
                    העתק מזהה משרה
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            ID: {opportunity.id} • הוגש {formatDate(opportunity.appliedDate)}
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              סגור
            </button>
            
            {onEdit && (
              <button
                onClick={() => {
                  onEdit(opportunity);
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center"
              >
                <Edit size={16} className="ml-1" />
                ערוך
              </button>
            )}
            
            {onDelete && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors flex items-center"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-1"></div>
                    מסיר...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} className="ml-1" />
                    הסר מהמשרה
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Status Change Modal */}
        {showStatusChange && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">שנה סטטוס</h3>
              <div className="space-y-2">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => {
                      onStatusChange?.(opportunity.id, status.value);
                      setShowStatusChange(false);
                    }}
                    className={`w-full text-right px-3 py-2 rounded-lg transition-colors ${
                      opportunity.status === status.value
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowStatusChange(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  ביטול
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}