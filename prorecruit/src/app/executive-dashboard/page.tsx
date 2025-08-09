'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ExecutiveSummaryBar } from '@/components/executive-dashboard/executive-summary-bar';
import { ExecutiveFilters } from '@/components/executive-dashboard/executive-filters';
import { ExecutiveKPIs } from '@/components/executive-dashboard/executive-kpis';
import { ExecutiveCharts } from '@/components/executive-dashboard/executive-charts';
import { ExecutiveAlerts } from '@/components/executive-dashboard/executive-alerts';
import { AIInsights } from '@/components/executive-dashboard/ai-insights';
import { 
  TrendingUp, 
  Target, 
  Users, 
  DollarSign, 
  Clock,
  BarChart3,
  Brain,
  Zap,
  FileText,
  Settings,
  Download,
  Share,
  Eye,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

export default function ExecutiveDashboardPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [dateRange, setDateRange] = useState('last-quarter');
  const [jobType, setJobType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('overview'); // overview, detailed, predictive
  const [autoRefresh, setAutoRefresh] = useState(false);
  
  // Real-time data refresh
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(() => {
        // Simulate data refresh
        console.log('Refreshing executive dashboard data...');
      }, 30000); // 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const refreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const exportReport = () => {
    console.log('Exporting executive report...');
  };

  const shareReport = () => {
    console.log('Sharing executive report...');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Enhanced Header with Controls */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600">
                  <BarChart3 size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">דשבורד מנהלים</h1>
                  <p className="text-purple-700 dark:text-purple-300">ניתוח מתקדם ותובנות אסטרטגיות</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>מעקב בזמן אמת</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target size={16} />
                  <span>מדדי ביצועים עסקיים</span>
                </div>
                <div className="flex items-center gap-1">
                  <Brain size={16} />
                  <span>תובנות AI מתקדמות</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Mode Selector */}
              <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
                {[
                  { key: 'overview', label: 'סקירה', icon: Eye },
                  { key: 'detailed', label: 'מפורט', icon: BarChart3 },
                  { key: 'predictive', label: 'חזויות', icon: Brain }
                ].map(mode => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.key}
                      onClick={() => setViewMode(mode.key)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        viewMode === mode.key
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={16} />
                      {mode.label}
                    </button>
                  );
                })}
              </div>

              {/* Auto Refresh Toggle */}
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  autoRefresh
                    ? 'bg-green-600 text-white border-green-600 shadow-sm'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <RefreshCw size={16} className={autoRefresh ? 'animate-spin' : ''} />
                {autoRefresh ? 'אוטומטי פעיל' : 'רענון אוטומטי'}
              </button>

              {/* Action Buttons */}
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                {isLoading ? 'מרענן...' : 'רענן נתונים'}
              </button>

              <button
                onClick={exportReport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <Download size={16} />
                ייצוא דוח
              </button>

              <button
                onClick={shareReport}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                <Share size={16} />
                שתף דוח
              </button>
            </div>
          </div>
        </div>

        {/* Executive Summary Bar */}
        <ExecutiveSummaryBar />
        
        {/* Enhanced AI Strategic Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500">
                <Brain size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">תובנות אסטרטגיות AI</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">ניתוח מתקדם ותחזיות עסקיות</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                <CheckCircle size={12} />
                מעודכן
              </span>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">הצג הכל</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              {
                title: 'תחזית גיוסים',
                insight: 'על בסיס המגמות הנוכחיות, צפויים 34 גיוסים חדשים ברבעון הקרוב',
                impact: 'גבוה',
                confidence: 92,
                color: 'blue'
              },
              {
                title: 'ייעול תקציב',
                insight: 'העברת 15% מתקציב הגיוס לערוץ LinkedIn תגדיל את התוצאות ב-28%',
                impact: 'בינוני',
                confidence: 85,
                color: 'green'
              },
              {
                title: 'זיהוי סיכונים',
                insight: '3 לקוחות מרכזיים מגלים סימני חוסר שביעות רצון - נדרשת התערבות מיידית',
                impact: 'גבוה',
                confidence: 94,
                color: 'red'
              }
            ].map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                  insight.color === 'blue' ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20' :
                  insight.color === 'green' ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' :
                  'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-medium text-sm ${
                    insight.color === 'blue' ? 'text-blue-900 dark:text-blue-100' :
                    insight.color === 'green' ? 'text-green-900 dark:text-green-100' :
                    'text-red-900 dark:text-red-100'
                  }`}>
                    {insight.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs font-medium ${
                      insight.impact === 'גבוה' ? 'text-red-600' : insight.impact === 'בינוני' ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      השפעה: {insight.impact}
                    </span>
                  </div>
                </div>
                
                <p className={`text-xs mb-3 ${
                  insight.color === 'blue' ? 'text-blue-700 dark:text-blue-200' :
                  insight.color === 'green' ? 'text-green-700 dark:text-green-200' :
                  'text-red-700 dark:text-red-200'
                }`}>
                  {insight.insight}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">דיוק:</span>
                    <div className={`w-16 h-1.5 rounded-full ${
                      insight.color === 'blue' ? 'bg-blue-200' :
                      insight.color === 'green' ? 'bg-green-200' :
                      'bg-red-200'
                    }`}>
                      <div
                        className={`h-1.5 rounded-full ${
                          insight.color === 'blue' ? 'bg-blue-600' :
                          insight.color === 'green' ? 'bg-green-600' :
                          'bg-red-600'
                        }`}
                        style={{ width: `${insight.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{insight.confidence}%</span>
                  </div>
                  
                  <button className={`text-xs font-medium px-3 py-1 rounded-full ${
                    insight.color === 'blue' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                    insight.color === 'green' ? 'bg-green-600 text-white hover:bg-green-700' :
                    'bg-red-600 text-white hover:bg-red-700'
                  } transition-colors`}>
                    פעל עכשיו
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Filters Panel */}
        <ExecutiveFilters
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedClient={selectedClient}
          onClientChange={setSelectedClient}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          jobType={jobType}
          onJobTypeChange={setJobType}
        />

        {/* AI Insights */}
        <AIInsights />

        {/* KPIs */}
        <ExecutiveKPIs
          department={selectedDepartment}
          client={selectedClient}
          dateRange={dateRange}
          jobType={jobType}
        />

        {/* Charts */}
        <ExecutiveCharts
          department={selectedDepartment}
          client={selectedClient}
          dateRange={dateRange}
          jobType={jobType}
        />

        {/* Alerts */}
        <ExecutiveAlerts />
      </div>
    </MainLayout>
  );
} 