'use client';

import { Search, Filter, X } from 'lucide-react';

interface VendorsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSpecialization: string;
  onSpecializationChange: (specialization: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export function VendorsFilters({
  searchQuery,
  onSearchChange,
  selectedSpecialization,
  onSpecializationChange,
  selectedStatus,
  onStatusChange
}: VendorsFiltersProps) {
  const specializations = [
    { value: 'all', label: 'כל התמחויות' },
    { value: 'medical', label: 'רפואי' },
    { value: 'security', label: 'ביטחון' },
    { value: 'background_check', label: 'בדיקת רקע' },
    { value: 'testing', label: 'בדיקות' },
    { value: 'training', label: 'הדרכות' },
    { value: 'legal', label: 'משפטי' },
    { value: 'other', label: 'אחר' }
  ];

  const statuses = [
    { value: 'all', label: 'כל הסטטוסים' },
    { value: 'active', label: 'פעיל' },
    { value: 'inactive', label: 'לא פעיל' },
    { value: 'pending', label: 'ממתין לאישור' },
    { value: 'suspended', label: 'מושעה' }
  ];

  const clearFilters = () => {
    onSearchChange('');
    onSpecializationChange('all');
    onStatusChange('all');
  };

  const hasActiveFilters = searchQuery || selectedSpecialization !== 'all' || selectedStatus !== 'all';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">סינון וחיפוש</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={16} />
            נקה סינון
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש ספקים..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Specialization Filter */}
        <select
          value={selectedSpecialization}
          onChange={(e) => onSpecializationChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {specializations.map((spec) => (
            <option key={spec.value} value={spec.value}>
              {spec.label}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                חיפוש: {searchQuery}
                <button
                  onClick={() => onSearchChange('')}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedSpecialization !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                התמחות: {specializations.find(s => s.value === selectedSpecialization)?.label}
                <button
                  onClick={() => onSpecializationChange('all')}
                  className="hover:bg-green-200 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedStatus !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                סטטוס: {statuses.find(s => s.value === selectedStatus)?.label}
                <button
                  onClick={() => onStatusChange('all')}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 