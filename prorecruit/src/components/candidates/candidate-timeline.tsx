'use client';

import { useState } from 'react';
import { 
  Plus, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';
import { TimelineEventModal } from './timeline-event-modal';

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

interface CandidateTimelineProps {
  candidateId: string;
}

export function CandidateTimeline({ candidateId }: CandidateTimelineProps) {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [newEvent, setNewEvent] = useState({
    type: 'manual',
    title: '',
    description: ''
  });

  // Mock timeline events
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      type: 'upload',
      title: 'המועמד הועלה למערכת',
      description: 'המועמד הועלה למערכת על ידי שרה כהן',
      timestamp: '2024-01-15T10:30:00',
      user: 'שרה כהן',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'status_change',
      title: 'שינוי סטטוס',
      description: 'הסטטוס שונה מ-Applied ל-Phone Screen',
      timestamp: '2024-01-15T14:20:00',
      user: 'דוד לוי',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: '3',
      type: 'communication',
      title: 'נשלח מייל למועמד',
      description: 'נשלח מייל: "הזמנה לראיון טלפוני"',
      timestamp: '2024-01-16T09:15:00',
      user: 'מיכל ישראלי',
      icon: Mail,
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'interview',
      title: 'ראיון טלפוני',
      description: 'ראיון טלפוני עם דוד כהן - תוצאה: חיובי',
      timestamp: '2024-01-17T11:00:00',
      user: 'יוסי גולדברג',
      icon: Phone,
      color: 'text-orange-600'
    },
    {
      id: '5',
      type: 'feedback',
      title: 'משוב מראיון',
      description: 'משוב חיובי מהראיון הטלפוני - מועמד מתאים להמשך',
      timestamp: '2024-01-17T12:30:00',
      user: 'יוסי גולדברג',
      icon: MessageSquare,
      color: 'text-green-600'
    },
    {
      id: '6',
      type: 'manual',
      title: 'הערה ידנית',
      description: 'המועמד מתעניין מאוד בתפקיד ומתאים לתרבות החברה',
      timestamp: '2024-01-18T08:45:00',
      user: 'שרה כהן',
      icon: User,
      color: 'text-gray-600'
    }
  ];

  const eventTypeOptions = [
    { value: 'manual', label: 'הערה ידנית', icon: User },
    { value: 'communication', label: 'תקשורת', icon: Mail },
    { value: 'interview', label: 'ראיון', icon: Phone },
    { value: 'feedback', label: 'משוב', icon: MessageSquare }
  ];

  const getEventIcon = (event: TimelineEvent) => {
    const Icon = event.icon;
    return <Icon size={20} className={event.color} />;
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.description) {
      // Here you would typically save to backend
      console.log('Adding new event:', newEvent);
      setShowAddEvent(false);
      setNewEvent({ type: 'manual', title: '', description: '' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">ציר זמן</h3>
        <button
          onClick={() => setShowAddEvent(true)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2"
        >
          <Plus size={16} className="ml-2" />
          הוסף אירוע
        </button>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">הוסף אירוע חדש</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">סוג אירוע</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {eventTypeOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">כותרת</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="כותרת האירוע"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">תיאור</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="תיאור מפורט של האירוע"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowAddEvent(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ביטול
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                הוסף
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        {/* Timeline Events */}
        <div className="space-y-6">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="relative flex items-start space-x-4 space-x-reverse">
              {/* Timeline Dot */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-full">
                {getEventIcon(event)}
              </div>
              
              {/* Event Content */}
              <div 
                className="flex-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer transition-shadow"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 hover:text-blue-600">{event.title}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{event.description}</p>
                    <div className="flex items-center space-x-4 space-x-reverse mt-2 text-xs text-gray-500">
                      <span>{new Date(event.timestamp).toLocaleDateString('he-IL')}</span>
                      <span>{new Date(event.timestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
                      <span>על ידי {event.user}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-blue-600 hover:text-blue-800">לחץ לפרטים מלאים →</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button 
                      className="p-1 rounded hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('עריכת אירוע');
                      }}
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      className="p-1 rounded hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirm('האם למחוק את האירוע?');
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {timelineEvents.length === 0 && (
        <div className="text-center py-12">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">אין אירועים עדיין</h3>
          <p className="mt-1 text-sm text-gray-500">הוסף אירוע ראשון כדי להתחיל את ציר הזמן.</p>
        </div>
      )}

      {/* Timeline Event Detail Modal */}
      <TimelineEventModal
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        onEdit={(event) => {
          alert('עריכת אירוע: ' + event.title);
        }}
        onDelete={(eventId) => {
          alert('מחיקת אירוע: ' + eventId);
        }}
      />
    </div>
  );
} 