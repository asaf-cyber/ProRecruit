'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  LayoutDashboard,
  Target,
  MessageSquare,
  FileText,
  Calendar,
  Star,
  TrendingUp,
  Award,
  Book,
  Users,
  Bell,
  Settings,
  Brain,
  CheckCircle,
  Clock,
  Plus,
  ExternalLink,
  Download,
  Upload,
  Send,
  Eye,
  Zap,
  Trophy,
  Flame
} from 'lucide-react';

// Mock user data
const userData = {
  name: 'דניאל כהן',
  position: 'מפתח Full Stack',
  department: 'פיתוח',
  employeeId: 'EMP001',
  startDate: '2021-03-15',
  profileImage: null,
  satisfactionScore: 4.2,
  satisfactionTrend: '+0.3',
  points: 1,250,
  level: 'מתקדם',
  streak: 12
};

const personalKPIs = [
  {
    title: 'ציון שביעות רצון אישי',
    value: '4.2/5',
    change: '+0.3',
    trend: 'up',
    description: 'מהסקר הרבעוני האחרון'
  },
  {
    title: 'התקדמות תוכנית פיתוח',
    value: '75%',
    change: '+15%',
    trend: 'up',
    description: '3 מתוך 4 יעדים הושלמו'
  },
  {
    title: 'משימות פעילות',
    value: '2',
    change: '-1',
    trend: 'down',
    description: 'נותרו עד סוף החודש'
  },
  {
    title: 'קורסים שהושלמו השנה',
    value: '5',
    change: '+2',
    trend: 'up',
    description: 'מתוך 7 מתוכננים'
  }
];

const upcomingTasks = [
  {
    id: 1,
    title: 'סיום קורס React Advanced',
    dueDate: '2024-01-15',
    priority: 'high',
    category: 'הכשרה',
    progress: 85,
    description: 'השלמת 3 מודולים אחרונים'
  },
  {
    id: 2,
    title: 'משוב 360° לעמיתים',
    dueDate: '2024-01-12',
    priority: 'medium',
    category: 'משוב',
    progress: 0,
    description: 'מתן משוב ל-4 עמיתים'
  },
  {
    id: 3,
    title: 'פגישת 1:1 עם מנהל',
    dueDate: '2024-01-10',
    priority: 'high',
    category: 'פגישה',
    progress: 0,
    description: 'סקירת התקדמות ויעדים'
  }
];

const developmentPlan = [
  {
    id: 1,
    goal: 'שליטה בטכנולוגיות חדשות',
    description: 'לימוד Next.js 14 ו-TypeScript מתקדם',
    progress: 75,
    dueDate: '2024-03-01',
    status: 'in_progress',
    tasks: [
      { name: 'קורס Next.js 14', completed: true },
      { name: 'פרויקט מעשי', completed: true },
      { name: 'קורס TypeScript Advanced', completed: false },
      { name: 'Code Review עם Senior', completed: false }
    ]
  },
  {
    id: 2,
    goal: 'פיתוח כישורי מנהיגות',
    description: 'הכנה לתפקיד Team Lead',
    progress: 40,
    dueDate: '2024-06-01',
    status: 'in_progress',
    tasks: [
      { name: 'קורס ניהול צוותים', completed: true },
      { name: 'מנטורינג עובד חדש', completed: false },
      { name: 'הובלת פרויקט קטן', completed: false },
      { name: 'הכשרת מנהיגות', completed: false }
    ]
  }
];

const aiRecommendations = [
  {
    type: 'course',
    title: 'מומלץ: קורס Docker & Kubernetes',
    description: 'בהתבסס על הפרויקטים שלך, זה יכול לשדרג את הכישורים שלך משמעותית',
    confidence: 89,
    estimatedTime: '2 שבועות',
    points: 150
  },
  {
    type: 'skill',
    title: 'פיתוח כישורי תקשורת',
    description: 'מהמשוב האחרון, שיפור בתקשורת יכול להעלות את הציון שלך ב-15%',
    confidence: 76,
    estimatedTime: '1 חודש',
    points: 100
  },
  {
    type: 'networking',
    title: 'השתתפות בכנסים טכנולוגיים',
    description: 'רשתות מקצועיות יכולות לפתוח הזדמנויות קריירה חדשות',
    confidence: 82,
    estimatedTime: '3 חודשים',
    points: 200
  }
];

