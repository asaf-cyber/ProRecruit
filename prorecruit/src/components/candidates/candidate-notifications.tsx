'use client';

import { useState, useEffect } from 'react';
import { 
  Bell, 
  Phone, 
  Mail, 
  MessageCircle, 
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  User,
  Calendar,
  Eye
} from 'lucide-react';

interface NotificationItem {
  id: string;
  type: 'phone' | 'email' | 'sms' | 'whatsapp' | 'reminder';
  message: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'pending' | 'approved' | 'sent' | 'failed' | 'cancelled';
  candidateId: string;
  candidateName: string;
  handlerName: string;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
  sentAt?: string;
  failureReason?: string;
}

interface CandidateNotificationsProps {
  candidateId: string;
  candidateName: string;
  handlerName: string;
  onCreateNotification: (notification: Omit<NotificationItem, 'id' | 'createdAt' | 'status'>) => void;
  onApproveNotification: (notificationId: string) => void;
  onCancelNotification: (notificationId: string) => void;
}

export function CandidateNotifications({ 
  candidateId, 
  candidateName, 
  handlerName,
  onCreateNotification,
  onApproveNotification,
  onCancelNotification
}: CandidateNotificationsProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newNotification, setNewNotification] = useState({
    type: 'email' as const,
    message: '',
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTime: '09:00'
  });

  // Simulate loading notifications for this candidate
  useEffect(() => {
    const mockNotifications: NotificationItem[] = [
      {
        id: '1',
        type: 'email',
        message: 'הזמנה לראיון למשרת מפתח Full Stack',
        scheduledDate: '2024-01-20',
        scheduledTime: '10:00',
        status: 'pending',
        candidateId,
        candidateName,
        handlerName,
        createdAt: '2024-01-18T08:30:00',
      },
      {
        id: '2',
        type: 'phone',
        message: 'התקשרות לבדיקת זמינות לראיון',
        scheduledDate: '2024-01-19',
        scheduledTime: '14:30',
        status: 'approved',
        candidateId,
        candidateName,
        handlerName,
        createdAt: '2024-01-18T09:15:00',
        approvedBy: 'מנהל הגיוס',
        approvedAt: '2024-01-18T09:20:00'
      },
      {
        id: '3',
        type: 'whatsapp',
        message: 'תזכורת לראיון מחר',
        scheduledDate: '2024-01-21',
        scheduledTime: '18:00',
        status: 'sent',
        candidateId,
        candidateName,
        handlerName,
        createdAt: '2024-01-17T16:00:00',
        approvedBy: 'מנהל הגיוס',
        approvedAt: '2024-01-17T16:05:00',
        sentAt: '2024-01-21T18:00:00'
      }
    ];
    setNotifications(mockNotifications);
  }, [candidateId, candidateName, handlerName]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'sms': return MessageCircle;
      case 'whatsapp': return MessageSquare;
      case 'reminder': return Bell;
      default: return AlertCircle;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'phone': return 'שיחת טלפון';
      case 'email': return 'אימייל';
      case 'sms': return 'SMS';
      case 'whatsapp': return 'WhatsApp';
      case 'reminder': return 'תזכורת';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'approved': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'sent': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'ממתין לאישור';
      case 'approved': return 'אושר';
      case 'sent': return 'נשלח';
      case 'failed': return 'נכשל';
      case 'cancelled': return 'בוטל';
      default: return status;
    }
  };

  const handleCreateNotification = () => {
    onCreateNotification({
      ...newNotification,
      candidateId,
      candidateName,
      handlerName
    });
    
    // Add to local state for immediate feedback
    const notification: NotificationItem = {
      id: Date.now().toString(),
      ...newNotification,
      candidateId,
      candidateName,
      handlerName,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev]);
    
    // Reset form
    setNewNotification({
      type: 'email',
      message: '',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '09:00'
    });
    setShowCreateForm(false);
  };

  const handleApprove = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId 
        ? { 
            ...n, 
            status: 'approved', 
            approvedBy: 'מנהל נוכחי', 
            approvedAt: new Date().toISOString() 
          }
        : n
    ));
    onApproveNotification(notificationId);
  };

  const handleCancel = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId 
        ? { ...n, status: 'cancelled' }
        : n
    ));
    onCancelNotification(notificationId);
  };

  const pendingNotifications = notifications.filter(n => n.status === 'pending');

  return (
    <div className="space-y-4">
      {/* Pending Notifications Alert */}
      {pendingNotifications.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              {pendingNotifications.length} התראות ממתינות לאישור
            </h4>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            התראות ותזכורות - {candidateName}
          </h3>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Bell size={16} className="ml-2" />
          הוסף התראה
        </button>
      </div>

      {/* Create Notification Form */}
      {showCreateForm && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">התראה חדשה</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                סוג ההתראה
              </label>
              <select
                value={newNotification.type}
                onChange={(e) => setNewNotification(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="email">אימייל</option>
                <option value="phone">שיחת טלפון</option>
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="reminder">תזכורת</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                תאריך ושעה
              </label>
              <div className="flex space-x-2 space-x-reverse">
                <input
                  type="date"
                  value={newNotification.scheduledDate}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <input
                  type="time"
                  value={newNotification.scheduledTime}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                תוכן ההודעה
              </label>
              <textarea
                value={newNotification.message}
                onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="הכנס את תוכן ההודעה..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 space-x-reverse mt-4">
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              ביטול
            </button>
            <button
              onClick={handleCreateNotification}
              disabled={!newNotification.message.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              צור התראה
            </button>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => {
          const TypeIcon = getTypeIcon(notification.type);
          return (
            <div
              key={notification.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 space-x-reverse flex-1">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                    <TypeIcon size={20} className="text-gray-600 dark:text-gray-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {getTypeLabel(notification.type)}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(notification.status)}`}>
                        {getStatusLabel(notification.status)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4 space-x-reverse">
                      <div className="flex items-center">
                        <Calendar size={12} className="ml-1" />
                        {new Date(notification.scheduledDate).toLocaleDateString('he-IL')} בשעה {notification.scheduledTime}
                      </div>
                      <div className="flex items-center">
                        <User size={12} className="ml-1" />
                        מטפל: {notification.handlerName}
                      </div>
                      {notification.approvedBy && (
                        <div className="flex items-center">
                          <CheckCircle size={12} className="ml-1" />
                          אושר על ידי: {notification.approvedBy}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="הצג פרטים"
                  >
                    <Eye size={16} />
                  </button>

                  {notification.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(notification.id)}
                        className="p-2 text-green-600 hover:text-green-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                        title="אשר שליחה"
                      >
                        <CheckCircle size={16} />
                      </button>
                      <button
                        onClick={() => handleCancel(notification.id)}
                        className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="בטל התראה"
                      >
                        <XCircle size={16} />
                      </button>
                    </>
                  )}

                  {notification.status === 'approved' && (
                    <button
                      className="p-2 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      title="שלח עכשיו"
                    >
                      <Send size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {notifications.length === 0 && (
          <div className="text-center py-8">
            <Bell className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">אין התראות</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">התחל על ידי יצירת התראה חדשה.</p>
          </div>
        )}
      </div>
    </div>
  );
}