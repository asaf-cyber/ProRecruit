'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface EmployeeProfileHeaderProps {
  employeeId: string;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  manager: string;
  hireDate: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: 'active' | 'inactive' | 'on_leave';
  riskLevel: 'low' | 'medium' | 'high';
  performanceScore: number;
}

export function EmployeeProfileHeader({ employeeId }: EmployeeProfileHeaderProps) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - בפועל זה יגיע מה-API
    const mockEmployee: Employee = {
      id: employeeId,
      name: 'דוד לוי',
      role: 'מפתח Full Stack',
      department: 'פיתוח',
      manager: 'שרה כהן',
      hireDate: '2023-01-15',
      email: 'david.levy@company.com',
      phone: '050-1234567',
      location: 'תל אביב',
      avatar: '/api/placeholder/80/80',
      status: 'active',
      riskLevel: 'low',
      performanceScore: 92
    };

    setTimeout(() => {
      setEmployee(mockEmployee);
      setIsLoading(false);
    }, 1000);
  }, [employeeId]);

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
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status as keyof typeof colors]}`}>
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
      'low': 'סיכון נמוך',
      'medium': 'סיכון בינוני',
      'high': 'סיכון גבוה'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[riskLevel as keyof typeof colors]}`}>
        {labels[riskLevel as keyof typeof labels]}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">לא נמצא עובד</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-6 space-x-reverse">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-gray-600" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
              {getStatusBadge(employee.status)}
              {getRiskLevelBadge(employee.riskLevel)}
            </div>
            
            <div className="text-gray-600">
              <p className="text-lg">{employee.role}</p>
              <p className="text-sm">{employee.department} • מנהל ישיר: {employee.manager}</p>
            </div>
            
            <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Mail className="w-4 h-4" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Phone className="w-4 h-4" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <MapPin className="w-4 h-4" />
                <span>{employee.location}</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                <Calendar className="w-4 h-4" />
                <span>קליטה: {new Date(employee.hireDate).toLocaleDateString('he-IL')}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{employee.performanceScore}%</div>
            <div className="text-sm text-gray-500">ציון ביצועים</div>
          </div>
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Edit className="w-4 h-4" />
            <span>ערוך פרופיל</span>
          </button>
        </div>
      </div>
    </div>
  );
} 