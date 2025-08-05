'use client';

import { useState } from 'react';
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  MapPin,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  DollarSign,
  Briefcase,
  Play,
  Pause,
  Archive
} from 'lucide-react';
import { JobRequisition } from '@/app/jobs/page';

interface JobsTableProps {
  jobs: JobRequisition[];
  isLoading: boolean;
  searchQuery: string;
  statusFilter: string;
  departmentFilter: string;
  clientFilter: string;
  managerFilter: string;
  dateRange: {start: string; end: string};
  tagsFilter: string[];
  onEditJob: (jobId: string) => void;
  onViewJobProfile: (jobId: string) => void;
  onStatusChange: (jobId: string, newStatus: JobRequisition['status']) => void;
}

export function JobsTable({ 
  jobs, 
  isLoading, 
  searchQuery, 
  statusFilter, 
  departmentFilter, 
  clientFilter, 
  managerFilter,
  dateRange,
  tagsFilter,
  onEditJob,
  onViewJobProfile,
  onStatusChange 
}: JobsTableProps) {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-50 border-b"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 border-b border-gray-200 bg-white"></div>
          ))}
        </div>
      </div>
    );
  }


  const getStatusBadge = (status: JobRequisition['status']) => {
    const statusConfig = {
      draft: { label: 'טיוטה', color: 'bg-gray-100 text-gray-800', icon: FileText },
      published: { label: 'פורסמה', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      closed: { label: 'סגורה', color: 'bg-red-100 text-red-800', icon: Archive },
      on_hold: { label: 'מושהית', color: 'bg-yellow-100 text-yellow-800', icon: Pause }
    };
    
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon size={12} className="ml-1" />
        {config.label}
      </span>
    );
  };

  const getDepartmentBadge = (department: string) => {
    const departmentConfig: { [key: string]: { label: string; color: string } } = {
      'פיתוח': { label: 'פיתוח', color: 'bg-blue-100 text-blue-800' },
      'עיצוב': { label: 'עיצוב', color: 'bg-purple-100 text-purple-800' },
      'נתונים': { label: 'נתונים', color: 'bg-green-100 text-green-800' },
      'ניהול': { label: 'ניהול', color: 'bg-orange-100 text-orange-800' },
      'משאבי אנוש': { label: 'משאבי אנוש', color: 'bg-pink-100 text-pink-800' },
      'מכירות': { label: 'מכירות', color: 'bg-yellow-100 text-yellow-800' },
      'שיווק': { label: 'שיווק', color: 'bg-indigo-100 text-indigo-800' },
      'פעילות': { label: 'פעילות', color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = departmentConfig[department] || { label: department, color: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredJobs = jobs.filter(job => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.client?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.recruitingManager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    
    // Department filter
    const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter;
    
    // Client filter
    const matchesClient = clientFilter === 'all' || (job.client?.name || '').toLowerCase().includes(clientFilter.toLowerCase());
    
    // Manager filter
    const matchesManager = managerFilter === 'all' || job.recruitingManager.name === managerFilter;
    
    // Date range filter
    const matchesDateRange = !dateRange.start || !dateRange.end || 
      (new Date(job.createdDate) >= new Date(dateRange.start) && 
       new Date(job.createdDate) <= new Date(dateRange.end));
    
    // Tags filter
    const matchesTags = tagsFilter.length === 0 || 
      tagsFilter.some(tag => job.tags.includes(tag));

    return matchesSearch && matchesStatus && matchesDepartment && matchesClient && 
           matchesManager && matchesDateRange && matchesTags;
  });

  const handleStatusChange = (jobId: string, newStatus: JobRequisition['status']) => {
    onStatusChange(jobId, newStatus);
    setShowActionsMenu(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
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
                לקוח
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מחלקה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מנהל מגייס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מועמדים בתהליך
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                ימים לגיוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onViewJobProfile(job.id)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Briefcase size={20} className="text-blue-600" />
                    </div>
                    <div className="mr-3">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin size={12} className="ml-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <DollarSign size={12} className="ml-1" />
                        ₪{job.salaryRange.min.toLocaleString()} - ₪{job.salaryRange.max.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(job.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Building2 size={16} className="text-gray-400 ml-1" />
                    <span className="text-sm text-gray-900">{job.client?.name || 'לא צוין'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getDepartmentBadge(job.department)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.recruitingManager.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Users size={16} className="text-gray-400 ml-1" />
                    <span className="text-sm text-gray-900">{job.candidatesCount}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-400 ml-1" />
                    <span className="text-sm text-gray-900">{job.averageDaysToHire || 'לא זמין'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowActionsMenu(showActionsMenu === job.id ? null : job.id);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {showActionsMenu === job.id && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              onViewJobProfile(job.id);
                              setShowActionsMenu(null);
                            }}
                          >
                            <Eye size={16} className="ml-3" />
                            הצג פרופיל משרה
                          </button>
                          <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditJob(job.id);
                              setShowActionsMenu(null);
                            }}
                          >
                            <Edit size={16} className="ml-3" />
                            ערוך משרה
                          </button>
                          
                          {/* Status Change Actions */}
                          {job.status === 'draft' && (
                            <button 
                              className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(job.id, 'published');
                              }}
                            >
                              <Play size={16} className="ml-3" />
                              פרסם משרה
                            </button>
                          )}
                          
                          {job.status === 'published' && (
                            <>
                              <button 
                                className="flex items-center w-full px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(job.id, 'on_hold');
                                }}
                              >
                                <Pause size={16} className="ml-3" />
                                השהה משרה
                              </button>
                              <button 
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(job.id, 'closed');
                                }}
                              >
                                <Archive size={16} className="ml-3" />
                                סגור משרה
                              </button>
                            </>
                          )}
                          
                          {job.status === 'on_hold' && (
                            <button 
                              className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(job.id, 'published');
                              }}
                            >
                              <Play size={16} className="ml-3" />
                              חדש פרסום
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">לא נמצאו משרות</h3>
          <p className="mt-1 text-sm text-gray-500">נסה לשנות את הפילטרים או צור משרה חדשה.</p>
        </div>
      )}
    </div>
  );
} 