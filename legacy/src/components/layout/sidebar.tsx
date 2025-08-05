'use client';

import { useState } from 'react';
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
  ChevronDown
} from 'lucide-react';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'דשבורד', href: '/', icon: LayoutDashboard },
    { name: 'משרות', href: '/jobs', icon: Briefcase },
    { name: 'מועמדים', href: '/candidates', icon: Users },
    { name: 'סיווג ביטחוני', href: '/security', icon: Shield },
    { name: 'לקוחות', href: '/clients', icon: Building2 },
    { name: 'הזמנות רכש', href: '/purchase-orders', icon: ShoppingCart },
    { name: 'חוזים', href: '/contracts', icon: FileText },
    { name: 'עובדים', href: '/employees', icon: UserCheck },
    { name: 'חבר מביא חבר', href: '/referrals', icon: UserPlus },
    { name: 'הגדרות', href: '/settings', icon: Settings },
  ];

  const languages = [
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`} dir="rtl">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600">
                <span className="text-white font-bold text-sm">ר</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">מערכת גיוס</h1>
                <p className="text-xs text-gray-500">Pro Recruitment</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
      </div>

      {/* Language Selector */}
      {!collapsed && (
        <div className="p-4 border-b border-border">
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">
                  {languages.find(lang => lang.code === 'he')?.flag} {languages.find(lang => lang.code === 'he')?.name}
                </span>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {showLanguageMenu && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full flex items-center gap-2 p-2 text-sm hover:bg-gray-50 transition-colors ${
                      lang.code === 'he' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
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
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                isActive 
                  ? 'bg-white/20' 
                  : 'bg-gray-100 group-hover:bg-blue-50'
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">א</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900">אסף מנהל</p>
                <p className="text-xs text-gray-500">asaf@bynet.co.il</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 