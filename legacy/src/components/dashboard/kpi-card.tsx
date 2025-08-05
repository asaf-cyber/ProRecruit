'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  trend?: number;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  iconColor = 'text-blue-600',
  trend 
}: KPICardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendColor = () => {
    if (!trend) return 'text-gray-400';
    return trend > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="kpi-card animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          {change && (
            <div className="flex items-center">
              <span className={`text-sm font-medium ${getChangeColor()}`}>
                {change}
              </span>
              {trend && (
                <div className="ml-2 w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getTrendColor().replace('text-', 'bg-')}`}
                    style={{ width: `${Math.abs(trend)}%` }}
                  ></div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gray-100 ${iconColor.replace('text-', 'bg-').replace('-600', '-100')}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
} 