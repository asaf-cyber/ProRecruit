'use client';

import { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  Video, 
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  Bell,
  MessageSquare,
  Mail,
  ExternalLink,
  Copy,
  User,
  FileText,
  Star
} from 'lucide-react';

interface InterviewEvent {
  id: string;
  title: string;
  type: 'phone' | 'video' | 'onsite';
  date: string;
  time: string;
  duration: string;
  participants: string[];
  location?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  automationEnabled: boolean;
  notes?: string;
}

interface InterviewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  interview: InterviewEvent | null;
  onEdit?: (interview: InterviewEvent) => void;
  onDelete?: (interviewId: string) => void;
  onReschedule?: (interview: InterviewEvent) => void;
}

export function InterviewDetailsModal({ 
  isOpen, 
  onClose, 
  interview, 
  onEdit, 
  onDelete, 
  onReschedule 
}: InterviewDetailsModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!isOpen || !interview) return null;

  const getTypeIcon = () => {
    switch (interview.type) {
      case 'phone':
        return <Phone size={24} className="text-blue-600" />;
      case 'video':
        return <Video size={24} className="text-purple-600" />;
      case 'onsite':
        return <MapPin size={24} className="text-green-600" />;
      default:
        return <Calendar size={24} className="text-gray-600" />;
    }
  };

  const getTypeLabel = () => {
    switch (interview.type) {
      case 'phone':
        return 'ראיון טלפוני';
      case 'video':
        return 'ראיון וידאו';
      case 'onsite':
        return 'פגישה במשרד';
      default:
        return 'ראיון';
    }
  };

  const getStatusBadge = () => {
    const config = {
      scheduled: { label: 'מתוכנן', color: 'bg-blue-100 text-blue-800', icon: Clock },
      completed: { label: 'הושלם', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { label: 'בוטל', color: 'bg-red-100 text-red-800', icon: XCircle }
    };
    
    const statusConfig = config[interview.status];
    const Icon = statusConfig.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
        <Icon size={16} className="ml-1" />
        {statusConfig.label}
      </span>
    );
  };

  const handleDelete = async () => {
    if (!confirm('האם אתה בטוח שברצונך למחוק את הראיון?')) return;
    
    setIsDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onDelete?.(interview.id);
      onClose();
    } catch (error) {
      console.error('Error deleting interview:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDateTime = () => {
    const date = new Date(`${interview.date}T${interview.time}`);
    return {
      date: date.toLocaleDateString('he-IL', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: interview.time,
      duration: interview.duration
    };
  };

  const { date, time, duration } = formatDateTime();

  // Mock additional interview details
  const mockDetails = {
    meetingLink: interview.type === 'video' ? 'https://zoom.us/j/123456789' : undefined,
    calendarEventId: 'CAL-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    remindersSent: interview.status === 'scheduled' ? 2 : 0,
    feedback: interview.status === 'completed' ? {
      rating: 8.5,
      keyStrengths: ['ניסיון טכני חזק', 'תקשורת טובה', 'מוטיבציה גבוהה'],
      areasForImprovement: ['צריך לחזק בטכנולוגיות חדשות'],
      recommendation: 'להמשיך לשלב הבא',
      nextSteps: 'לקבוע ראיון עם מנהל הצוות'
    } : null,
    preparation: {
      candidateResume: 'נסקר',
      interviewQuestions: 'מוכן',
      technicalTest: interview.type !== 'phone' ? 'הוכן' : 'לא רלוונטי'
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center ml-4">
                {getTypeIcon()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {interview.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {getTypeLabel()}
                </p>
                <div className="flex items-center space-x-3 space-x-reverse mt-2">
                  {getStatusBadge()}
                  {interview.automationEnabled && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      <Bell size={12} className="ml-1" />
                      אוטומציה פעילה
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Interview Details */}
            <div className="space-y-6">
              {/* Time & Location */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  זמן ומיקום
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-400 ml-2" />
                    <span className="text-sm text-gray-900 dark:text-white">{date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-400 ml-2" />
                    <span className="text-sm text-gray-900 dark:text-white">{time} ({duration} דקות)</span>
                  </div>
                  {interview.location && (
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-400 ml-2" />
                      <span className="text-sm text-gray-900 dark:text-white">{interview.location}</span>
                    </div>
                  )}
                  {mockDetails.meetingLink && (
                    <div className="flex items-center">
                      <Video size={16} className="text-gray-400 ml-2" />
                      <a 
                        href={mockDetails.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        קישור לפגישה
                        <ExternalLink size={12} className="mr-1" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Participants */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  משתתפים
                </h3>
                <div className="space-y-2">
                  {interview.participants.map((participant, index) => (
                    <div key={index} className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <User size={16} className="text-gray-400 ml-2" />
                      <span className="text-sm text-gray-900 dark:text-white">{participant}</span>
                      <div className="mr-auto flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => window.open(`mailto:${participant.replace(' ', '.')}@company.com`, '_blank')}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="שלח מייל"
                        >
                          <Mail size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {interview.notes && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    הערות
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {interview.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Status & Actions */}
            <div className="space-y-6">
              {/* Interview Preparation */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  הכנות לראיון
                </h3>
                <div className="space-y-2">
                  {Object.entries(mockDetails.preparation).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {key === 'candidateResume' && 'קורות חיים'}
                        {key === 'interviewQuestions' && 'שאלות ראיון'}
                        {key === 'technicalTest' && 'מבחן טכני'}
                      </span>
                      <span className={`text-sm font-medium ${
                        value === 'מוכן' || value === 'נסקר' || value === 'הוכן' 
                          ? 'text-green-600' 
                          : 'text-gray-500'
                      }`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Automation Status */}
              {interview.automationEnabled && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    סטטוס אוטומציה
                  </h3>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Bell size={16} className="text-green-600 ml-2" />
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">
                        תזכורות נשלחו: {mockDetails.remindersSent}
                      </span>
                    </div>
                    <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
                      <li>• הזמנה ראשונית נשלחה</li>
                      <li>• תזכורת יום לפני מתוכננת</li>
                      <li>• תזכורת בוקר הראיון מתוכננת</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Feedback Section (for completed interviews) */}
              {interview.status === 'completed' && mockDetails.feedback && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    משוב מהראיון
                  </h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 ml-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        דירוג: {mockDetails.feedback.rating}/10
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">נקודות חוזק:</h4>
                      <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                        {mockDetails.feedback.keyStrengths.map((strength, index) => (
                          <li key={index}>• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">המליצה:</h4>
                      <p className="text-xs text-gray-700 dark:text-gray-300">{mockDetails.feedback.recommendation}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  פעולות מהירות
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(mockDetails.calendarEventId)}
                    className="w-full flex items-center justify-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Copy size={14} className="ml-1" />
                    העתק מזהה אירוע
                  </button>
                  
                  {interview.status === 'scheduled' && (
                    <button
                      onClick={() => onReschedule?.(interview)}
                      className="w-full flex items-center justify-center px-3 py-2 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                    >
                      <Clock size={14} className="ml-1" />
                      קבע מחדש
                    </button>
                  )}
                  
                  {interview.status === 'completed' && (
                    <button
                      onClick={() => setShowFeedback(true)}
                      className="w-full flex items-center justify-center px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      <MessageSquare size={14} className="ml-1" />
                      הוסף משוב
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            ID: {mockDetails.calendarEventId} • נוצר {date}
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
                  onEdit(interview);
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
                    מוחק...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} className="ml-1" />
                    מחק
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}