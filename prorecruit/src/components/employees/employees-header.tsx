'use client';

import { Users, Plus, Download, Upload } from 'lucide-react';

export function EmployeesHeader() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ניהול עובדים</h1>
            <p className="text-gray-600">מרכז הניהול של כל העובדים בחברה</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Upload className="w-4 h-4" />
            <span>ייבא עובדים</span>
          </button>
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            <span>ייצא נתונים</span>
          </button>
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>הוסף עובד</span>
          </button>
        </div>
      </div>
    </div>
  );
} 