'use client';

import { useState } from 'react';
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  User,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Building,
  Users,
  ExternalLink
} from 'lucide-react';

interface OnboardingEmployee {
  id: string;
  name: string;
  position: string;
  department: string;
  manager: string;
  startDate: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue';
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  lastActivity: string;
  template: string;
}

interface OnboardingTableProps {
  searchQuery: string;
  statusFilter: string;
  departmentFilter: string;
  managerFilter: string;
}

export function OnboardingTable({ 
  searchQuery, 
  statusFilter, 
  departmentFilter, 
  managerFilter 
}: OnboardingTableProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);

  // Mock data
  const employees: OnboardingEmployee[] = [
    {
      id: '1',
      name: 'דוד לוי',
      position: 'Full Stack Developer',
      department: 'Engineering',
      manager: 'דן כהן',
      startDate: '2024-02-01',
      progress: 75,
      status: 'in_progress',
      totalTasks: 12,
      completedTasks: 9,
      overdueTasks: 1,
      lastActivity: '2024-01-15',
      template: 'מפתח תוכנה'
    },
    {
      id: '2',
      name: 'שרה כהן',
      position: 'Sales Manager',
      department: 'Sales',
      manager: 'שרה לוי',
      startDate: '2024-01-28',
      progress: 45,
      status: 'in_progress',
      totalTasks: 10,
      completedTasks: 4,
      overdueTasks: 2,
      lastActivity: '2024-01-14',
      template: 'אנשי מכירות'
    },
    {
      id: '3',
      name: 'מיכאל רוזנברג',
      position: 'DevOps Engineer',
      department: 'Engineering',
      manager: 'דן כהן',
      startDate: '2024-02-05',
      progress: 20,
      status: 'not_started',
      totalTasks: 14,
      completedTasks: 2,
      overdueTasks: 0,
      lastActivity: '2024-01-16',
      template: 'מפתח תוכנה'
    },
    {
      id: '4',
      name: 'נועה אברהם',
      position: 'Marketing Specialist',
      department: 'Marketing',
      manager: 'מיכאל רוזנברג',
      startDate: '2024-01-25',
      progress: 100,
      status: 'completed',
      totalTasks: 8,
      completedTasks: 8,
      overdueTasks: 0,
      lastActivity: '2024-01-13',
      template: 'שיווק'
    },
    {
      id: '5',
      name: 'רון שפירא',
      position: 'HR Coordinator',
      department: 'HR',
      manager: 'נועה אברהם',
      startDate: '2024-01-30',
      progress: 60,
      status: 'in_progress',
      totalTasks: 11,
      completedTasks: 6,
      overdueTasks: 3,
      lastActivity: '2024-01-15',
      template: 'משאבי אנוש'
    }
  ];

  const getStatusColor = (status: OnboardingEmployee['status']) => {
    switch (status) {
      case 'not_started': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: OnboardingEmployee['status']) => {
    switch (status) {
      case 'not_started': return 'לא התחיל';
      case 'in_progress': return 'בתהליך';
      case 'completed': return 'הושלם';
      case 'overdue': return 'עבר זמנו';
    }
  };

  const getStatusIcon = (status: OnboardingEmployee['status']) => {
    switch (status) {
      case 'not_started': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = !searchQuery || 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || employee.department.toLowerCase() === departmentFilter;
    const matchesManager = managerFilter === 'all' || employee.manager.toLowerCase().includes(managerFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesManager;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <h3 className="text-lg font-semibold text-gray-900">עובדים בתהליך קליטה</h3>
            <span className="text-sm text-gray-500">
              {filteredEmployees.length} מתוך {employees.length} עובדים
            </span>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <button className="flex items-center space-x-2 space-x-reverse px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>הוסף עובד</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                עובד
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                תפקיד ומחלקה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מנהל אחראי
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                תאריך התחלה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                התקדמות
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                משימות
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="mr-4">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.template}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{employee.position}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Building className="w-3 h-3 mr-1" />
                    {employee.department}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-gray-400" />
                    {employee.manager}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    {new Date(employee.startDate).toLocaleDateString('he-IL')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                        style={{ width: `${employee.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{employee.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {employee.completedTasks}/{employee.totalTasks}
                  </div>
                  {employee.overdueTasks > 0 && (
                    <div className="text-xs text-red-600">
                      {employee.overdueTasks} שעברו זמנן
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {getStatusIcon(employee.status)}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                      {getStatusText(employee.status)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button 
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => setSelectedEmployee(employee.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">אין עובדים בתהליך קליטה</h3>
          <p className="mt-1 text-sm text-gray-500">
            התחל תהליך קליטה חדש או שנה את הפילטרים שלך.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              התחל קליטה חדשה
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 