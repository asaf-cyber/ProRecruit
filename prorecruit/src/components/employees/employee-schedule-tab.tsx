'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface EmployeeScheduleTabProps {
  employeeId: string;
}

interface ScheduleEvent {
  id: string;
  type: 'work' | 'vacation' | 'sick' | 'meeting' | 'training';
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export function EmployeeScheduleTab({ employeeId }: EmployeeScheduleTabProps) {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    // Mock data - בפועל זה יגיע מה-API
    const mockEvents: ScheduleEvent[] = [
      {
        id: '1',
        type: 'work',
        title: 'יום עבודה רגיל',
        startDate: '2024-01-15',
        endDate: '2024-01-15',
        status: 'completed'
      },
      {
        id: '2',
        type: 'vacation',
        title: 'חופשה שנתית',
        startDate: '2024-01-20',
        endDate: '2024-01-25',
        description: 'חופשה שנתית - 5 ימים',
        status: 'scheduled'
      },
      {
        id: '3',
        type: 'meeting',
        title: 'פגישת צוות שבועית',
        startDate: '2024-01-16',
        endDate: '2024-01-16',
        description: 'פגישה עם הצוות - 10:00-11:00',
        status: 'scheduled'
      },
      {
        id: '4',
        type: 'training',
        title: 'הכשרה - React Advanced',
        startDate: '2024-01-18',
        endDate: '2024-01-18',
        description: 'הכשרה מקוונת - 14:00-16:00',
        status: 'scheduled'
      }
    ];

    setTimeout(() => {
      setEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, [employeeId]);

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'vacation':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'sick':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'meeting':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'training':
        return <CheckCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'bg-blue-100 text-blue-800';
      case 'vacation':
        return 'bg-green-100 text-green-800';
      case 'sick':
        return 'bg-red-100 text-red-800';
      case 'meeting':
        return 'bg-purple-100 text-purple-800';
      case 'training':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'scheduled': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    const labels = {
      'scheduled': 'מתוכנן',
      'completed': 'הושלם',
      'cancelled': 'בוטל'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'work': 'עבודה',
      'vacation': 'חופשה',
      'sick': 'מחלה',
      'meeting': 'פגישה',
      'training': 'הכשרה'
    };
    return labels[type as keyof typeof labels] || type;
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">לוח זמנים וזמינות</h2>
        <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>הוסף אירוע</span>
        </button>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">יומן עבודה</h3>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
              היום
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
              השבוע
            </button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded px-3 py-1">
              החודש
            </button>
          </div>
        </div>

        {/* Simple Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date(2024, 0, i + 1);
            const dayEvents = events.filter(event => 
              new Date(event.startDate).toDateString() === date.toDateString()
            );
            return (
              <div key={i} className="p-2 border border-gray-200 min-h-[80px] text-sm">
                <div className="text-gray-900 mb-1">{date.getDate()}</div>
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded mb-1 ${getEventTypeColor(event.type)}`}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">אירועים קרובים</h3>
        
        <div className="space-y-4">
          {events
            .filter(event => new Date(event.startDate) >= new Date())
            .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
            .map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4 space-x-reverse">
                  {getEventTypeIcon(event.type)}
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                      <span>{new Date(event.startDate).toLocaleDateString('he-IL')}</span>
                      {event.startDate !== event.endDate && (
                        <span>עד {new Date(event.endDate).toLocaleDateString('he-IL')}</span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs ${getEventTypeColor(event.type)}`}>
                        {getTypeLabel(event.type)}
                      </span>
                      {getStatusBadge(event.status)}
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {events.filter(event => new Date(event.startDate) >= new Date()).length === 0 && (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">אין אירועים קרובים</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">ימי עבודה החודש</span>
          </div>
          <div className="text-2xl font-bold text-blue-600 mt-2">22</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-900">ימי חופשה שנותרו</span>
          </div>
          <div className="text-2xl font-bold text-green-600 mt-2">15</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">אירועים החודש</span>
          </div>
          <div className="text-2xl font-bold text-purple-600 mt-2">8</div>
        </div>
      </div>
    </div>
  );
} 