const recentFeedback = [
  {
    from: 'שרה לוי - מנהלת צוות',
    date: '2024-01-05',
    type: '1:1 Meeting',
    feedback: 'דניאל מראה שיפור משמעותי בכישורים הטכניים. מומלץ להמשיך בכיוון הנוכחי.',
    rating: 4.5
  },
  {
    from: 'עמיתים בצוות',
    date: '2024-01-03',
    type: 'Peer Review',
    feedback: 'עבודה מצוינת בפרויקט האחרון. קוד נקי ותיעוד מעולה.',
    rating: 4.8
  }
];

export default function EmployeePortalPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'גבוה';
      case 'medium': return 'בינוני';
      case 'low': return 'נמוך';
      default: return 'לא צוין';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header with User Info */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                שלום, {userData.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {userData.position} • {userData.department}
              </p>
            </div>
          </div>
          
          {/* Gamification Elements */}
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-3 text-white">
              <div className="flex items-center gap-2">
                <Trophy size={20} />
                <div className="text-right">
                  <div className="font-bold">{userData.points.toLocaleString()}</div>
                  <div className="text-xs opacity-90">נקודות</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3 text-white">
              <div className="flex items-center gap-2">
                <Award size={20} />
                <div className="text-right">
                  <div className="font-bold">{userData.level}</div>
                  <div className="text-xs opacity-90">רמה</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-3 text-white">
              <div className="flex items-center gap-2">
                <Flame size={20} />
                <div className="text-right">
                  <div className="font-bold">{userData.streak}</div>
                  <div className="text-xs opacity-90">ימי רצף</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
              <Brain size={24} className="text-purple-600 dark:text-purple-300" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-1">
                המלצות AI מותאמות אישית
              </h3>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-purple-600" />
                  <span className="text-purple-700 dark:text-purple-300">3 המלצות חדשות זמינות</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-purple-600" />
                  <span className="text-purple-700 dark:text-purple-300">2 יעדים קרובים להשלמה</span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
              צפה בהמלצות
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'dashboard', name: 'דשבורד אישי', icon: LayoutDashboard },
                { id: 'development', name: 'תוכנית פיתוח', icon: Target },
                { id: 'surveys', name: 'סקרים ומשוב', icon: MessageSquare },
                { id: 'documents', name: 'מסמכים', icon: FileText },
                { id: 'communication', name: 'תקשורת', icon: Users }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
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
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Personal KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {personalKPIs.map((kpi, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${
                          kpi.trend === 'up' ? 'bg-green-100 dark:bg-green-800' : 'bg-red-100 dark:bg-red-800'
                        }`}>
                          <TrendingUp size={20} className={
                            kpi.trend === 'up' ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'
                          } />
                        </div>
                        <span className={`text-sm font-medium ${
                          kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {kpi.change}
                        </span>
                      </div>
                      <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">{kpi.title}</h3>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{kpi.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{kpi.description}</p>
                    </div>
                  ))}
                </div>

                {/* Upcoming Tasks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        משימות קרובות
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {upcomingTasks.length} פעילות
                      </span>
                    </div>
                    <div className="space-y-4">
                      {upcomingTasks.map((task) => (
                        <div key={task.id} className="bg-white dark:bg-gray-600 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                {task.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {task.description}
                              </p>
                              <div className="flex items-center gap-3 text-xs">
                                <span className={`px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                                  {getPriorityText(task.priority)}
                                </span>
                                <span className="text-gray-500">
                                  {new Date(task.dueDate).toLocaleDateString('he-IL')}
                                </span>
                                <span className="text-gray-500">{task.category}</span>
                              </div>
                            </div>
                          </div>
                          {task.progress > 0 && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-600 dark:text-gray-400">התקדמות</span>
                                <span className="text-xs font-medium text-gray-900 dark:text-white">
                                  {task.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-500 rounded-full h-1.5">
                                <div 
                                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                  style={{ width: `${task.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain size={20} className="text-purple-600 dark:text-purple-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        המלצות AI
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {aiRecommendations.slice(0, 2).map((rec, index) => (
                        <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                {rec.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {rec.description}
                              </p>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded">
                                  {rec.confidence}% התאמה
                                </span>
                                <span className="text-gray-500">{rec.estimatedTime}</span>
                                <span className="text-green-600 font-medium">+{rec.points} נקודות</span>
                              </div>
                            </div>
                          </div>
                          <button className="w-full mt-3 px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm">
                            התחל עכשיו
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Feedback */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    משוב אחרון
                  </h3>
                  <div className="space-y-4">
                    {recentFeedback.map((feedback, index) => (
                      <div key={index} className="bg-white dark:bg-gray-600 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {feedback.from}
                              </h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(feedback.date).toLocaleDateString('he-IL')}
                              </span>
                            </div>
                            <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded text-xs mb-2">
                              {feedback.type}
                            </span>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {feedback.feedback}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 mr-4">
                            <Star size={16} className="text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {feedback.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Development Plan Tab */}
            {activeTab === 'development' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    תוכנית הפיתוח האישית שלי
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    התקדמות כללית: <span className="font-bold text-blue-600">57%</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {developmentPlan.map((goal) => (
                    <div key={goal.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {goal.goal}
                            </h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(goal.status)}`}>
                              {goal.status === 'in_progress' ? 'בתהליך' : 'הושלם'}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {goal.description}
                          </p>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            מועד יעד: {new Date(goal.dueDate).toLocaleDateString('he-IL')}
                          </div>
                        </div>
                        <div className="text-center mr-6">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {goal.progress}%
                          </div>
                          <div className="text-sm text-gray-500">הושלם</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Tasks */}
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-3">משימות:</h5>
                        {goal.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-600 rounded">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              task.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-500'
                            }`}>
                              {task.completed && <CheckCircle size={12} className="text-white" />}
                            </div>
                            <span className={`flex-1 text-sm ${
                              task.completed ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-white'
                            }`}>
                              {task.name}
                            </span>
                            {!task.completed && (
                              <button className="text-xs px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                בצע
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          עדכן התקדמות
                        </button>
                        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                          בקש עזרה
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Suggested Courses */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    קורסים מומלצים בהתבסס על המטרות שלך
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        name: 'Advanced React Patterns',
                        provider: 'Tech Academy',
                        duration: '4 שבועות',
                        rating: 4.8,
                        price: 'חינם לעובדים'
                      },
                      {
                        name: 'Leadership for Developers',
                        provider: 'Management Pro',
                        duration: '6 שבועות',
                        rating: 4.9,
                        price: 'מומן על ידי החברה'
                      }
                    ].map((course, index) => (
                      <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 dark:text-white mb-1">{course.name}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{course.provider}</p>
                        <div className="flex items-center justify-between text-xs mb-3">
                          <span className="text-gray-500">{course.duration}</span>
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-yellow-400 fill-current" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-green-600">{course.price}</span>
                          <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors">
                            הירשם
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Surveys Tab */}
            {activeTab === 'surveys' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  סקרים ומשוב
                </h3>

                {/* Available Surveys */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageSquare size={24} className="text-blue-500" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        סקר שביעות רצון רבעוני
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      הסקר הרבעוני שלנו עוזר לנו להבין טוב יותר את החוויה שלך במקום העבודה.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">זמן משוער: 5 דקות</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        חדש
                      </span>
                    </div>
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      התחל סקר
                    </button>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Users size={24} className="text-green-500" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        משוב 360°
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      מתן משוב לעמיתים שלך עוזר לכולם לגדול ולהתפתח מקצועית.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">4 עמיתים ממתינים למשוב</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                        דחוף
                      </span>
                    </div>
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      מתן משוב
                    </button>
                  </div>
                </div>

                {/* Survey History */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    היסטוריית סקרים
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        name: 'סקר שביעות רצון Q3 2023',
                        date: '2023-10-15',
                        score: 4.2,
                        status: 'הושלם'
                      },
                      {
                        name: 'סקר תרבות ארגונית',
                        date: '2023-09-20',
                        score: 4.5,
                        status: 'הושלם'
                      },
                      {
                        name: 'משוב 360° - Q3',
                        date: '2023-09-10',
                        score: 4.1,
                        status: 'הושלם'
                      }
                    ].map((survey, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">{survey.name}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(survey.date).toLocaleDateString('he-IL')}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-400 fill-current" />
                            <span className="font-medium">{survey.score}</span>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                            {survey.status}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            צפה בתוצאות
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    המסמכים שלי
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Upload size={16} />
                    העלה מסמך
                  </button>
                </div>

                {/* Document Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      category: 'מסמכי HR',
                      icon: FileText,
                      documents: [
                        'חוזה עבודה',
                        'מדיניות החברה',
                        'הערכת ביצועים 2023'
                      ]
                    },
                    {
                      category: 'אישורי הכשרה',
                      icon: Award,
                      documents: [
                        'תעודת React Advanced',
                        'אישור קורס ניהול',
                        'הכשרת בטיחות'
                      ]
                    },
                    {
                      category: 'מסמכים אישיים',
                      icon: User,
                      documents: [
                        'קורות חיים מעודכן',
                        'המלצות',
                        'יעדים אישיים'
                      ]
                    }
                  ].map((cat, index) => {
                    const Icon = cat.icon;
                    return (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Icon size={24} className="text-blue-500" />
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {cat.category}
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {cat.documents.map((doc, docIndex) => (
                            <div key={docIndex} className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded">
                              <span className="text-sm text-gray-900 dark:text-white">{doc}</span>
                              <div className="flex gap-1">
                                <button className="p-1 text-gray-500 hover:text-blue-600">
                                  <Eye size={16} />
                                </button>
                                <button className="p-1 text-gray-500 hover:text-green-600">
                                  <Download size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Communication Tab */}
            {activeTab === 'communication' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  תקשורת ושיתוף
                </h3>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button className="flex items-center gap-3 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <MessageSquare size={24} className="text-blue-600" />
                    <div className="text-right">
                      <h4 className="font-semibold text-gray-900 dark:text-white">צ'אט עם מנהל</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">שליחת הודעה מהירה</p>
                    </div>
                  </button>

                  <button className="flex items-center gap-3 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                    <Users size={24} className="text-green-600" />
                    <div className="text-right">
                      <h4 className="font-semibold text-gray-900 dark:text-white">צור קשר עם HR</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">שאלות ובקשות</p>
                    </div>
                  </button>

                  <button className="flex items-center gap-3 p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                    <Plus size={24} className="text-purple-600" />
                    <div className="text-right">
                      <h4 className="font-semibold text-gray-900 dark:text-white">הצע שיפור</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">רעיונות ופידבק</p>
                    </div>
                  </button>
                </div>

                {/* Recent Messages */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    הודעות אחרונות
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        from: 'שרה לוי - HR',
                        message: 'היי דניאל, אפשר לתאם פגישה לעדכון תוכנית הפיתוח?',
                        time: '2 שעות',
                        unread: true
                      },
                      {
                        from: 'מערכת',
                        message: 'קורס React Advanced החדש זמין לרישום',
                        time: '1 יום',
                        unread: false
                      },
                      {
                        from: 'אבי כהן - מנהל',
                        message: 'עבודה מצוינת על הפרויקט האחרון! 👏',
                        time: '3 ימים',
                        unread: false
                      }
                    ].map((msg, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        msg.unread ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-700'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-gray-900 dark:text-white">{msg.from}</h5>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{msg.time}</span>
                            {msg.unread && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{msg.message}</p>
                        <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                          השב
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compose Message */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    כתוב הודעה חדשה
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        נמען
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white">
                        <option>בחר נמען...</option>
                        <option>שרה לוי - HR</option>
                        <option>אבי כהן - מנהל</option>
                        <option>מחלקת IT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        נושא
                      </label>
                      <input 
                        type="text"
                        placeholder="נושא ההודעה"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        הודעה
                      </label>
                      <textarea 
                        rows={4}
                        placeholder="כתוב את ההודעה שלך כאן..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Send size={16} />
                      שלח
                    </button>
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