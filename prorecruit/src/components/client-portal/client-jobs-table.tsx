'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Briefcase
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  status: 'פתוח' | 'בתהליך' | 'סגור' | 'בוטל';
  recruiter: string;
  candidatesCount: number;
  daysOpen: number;
  department: string;
  location: string;
  createdAt: string;
}

interface ClientJobsTableProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onJobSelect: (jobId: string) => void;
}

export function ClientJobsTable({
  searchQuery,
  onSearchChange,
  onJobSelect
}: ClientJobsTableProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - בפועל זה יגיע מה-API עם clientId
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'מפתח Full Stack',
        status: 'פתוח',
        recruiter: 'דוד לוי',
        candidatesCount: 12,
        daysOpen: 65,
        department: 'פיתוח',
        location: 'תל אביב',
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        title: 'מנהל פרויקטים',
        status: 'בתהליך',
        recruiter: 'שרה כהן',
        candidatesCount: 8,
        daysOpen: 25,
        department: 'ניהול',
        location: 'ירושלים',
        createdAt: '2024-01-15'
      },
      {
        id: '3',
        title: 'מעצב UX/UI',
        status: 'פתוח',
        recruiter: 'מיכל רוזן',
        candidatesCount: 15,
        daysOpen: 30,
        department: 'עיצוב',
        location: 'חיפה',
        createdAt: '2024-01-20'
      },
      {
        id: '4',
        title: 'מפתח Backend',
        status: 'סגור',
        recruiter: 'יוסי כהן',
        candidatesCount: 0,
        daysOpen: 45,
        department: 'פיתוח',
        location: 'תל אביב',
        createdAt: '2023-12-15'
      },
      {
        id: '5',
        title: 'אנליסט נתונים',
        status: 'פתוח',
        recruiter: 'דוד לוי',
        candidatesCount: 6,
        daysOpen: 20,
        department: 'נתונים',
        location: 'תל אביב',
        createdAt: '2024-01-25'
      }
    ];

    setTimeout(() => {
      setJobs(mockJobs);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    const colors = {
      'פתוח': 'bg-blue-100 text-blue-800',
      'בתהליך': 'bg-yellow-100 text-yellow-800',
      'סגור': 'bg-green-100 text-green-800',
      'בוטל': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {status}
      </span>
    );
  };

  const getDaysOpenBadge = (days: number) => {
    if (days > 60) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">מעל 60 יום</span>;
    } else if (days > 30) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">מעל 30 יום</span>;
    } else {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">פחות מ-30 יום</span>;
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="חיפוש משרות..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">כל הסטטוסים</option>
              <option value="פתוח">פתוח</option>
              <option value="בתהליך">בתהליך</option>
              <option value="סגור">סגור</option>
              <option value="בוטל">בוטל</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  משרה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  מנהל מגייס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  מועמדים
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ימים פתוחה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.department} • {job.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(job.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {job.recruiter}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{job.candidatesCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {getDaysOpenBadge(job.daysOpen)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => onJobSelect(job.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        צפייה במועמדים
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-8">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">לא נמצאו משרות</p>
        </div>
      )}
    </div>
  );
} 