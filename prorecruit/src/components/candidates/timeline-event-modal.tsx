'use client';

import { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Edit, 
  Trash2, 
  Copy,
  ExternalLink
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: 'upload' | 'status_change' | 'communication' | 'feedback' | 'interview' | 'manual';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  icon: any;
  color: string;
}

interface TimelineEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: TimelineEvent | null;
  onEdit?: (event: TimelineEvent) => void;
  onDelete?: (eventId: string) => void;
}

export function TimelineEventModal({ 
  isOpen, 
  onClose, 
  event, 
  onEdit, 
  onDelete 
}: TimelineEventModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !event) return null;

  const getEventTypeLabel = (type: string) => {
    const typeLabels = {
      upload: 'העלאת קובץ',
      status_change: 'שינוי סטטוס',
      communication: 'תקשורת',
      feedback: 'משוב',
      interview: 'ראיון',
      manual: 'הערה ידנית'
    };
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  const getEventIcon = () => {
    const Icon = event.icon;
    return <Icon size={24} className={event.color} />;
  };

  const handleDelete = async () => {
    if (!confirm('האם אתה בטוח שברצונך למחוק את האירוע הזה?')) return;
    
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onDelete?.(event.id);
      onClose();
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('he-IL', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('he-IL', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const { date, time } = formatDateTime(event.timestamp);

  // Generate additional mock details based on event type
  const getEventDetails = () => {
    switch (event.type) {
      case 'communication':
        return {
          recipient: 'david.cohen@email.com',
          channel: 'מייל',
          status: 'נשלח בהצלחה',
          subject: 'הזמנה לראיון טלפוני',
          messageId: 'MSG-' + Math.random().toString(36).substr(2, 9).toUpperCase()
        };
      case 'interview':
        return {
          interviewType: 'ראיון טלפוני',
          duration: '45 דקות',
          outcome: 'חיובי',
          nextStep: 'ראיון פרונטלי',
          interviewer: 'יוסי גולדברג',
          score: '8/10'
        };
      case 'status_change':
        return {
          previousStatus: 'Applied',
          newStatus: 'Phone Screen',
          reason: 'עבר בחינה ראשונית',
          changedBy: 'דוד לוי',
          automated: false
        };
      case 'upload':
        return {
          fileName: 'resume_david_cohen.pdf',
          fileSize: '2.3 MB',
          fileType: 'PDF',
          source: 'LinkedIn',
          processedBy: 'מערכת AI'
        };
      case 'feedback':
        return {
          rating: '9/10',
          category: 'כישורים טכניים',
          reviewer: 'יוסי גולדברג',
          followUp: 'לקבוע ראיון נוסף',
          tags: ['מתאים', 'מנוסה', 'מוטיבציה גבוהה']
        };
      default:
        return {};
    }
  };

  const details = getEventDetails();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center ml-4">
                {getEventIcon()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {getEventTypeLabel(event.type)}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <Calendar size={14} className="ml-1" />
                  <span>{date}</span>
                  <Clock size={14} className="mx-2" />
                  <span>{time}</span>
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
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              תיאור האירוع
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Event Details */}
          {Object.keys(details).length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                פרטים נוספים
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(details).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                        {key === 'recipient' && 'נמען:'}
                        {key === 'channel' && 'אמצעי:'}
                        {key === 'status' && 'סטטוס:'}
                        {key === 'subject' && 'נושא:'}
                        {key === 'messageId' && 'מזהה הודעה:'}
                        {key === 'interviewType' && 'סוג ראיון:'}
                        {key === 'duration' && 'משך:'}
                        {key === 'outcome' && 'תוצאה:'}
                        {key === 'nextStep' && 'שלב הבא:'}
                        {key === 'interviewer' && 'מראיין:'}
                        {key === 'score' && 'ציון:'}
                        {key === 'previousStatus' && 'סטטוס קודם:'}
                        {key === 'newStatus' && 'סטטוס חדש:'}
                        {key === 'reason' && 'סיבה:'}
                        {key === 'changedBy' && 'שונה על ידי:'}
                        {key === 'automated' && 'אוטומטי:'}
                        {key === 'fileName' && 'שם קובץ:'}
                        {key === 'fileSize' && 'גודל:'}
                        {key === 'fileType' && 'סוג:'}
                        {key === 'source' && 'מקור:'}
                        {key === 'processedBy' && 'עובד על ידי:'}
                        {key === 'rating' && 'דירוג:'}
                        {key === 'category' && 'קטגוריה:'}
                        {key === 'reviewer' && 'בודק:'}
                        {key === 'followUp' && 'המשך:'}
                        {key === 'tags' && 'תגיות:'}
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                        {key === 'automated' && (value ? ' כן' : ' לא')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* User Info */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              מידע כללי
            </h3>
            <div className="flex items-center">
              <User size={16} className="text-gray-400 ml-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">בוצע על ידי:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">
                {event.user}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              פעולות מהירות
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => copyToClipboard(event.description)}
                className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Copy size={14} className="ml-1" />
                העתק תיאור
              </button>
              
              {event.type === 'communication' && (
                <button
                  onClick={() => window.open(`mailto:${details.recipient}`, '_blank')}
                  className="inline-flex items-center px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  <Mail size={14} className="ml-1" />
                  פתח מייל
                </button>
              )}
              
              {event.type === 'upload' && (
                <button
                  onClick={() => alert('פותח קובץ...')}
                  className="inline-flex items-center px-3 py-2 text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  <ExternalLink size={14} className="ml-1" />
                  פתח קובץ
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            ID: {event.id} • נוצר {date} בשעה {time}
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
                  onEdit(event);
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