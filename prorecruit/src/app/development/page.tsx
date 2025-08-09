'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import {
  Users,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  Clock,
  DollarSign,
  AlertTriangle,
  Star,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Brain,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  UserCheck,
  Filter,
  Search,
  Download,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  TrendingDown
} from 'lucide-react';

interface EmployeeDevelopment {
  id: string;
  employeeId: string;
  employeeName: string;
  email: string;
  department: string;
  position: string;
  hireDate: string;
  manager: {
    id: string;
    name: string;
    email: string;
  };
  developmentPlan: {
    currentLevel: 'junior' | 'mid' | 'senior' | 'lead' | 'manager';
    targetLevel: 'junior' | 'mid' | 'senior' | 'lead' | 'manager';
    timeline: string;
    progress: number;
    status: 'active' | 'completed' | 'on_hold' | 'cancelled';
  };
  skills: Array<{
    id: string;
    name: string;
    category: 'technical' | 'soft' | 'leadership' | 'domain';
    currentLevel: number; // 1-5
    targetLevel: number; // 1-5
    assessmentDate: string;
    certifications: Array<{
      name: string;
      provider: string;
      dateObtained: string;
      expiryDate: string;
      status: 'active' | 'expired' | 'pending';
    }>;
  }>;
  trainings: Array<{
    id: string;
    title: string;
    provider: string;
    type: 'course' | 'workshop' | 'conference' | 'mentoring' | 'internal';
    status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
    startDate: string;
    endDate: string;
    cost: number;
    outcome: string;
    rating: number;
  }>;
  performanceMetrics: {
    overallRating: number;
    goalAchievement: number;
    competencyRatings: Array<{
      competency: string;
      rating: number;
      feedback: string;
    }>;
    engagementScore: number;
    retentionRisk: 'low' | 'medium' | 'high';
    lastReviewDate: string;
    nextReviewDate: string;
  };
  careerPath: {
    currentRole: string;
    nextRole: string;
    timeToPromotion: string;
    requiredSkills: string[];
    readinessScore: number;
    mentors: Array<{
      id: string;
      name: string;
      role: string;
      relationship: 'internal' | 'external';
    }>;
  };
  retentionFactors: {
    satisfactionScore: number;
    workLifeBalance: number;
    compensationSatisfaction: number;
    careerGrowthOpportunities: number;
    teamDynamics: number;
    leadershipEffectiveness: number;
    riskIndicators: Array<{
      type: 'salary_below_market' | 'no_promotion_path' | 'low_engagement' | 'external_offers' | 'manager_issues';
      severity: 'low' | 'medium' | 'high';
      description: string;
      actionRequired: boolean;
    }>;
  };
  goals: Array<{
    id: string;
    title: string;
    description: string;
    category: 'development' | 'performance' | 'career' | 'personal';
    priority: 'low' | 'medium' | 'high';
    status: 'not_started' | 'in_progress' | 'completed' | 'overdue';
    progress: number;
    startDate: string;
    targetDate: string;
    completedDate?: string;
    milestones: Array<{
      id: string;
      title: string;
      completed: boolean;
      completedDate?: string;
    }>;
  }>;
  aiInsights: {
    retentionPrediction: {
      probability: number;
      factors: string[];
      recommendations: string[];
    };
    developmentRecommendations: string[];
    careerPathSuggestions: string[];
    trainingRecommendations: Array<{
      skill: string;
      courses: string[];
      priority: 'low' | 'medium' | 'high';
    }>;
  };
}

