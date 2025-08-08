'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  Calendar,
  Target,
  Users,
  TrendingUp,
  Brain,
  BookOpen,
  Settings,
  Check,
  Plus,
  Edit,
  Save,
  BarChart3,
  AlertTriangle,
  Star,
  Clock,
  Award
} from 'lucide-react';

const currentYear = new Date().getFullYear();

const annualGoals = [
  {
    id: 1,
    category: 'שיעור עזיבה',
    currentValue: '13%',
    targetValue: '10%',
    description: 'הפחתת שיעור עזיבה ב-3%',
    aiSuggestion: 'מבוסס על נתוני 3 שנים אחרונות, יעד ריאלי'
  },
  {
    id: 2,
    category: 'מדד שביעות רצון',
    currentValue: '4.2/5',
    targetValue: '4.5/5',
    description: 'שיפור שביעות רצון ב-0.3 נקודות',
    aiSuggestion: 'יעד אגרסיבי אך אפשרי עם התערבות ממוקדת'
  },
  {
    id: 3,
    category: 'עובדים בתוכניות פיתוח',
    currentValue: '47',
    targetValue: '75',
    description: 'הרחבת כיסוי תוכניות הפיתוח',
    aiSuggestion: 'מומלץ להתמקד בעובדים בסיכון ובעלי פוטנציאל'
  },
  {
    id: 4,
    category: 'שיעור השלמת תוכניות',
    currentValue: '68%',
    targetValue: '85%',
    description: 'שיפור שיעור השלמה של תוכניות פיתוח',
    aiSuggestion: 'דרוש שיפור בתהליכי מעקב ומוטיבציה'
  }
];

const quarterlyMilestones = [
  {
    quarter: 'Q1',
    month: 'מרץ',
    activities: [
      { type: 'survey', name: 'סקר שביעות רצון רבעוני', participants: '144 עובדים' },
      { type: 'training', name: 'השקת 3 תוכניות פיתוח חדשות', participants: '25 עובדים' },
      { type: 'meeting', name: '24 פגישות 1:1 עם עובדים בסיכון', participants: '24 עובדים' }
    ]
  },
  {
    quarter: 'Q2',
    month: 'יוני',
    activities: [
      { type: 'survey', name: 'סקר שביעות רצון רבעוני', participants: '144 עובדים' },
      { type: 'review', name: 'סקירת התקדמות תוכניות פיתוח', participants: '47 עובדים' },
      { type: 'training', name: 'קורסי מנהיגות למנהלי צוותים', participants: '15 מנהלים' }
    ]
  },
  {
    quarter: 'Q3',
    month: 'ספטמבר',
    activities: [
      { type: 'survey', name: 'סקר שביעות רצון רבעוני', participants: '144 עובדים' },
      { type: 'meeting', name: 'מפגשי משוב קבוצתיים', participants: '8 צוותים' },
      { type: 'evaluation', name: 'הערכת אפקטיביות חצי שנתית', participants: 'כל העובדים' }
    ]
  },
  {
    quarter: 'Q4',
    month: 'דצמבר',
    activities: [
      { type: 'survey', name: 'סקר שביעות רצון רבעוני', participants: '144 עובדים' },
      { type: 'review', name: 'סקירה שנתית וסגירת מעגל', participants: 'הנהלה' },
      { type: 'planning', name: 'תכנון שנה הבאה', participants: 'צוות HR' }
    ]
  }
];

const aiInsights = [
  {
    type: 'prediction',
    title: 'חיזוי מגמות לשנה הבאה',
    content: 'על בסיס הנתונים, צפויה ירידה של 15% בשיעור עזיבה אם יבוצעו התערבויות מתוכננות',
    confidence: 87
  },
  {
    type: 'recommendation',
    title: 'המלצה ליעד ריאלי',
    content: 'מומלץ להגדיר יעד של 10.5% עזיבה במקום 10% - יעד ריאלי יותר עם סיכוי הצלחה גבוה',
    confidence: 92
  },
  {
    type: 'risk',
    title: 'זיהוי סיכון פוטנציאלי',
    content: 'מחלקת פיתוח צפויה להיות תחת לחץ ברבעון הראשון - מומלץ התערבות מוקדמת',
    confidence: 78
  }
];

