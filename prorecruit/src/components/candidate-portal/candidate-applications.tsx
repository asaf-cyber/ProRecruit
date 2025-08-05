'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Building, 
  User, 
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  ChevronRight,
  FileText
} from 'lucide-react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: 'active' | 'completed' | 'rejected' | 'pending';
  appliedDate: string;
  recruiter: string;
  currentStage: string;
  progress: number;
  timeline: TimelineEvent[];
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'submission' | 'interview' | 'feedback' | 'decision';
  completed: boolean;
}

export function CandidateApplications() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - in real app this would come from API
  const applications: Application[] = [
    {
      id: '1',
      jobTitle: 'Fullstack Developer',
      company: 'TechCorp',
      status: 'active',
      appliedDate: '2024-01-10',
      recruiter: 'מיכל גולדברג',
      currentStage: 'ראיון טכני',
      progress: 60,
      timeline: [
        {
          id: '1',
          title: 'הגשת מועמדות',
          description: 'קורות חיים הוגשו למשרת Fullstack Developer',
          date: '2024-01-10',
          type: 'submission',
          completed: true
        },
        {
          id: '2',
          title: 'ראיון ראשוני',
          description: 'ראיון טלפוני עם המגייסת',
          date: '2024-01-12',
          type: 'interview',
          completed: true
        },
        {
          id: '3',
          title: 'ראיון טכני',
          description: 'ראיון טכני עם הצוות',
          date: '2024-01-15',
          type: 'interview',
          completed: false
        },
        {
          id: '4',
          title: 'החלטה סופית',
          description: 'קבלת החלטה על המועמדות',
          date: '2024-01-20',
          type: 'decision',
          completed: false
        }
      ]
    },
    {
      id: '2',
      jobTitle: 'React Developer',
      company: 'StartupXYZ',
      status: 'pending',
      appliedDate: '2024-01-08',
      recruiter: 'דן כהן',
      currentStage: 'בחינת קורות חיים',
      progress: 20,
      timeline: [
        {
          id: '1',
          title: 'הגשת מועמדות',
          description: 'קורות חיים הוגשו למשרת React Developer',
          date: '2024-01-08',
          type: 'submission',
          completed: true
        },
        {
          id: '2',
          title: 'בחינת קורות חיים',
          description: 'בחינת התאמה ראשונית',
          date: '2024-01-10',
          type: 'feedback',
          completed: false
        }
      ]
    },
    {
      id: '3',
      jobTitle: 'UI/UX Designer',
      company: 'DesignStudio',
      status: 'completed',
      appliedDate: '2023-12-15',
      recruiter: 'שרה לוי',
      currentStage: 'התקבל',
      progress: 100,
      timeline: [
        {
          id: '1',
          title: 'הגשת מועמדות',
          description: 'קורות חיים הוגשו למשרת UI/UX Designer',
          date: '2023-12-15',
          type: 'submission',
          completed: true
        },
        {
          id: '2',
          title: 'ראיון ראשוני',
          description: 'ראיון עם המנהל',
          date: '2023-12-18',
          type: 'interview',
          completed: true
        },
        {
          id: '3',
          title: 'מבחן מעשי',
          description: 'עיצוב ממשק משתמש',
          date: '2023-12-20',
          type: 'interview',
          completed: true
        },
        {
          id: '4',
          title: 'התקבל',
          description: 'המועמדות התקבלה בהצלחה',
          date: '2023-12-25',
          type: 'decision',
          completed: true
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'פעיל';
      case 'completed':
        return 'הושלם';
      case 'rejected':
        return 'נדחה';
      case 'pending':
        return 'ממתין';
      default:
        return 'לא ידוע';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">הגשות שלי</h1>
          <p className="text-gray-600">עקב אחר כל המועמדויות שלך</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="חיפוש במשרות או חברות..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל הסטטוסים</option>
            <option value="active">פעיל</option>
            <option value="pending">ממתין</option>
            <option value="completed">הושלם</option>
            <option value="rejected">נדחה</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">רשימת מועמדויות</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <div
                  key={application.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedApplication?.id === application.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                  }`}
                  onClick={() => setSelectedApplication(application)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 space-x-reverse mb-2">
                        <h3 className="font-medium text-gray-900">{application.jobTitle}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {getStatusText(application.status)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Building className="w-4 h-4" />
                          <span>{application.company}</span>
                        </div>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(application.appliedDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <User className="w-4 h-4" />
                          <span>{application.recruiter}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">{application.currentStage}</span>
                          <span className="text-xs text-gray-500">{application.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${application.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline View */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">ציר זמן</h2>
          
          {selectedApplication ? (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900">{selectedApplication.jobTitle}</h3>
                <p className="text-sm text-gray-600">{selectedApplication.company}</p>
              </div>
              
              <div className="space-y-4">
                {selectedApplication.timeline.map((event, index) => (
                  <div key={event.id} className="relative">
                    {/* Timeline line */}
                    {index < selectedApplication.timeline.length - 1 && (
                      <div className="absolute right-4 top-8 w-0.5 h-8 bg-gray-200"></div>
                    )}
                    
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        event.completed 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {event.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(event.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">בחר מועמדות כדי לצפות בציר זמן</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 