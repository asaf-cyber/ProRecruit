'use client';

import { useState, useEffect } from 'react';
import { Grid, List, Trash2, Bell } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { JobsTable } from '@/components/jobs/jobs-table';
import { JobsFilters } from '@/components/jobs/jobs-filters';
import { JobsHeader } from '@/components/jobs/jobs-header';
import { CreateJobModal } from '@/components/jobs/create-job-modal';
import { JobProfileModal } from '@/components/jobs/job-profile-modal';
import { EnhancedJobCard } from '@/components/jobs/enhanced-job-card';
import { JobAlertsSystem } from '@/components/jobs/job-alerts-system';

export interface JobRequisition {
  id: string;
  title: string;
  description: string;
  requirements: string;
  status: 'draft' | 'published' | 'closed' | 'on_hold';
  department: string;
  location: string;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  securityClearance?: string;
  recruitingManager: {
    id: string;
    name: string;
    email: string;
  };
  client?: {
    id: string;
    name: string;
    type: 'civil' | 'security';
  };
  purchaseOrder?: {
    id: string;
    poNumber: string;
    amount: number;
  };
  tags: string[];
  publishDate?: string;
  closeDate?: string;
  createdDate: string;
  updatedDate: string;
  candidatesCount: number;
  averageDaysToHire?: number;
  applications: Array<{
    id: string;
    candidateId: string;
    candidateName: string;
    status: string;
    appliedDate: string;
  }>;
  timeline: Array<{
    id: string;
    type: 'created' | 'published' | 'status_change' | 'candidate_added' | 'closed';
    title: string;
    description: string;
    timestamp: string;
    author: string;
  }>;
}

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [selectedManager, setSelectedManager] = useState('all');
  const [dateRange, setDateRange] = useState<{start: string; end: string}>({start: '', end: ''});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Modal states
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [showJobProfileModal, setShowJobProfileModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAlertsSystem, setShowAlertsSystem] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [jobModalMode, setJobModalMode] = useState<'create' | 'edit'>('create');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');

  // Jobs data
  const [jobs, setJobs] = useState<JobRequisition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setIsLoading(true);
    // Mock data - בפועל זה יגיע מה-API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockJobs: JobRequisition[] = [
      {
        id: '1',
        title: 'מפתח Full Stack Senior',
        description: 'אנחנו מחפשים מפתח Full Stack מנוסה עם ידע בReact ו-Node.js...',
        requirements: 'ניסיון של 5+ שנים בפיתוח, ידע ב-React, Node.js, TypeScript...',
        status: 'published',
        department: 'פיתוח',
        location: 'תל אביב / היברידי',
        salaryRange: { min: 25000, max: 35000, currency: 'ILS' },
        securityClearance: 'ביטחוני בסיסי',
        recruitingManager: {
          id: 'mgr1',
          name: 'יוסי גולדברג',
          email: 'yossi@company.com'
        },
        client: {
          id: 'client1',
          name: 'חברת הטכנולוגיה המתקדמת',
          type: 'civil'
        },
        purchaseOrder: {
          id: 'po1',
          poNumber: 'PO-2024-001',
          amount: 120000
        },
        tags: ['Senior', 'Full Stack', 'דחוף'],
        publishDate: '2024-01-15',
        createdDate: '2024-01-10',
        updatedDate: '2024-01-20',
        candidatesCount: 12,
        averageDaysToHire: 28,
        applications: [
          {
            id: 'app1',
            candidateId: 'cand1',
            candidateName: 'דוד כהן',
            status: 'interview_scheduled',
            appliedDate: '2024-01-16'
          }
        ],
        timeline: [
          {
            id: 't1',
            type: 'created',
            title: 'משרה נוצרה',
            description: 'המשרה נוצרה על ידי יוסי גולדברג',
            timestamp: '2024-01-10T10:00:00Z',
            author: 'יוסי גולדברג'
          }
        ]
      },
      {
        id: '2',
        title: 'מעצב UX/UI',
        description: 'מחפשים מעצב מנוסה לצוות העיצוב שלנו...',
        requirements: 'ניסיון של 3+ שנים בעיצוב UI/UX, ידע בFigma, Adobe Creative Suite...',
        status: 'draft',
        department: 'עיצוב',
        location: 'רמת גן',
        salaryRange: { min: 18000, max: 25000, currency: 'ILS' },
        recruitingManager: {
          id: 'mgr2',
          name: 'שרה לוי',
          email: 'sarah@company.com'
        },
        tags: ['UX', 'UI', 'עיצוב'],
        createdDate: '2024-01-12',
        updatedDate: '2024-01-12',
        candidatesCount: 3,
        applications: [],
        timeline: []
      },
      {
        id: '3',
        title: 'אנליסט נתונים Senior',
        description: 'משרה מעניינת לאנליסט נתונים עם ניסיון בכלי BI...',
        requirements: 'תואר בסטטיסטיקה/מתמטיקה, ניסיון ב-SQL, Python, Tableau...',
        status: 'published',
        department: 'נתונים',
        location: 'ירושלים',
        salaryRange: { min: 22000, max: 30000, currency: 'ILS' },
        securityClearance: 'סודי',
        recruitingManager: {
          id: 'mgr3',
          name: 'מיכל רוזן',
          email: 'michal@company.com'
        },
        client: {
          id: 'client2',
          name: 'משרד הביטחון',
          type: 'security'
        },
        tags: ['Data', 'Analytics', 'Senior', 'ביטחוני'],
        publishDate: '2024-01-18',
        createdDate: '2024-01-15',
        updatedDate: '2024-01-21',
        candidatesCount: 8,
        averageDaysToHire: 35,
        applications: [],
        timeline: []
      },
      {
        id: '4',
        title: 'מנהל פרויקטים טכני',
        description: 'מנהל פרויקטים מנוסה לניהול פרויקטי פיתוח...',
        requirements: 'ניסיון של 5+ שנים בניהול פרויקטים, הכרת Agile/Scrum...',
        status: 'closed',
        department: 'ניהול',
        location: 'תל אביב',
        salaryRange: { min: 28000, max: 38000, currency: 'ILS' },
        recruitingManager: {
          id: 'mgr1',
          name: 'יוסי גולדברג',
          email: 'yossi@company.com'
        },
        tags: ['Management', 'Technical', 'Agile'],
        createdDate: '2023-12-01',
        updatedDate: '2024-01-05',
        closeDate: '2024-01-05',
        candidatesCount: 15,
        averageDaysToHire: 22,
        applications: [],
        timeline: []
      }
    ];
    
    setJobs(mockJobs);
    setIsLoading(false);
  };

  const handleCreateJob = () => {
    setJobModalMode('create');
    setSelectedJobId('');
    setShowCreateJobModal(true);
  };

  const handleEditJob = (jobId: string) => {
    setJobModalMode('edit');
    setSelectedJobId(jobId);
    setShowCreateJobModal(true);
  };

  const handleViewJobProfile = (jobId: string) => {
    setSelectedJobId(jobId);
    setShowJobProfileModal(true);
  };

  const handleJobSaved = (jobData: Partial<JobRequisition>) => {
    if (jobModalMode === 'create') {
      // Add new job
      const newJob: JobRequisition = {
        id: Date.now().toString(),
        ...jobData,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        candidatesCount: 0,
        applications: [],
        timeline: [{
          id: 't1',
          type: 'created',
          title: 'משרה נוצרה',
          description: `המשרה נוצרה על ידי ${jobData.recruitingManager?.name}`,
          timestamp: new Date().toISOString(),
          author: jobData.recruitingManager?.name || 'משתמש'
        }]
      } as JobRequisition;
      
      setJobs([newJob, ...jobs]);
    } else {
      // Update existing job
      setJobs(jobs.map(job => 
        job.id === selectedJobId 
          ? { ...job, ...jobData, updatedDate: new Date().toISOString() }
          : job
      ));
    }
    setShowCreateJobModal(false);
  };

  const handleStatusChange = (jobId: string, newStatus: JobRequisition['status']) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            status: newStatus, 
            updatedDate: new Date().toISOString(),
            ...(newStatus === 'closed' && !job.closeDate && { closeDate: new Date().toISOString() })
          }
        : job
    ));
  };

  const handleDeleteJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteJob = () => {
    setJobs(jobs.filter(job => job.id !== selectedJobId));
    setShowDeleteConfirm(false);
    setSelectedJobId('');
  };

  const handleDuplicateJob = (jobId: string) => {
    const jobToDuplicate = jobs.find(job => job.id === jobId);
    if (jobToDuplicate) {
      const duplicatedJob: JobRequisition = {
        ...jobToDuplicate,
        id: Date.now().toString(),
        title: `העתק של ${jobToDuplicate.title}`,
        status: 'draft',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        publishDate: '',
        closeDate: '',
        candidatesCount: 0,
        applications: [],
        timeline: [{
          id: 't1',
          type: 'created',
          title: 'משרה שוכפלה',
          description: `המשרה שוכפלה מ-${jobToDuplicate.title}`,
          timestamp: new Date().toISOString(),
          author: jobToDuplicate.recruitingManager.name
        }]
      };
      setJobs([duplicatedJob, ...jobs]);
    }
  };

  const handleShareJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      navigator.clipboard.writeText(`${window.location.origin}/jobs/${jobId}`);
      alert('קישור למשרה הועתק ללוח');
    }
  };

  const handleExportJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      // כאן נוכל להוסיף פונקציית ייצוא ל-PDF
      alert('ייצוא ל-PDF יתווסף בהמשך');
    }
  };

  // Filter jobs based on search and filter criteria
  const filteredJobs = jobs.filter(job => {
    const searchTerm = searchQuery || '';
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.client?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.recruitingManager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesClient = selectedClient === 'all' || (job.client?.name || '').toLowerCase().includes(selectedClient.toLowerCase());
    const matchesManager = selectedManager === 'all' || job.recruitingManager.name === selectedManager;
    
    const matchesDateRange = !dateRange.start || !dateRange.end || 
      (new Date(job.createdDate) >= new Date(dateRange.start) && 
       new Date(job.createdDate) <= new Date(dateRange.end));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => job.tags.includes(tag));

    return matchesSearch && matchesStatus && matchesDepartment && matchesClient && 
           matchesManager && matchesDateRange && matchesTags;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <JobsHeader onCreateJob={handleCreateJob} />

        {/* Advanced Filters */}
        <JobsFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedClient={selectedClient}
          onClientChange={setSelectedClient}
          selectedManager={selectedManager}
          onManagerChange={setSelectedManager}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />

        {/* View Mode Toggle and Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid size={16} className="ml-2" />
                כרטיסים
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List size={16} className="ml-2" />
                טבלה
              </button>
            </div>

            <button
              onClick={() => setShowAlertsSystem(true)}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Bell size={16} className="ml-2" />
              התראות מערכת
            </button>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
            <div className="flex items-center space-x-1 space-x-reverse">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>פורסמו: {jobs.filter(j => j.status === 'published').length}</span>
            </div>
            <div className="flex items-center space-x-1 space-x-reverse">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span>טיוטות: {jobs.filter(j => j.status === 'draft').length}</span>
            </div>
            <span>מציג {filteredJobs.length} מתוך {jobs.length} משרות</span>
          </div>
        </div>

        {/* Jobs Content */}
        {viewMode === 'table' ? (
          <JobsTable 
            jobs={filteredJobs}
            isLoading={isLoading}
            searchQuery={searchQuery}
            statusFilter={selectedStatus}
            departmentFilter={selectedDepartment}
            clientFilter={selectedClient}
            managerFilter={selectedManager}
            dateRange={dateRange}
            tagsFilter={selectedTags}
            onEditJob={handleEditJob}
            onViewJobProfile={handleViewJobProfile}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <div className="space-y-6">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <EnhancedJobCard
                    key={job.id}
                    job={job}
                    onEdit={handleEditJob}
                    onView={handleViewJobProfile}
                    onDelete={handleDeleteJob}
                    onStatusChange={handleStatusChange}
                    onDuplicate={handleDuplicateJob}
                    onShare={handleShareJob}
                    onExport={handleExportJob}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full items-center justify-center flex mb-4">
                  <Grid className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">לא נמצאו משרות</h3>
                <p className="text-gray-600 mb-4">נסה לשנות את הפילטרים או צור משרה חדשה</p>
                <button
                  onClick={handleCreateJob}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  צור משרה חדשה
                </button>
              </div>
            )}
          </div>
        )}

        {/* Create/Edit Job Modal */}
        <CreateJobModal
          isOpen={showCreateJobModal}
          onClose={() => setShowCreateJobModal(false)}
          mode={jobModalMode}
          jobId={selectedJobId}
          onSave={handleJobSaved}
        />

        {/* Job Profile Modal */}
        <JobProfileModal
          isOpen={showJobProfileModal}
          onClose={() => setShowJobProfileModal(false)}
          jobId={selectedJobId}
          jobs={jobs}
          onEditJob={handleEditJob}
          onStatusChange={handleStatusChange}
        />

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="mr-4">
                    <h3 className="text-lg font-bold text-gray-900">מחיקת משרה</h3>
                    <p className="text-sm text-gray-600">האם אתה בטוח שברצונך למחוק את המשרה?</p>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-800">
                    <strong>אזהרה:</strong> פעולה זו בלתי הפיכה. כל המידע הקשור למשרה יימחק לצמיתות, 
                    כולל מועמדים, ראיונות וציר הזמן.
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-3 space-x-reverse">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    ביטול
                  </button>
                  <button
                    onClick={confirmDeleteJob}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    מחק לצמיתות
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Job Alerts System */}
        <JobAlertsSystem
          jobs={jobs}
          isOpen={showAlertsSystem}
          onClose={() => setShowAlertsSystem(false)}
        />
      </div>
    </MainLayout>
  );
} 