'use client';

import { Sidebar } from './sidebar';
import { Header } from './header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-gray-200">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="mr-64">
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 