'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  X,
  Sun,
  Moon,
  Menu
} from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useResponsive } from '@/hooks/use-responsive';

interface HeaderProps {
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

export function Header({ onToggleSidebar, sidebarCollapsed }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isMobile, isTablet } = useResponsive();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setShowNotifications(false);
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 transition-colors duration-300" dir="rtl">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Sidebar Toggle - Desktop Only */}
          {!isMobile && onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              title={sidebarCollapsed ? 'הרחב תפריט' : 'צמצם תפריט'}
            >
              <Menu size={20} />
            </button>
          )}

          {/* Search */}
          <div className={`flex-1 max-w-lg ${!isMobile && onToggleSidebar ? 'mx-4' : 'mx-4'}`}>
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חיפוש מועמדים, משרות, לקוחות..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              title={theme === 'light' ? 'מעבר למצב כהה' : 'מעבר למצב בהיר'}
            >
              {theme === 'light' ? (
                <Moon size={20} className="transition-transform duration-300" />
              ) : (
                <Sun size={20} className="transition-transform duration-300" />
              )}
            </button>
            {/* Notifications */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors duration-200"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="py-1">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">התראות</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">יש לך {notifications.length} התראות חדשות</p>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-colors duration-150"
                        >
                          <div className="flex items-start">
                            <div className={`w-2 h-2 rounded-full mt-2 ml-3 flex-shrink-0 ${
                              notification.type === 'success' ? 'bg-green-500' :
                              notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors duration-150">
                        צפה בכל ההתראות
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative dropdown-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">א</span>
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                  אסף מנהל
                </span>
              </button>

              {/* User dropdown */}
              {showUserMenu && (
                <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 z-50 border border-gray-200 dark:border-gray-700">
                  <div className="py-1">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">אסף מנהל</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">asaf@bynet.co.il</p>
                    </div>
                    <div className="py-1">
                      <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors duration-150">
                        <User size={16} className="ml-3 text-gray-400 dark:text-gray-500" />
                        פרופיל משתמש
                      </button>
                      <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors duration-150">
                        <Settings size={16} className="ml-3 text-gray-400 dark:text-gray-500" />
                        הגדרות מערכת
                      </button>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                      <button className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors duration-150">
                        <LogOut size={16} className="ml-3" />
                        התנתק מהמערכת
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 