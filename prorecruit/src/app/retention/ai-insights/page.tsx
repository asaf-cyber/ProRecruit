'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Users,
  Calendar,
  Target,
  Award,
  Activity,
  Eye,
  Download,
  RefreshCw,
  Settings,
  Zap,
  BarChart3,
  Clock
} from 'lucide-react';

const monthlyInsights = [
  {
    month: 'ינואר 2024',
    totalEmployees: 144,
    atRiskEmployees: 8,
    newPrograms: 2,
    completedActions: 15,
    satisfactionChange: '+0.2',
    keyInsights: [
      'דניאל כהן זוהה כעובד בסיכון גבוה - נדרשת התערבות מיידית',
      'מחלקת פיתוח מראה שיפור במדדי שביעות רצון (+0.4)',
      'תוכנית המנטורינג הראתה ROI של 280% ברבעון'
    ],
    aiPredictions: [
      {
        type: 'attrition',
        prediction: 'צפוי שיעור עזיבה של 11% ברבעון הבא',
        confidence: 87,
        trend: 'down'
      },
      {
        type: 'satisfaction',
        prediction: 'שביעות רצון במחלקת שירות צפויה לרדת',
        confidence: 73,
        trend: 'down'
      }
    ]
  },
  {
    month: 'דצמבר 2023',
    totalEmployees: 142,
    atRiskEmployees: 11,
    newPrograms: 3,
    completedActions: 22,
    satisfactionChange: '-0.1',
    keyInsights: [
      'עליה במספר עובדים בסיכון בחודשי החורף',
      'תוכניות הפיתוח הטכנולוגי הראו תוצאות מעולות',
      'נדרש שיפור בתקשורת הפנים-ארגונית'
    ],
    aiPredictions: [
      {
        type: 'seasonal',
        prediction: 'מגמת עזיבה גבוהה יותר בחורף',
        confidence: 91,
        trend: 'up'
      }
    ]
  }
];

const riskFactorsAnalysis = [
  {
    factor: 'עומס עבודה גבוה',
    frequency: 45,
    impact: 'גבוה',
    trend: 'עולה',
    affectedDepartments: ['פיתוח', 'שירות לקוחות'],
    recommendation: 'הגדלת כוח אדם או שיפור תהליכים'
  },
  {
    factor: 'חוסר הזדמנויות קידום',
    frequency: 32,
    impact: 'בינוני-גבוה',
    trend: 'יציב',
    affectedDepartments: ['מכירות', 'ניהול פרויקטים'],
    recommendation: 'פיתוח מסלולי קידום ברורים'
  },
  {
    factor: 'כלים וטכנולוגיה מיושנים',
    frequency: 28,
    impact: 'בינוני',
    trend: 'יורד',
    affectedDepartments: ['פיתוח'],
    recommendation: 'השקעה בשדרוג טכנולוגי'
  },
  {
    factor: 'איזון עבודה-חיים',
    frequency: 23,
    impact: 'גבוה',
    trend: 'יורד',
    affectedDepartments: ['כל המחלקות'],
    recommendation: 'מדיניות עבודה גמישה ו-wellness'
  }
];

const successfulInterventions = [
  {
    employee: 'מיכל רוזן',
    department: 'מכירות',
    intervention: 'העלאת שכר + בונוס',
    beforeScore: 2.8,
    afterScore: 4.1,
    cost: '15,000 ₪',
    roi: '340%',
    timeframe: '3 חודשים'
  },
  {
    employee: 'יוסי מזרחי',
    department: 'פיתוח',
    intervention: 'קידום ל-Team Lead',
    beforeScore: 3.2,
    afterScore: 4.4,
    cost: '25,000 ₪',
    roi: '280%',
    timeframe: '2 חודשים'
  },
  {
    employee: 'דנה כהן',
    department: 'שירות לקוחות',
    intervention: 'הכשרה מתקדמת + גמישות',
    beforeScore: 2.9,
    afterScore: 4.0,
    cost: '8,000 ₪',
    roi: '450%',
    timeframe: '4 חודשים'
  }
];

