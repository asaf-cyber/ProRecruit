'use client';

import { 
  Calendar, 
  Clock, 
  Video, 
  Phone, 
  MapPin, 
  User, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock as ClockIcon
} from 'lucide-react';

export function CandidateDashboard() {
  // Mock data - in real app this would come from API
  const currentStatus = {
    jobTitle: 'Fullstack Developer',
    company: 'TechCorp',
    stage: 'ראיון ראשון',
    progress: 60,
    nextStep: 'ראיון טכני עם הצוות'
  };

  const upcomingInterview = {
    date: '2024-01-15',
    time: '14:00',
    type: 'ראיון טכני',
    interviewer: 'שרה לוי',
    position: 'מנהלת פיתוח',
    location: 'Zoom Meeting',
    meetingLink: 'https://zoom.us/j/123456789',
    notes: 'הכנה: שאלות על React, Node.js, ומסדי נתונים'
  };

  const recruiter = {
    name: 'מיכל גולדברג',
    title: 'מגייסת בכירה',
    email: 'michal@prorecruit.co.il',
    phone: '050-1234567',
    avatar: '/api/placeholder/60/60',
    message: 'שלום דוד! שמחתי על הראיון הראשוני. הצוות התרשם מאוד מהכישורים שלך. הראיון הטכני הבא יתקיים ביום שלישי. בהצלחה!'
  };

  const recentActivities = [
    {
      id: 1,
      type: 'interview_scheduled',
      title: 'ראיון טכני נקבע',
      description: 'ראיון טכני למשרת Fullstack Developer נקבע ליום שלישי, 15 בינואר',
      time: 'לפני 2 שעות',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'document_uploaded',
      title: 'קורות חיים עודכנו',
      description: 'קובץ קורות חיים חדש הועלה למערכת',
      time: 'לפני יום',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'status_updated',
      title: 'סטטוס עודכן',
      description: 'המועמדות התקדמה לשלב הראיון הטכני',
      time: 'לפני 3 ימים',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">דשבורד אישי</h1>
          <p className="text-gray-600">עקב אחר התקדמות המועמדות שלך</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Status Card */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">סטטוס נוכחי</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              פעיל
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-900">{currentStatus.jobTitle}</h3>
              <p className="text-gray-600">{currentStatus.company}</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">שלב נוכחי: {currentStatus.stage}</span>
                <span className="text-sm text-gray-500">{currentStatus.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentStatus.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3 space-x-reverse">
                <ClockIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">הבא בתור:</p>
                  <p className="text-sm text-blue-700">{currentStatus.nextStep}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Interview Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">ראיון קרוב</h2>
            <Video className="w-5 h-5 text-blue-600" />
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{upcomingInterview.time}</div>
              <div className="text-sm text-gray-600">{formatDate(upcomingInterview.date)}</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{upcomingInterview.interviewer}</p>
                  <p className="text-xs text-gray-500">{upcomingInterview.position}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{upcomingInterview.location}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                הצטרף לראיון
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                הוסף ליומן
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Message from Recruiter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4 space-x-reverse mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{recruiter.name}</h3>
              <p className="text-sm text-gray-500">{recruiter.title}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-700 leading-relaxed">{recruiter.message}</p>
          </div>
          
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
              <Phone className="w-4 h-4" />
              <span>התקשר</span>
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              שלח הודעה
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">פעילות אחרונה</h2>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-4 space-x-reverse">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color.replace('text-', 'bg-')} bg-opacity-10`}>
                    <Icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                      <span className="text-xs text-gray-400">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
            צפה בכל הפעילות
          </button>
        </div>
      </div>
    </div>
  );
} 