'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  Award, 
  Target,
  Calendar,
  BarChart3,
  PlusCircle,
  Search,
  Filter,
  Download,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Percent,
  Brain,
  Bell,
  Eye,
  MessageSquare,
  BookOpen,
  Settings,
  UserX,
  Heart,
  Activity,
  Zap,
  Shield
} from 'lucide-react';

const retentionStats = [
  {
    title: 'שיעור עזיבה שנתי',
    value: '13%',
    change: '-2.1%',
    trend: 'down',
    icon: UserX,
    color: 'bg-red-500',
    description: 'לעומת רבעון קודם'
  },
  {
    title: 'מדד שביעות רצון ממוצע',
    value: '4.2/5',
    change: '+0.3',
    trend: 'up',
    icon: Heart,
    color: 'bg-pink-500',
    description: 'מבוסס סקרי עובדים'
  },
  {
    title: 'עובדים בסיכון גבוה',
    value: '8',
    change: '-3',
    trend: 'down',
    icon: AlertTriangle,
    color: 'bg-orange-500',
    description: 'AI Prediction'
  },
  {
    title: 'עובדים בתוכניות פיתוח',
    value: '47',
    change: '+12',
    trend: 'up',
    icon: BookOpen,
    color: 'bg-blue-500',
    description: 'תוכניות פעילות'
  }
];

const retentionPrograms = [
  {
    id: 1,
    name: 'תוכנית פיתוח מנהיגות',
    description: 'פיתוח כישורי ניהול למועמדים בעלי פוטנציאל',
    participants: 15,
    status: 'active',
    progress: 75,
    startDate: '2024-01-15',
    endDate: '2024-12-15'
  },
  {
    id: 2,
    name: 'תוכנית מנטורינג',
    description: 'צימוד עובדים חדשים עם מנטורים מנוסים',
    participants: 28,
    status: 'active',
    progress: 60,
    startDate: '2024-03-01',
    endDate: '2024-11-30'
  },
  {
    id: 3,
    name: 'תוכנית הכשרה טכנולוגית',
    description: 'שדרוג כישורים טכנולוגיים לעובדי IT',
    participants: 22,
    status: 'planning',
    progress: 25,
    startDate: '2024-04-01',
    endDate: '2024-10-30'
  }
];

const atRiskEmployees = [
  {
    id: 1,
    name: 'דניאל כהן',
    position: 'מפתח Full Stack',
    department: 'פיתוח',
    riskLevel: 'high',
    riskFactors: ['שעות עבודה גבוהות', 'חוסר קידום', 'הצעות עבודה חיצוניות'],
    lastInteraction: '2024-01-05',
    satisfactionScore: 2.1,
    developmentPlan: 'הכשרה בטכנולוגיות חדשות',
    improvementActions: ['שיחת משוב אישית', 'הצעת קידום', 'הפחתת עומס עבודה']
  },
  {
    id: 2,
    name: 'מיכל לוי',
    position: 'מנהלת מוקד שירות',
    department: 'שירות לקוחות',
    riskLevel: 'medium',
    riskFactors: ['לחץ מלקוחות', 'חוסר בגמישות'],
    lastInteraction: '2024-01-03',
    satisfactionScore: 3.2,
    developmentPlan: 'קורס ניהול זמן ולחץ',
    improvementActions: ['שיפור תנאי עבודה', 'הכשרה בניהול לחץ']
  },
  {
    id: 3,
    name: 'אבי רוזן',
    position: 'מנהל פרויקטים',
    department: 'ניהול פרויקטים',
    riskLevel: 'low',
    riskFactors: ['עומס עבודה'],
    lastInteraction: '2024-01-07',
    satisfactionScore: 3.8,
    developmentPlan: 'הכשרה מתקדמת בניהול פרויקטים',
    improvementActions: ['ארגון מחדש של המשימות']
  }
];

