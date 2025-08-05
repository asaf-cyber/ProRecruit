'use client';

import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Target,
  Zap
} from 'lucide-react';

export function OnboardingStats() {
  const stats = [
    { 
      label: 'עובדים בתהליך', 
      value: '23', 
      icon: Users, 
      color: 'text-blue-600',
      change: '+5 השבוע',
      trend: 'up'
    },
    { 
      label: 'קליטות הושלמו', 
      value: '156', 
      icon: CheckCircle, 
      color: 'text-green-600',
      change: '+12 החודש',
      trend: 'up'
    },
    { 
      label: 'משימות ממתינות', 
      value: '89', 
      icon: Clock, 
      color: 'text-orange-600',
      change: '-8 מהשבוע הקודם',
      trend: 'down'
    },
    { 
      label: 'משימות שעבר זמנן', 
      value: '7', 
      icon: AlertCircle, 
      color: 'text-red-600',
      change: '-3 מהשבוע הקודם',
      trend: 'down'
    },
    { 
      label: 'זמן קליטה ממוצע', 
      value: '4.2 ימים', 
      icon: Target, 
      color: 'text-purple-600',
      change: '-0.8 ימים',
      trend: 'down'
    },
    { 
      label: 'יעילות אוטומציה', 
      value: '87%', 
      icon: Zap, 
      color: 'text-indigo-600',
      change: '+5% מהחודש הקודם',
      trend: 'up'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isTrendUp = stat.trend === 'up';
        const isTrendDown = stat.trend === 'down';
        
        return (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {isTrendUp && (
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  )}
                  {isTrendDown && (
                    <TrendingUp className="w-4 h-4 text-red-600 mr-1 transform rotate-180" />
                  )}
                  <p className={`text-xs ${isTrendUp ? 'text-green-600' : isTrendDown ? 'text-red-600' : 'text-gray-500'}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-gray-100 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 