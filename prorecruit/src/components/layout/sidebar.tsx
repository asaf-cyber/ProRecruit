'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Shield, 
  Building2, 
  ShoppingCart, 
  FileText, 
  UserCheck, 
  UserPlus,
  Settings,
  Menu,
  X,
  Globe,
  ChevronDown,
  Truck,
  ExternalLink,
  BarChart3,
  FileSearch,
  Lightbulb,
  LogOut,
  User,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
}

export function Sidebar({ isMobile = false, isOpen = false, onClose, collapsed: externalCollapsed }: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = isMobile ? false : (externalCollapsed ?? internalCollapsed);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['core']);
  const pathname = usePathname();

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen && onClose) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen, onClose]);

  const coreNavigation = [
    { name: 'דשבורד ראשי', href: '/', icon: LayoutDashboard, description: 'מבט כללי על המערכת' },
    { name: 'דשבורד מנהלים', href: '/executive-dashboard', icon: BarChart3, description: 'נתונים וניתוחים מתקדמים' },
    { name: 'משרות', href: '/jobs', icon: Briefcase, description: 'ניהול דרישות משרות' },
    { name: 'מאגר מועמדים', href: '/cv-database', icon: FileSearch, description: 'מאגר קורות חיים' },
    { name: 'מועמדים', href: '/candidates', icon: Users, description: 'ניהול מועמדים' },
    { name: 'לקוחות והזמנות', href: '/clients', icon: Building2, description: 'ניהול לקוחות והזמנות' },
    { name: 'ספקים', href: '/vendors', icon: Truck, description: 'ניהול ספקים' },
    { name: 'חוזים ועובדים', href: '/contracts', icon: FileText, description: 'ניהול חוזים ועובדים' },
  ];

  const specializedModules = [
    { name: 'תהליך סיווג ביטחוני', href: '/clearances', icon: Shield, description: 'ניהול תהליכי סיווג' },
    { name: 'ניהול ידע ופיתוח', href: '/knowledge-management', icon: Lightbulb, description: 'מרכז ידע ופיתוח' },
    { name: 'עובדים', href: '/employees', icon: UserCheck, description: 'ניהול עובדים' },
    { name: 'חבר מביא חבר', href: '/referrals', icon: UserPlus, description: 'תוכנית הפניות' },
  ];

  const portals = [
    { name: 'פורטל ספק', href: '/vendor-portal', icon: ExternalLink, description: 'גישה לספקים' },
    { name: 'פורטל לקוח', href: '/client-portal', icon: Building2, description: 'גישה ללקוחות' },
    { name: 'פורטל מועמד', href: '/candidate-portal', icon: User, description: 'גישה למועמדים' },
  ];

  const languages = [
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const renderNavigationItems = (items: any[], section: string) => {
    const isExpanded = expandedSections.includes(section);
    
    return (
      <div className="space-y-1">
        {!collapsed && (
          <button
            onClick={() => toggleSection(section)}
            className="w-full flex items-center justify-between p-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <span>{section === 'core' ? 'מסכי ליבה' : section === 'specialized' ? 'מודולים ייעודיים' : 'פורטלים'}</span>
            <ChevronRight 
              size={12} 
              className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
          </button>
        )}
        
        <div className={`space-y-1 ${!collapsed && !isExpanded ? 'hidden' : ''}`}>
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={isMobile ? onClose : undefined}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
                title={collapsed ? item.name : undefined}
              >
                <div className={`p-2 rounded-lg ${
                  isActive 
                    ? 'bg-white/20' 
                    : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20'
                }`}>
                  <Icon size={20} />
                </div>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm">{item.name}</span>
                    {item.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.description}</p>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  const sidebarClasses = `
    h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out
    ${collapsed ? 'w-16' : 'w-80'}
    ${isMobile ? 'fixed inset-y-0 right-0 z-50 transform transition-transform duration-300' : ''}
    ${isMobile && !isOpen ? 'translate-x-full' : ''}
  `;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      )}
      
      <div id="sidebar" className={sidebarClasses} dir="rtl">
        {/* Header with Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
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
            )}
            <div className="flex items-center gap-2">
              {!isMobile && externalCollapsed === undefined && (
                <button
                  onClick={() => setInternalCollapsed(!internalCollapsed)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                  title={collapsed ? 'הרחב סרגל' : 'צמצם סרגל'}
                >
                  {collapsed ? <Menu size={20} /> : <X size={20} />}
                </button>
              )}
              {isMobile && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Language Selector */}
        {!collapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {languages.find(lang => lang.code === 'he')?.flag} {languages.find(lang => lang.code === 'he')?.name}
                  </span>
                </div>
                <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
              </button>
              
              {showLanguageMenu && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        lang.code === 'he' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {renderNavigationItems(coreNavigation, 'core')}
          {renderNavigationItems(specializedModules, 'specialized')}
          {renderNavigationItems(portals, 'portals')}
        </div>

        {/* Settings */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/settings"
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                pathname === '/settings'
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700">
                <Settings size={20} />
              </div>
              <span className="font-medium text-sm">הגדרות</span>
            </Link>
          </div>
        )}

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">א</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 dark:text-white">אסף מנהל</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">asaf@bynet.co.il</p>
              </div>
            )}
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="התנתק"
            >
              <LogOut size={16} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 