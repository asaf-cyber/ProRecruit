'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Download,
  RefreshCw
} from 'lucide-react';

interface Insight {
  id: number;
  type: 'positive' | 'negative' | 'warning' | 'info';
  title: string;
  description: string;
  impact: string;
  recommendation?: string;
  timestamp: string;
}

export function ExecutiveSummaryBar() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI insights - בפועל זה יגיע מה-API
  useEffect(() => {
    const mockInsights: Insight[] = [
      {
        id: 1,
        type: 'warning',
        title: 'עלייה בממוצע ימי הגיוס',
        description: 'ממוצע ימי הגיוס עלה ב-15% ברבעון האחרון, בעיקר במחלקת R&D',
        impact: 'עיכוב של 3-5 ימים בממוצע לסגירת משרות',
        recommendation: 'מומלץ לבדוק זמינות מנהלים מגייסים ולשקול הרחבת צוות הגיוס',
        timestamp: '2024-01-15 10:30'
      },
      {
        id: 2,
        type: 'positive',
        title: 'שיפור בשיעור קבלת הצעות',
        description: 'שיעור קבלת ההצעות עלה ל-78% - שיפור של 12% מהרבעון הקודם',
        impact: 'הפחתת עלויות גיוס וחיסכון בזמן',
        timestamp: '2024-01-15 09:15'
      },
      {
        id: 3,
        type: 'negative',
        title: 'עלייה חדה בנשירת מועמדים',
        description: 'עלייה של 25% במועמדים שנושרים בשלב סינון טלפוני במחלקת מוצר',
        impact: 'הארכת זמן גיוס ועלייה בעלויות',
        recommendation: 'בדיקת תהליכי הסינון הראשוני ושיפור חוויית המועמד',
        timestamp: '2024-01-15 08:45'
      },
      {
        id: 4,
        type: 'info',
        title: 'חיזוי צורך בכוח אדם',
        description: 'על פי המודל החיזוי, נדרש גיוס של 15 מפתחים נוספים ב-Q2',
        impact: 'תכנון תקציבי מוקדם והכנת תהליכי גיוס',
        timestamp: '2024-01-15 08:00'
      }
    ];
    setInsights(mockInsights);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'border-green-200 bg-green-50';
      case 'negative':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const handleExportReport = () => {
    // בפועל זה ייצא דוח PDF/CSV
    console.log('Exporting executive report...');
  };

  const handleRefreshInsights = () => {
    setIsLoading(true);
    // בפועל זה יקרא ל-API לרענון התובנות
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">דשבורד מנהלים</h1>
            <p className="text-gray-600">תובנות AI וניתוח אסטרטגי</p>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={handleRefreshInsights}
              disabled={isLoading}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>רענן תובנות</span>
            </button>
            <button
              onClick={handleExportReport}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>ייצוא דוח</span>
            </button>
          </div>
        </div>
      </div>

      {/* Executive Summary Bar */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">תובנות מנהלים - AI</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
            >
              <div className="flex items-start space-x-3 space-x-reverse">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    <span className="text-xs text-gray-500">{insight.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                  <div className="text-xs text-gray-600 mb-2">
                    <strong>השפעה:</strong> {insight.impact}
                  </div>
                  {insight.recommendation && (
                    <div className="text-xs text-blue-700 bg-blue-100 p-2 rounded">
                      <strong>המלצה:</strong> {insight.recommendation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">+12%</div>
            <div className="text-sm text-gray-600">שיפור בקבלת הצעות</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">+15%</div>
            <div className="text-sm text-gray-600">עלייה בימי גיוס</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">78%</div>
            <div className="text-sm text-gray-600">שיעור קבלת הצעות</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">15</div>
            <div className="text-sm text-gray-600">משרות נדרשות Q2</div>
          </div>
        </div>
      </div>
    </div>
  );
} 