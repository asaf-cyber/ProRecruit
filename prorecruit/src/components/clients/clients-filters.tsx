'use client';

import { Search, Filter, X } from 'lucide-react';

interface ClientsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
}

export function ClientsFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedDepartment,
  onDepartmentChange
}: ClientsFiltersProps) {
  const statusOptions = [
    { value: 'all', label: 'כל הסטטוסים' },
    { value: 'active', label: 'פעיל' },
    { value: 'inactive', label: 'לא פעיל' },
    { value: 'prospect', label: 'לקוח פוטנציאלי' },
    { value: 'vip', label: 'לקוח VIP' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'כל המחלקות' },
    { value: 'tech', label: 'טכנולוגיה' },
    { value: 'finance', label: 'פיננסים' },
    { value: 'healthcare', label: 'בריאות' },
    { value: 'retail', label: 'קמעונאות' },
    { value: 'manufacturing', label: 'ייצור' }
  ];

  const clearFilters = () => {
    onSearchChange('');
    onStatusChange('all');
    onDepartmentChange('all');
  };

  const hasActiveFilters = searchQuery || selectedStatus !== 'all' || selectedDepartment !== 'all';

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">סינון וחיפוש</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <X size={16} className="ml-1" />
            נקה פילטרים
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="חיפוש לקוחות..."
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div>
          <select
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                חיפוש: {searchQuery}
                <button
                  onClick={() => onSearchChange('')}
                  className="mr-2 hover:text-blue-600"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedStatus !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                סטטוס: {statusOptions.find(s => s.value === selectedStatus)?.label}
                <button
                  onClick={() => onStatusChange('all')}
                  className="mr-2 hover:text-green-600"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedDepartment !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                מחלקה: {departmentOptions.find(d => d.value === selectedDepartment)?.label}
                <button
                  onClick={() => onDepartmentChange('all')}
                  className="mr-2 hover:text-purple-600"
                >
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 