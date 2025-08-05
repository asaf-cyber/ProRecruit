'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MoreHorizontal,
  Eye,
  Edit,
  UserX,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  supervisor: string;
  hireDate: string;
  status: string;
  email: string;
  phone: string;
  avatar: string;
}

interface EmployeesTableProps {
  searchQuery: string;
  departmentFilter: string;
  statusFilter: string;
}

// Mock data for employees
const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'יוסי כהן',
    title: 'מפתח Full-Stack',
    department: 'פיתוח',
    supervisor: 'דוד מנהל',
    hireDate: '2024-01-15',
    status: 'active',
    email: 'yossi@company.com',
    phone: '050-1234567',
    avatar: 'י'
  },
  {
    id: '2',
    name: 'מיכל לוי',
    title: 'מפתח Frontend',
    department: 'פיתוח',
    supervisor: 'דוד מנהל',
    hireDate: '2024-01-20',
    status: 'probation',
    email: 'michal@company.com',
    phone: '050-2345678',
    avatar: 'מ'
  },
  {
    id: '3',
    name: 'דן רוזן',
    title: 'DevOps Engineer',
    department: 'תשתיות',
    supervisor: 'שרה מנהלת',
    hireDate: '2024-01-10',
    status: 'active',
    email: 'dan@company.com',
    phone: '050-3456789',
    avatar: 'ד'
  },
  {
    id: '4',
    name: 'נועה גולדברג',
    title: 'QA Engineer',
    department: 'איכות',
    supervisor: 'מיכאל מנהל',
    hireDate: '2024-01-05',
    status: 'on_leave',
    email: 'noa@company.com',
    phone: '050-4567890',
    avatar: 'נ'
  },
  {
    id: '5',
    name: 'עומר שפירא',
    title: 'Project Manager',
    department: 'ניהול',
    supervisor: 'רחל מנהלת',
    hireDate: '2024-01-25',
    status: 'active',
    email: 'omer@company.com',
    phone: '050-5678901',
    avatar: 'ע'
  }
];

export function EmployeesTable({
  searchQuery,
  departmentFilter,
  statusFilter
}: EmployeesTableProps) {
  const router = useRouter();
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'פעיל', color: 'bg-green-100 text-green-800' },
      probation: { label: 'בתקופת ניסיון', color: 'bg-yellow-100 text-yellow-800' },
      on_leave: { label: 'בחופשה', color: 'bg-blue-100 text-blue-800' },
      terminated: { label: 'פורש', color: 'bg-red-100 text-red-800' },
      suspended: { label: 'מושעה', color: 'bg-orange-100 text-orange-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getDepartmentBadge = (department: string) => {
    const departmentConfig = {
      development: { label: 'פיתוח', color: 'bg-purple-100 text-purple-800' },
      qa: { label: 'איכות', color: 'bg-indigo-100 text-indigo-800' },
      devops: { label: 'תשתיות', color: 'bg-teal-100 text-teal-800' },
      management: { label: 'ניהול', color: 'bg-pink-100 text-pink-800' },
      design: { label: 'עיצוב', color: 'bg-rose-100 text-rose-800' },
      marketing: { label: 'שיווק', color: 'bg-cyan-100 text-cyan-800' },
      hr: { label: 'משאבי אנוש', color: 'bg-amber-100 text-amber-800' }
    };
    
    const config = departmentConfig[department as keyof typeof departmentConfig] || departmentConfig.development;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Filter employees based on search and filters
  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleViewProfile = (employeeId: string) => {
    router.push(`/employees/${employeeId}`);
  };

  const handleEditEmployee = (employeeId: string) => {
    console.log('Edit employee:', employeeId);
    setShowActionsMenu(null);
  };

  const handleOffboardEmployee = (employeeId: string) => {
    console.log('Offboard employee:', employeeId);
    setShowActionsMenu(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                עובד
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                תפקיד
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מחלקה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מנהל ישיר
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                תאריך קליטה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פרטי קשר
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
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{employee.avatar}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getDepartmentBadge(employee.department)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.supervisor}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.hireDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(employee.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.email}</div>
                  <div className="text-sm text-gray-500">{employee.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left">
                  <div className="relative">
                    <button
                      onClick={() => setShowActionsMenu(showActionsMenu === employee.id ? null : employee.id)}
                      className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <MoreHorizontal size={16} className="text-gray-500" />
                    </button>

                    {showActionsMenu === employee.id && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          <button
                            onClick={() => handleViewProfile(employee.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Eye size={16} className="ml-3" />
                            הצג פרופיל עובד
                          </button>
                          <button
                            onClick={() => handleEditEmployee(employee.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit size={16} className="ml-3" />
                            ערוך פרטים
                          </button>
                          <button
                            onClick={() => handleOffboardEmployee(employee.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <UserX size={16} className="ml-3" />
                            Offboard
                          </button>
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

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">לא נמצאו עובדים</div>
        </div>
      )}
    </div>
  );
} 