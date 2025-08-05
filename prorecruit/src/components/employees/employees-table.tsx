'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MoreVertical, 
  Eye, 
  Edit, 
  LogOut,
  User,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { EmployeeDetailsModal } from './employee-details-modal';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  manager: string;
  hireDate: string;
  avatar: string;
  status: 'active' | 'inactive' | 'on_leave';
  riskLevel: 'low' | 'medium' | 'high';
  performanceScore: number;
}

interface EmployeesTableProps {
  department: string;
  manager: string;
  role: string;
  searchQuery: string;
}

export function EmployeesTable({
  department,
  manager,
  role,
  searchQuery
}: EmployeesTableProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');

  useEffect(() => {
    // Mock data - בפועל זה יגיע מה-API
    const mockEmployees: Employee[] = [
      {
        id: '1',
        name: 'דוד לוי',
        role: 'מפתח Full Stack',
        department: 'פיתוח',
        manager: 'שרה כהן',
        hireDate: '2023-01-15',
        avatar: '/api/placeholder/40/40',
        status: 'active',
        riskLevel: 'low',
        performanceScore: 92
      },
      {
        id: '2',
        name: 'מיכל רוזן',
        role: 'מעצבת UX/UI',
        department: 'עיצוב',
        manager: 'יוסי כהן',
        hireDate: '2023-03-20',
        avatar: '/api/placeholder/40/40',
        status: 'active',
        riskLevel: 'medium',
        performanceScore: 88
      },
      {
        id: '3',
        name: 'יוסי כהן',
        role: 'מנהל פרויקטים',
        department: 'ניהול',
        manager: 'דוד לוי',
        hireDate: '2022-11-10',
        avatar: '/api/placeholder/40/40',
        status: 'active',
        riskLevel: 'low',
        performanceScore: 95
      },
      {
        id: '4',
        name: 'שרה כהן',
        role: 'אנליסט נתונים',
        department: 'נתונים',
        manager: 'מיכל רוזן',
        hireDate: '2023-06-05',
        avatar: '/api/placeholder/40/40',
        status: 'on_leave',
        riskLevel: 'high',
        performanceScore: 75
      },
      {
        id: '5',
        name: 'אבי ישראלי',
        role: 'מפתח Backend',
        department: 'פיתוח',
        manager: 'דוד לוי',
        hireDate: '2023-02-28',
        avatar: '/api/placeholder/40/40',
        status: 'active',
        riskLevel: 'low',
        performanceScore: 90
      }
    ];

    setTimeout(() => {
      setEmployees(mockEmployees);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-red-100 text-red-800',
      'on_leave': 'bg-yellow-100 text-yellow-800'
    };
    const labels = {
      'active': 'פעיל',
      'inactive': 'לא פעיל',
      'on_leave': 'בחופשה'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getRiskLevelBadge = (riskLevel: string) => {
    const colors = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-red-100 text-red-800'
    };
    const labels = {
      'low': 'נמוך',
      'medium': 'בינוני',
      'high': 'גבוה'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[riskLevel as keyof typeof colors]}`}>
        {labels[riskLevel as keyof typeof labels]}
      </span>
    );
  };

  const getPerformanceScore = (score: number) => {
    if (score >= 90) return <span className="text-green-600 font-medium">{score}%</span>;
    if (score >= 80) return <span className="text-yellow-600 font-medium">{score}%</span>;
    return <span className="text-red-600 font-medium">{score}%</span>;
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = department === 'all' || employee.department === department;
    const matchesManager = manager === 'all' || employee.manager === manager;
    const matchesRole = role === 'all' || employee.role.includes(role);
    
    return matchesSearch && matchesDepartment && matchesManager && matchesRole;
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
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
                סיכון
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                ביצועים
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="mr-3">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {employee.role}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {employee.department}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {employee.manager}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(employee.hireDate).toLocaleDateString('he-IL')}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(employee.status)}
                </td>
                <td className="px-6 py-4">
                  {getRiskLevelBadge(employee.riskLevel)}
                </td>
                <td className="px-6 py-4 text-sm">
                  {getPerformanceScore(employee.performanceScore)}
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <button
                      onClick={() => setSelectedEmployee(selectedEmployee === employee.id ? null : employee.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {selectedEmployee === employee.id && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setSelectedEmployeeId(employee.id);
                              setModalMode('view');
                              setShowEmployeeModal(true);
                              setSelectedEmployee(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Eye className="w-4 h-4 ml-2" />
                            הצג פרופיל מלא
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedEmployeeId(employee.id);
                              setModalMode('edit');
                              setShowEmployeeModal(true);
                              setSelectedEmployee(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit className="w-4 h-4 ml-2" />
                            ערוך פרטים
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <LogOut className="w-4 h-4 ml-2" />
                            התחל תהליך Offboarding
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
        <div className="text-center py-8">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">לא נמצאו עובדים</p>
        </div>
      )}

      {/* Employee Details Modal */}
      <EmployeeDetailsModal
        isOpen={showEmployeeModal}
        onClose={() => setShowEmployeeModal(false)}
        employeeId={selectedEmployeeId}
        mode={modalMode}
        onModeChange={setModalMode}
      />
    </div>
  );
} 