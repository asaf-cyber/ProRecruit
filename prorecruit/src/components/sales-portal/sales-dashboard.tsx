'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  LineChart
} from 'lucide-react';

export function SalesDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data for KPIs
  const kpis = [
    {
      title: 'לקוחות פעילים',
      value: '24',
      change: '+3',
      changeType: 'positive',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'הכנסות חודשיות',
      value: '₪125,000',
      change: '+12%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'הזמנות פתוחות',
      value: '8',
      change: '-2',
      changeType: 'negative',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'משרות פתוחות',
      value: '15',
      change: '+5',
      changeType: 'positive',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  // Mock data for revenue by client chart
  const revenueByClient = [
    { client: 'חברת ABC', revenue: 45000, color: '#3B82F6' },
    { client: 'חברת XYZ', revenue: 32000, color: '#10B981' },
    { client: 'חברת DEF', revenue: 28000, color: '#F59E0B' },
    { client: 'חברת GHI', revenue: 20000, color: '#8B5CF6' }
  ];

  // Mock data for monthly revenue chart
  const monthlyRevenue = [
    { day: '1', revenue: 5000 },
    { day: '5', revenue: 8000 },
    { day: '10', revenue: 12000 },
    { day: '15', revenue: 15000 },
    { day: '20', revenue: 18000 },
    { day: '25', revenue: 22000 },
    { day: '30', revenue: 25000 }
  ];

  // Mock data for alerts
  const alerts = [
    {
      type: 'warning',
      title: 'חוב פתוח מלקוח ABC',
      message: 'חוב של ₪15,000 מעל 30 יום',
      time: 'לפני שעה',
      icon: AlertCircle
    },
    {
      type: 'info',
      title: 'הגיוס מתעכב',
      message: 'משרת Full-Stack אצל לקוח XYZ',
      time: 'לפני 3 שעות',
      icon: Clock
    },
    {
      type: 'success',
      title: 'מועמד התקבל',
      message: 'רוני לוי התקבל והחל עבודה',
      time: 'לפני 5 שעות',
      icon: CheckCircle
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-red-200 bg-red-50';
      case 'info': return 'border-yellow-200 bg-yellow-50';
      case 'success': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getAlertIconColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-red-600';
      case 'info': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">דשבורד מכירות</h1>
          <p className="text-gray-600">סקירה כללית של ביצועי המכירות שלך</p>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">שבוע</option>
            <option value="month">חודש</option>
            <option value="quarter">רבעון</option>
            <option value="year">שנה</option>
          </select>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.changeType === 'positive' ? (
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-xs ${kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Client Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">הכנסות מלקוחות</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {revenueByClient.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">{item.client}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${(item.revenue / 45000) * 100}%`,
                        backgroundColor: item.color 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">₪{item.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">הכנסות בחודש</h3>
            <LineChart className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-2 space-x-reverse">
            {monthlyRevenue.map((item, index) => {
              const height = (item.revenue / 25000) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t" style={{ height: `${height}%` }}></div>
                  <span className="text-xs text-gray-500 mt-2">{item.day}</span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">סך הכנסות החודש: ₪{monthlyRevenue[monthlyRevenue.length - 1].revenue.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">התראות ממוקדות</h3>
          <p className="text-sm text-gray-600">אירועים הדורשים פעולה מיידית</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <Icon className={`w-5 h-5 mt-0.5 ${getAlertIconColor(alert.type)}`} />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      פעולה
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">הוסף לקוח חדש</h3>
          <p className="text-blue-100 mb-4">צור לקוח חדש והתחל תהליך מכירה</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            התחל
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">צור הזמנה חדשה</h3>
          <p className="text-green-100 mb-4">התחל תהליך הזמנה עבור לקוח קיים</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
            התחל
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">דוח ביצועים</h3>
          <p className="text-purple-100 mb-4">צפה בדוח ביצועים מפורט</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
            צפה
          </button>
        </div>
      </div>
    </div>
  );
} 