export default function DevelopmentPage() {
  const [employees, setEmployees] = useState<EmployeeDevelopment[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeDevelopment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRetentionRisk, setSelectedRetentionRisk] = useState('all');
  const [selectedDevelopmentStatus, setSelectedDevelopmentStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // View states
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'analytics'>('cards');
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [employees, searchQuery, selectedDepartment, selectedRetentionRisk, selectedDevelopmentStatus]);

  const loadEmployees = async () => {
    setIsLoading(true);
    // Mock data
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockEmployees: EmployeeDevelopment[] = [
      {
        id: '1',
        employeeId: 'EMP001',
        employeeName: 'יוני כהן',
        email: 'yoni.cohen@company.com',
        department: 'פיתוח',
        position: 'מפתח Full Stack',
        hireDate: '2022-03-15',
        manager: {
          id: 'MGR001',
          name: 'שרה לוי',
          email: 'sarah.levi@company.com'
        },
        developmentPlan: {
          currentLevel: 'mid',
          targetLevel: 'senior',
          timeline: '18 months',
          progress: 65,
          status: 'active'
        },
        skills: [
          {
            id: 'skill1',
            name: 'React/TypeScript',
            category: 'technical',
            currentLevel: 4,
            targetLevel: 5,
            assessmentDate: '2024-01-15',
            certifications: [
              {
                name: 'React Professional Certificate',
                provider: 'Meta',
                dateObtained: '2023-08-15',
                expiryDate: '2025-08-15',
                status: 'active'
              }
            ]
          }
        ],
        trainings: [
          {
            id: 'train1',
            title: 'Advanced React Patterns',
            provider: 'Frontend Masters',
            type: 'course',
            status: 'in_progress',
            startDate: '2024-01-01',
            endDate: '2024-02-28',
            cost: 1200,
            outcome: 'Improved component architecture skills',
            rating: 4.5
          }
        ],
        performanceMetrics: {
          overallRating: 4.2,
          goalAchievement: 85,
          competencyRatings: [
            {
              competency: 'Technical Skills',
              rating: 4.5,
              feedback: 'Excellent technical problem-solving abilities'
            }
          ],
          engagementScore: 8.2,
          retentionRisk: 'low',
          lastReviewDate: '2023-12-15',
          nextReviewDate: '2024-06-15'
        },
        careerPath: {
          currentRole: 'Senior Developer',
          nextRole: 'Tech Lead',
          timeToPromotion: '12-18 months',
          requiredSkills: ['Team Leadership', 'System Architecture', 'Mentoring'],
          readinessScore: 75,
          mentors: [
            {
              id: 'mentor1',
              name: 'דן גרוסמן',
              role: 'VP Engineering',
              relationship: 'internal'
            }
          ]
        },
        retentionFactors: {
          satisfactionScore: 8.5,
          workLifeBalance: 9.0,
          compensationSatisfaction: 7.5,
          careerGrowthOpportunities: 8.8,
          teamDynamics: 9.2,
          leadershipEffectiveness: 8.0,
          riskIndicators: [
            {
              type: 'external_offers',
              severity: 'medium',
              description: 'Recently received external offer',
              actionRequired: true
            }
          ]
        },
        goals: [
          {
            id: 'goal1',
            title: 'השלמת קורס ארכיטקטורה',
            description: 'השלמת קורס מתקדם בארכיטקטורת מערכות',
            category: 'development',
            priority: 'high',
            status: 'in_progress',
            progress: 60,
            startDate: '2024-01-01',
            targetDate: '2024-03-31',
            milestones: [
              {
                id: 'm1',
                title: 'השלמת מודול 1',
                completed: true,
                completedDate: '2024-01-15'
              }
            ]
          }
        ],
        aiInsights: {
          retentionPrediction: {
            probability: 85,
            factors: ['High performance', 'Recent external offer', 'Growth opportunities'],
            recommendations: ['Consider salary adjustment', 'Accelerate promotion timeline', 'Increase responsibilities']
          },
          developmentRecommendations: [
            'Focus on leadership skills for promotion readiness',
            'Consider system design courses',
            'Pair with senior architect for mentoring'
          ],
          careerPathSuggestions: [
            'Technical Lead track - 12 months',
            'Product Engineering track - 18 months',
            'Management track - 24 months'
          ],
          trainingRecommendations: [
            {
              skill: 'Leadership',
              courses: ['Management 3.0', 'Technical Leadership'],
              priority: 'high'
            }
          ]
        }
      },
      {
        id: '2',
        employeeId: 'EMP002',
        employeeName: 'מיכל אברהם',
        email: 'michal.abraham@company.com',
        department: 'עיצוב',
        position: 'UX Designer',
        hireDate: '2023-01-10',
        manager: {
          id: 'MGR002',
          name: 'תום שפירא',
          email: 'tom.shapira@company.com'
        },
        developmentPlan: {
          currentLevel: 'junior',
          targetLevel: 'mid',
          timeline: '12 months',
          progress: 40,
          status: 'active'
        },
        skills: [],
        trainings: [],
        performanceMetrics: {
          overallRating: 3.8,
          goalAchievement: 75,
          competencyRatings: [],
          engagementScore: 7.8,
          retentionRisk: 'medium',
          lastReviewDate: '2023-10-15',
          nextReviewDate: '2024-04-15'
        },
        careerPath: {
          currentRole: 'UX Designer',
          nextRole: 'Senior UX Designer',
          timeToPromotion: '18-24 months',
          requiredSkills: ['User Research', 'Prototyping', 'Design Systems'],
          readinessScore: 45,
          mentors: []
        },
        retentionFactors: {
          satisfactionScore: 7.2,
          workLifeBalance: 8.0,
          compensationSatisfaction: 6.5,
          careerGrowthOpportunities: 7.8,
          teamDynamics: 8.5,
          leadershipEffectiveness: 7.0,
          riskIndicators: [
            {
              type: 'salary_below_market',
              severity: 'medium',
              description: 'Salary 15% below market average',
              actionRequired: true
            }
          ]
        },
        goals: [],
        aiInsights: {
          retentionPrediction: {
            probability: 72,
            factors: ['Salary concerns', 'Limited growth path', 'Good team dynamics'],
            recommendations: ['Market salary adjustment', 'Define clear career progression', 'Assign senior mentor']
          },
          developmentRecommendations: [],
          careerPathSuggestions: [],
          trainingRecommendations: []
        }
      }
    ];

    setEmployees(mockEmployees);
    setIsLoading(false);
  };

  const filterEmployees = () => {
    let filtered = employees;

    if (searchQuery) {
      filtered = filtered.filter(emp =>
        emp.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(emp => emp.department === selectedDepartment);
    }

    if (selectedRetentionRisk !== 'all') {
      filtered = filtered.filter(emp => emp.performanceMetrics.retentionRisk === selectedRetentionRisk);
    }

    if (selectedDevelopmentStatus !== 'all') {
      filtered = filtered.filter(emp => emp.developmentPlan.status === selectedDevelopmentStatus);
    }

    setFilteredEmployees(filtered);
  };

  const getRetentionRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDevelopmentStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'on_hold': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Statistics calculations
  const totalEmployees = employees.length;
  const highRiskEmployees = employees.filter(emp => emp.performanceMetrics.retentionRisk === 'high').length;
  const activeDevelopmentPlans = employees.filter(emp => emp.developmentPlan.status === 'active').length;
  const averageEngagement = employees.reduce((sum, emp) => sum + emp.performanceMetrics.engagementScore, 0) / totalEmployees || 0;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">מערכת שימור ופיתוח עובדים</h1>
                  <p className="text-purple-700 dark:text-purple-300">ניהול קריירה, פיתוח כישורים ושימור טאלנטים</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Activity size={16} />
                  <span>מעקב בזמן אמת</span>
                </div>
                <div className="flex items-center gap-1">
                  <Brain size={16} />
                  <span>AI Insights פעיל</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                <Download size={16} />
                ייצא דוח
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm font-medium">
                <Plus size={16} />
                תכנית פיתוח חדשה
              </button>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500">
                <Brain size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">תובנות AI לפיתוח ושימור</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">ניתוח חכם וחיזוי סיכוני עזיבה</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm text-red-900 dark:text-red-100">אזהרת סיכון גבוה</h3>
                <AlertTriangle size={16} className="text-red-500" />
              </div>
              <p className="text-xs text-red-700 dark:text-red-200 mb-3">
                3 עובדים בסיכון עזיבה גבוה זוהו - מומלץ פעולה מיידית
              </p>
              <button className="text-xs font-medium px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors">
                הצג פרטים
              </button>
            </div>

            <div className="p-4 rounded-lg border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm text-orange-900 dark:text-orange-100">הזדמנות פיתוח</h3>
                <TrendingUp size={16} className="text-orange-500" />
              </div>
              <p className="text-xs text-orange-700 dark:text-orange-200 mb-3">
                12 עובדים מוכנים לקידום - כדאי להאיץ תהליכים
              </p>
              <button className="text-xs font-medium px-3 py-1 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition-colors">
                צור תכניות
              </button>
            </div>

            <div className="p-4 rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm text-green-900 dark:text-green-100">הצלחה בתכנית</h3>
                <Star size={16} className="text-green-500" />
              </div>
              <p className="text-xs text-green-700 dark:text-green-200 mb-3">
                85% מהתכניות הפעילות מתקדמות בהצלחה
              </p>
              <button className="text-xs font-medium px-3 py-1 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors">
                הצג דוח
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">סה״כ עובדים</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalEmployees}</p>
                <p className="text-sm text-green-600 dark:text-green-400">+2 מהחודש שעבר</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                <Users size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">סיכון עזיבה גבוה</p>
                <p className="text-3xl font-bold text-red-900 dark:text-red-400">{highRiskEmployees}</p>
                <p className="text-sm text-red-600 dark:text-red-400">דורש תשומת לב</p>
              </div>
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/20">
                <AlertTriangle size={24} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">תכניות פעילות</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-400">{activeDevelopmentPlans}</p>
                <p className="text-sm text-green-600 dark:text-green-400">בתהליך פיתוח</p>
              </div>
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
                <Target size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">ממוצע מעורבות</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-400">{averageEngagement.toFixed(1)}</p>
                <p className="text-sm text-purple-600 dark:text-purple-400">מתוך 10</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                <Activity size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and View Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="חיפוש עובדים..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white w-80"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Filter size={16} />
                פילטרים
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'cards'
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  כרטיסים
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'table'
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  טבלה
                </button>
                <button
                  onClick={() => setViewMode('analytics')}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'analytics'
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  אנליטיקס
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">כל המחלקות</option>
                <option value="פיתוח">פיתוח</option>
                <option value="עיצוב">עיצוב</option>
                <option value="מכירות">מכירות</option>
                <option value="משאבי אנוש">משאבי אנוש</option>
              </select>

              <select
                value={selectedRetentionRisk}
                onChange={(e) => setSelectedRetentionRisk(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">כל רמות הסיכון</option>
                <option value="low">סיכון נמוך</option>
                <option value="medium">סיכון בינוני</option>
                <option value="high">סיכון גבוה</option>
              </select>

              <select
                value={selectedDevelopmentStatus}
                onChange={(e) => setSelectedDevelopmentStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">כל הסטטוסים</option>
                <option value="active">פעיל</option>
                <option value="completed">הושלם</option>
                <option value="on_hold">מוקפא</option>
                <option value="cancelled">בוטל</option>
              </select>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('all');
                  setSelectedRetentionRisk('all');
                  setSelectedDevelopmentStatus('all');
                }}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                נקה פילטרים
              </button>
            </div>
          )}
        </div>

        {/* Content Area */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
                  </div>
                </div>
              ))
            ) : (
              filteredEmployees.map((employee) => (
                <div key={employee.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200">
                  {/* Employee Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                        {employee.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{employee.employeeName}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{employee.position}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{employee.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRetentionRiskColor(employee.performanceMetrics.retentionRisk)}`}>
                        {employee.performanceMetrics.retentionRisk === 'high' ? 'סיכון גבוה' :
                         employee.performanceMetrics.retentionRisk === 'medium' ? 'סיכון בינוני' : 'סיכון נמוך'}
                      </span>
                      <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <MoreHorizontal size={16} className="text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Development Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">קידום מקצועי</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{employee.developmentPlan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(employee.developmentPlan.progress)}`}
                        style={{ width: `${employee.developmentPlan.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>{employee.developmentPlan.currentLevel}</span>
                      <span>→</span>
                      <span>{employee.developmentPlan.targetLevel}</span>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {employee.performanceMetrics.overallRating}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">דירוג כולל</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {employee.performanceMetrics.engagementScore}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">מעורבות</div>
                    </div>
                  </div>

                  {/* Retention Factors */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">גורמי שימור</h4>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">שביעות רצון</span>
                        <span className="font-medium">{employee.retentionFactors.satisfactionScore}/10</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">איזון עבודה-חיים</span>
                        <span className="font-medium">{employee.retentionFactors.workLifeBalance}/10</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">הזדמנויות קידום</span>
                        <span className="font-medium">{employee.retentionFactors.careerGrowthOpportunities}/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Risk Indicators */}
                  {employee.retentionFactors.riskIndicators.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">אזהרות</h4>
                      <div className="space-y-2">
                        {employee.retentionFactors.riskIndicators.map((risk, index) => (
                          <div key={index} className={`p-2 rounded-lg text-xs border ${
                            risk.severity === 'high' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300' :
                            risk.severity === 'medium' ? 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-300' :
                            'bg-yellow-50 border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300'
                          }`}>
                            <div className="flex items-center gap-2">
                              {risk.actionRequired && <AlertTriangle size={12} />}
                              <span className="font-medium">{risk.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => setSelectedEmployee(employee.id)}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      <Eye size={12} />
                      הצג פרופיל
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                      <Edit size={12} />
                      ערוך תכנית
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                      <Brain size={12} />
                      AI הצעות
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {viewMode === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Retention Risk Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">התפלגות סיכוני עזיבה</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">סיכון נמוך</span>
                  </div>
                  <span className="font-semibold">
                    {employees.filter(emp => emp.performanceMetrics.retentionRisk === 'low').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">סיכון בינוני</span>
                  </div>
                  <span className="font-semibold">
                    {employees.filter(emp => emp.performanceMetrics.retentionRisk === 'medium').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">סיכון גבוה</span>
                  </div>
                  <span className="font-semibold">
                    {employees.filter(emp => emp.performanceMetrics.retentionRisk === 'high').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Development Progress Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">התקדמות תכניות פיתוח</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">פעילות</span>
                  </div>
                  <span className="font-semibold">
                    {employees.filter(emp => emp.developmentPlan.status === 'active').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">הושלמו</span>
                  </div>
                  <span className="font-semibold">
                    {employees.filter(emp => emp.developmentPlan.status === 'completed').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">מוקפאות</span>
                  </div>
                  <span className="font-semibold">
                    {employees.filter(emp => emp.developmentPlan.status === 'on_hold').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">מבצעים מובילים</h3>
              <div className="space-y-3">
                {employees
                  .sort((a, b) => b.performanceMetrics.overallRating - a.performanceMetrics.overallRating)
                  .slice(0, 5)
                  .map((employee, index) => (
                    <div key={employee.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                          {employee.employeeName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{employee.employeeName}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{employee.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-yellow-500" />
                        <span className="font-semibold text-sm">{employee.performanceMetrics.overallRating}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">פעולות נדרשות</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <AlertTriangle size={16} className="text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-red-900 dark:text-red-100">3 עובדים בסיכון עזיבה גבוה</p>
                    <p className="text-xs text-red-700 dark:text-red-300">דורש פגישה מיידית</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <Clock size={16} className="text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-orange-900 dark:text-orange-100">5 בדיקות ביצועים באיחור</p>
                    <p className="text-xs text-orange-700 dark:text-orange-300">יש לעדכן תאריכים</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <BookOpen size={16} className="text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">12 הזדמנויות הכשרה</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300">מוכנות להרשמה</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredEmployees.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center flex mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">לא נמצאו עובדים</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">נסה לשנות את הפילטרים או הוסף עובדים חדשים</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}