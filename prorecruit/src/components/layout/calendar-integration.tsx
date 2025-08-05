'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Video,
  Mail,
  Phone,
  MoreVertical,
  Settings,
  Link
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  date: string;
  type: 'interview' | 'meeting' | 'reminder' | 'other';
  participants: string[];
  location?: string;
  meetingLink?: string;
  isOnline: boolean;
  candidateName?: string;
  recruiterName?: string;
}

interface CalendarProvider {
  id: string;
  name: string;
  email: string;
  type: 'gmail' | 'outlook';
  isConnected: boolean;
  lastSync?: string;
}

export function CalendarIntegration() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [isLoading, setIsLoading] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const [providers, setProviders] = useState<CalendarProvider[]>([
    {
      id: '1',
      name: 'חשבון Gmail עבודה',
      email: 'asaf@prorecruitment.com',
      type: 'gmail',
      isConnected: true,
      lastSync: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Outlook Corporate',
      email: 'asaf@company.com',
      type: 'outlook',
      isConnected: false
    }
  ]);

  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'ראיון עם דוד כהן - Full Stack Developer',
      description: 'ראיון טכני למשרת מפתח Full Stack',
      startTime: '10:00',
      endTime: '11:00',
      date: '2024-01-15',
      type: 'interview',
      participants: ['דוד כהן', 'אסף מנהל', 'שרה כהן'],
      location: 'משרדי החברה - חדר ישיבות A',
      isOnline: false,
      candidateName: 'דוד כהן',
      recruiterName: 'שרה כהן'
    },
    {
      id: '2',
      title: 'ראיון וידאו - מיכל ישראלי',
      description: 'ראיון ראשוני עם מפתחת Frontend',
      startTime: '14:00',
      endTime: '14:45',
      date: '2024-01-15',
      type: 'interview',
      participants: ['מיכל ישראלי', 'אסף מנהל'],
      meetingLink: 'https://zoom.us/j/123456789',
      isOnline: true,
      candidateName: 'מיכל ישראלי',
      recruiterName: 'אסף מנהל'
    },
    {
      id: '3',
      title: 'פגישת צוות גיוס שבועית',
      description: 'סקירת מועמדים והתקדמות תהליכי גיוס',
      startTime: '09:00',
      endTime: '10:00',
      date: '2024-01-16',
      type: 'meeting',
      participants: ['אסף מנהל', 'שרה כהן', 'דוד לוי', 'מיכל ישראלי'],
      location: 'חדר ישיבות ראשי',
      isOnline: false
    },
    {
      id: '4',
      title: 'תזכורת: משוב לרונית שפירא',
      description: 'שליחת משוב על הראיון מאתמול',
      startTime: '11:30',
      endTime: '12:00',
      date: '2024-01-16', 
      type: 'reminder',
      participants: ['אסף מנהל'],
      isOnline: false
    }
  ];

  const connectProvider = async (providerId: string) => {
    setIsLoading(true);
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProviders(prev => prev.map(p => 
        p.id === providerId 
          ? { ...p, isConnected: true, lastSync: new Date().toISOString() }
          : p
      ));
    } catch (error) {
      console.error('Failed to connect provider:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const syncCalendar = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Update last sync time for connected providers
      setProviders(prev => prev.map(p => 
        p.isConnected 
          ? { ...p, lastSync: new Date().toISOString() }
          : p
      ));
    } catch (error) {
      console.error('Failed to sync calendar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'interview':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800';
      case 'meeting':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800';
      case 'reminder':
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Users size={12} />;
      case 'meeting':
        return <Calendar size={12} />;
      case 'reminder':
        return <Clock size={12} />;
      default:
        return <Calendar size={12} />;
    }
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getTodayEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return mockEvents.filter(event => event.date === today);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    return mockEvents.filter(event => 
      event.date >= tomorrowStr
    ).slice(0, 5);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-purple-600 ml-2" />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">יומן ופגישות</h3>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={syncCalendar}
              disabled={isLoading}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded transition-colors"
              title="סנכרון יומן"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={() => setShowEventModal(true)}
              className="p-1 text-purple-600 hover:text-purple-700 rounded transition-colors"
              title="הוסף אירוע"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Calendar Providers Status */}
        <div className="space-y-2">
          {providers.map((provider) => (
            <div key={provider.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  provider.isConnected ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <span className="text-gray-600 dark:text-gray-400 truncate">
                  {provider.name}
                </span>
              </div>
              {!provider.isConnected ? (
                <button
                  onClick={() => connectProvider(provider.id)}
                  disabled={isLoading}
                  className="text-purple-600 hover:text-purple-700 disabled:text-purple-400"
                >
                  חבר
                </button>
              ) : (
                <span className="text-green-600 dark:text-green-400">
                  מחובר
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Today's Events */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">היום</h4>
        <div className="space-y-2">
          {getTodayEvents().length > 0 ? (
            getTodayEvents().map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow ${getEventTypeColor(event.type)}`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      {getEventTypeIcon(event.type)}
                      <span className="text-sm font-medium mr-2">{event.title}</span>
                    </div>
                    <div className="flex items-center text-xs opacity-75">
                      <Clock size={10} className="mr-1" />
                      <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                      {event.isOnline && (
                        <>
                          <Video size={10} className="mr-1 ml-2" />
                          <span>וידאו</span>
                        </>
                      )}
                    </div>
                  </div>
                  {event.isOnline && event.meetingLink && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(event.meetingLink, '_blank');
                      }}
                      className="p-1 hover:bg-white/20 rounded"
                      title="הצטרף לפגישה"
                    >
                      <ExternalLink size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <Calendar size={24} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">אין אירועים היום</p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="flex-1 overflow-y-auto p-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">אירועים קרובים</h4>
        <div className="space-y-3">
          {getUpcomingEvents().map((event) => (
            <div
              key={event.id}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                      {getEventTypeIcon(event.type)}
                      <span className="mr-1">
                        {event.type === 'interview' ? 'ראיון' : 
                         event.type === 'meeting' ? 'פגישה' : 
                         event.type === 'reminder' ? 'תזכורת' : 'אחר'}
                      </span>
                    </span>
                  </div>
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {event.title}
                  </h5>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3 space-x-reverse">
                    <div className="flex items-center">
                      <Calendar size={10} className="mr-1" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={10} className="mr-1" />
                      <span>{formatTime(event.startTime)}</span>
                    </div>
                    {event.candidateName && (
                      <div className="flex items-center">
                        <Users size={10} className="mr-1" />
                        <span>{event.candidateName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {event.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {event.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => window.open('https://calendar.google.com', '_blank')}
            className="flex items-center justify-center p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-xs"
          >
            <ExternalLink size={12} className="mr-1" />
            Gmail Calendar
          </button>
          <button
            onClick={() => window.open('https://outlook.office.com/calendar', '_blank')}
            className="flex items-center justify-center p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-xs"
          >
            <ExternalLink size={12} className="mr-1" />
            Outlook
          </button>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedEvent.title}
                </h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <MoreVertical size={16} className="text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={14} className="mr-2" />
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock size={14} className="mr-2" />
                  <span>{formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}</span>
                </div>
                
                {selectedEvent.location && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin size={14} className="mr-2" />
                    <span>{selectedEvent.location}</span>
                  </div>
                )}
                
                {selectedEvent.participants.length > 0 && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users size={14} className="mr-2" />
                    <span>{selectedEvent.participants.join(', ')}</span>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>{selectedEvent.description}</p>
                  </div>
                )}
              </div>
              
              {selectedEvent.meetingLink && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => window.open(selectedEvent.meetingLink, '_blank')}
                    className="w-full flex items-center justify-center p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Video size={16} className="mr-2" />
                    הצטרף לפגישה
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}