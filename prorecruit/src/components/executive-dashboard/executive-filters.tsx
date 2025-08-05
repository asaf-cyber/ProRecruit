'use client';

import { useState } from 'react';
import { 
  Filter, 
  Calendar, 
  Building2, 
  Users, 
  Briefcase,
  X
} from 'lucide-react';

interface ExecutiveFiltersProps {
  selectedDepartment: string;
  onDepartmentChange: (department: string) => void;
  selectedClient: string;
  onClientChange: (client: string) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  jobType: string;
  onJobTypeChange: (type: string) => void;
}

export function ExecutiveFilters({
  selectedDepartment,
  onDepartmentChange,
  selectedClient,
  onClientChange,
  dateRange,
  onDateRangeChange,
  jobType,
  onJobTypeChange
}: ExecutiveFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const departments = [
    { value: 'all', label: 'כל המחלקות' },
    { value: 'rd', label: 'R&D' },
    { value: 'product', label: 'מוצר' },
    { value: 'marketing', label: 'שיווק' },
    { value: 'sales', label: 'מכירות' },
    { value: 'hr', label: 'משאבי אנוש' },
    { value: 'finance', label: 'כספים' },
    { value: 'operations', label: 'תפעול' }
  ];

  const clients = [
    { value: 'all', label: 'כל הלקוחות' },
    { value: 'client1', label: 'חברת טכנולוגיה א' },
    { value: 'client2', label: 'חברת פיננסים ב' },
    { value: 'client3', label: 'חברת ייצור ג' },
    { value: 'client4', label: 'חברת שירותים ד' }
  ];

  const dateRanges = [
    { value: 'last-week', label: 'שבוע אחרון' },
    { value: 'last-month', label: 'חודש אחרון' },
    { value: 'last-quarter', label: 'רבעון אחרון' },
    { value: 'last-year', label: 'שנה אחרונה' },
    { value: 'ytd', label: 'שנה עד כה' },
    { value: 'custom', label: 'טווח מותאם' }
  ];

  const jobTypes = [
    { value: 'all', label: 'כל סוגי המשרות' },
    { value: 'full-time', label: 'משרה מלאה' },
    { value: 'part-time', label: 'משרה חלקית' },
    { value: 'contract', label: 'חוזה' },
    { value: 'freelance', label: 'פרילנס' },
    { value: 'internship', label: 'התמחות' }
  ];

  const activeFilters = [
    selectedDepartment !== 'all' && departments.find(d => d.value === selectedDepartment)?.label,
    selectedClient !== 'all' && clients.find(c => c.value === selectedClient)?.label,
    dateRanges.find(d => d.value === dateRange)?.label,
    jobType !== 'all' && jobTypes.find(j => j.value === jobType)?.label
  ].filter(Boolean);

  const clearAllFilters = () => {
    onDepartmentChange('all');
    onClientChange('all');
    onDateRangeChange('last-quarter');
    onJobTypeChange('all');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">מסננים מתקדמים</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-600 hover:text-gray-800"
          >
            {isExpanded ? 'הסתר' : 'הצג'}
          </button>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="mt-3 flex items-center space-x-2 space-x-reverse flex-wrap">
            <span className="text-sm text-gray-600">מסננים פעילים:</span>
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1 space-x-reverse px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                <span>{filter}</span>
                <button
                  onClick={() => {
                    // Clear specific filter logic
                    if (filter === departments.find(d => d.value === selectedDepartment)?.label) {
                      onDepartmentChange('all');
                    } else if (filter === clients.find(c => c.value === selectedClient)?.label) {
                      onClientChange('all');
                    } else if (filter === jobTypes.find(j => j.value === jobType)?.label) {
                      onJobTypeChange('all');
                    }
                  }}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-800"
            >
              נקה הכל
            </button>
          </div>
        )}
      </div>

      {/* Filters Content */}
      {isExpanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4 inline mr-1" />
                מחלקה
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => onDepartmentChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Client Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                לקוח
              </label>
              <select
                value={selectedClient}
                onChange={(e) => onClientChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {clients.map((client) => (
                  <option key={client.value} value={client.value}>
                    {client.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                טווח תאריכים
              </label>
              <select
                value={dateRange}
                onChange={(e) => onDateRangeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-1" />
                סוג משרה
              </label>
              <select
                value={jobType}
                onChange={(e) => onJobTypeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {jobTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Custom Date Range (if selected) */}
          {dateRange === 'custom' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  מתאריך
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  עד תאריך
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 