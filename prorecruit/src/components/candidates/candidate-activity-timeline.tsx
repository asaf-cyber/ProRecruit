'use client';

import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MessageCircle, 
  Edit, 
  CheckCircle,
  XCircle,
  FileText,
  AlertCircle
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'status_change' | 'contact' | 'email' | 'phone' | 'sms' | 'note' | 'document' | 'interview';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  metadata?: {
    from?: string;
    to?: string;
    method?: string;
    result?: string;
  };
}

interface CandidateActivityTimelineProps {
  candidateId: string;
  candidateName: string;
  activities: ActivityItem[];
}

export function CandidateActivityTimeline({ 
  candidateId, 
  candidateName, 
  activities 
}: CandidateActivityTimelineProps) {
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'status_change':
        return CheckCircle;
      case 'contact':
        return Phone;
      case 'email':
        return Mail;
      case 'phone':
        return Phone;
      case 'sms':
        return MessageCircle;
      case 'note':
        return Edit;
      case 'document':
        return FileText;
      case 'interview':
        return Calendar;
      default:
        return AlertCircle;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'status_change':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400';
      case 'contact':
      case 'phone':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400';
      case 'email':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400';
      case 'sms':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400';
      case 'note':
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400';
      case 'document':
        return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400';
      case 'interview':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  const sortedActivities = [...activities].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <Clock className="w-5 h-5 ml-2" />
        היסטוריית פעילות - {candidateName}
      </h3>

      <div className="flow-root">
        <ul className="-mb-8">
          {sortedActivities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);
            const isLast = index === sortedActivities.length - 1;
            
            return (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {!isLast && (
                    <span
                      className="absolute top-4 right-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3 space-x-reverse">
                    <div>
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${getActivityColor(activity.type)}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4 space-x-reverse">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {activity.description}
                        </p>
                        
                        {/* Metadata */}
                        {activity.metadata && (
                          <div className="mt-2 space-y-1">
                            {activity.metadata.from && activity.metadata.to && (
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                שינוי מ-&quot;{activity.metadata.from}&quot; ל-&quot;{activity.metadata.to}&quot;
                              </p>
                            )}
                            {activity.metadata.method && (
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                שיטה: {activity.metadata.method}
                              </p>
                            )}
                            {activity.metadata.result && (
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                תוצאה: {activity.metadata.result}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-left whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                        <div className="flex items-center">
                          <User className="w-3 h-3 ml-1" />
                          {activity.user}
                        </div>
                        <time dateTime={activity.timestamp} className="text-xs mt-1 block">
                          {new Date(activity.timestamp).toLocaleDateString('he-IL', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {sortedActivities.length === 0 && (
        <div className="text-center py-8">
          <Clock className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">אין פעילות</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            פעילות חדשה תופיע כאן
          </p>
        </div>
      )}
    </div>
  );
}