export default function RetentionPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getRiskLevelText = (level: string) => {
    switch (level) {
      case 'high':
        return 'גבוה';
      case 'medium':
        return 'בינוני';
      case 'low':
        return 'נמוך';
      default:
        return 'לא ידוע';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'planning':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'פעיל';
      case 'planning':
        return 'בתכנון';
      case 'completed':
        return 'הושלם';
      default:
        return 'לא ידוע';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* AI Alerts Banner */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
              <Brain size={24} className="text-orange-600 dark:text-orange-300" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-orange-900 dark:text-orange-200 mb-1">
                התראות AI חכמות
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-orange-700 dark:text-orange-300">
                  <Bell size={16} />
                  <span>דניאל כהן (מפתח Full Stack) בסיכון גבוה לעזיבה - מומלץ שיחת משוב בשבוע הקרוב</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-orange-700 dark:text-orange-300">
                  <TrendingDown size={16} />
                  <span>ירידה חדה במדד שביעות רצון במחלקת שירות לקוחות - נפתחה משימה לפגישת צוות</span>
                </div>
              </div>
            </div>
            <a href="/retention/ai-insights" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
              צפה בכל ההתראות
            </a>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              שימור ופיתוח עובדים
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              מרכז בקרה אסטרטגי לניהול שימור העובדים, פיתוחם המקצועי ושביעות רצון
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/retention/annual-planning" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Calendar size={20} />
              תכנון שנתי
            </a>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <PlusCircle size={20} />
              תוכנית פיתוח חדשה
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Download size={20} />
              ייצא דוח
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Settings size={20} />
              התאמה אישית
            </button>
          </div>
        </div>

        {/* KPI Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {retentionStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[    
                { id: 'overview', name: 'סקירה כללית', icon: BarChart3 },
                { id: 'at-risk', name: 'עובדים בסיכון', icon: AlertTriangle },
                { id: 'development', name: 'תוכניות פיתוח', icon: BookOpen },
                { id: 'feedback', name: 'משוב עובדים', icon: MessageSquare },
                { id: 'actions', name: 'פעולות שבוצעו', icon: Activity }
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
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Satisfaction Trends Chart */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      מגמות שביעות רצון לפי מחלקות - 12 חודשים
                    </h3>
                    <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      [תרשים מגמות שביעות רצון אינטראקטיבי]
                    </div>
                  </div>

                  {/* Attrition Risk Heatmap */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Heatmap סיכוני עזיבה לפי תפקיד/ותק
                    </h3>
                    <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      [Heatmap אינטראקטיבי]
                    </div>
                  </div>
                </div>

                {/* Development Progress Chart */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    התקדמות בתוכניות פיתוח - אחוזי השלמה ותאריכי יעד
                  </h3>
                  <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    [גרף התקדמות תוכניות פיתוח]
                  </div>
                </div>
              </div>
            )}

            {/* At Risk Tab */}
            {activeTab === 'at-risk' && (
              <div className="space-y-6">
                {/* Risk Level Filter */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'all', label: 'הכל', count: atRiskEmployees.length },
                    { value: 'high', label: 'סיכון גבוה', count: atRiskEmployees.filter(e => e.riskLevel === 'high').length },
                    { value: 'medium', label: 'סיכון בינוני', count: atRiskEmployees.filter(e => e.riskLevel === 'medium').length },
                    { value: 'low', label: 'סיכון נמוך', count: atRiskEmployees.filter(e => e.riskLevel === 'low').length }
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setSelectedRiskLevel(filter.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedRiskLevel === filter.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
                      }`}
                    >
                      {filter.label} ({filter.count})
                    </button>
                  ))}
                </div>

                {/* At Risk Employees List */}
                <div className="space-y-4">
                  {atRiskEmployees
                    .filter(employee => selectedRiskLevel === 'all' || employee.riskLevel === selectedRiskLevel)
                    .map((employee) => (
                    <div key={employee.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                         onClick={() => setSelectedEmployee(employee)}>
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {employee.name}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelBadge(employee.riskLevel)}`}>
                              סיכון {getRiskLevelText(employee.riskLevel)}
                            </span>
                            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-500 rounded">
                              <Eye size={16} className="text-gray-500" />
                            </button>
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 mb-3">
                            <p>{employee.position} • {employee.department}</p>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <div className="flex items-center gap-1">
                              <Star size={16} />
                              ציון שביעות רצון: {employee.satisfactionScore}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              אינטרקציה אחרונה: {new Date(employee.lastInteraction).toLocaleDateString('he-IL')}
                            </div>
                          </div>
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">גורמי סיכון:</p>
                            <div className="flex flex-wrap gap-2">
                              {employee.riskFactors.map((factor, index) => (
                                <span key={index} className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded text-xs">
                                  {factor}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">תוכנית פיתוח אישית:</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{employee.developmentPlan}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            פגישה אישית
                          </button>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            עדכן תוכנית
                          </button>
                          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                            הצג פרופיל מלא
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Development Programs Tab */}
            {activeTab === 'development' && (
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="חיפוש תוכניות..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Filter size={20} />
                    סינון
                  </button>
                </div>

                {/* Programs List */}
                <div className="space-y-4">
                  {retentionPrograms.map((program) => (
                    <div key={program.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {program.name}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(program.status)}`}>
                              {getStatusText(program.status)}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">{program.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Users size={16} />
                              {program.participants} משתתפים
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={16} />
                              {new Date(program.startDate).toLocaleDateString('he-IL')} - {new Date(program.endDate).toLocaleDateString('he-IL')}
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-48">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">התקדמות</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{program.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${program.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback Tab */}
            {activeTab === 'feedback' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Pulse Surveys */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                        <BarChart3 size={20} className="text-blue-600 dark:text-blue-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        סקרי Pulse חודשיים
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">השתתפות בסקר האחרון:</span>
                        <span className="font-medium text-gray-900 dark:text-white mr-2">87% (125/144)</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">ציון ממוצע:</span>
                        <span className="font-medium text-gray-900 dark:text-white mr-2">4.2/5</span>
                      </div>
                      <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        הצג תוצאות מפורטות
                      </button>
                    </div>
                  </div>

                  {/* 360 Feedback */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                        <Users size={20} className="text-green-600 dark:text-green-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        משוב 360°
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">סיקורי משוב שהושלמו:</span>
                        <span className="font-medium text-gray-900 dark:text-white mr-2">23</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">ממתינים לביצוע:</span>
                        <span className="font-medium text-gray-900 dark:text-white mr-2">12</span>
                      </div>
                      <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                        נהל סיקורי משוב
                      </button>
                    </div>
                  </div>

                  {/* One-on-One Meetings */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                        <MessageSquare size={20} className="text-purple-600 dark:text-purple-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        שיחות אחד-על-אחד
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">השבוע:</span>
                        <span className="font-medium text-gray-900 dark:text-white mr-2">8 שיחות מתוכננות</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">החודש:</span>
                        <span className="font-medium text-gray-900 dark:text-white mr-2">45 שיחות הושלמו</span>
                      </div>
                      <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                        צפה בסיכומים
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Feedback Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    סיכום משוב עדכני
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">נושאים עיקריים מהמשוב:</h4>
                      <div className="space-y-2">
                        {[
                          { topic: 'איזון עבודה-חיים', mentions: 23, sentiment: 'positive' },
                          { topic: 'הזדמנויות קידום', mentions: 18, sentiment: 'neutral' },
                          { topic: 'כלים וטכנולוגיה', mentions: 15, sentiment: 'negative' },
                          { topic: 'תקשורת צוות', mentions: 12, sentiment: 'positive' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded">
                            <span className="text-sm text-gray-700 dark:text-gray-300">{item.topic}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400">{item.mentions} איזכורים</span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                item.sentiment === 'positive' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                item.sentiment === 'negative' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300' :
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                              }`}>
                                {item.sentiment === 'positive' ? 'חיובי' : item.sentiment === 'negative' ? 'שלילי' : 'ניטרלי'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">פעולות מומלצות:</h4>
                      <div className="space-y-2">
                        {[
                          'שדרוג כלי פיתוח ותוכנות עבודה',
                          'הגדרת מסלולי קידום ברורים',
                          'שיפור תהליכי תקשורת פנים-צוותית',
                          'הכשרות נוספות בטכנולוגיות חדשות'
                        ].map((action, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-white dark:bg-gray-600 rounded">
                            <CheckCircle size={16} className="text-green-500 mt-0.5" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions Taken Tab */}
            {activeTab === 'actions' && (
              <div className="space-y-6">
                {/* Action Timeline */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    יומן פעולות שימור
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        date: '2024-01-07',
                        employee: 'דניאל כהן',
                        action: 'שיחת משוב אישית',
                        outcome: 'זוהו צרכים להכשרה בטכנולוגיות חדשות',
                        status: 'completed',
                        assignee: 'שרה לוי - מנהלת HR'
                      },
                      {
                        date: '2024-01-05',
                        employee: 'מיכל רוזן',
                        action: 'העלאת שכר + בונוס ביצועים',
                        outcome: 'שיפור משמעותי במדד שביעות רצון',
                        status: 'completed',
                        assignee: 'אבי כהן - מנהל כללי'
                      },
                      {
                        date: '2024-01-03',
                        employee: 'צוות שירות לקוחות',
                        action: 'סדנת team building',
                        outcome: 'שיפור ביחסים בין-אישיים בצוות',
                        status: 'in-progress',
                        assignee: 'רחל דוד - מנהלת צוות'
                      },
                      {
                        date: '2024-01-01',
                        employee: 'יוסי מזרחי',
                        action: 'הצעת תפקיד Team Lead',
                        outcome: 'עובד קיבל את ההצעה - חתירה למעורבות גבוהה יותר',
                        status: 'completed',
                        assignee: 'דנה גולן - מנהלת פיתוח'
                      }
                    ].map((action, index) => (
                      <div key={index} className="bg-white dark:bg-gray-600 rounded-lg p-4 border-r-4 border-blue-500">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-gray-900 dark:text-white">{action.employee}</span>
                              <span className={`px-2 py-1 rounded text-xs ${
                                action.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                action.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                              }`}>
                                {action.status === 'completed' ? 'הושלם' : action.status === 'in-progress' ? 'בביצוע' : 'מתוכנן'}
                              </span>
                            </div>
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">{action.action}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{action.outcome}</p>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              <span>מבוצע על ידי: {action.assignee}</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(action.date).toLocaleDateString('he-IL')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle size={24} className="text-green-500" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">פעולות שהושלמו</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-600">28</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">החודש האחרון</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock size={24} className="text-blue-500" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">פעולות בביצוע</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">12</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">נכון לעכשיו</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp size={24} className="text-purple-500" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">שיעור הצלחה</h3>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">84%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">מפעולות שימור</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Employee Profile Modal */}
        {selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  פרופיל עובד: {selectedEmployee.name}
                </h2>
                <button 
                  onClick={() => setSelectedEmployee(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">נתוני בסיס</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                      <p><span className="font-medium">תפקיד:</span> {selectedEmployee.position}</p>
                      <p><span className="font-medium">מחלקה:</span> {selectedEmployee.department}</p>
                      <p><span className="font-medium">ותק:</span> 2.5 שנים</p>
                      <p><span className="font-medium">מנהל ישיר:</span> דנה גולן</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">מדד שביעות רצון</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold">{selectedEmployee.satisfactionScore}</span>
                        <div className="flex">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} size={20} className={star <= selectedEmployee.satisfactionScore ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">מגמה: ירידה ב-0.4 נקודות ב-3 חודשים אחרונים</p>
                    </div>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">הערכת סיכון</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelBadge(selectedEmployee.riskLevel)}`}>
                          סיכון {getRiskLevelText(selectedEmployee.riskLevel)}
                        </span>
                        <span className="text-sm text-gray-500">AI Prediction: 78% דיוק</span>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium text-sm">גורמי סיכון:</p>
                        {selectedEmployee.riskFactors.map((factor, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <AlertTriangle size={16} className="text-orange-500" />
                            <span className="text-sm">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">תוכנית פיתוח אישית</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="mb-3">{selectedEmployee.developmentPlan}</p>
                      <div className="space-y-2">
                        <p className="font-medium text-sm">פעולות מומלצות:</p>
                        {selectedEmployee.improvementActions.map((action, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-sm">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  קבע פגישת משוב
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  עדכן תוכנית פיתוח
                </button>
                <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                  שלח הודעה
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}