export default function AIInsightsPage() {
  const [activeTab, setActiveTab] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'גבוה':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'בינוני-גבוה':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'בינוני':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'עולה':
      case 'up':
        return <TrendingUp size={16} className="text-red-500" />;
      case 'יורד':
      case 'down':
        return <TrendingDown size={16} className="text-green-500" />;
      default:
        return <Activity size={16} className="text-gray-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              תובנות AI ומעקב חודשי
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              ניתוח מתקדם, חיזויים ותובנות עמוקות על מגמות שימור עובדים
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">עדכון אוטומטי:</label>
              <input 
                type="checkbox" 
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <RefreshCw size={20} />
              רענן נתונים
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download size={20} />
              ייצא דו"ח
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Settings size={20} />
              הגדרות AI
            </button>
          </div>
        </div>

        {/* Real-time AI Status */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
              <Brain size={24} className="text-blue-600 dark:text-blue-300" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                סטטוס AI - עדכון אחרון: היום בשעה 08:15
              </h3>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-blue-700 dark:text-blue-300">מודל חיזוי עזיבה: פעיל</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-blue-700 dark:text-blue-300">ניתוח מגמות: עדכני</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-blue-700 dark:text-blue-300">המלצות: 3 חדשות</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">94%</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">דיוק חיזויים</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'monthly', name: 'מעקב חודשי', icon: Calendar },
                { id: 'risk-analysis', name: 'ניתוח גורמי סיכון', icon: AlertTriangle },
                { id: 'interventions', name: 'התערבויות מוצלחות', icon: Award },
                { id: 'predictions', name: 'חיזויים ומגמות', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Monthly Tracking Tab */}
            {activeTab === 'monthly' && (
              <div className="space-y-6">
                {/* Month Selector */}
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900 dark:text-white">בחר חודש:</span>
                  <div className="flex gap-2">
                    {monthlyInsights.map((insight, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMonth(index)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedMonth === index
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                        }`}
                      >
                        {insight.month}
                      </button>
                    ))}
                  </div>
                </div>

                {monthlyInsights[selectedMonth] && (
                  <>
                    {/* Monthly Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Users size={24} className="text-blue-500" />
                          <h3 className="font-semibold text-gray-900 dark:text-white">סה"כ עובדים</h3>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {monthlyInsights[selectedMonth].totalEmployees}
                        </p>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <AlertTriangle size={24} className="text-orange-500" />
                          <h3 className="font-semibold text-gray-900 dark:text-white">עובדים בסיכון</h3>
                        </div>
                        <p className="text-3xl font-bold text-orange-600">
                          {monthlyInsights[selectedMonth].atRiskEmployees}
                        </p>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Target size={24} className="text-green-500" />
                          <h3 className="font-semibold text-gray-900 dark:text-white">תוכניות חדשות</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-600">
                          {monthlyInsights[selectedMonth].newPrograms}
                        </p>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Activity size={24} className="text-purple-500" />
                          <h3 className="font-semibold text-gray-900 dark:text-white">פעולות שבוצעו</h3>
                        </div>
                        <p className="text-3xl font-bold text-purple-600">
                          {monthlyInsights[selectedMonth].completedActions}
                        </p>
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        תובנות מרכזיות - {monthlyInsights[selectedMonth].month}
                      </h3>
                      <div className="space-y-3">
                        {monthlyInsights[selectedMonth].keyInsights.map((insight, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-600 rounded-lg">
                            <Eye size={16} className="text-blue-500 mt-0.5" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{insight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Predictions */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        חיזויים AI לחודש הבא
                      </h3>
                      <div className="space-y-3">
                        {monthlyInsights[selectedMonth].aiPredictions.map((prediction, index) => (
                          <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {getTrendIcon(prediction.trend)}
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {prediction.prediction}
                                </span>
                              </div>
                              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded text-xs font-medium">
                                {prediction.confidence}% דיוק
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Risk Analysis Tab */}
            {activeTab === 'risk-analysis' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ניתוח גורמי סיכון לעזיבה
                </h3>

                <div className="space-y-4">
                  {riskFactorsAnalysis.map((factor, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {factor.factor}
                            </h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(factor.impact)}`}>
                              {factor.impact}
                            </span>
                            {getTrendIcon(factor.trend)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <span>תדירות: {factor.frequency} איזכורים</span>
                            <span>מגמה: {factor.trend}</span>
                          </div>
                          <div className="mb-3">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">מחלקות מושפעות: </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {factor.affectedDepartments.join(', ')}
                            </span>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <Zap size={16} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                              <div>
                                <p className="text-xs font-medium text-blue-900 dark:text-blue-200">
                                  המלצת AI:
                                </p>
                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                  {factor.recommendation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-32">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                              {factor.frequency}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">איזכורים</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Successful Interventions Tab */}
            {activeTab === 'interventions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    התערבויות מוצלחות - case studies
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ROI ממוצע: <span className="font-bold text-green-600">356%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {successfulInterventions.map((intervention, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Employee Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Award size={24} className="text-green-500" />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {intervention.employee}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {intervention.department}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">התערבות: </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {intervention.intervention}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">ציון לפני:</span>
                              <div className="font-bold text-red-600">{intervention.beforeScore}</div>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">ציון אחרי:</span>
                              <div className="font-bold text-green-600">{intervention.afterScore}</div>
                            </div>
                          </div>
                        </div>

                        {/* Results */}
                        <div className="lg:w-64 bg-white dark:bg-gray-700 rounded-lg p-4">
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-3">תוצאות</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">עלות:</span>
                              <span className="font-medium">{intervention.cost}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">ROI:</span>
                              <span className="font-bold text-green-600">{intervention.roi}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">זמן:</span>
                              <span className="font-medium">{intervention.timeframe}</span>
                            </div>
                            <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/20 rounded text-center">
                              <span className="text-xs font-medium text-green-800 dark:text-green-300">
                                שיפור: +{((intervention.afterScore - intervention.beforeScore) * 100 / intervention.beforeScore).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Predictions Tab */}
            {activeTab === 'predictions' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  חיזויים ומגמות AI
                </h3>

                {/* Prediction Charts Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      חיזוי שיעור עזיבה - 6 חודשים קדימה
                    </h4>
                    <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      [תרשים חיזוי עזיבה עם רמת ביטחון]
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      מגמות שביעות רצון לפי מחלקות
                    </h4>
                    <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      [תרשים מגמות שביעות רצון]
                    </div>
                  </div>
                </div>

                {/* Future Recommendations */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    המלצות AI לתקופה הקרובה
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        priority: 'דחוף',
                        action: 'התערבות מיידית עבור 3 עובדים בסיכון גבוה במחלקת פיתוח',
                        timeline: 'השבוע',
                        impact: 'מניעת עזיבה של עובדים מפתח'
                      },
                      {
                        priority: 'גבוה',
                        action: 'השקת תוכנית wellness למחלקת שירות לקוחות',
                        timeline: 'חודש הבא',
                        impact: 'שיפור צפוי של 25% במדדי רווחה'
                      },
                      {
                        priority: 'בינוני',
                        action: 'סקר מעמיק על כלי עבודה במחלקת הפיתוח',
                        timeline: '2 חודשים',
                        impact: 'זיהוי צרכי שדרוג טכנולוגי'
                      }
                    ].map((recommendation, index) => (
                      <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                recommendation.priority === 'דחוף' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                                recommendation.priority === 'גבוה' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300' :
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                              }`}>
                                {recommendation.priority}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {recommendation.timeline}
                              </span>
                            </div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              {recommendation.action}
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {recommendation.impact}
                            </p>
                          </div>
                          <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                            בצע
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}