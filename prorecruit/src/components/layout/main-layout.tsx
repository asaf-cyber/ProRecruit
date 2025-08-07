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
  const [commSidebarCollapsed, setCommSidebarCollapsed] = useState(true); // Communication sidebar collapsed by default
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileCommSidebarOpen, setMobileCommSidebarOpen] = useState(false);
  const { isMobile, isTablet } = useResponsive();

  // Close mobile sidebars when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileSidebarOpen(false);
      setMobileCommSidebarOpen(false);
    }
  }, [isMobile]);

  // Load sidebar states from localStorage
  useEffect(() => {
    const savedMainSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedMainSidebarState !== null) {
      setSidebarCollapsed(JSON.parse(savedMainSidebarState));
    }

    const savedCommSidebarState = localStorage.getItem('commSidebarCollapsed');
    if (savedCommSidebarState !== null) {
      setCommSidebarCollapsed(JSON.parse(savedCommSidebarState));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const toggleCommSidebar = () => {
    const newState = !commSidebarCollapsed;
    setCommSidebarCollapsed(newState);
    localStorage.setItem('commSidebarCollapsed', JSON.stringify(newState));
  };

  const sidebarWidth = sidebarCollapsed ? 'w-16' : 'w-80';
  const commSidebarWidth = commSidebarCollapsed ? 'w-16' : 'w-80';
  const rightMargin = sidebarCollapsed ? 'mr-16' : 'mr-80';
  const leftMargin = commSidebarCollapsed ? 'ml-16' : 'ml-80';
  const contentMargin = isMobile ? '' : `${rightMargin} ${leftMargin}`;

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
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileCommSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 transition-colors"
                title="פתח תפעול שוטף"
              >
                <Menu size={20} />
              </button>
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                title="תפריט ראשי"
              >
                <Menu size={24} />
              </button>
            </div>
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
      
      {/* Desktop Communication Sidebar */}
      {!isMobile && (
        <div className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${commSidebarWidth}`}>
          <CommunicationSidebar 
            isMobile={false}
            isOpen={true}
            onClose={() => {}}
            collapsed={commSidebarCollapsed}
          />
        </div>
      )}
      
      {/* Mobile Communication Sidebar */}
      {isMobile && (
        <CommunicationSidebar 
          isMobile={true}
          isOpen={mobileCommSidebarOpen}
          onClose={() => setMobileCommSidebarOpen(false)}
          collapsed={false}
        />
      )}
      
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