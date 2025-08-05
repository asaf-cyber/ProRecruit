'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  DollarSign, 
  CheckCircle,
  Target,
  BarChart3
} from 'lucide-react';

interface KPI {
  id: string;
  title: string;
  currentValue: string | number;
  previousValue: string | number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: any;
  color: string;
  description: string;
  benchmark?: string;
}

interface ExecutiveKPIsProps {
  department: string;
  client: string;
  dateRange: string;
  jobType: string;
}

export function ExecutiveKPIs({
  department,
  client,
  dateRange,
  jobType
}: ExecutiveKPIsProps) {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - בפועל זה יגיע מה-API עם הפילטרים
    const mockKPIs: KPI[] = [
      {
        id: 'hiring-funnel',
        title: 'Hiring Funnel',
        currentValue: '1,247',
        previousValue: '1,132',
        change: 10.2,
        changeType: 'positive',
        icon: Users,
        color: 'text-blue-600',
        description: 'מועמדים חדשים בתהליך',
        benchmark: 'תעשייה: +8%'
      },
      {
        id: 'days-to-hire',
        title: 'Days to Hire',
        currentValue: '23',
        previousValue: '20',
        change: -15.0,
        changeType: 'negative',
        icon: Clock,
        color: 'text-red-600',
        description: 'ממוצע ימים לגיוס',
        benchmark: 'תעשייה: 25 ימים'
      },
      {
        id: 'cost-per-hire',
        title: 'Cost per Hire',
        currentValue: '₪8,500',
        previousValue: '₪9,200',
        change: 7.6,
        changeType: 'positive',
        icon: DollarSign,
        color: 'text-green-600',
        description: 'עלות גיוס ממוצעת',
        benchmark: 'תעשייה: ₪10,000'
      },
      {
        id: 'offer-acceptance',
        title: 'Offer Acceptance Rate',
        currentValue: '78%',
        previousValue: '72%',
        change: 8.3,
        changeType: 'positive',
        icon: CheckCircle,
        color: 'text-purple-600',
        description: 'שיעור קבלת הצעות',
        benchmark: 'תעשייה: 75%'
      },
      {
        id: 'time-to-fill',
        title: 'Time to Fill',
        currentValue: '18',
        previousValue: '15',
        change: -20.0,
        changeType: 'negative',
        icon: Target,
        color: 'text-orange-600',
        description: 'ממוצע ימים למילוי משרה',
        benchmark: 'תעשייה: 22 ימים'
      },
      {
        id: 'quality-of-hire',
        title: 'Quality of Hire',
        currentValue: '4.2/5',
        previousValue: '4.0/5',
        change: 5.0,
        changeType: 'positive',
        icon: BarChart3,
        color: 'text-indigo-600',
        description: 'איכות המועמדים שנגייסו',
        benchmark: 'תעשייה: 3.8/5'
      }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setKpis(mockKPIs);
      setIsLoading(false);
    }, 1000);
  }, [department, client, dateRange, jobType]);

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">מדדי ביצוע מרכזיים (KPIs)</h2>
        <div className="text-sm text-gray-600">
          השוואה לתקופה קודמת
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-white ${kpi.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div className="flex items-center space-x-1 space-x-reverse">
                {getChangeIcon(kpi.changeType)}
                <span className={`text-sm font-medium ${getChangeColor(kpi.changeType)}`}>
                  {kpi.change > 0 ? '+' : ''}{kpi.change.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{kpi.title}</h3>
              <div className="text-2xl font-bold text-gray-900">{kpi.currentValue}</div>
              <p className="text-sm text-gray-600">{kpi.description}</p>
              
              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">תקופה קודמת:</span>
                  <span className="font-medium">{kpi.previousValue}</span>
                </div>
                {kpi.benchmark && (
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-gray-500">Benchmark:</span>
                    <span className="font-medium text-blue-600">{kpi.benchmark}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-900">4</div>
          <div className="text-sm text-blue-700">KPIs משתפרים</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-red-900">2</div>
          <div className="text-sm text-red-700">KPIs יורדים</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">83%</div>
          <div className="text-sm text-gray-700">יעילות כללית</div>
        </div>
      </div>
    </div>
  );
} 