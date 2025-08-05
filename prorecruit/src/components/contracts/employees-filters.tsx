'use client';

import { Search, Filter, X } from 'lucide-react';

interface EmployeesFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export function EmployeesFilters({
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedStatus,
  onStatusChange
}: EmployeesFiltersProps) {
  const hasActiveFilters = selectedDepartment !== 'all' || selectedStatus !== 'all';

  const clearAllFilters = () => {
    onDepartmentChange('all');
    onStatusChange('all');
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Filter size={20} className="text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">סינון וחיפוש</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1 space-x-reverse"
          >
            <X size={16} />
            <span>נקה הכל</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש עובדים..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Department Filter */}
        <div>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל המחלקות</option>
            <option value="development">פיתוח</option>
            <option value="qa">איכות</option>
            <option value="devops">תשתיות</option>
            <option value="management">ניהול</option>
            <option value="design">עיצוב</option>
            <option value="marketing">שיווק</option>
            <option value="hr">משאבי אנוש</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל הסטטוסים</option>
            <option value="active">פעיל</option>
            <option value="probation">בתקופת ניסיון</option>
            <option value="on_leave">בחופשה</option>
            <option value="terminated">פורש</option>
            <option value="suspended">מושעה</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedDepartment !== 'all' && (
            <div className="flex items-center space-x-2 space-x-reverse bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <span>מחלקה: {selectedDepartment}</span>
              <button
                onClick={() => onDepartmentChange('all')}
                className="hover:text-blue-600"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {selectedStatus !== 'all' && (
            <div className="flex items-center space-x-2 space-x-reverse bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <span>סטטוס: {selectedStatus}</span>
              <button
                onClick={() => onStatusChange('all')}
                className="hover:text-green-600"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 