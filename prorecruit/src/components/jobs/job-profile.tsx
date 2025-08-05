'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Edit,
  MoreHorizontal,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Calendar,
  Shield,
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Plus,
  Eye,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';

interface JobProfileProps {
  jobId: string;
}

export function JobProfile({ jobId }: JobProfileProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  // Mock job data
  const job = {
    id: jobId,
    title: 'מפתח/ת Full Stack',
    status: 'published' as const,
    client: 'Microsoft ישראל',
    department: 'tech',
    location: 'תל אביב',
    hiringManager: 'שרה כהן',
    candidatesInProcess: 12,
    daysToHire: 15,
    salaryRange: '₪25,000 - ₪35,000',
    createdAt: '2024-01-10',
    lastActivity: '2024-01-15',
    description: 'אנחנו מחפשים מפתח/ת Full Stack מנוסה/ה שישתלב/תבת בצוות הפיתוח שלנו. התפקיד כולל פיתוח אפליקציות web מתקדמות, עבודה עם טכנולוגיות חדשניות ושיתוף פעולה עם צוותים שונים בארגון.',
    requirements: '• ניסיון של 3+ שנים בפיתוח Full Stack\n• ידע ב-React, Node.js, TypeScript\n• ניסיון עם מסדי נתונים SQL ו-NoSQL\n• יכולת עבודה בצוות ויכולות תקשורת טובות\n• ידע באנגלית ברמה גבוהה',
    securityLevel: 'medium',
    tags: ['Senior', 'דחוף', 'טכנולוגיות חדשניות'],
    publishDate: '2024-01-12',
    closeDate: '2024-02-12'
  };

  const candidates = [
    {
      id: '1',
      name: 'יוסי כהן',
      status: 'בתהליך',
      lastActivity: '2024-01-14',
      source: 'LinkedIn',
      email: 'yossi@example.com',
      phone: '050-1234567'
    },
    {
      id: '2',
      name: 'מיכל לוי',
      status: 'ראיון ראשון',
      lastActivity: '2024-01-13',
      source: 'דף הבית',
      email: 'michal@example.com',
      phone: '050-2345678'
    },
    {
      id: '3',
      name: 'דוד ישראלי',
      status: 'ממתין לתשובה',
      lastActivity: '2024-01-12',
      source: 'המלצה',
      email: 'david@example.com',
      phone: '050-3456789'
    }
  ];

  const timeline = [
    {
      id: '1',
      date: '2024-01-15',
      time: '14:30',
      event: 'מועמד חדש שויך למשרה',
      description: 'יוסי כהן הועבר למשרה זו',
      type: 'candidate'
    },
    {
      id: '2',
      date: '2024-01-14',
      time: '10:15',
      event: 'ראיון ראשון נערך',
      description: 'ראיון עם מיכל לוי',
      type: 'interview'
    },
    {
      id: '3',
      date: '2024-01-12',
      time: '09:00',
      event: 'משרה פורסמה',
      description: 'המשרה פורסמה באתר החברה',
      type: 'published'
    },
    {
      id: '4',
      date: '2024-01-10',
      time: '16:45',
      event: 'משרה נוצרה',
      description: 'שרה כהן יצרה את המשרה',
      type: 'created'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'טיוטה', color: 'bg-gray-100 text-gray-800', icon: FileText },
      published: { label: 'מפורסם', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      in_progress: { label: 'בתהליך גיוס', color: 'bg-purple-100 text-purple-800', icon: Users },
      closed: { label: 'סגור', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { label: 'בוטל', color: 'bg-red-100 text-red-800', icon: XCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon size={12} className="ml-1" />
        {config.label}
      </span>
    );
  };

  const getDepartmentBadge = (department: string) => {
    const departmentConfig = {
      tech: { label: 'טכנולוגיה', color: 'bg-blue-100 text-blue-800' },
      finance: { label: 'פיננסים', color: 'bg-green-100 text-green-800' },
      hr: { label: 'משאבי אנוש', color: 'bg-purple-100 text-purple-800' },
      marketing: { label: 'שיווק', color: 'bg-pink-100 text-pink-800' },
      sales: { label: 'מכירות', color: 'bg-orange-100 text-orange-800' },
      operations: { label: 'פעילות', color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = departmentConfig[department as keyof typeof departmentConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getTimelineIcon = (type: string) => {
    const iconConfig = {
      candidate: Users,
      interview: MessageSquare,
      published: CheckCircle,
      created: FileText
    };
    
    const Icon = iconConfig[type as keyof typeof iconConfig];
    return <Icon size={16} />;
  };

  const tabs = [
    { id: 'details', label: 'פרטים', icon: Briefcase },
    { id: 'candidates', label: 'מועמדים', icon: Users },
    { id: 'timeline', label: 'ציר זמן', icon: Clock }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <div className="flex items-center space-x-4 space-x-reverse mt-2">
              {getStatusBadge(job.status)}
              {getDepartmentBadge(job.department)}
              <span className="text-sm text-gray-500">#{job.id}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="relative">
            <button
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <MoreHorizontal size={20} />
            </button>
            
            {showActionsMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Edit size={16} className="ml-3" />
                    ערוך משרה
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Users size={16} className="ml-3" />
                    שייך מועמדים
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Eye size={16} className="ml-3" />
                    תצוגה מקדימה
                  </button>
                  <hr className="my-1" />
                  <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <XCircle size={16} className="ml-3" />
                    סגור משרה
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2">
            <Edit size={16} className="ml-2" />
            ערוך
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">מועמדים בתהליך</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{job.candidatesInProcess}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ימים לגיוס</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{job.daysToHire}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">לקוח</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">{job.client}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">מנהל מגייס</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">{job.hiringManager}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 space-x-reverse px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} className="ml-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">פרטי משרה</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin size={16} className="text-gray-400 ml-3" />
                      <span className="text-gray-900">{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign size={16} className="text-gray-400 ml-3" />
                      <span className="text-gray-900">{job.salaryRange}</span>
                    </div>
                    <div className="flex items-center">
                      <Shield size={16} className="text-gray-400 ml-3" />
                      <span className="text-gray-900">דרגת ביטחון: {job.securityLevel}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 ml-3" />
                      <span className="text-gray-900">נוצר: {job.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">תגים</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">תיאור משרה</h3>
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">דרישות</h3>
                <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
              </div>
            </div>
          )}

          {/* Candidates Tab */}
          {activeTab === 'candidates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">מועמדים ({candidates.length})</h3>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-3">
                  <Plus size={16} className="ml-2" />
                  שייך מועמד
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        מועמד
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        סטטוס
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        מקור
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        פעילות אחרונה
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        פעולות
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {candidates.map((candidate) => (
                      <tr key={candidate.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-sm text-gray-500">{candidate.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {candidate.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {candidate.source}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {candidate.lastActivity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye size={16} />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Phone size={16} />
                            </button>
                            <button className="text-purple-600 hover:text-purple-900">
                              <Mail size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">ציר זמן</h3>
              
              <div className="flow-root">
                <ul className="-mb-8">
                  {timeline.map((event, eventIdx) => (
                    <li key={event.id}>
                      <div className="relative pb-8">
                        {eventIdx !== timeline.length - 1 ? (
                          <span
                            className="absolute top-4 right-4 -mr-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3 space-x-reverse">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                              <div className="text-white">
                                {getTimelineIcon(event.type)}
                              </div>
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4 space-x-reverse">
                            <div>
                              <p className="text-sm text-gray-500">
                                {event.event} <span className="font-medium text-gray-900">{event.description}</span>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={event.date}>{event.date}</time>
                              <br />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 