export default function AnnualPlanningPage() {
  const [activeTab, setActiveTab] = useState('goals');
  const [editingGoal, setEditingGoal] = useState<number | null>(null);
  const [goals, setGoals] = useState(annualGoals);

  const updateGoal = (id: number, field: string, value: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, [field]: value } : goal
    ));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'survey': return BarChart3;
      case 'training': return BookOpen;
      case 'meeting': return Users;
      case 'review': return Target;
      case 'evaluation': return Star;
      case 'planning': return Calendar;
      default: return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'survey': return 'bg-blue-100 text-blue-800';
      case 'training': return 'bg-green-100 text-green-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'review': return 'bg-orange-100 text-orange-800';
      case 'evaluation': return 'bg-yellow-100 text-yellow-800';
      case 'planning': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              תכנון שנתי לשימור עובדים {currentYear}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              הגדרת יעדים, אבני דרך ותוכניות פיתוח לשנה הקרובה
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save size={20} />
              שמור תוכנית
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Brain size={20} />
              קבל המלצות AI
            </button>
          </div>
        </div>

        {/* AI Insights Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
              <Brain size={24} className="text-purple-600 dark:text-purple-300" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-3">
                תובנות AI לתכנון השנתי
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-2">{insight.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{insight.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">רמת ביטחון:</span>
                      <span className="text-xs font-medium text-purple-600">{insight.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'goals', name: 'יעדים שנתיים', icon: Target },
                { id: 'milestones', name: 'אבני דרך', icon: Calendar },
                { id: 'automation', name: 'אוטומציות', icon: Settings },
                { id: 'ai-analysis', name: 'ניתוח AI', icon: Brain }
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
            {/* Goals Tab */}
            {activeTab === 'goals' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    הגדרת יעדים שנתיים לשימור
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Plus size={16} />
                    הוסף יעד
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {goals.map((goal) => (
                    <div key={goal.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {goal.category}
                        </h4>
                        <button
                          onClick={() => setEditingGoal(editingGoal === goal.id ? null : goal.id)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <Edit size={16} className="text-gray-500" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">מצב נוכחי:</span>
                            <p className="font-bold text-xl text-gray-900 dark:text-white">
                              {goal.currentValue}
                            </p>
                          </div>
                          <div className="text-left">
                            <span className="text-sm text-gray-600 dark:text-gray-400">יעד:</span>
                            {editingGoal === goal.id ? (
                              <input
                                type="text"
                                value={goal.targetValue}
                                onChange={(e) => updateGoal(goal.id, 'targetValue', e.target.value)}
                                className="block w-20 mt-1 text-xl font-bold bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded px-2 py-1"
                              />
                            ) : (
                              <p className="font-bold text-xl text-blue-600 dark:text-blue-400">
                                {goal.targetValue}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          {editingGoal === goal.id ? (
                            <textarea
                              value={goal.description}
                              onChange={(e) => updateGoal(goal.id, 'description', e.target.value)}
                              className="w-full p-2 text-sm bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded"
                              rows={2}
                            />
                          ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {goal.description}
                            </p>
                          )}
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Brain size={16} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                              <p className="text-xs font-medium text-blue-900 dark:text-blue-200">
                                המלצת AI:
                              </p>
                              <p className="text-xs text-blue-700 dark:text-blue-300">
                                {goal.aiSuggestion}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Milestones Tab */}
            {activeTab === 'milestones' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  אבני דרך רבעוניים לשנת {currentYear}
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {quarterlyMilestones.map((milestone) => (
                    <div key={milestone.quarter} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                          <Calendar size={20} className="text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            רבעון {milestone.quarter} - {milestone.month}
                          </h4>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {milestone.activities.map((activity, index) => {
                          const ActivityIcon = getActivityIcon(activity.type);
                          return (
                            <div key={index} className="bg-white dark:bg-gray-600 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <div className="p-1.5 bg-gray-100 dark:bg-gray-500 rounded">
                                  <ActivityIcon size={16} className="text-gray-600 dark:text-gray-300" />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-medium text-sm text-gray-900 dark:text-white mb-1">
                                    {activity.name}
                                  </h5>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {activity.participants}
                                  </p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getActivityColor(activity.type)}`}>
                                  {activity.type === 'survey' ? 'סקר' :
                                   activity.type === 'training' ? 'הכשרה' :
                                   activity.type === 'meeting' ? 'פגישה' :
                                   activity.type === 'review' ? 'סקירה' :
                                   activity.type === 'evaluation' ? 'הערכה' :
                                   activity.type === 'planning' ? 'תכנון' : 'פעילות'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Automation Tab */}
            {activeTab === 'automation' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  הגדרות אוטומציה ומעקב
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Survey Automation */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                        <BarChart3 size={20} className="text-blue-600 dark:text-blue-300" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        סקרי שביעות רצון
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">תדירות:</span>
                        <span className="text-sm font-medium">רבעוני</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">שליחה אוטומטית:</span>
                        <div className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm">מופעל</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">תזכורות:</span>
                        <span className="text-sm font-medium">אחרי 3, 7 ימים</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Alerts */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                        <AlertTriangle size={20} className="text-orange-600 dark:text-orange-300" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        התראות AI
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">חיזוי סיכונים:</span>
                        <div className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm">מופעל</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">רמת רגישות:</span>
                        <span className="text-sm font-medium">בינונית</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">תדירות בדיקה:</span>
                        <span className="text-sm font-medium">יומית</span>
                      </div>
                    </div>
                  </div>

                  {/* Development Tracking */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                        <BookOpen size={20} className="text-green-600 dark:text-green-300" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        מעקב פיתוח
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">עדכון התקדמות:</span>
                        <div className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm">אוטומטי</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">תזכורות למשימות:</span>
                        <span className="text-sm font-medium">שבועי</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">AI Matching קורסים:</span>
                        <div className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm">מופעל</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Reports */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                        <TrendingUp size={20} className="text-purple-600 dark:text-purple-300" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        דוחות AI חודשיים
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">דו"ח אוטומטי:</span>
                        <div className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm">מופעל</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">יום שליחה:</span>
                        <span className="text-sm font-medium">1 לחודש</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">נמענים:</span>
                        <span className="text-sm font-medium">HR + מנהלים</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Analysis Tab */}
            {activeTab === 'ai-analysis' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ניתוח AI מתקדם לתכנון שנתי
                </h3>

                {/* Historical Analysis */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    ניתוח היסטורי ומגמות
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={16} className="text-green-500" />
                        <span className="font-medium text-sm">מגמת שיפור</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        שיעור עזיבה ירד ב-23% ב-3 השנים האחרונות
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Award size={16} className="text-blue-500" />
                        <span className="font-medium text-sm">תוכניות יעילות</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        תוכניות מנטורינג הראו ROI של 340%
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users size={16} className="text-purple-500" />
                        <span className="font-medium text-sm">קבוצות סיכון</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        מפתחי Junior - קבוצת הסיכון העיקרית
                      </p>
                    </div>
                  </div>
                </div>

                {/* Predictive Analysis */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    ניתוח חיזוי לשנה הקרובה
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          חיזוי שיעור עזיבה ברבעון הראשון
                        </span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded text-xs">
                          רמת ביטחון: 89%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-500 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                        <span className="text-sm font-medium">7.5%</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        שיפור של 40% לעומת אותה תקופה השנה הקודמת
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          ROI צפוי מהשקעה בתוכניות פיתוח
                        </span>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded text-xs">
                          רמת ביטחון: 82%
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        285%
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        החזר על השקעה תוך 18 חודשים
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    המלצות AI לשנה הקרובה
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        priority: 'גבוהה',
                        action: 'השקת תוכנית מנטורינג לפי AI Matching',
                        impact: 'הפחתת עזיבה ב-15%',
                        timeline: '3-6 חודשים'
                      },
                      {
                        priority: 'בינונית',
                        action: 'שדרוג כלי פיתוח למחלקת הטכנולוגיה',
                        impact: 'שיפור שביעות רצון ב-20%',
                        timeline: '2-4 חודשים'
                      },
                      {
                        priority: 'נמוכה',
                        action: 'הרחבת תוכניות Wellness',
                        impact: 'שיפור כללי במדדי רווחה',
                        timeline: '6-12 חודשים'
                      }
                    ].map((recommendation, index) => (
                      <div key={index} className="bg-white dark:bg-gray-600 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            recommendation.priority === 'גבוהה' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                            recommendation.priority === 'בינונית' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                            'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                          }`}>
                            {recommendation.priority}
                          </span>
                          <div className="flex-1">
                            <h5 className="font-medium text-sm text-gray-900 dark:text-white mb-1">
                              {recommendation.action}
                            </h5>
                            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                              <span>השפעה: {recommendation.impact}</span>
                              <span>זמן יישום: {recommendation.timeline}</span>
                            </div>
                          </div>
                          <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors">
                            אמץ
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