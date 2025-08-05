'use client';

import { useState, useEffect } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  DollarSign, 
  Clock, 
  Users,
  FileText,
  CheckCircle,
  X,
  Settings
} from 'lucide-react';

interface Alert {
  id: number;
  type: 'financial' | 'operational' | 'hr' | 'urgent' | 'info';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  isRead: boolean;
  action?: string;
  data?: {
    value: string;
    threshold: string;
    change: number;
  };
}

export function ExecutiveAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Mock alerts - בפועל זה יגיע מה-API
    const mockAlerts: Alert[] = [
      {
        id: 1,
        type: 'financial',
        title: 'חוב פתוח של לקוח',
        description: 'לקוח "חברת טכנולוגיה א" חב ₪45,000 מעל 30 ימים',
        severity: 'high',
        timestamp: '2024-01-15 10:30',
        isRead: false,
        action: 'צור קשר עם הלקוח לבדיקת מצב התשלום',
        data: {
          value: '₪45,000',
          threshold: '30 ימים',
          change: 15
        }
      },
      {
        id: 2,
        type: 'operational',
        title: 'עיכוב בסגירת משרה',
        description: 'משרת "מפתח Full Stack" פתוחה מעל 45 ימים - מעל הממוצע',
        severity: 'medium',
        timestamp: '2024-01-15 09:15',
        isRead: false,
        action: 'בדוק את תהליך הגיוס ולשקול הרחבת מקורות',
        data: {
          value: '45 ימים',
          threshold: '30 ימים',
          change: 50
        }
      },
      {
        id: 3,
        type: 'hr',
        title: 'עובד זכאי למענק',
        description: 'דוד כהן עובד 3 שנים בחברה - זכאי למענק נאמנות',
        severity: 'low',
        timestamp: '2024-01-15 08:45',
        isRead: true,
        action: 'הכן מסמכי מענק נאמנות',
        data: {
          value: '3 שנים',
          threshold: '3 שנים',
          change: 0
        }
      },
      {
        id: 4,
        type: 'urgent',
        title: 'חריגה בתקציב גיוס',
        description: 'עלות הגיוס החודש חרגה ב-12% מהתקציב המתוכנן',
        severity: 'high',
        timestamp: '2024-01-15 08:00',
        isRead: false,
        action: 'בדוק את מקורות העלייה בעלות ולשקול צמצום',
        data: {
          value: '₪125,000',
          threshold: '₪110,000',
          change: 12
        }
      },
      {
        id: 5,
        type: 'info',
        title: 'עדכון מערכת',
        description: 'עדכון מערכת הגיוס יותקן הלילה בין 02:00-04:00',
        severity: 'low',
        timestamp: '2024-01-15 07:30',
        isRead: true
      }
    ];

    setAlerts(mockAlerts);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'financial':
        return <DollarSign className="w-5 h-5 text-red-600" />;
      case 'operational':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'hr':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'urgent':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'info':
        return <FileText className="w-5 h-5 text-gray-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[severity as keyof typeof colors]}`}>
        {severity === 'high' ? 'גבוה' : severity === 'medium' ? 'בינוני' : 'נמוך'}
      </span>
    );
  };

  const markAsRead = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const deleteAlert = (alertId: number) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const filteredAlerts = alerts.filter(alert => 
    filterType === 'all' || alert.type === filterType
  );

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">התראות ניהוליות</h2>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל ההתראות</option>
            <option value="financial">פיננסי</option>
            <option value="operational">תפעולי</option>
            <option value="hr">משאבי אנוש</option>
            <option value="urgent">דחוף</option>
            <option value="info">מידע</option>
          </select>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} ${
              !alert.isRead ? 'ring-2 ring-blue-200' : ''
            }`}
          >
            <div className="flex items-start space-x-3 space-x-reverse">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                    {getSeverityBadge(alert.severity)}
                    {!alert.isRead && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{alert.description}</p>
                
                {alert.data && (
                  <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                    <div className="text-center p-2 bg-white rounded">
                      <div className="font-semibold text-gray-900">{alert.data.value}</div>
                      <div className="text-gray-500">ערך נוכחי</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div className="font-semibold text-blue-600">{alert.data.threshold}</div>
                      <div className="text-gray-500">סף</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div className={`font-semibold ${alert.data.change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {alert.data.change > 0 ? '+' : ''}{alert.data.change}%
                      </div>
                      <div className="text-gray-500">חריגה</div>
                    </div>
                  </div>
                )}
                
                {alert.action && (
                  <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                    <div className="text-sm font-medium text-blue-900 mb-1">פעולה נדרשת:</div>
                    <div className="text-sm text-blue-800">{alert.action}</div>
                  </div>
                )}
                
                {!alert.isRead && (
                  <button
                    onClick={() => markAsRead(alert.id)}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-800"
                  >
                    סמן כנקרא
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">אין התראות חדשות</p>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">הגדרות התראות</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">התראות פיננסיות</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">התראות תפעוליות</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">התראות משאבי אנוש</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">התראות דחופות</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 