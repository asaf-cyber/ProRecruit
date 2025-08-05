'use client';

import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Clock, 
  FileText, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

export function VendorPortalDashboard() {
  // Mock data for KPI cards
  const kpiData = [
    {
      title: 'משימות פתוחות',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'חשבוניות פתוחות',
      value: '₪45,000',
      change: '+₪8,500',
      changeType: 'positive',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'הכנסה חודשית',
      value: '₪125,000',
      change: '+12%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'פרויקטים פעילים',
      value: '8',
      change: '+1',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  // Mock data for income chart
  const incomeData = [
    { month: 'ינו', income: 85000 },
    { month: 'פבר', income: 92000 },
    { month: 'מרץ', income: 78000 },
    { month: 'אפר', income: 105000 },
    { month: 'מאי', income: 98000 },
    { month: 'יוני', income: 125000 },
    { month: 'יולי', income: 110000 },
    { month: 'אוג', income: 135000 },
    { month: 'ספט', income: 120000 },
    { month: 'אוק', income: 140000 },
    { month: 'נוב', income: 130000 },
    { month: 'דצמ', income: 150000 }
  ];

  // Mock data for tasks by type
  const tasksByType = [
    { name: 'פיתוח', value: 35, color: '#3B82F6' },
    { name: 'תחזוקה', value: 25, color: '#10B981' },
    { name: 'ייעוץ', value: 20, color: '#F59E0B' },
    { name: 'אימון', value: 15, color: '#EF4444' },
    { name: 'אחר', value: 5, color: '#8B5CF6' }
  ];

  // Mock data for recent tasks
  const recentTasks = [
    {
      id: 1,
      title: 'פיתוח מודול ניהול משתמשים',
      status: 'בתהליך',
      priority: 'גבוה',
      dueDate: '2024-01-15',
      progress: 75
    },
    {
      id: 2,
      title: 'תחזוקת שרת ייצור',
      status: 'ממתין',
      priority: 'בינוני',
      dueDate: '2024-01-20',
      progress: 0
    },
    {
      id: 3,
      title: 'ייעוץ אבטחה',
      status: 'הושלם',
      priority: 'נמוך',
      dueDate: '2024-01-10',
      progress: 100
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'הושלם':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'בתהליך':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'ממתין':
        return <Clock className="w-4 h-4 text-gray-600" />;
      default:
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      גבוה: 'bg-red-100 text-red-800',
      בינוני: 'bg-yellow-100 text-yellow-800',
      נמוך: 'bg-green-100 text-green-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority as keyof typeof colors]}`}>
        {priority}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
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
        {/* Income Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">הכנסה לאורך זמן</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₪${value}`, 'הכנסה']} />
              <Line type="monotone" dataKey="income" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tasks by Type */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">משימות לפי סוג</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tasksByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {tasksByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">משימות אחרונות</h3>
        <div className="space-y-4">
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4 space-x-reverse">
                {getStatusIcon(task.status)}
                <div>
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <p className="text-sm text-gray-600">תאריך יעד: {task.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                {getPriorityBadge(task.priority)}
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{task.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 