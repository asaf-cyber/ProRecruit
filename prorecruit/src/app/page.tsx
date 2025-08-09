'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { KPICard } from '@/components/dashboard/kpi-card';
import { ChartWidget } from '@/components/dashboard/chart-widget';
import { 
  Briefcase, 
  Users, 
  Shield, 
  Clock, 
  TrendingUp, 
  DollarSign,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Target,
  Bot,
  Zap,
  Eye,
  Settings,
  RefreshCw,
  Calendar,
  BarChart3,
  Lightbulb
} from 'lucide-react';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quickActions, setQuickActions] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock AI insights
  const aiInsightsData = [
    {
      type: 'optimization',
      title: 'הצעה לייעול',
      message: 'המערכת מזהה כי 68% מהמועמדים מגיעים דרך LinkedIn - כדאי להגדיל השקעה בערוץ זה',
      priority: 'high',
      action: 'הצג פרטים'
    },
    {
      type: 'alert',
      title: 'התראה חכמה',
      message: '3 מועמדים מעולים ממתינים לתשובה מעל שבוע - כדאי לפנות אליהם',
      priority: 'urgent',
      action: 'צור פעולות מיידיות'
    },
    {
      type: 'prediction',
      title: 'חיזוי מגמות',
      message: 'על בסיס נתוני העבר - צפויים 18 גיוסים חדשים החודש הקרוב',
      priority: 'medium',
      action: 'הכן תחזית'
    }
  ];

  // Mock data for KPIs with enhanced tracking
  const kpiData = {
    openPositions: 24,
    candidatesInProcess: 156,
    newCandidatesToday: 12,
    candidatesInSecurityClearance: 8,
    avgDaysToHire: 23,
    conversionRate: 68,
    referralBonusesPending: 5,
    monthlyRevenue: 450000,
    
    // New advanced metrics
    aiMatchingAccuracy: 87,
    clientSatisfaction: 94,
    candidateExperience: 89,
    systemEfficiency: 92
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Mock data for charts
  const pipelineData = [
    { name: 'הגישו מועמדות', value: 120 },
    { name: 'סינון ראשוני', value: 85 },
    { name: 'ראיון טלפוני', value: 45 },
    { name: 'ראיון פנים אל פנים', value: 25 },
    { name: 'הצעה', value: 15 },
    { name: 'חתימה', value: 12 }
  ];

  const sourcingData = [
    { name: 'LinkedIn', value: 35 },
    { name: 'חבר מביא חבר', value: 25 },
    { name: 'אתר חברה', value: 20 },
    { name: 'פנייה יזומה', value: 15 },
    { name: 'מגייס חיצוני', value: 5 }
  ];

  const monthlyHiresData = [
    { name: 'ינו', value: 8 },
    { name: 'פבר', value: 12 },
    { name: 'מרץ', value: 15 },
    { name: 'אפר', value: 18 },
    { name: 'מאי', value: 22 },
    { name: 'יוני', value: 25 }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header with Enhanced Controls */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-600">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">דשבורד מערכת הגיוס</h1>
                  <p className="text-blue-700 dark:text-blue-300">מערכת ניהול משאבי אנוש חכמה ומתקדמת</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>עודכן לאחרונה: {currentTime.toLocaleTimeString('he-IL')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>מעקב בזמן אמת</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                {isRefreshing ? 'מרענן...' : 'רענן נתונים'}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                <Bot size={16} />
                תובנות AI
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-sm font-medium">
                <Zap size={16} />
                אוטומציה חכמה
              </button>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500">
                <Lightbulb size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">תובנות AI מתקדמות</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">המלצות וניתוחים חכמים למערכת הגיוס</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">הצג הכל</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsightsData.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                  insight.priority === 'urgent'
                    ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                    : insight.priority === 'high'
                    ? 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20'
                    : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-medium text-sm ${
                    insight.priority === 'urgent'
                      ? 'text-red-900 dark:text-red-100'
                      : insight.priority === 'high'
                      ? 'text-orange-900 dark:text-orange-100'
                      : 'text-blue-900 dark:text-blue-100'
                  }`}>
                    {insight.title}
                  </h3>
                  {insight.priority === 'urgent' && (
                    <AlertCircle size={16} className="text-red-500" />
                  )}
                </div>
                <p className={`text-xs mb-3 ${
                  insight.priority === 'urgent'
                    ? 'text-red-700 dark:text-red-200'
                    : insight.priority === 'high'
                    ? 'text-orange-700 dark:text-orange-200'
                    : 'text-blue-700 dark:text-blue-200'
                }`}>
                  {insight.message}
                </p>
                <button className={`text-xs font-medium px-3 py-1 rounded-full ${
                  insight.priority === 'urgent'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : insight.priority === 'high'
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}>
                  {insight.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="משרות פתוחות"
            value={kpiData.openPositions}
            change="+3 החודש"
            changeType="positive"
            icon={Briefcase}
            iconColor="text-blue-600"
            trend={75}
          />
          <KPICard
            title="מועמדים בתהליך"
            value={kpiData.candidatesInProcess}
            change="+12 היום"
            changeType="positive"
            icon={Users}
            iconColor="text-green-600"
            trend={85}
          />
          <KPICard
            title="מועמדים חדשים היום"
            value={kpiData.newCandidatesToday}
            change="+5 מהאתמול"
            changeType="positive"
            icon={UserPlus}
            iconColor="text-purple-600"
            trend={60}
          />
          <KPICard
            title="בדיקות רקע"
            value={kpiData.candidatesInSecurityClearance}
            change="2 ממתינות"
            changeType="neutral"
            icon={Shield}
            iconColor="text-orange-600"
            trend={40}
          />
          <KPICard
            title="ממוצע ימים לגיוס"
            value={`${kpiData.avgDaysToHire} ימים`}
            change="-3 מהממוצע"
            changeType="positive"
            icon={Clock}
            iconColor="text-indigo-600"
            trend={65}
          />
          <KPICard
            title="שיעור המרות"
            value={`${kpiData.conversionRate}%`}
            change="+5% מהחודש שעבר"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-emerald-600"
            trend={80}
          />
          <KPICard
            title="מענקי חבר מביא חבר"
            value={kpiData.referralBonusesPending}
            change="3 זכאים"
            changeType="neutral"
            icon={CheckCircle}
            iconColor="text-pink-600"
            trend={50}
          />
          <KPICard
            title="הכנסה חודשית"
            value={`₪${kpiData.monthlyRevenue.toLocaleString()}`}
            change="+12% מהחודש שעבר"
            changeType="positive"
            icon={DollarSign}
            iconColor="text-green-600"
            trend={90}
          />
        </div>

        {/* Advanced AI Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                <Target size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">מדדי ביצועים מתקדמים</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">מדידת יעילות המערכת והחוויה</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-800">
                  <Bot size={16} className="text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded-full">AI</span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpiData.aiMatchingAccuracy}%</p>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">דיוק התאמת AI</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">+3% מהשבוע שעבר</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-800">
                  <Users size={16} className="text-green-600 dark:text-green-400" />
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800 px-2 py-1 rounded-full">לקוח</span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpiData.clientSatisfaction}%</p>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">שביעות רצון לקוחות</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">+2% מהחודש שעבר</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-4 border border-orange-100 dark:border-orange-800">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-800">
                  <UserPlus size={16} className="text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-800 px-2 py-1 rounded-full">מועמד</span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpiData.candidateExperience}%</p>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">חוויית מועמד</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">+5% מהחודש שעבר</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-800">
                  <Zap size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded-full">מערכת</span>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpiData.systemEfficiency}%</p>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">יעילות מערכת</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">+1% מהשבוע שעבר</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWidget
            title="פייפליין גיוס"
            type="bar"
            data={pipelineData}
            height={300}
          />
          <ChartWidget
            title="מקורות גיוס"
            type="pie"
            data={sourcingData}
            height={300}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartWidget
            title="גיוסים חודשיים"
            type="bar"
            data={monthlyHiresData}
            height={300}
          />
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-500">
                  <Calendar size={16} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">פעילות בזמן אמת</h3>
              </div>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">הצג הכל</button>
            </div>
            <div className="space-y-3">
              {[
                { action: 'מועמד חדש נרשם', candidate: 'יוסי כהן', position: 'מפתח Full Stack', time: '5 דקות', status: 'new', priority: 'high' },
                { action: 'ראיון נקבע', candidate: 'שרה לוי', position: 'מנהלת פרויקטים', time: '15 דקות', status: 'scheduled', priority: 'medium' },
                { action: 'הצעה נשלחה', candidate: 'דוד ישראלי', position: 'מעצב UX/UI', time: 'שעה', status: 'offer', priority: 'high' },
                { action: 'חוזה נחתם', candidate: 'מיכל כהן', position: 'מפתחת React', time: '3 שעות', status: 'signed', priority: 'high' },
                { action: 'סיווג ביטחוני אושר', candidate: 'אבי דוד', position: 'מהנדס DevOps', time: '4 שעות', status: 'cleared', priority: 'medium' }
              ].map((activity, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer ${
                  activity.status === 'new' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' :
                  activity.status === 'scheduled' ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800' :
                  activity.status === 'offer' ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800' :
                  activity.status === 'signed' ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                  'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'new' ? 'bg-blue-500' :
                      activity.status === 'scheduled' ? 'bg-purple-500' :
                      activity.status === 'offer' ? 'bg-orange-500' :
                      activity.status === 'signed' ? 'bg-green-500' :
                      'bg-indigo-500'
                    }`}></div>
                    <div>
                      <p className={`font-medium text-sm ${
                        activity.status === 'new' ? 'text-blue-900 dark:text-blue-100' :
                        activity.status === 'scheduled' ? 'text-purple-900 dark:text-purple-100' :
                        activity.status === 'offer' ? 'text-orange-900 dark:text-orange-100' :
                        activity.status === 'signed' ? 'text-green-900 dark:text-green-100' :
                        'text-indigo-900 dark:text-indigo-100'
                      }`}>{activity.action}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{activity.candidate} • {activity.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {activity.priority === 'high' && (
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-blue-600 dark:text-blue-400" />
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">AI חזה: צפויים 3 גיוסים חדשים השבוע</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
