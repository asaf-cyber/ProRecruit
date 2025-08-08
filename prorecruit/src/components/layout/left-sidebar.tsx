'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MessageSquare,
  Phone,
  Calendar,
  Bell,
  Bot,
  ExternalLink,
  Building2,
  Truck,
  User,
  UserCog,
  X,
  Menu,
  Shield,
  Zap,
  Mail,
  Video,
  Settings,
  Users,
  LogOut
} from 'lucide-react';

interface LeftSidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
}

export function LeftSidebar({ isMobile = false, isOpen = false, onClose, collapsed: externalCollapsed }: LeftSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = isMobile ? false : (externalCollapsed ?? internalCollapsed);
  const pathname = usePathname();

  const communicationTools = [
    { 
      name: 'צ׳אט משתמשים פנימי', 
      href: '/chat', 
      icon: MessageSquare, 
      description: 'תקשורת פנימית Slack-like', 
      badge: '3', 
      badgeColor: 'bg-red-500' 
    },
    { 
      name: 'WhatsApp אישי', 
      href: '/whatsapp', 
      icon: Phone, 
      description: 'אינטגרציה לפי מספר אישי', 
      badge: '7', 
      badgeColor: 'bg-green-500' 
    },
    { 
      name: 'לוח שנה צבעוני', 
      href: '/calendar', 
      icon: Calendar, 
      description: 'ראיונות, חתימות, משימות', 
      badge: '12', 
      badgeColor: 'bg-blue-500' 
    },
    { 
      name: 'התראות חכמות', 
      href: '/notifications', 
      icon: Bell, 
      description: 'התראות מערכת AI', 
      badge: '2', 
      badgeColor: 'bg-orange-500' 
    },
    { 
      name: 'בועת AI קבועה', 
      href: '/ai-assistant', 
      icon: Bot, 
      description: 'LLM Assistant זמין 24/7', 
      status: 'online' 
    },
  ];

  const portals = [
    { 
      name: 'פורטל לקוח', 
      href: '/client-portal', 
      icon: Building2, 
      description: 'גישה מוגבלת ללקוחות', 
      users: '45 לקוחות' 
    },
    { 
      name: 'פורטל ספק', 
      href: '/vendor-portal', 
      icon: Truck, 
      description: 'מערכת ספקים בזמן אמת', 
      users: '28 ספקים' 
    },
    { 
      name: 'פורטל מועמד', 
      href: '/candidate-portal', 
      icon: User, 
      description: 'חוויית מועמד מותאמת אישית', 
      users: '312 מועמדים' 
    },
    { 
      name: 'פורטל עובד', 
      href: '/employee-portal', 
      icon: Shield, 
      description: 'מרכז שליטה אישי לעובדים', 
      users: '144 עובדים' 
    },
    { 
      name: 'פורטל מנהל מערכת', 
      href: '/admin-portal', 
      icon: UserCog, 
      description: 'כלי ניהול מתקדמים', 
      users: '8 מנהלים' 
    },
  ];

  const sidebarClasses = `
    h-full bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out
    ${collapsed ? 'w-16' : 'w-80'}
    ${isMobile ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300' : ''}
    ${isMobile && !isOpen ? '-translate-x-full' : ''}
  `;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      )}
      
      <div id="left-sidebar" className={sidebarClasses} dir="rtl">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                  <Zap size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">כלי תקשורת</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ופורטלים ייעודיים</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              {!isMobile && externalCollapsed === undefined && (
                <button
                  onClick={() => setInternalCollapsed(!internalCollapsed)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                  title={collapsed ? 'הרחב סרגל' : 'צמצם סרגל'}
                >
                  {collapsed ? <Menu size={20} /> : <X size={20} />}
                </button>
              )}
              {isMobile && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Communication Tools Section */}
          <div className="space-y-1">
            {!collapsed && (
              <h3 className="px-2 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                כלי תקשורת מתקדמים
              </h3>
            )}
            {communicationTools.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href);
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={isMobile ? onClose : undefined}
                  className={`relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <div className={`relative p-2 rounded-lg ${
                    isActive 
                      ? 'bg-white/20' 
                      : 'bg-white dark:bg-gray-600 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20'
                  }`}>
                    <Icon size={20} />
                    {item.status === 'online' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                    )}
                    {item.badge && (
                      <div className={`absolute -top-1 -right-1 min-w-5 h-5 ${item.badgeColor} text-white text-xs rounded-full flex items-center justify-center px-1 font-bold`}>
                        {item.badge}
                      </div>
                    )}
                  </div>
                  {!collapsed && (
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-sm">{item.name}</span>
                      {item.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{item.description}</p>
                      )}
                    </div>
                  )}
                  {!collapsed && item.status === 'online' && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">פעיל</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Portals Section */}
          <div className="space-y-1">
            {!collapsed && (
              <h3 className="px-2 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                פורטלים ייעודיים
              </h3>
            )}
            {portals.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href);
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={isMobile ? onClose : undefined}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:shadow-md'
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive 
                      ? 'bg-white/20' 
                      : 'bg-white dark:bg-gray-600 group-hover:bg-green-50 dark:group-hover:bg-green-900/20'
                  }`}>
                    <Icon size={20} />
                  </div>
                  {!collapsed && (
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-sm">{item.name}</span>
                      {item.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{item.description}</p>
                      )}
                      {item.users && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 truncate mt-0.5 font-medium">{item.users}</p>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* AI Assistant Chat Bubble */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="relative">
              <button className="w-full p-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Bot size={32} className="drop-shadow-lg" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-right flex-1">
                    <span className="font-bold text-base block">AI Assistant 🤖</span>
                    <p className="text-sm opacity-90 mt-0.5">זמין 24/7 לעזרה מיידית</p>
                    <div className="flex items-center gap-1 mt-1 justify-end">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs opacity-75 font-medium">מחובר</span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 translate-x-full group-hover:translate-x-[-300%] transition-transform duration-1000"></div>
              </button>
            </div>
          </div>
        )}
        
        {/* Quick Actions - Collapsed Mode */}
        {collapsed && (
          <div className="p-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <div className="relative">
              <button className="w-full p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 group" title="AI Assistant">
                <Bot size={20} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border border-white rounded-full animate-pulse"></div>
              </button>
            </div>
            <button className="w-full p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative" title="התראות">
              <Bell size={18} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>
            <button className="w-full p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="הגדרות">
              <Settings size={18} />
            </button>
          </div>
        )}

        {/* User Profile & Quick Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {!collapsed && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">מהירות מערכת</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors group" title="אימייל">
                  <Mail size={16} className="mx-auto group-hover:scale-110 transition-transform" />
                </button>
                <button className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors group" title="וידאו">
                  <Video size={16} className="mx-auto group-hover:scale-110 transition-transform" />
                </button>
                <button className="p-2 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors group" title="הגדרות">
                  <Settings size={16} className="mx-auto group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">א</span>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 dark:text-white">אסף מנהל</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">מחובר</p>
                </div>
              </div>
            )}
            <div className="flex gap-1">
              <button
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                title="הגדרות פרופיל"
              >
                <Settings size={14} className="text-gray-500 dark:text-gray-400 group-hover:rotate-90 transition-transform" />
              </button>
              <button
                className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors group"
                title="התנתק"
              >
                <LogOut size={14} className="text-gray-500 dark:text-gray-400 group-hover:text-red-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}