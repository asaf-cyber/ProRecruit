'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Building,
  Briefcase,
  FileText,
  Edit,
  Save,
  X
} from 'lucide-react';

interface EmployeeDetailsTabProps {
  employeeId: string;
}

interface EmployeeDetails {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    idNumber: string;
    birthDate: string;
  };
  employmentInfo: {
    role: string;
    department: string;
    manager: string;
    hireDate: string;
    contractType: string;
    salary: number;
    workLocation: string;
    workSchedule: string;
  };
}

export function EmployeeDetailsTab({ employeeId }: EmployeeDetailsTabProps) {
  const [employee, setEmployee] = useState<EmployeeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<EmployeeDetails | null>(null);

  useEffect(() => {
    // Mock data - בפועל זה יגיע מה-API
    const mockEmployee: EmployeeDetails = {
      id: employeeId,
      personalInfo: {
        firstName: 'דוד',
        lastName: 'לוי',
        email: 'david.levy@company.com',
        phone: '050-1234567',
        address: 'רחוב הרצל 123',
        city: 'תל אביב',
        idNumber: '123456789',
        birthDate: '1990-05-15'
      },
      employmentInfo: {
        role: 'מפתח Full Stack',
        department: 'פיתוח',
        manager: 'שרה כהן',
        hireDate: '2023-01-15',
        contractType: 'קבוע',
        salary: 25000,
        workLocation: 'תל אביב',
        workSchedule: 'ראשון-חמישי, 9:00-17:00'
      }
    };

    setTimeout(() => {
      setEmployee(mockEmployee);
      setEditedEmployee(mockEmployee);
      setIsLoading(false);
    }, 1000);
  }, [employeeId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // בפועל זה יישלח ל-API
    setEmployee(editedEmployee);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedEmployee(employee);
    setIsEditing(false);
  };

  const handleInputChange = (section: 'personalInfo' | 'employmentInfo', field: string, value: string) => {
    if (editedEmployee) {
      setEditedEmployee({
        ...editedEmployee,
        [section]: {
          ...editedEmployee[section],
          [field]: value
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-8">
        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">לא נמצאו פרטי עובד</p>
      </div>
    );
  }

  const currentData = isEditing ? editedEmployee : employee;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">פרטי עובד</h2>
        <div className="flex items-center space-x-2 space-x-reverse">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>ערוך</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>שמור</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>ביטול</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center space-x-2 space-x-reverse mb-4">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">פרטים אישיים</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">שם פרטי</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentData?.personalInfo.firstName}
                    onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{currentData?.personalInfo.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">שם משפחה</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentData?.personalInfo.lastName}
                    onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{currentData?.personalInfo.lastName}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">אימייל</label>
              {isEditing ? (
                <input
                  type="email"
                  value={currentData?.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{currentData?.personalInfo.email}</p>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">טלפון</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={currentData?.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{currentData?.personalInfo.phone}</p>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">כתובת</label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentData?.personalInfo.address}
                  onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{currentData?.personalInfo.address}, {currentData?.personalInfo.city}</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">תעודת זהות</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentData?.personalInfo.idNumber}
                    onChange={(e) => handleInputChange('personalInfo', 'idNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{currentData?.personalInfo.idNumber}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">תאריך לידה</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={currentData?.personalInfo.birthDate}
                    onChange={(e) => handleInputChange('personalInfo', 'birthDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{new Date(currentData?.personalInfo.birthDate || '').toLocaleDateString('he-IL')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center space-x-2 space-x-reverse mb-4">
            <Briefcase className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">פרטי העסקה</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">תפקיד</label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentData?.employmentInfo.role}
                  onChange={(e) => handleInputChange('employmentInfo', 'role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{currentData?.employmentInfo.role}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">מחלקה</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentData?.employmentInfo.department}
                    onChange={(e) => handleInputChange('employmentInfo', 'department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Building className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{currentData?.employmentInfo.department}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">מנהל ישיר</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentData?.employmentInfo.manager}
                    onChange={(e) => handleInputChange('employmentInfo', 'manager', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{currentData?.employmentInfo.manager}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">תאריך קליטה</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={currentData?.employmentInfo.hireDate}
                    onChange={(e) => handleInputChange('employmentInfo', 'hireDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{new Date(currentData?.employmentInfo.hireDate || '').toLocaleDateString('he-IL')}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">סוג חוזה</label>
                {isEditing ? (
                  <select
                    value={currentData?.employmentInfo.contractType}
                    onChange={(e) => handleInputChange('employmentInfo', 'contractType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="קבוע">קבוע</option>
                    <option value="זמני">זמני</option>
                    <option value="פרויקט">פרויקט</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{currentData?.employmentInfo.contractType}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">משכורת</label>
              {isEditing ? (
                <input
                  type="number"
                  value={currentData?.employmentInfo.salary}
                  onChange={(e) => handleInputChange('employmentInfo', 'salary', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">₪{currentData?.employmentInfo.salary?.toLocaleString()}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">מיקום עבודה</label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentData?.employmentInfo.workLocation}
                  onChange={(e) => handleInputChange('employmentInfo', 'workLocation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{currentData?.employmentInfo.workLocation}</p>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">לוח זמנים</label>
              {isEditing ? (
                <input
                  type="text"
                  value={currentData?.employmentInfo.workSchedule}
                  onChange={(e) => handleInputChange('employmentInfo', 'workSchedule', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{currentData?.employmentInfo.workSchedule}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 