'use client';

import { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'מועמד חדש נרשם',
      message: 'יוסי כהן הגיש מועמדות למשרת מפתח Full Stack',
      time: '5 דקות',
      type: 'info'
    },
    {
      id: 2,
      title: 'ראיון נקבע',
      message: 'ראיון עם שרה לוי נקבע ליום שלישי',
      time: '15 דקות',
      type: 'success'
    },
    {
      id: 3,
      title: 'תזכורת חשובה',
      message: 'משרת מפתח React פתוחה כבר 30 ימים',
      time: 'שעה',
      type: 'warning'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40" dir="rtl">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חיפוש מועמדים, משרות, לקוחות..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 relative"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900">התראות</h3>
                    </div>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="px-4 py-2 border-t border-gray-200">
                      <button className="text-sm text-blue-600 hover:text-blue-500">
                        צפה בכל ההתראות
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 space-x-reverse p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">א</span>
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  אסף מנהל
                </span>
              </button>

              {/* User dropdown */}
              {showUserMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                      <User size={16} className="ml-3" />
                      פרופיל
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                      <Settings size={16} className="ml-3" />
                      הגדרות
                    </button>
                    <hr className="my-1" />
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                      <LogOut size={16} className="ml-3" />
                      התנתק
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              דשבורד
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              משרות
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              מועמדים
            </a>
          </div>
        </div>
      )}
    </header>
  );
} 