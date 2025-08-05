'use client';

import { useState } from 'react';
import { 
  Plus, 
  Briefcase, 
  Users, 
  Calendar, 
  Shield, 
  Building2,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Eye,
  Search
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  status: 'open' | 'closed' | 'on_hold';
  recruiterManager: string;
  candidatesInProcess: number;
  createdDate: string;
  lastActivity: string;
  priority: 'high' | 'medium' | 'low';
  isSecurityClassified: boolean;
}

interface ClientJobsTabProps {
  clientId: string;
  clientType: 'civil' | 'security';
}

export function ClientJobsTab({ clientId, clientType }: ClientJobsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed' | 'on_hold'>('all');
  const [showNewJobModal, setShowNewJobModal] = useState(false);

  // Mock jobs data
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'מפתח Full Stack Senior',
      status: 'open',
      recruiterManager: 'יוסי גולדברג',
      candidatesInProcess: 8,
      createdDate: '2024-01-10',
      lastActivity: '2024-01-18',
      priority: 'high',
      isSecurityClassified: clientType === 'security'
    },
    {
      id: '2',
      title: 'מנהל פרויקטים טכני',
      status: 'open',
      recruiterManager: 'שרה כהן',
      candidatesInProcess: 3,
      createdDate: '2024-01-15',
      lastActivity: '2024-01-19',
      priority: 'medium',
      isSecurityClassified: clientType === 'security'
    },
    {
      id: '3',
      title: 'מומחה DevOps',
      status: 'closed',
      recruiterManager: 'דוד לוי',
      candidatesInProcess: 0,
      createdDate: '2023-12-01',
      lastActivity: '2024-01-05',
      priority: 'low',
      isSecurityClassified: clientType === 'security'
    }
  ];

  // Filter jobs
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.recruiterManager.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config = {
      open: { label: 'פתוח', color: 'bg-green-100 text-green-800', icon: Clock },
      closed: { label: 'סגור', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
      on_hold: { label: 'מושהה', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle }
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">משרות והזדמנויות</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">ניהול כל המשרות עבור לקוח זה</p>
        </div>
        <button
          onClick={() => setShowNewJobModal(true)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2"
        >
          <Plus size={16} className="ml-2" />
          הוספת משרה חדשה
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">משרות פתוחות</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {filteredJobs.filter(j => j.status === 'open').length}
              </p>
            </div>
            <Clock size={24} className="text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">מועמדים בתהליך</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {filteredJobs.reduce((sum, job) => sum + job.candidatesInProcess, 0)}
              </p>
            </div>
            <Users size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400">משרות שהושלמו</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {filteredJobs.filter(j => j.status === 'closed').length}
              </p>
            </div>
            <CheckCircle size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חיפוש משרות..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">סטטוס:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">כל הסטטוסים</option>
            <option value="open">פתוח</option>
            <option value="closed">סגור</option>
            <option value="on_hold">מושהה</option>
          </select>
        </div>
      </div>

      {/* Special Security Notice */}
      {clientType === 'security' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <Shield size={20} className="text-red-600 dark:text-red-400 ml-2" />
            <div>
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200">לקוח ביטחוני</h4>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                כל המשרות עבור לקוח זה מסווגות אוטומטית כביטחוניות ודורשות תהליך סיווג ביטחוני מיוחד.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Jobs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  שם משרה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  מנהל מגייס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  מועמדים
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  פעילות אחרונה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ml-3 ${
                        job.isSecurityClassified 
                          ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' 
                          : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      }`}>
                        {job.isSecurityClassified ? <Shield size={16} /> : <Briefcase size={16} />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {job.title}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded border ${getPriorityColor(job.priority)} mt-1 inline-block`}>
                          עדיפות {job.priority === 'high' ? 'גבוהה' : job.priority === 'medium' ? 'בינונית' : 'נמוכה'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(job.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {job.recruiterManager}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users size={16} className="text-gray-400 ml-1" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {job.candidatesInProcess}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(job.lastActivity).toLocaleDateString('he-IL')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">אין משרות</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            לא נמצאו משרות התואמות לחיפוש שלך
          </p>
        </div>
      )}

      {/* New Job Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">הוספת משרה חדשה</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  שם המשרה
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="לדוגמה: מפתח Full Stack Senior"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    מנהל מגייס
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option>יוסי גולדברג</option>
                    <option>שרה כהן</option>
                    <option>דוד לוי</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    עדיפות
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option value="high">גבוהה</option>
                    <option value="medium">בינונית</option>
                    <option value="low">נמוכה</option>
                  </select>
                </div>
              </div>

              {clientType === 'security' && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <div className="flex items-center">
                    <Shield size={16} className="text-red-600 dark:text-red-400 ml-2" />
                    <span className="text-sm text-red-700 dark:text-red-300">
                      משרה זו תסווג אוטומטית כביטחונית
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowNewJobModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ביטול
              </button>
              <button
                onClick={() => {
                  // Create job logic
                  setShowNewJobModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                הוסף משרה
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}