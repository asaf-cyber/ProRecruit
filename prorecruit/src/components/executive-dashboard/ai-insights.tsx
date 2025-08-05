'use client';

import { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb,
  Clock,
  Target,
  Users,
  DollarSign
} from 'lucide-react';

interface AIInsight {
  id: number;
  type: 'prediction' | 'anomaly' | 'recommendation' | 'trend';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  action?: string;
  timestamp: string;
}

export function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockInsights: AIInsight[] = [
      {
        id: 1,
        type: 'prediction',
        title: 'חיזוי צורך בכוח אדם Q2',
        description: 'על פי המודל החיזוי, נדרש גיוס של 15 מפתחים נוספים ב-Q2',
        confidence: 87,
        impact: 'high',
        action: 'התחל תהליכי גיוס מוקדם למשרות פיתוח',
        timestamp: '2024-01-15 10:30'
      },
      {
        id: 2,
        type: 'anomaly',
        title: 'זיהוי חריגות בנשירת מועמדים',
        description: 'עלייה חדה של 25% במועמדים שנושרים בשלב סינון טלפוני',
        confidence: 92,
        impact: 'medium',
        action: 'בדיקת תהליכי הסינון הראשוני',
        timestamp: '2024-01-15 09:15'
      }
    ];

    setTimeout(() => {
      setInsights(mockInsights);
      setIsLoading(false);
    }, 2000);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'prediction':
        return <Target className="w-5 h-5 text-blue-600" />;
      case 'anomaly':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'recommendation':
        return <Lightbulb className="w-5 h-5 text-yellow-600" />;
      case 'trend':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      default:
        return <Brain className="w-5 h-5 text-purple-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 space-x-reverse mb-4">
          <div className="animate-spin">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">תובנות AI</h2>
          <span className="text-sm text-gray-500">מעבד נתונים...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 space-x-reverse mb-6">
        <Brain className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">תובנות AI</h2>
        <span className="text-sm text-gray-500">ניתוח חיזוי וזיהוי חריגות</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 rounded-lg border border-blue-200 bg-blue-50"
          >
            <div className="flex items-start space-x-3 space-x-reverse">
              {getInsightIcon(insight.type)}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
                {insight.action && (
                  <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                    <div className="text-sm font-medium text-blue-900 mb-1">פעולה מומלצת:</div>
                    <div className="text-sm text-blue-800">{insight.action}</div>
                  </div>
                )}
                <div className="mt-3 text-xs text-gray-500">
                  {insight.timestamp} • דיוק: {insight.confidence}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 