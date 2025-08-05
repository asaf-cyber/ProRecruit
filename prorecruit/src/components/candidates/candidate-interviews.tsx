'use client';

import { useState } from 'react';
import { 
  Plus, 
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
  MessageSquare,
  Bell
} from 'lucide-react';
import { InterviewDetailsModal } from './interview-details-modal';

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

interface CandidateInterviewsProps {
  candidateId: string;
}

export function CandidateInterviews({ candidateId }: CandidateInterviewsProps) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<InterviewEvent | null>(null);
  const [newInterview, setNewInterview] = useState<{
    title: string;
    type: 'phone' | 'video' | 'onsite';
    date: string;
    time: string;
    duration: string;
    participants: string[];
    location: string;
    notes: string;
    automationEnabled: boolean;
  }>({
    title: '',
    type: 'phone',
    date: '',
    time: '',
    duration: '60',
    participants: [],
    location: '',
    notes: '',
    automationEnabled: true
  });

  // Mock interview events
  const interviews: InterviewEvent[] = [
    {
      id: '1',
      title: 'ראיון טלפוני ראשוני',
      type: 'phone',
      date: '2024-01-20',
      time: '10:00',
      duration: '30',
      participants: ['יוסי גולדברג', 'שרה כהן'],
      status: 'scheduled',
      automationEnabled: true
    },
    {
      id: '2',
      title: 'ראיון טכני',
      type: 'video',
      date: '2024-01-22',
      time: '14:00',
      duration: '60',
      participants: ['דוד לוי', 'מיכל ישראלי'],
      status: 'scheduled',
      automationEnabled: true
    },
    {
      id: '3',
      title: 'ראיון טלפוני ראשוני',
      type: 'phone',
      date: '2024-01-18',
      time: '11:00',
      duration: '30',
      participants: ['יוסי גולדברג'],
      status: 'completed',
      automationEnabled: true,
      notes: 'ראיון עבר בהצלחה, המועמד מתאים להמשך'
    }
  ];

  const participantOptions = [
    'יוסי גולדברג',
    'שרה כהן',
    'דוד לוי',
    'מיכל ישראלי',
    'רונית שפירא'
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      scheduled: { label: 'מתוכנן', color: 'bg-blue-100 text-blue-800', icon: Clock },
      completed: { label: 'הושלם', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { label: 'בוטל', color: 'bg-red-100 text-red-800', icon: XCircle }
    };
    
    const statusConfig = config[status as keyof typeof config];
    const Icon = statusConfig.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
        <Icon size={12} className="ml-1" />
        {statusConfig.label}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return <Phone size={16} className="text-blue-600" />;
      case 'video':
        return <Video size={16} className="text-purple-600" />;
      case 'onsite':
        return <MapPin size={16} className="text-green-600" />;
      default:
        return <Calendar size={16} className="text-gray-600" />;
    }
  };

  const handleScheduleInterview = () => {
    if (newInterview.title && newInterview.date && newInterview.time) {
      // Here you would typically save to backend and trigger automation
      console.log('Scheduling interview:', newInterview);
      setShowScheduleModal(false);
      setNewInterview({
        title: '',
        type: 'phone' as 'phone' | 'video' | 'onsite',
        date: '',
        time: '',
        duration: '60',
        participants: [],
        location: '',
        notes: '',
        automationEnabled: true
      });
    }
  };

  const toggleParticipant = (participant: string) => {
    setNewInterview(prev => ({
      ...prev,
      participants: prev.participants.includes(participant)
        ? prev.participants.filter(p => p !== participant)
        : [...prev.participants, participant]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">ראיונות ואירועים</h3>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2"
        >
          <Plus size={16} className="ml-2" />
          קבע ראיון
        </button>
      </div>

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">קבע ראיון חדש</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">כותרת האירוע</label>
                <input
                  type="text"
                  value={newInterview.title}
                  onChange={(e) => setNewInterview({ ...newInterview, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="למשל: ראיון טלפוני - דוד כהן"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">סוג אירוע</label>
                  <select
                    value={newInterview.type}
                    onChange={(e) => setNewInterview({ ...newInterview, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="phone">ראיון טלפוני</option>
                    <option value="video">ראיון וידאו</option>
                    <option value="onsite">פגישה במשרד</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">משך (דקות)</label>
                  <select
                    value={newInterview.duration}
                    onChange={(e) => setNewInterview({ ...newInterview, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="30">30 דקות</option>
                    <option value="60">60 דקות</option>
                    <option value="90">90 דקות</option>
                    <option value="120">120 דקות</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">תאריך</label>
                  <input
                    type="date"
                    value={newInterview.date}
                    onChange={(e) => setNewInterview({ ...newInterview, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">שעה</label>
                  <input
                    type="time"
                    value={newInterview.time}
                    onChange={(e) => setNewInterview({ ...newInterview, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {newInterview.type === 'onsite' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">מיקום</label>
                  <input
                    type="text"
                    value={newInterview.location}
                    onChange={(e) => setNewInterview({ ...newInterview, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="כתובת או חדר"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">משתתפים</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {participantOptions.map((participant) => (
                    <label key={participant} className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={newInterview.participants.includes(participant)}
                        onChange={() => toggleParticipant(participant)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{participant}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">הערות</label>
                <textarea
                  value={newInterview.notes}
                  onChange={(e) => setNewInterview({ ...newInterview, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="הערות פנימיות לאירוע..."
                />
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <input
                  type="checkbox"
                  id="automation"
                  checked={newInterview.automationEnabled}
                  onChange={(e) => setNewInterview({ ...newInterview, automationEnabled: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="automation" className="text-sm text-gray-700">
                  הפעל אוטומציה (תזכורות WhatsApp, הודעות אוטומטיות)
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ביטול
              </button>
              <button
                onClick={handleScheduleInterview}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                קבע ראיון
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interviews List */}
      <div className="space-y-4">
        {interviews.map((interview) => (
          <div 
            key={interview.id} 
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
            onClick={() => setSelectedInterview(interview)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                  {getTypeIcon(interview.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 space-x-reverse mb-2">
                    <h4 className="font-medium text-gray-900 hover:text-blue-600">{interview.title}</h4>
                    {getStatusBadge(interview.status)}
                    {interview.automationEnabled && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        <Bell size={12} className="ml-1" />
                        אוטומציה
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Calendar size={14} className="ml-1" />
                      {new Date(interview.date).toLocaleDateString('he-IL')}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="ml-1" />
                      {interview.time} ({interview.duration} דקות)
                    </div>
                    {interview.location && (
                      <div className="flex items-center">
                        <MapPin size={14} className="ml-1" />
                        {interview.location}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Users size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{interview.participants.join(', ')}</span>
                  </div>
                  
                  {interview.notes && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                      {interview.notes}
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <span className="text-xs text-blue-600 hover:text-blue-800">לחץ לפרטים מלאים →</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <button 
                  className="p-1 rounded hover:bg-gray-100" 
                  title="ערוך"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('עריכת ראיון');
                  }}
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="p-1 rounded hover:bg-gray-100" 
                  title="מחק"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirm('האם למחוק את הראיון?');
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {interviews.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">אין ראיונות מתוכננים</h3>
          <p className="mt-1 text-sm text-gray-500">קבע ראיון ראשון כדי להתחיל.</p>
        </div>
      )}

      {/* Automation Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3 space-x-reverse">
          <Bell size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">אוטומציה פעילה</h4>
            <p className="text-sm text-blue-700 mt-1">
              המערכת תשלח אוטומטית תזכורות WhatsApp למועמד ותזכורות פנימיות למגייסים.
              התהליך כולל: אישור מיידי, תזכורת יום לפני, תזכורת בוקר הראיון, ומעקב שעתיים אחרי.
            </p>
          </div>
        </div>
      </div>

      {/* Interview Details Modal */}
      <InterviewDetailsModal
        isOpen={selectedInterview !== null}
        onClose={() => setSelectedInterview(null)}
        interview={selectedInterview}
        onEdit={(interview) => {
          alert('עריכת ראיון: ' + interview.title);
        }}
        onDelete={(interviewId) => {
          alert('מחיקת ראיון: ' + interviewId);
        }}
        onReschedule={(interview) => {
          alert('קביעה מחדש של ראיון: ' + interview.title);
        }}
      />
    </div>
  );
} 