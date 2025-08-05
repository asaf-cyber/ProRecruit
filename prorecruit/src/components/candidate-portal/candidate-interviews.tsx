'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MapPin, 
  User, 
  Plus,
  ExternalLink,
  Star,
  MessageSquare,
  Download,
  CheckCircle,
  AlertCircle,
  Building
} from 'lucide-react';

interface Interview {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
  time: string;
  duration: string;
  type: 'video' | 'phone' | 'onsite';
  interviewer: string;
  position: string;
  location: string;
  meetingLink?: string;
  notes: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  feedback?: InterviewFeedback;
}

interface InterviewFeedback {
  id: string;
  rating: number;
  comments: string;
  submitted: boolean;
  questions: FeedbackQuestion[];
}

interface FeedbackQuestion {
  id: string;
  question: string;
  answer: string;
  type: 'rating' | 'text' | 'multiple_choice';
}

export function CandidateInterviews() {
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  // Mock data - in real app this would come from API
  const interviews: Interview[] = [
    {
      id: '1',
      jobTitle: 'Fullstack Developer',
      company: 'TechCorp',
      date: '2024-01-15',
      time: '14:00',
      duration: '60 דקות',
      type: 'video',
      interviewer: 'שרה לוי',
      position: 'מנהלת פיתוח',
      location: 'Zoom Meeting',
      meetingLink: 'https://zoom.us/j/123456789',
      notes: 'הכנה: שאלות על React, Node.js, ומסדי נתונים. יש להכין סביבת פיתוח.',
      status: 'scheduled'
    },
    {
      id: '2',
      jobTitle: 'React Developer',
      company: 'StartupXYZ',
      date: '2024-01-18',
      time: '10:00',
      duration: '45 דקות',
      type: 'phone',
      interviewer: 'דן כהן',
      position: 'מנהל טכני',
      location: 'שיחת טלפון',
      notes: 'שיחה על ניסיון בפיתוח React ופרויקטים קודמים.',
      status: 'scheduled'
    },
    {
      id: '3',
      jobTitle: 'UI/UX Designer',
      company: 'DesignStudio',
      date: '2023-12-20',
      time: '15:30',
      duration: '90 דקות',
      type: 'onsite',
      interviewer: 'מיכל גולדברג',
      position: 'מנהלת עיצוב',
      location: 'משרדי החברה, תל אביב',
      notes: 'מבחן מעשי בעיצוב ממשק משתמש. יש להביא מחשב נייד.',
      status: 'completed',
      feedback: {
        id: '1',
        rating: 4,
        comments: 'הראיון היה מקצועי מאוד. המראיינת הייתה ידידותית והשאלות היו רלוונטיות.',
        submitted: true,
        questions: [
          {
            id: '1',
            question: 'איך היית מדרג את חווית הראיון?',
            answer: '4',
            type: 'rating'
          },
          {
            id: '2',
            question: 'האם הראיון ענה על הציפיות שלך?',
            answer: 'כן, הראיון היה מקצועי ומקיף',
            type: 'text'
          }
        ]
      }
    }
  ];

  const upcomingInterviews = interviews.filter(i => i.status === 'scheduled');
  const completedInterviews = interviews.filter(i => i.status === 'completed');

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      case 'onsite':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getInterviewTypeText = (type: string) => {
    switch (type) {
      case 'video':
        return 'ראיון וידאו';
      case 'phone':
        return 'ראיון טלפוני';
      case 'onsite':
        return 'ראיון במשרד';
      default:
        return 'ראיון';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const addToCalendar = (interview: Interview) => {
    // In real app, this would integrate with Google Calendar, Outlook, etc.
    const event = {
      title: `ראיון - ${interview.jobTitle} ב${interview.company}`,
      start: new Date(`${interview.date}T${interview.time}`),
      end: new Date(`${interview.date}T${interview.time}`),
      location: interview.location,
      description: interview.notes
    };
    
    // Create calendar event URL
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${event.end.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(calendarUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ראיונות</h1>
          <p className="text-gray-600">ניהול לוח זמנים ומעקב אחר ראיונות</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 space-x-reverse">
          <Plus className="w-4 h-4" />
          <span>הוסף ליומן</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 space-x-reverse">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ראיונות קרובים ({upcomingInterviews.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'completed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ראיונות שהושלמו ({completedInterviews.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'upcoming' ? (
            <div className="space-y-4">
              {upcomingInterviews.length > 0 ? (
                upcomingInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 space-x-reverse mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{interview.jobTitle}</h3>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {getInterviewTypeText(interview.type)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                              <Building className="w-4 h-4" />
                              <span>{interview.company}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(interview.date)}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{interview.time} ({interview.duration})</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                              <User className="w-4 h-4" />
                              <span>{interview.interviewer} - {interview.position}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{interview.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        {interview.notes && (
                          <div className="bg-gray-50 p-3 rounded-lg mb-4">
                            <p className="text-sm text-gray-700">{interview.notes}</p>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          {interview.meetingLink && (
                            <a
                              href={interview.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 space-x-reverse bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              <Video className="w-4 h-4" />
                              <span>הצטרף לראיון</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          <button
                            onClick={() => addToCalendar(interview)}
                            className="inline-flex items-center space-x-2 space-x-reverse border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                          >
                            <Calendar className="w-4 h-4" />
                            <span>הוסף ליומן</span>
                          </button>
                          <button
                            onClick={() => setSelectedInterview(interview)}
                            className="inline-flex items-center space-x-2 space-x-reverse border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>פרטים נוספים</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">אין ראיונות קרובים</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {completedInterviews.length > 0 ? (
                completedInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 space-x-reverse mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{interview.jobTitle}</h3>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            הושלם
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                              <Building className="w-4 h-4" />
                              <span>{interview.company}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(interview.date)}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                              <User className="w-4 h-4" />
                              <span>{interview.interviewer}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {interview.feedback && (
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm text-gray-600">
                                  דירוג: {interview.feedback.rating}/5
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {interview.feedback?.submitted ? (
                            <span className="inline-flex items-center space-x-2 space-x-reverse text-green-600 text-sm">
                              <CheckCircle className="w-4 h-4" />
                              <span>משוב נשלח</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedInterview(interview);
                                setShowFeedbackModal(true);
                              }}
                              className="inline-flex items-center space-x-2 space-x-reverse bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span>שלח משוב</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">אין ראיונות שהושלמו</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">משוב על הראיון</h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedInterview.jobTitle} - {selectedInterview.company}
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  דירוג כללי
                </label>
                <div className="flex space-x-2 space-x-reverse">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="text-2xl text-yellow-400 hover:text-yellow-500"
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  הערות
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="שתף את החוויה שלך מהראיון..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={() => {
                  // Handle feedback submission
                  setShowFeedbackModal(false);
                }}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                שלח משוב
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 