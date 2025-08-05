'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Briefcase, 
  Users, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

export function ClientPortalDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for KPIs
  const kpiData = [
    {
      title: 'משרות פתוחות',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: Briefcase,
      color: 'text-blue-600'
    },
    {
      title: 'מועמדים בתהליך',
      value: '45',
      change: '+12',
      changeType: 'positive',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'ממוצע ימים לגיוס',
      value: '23',
      change: '-3',
      changeType: 'positive',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      title: 'משרות שסגרו החודש',
      value: '5',
      change: '+1',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'text-orange-600'
    }
  ];

  // Mock data for hiring funnel
  const funnelData = [
    { stage: 'הגישו מועמדות', count: 120, color: '#3B82F6' },
    { stage: 'עברו סינון', count: 85, color: '#10B981' },
    { stage: 'ראיון ראשון', count: 45, color: '#F59E0B' },
    { stage: 'ראיון שני', count: 25, color: '#EF4444' },
    { stage: 'הוצגו ללקוח', count: 15, color: '#8B5CF6' },
    { stage: 'נגייסו', count: 8, color: '#06B6D4' }
  ];

  // Mock data for job status distribution
  const jobStatusData = [
    { status: 'פתוח', count: 8, color: '#3B82F6' },
    { status: 'בתהליך', count: 5, color: '#F59E0B' },
    { status: 'סגור', count: 12, color: '#10B981' },
    { status: 'בוטל', count: 2, color: '#EF4444' }
  ];

  // Mock alerts
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'משרה פתוחה זמן רב',
      description: 'משרת "מפתח Full Stack" פתוחה מעל 60 יום',
      action: 'בדוק את תהליך הגיוס'
    },
    {
      id: 2,
      type: 'info',
      title: 'מועמדים חדשים',
      description: '3 מועמדים חדשים הוצגו למשרת "מנהל פרויקטים"',
      action: 'בדוק את הפרופילים'
    }
  ];

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className={`text-sm ${kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change} מהחודש שעבר
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50 ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Funnel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">משפך גיוס</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Job Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">התפלגות סטטוס משרות</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={jobStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percent }) => `${status} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {jobStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">התראות</h3>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 space-x-reverse p-4 bg-gray-50 rounded-lg">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{alert.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
                  {alert.action} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 