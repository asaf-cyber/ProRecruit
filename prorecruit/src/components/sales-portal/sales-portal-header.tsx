'use client';

import { useState } from 'react';
import { 
  Bell, 
  Settings, 
  User, 
  TrendingUp, 
  DollarSign,
  Users,
  Calendar,
  Target
} from 'lucide-react';

export function SalesPortalHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Mock data for sales rep
  const salesRep = {
    name: 'דן כהן',
    role: 'איש מכירות בכיר',
    avatar: 'DK',
    email: 'dan.cohen@prorecruit.com',
    phone: '050-1234567'
  };

  const quickStats = [
    { label: 'לקוחות פעילים', value: '24', icon: Users, color: 'text-blue-600' },
    { label: 'הכנסות חודשיות', value: '₪125,000', icon: DollarSign, color: 'text-green-600' },
    { label: 'הזמנות פתוחות', value: '8', icon: Target, color: 'text-orange-600' },
    { label: 'משרות פתוחות', value: '15', icon: Calendar, color: 'text-purple-600' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Sales Rep Info */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{salesRep.avatar}</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{salesRep.name}</h2>
              <p className="text-sm text-gray-600">{salesRep.role}</p>
            </div>
          </div>
        </div>

        {/* Center - Quick Stats */}
        <div className="hidden md:flex items-center space-x-6 space-x-reverse">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center space-x-2 space-x-reverse">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3 space-x-reverse">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">התראות</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">חוב פתוח מלקוח ABC מעל 30 יום</p>
                        <p className="text-xs text-gray-500">לפני שעה</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">הגיוס למשרת Full-Stack מתעכב</p>
                        <p className="text-xs text-gray-500">לפני 3 שעות</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">מועמד התקבל והחל עבודה</p>
                        <p className="text-xs text-gray-500">לפני 5 שעות</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 space-x-reverse p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{salesRep.name}</span>
            </button>
            
            {showProfile && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{salesRep.avatar}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{salesRep.name}</h4>
                      <p className="text-xs text-gray-500">{salesRep.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-gray-500">אימייל:</span>
                      <span className="text-gray-900">{salesRep.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-gray-500">טלפון:</span>
                      <span className="text-gray-900">{salesRep.phone}</span>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                    <Settings className="w-4 h-4 mr-2" />
                    הגדרות
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Quick Stats */}
      <div className="md:hidden mt-4">
        <div className="grid grid-cols-2 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 