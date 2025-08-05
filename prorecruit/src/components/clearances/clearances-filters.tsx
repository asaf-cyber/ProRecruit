'use client';

import { Search, Filter, X } from 'lucide-react';

interface ClearancesFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedJob: string;
  onJobChange: (job: string) => void;
  selectedManager: string;
  onManagerChange: (manager: string) => void;
}

export function ClearancesFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedJob,
  onJobChange,
  selectedManager,
  onManagerChange
}: ClearancesFiltersProps) {
  const hasActiveFilters = selectedStatus !== 'all' || selectedJob !== 'all' || selectedManager !== 'all';

  const clearAllFilters = () => {
    onStatusChange('all');
    onJobChange('all');
    onManagerChange('all');
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש מועמדים..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל הסטטוסים</option>
            <option value="pending_forms">ממתין לטפסים</option>
            <option value="forms_submitted">טפסים הוגשו</option>
            <option value="submitted_to_mod">הוגש למשרד הביטחון</option>
            <option value="interview_scheduled">תחקיר מתוזמן</option>
            <option value="interview_completed">תחקיר הושלם</option>
            <option value="approved">אושר</option>
            <option value="qso_briefing">תדרוך קב"ט</option>
            <option value="completed">הושלם</option>
            <option value="rejected">נדחה</option>
          </select>
        </div>

        {/* Job Filter */}
        <div>
          <select
            value={selectedJob}
            onChange={(e) => onJobChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל המשרות</option>
            <option value="fullstack">מפתח Full-Stack</option>
            <option value="frontend">מפתח Frontend</option>
            <option value="backend">מפתח Backend</option>
            <option value="devops">DevOps Engineer</option>
            <option value="qa">QA Engineer</option>
            <option value="pm">Project Manager</option>
          </select>
        </div>

        {/* Manager Filter */}
        <div>
          <select
            value={selectedManager}
            onChange={(e) => onManagerChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל המנהלים</option>
            <option value="david">דוד כהן</option>
            <option value="sarah">שרה לוי</option>
            <option value="michael">מיכאל רוזן</option>
            <option value="rachel">רחל גולדברג</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedStatus !== 'all' && (
            <div className="flex items-center space-x-2 space-x-reverse bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <span>סטטוס: {selectedStatus}</span>
              <button
                onClick={() => onStatusChange('all')}
                className="hover:text-blue-600"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {selectedJob !== 'all' && (
            <div className="flex items-center space-x-2 space-x-reverse bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <span>משרה: {selectedJob}</span>
              <button
                onClick={() => onJobChange('all')}
                className="hover:text-green-600"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {selectedManager !== 'all' && (
            <div className="flex items-center space-x-2 space-x-reverse bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              <span>מנהל: {selectedManager}</span>
              <button
                onClick={() => onManagerChange('all')}
                className="hover:text-purple-600"
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