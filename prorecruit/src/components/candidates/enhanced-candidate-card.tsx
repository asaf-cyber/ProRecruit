'use client';

import { useState } from 'react';
import { 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  AlertCircle,
  RefreshCw,
  Bell,
  MessageCircle,
  MessageSquare,
  User,
  Building,
  FileText,
  Copy
} from 'lucide-react';
import { CandidateNotifications } from './candidate-notifications';
import { CandidateActivityTimeline } from './candidate-activity-timeline';

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

interface EnhancedCandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (candidateId: string, isSelected: boolean) => void;
  onView: (candidateId: string) => void;
  onEdit: (candidate: Candidate) => void;
  onDelete: (candidateId: string) => void;
  onContact: (candidate: Candidate) => void;
  onStatusChange: (candidate: Candidate) => void;
  showNotifications?: boolean;
}

export function EnhancedCandidateCard({
  candidate,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onContact,
  onStatusChange,
  showNotifications = false
}: EnhancedCandidateCardProps) {
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const [showActivityTimeline, setShowActivityTimeline] = useState(false);
  const [pendingNotifications] = useState(2); // Mock pending notifications count

  // Mock activity data
  const mockActivities = [
    {
      id: '1',
      type: 'status_change' as const,
      title: 'שינוי סטטוס',
      description: 'סטטוס שונה לבראיון',
      timestamp: '2024-01-18T10:30:00',
      user: 'שרה כהן',
      metadata: {
        from: 'הוגשה מועמדות',
        to: 'בראיון'
      }
    },
    {
      id: '2', 
      type: 'email' as const,
      title: 'נשלח אימייל',
      description: 'הזמנה לראיון נשלחה',
      timestamp: '2024-01-18T09:15:00',
      user: 'דוד לוי',
      metadata: {
        method: 'אימייל',
        result: 'נשלח בהצלחה'
      }
    },
    {
      id: '3',
      type: 'phone' as const,
      title: 'שיחת טלפון',
      description: 'ביצוע שיחת טלפון ראשונית',
      timestamp: '2024-01-17T14:20:00',
      user: 'מיכל ישראלי',
      metadata: {
        method: 'שיחה יוצאת',
        result: 'המועמד ענה'
      }
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      applied: { label: 'הוגשה מועמדות', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', icon: Clock },
      phone_screen: { label: 'שיחת טלפון', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: Phone },
      interview: { label: 'בראיון', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200', icon: Calendar },
      offer: { label: 'הצעה', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: CheckCircle },
      rejected: { label: 'נדחה', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', icon: XCircle },
      hired: { label: 'הועסק', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200', icon: Star }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { 
      label: status, 
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200', 
      icon: AlertCircle 
    };
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
      'LinkedIn': { label: 'LinkedIn', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      'חבר מביא חבר': { label: 'חבר מביא חבר', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'אתר החברה': { label: 'אתר החברה', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
      'לוח דרושים': { label: 'לוח דרושים', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
      'פנייה ישירה': { label: 'פנייה ישירה', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' }
    };
    
    const config = sourceConfig[source as keyof typeof sourceConfig] || { 
      label: source, 
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' 
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleCreateNotification = (notification: any) => {
    console.log('Create notification:', notification);
    // Here you would integrate with your notification system
  };

  const handleApproveNotification = (notificationId: string) => {
    console.log('Approve notification:', notificationId);
    // Here you would call your API to approve the notification
  };

  const handleCancelNotification = (notificationId: string) => {
    console.log('Cancel notification:', notificationId);
    // Here you would call your API to cancel the notification
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border-2 transition-all duration-200 shadow-sm hover:shadow-md ${
      isSelected 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
    }`}>
      {/* Main Card Content */}
      <div className="p-4">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(candidate.id, e.target.checked)}
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
          
          {/* Notifications Bell and Actions */}
          <div className="flex items-center space-x-2 space-x-reverse">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
                className={`p-2 rounded-lg transition-colors ${
                  pendingNotifications > 0 
                    ? 'text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20' 
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={`${pendingNotifications} התראות ממתינות`}
              >
                <Bell size={16} />
                {pendingNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {pendingNotifications}
                  </span>
                )}
              </button>
            </div>

            {/* Actions Menu */}
            <div className="relative">
              <button
                onClick={() => setShowActionsMenu(!showActionsMenu)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <MoreHorizontal size={16} className="text-gray-600 dark:text-gray-300" />
              </button>
              
              {showActionsMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="py-1">
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        onView(candidate.id);
                        setShowActionsMenu(false);
                      }}
                    >
                      <Eye size={16} className="ml-3" />
                      הצג פרטים
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        onEdit(candidate);
                        setShowActionsMenu(false);
                      }}
                    >
                      <Edit size={16} className="ml-3" />
                      ערוך מועמד
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        onContact(candidate);
                        setShowActionsMenu(false);
                      }}
                    >
                      <Phone size={16} className="ml-3" />
                      צור קשר
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        // Copy candidate details to clipboard
                        const details = `${candidate.firstName} ${candidate.lastName}\n${candidate.email}\n${candidate.phone}\n${candidate.currentRole} - ${candidate.company}`;
                        navigator.clipboard.writeText(details);
                        alert('פרטי המועמד הועתקו ללוח');
                        setShowActionsMenu(false);
                      }}
                    >
                      <Copy size={16} className="ml-3" />
                      העתק פרטים
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        // Export candidate to PDF/CSV
                        alert('ייצוא מועמד - פונקציונליות תתווסף בעתיד');
                        setShowActionsMenu(false);
                      }}
                    >
                      <FileText size={16} className="ml-3" />
                      ייצא מועמד
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        onStatusChange(candidate);
                        setShowActionsMenu(false);
                      }}
                    >
                      <RefreshCw size={16} className="ml-3" />
                      שנה סטטוס
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setShowActivityTimeline(!showActivityTimeline);
                        setShowActionsMenu(false);
                      }}
                    >
                      <Clock size={16} className="ml-3" />
                      היסטוריית פעילות
                    </button>
                    <hr className="my-1 border-gray-200 dark:border-gray-600" />
                    <button 
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => {
                        onDelete(candidate.id);
                        setShowActionsMenu(false);
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
        </div>
        
        {/* Content Grid */}
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
            <span className="text-sm text-gray-900 dark:text-white flex items-center">
              <Building size={12} className="ml-1" />
              {candidate.company}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">מגייס:</span>
            <span className="text-sm text-gray-900 dark:text-white flex items-center">
              <User size={12} className="ml-1" />
              {candidate.recruiter}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">הגשה:</span>
            <span className="text-sm text-gray-900 dark:text-white flex items-center">
              <Calendar size={12} className="ml-1" />
              {new Date(candidate.appliedDate).toLocaleDateString('he-IL')}
            </span>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4 space-x-reverse">
            <div className="flex items-center">
              <Phone size={12} className="ml-1" />
              {candidate.phone}
            </div>
            <div className="flex items-center">
              <Mail size={12} className="ml-1" />
              {candidate.email}
            </div>
            {candidate.location && (
              <div className="flex items-center">
                <MapPin size={12} className="ml-1" />
                {candidate.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotificationsPanel && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/50">
          <CandidateNotifications
            candidateId={candidate.id}
            candidateName={`${candidate.firstName} ${candidate.lastName}`}
            handlerName={candidate.recruiter}
            onCreateNotification={handleCreateNotification}
            onApproveNotification={handleApproveNotification}
            onCancelNotification={handleCancelNotification}
          />
        </div>
      )}

      {/* Activity Timeline Panel */}
      {showActivityTimeline && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/50">
          <CandidateActivityTimeline
            candidateId={candidate.id}
            candidateName={`${candidate.firstName} ${candidate.lastName}`}
            activities={mockActivities}
          />
        </div>
      )}
    </div>
  );
}