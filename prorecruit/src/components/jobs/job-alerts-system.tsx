'use client';

import { useState, useEffect } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  Users, 
  CheckCircle,
  XCircle,
  Calendar,
  TrendingDown,
  TrendingUp,
  Target,
  Zap,
  Info,
  X
} from 'lucide-react';
import { JobRequisition } from '@/app/jobs/page';

interface JobAlert {
  id: string;
  jobId: string;
  jobTitle: string;
  type: 'deadline' | 'performance' | 'candidate' | 'status' | 'budget' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
  data?: any;
}

interface JobAlertsSystemProps {
  jobs: JobRequisition[];
  isOpen: boolean;
  onClose: () => void;
}

export function JobAlertsSystem({ jobs, isOpen, onClose }: JobAlertsSystemProps) {
  const [alerts, setAlerts] = useState<JobAlert[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high' | 'action'>('all');

  useEffect(() => {
    if (jobs.length > 0) {
      generateAlerts();
    }
  }, [jobs]);

  const generateAlerts = () => {
    const newAlerts: JobAlert[] = [];
    const now = new Date();

    jobs.forEach(job => {
      // Alert: משרה פתוחה יותר מ-30 יום
      if (job.publishDate) {
        const publishedDate = new Date(job.publishDate);
        const daysOpen = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 3600 * 24));
        
        if (daysOpen > 30 && job.status === 'published') {
          newAlerts.push({
            id: `deadline-${job.id}`,
            jobId: job.id,
            jobTitle: job.title,
            type: 'deadline',
            severity: daysOpen > 60 ? 'critical' : 'high',
            title: 'משרה פתוחה זמן רב',
            message: `המשרה פתוחה כבר ${daysOpen} ימים. שקול לבחון את האסטרטגיה או לעדכן את הדרישות.`,
            timestamp: now.toISOString(),
            isRead: false,
            actionRequired: true,
            data: { daysOpen }
          });
        }
      }

      // Alert: אין מועמדים
      if (job.candidatesCount === 0 && job.status === 'published') {
        newAlerts.push({
          id: `candidates-${job.id}`,
          jobId: job.id,
          jobTitle: job.title,
          type: 'candidate',
          severity: 'medium',
          title: 'אין מועמדים למשרה',
          message: 'המשרה פורסמה אך עדיין לא התקבלו מועמדות. שקול לשפר את המודעה או להרחיב את הפרסום.',
          timestamp: now.toISOString(),
          isRead: false,
          actionRequired: true
        });
      }

      // Alert: מועמדים רבים ללא התקדמות
      if (job.candidatesCount > 10 && job.applications.length === 0) {
        newAlerts.push({
          id: `stagnant-${job.id}`,
          jobId: job.id,
          jobTitle: job.title,
          type: 'performance',
          severity: 'medium',
          title: 'מועמדים ללא התקדמות',
          message: `יש ${job.candidatesCount} מועמדים אך אף אחד לא בתהליך פעיל. זקוק לבדיקת איכות המועמדים.`,
          timestamp: now.toISOString(),
          isRead: false,
          actionRequired: true
        });
      }

      // Alert: משרה ביטחונית ללא אישור ביטחוני
      if (job.client?.type === 'security' && !job.securityClearance) {
        newAlerts.push({
          id: `security-${job.id}`,
          jobId: job.id,
          jobTitle: job.title,
          type: 'system',
          severity: 'high',
          title: 'חסרה דרגת ביטחון',
          message: 'המשרה מיועדת ללקוח ביטחוני אך לא צוינה דרגת הביטחון הנדרשת.',
          timestamp: now.toISOString(),
          isRead: false,
          actionRequired: true
        });
      }

      // Alert: תקציב הזמנת רכש נגמר
      if (job.purchaseOrder && job.purchaseOrder.amount < 50000) {
        newAlerts.push({
          id: `budget-${job.id}`,
          jobId: job.id,
          jobTitle: job.title,
          type: 'budget',
          severity: 'high',
          title: 'תקציב נמוך בהזמנת רכש',
          message: `נותרו רק ₪${job.purchaseOrder.amount.toLocaleString()} בהזמנת הרכש. שקול לחדש או להגדיל את התקציב.`,
          timestamp: now.toISOString(),
          isRead: false,
          actionRequired: true
        });
      }

      // Alert: משרה בטיוטה זמן רב
      if (job.status === 'draft') {
        const createdDate = new Date(job.createdDate);
        const daysInDraft = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));
        
        if (daysInDraft > 7) {
          newAlerts.push({
            id: `draft-${job.id}`,
            jobId: job.id,
            jobTitle: job.title,
            type: 'status',
            severity: 'low',
            title: 'משרה בטיוטה זמן רב',
            message: `המשרה נמצאת בטיוטה כבר ${daysInDraft} ימים. שקול לפרסם או לעדכן את הפרטים.`,
            timestamp: now.toISOString(),
            isRead: false,
            actionRequired: false
          });
        }
      }

      // Alert: הצלחה - גיוס מהיר
      if (job.status === 'closed' && job.averageDaysToHire && job.averageDaysToHire < 15) {
        newAlerts.push({
          id: `success-${job.id}`,
          jobId: job.id,
          jobTitle: job.title,
          type: 'performance',
          severity: 'low',
          title: 'גיוס מהיר ומוצלח!',
          message: `המשרה נסגרה בהצלחה תוך ${job.averageDaysToHire} ימים בלבד. מעולה!`,
          timestamp: now.toISOString(),
          isRead: false,
          actionRequired: false
        });
      }
    });

    setAlerts(newAlerts);
  };

  const getSeverityConfig = (severity: JobAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          bgColor: 'bg-red-50 border-red-200',
          iconColor: 'text-red-600',
          titleColor: 'text-red-900',
          icon: AlertTriangle
        };
      case 'high':
        return {
          bgColor: 'bg-orange-50 border-orange-200',
          iconColor: 'text-orange-600',
          titleColor: 'text-orange-900',
          icon: AlertTriangle
        };
      case 'medium':
        return {
          bgColor: 'bg-yellow-50 border-yellow-200',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-900',
          icon: Clock
        };
      case 'low':
        return {
          bgColor: 'bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-900',
          icon: Info
        };
    }
  };

  const getTypeIcon = (type: JobAlert['type']) => {
    switch (type) {
      case 'deadline':
        return Calendar;
      case 'performance':
        return TrendingUp;
      case 'candidate':
        return Users;
      case 'status':
        return CheckCircle;
      case 'budget':
        return Target;
      case 'system':
        return Zap;
      default:
        return Bell;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    switch (filter) {
      case 'unread':
        return !alert.isRead;
      case 'high':
        return alert.severity === 'high' || alert.severity === 'critical';
      case 'action':
        return alert.actionRequired;
      default:
        return true;
    }
  });

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Bell className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">התראות מערכת</h2>
                <p className="text-purple-100 text-sm">
                  {filteredAlerts.length} התראות | {alerts.filter(a => !a.isRead).length} לא נקראו
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-purple-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-sm font-medium text-gray-700">סינון:</span>
            {[
              { key: 'all', label: 'הכל' },
              { key: 'unread', label: 'לא נקראו' },
              { key: 'high', label: 'גבוהות' },
              { key: 'action', label: 'דורשות פעולה' }
            ].map(filterOption => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {filteredAlerts.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredAlerts.map((alert) => {
                const severityConfig = getSeverityConfig(alert.severity);
                const TypeIcon = getTypeIcon(alert.type);
                const SeverityIcon = severityConfig.icon;

                return (
                  <div
                    key={alert.id}
                    className={`p-4 border-r-4 ${severityConfig.bgColor} ${
                      alert.isRead ? 'opacity-75' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 space-x-reverse">
                        <div className={`p-2 rounded-lg ${severityConfig.bgColor}`}>
                          <SeverityIcon className={`w-5 h-5 ${severityConfig.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 space-x-reverse mb-1">
                            <h4 className={`font-medium ${severityConfig.titleColor}`}>
                              {alert.title}
                            </h4>
                            <TypeIcon className={`w-4 h-4 ${severityConfig.iconColor}`} />
                            {alert.actionRequired && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                                דורש פעולה
                              </span>
                            )}
                            {!alert.isRead && (
                              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                          <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                            <span>משרה: {alert.jobTitle}</span>
                            <span>{new Date(alert.timestamp).toLocaleDateString('he-IL')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 space-x-reverse">
                        {!alert.isRead && (
                          <button
                            onClick={() => markAsRead(alert.id)}
                            className="p-1 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded"
                            title="סמן כנקרא"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                          title="הסר התראה"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">אין התראות</h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? 'כל המשרות במצב תקין' 
                  : `אין התראות שתואמות לסינון "${filter === 'unread' ? 'לא נקראו' : filter === 'high' ? 'גבוהות' : 'דורשות פעולה'}"`
                }
              </p>
            </div>
          )}
        </div>

        {/* Summary Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 space-x-reverse text-gray-600">
              <div className="flex items-center space-x-1 space-x-reverse">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>קריטיות: {alerts.filter(a => a.severity === 'critical').length}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>גבוהות: {alerts.filter(a => a.severity === 'high').length}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>בינוניות: {alerts.filter(a => a.severity === 'medium').length}</span>
              </div>
            </div>
            <button
              onClick={() => setAlerts(alerts.map(a => ({ ...a, isRead: true })))}
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              סמן הכל כנקרא
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}