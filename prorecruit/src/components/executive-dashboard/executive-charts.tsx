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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
  Scatter,
  ScatterChart,
  ZAxis
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';

interface ExecutiveChartsProps {
  department: string;
  client: string;
  dateRange: string;
  jobType: string;
}

export function ExecutiveCharts({
  department,
  client,
  dateRange,
  jobType
}: ExecutiveChartsProps) {
  const [activeChart, setActiveChart] = useState('funnel');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for hiring funnel across departments
  const funnelData = [
    { department: 'R&D', applied: 450, screened: 180, interviewed: 45, offered: 12, hired: 8 },
    { department: 'מוצר', applied: 320, screened: 140, interviewed: 35, offered: 10, hired: 7 },
    { department: 'שיווק', applied: 280, screened: 120, interviewed: 25, offered: 8, hired: 5 },
    { department: 'מכירות', applied: 380, screened: 160, interviewed: 40, offered: 15, hired: 12 },
    { department: 'משאבי אנוש', applied: 150, screened: 80, interviewed: 20, offered: 6, hired: 4 }
  ];

  // Mock data for sourcing channel performance vs cost
  const sourcingData = [
    { channel: 'LinkedIn', hires: 45, cost: 8500, efficiency: 85 },
    { channel: 'Indeed', hires: 32, cost: 6200, efficiency: 78 },
    { channel: 'חבר מביא חבר', hires: 28, cost: 2800, efficiency: 92 },
    { channel: 'קריירה', hires: 22, cost: 4400, efficiency: 65 },
    { channel: 'רשתות חברתיות', hires: 18, cost: 3600, efficiency: 72 },
    { channel: 'אירועי גיוס', hires: 15, cost: 12000, efficiency: 45 }
  ];

  // Mock data for offer acceptance rate over time
  const acceptanceData = [
    { month: 'ינו', rate: 72, offers: 45, acceptances: 32 },
    { month: 'פבר', rate: 75, offers: 52, acceptances: 39 },
    { month: 'מרץ', rate: 78, offers: 48, acceptances: 37 },
    { month: 'אפר', rate: 81, offers: 55, acceptances: 45 },
    { month: 'מאי', rate: 76, offers: 50, acceptances: 38 },
    { month: 'יוני', rate: 83, offers: 60, acceptances: 50 },
    { month: 'יולי', rate: 79, offers: 58, acceptances: 46 },
    { month: 'אוג', rate: 85, offers: 65, acceptances: 55 },
    { month: 'ספט', rate: 82, offers: 62, acceptances: 51 },
    { month: 'אוק', rate: 87, offers: 70, acceptances: 61 },
    { month: 'נוב', rate: 84, offers: 68, acceptances: 57 },
    { month: 'דצמ', rate: 89, offers: 75, acceptances: 67 }
  ];

  // Mock data for predictive analytics
  const predictiveData = [
    { month: 'ינו', actual: 45, predicted: 42, demand: 50 },
    { month: 'פבר', actual: 52, predicted: 48, demand: 55 },
    { month: 'מרץ', actual: 48, predicted: 51, demand: 52 },
    { month: 'אפר', actual: 55, predicted: 54, demand: 58 },
    { month: 'מאי', actual: 50, predicted: 56, demand: 60 },
    { month: 'יוני', actual: 60, predicted: 58, demand: 65 },
    { month: 'יולי', actual: 58, predicted: 61, demand: 62 },
    { month: 'אוג', actual: 65, predicted: 63, demand: 68 },
    { month: 'ספט', actual: 62, predicted: 66, demand: 70 },
    { month: 'אוק', actual: 70, predicted: 69, demand: 75 },
    { month: 'נוב', actual: 68, predicted: 72, demand: 78 },
    { month: 'דצמ', actual: 75, predicted: 75, demand: 80 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [department, client, dateRange, jobType]);

  const chartOptions = [
    { id: 'funnel', label: 'משפך גיוס לפי מחלקות', icon: BarChart3 },
    { id: 'sourcing', label: 'ביצועי ערוצי גיוס', icon: PieChartIcon },
    { id: 'acceptance', label: 'שיעור קבלת הצעות', icon: TrendingUp },
    { id: 'predictive', label: 'ניתוח חיזוי', icon: Activity }
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">ניתוחים ויזואליים</h2>
        <div className="flex space-x-2 space-x-reverse">
          {chartOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveChart(option.id)}
              className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeChart === option.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <option.icon className="w-4 h-4" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-96">
        {activeChart === 'funnel' && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={funnelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applied" fill="#3B82F6" name="הגישו מועמדות" />
              <Bar dataKey="screened" fill="#10B981" name="עברו סינון" />
              <Bar dataKey="interviewed" fill="#F59E0B" name="ראיון" />
              <Bar dataKey="offered" fill="#EF4444" name="הצעה" />
              <Bar dataKey="hired" fill="#8B5CF6" name="נגייסו" />
            </ComposedChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'sourcing' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={sourcingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cost" name="עלות" />
                <YAxis dataKey="hires" name="גיוסים" />
                <ZAxis dataKey="efficiency" range={[50, 200]} />
                <Tooltip />
                <Scatter dataKey="hires" fill="#3B82F6" />
              </ScatterChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">יעילות ערוצי גיוס</h3>
              {sourcingData.map((item, index) => (
                <div key={item.channel} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{item.channel}</div>
                    <div className="text-sm text-gray-600">
                      {item.hires} גיוסים • ₪{item.cost.toLocaleString()} עלות
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-blue-600">{item.efficiency}%</div>
                    <div className="text-xs text-gray-500">יעילות</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeChart === 'acceptance' && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={acceptanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="rate" stroke="#3B82F6" strokeWidth={3} name="שיעור קבלה (%)" />
              <Bar yAxisId="right" dataKey="offers" fill="#10B981" name="הצעות" />
              <Bar yAxisId="right" dataKey="acceptances" fill="#F59E0B" name="קבלות" />
            </ComposedChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'predictive' && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={predictiveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={3} name="גיוסים בפועל" />
              <Line type="monotone" dataKey="predicted" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="חיזוי" />
              <Area type="monotone" dataKey="demand" fill="#F59E0B" fillOpacity={0.3} stroke="#F59E0B" name="דרישה" />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Chart Insights */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">תובנות מהגרף:</h3>
        {activeChart === 'funnel' && (
          <p className="text-sm text-blue-800">
            מחלקת R&D מראה את המשפך הרחב ביותר עם 450 מועמדים, אך שיעור המרה נמוך יחסית. 
            מומלץ לשפר תהליכי הסינון הראשוני.
          </p>
        )}
        {activeChart === 'sourcing' && (
          <p className="text-sm text-blue-800">
            ערוץ "חבר מביא חבר" מראה את היעילות הגבוהה ביותר (92%) עם עלות נמוכה. 
            מומלץ להרחיב את התוכנית.
          </p>
        )}
        {activeChart === 'acceptance' && (
          <p className="text-sm text-blue-800">
            שיעור קבלת ההצעות מראה מגמה חיובית עם עלייה מ-72% ל-89%. 
            יש לשמור על התנאים התחרותיים.
          </p>
        )}
        {activeChart === 'predictive' && (
          <p className="text-sm text-blue-800">
            המודל החיזוי מראה שהגיוסים בפועל עומדים בציפיות. 
            צפויה עלייה בדרישה ב-Q2 - יש להכין תהליכי גיוס מוקדם.
          </p>
        )}
      </div>
    </div>
  );
} 