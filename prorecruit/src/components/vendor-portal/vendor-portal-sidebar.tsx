'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckSquare, 
  FileText, 
  MessageSquare,
  Building2,
  User,
  LogOut
} from 'lucide-react';

export function VendorPortalSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'דשבורד', href: '/vendor-portal', icon: LayoutDashboard },
    { name: 'משימות', href: '/vendor-portal/tasks', icon: CheckSquare },
    { name: 'חיובים ותשלומים', href: '/vendor-portal/billing', icon: FileText },
    { name: 'הודעות', href: '/vendor-portal/messages', icon: MessageSquare },
  ];

  return (
    <div className={`h-full bg-white border-l border-gray-200 ${collapsed ? 'w-16' : 'w-64'}`} dir="rtl">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-600">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">פורטל ספק</h1>
                <p className="text-xs text-gray-500">Vendor Portal</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-4 h-4 flex flex-col justify-center items-center">
              <div className={`w-4 h-0.5 bg-gray-600 transition-all ${collapsed ? 'rotate-45 translate-y-0.5' : ''}`}></div>
              <div className={`w-4 h-0.5 bg-gray-600 transition-all mt-0.5 ${collapsed ? '-rotate-45 -translate-y-0.5' : ''}`}></div>
            </div>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                isActive 
                  ? 'bg-white/20' 
                  : 'bg-gray-100 group-hover:bg-green-50'
              }`}>
                <Icon size={20} />
              </div>
              {!collapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900">דוד כהן</p>
                <p className="text-xs text-gray-500">טכנולוגיות מתקדמות בע&quot;מ</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 p-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              <span>התנתק</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 