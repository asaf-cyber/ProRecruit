'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { CommunicationSidebar } from './communication-sidebar';
import { NotificationBar } from './notification-bar';
import { Menu } from 'lucide-react';
import { useResponsive } from '@/hooks/use-responsive';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Default collapsed
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { isMobile, isTablet } = useResponsive();

  // Close mobile sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileSidebarOpen(false);
    }
  }, [isMobile]);

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const sidebarWidth = sidebarCollapsed ? 'w-16' : 'w-80';
  const contentMargin = sidebarCollapsed ? 'mr-16' : 'mr-80';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300" dir="rtl">
      {/* Notification Bar */}
      <NotificationBar />
      
      {/* Mobile Header with Menu Button */}
      {isMobile && (
        <div className="fixed top-0 right-0 left-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600">
                  <span className="text-white font-bold text-sm">ב</span>
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-600">
                  <span className="text-white font-bold text-sm">IT</span>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">בינת</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">IT Experts</p>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className={`fixed inset-y-0 right-0 z-50 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 transition-all duration-300 ${sidebarWidth}`}>
          <Sidebar 
            isMobile={false}
            isOpen={true}
            onClose={() => {}}
            collapsed={sidebarCollapsed}
          />
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Sidebar 
          isMobile={true}
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          collapsed={false}
        />
      )}
      
      {/* Communication Sidebar */}
      <CommunicationSidebar />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${isMobile ? 'pt-20' : contentMargin}`}>
        {/* Header */}
        {!isMobile && (
          <Header 
            onToggleSidebar={toggleSidebar}
            sidebarCollapsed={sidebarCollapsed}
          />
        )}
        
        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 