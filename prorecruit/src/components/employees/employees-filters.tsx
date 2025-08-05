'use client';

import { Search, Filter, X } from 'lucide-react';

interface EmployeesFiltersProps {
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  selectedManager: string;
  onManagerChange: (manager: string) => void;
  selectedRole: string;
  onRoleChange: (role: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function EmployeesFilters({
  selectedDepartment,
  onDepartmentChange,
  selectedManager,
  onManagerChange,
  selectedRole,
  onRoleChange,
  searchQuery,
  onSearchChange
}: EmployeesFiltersProps) {
  // Mock data - בפועל זה יגיע מה-API
  const departments = [
    { id: 'all', name: 'כל המחלקות' },
    { id: 'development', name: 'פיתוח' },
    { id: 'design', name: 'עיצוב' },
    { id: 'marketing', name: 'שיווק' },
    { id: 'sales', name: 'מכירות' },
    { id: 'hr', name: 'משאבי אנוש' },
    { id: 'finance', name: 'כספים' }
  ];

  const managers = [
    { id: 'all', name: 'כל המנהלים' },
    { id: 'david-levy', name: 'דוד לוי' },
    { id: 'sarah-cohen', name: 'שרה כהן' },
    { id: 'michal-rosen', name: 'מיכל רוזן' },
    { id: 'yossi-cohen', name: 'יוסי כהן' }
  ];

  const roles = [
    { id: 'all', name: 'כל התפקידים' },
    { id: 'developer', name: 'מפתח' },
    { id: 'designer', name: 'מעצב' },
    { id: 'manager', name: 'מנהל' },
    { id: 'analyst', name: 'אנליסט' },
    { id: 'coordinator', name: 'רכז' }
  ];

  const hasActiveFilters = selectedDepartment !== 'all' || 
                          selectedManager !== 'all' || 
                          selectedRole !== 'all' || 
                          searchQuery !== '';

  const clearAllFilters = () => {
    onDepartmentChange('all');
    onManagerChange('all');
    onRoleChange('all');
    onSearchChange('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">סינון וחיפוש</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600 hover:text-gray-800"
          >
            <X className="w-4 h-4" />
            <span>נקה סינון</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="חיפוש עובדים לפי שם, תפקיד או מחלקה..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">מחלקה</label>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Manager Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">מנהל ישיר</label>
          <select
            value={selectedManager}
            onChange={(e) => onManagerChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">תפקיד</label>
          <select
            value={selectedRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {selectedDepartment !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                מחלקה: {departments.find(d => d.id === selectedDepartment)?.name}
                <button
                  onClick={() => onDepartmentChange('all')}
                  className="mr-1 ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedManager !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                מנהל: {managers.find(m => m.id === selectedManager)?.name}
                <button
                  onClick={() => onManagerChange('all')}
                  className="mr-1 ml-2 text-green-600 hover:text-green-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedRole !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                תפקיד: {roles.find(r => r.id === selectedRole)?.name}
                <button
                  onClick={() => onRoleChange('all')}
                  className="mr-1 ml-2 text-purple-600 hover:text-purple-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                חיפוש: {searchQuery}
                <button
                  onClick={() => onSearchChange('')}
                  className="mr-1 ml-2 text-gray-600 hover:text-gray-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 