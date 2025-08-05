'use client';

import { useState, useEffect } from 'react';
import { 
  MoreVertical, 
  Eye, 
  Edit, 
  LogOut,
  User,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Building2,
  Users,
  Star,
  TrendingUp,
  Shield
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
  email?: string;
  phone?: string;
}

interface EmployeeCardsGridProps {
  employees: Employee[];
  isLoading: boolean;
}

export function EmployeeCardsGrid({ employees, isLoading }: EmployeeCardsGridProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');

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
        רמת סיכון {labels[riskLevel as keyof typeof labels]}
      </span>
    );
  };

  const getPerformanceScore = (score: number) => {
    if (score >= 90) return { color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 80) return { color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employees.map((employee) => {
          const performanceColors = getPerformanceScore(employee.performanceScore);
          
          return (
            <div key={employee.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              {/* Header עם תמונה ופעולות */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setSelectedEmployee(selectedEmployee === employee.id ? null : employee.id)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  {selectedEmployee === employee.id && (
                    <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setSelectedEmployeeId(employee.id);
                            setModalMode('view');
                            setShowEmployeeModal(true);
                            setSelectedEmployee(null);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
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
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <Edit className="w-4 h-4 ml-2" />
                          ערוך פרטים
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <LogOut className="w-4 h-4 ml-2" />
                          התחל תהליך Offboarding
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* פרטי עובד בסיסיים */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {employee.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {employee.role}
                </p>
                <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <Building2 className="w-3 h-3 ml-1" />
                  {employee.department}
                </div>
              </div>

              {/* סטטוס */}
              <div className="flex items-center justify-center mb-4">
                {getStatusBadge(employee.status)}
              </div>

              {/* ביצועים */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">ביצועים</span>
                  <span className={`text-sm font-medium ${performanceColors.color}`}>
                    {employee.performanceScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      employee.performanceScore >= 90 ? 'bg-green-500' :
                      employee.performanceScore >= 80 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${employee.performanceScore}%` }}
                  ></div>
                </div>
              </div>

              {/* פרטים נוספים */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">מנהל ישיר:</span>
                  <span className="text-gray-700 dark:text-gray-300">{employee.manager}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">תאריך קליטה:</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {new Date(employee.hireDate).toLocaleDateString('he-IL')}
                  </span>
                </div>
              </div>

              {/* רמת סיכון */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-center">
                  {getRiskLevelBadge(employee.riskLevel)}
                </div>
              </div>

              {/* פעולות מהירות */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-center space-x-3 space-x-reverse">
                  <button
                    onClick={() => {
                      setSelectedEmployeeId(employee.id);
                      setModalMode('view');
                      setShowEmployeeModal(true);
                    }}
                    className="flex items-center px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Eye className="w-3 h-3 ml-1" />
                    צפה
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEmployeeId(employee.id);
                      setModalMode('edit');
                      setShowEmployeeModal(true);
                    }}
                    className="flex items-center px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Edit className="w-3 h-3 ml-1" />
                    ערוך
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {employees.length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">אין עובדים להצגה</h3>
          <p className="text-gray-600 dark:text-gray-400">לא נמצאו עובדים התואמים לחיפוש שלך</p>
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
    </>
  );
}