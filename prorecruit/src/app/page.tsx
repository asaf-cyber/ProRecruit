'use client';

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
  CheckCircle
} from 'lucide-react';

export default function Dashboard() {
  // Mock data for KPIs
  const kpiData = {
    openPositions: 24,
    candidatesInProcess: 156,
    newCandidatesToday: 12,
    candidatesInSecurityClearance: 8,
    avgDaysToHire: 23,
    conversionRate: 68,
    referralBonusesPending: 5,
    monthlyRevenue: 450000
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
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">דשבורד מערכת הגיוס</h1>
            <p className="text-gray-600 mt-1">ברוכים הבאים למערכת ניהול הגיוס המתקדמת</p>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2">
              קבל תובנות אסטרטגיות
            </button>
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString('he-IL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
              })}
            </span>
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
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">פעילות אחרונה</h3>
            <div className="space-y-4">
              {[
                { action: 'מועמד חדש נרשם', candidate: 'יוסי כהן', position: 'מפתח Full Stack', time: '5 דקות' },
                { action: 'ראיון נקבע', candidate: 'שרה לוי', position: 'מנהלת פרויקטים', time: '15 דקות' },
                { action: 'הצעה נשלחה', candidate: 'דוד ישראלי', position: 'מעצב UX/UI', time: 'שעה' },
                { action: 'חוזה נחתם', candidate: 'מיכל כהן', position: 'מפתחת React', time: '3 שעות' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.candidate} - {activity.position}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
