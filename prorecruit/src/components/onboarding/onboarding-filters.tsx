'use client';

import { 
  Search, 
  Filter, 
  X, 
  Calendar,
  Users,
  Building
} from 'lucide-react';

interface OnboardingFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  selectedManager: string;
  onManagerChange: (manager: string) => void;
}

export function OnboardingFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedDepartment,
  onDepartmentChange,
  selectedManager,
  onManagerChange
}: OnboardingFiltersProps) {
  const statusOptions = [
    { value: 'all', label: 'כל הסטטוסים' },
    { value: 'in_progress', label: 'בתהליך' },
    { value: 'completed', label: 'הושלם' },
    { value: 'overdue', label: 'עבר זמנו' },
    { value: 'not_started', label: 'לא התחיל' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'כל המחלקות' },
    { value: 'engineering', label: 'הנדסה' },
    { value: 'sales', label: 'מכירות' },
    { value: 'marketing', label: 'שיווק' },
    { value: 'hr', label: 'משאבי אנוש' },
    { value: 'finance', label: 'כספים' },
    { value: 'operations', label: 'תפעול' }
  ];

  const managerOptions = [
    { value: 'all', label: 'כל המנהלים' },
    { value: 'manager1', label: 'דן כהן' },
    { value: 'manager2', label: 'שרה לוי' },
    { value: 'manager3', label: 'מיכאל רוזנברג' },
    { value: 'manager4', label: 'נועה אברהם' }
  ];

  const clearAllFilters = () => {
    onSearchChange('');
    onStatusChange('all');
    onDepartmentChange('all');
    onManagerChange('all');
  };

  const hasActiveFilters = searchQuery || selectedStatus !== 'all' || selectedDepartment !== 'all' || selectedManager !== 'all';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          סינון וחיפוש
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            נקה הכל
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            חיפוש
          </label>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="שם עובד, תפקיד, מחלקה..."
              className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            סטטוס
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Building className="w-4 h-4 mr-1" />
            מחלקה
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {departmentOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Manager Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Users className="w-4 h-4 mr-1" />
            מנהל אחראי
          </label>
          <select
            value={selectedManager}
            onChange={(e) => onManagerChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {managerOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">פילטרים פעילים:</h4>
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                חיפוש: "{searchQuery}"
              </span>
            )}
            {selectedStatus !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                סטטוס: {statusOptions.find(s => s.value === selectedStatus)?.label}
              </span>
            )}
            {selectedDepartment !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                מחלקה: {departmentOptions.find(d => d.value === selectedDepartment)?.label}
              </span>
            )}
            {selectedManager !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                מנהל: {managerOptions.find(m => m.value === selectedManager)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 