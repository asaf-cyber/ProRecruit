'use client';

import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  FolderOpen, 
  MessageSquare,
  User,
  LogOut
} from 'lucide-react';

interface CandidatePortalSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function CandidatePortalSidebar({ activeTab, onTabChange }: CandidatePortalSidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'דשבורד',
      icon: LayoutDashboard,
      description: 'מסך בית עם סיכום מצב'
    },
    {
      id: 'applications',
      label: 'הגשות שלי',
      icon: FileText,
      description: 'משרות שהגשתי מועמדות'
    },
    {
      id: 'interviews',
      label: 'ראיונות',
      icon: Calendar,
      description: 'לוח זמנים ומעקב'
    },
    {
      id: 'documents',
      label: 'מסמכים',
      icon: FolderOpen,
      description: 'ניהול קבצים ומסמכים'
    },
    {
      id: 'messages',
      label: 'הודעות',
      icon: MessageSquare,
      description: 'צ\'אט ועדכונים'
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">פורטל מועמד</h2>
            <p className="text-sm text-gray-500">ברוך הבא למערכת</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
              <div className="flex-1 text-right">
                <div className="font-medium">{item.label}</div>
                <div className={`text-xs ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
          <LogOut className="w-5 h-5 text-gray-400" />
          <span className="font-medium">התנתק</span>
        </button>
      </div>
    </div>
  );
} 