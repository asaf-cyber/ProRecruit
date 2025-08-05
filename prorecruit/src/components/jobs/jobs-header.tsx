'use client';

import { useState } from 'react';
import { 
  Plus, 
  Download, 
  Upload, 
  MoreHorizontal,
  Briefcase,
  Users,
  Clock,
  TrendingUp
} from 'lucide-react';

interface JobsHeaderProps {
  onCreateJob: () => void;
}

export function JobsHeader({ onCreateJob }: JobsHeaderProps) {
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const stats = [
    { label: 'סה"כ משרות', value: '89', icon: Briefcase, color: 'text-blue-600' },
    { label: 'משרות פתוחות', value: '34', icon: Users, color: 'text-green-600' },
    { label: 'בתהליך גיוס', value: '23', icon: Clock, color: 'text-purple-600' },
    { label: 'ממוצע ימים לגיוס', value: '18', icon: TrendingUp, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ניהול משרות</h1>
          <p className="text-gray-600 mt-1">יצירה, עריכה וניהול משרות פתוחות וסגורות</p>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <MoreHorizontal size={20} />
            </button>
            
            {showActionsMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Download size={16} className="ml-3" />
                    ייצא משרות
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Upload size={16} className="ml-3" />
                    ייבא משרות
                  </button>
                  <hr className="my-1" />
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Briefcase size={16} className="ml-3" />
                    דוח משרות
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Create New Job Button */}
          <button 
            onClick={onCreateJob}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
          >
            <Plus size={16} className="ml-2" />
            צור משרה חדשה
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 