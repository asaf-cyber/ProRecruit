'use client';

import { Search, Filter, X } from 'lucide-react';

interface ContractsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedClient: string;
  onClientChange: (client: string) => void;
}

export function ContractsFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedClient,
  onClientChange
}: ContractsFiltersProps) {
  const hasActiveFilters = selectedStatus !== 'all' || selectedClient !== 'all';

  const clearAllFilters = () => {
    onStatusChange('all');
    onClientChange('all');
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
            placeholder="חיפוש חוזים..."
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
            <option value="draft">טיוטה</option>
            <option value="sent">נשלח</option>
            <option value="signed">חתום</option>
            <option value="expired">פג תוקף</option>
            <option value="terminated">בוטל</option>
          </select>
        </div>

        {/* Client Filter */}
        <div>
          <select
            value={selectedClient}
            onChange={(e) => onClientChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל הלקוחות</option>
            <option value="tech_corp">חברת טכנולוגיה מתקדמת</option>
            <option value="startup_inc">סטארט-אפ חדשני</option>
            <option value="enterprise_solutions">פתרונות ארגוניים</option>
            <option value="digital_agency">סוכנות דיגיטלית</option>
            <option value="fintech_ltd">פינטק בע"מ</option>
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
          {selectedClient !== 'all' && (
            <div className="flex items-center space-x-2 space-x-reverse bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              <span>לקוח: {selectedClient}</span>
              <button
                onClick={() => onClientChange('all')}
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