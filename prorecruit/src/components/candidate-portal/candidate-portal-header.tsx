'use client';

import { Bell, Settings, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function CandidatePortalHeader() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data - in real app this would come from props or context
  const candidate = {
    name: 'דוד כהן',
    email: 'david.cohen@email.com',
    avatar: '/api/placeholder/40/40',
    notifications: 3
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumb */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <h1 className="text-xl font-semibold text-gray-900">פורטל מועמד</h1>
          <div className="text-sm text-gray-500">
            ברוך הבא, {candidate.name}
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {candidate.notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {candidate.notifications}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900">הודעות</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
                    <div className="text-sm font-medium text-gray-900">ראיון נקבע</div>
                    <div className="text-xs text-gray-500">ראיון טכני למשרת Fullstack Developer נקבע ליום שלישי</div>
                    <div className="text-xs text-gray-400 mt-1">לפני 2 שעות</div>
                  </div>
                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
                    <div className="text-sm font-medium text-gray-900">מסמך נדרש</div>
                    <div className="text-xs text-gray-500">נדרש קורות חיים מעודכנים למשרת React Developer</div>
                    <div className="text-xs text-gray-400 mt-1">לפני יום</div>
                  </div>
                  <div className="p-4 hover:bg-gray-50">
                    <div className="text-sm font-medium text-gray-900">סטטוס עודכן</div>
                    <div className="text-xs text-gray-500">המועמדות שלך למשרת UI/UX Designer התקדמה לשלב הראיון</div>
                    <div className="text-xs text-gray-400 mt-1">לפני 3 ימים</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                <div className="text-xs text-gray-500">{candidate.email}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* Profile dropdown */}
            {showProfileMenu && (
              <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                  <div className="text-xs text-gray-500">{candidate.email}</div>
                </div>
                <div className="p-2">
                  <button className="w-full text-right px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    הגדרות פרופיל
                  </button>
                  <button className="w-full text-right px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    שנה סיסמה
                  </button>
                  <button className="w-full text-right px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    התנתק
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 