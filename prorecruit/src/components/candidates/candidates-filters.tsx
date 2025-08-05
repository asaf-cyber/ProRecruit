'use client';

import { Search, Filter, X } from 'lucide-react';

interface CandidatesFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedSource: string;
  onSourceChange: (source: string) => void;
}

export function CandidatesFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedSource,
  onSourceChange
}: CandidatesFiltersProps) {
  const statusOptions = [
    { value: 'all', label: 'כל הסטטוסים' },
    { value: 'applied', label: 'הוגשה מועמדות' },
    { value: 'phone_screen', label: 'שיחת טלפון' },
    { value: 'interview', label: 'בראיון' },
    { value: 'offer', label: 'הצעה' },
    { value: 'rejected', label: 'נדחה' },
    { value: 'hired', label: 'הועסק' }
  ];

  const sourceOptions = [
    { value: 'all', label: 'כל המקורות' },
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'חבר מביא חבר', label: 'חבר מביא חבר' },
    { value: 'אתר החברה', label: 'אתר החברה' },
    { value: 'לוח דרושים', label: 'לוח דרושים' },
    { value: 'פנייה ישירה', label: 'פנייה ישירה' }
  ];

  const clearFilters = () => {
    onSearchChange('');
    onStatusChange('all');
    onSourceChange('all');
  };

  const hasActiveFilters = searchQuery || selectedStatus !== 'all' || selectedSource !== 'all';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">סינון וחיפוש</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={16} className="ml-1" />
            נקה פילטרים
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="חיפוש מועמדים..."
            className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Source Filter */}
        <div>
          <select
            value={selectedSource}
            onChange={(e) => onSourceChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {sourceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                חיפוש: {searchQuery}
                <button
                  onClick={() => onSearchChange('')}
                  className="mr-2 hover:text-blue-600 dark:hover:text-blue-300"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedStatus !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                סטטוס: {statusOptions.find(s => s.value === selectedStatus)?.label}
                <button
                  onClick={() => onStatusChange('all')}
                  className="mr-2 hover:text-green-600 dark:hover:text-green-300"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedSource !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                מקור: {sourceOptions.find(s => s.value === selectedSource)?.label}
                <button
                  onClick={() => onSourceChange('all')}
                  className="mr-2 hover:text-purple-600 dark:hover:text-purple-300"
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