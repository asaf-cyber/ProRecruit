'use client';

import { Search, Filter, X } from 'lucide-react';

interface JobsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  selectedClient: string;
  onClientChange: (client: string) => void;
  selectedManager: string;
  onManagerChange: (manager: string) => void;
  dateRange: {start: string; end: string};
  onDateRangeChange: (range: {start: string; end: string}) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function JobsFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedDepartment,
  onDepartmentChange,
  selectedClient,
  onClientChange,
  selectedManager,
  onManagerChange,
  dateRange,
  onDateRangeChange,
  selectedTags,
  onTagsChange
}: JobsFiltersProps) {
  const statusOptions = [
    { value: 'all', label: 'כל הסטטוסים' },
    { value: 'draft', label: 'טיוטה' },
    { value: 'published', label: 'פורסמה' },
    { value: 'closed', label: 'סגורה' },
    { value: 'on_hold', label: 'מושהית' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'כל המחלקות' },
    { value: 'פיתוח', label: 'פיתוח' },
    { value: 'עיצוב', label: 'עיצוב' },
    { value: 'נתונים', label: 'נתונים' },
    { value: 'ניהול', label: 'ניהול' },
    { value: 'משאבי אנוש', label: 'משאבי אנוש' },
    { value: 'מכירות', label: 'מכירות' },
    { value: 'שיווק', label: 'שיווק' },
    { value: 'פעילות', label: 'פעילות' }
  ];

  const clientOptions = [
    { value: 'all', label: 'כל הלקוחות' },
    { value: 'חברת הטכנולוגיה המתקדמת', label: 'חברת הטכנולוגיה המתקדמת' },
    { value: 'משרד הביטחון', label: 'משרד הביטחון' },
    { value: 'בנק לאומי', label: 'בנק לאומי' },
    { value: 'רפאל מערכות לחימה', label: 'רפאל מערכות לחימה' }
  ];

  const managerOptions = [
    { value: 'all', label: 'כל המנהלים' },
    { value: 'יוסי גולדברג', label: 'יוסי גולדברג' },
    { value: 'שרה לוי', label: 'שרה לוי' },
    { value: 'מיכל רוזן', label: 'מיכל רוזן' },
    { value: 'דוד כהן', label: 'דוד כהן' }
  ];

  const availableTags = ['Senior', 'Full Stack', 'UX', 'UI', 'Data', 'Analytics', 'Management', 'Technical', 'Agile', 'דחוף', 'ביטחוני'];

  const clearFilters = () => {
    onSearchChange('');
    onStatusChange('all');
    onDepartmentChange('all');
    onClientChange('all');
    onManagerChange('all');
    onDateRangeChange({start: '', end: ''});
    onTagsChange([]);
  };

  const hasActiveFilters = searchQuery || selectedStatus !== 'all' || selectedDepartment !== 'all' || 
                          selectedClient !== 'all' || selectedManager !== 'all' || 
                          dateRange.start || dateRange.end || selectedTags.length > 0;

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

      {/* First Row - Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="חיפוש משרות..."
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

        {/* Client Filter */}
        <div>
          <select
            value={selectedClient}
            onChange={(e) => onClientChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {clientOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Second Row - Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Manager Filter */}
        <div>
          <select
            value={selectedManager}
            onChange={(e) => onManagerChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {managerOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range - Start */}
        <div>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => onDateRangeChange({...dateRange, start: e.target.value})}
            placeholder="תאריך התחלה"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Date Range - End */}
        <div>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => onDateRangeChange({...dateRange, end: e.target.value})}
            placeholder="תאריך סיום"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tags Filter */}
        <div>
          <select
            multiple
            value={selectedTags}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, option => option.value);
              onTagsChange(values);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            size={1}
          >
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
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
            {selectedClient !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                לקוח: {clientOptions.find(c => c.value === selectedClient)?.label}
                <button
                  onClick={() => onClientChange('all')}
                  className="mr-2 hover:text-orange-600"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedManager !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
                מנהל: {managerOptions.find(m => m.value === selectedManager)?.label}
                <button
                  onClick={() => onManagerChange('all')}
                  className="mr-2 hover:text-indigo-600"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {(dateRange.start || dateRange.end) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-800">
                תאריכים: {dateRange.start} - {dateRange.end}
                <button
                  onClick={() => onDateRangeChange({start: '', end: ''})}
                  className="mr-2 hover:text-pink-600"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {selectedTags.map((tag) => (
              <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-800">
                תג: {tag}
                <button
                  onClick={() => onTagsChange(selectedTags.filter(t => t !== tag))}
                  className="mr-2 hover:text-teal-600"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 