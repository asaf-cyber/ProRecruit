'use client';

import { useState } from 'react';
import { 
  Plus, 
  Download, 
  Upload, 
  MoreHorizontal,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings
} from 'lucide-react';

export function OnboardingHeader() {
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">קליטת עובדים</h1>
          <p className="text-gray-600 mt-1">ניהול תהליך קליטה אוטומטי ועדכון סטטוס</p>
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
                    ייצא דוח קליטה
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Upload size={16} className="ml-3" />
                    ייבא תבניות
                  </button>
                  <hr className="my-1" />
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings size={16} className="ml-3" />
                    הגדרות תבניות
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <AlertCircle size={16} className="ml-3" />
                    התראות אוטומטיות
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Add New Onboarding Button */}
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2">
            <Plus size={16} className="ml-2" />
            התחל קליטה חדשה
          </button>
        </div>
      </div>

      {/* Quick Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900">תהליך קליטה אוטומטי</h3>
            <p className="text-blue-700 text-sm">
              המערכת מפעילה אוטומטית תהליך קליטה מותאם אישית ברגע חתימת החוזה. 
              כל המשימות נשלחות אוטומטית לעובד ולמנהל האחראי עם תזכורות חכמות.
            </p>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-blue-600">
            <CheckCircle className="w-4 h-4" />
            <span>פעיל</span>
          </div>
        </div>
      </div>
    </div>
  );
} 