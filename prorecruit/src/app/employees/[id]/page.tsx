'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { EmployeeProfileHeader } from '@/components/employees/employee-profile-header';
import { EmployeeDetailsTab } from '@/components/employees/employee-details-tab';
import { EmployeeScheduleTab } from '@/components/employees/employee-schedule-tab';
import { EmployeeTasksTab } from '@/components/employees/employee-tasks-tab';
import { EmployeePerformanceTab } from '@/components/employees/employee-performance-tab';
import { EmployeeDocumentsTab } from '@/components/employees/employee-documents-tab';

interface EmployeeProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EmployeeProfilePage({ params }: EmployeeProfilePageProps) {
  const [employeeId, setEmployeeId] = useState<string>('');
  const [activeTab, setActiveTab] = useState('details');

  // Handle async params
  React.useEffect(() => {
    params.then(resolvedParams => {
      setEmployeeId(resolvedParams.id);
    });
  }, [params]);

  const tabs = [
    { id: 'details', name: 'פרטים', icon: 'User' },
    { id: 'schedule', name: 'לוח זמנים', icon: 'Calendar' },
    { id: 'tasks', name: 'משימות', icon: 'CheckSquare' },
    { id: 'performance', name: 'ביצועים', icon: 'TrendingUp' },
    { id: 'documents', name: 'מסמכים', icon: 'FileText' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <EmployeeDetailsTab employeeId={employeeId} />;
      case 'schedule':
        return <EmployeeScheduleTab employeeId={employeeId} />;
      case 'tasks':
        return <EmployeeTasksTab employeeId={employeeId} />;
      case 'performance':
        return <EmployeePerformanceTab employeeId={employeeId} />;
      case 'documents':
        return <EmployeeDocumentsTab employeeId={employeeId} />;
      default:
        return <EmployeeDetailsTab employeeId={employeeId} />;
    }
  };

  return (
    <MainLayout>
      {employeeId && (
        <div className="space-y-6">
          <EmployeeProfileHeader employeeId={employeeId} />
          
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 space-x-reverse px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
} 