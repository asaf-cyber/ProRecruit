'use client';

import { 
  BarChart3, 
  Users, 
  FileText, 
  MessageSquare,
  TrendingUp,
  DollarSign,
  Target,
  Settings
} from 'lucide-react';

interface SalesPortalSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SalesPortalSidebar({ activeTab, onTabChange }: SalesPortalSidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'דשבורד ראשי',
      icon: BarChart3,
      description: 'סקירה כללית של ביצועים'
    },
    {
      id: 'clients',
      label: 'ניהול לקוחות',
      icon: Users,
      description: 'ניהול לקוחות והזדמנויות'
    },
    {
      id: 'orders',
      label: 'הזמנות וחיובים',
      icon: FileText,
      description: 'מעקב הזמנות וחשבוניות'
    },
    {
      id: 'chat',
      label: 'צ\'אט ותקשורת',
      icon: MessageSquare,
      description: 'צ\'אט עם צוות ומועמדים'
    }
  ];

  const quickActions = [
    {
      id: 'new-client',
      label: 'לקוח חדש',
      icon: Users,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'new-job',
      label: 'משרה חדשה',
      icon: Target,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'new-candidate',
      label: 'מועמד חדש',
      icon: TrendingUp,
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="w-64 bg-white border-l border-gray-200 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">פורטל מכירות</h1>
            <p className="text-xs text-gray-500">ProRecruit</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg text-right transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                <div className="flex-1 text-right">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            פעולות מהירות
          </h3>
          <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-lg text-white text-sm font-medium transition-colors ${action.color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 space-x-reverse mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="text-sm font-semibold text-gray-900">ביצועים החודש</h4>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">יעד מכירות:</span>
              <span className="font-medium">₪150,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">הושג:</span>
              <span className="font-medium text-green-600">₪125,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{ width: '83%' }}></div>
            </div>
            <div className="text-center text-xs text-gray-500">
              83% מהיעד
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 