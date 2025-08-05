'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  User,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Send,
  Upload,
  MessageSquare,
  FileText,
  Shield,
  Building,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface ClearanceCandidateProfileProps {
  candidateId: string;
}

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'in_progress' | 'failed';
  type: 'form_sent' | 'form_submitted' | 'submitted_to_mod' | 'interview_scheduled' | 'interview_completed' | 'approved' | 'qso_briefing' | 'completed';
}

// Mock data for candidate profile
const mockCandidate = {
  id: '1',
  name: 'יוסי כהן',
  email: 'yossi@example.com',
  phone: '050-1234567',
  job: 'מפתח Full-Stack',
  department: 'פיתוח',
  manager: 'דוד כהן',
  status: 'pending_forms',
  startDate: '2024-01-15',
  targetDate: '2024-02-15',
  daysRemaining: 5,
  priority: 'high',
  clearanceLevel: 'גבוה',
  client: 'חברת טכנולוגיה מתקדמת',
  location: 'תל אביב'
};

// Mock timeline data
const mockTimeline: TimelineEvent[] = [
  {
    id: '1',
    date: '2024-01-15',
    title: 'התחלת תהליך סיווג',
    description: 'המועמד נוסף לתהליך סיווג ביטחוני',
    status: 'completed',
    type: 'form_sent'
  },
  {
    id: '2',
    date: '2024-01-16',
    title: 'טפסים נשלחו למועמד',
    description: 'טופס סיווג ביטחוני נשלח למייל ו-WhatsApp',
    status: 'completed',
    type: 'form_sent'
  },
  {
    id: '3',
    date: '2024-01-18',
    title: 'טפסים הוגשו',
    description: 'המועמד השלים את מילוי הטפסים',
    status: 'completed',
    type: 'form_submitted'
  },
  {
    id: '4',
    date: '2024-01-20',
    title: 'הוגש למשרד הביטחון',
    description: 'הטפסים הוגשו למשרד הביטחון לתהליכי בדיקה',
    status: 'in_progress',
    type: 'submitted_to_mod'
  },
  {
    id: '5',
    date: '2024-02-01',
    title: 'תחקיר מתוזמן',
    description: 'תחקיר ביטחוני מתוזמן ל-15 בפברואר 2024',
    status: 'pending',
    type: 'interview_scheduled'
  }
];

export function ClearanceCandidateProfile({ candidateId }: ClearanceCandidateProfileProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('timeline');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending_forms: { label: 'ממתין לטפסים', color: 'bg-yellow-100 text-yellow-800' },
      forms_submitted: { label: 'טפסים הוגשו', color: 'bg-blue-100 text-blue-800' },
      submitted_to_mod: { label: 'הוגש למשרד הביטחון', color: 'bg-purple-100 text-purple-800' },
      interview_scheduled: { label: 'תחקיר מתוזמן', color: 'bg-indigo-100 text-indigo-800' },
      interview_completed: { label: 'תחקיר הושלם', color: 'bg-orange-100 text-orange-800' },
      approved: { label: 'אושר', color: 'bg-green-100 text-green-800' },
      qso_briefing: { label: 'תדרוך קב"ט', color: 'bg-teal-100 text-teal-800' },
      completed: { label: 'הושלם', color: 'bg-gray-100 text-gray-800' },
      rejected: { label: 'נדחה', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending_forms;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'form_sent':
        return <Send size={16} className="text-blue-500" />;
      case 'form_submitted':
        return <FileText size={16} className="text-green-500" />;
      case 'submitted_to_mod':
        return <Building size={16} className="text-purple-500" />;
      case 'interview_scheduled':
        return <Calendar size={16} className="text-indigo-500" />;
      case 'interview_completed':
        return <CheckCircle size={16} className="text-orange-500" />;
      case 'approved':
        return <Shield size={16} className="text-green-500" />;
      case 'qso_briefing':
        return <User size={16} className="text-teal-500" />;
      case 'completed':
        return <CheckCircle size={16} className="text-gray-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getTimelineStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'in_progress':
        return 'border-blue-500 bg-blue-50';
      case 'pending':
        return 'border-yellow-500 bg-yellow-50';
      case 'failed':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const handleSendForms = () => {
    console.log('Sending forms to candidate:', candidateId);
  };

  const handleSubmitToMod = () => {
    console.log('Submitting to Ministry of Defense:', candidateId);
  };

  const handleScheduleInterview = () => {
    console.log('Scheduling interview for candidate:', candidateId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{mockCandidate.name}</h1>
            <p className="text-gray-600">סיווג ביטחוני - {mockCandidate.job}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          {getStatusBadge(mockCandidate.status)}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ימים נותרים</p>
              <p className={`text-2xl font-bold mt-1 ${mockCandidate.daysRemaining <= 3 ? 'text-red-600' : 'text-gray-900'}`}>
                {mockCandidate.daysRemaining}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">דרגת ביטחון</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockCandidate.clearanceLevel}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">מנהל אחראי</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockCandidate.manager}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <User className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">לקוח</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{mockCandidate.client}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Building className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Info */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">פרטי מועמד</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Mail size={16} className="text-gray-400" />
              <span className="text-gray-900">{mockCandidate.email}</span>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <Phone size={16} className="text-gray-400" />
              <span className="text-gray-900">{mockCandidate.phone}</span>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <MapPin size={16} className="text-gray-400" />
              <span className="text-gray-900">{mockCandidate.location}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Briefcase size={16} className="text-gray-400" />
              <span className="text-gray-900">{mockCandidate.job}</span>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <Building size={16} className="text-gray-400" />
              <span className="text-gray-900">{mockCandidate.department}</span>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-gray-900">התחלה: {mockCandidate.startDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">פעולות מהירות</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSendForms}
            className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send size={16} />
            <span>שלח טפסים</span>
          </button>
          <button
            onClick={handleSubmitToMod}
            className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Building size={16} />
            <span>הגש למשרד הביטחון</span>
          </button>
          <button
            onClick={handleScheduleInterview}
            className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Calendar size={16} />
            <span>תזמן תחקיר</span>
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload size={16} />
            <span>העלה מסמכים</span>
          </button>
          <button
            onClick={() => setShowNoteModal(true)}
            className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <MessageSquare size={16} />
            <span>הוסף הערה</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 space-x-reverse px-6">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'timeline'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ציר זמן
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'documents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              מסמכים
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              הערות
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">ציר זמן תהליך הסיווג</h3>
              <div className="space-y-4">
                {mockTimeline.map((event, index) => (
                  <div key={event.id} className="flex items-start space-x-4 space-x-reverse">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${getTimelineStatusColor(event.status)}`}>
                      {getTimelineIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                        <span className="text-sm text-gray-500">{event.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">מסמכים</h3>
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">אין מסמכים להצגה</p>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">הערות</h3>
              <div className="text-center py-12">
                <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">אין הערות להצגה</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 