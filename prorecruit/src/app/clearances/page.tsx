'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ClearancesTable } from '@/components/clearances/clearances-table';
import { ClearancesFilters } from '@/components/clearances/clearances-filters';
import { ClearancesHeader } from '@/components/clearances/clearances-header';
import { 
  Shield, 
  Plus, 
  AlertTriangle, 
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Eye,
  Search,
  Filter,
  RefreshCw,
  Brain,
  Target,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  Star,
  Award,
  Lock,
  Unlock,
  AlertCircle,
  Info,
  Zap,
  Phone,
  Mail,
  Building,
  Flag,
  Timer,
  UserCheck,
  ShieldCheck,
  ShieldX,
  ShieldAlert
} from 'lucide-react';

interface SecurityClearance {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  jobTitle: string;
  clientName: string;
  clearanceLevel: 'basic' | 'secret' | 'top_secret' | 'cosmic';
  status: 'pending' | 'in_progress' | 'approved' | 'rejected' | 'expired' | 'suspended';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedDate: string;
  expectedCompletionDate: string;
  actualCompletionDate?: string;
  expiryDate?: string;
  // Process details
  investigator: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  securityOfficer: {
    id: string;
    name: string;
    email: string;
    department: string;
  };
  // Background check components
  backgroundCheck: {
    criminalHistory: 'pending' | 'clear' | 'issues_found' | 'not_applicable';
    creditCheck: 'pending' | 'excellent' | 'good' | 'fair' | 'poor' | 'not_applicable';
    employmentVerification: 'pending' | 'verified' | 'discrepancies' | 'not_applicable';
    educationVerification: 'pending' | 'verified' | 'discrepancies' | 'not_applicable';
    referenceChecks: 'pending' | 'positive' | 'concerns' | 'not_applicable';
    internationalTravel: 'pending' | 'reviewed' | 'concerns' | 'not_applicable';
    polygraphTest?: 'pending' | 'passed' | 'failed' | 'not_required';
    psychologicalEvaluation?: 'pending' | 'passed' | 'concerns' | 'not_required';
  };
  // Documents and requirements
  requiredDocuments: Array<{
    id: string;
    type: 'id' | 'passport' | 'birth_certificate' | 'employment_history' | 'financial_disclosure' | 'foreign_contacts' | 'other';
    name: string;
    status: 'pending' | 'submitted' | 'approved' | 'rejected';
    submittedDate?: string;
    reviewedDate?: string;
    reviewedBy?: string;
    comments?: string;
    url?: string;
  }>;
  // Interview and meetings
  interviews: Array<{
    id: string;
    type: 'initial' | 'follow_up' | 'final' | 'security_briefing';
    date: string;
    duration: number;
    interviewer: string;
    location: string;
    status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
    notes?: string;
    outcome?: string;
  }>;
  // Risk assessment
  riskFactors: Array<{
    id: string;
    category: 'financial' | 'foreign_contacts' | 'criminal' | 'substance_abuse' | 'psychological' | 'other';
    level: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    mitigationPlan?: string;
    resolved: boolean;
  }>;
  // Approval workflow
  approvalWorkflow: Array<{
    id: string;
    stage: 'initial_review' | 'investigation' | 'evaluation' | 'committee_review' | 'final_approval';
    status: 'pending' | 'in_progress' | 'approved' | 'rejected';
    assignedTo: string;
    dueDate: string;
    completedDate?: string;
    decision?: string;
    comments?: string;
  }>;
  // Compliance and monitoring
  complianceChecks: {
    periodicReview: {
      nextDue: string;
      frequency: 'annual' | 'biennial' | 'quinquennial';
      status: 'current' | 'due' | 'overdue';
    };
    incidentReports: Array<{
      id: string;
      date: string;
      type: 'security_violation' | 'policy_breach' | 'suspicious_activity' | 'other';
      severity: 'low' | 'medium' | 'high' | 'critical';
      description: string;
      actionTaken: string;
      reportedBy: string;
    }>;
  };
  // Additional metadata
  estimatedCost: number;
  actualCost?: number;
  vendor?: string;
  specialRequirements: string[];
  notes: string;
  lastUpdated: string;
  updatedBy: string;
}

export default function ClearancesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'basic' | 'secret' | 'top_secret' | 'cosmic'>('all');
  const [selectedPriority, setPriority] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards' | 'timeline' | 'analytics'>('cards');
  const [isLoading, setIsLoading] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [selectedClearance, setSelectedClearance] = useState<SecurityClearance | null>(null);
  const [showNewClearanceModal, setShowNewClearanceModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for security clearances
  const mockClearances: SecurityClearance[] = [
    {
      id: '1',
      candidateId: 'cand1',
      candidateName: 'דוד כהן',
      candidateEmail: 'david.cohen@email.com',
      candidatePhone: '+972-50-123-4567',
      jobTitle: 'מפתח תוכנה ביטחוני',
      clientName: 'רפאל מערכות לחימה',
      clearanceLevel: 'secret',
      status: 'in_progress',
      priority: 'high',
      submittedDate: '2024-01-10',
      expectedCompletionDate: '2024-03-10',
      investigator: {
        id: 'inv1',
        name: 'שרה לוי',
        email: 'sarah.levy@security.gov.il',
        phone: '+972-50-999-1111'
      },
      securityOfficer: {
        id: 'so1',
        name: 'מיכל רוזן',
        email: 'michal.rosen@rafael.co.il',
        department: 'אבטחת מידע'
      },
      backgroundCheck: {
        criminalHistory: 'clear',
        creditCheck: 'good',
        employmentVerification: 'verified',
        educationVerification: 'verified',
        referenceChecks: 'positive',
        internationalTravel: 'pending',
        polygraphTest: 'pending'
      },
      requiredDocuments: [
        {
          id: 'doc1',
          type: 'id',
          name: 'תעודת זהות',
          status: 'approved',
          submittedDate: '2024-01-10',
          reviewedDate: '2024-01-12',
          reviewedBy: 'שרה לוי'
        },
        {
          id: 'doc2',
          type: 'employment_history',
          name: 'היסטוריית תעסוקה',
          status: 'pending',
          submittedDate: '2024-01-15'
        }
      ],
      interviews: [
        {
          id: 'int1',
          type: 'initial',
          date: '2024-01-20',
          duration: 90,
          interviewer: 'שרה לוי',
          location: 'משרד הביטחון',
          status: 'completed',
          notes: 'ראיון ראשוני עבר בהצלחה'
        }
      ],
      riskFactors: [],
      approvalWorkflow: [
        {
          id: 'stage1',
          stage: 'initial_review',
          status: 'approved',
          assignedTo: 'שרה לוי',
          dueDate: '2024-01-15',
          completedDate: '2024-01-14',
          decision: 'approved',
          comments: 'תיקים בסדר, המשך לחקירה'
        },
        {
          id: 'stage2',
          stage: 'investigation',
          status: 'in_progress',
          assignedTo: 'יוסי גולדברג',
          dueDate: '2024-02-28'
        }
      ],
      complianceChecks: {
        periodicReview: {
          nextDue: '2029-01-10',
          frequency: 'quinquennial',
          status: 'current'
        },
        incidentReports: []
      },
      estimatedCost: 15000,
      specialRequirements: ['גישה למידע מוגבל'],
      notes: 'מועמד מעולה עם רקע טכנולוגי חזק',
      lastUpdated: '2024-01-21',
      updatedBy: 'שרה לוי'
    },
    {
      id: '2',
      candidateId: 'cand2',
      candidateName: 'מיכל ישראלי',
      candidateEmail: 'michal.israeli@email.com',
      candidatePhone: '+972-52-987-6543',
      jobTitle: 'אנליסטית מודיעין',
      clientName: 'אלביט מערכות',
      clearanceLevel: 'top_secret',
      status: 'pending',
      priority: 'urgent',
      submittedDate: '2024-01-15',
      expectedCompletionDate: '2024-04-15',
      investigator: {
        id: 'inv2',
        name: 'אבי דוד',
        email: 'avi.david@security.gov.il',
        phone: '+972-50-888-2222'
      },
      securityOfficer: {
        id: 'so2',
        name: 'רונית שפירא',
        email: 'ronit.shapira@elbit.co.il',
        department: 'ביטחון תאגידי'
      },
      backgroundCheck: {
        criminalHistory: 'pending',
        creditCheck: 'pending',
        employmentVerification: 'pending',
        educationVerification: 'pending',
        referenceChecks: 'pending',
        internationalTravel: 'pending',
        polygraphTest: 'not_required',
        psychologicalEvaluation: 'pending'
      },
      requiredDocuments: [
        {
          id: 'doc3',
          type: 'id',
          name: 'תעודת זהות',
          status: 'submitted',
          submittedDate: '2024-01-15'
        }
      ],
      interviews: [],
      riskFactors: [],
      approvalWorkflow: [
        {
          id: 'stage1',
          stage: 'initial_review',
          status: 'pending',
          assignedTo: 'אבי דוד',
          dueDate: '2024-01-22'
        }
      ],
      complianceChecks: {
        periodicReview: {
          nextDue: '2029-01-15',
          frequency: 'quinquennial',
          status: 'current'
        },
        incidentReports: []
      },
      estimatedCost: 25000,
      specialRequirements: ['גישה למידע סודי ביותר', 'הערכה פסיכולוגית'],
      notes: 'דרוש סיווג גבוה למשרה רגישה',
      lastUpdated: '2024-01-15',
      updatedBy: 'אבי דוד'
    },
    {
      id: '3',
      candidateId: 'cand3',
      candidateName: 'יוסי גולדברג',
      candidateEmail: 'yossi.goldberg@email.com',
      candidatePhone: '+972-54-456-7890',
      jobTitle: 'מהנדס מערכות',
      clientName: 'משרד הביטחון',
      clearanceLevel: 'cosmic',
      status: 'rejected',
      priority: 'medium',
      submittedDate: '2023-12-01',
      expectedCompletionDate: '2024-06-01',
      actualCompletionDate: '2024-01-18',
      investigator: {
        id: 'inv3',
        name: 'דינה כהן',
        email: 'dina.cohen@security.gov.il',
        phone: '+972-50-777-3333'
      },
      securityOfficer: {
        id: 'so3',
        name: 'יואב ישראלי',
        email: 'yoav.israeli@mod.gov.il',
        department: 'אבטחה מתקדמת'
      },
      backgroundCheck: {
        criminalHistory: 'clear',
        creditCheck: 'fair',
        employmentVerification: 'discrepancies',
        educationVerification: 'verified',
        referenceChecks: 'concerns',
        internationalTravel: 'concerns',
        polygraphTest: 'failed'
      },
      requiredDocuments: [
        {
          id: 'doc4',
          type: 'financial_disclosure',
          name: 'גילוי נכסים',
          status: 'rejected',
          submittedDate: '2023-12-05',
          reviewedDate: '2024-01-10',
          reviewedBy: 'דינה כהן',
          comments: 'חסרים פרטים על חובות'
        }
      ],
      interviews: [
        {
          id: 'int2',
          type: 'final',
          date: '2024-01-15',
          duration: 120,
          interviewer: 'דינה כהן',
          location: 'קריה',
          status: 'completed',
          outcome: 'לא מומלץ לאישור'
        }
      ],
      riskFactors: [
        {
          id: 'risk1',
          category: 'financial',
          level: 'high',
          description: 'חובות גבוהים ללא הסבר',
          resolved: false
        },
        {
          id: 'risk2',
          category: 'foreign_contacts',
          level: 'medium',
          description: 'קשרים עסקיים במדינות רגישות',
          resolved: false
        }
      ],
      approvalWorkflow: [
        {
          id: 'stage3',
          stage: 'final_approval',
          status: 'rejected',
          assignedTo: 'ועדת אישורים',
          dueDate: '2024-01-20',
          completedDate: '2024-01-18',
          decision: 'rejected',
          comments: 'סיכונים גבוהים מדי'
        }
      ],
      complianceChecks: {
        periodicReview: {
          nextDue: '2024-01-01',
          frequency: 'annual',
          status: 'overdue'
        },
        incidentReports: []
      },
      estimatedCost: 45000,
      actualCost: 48000,
      specialRequirements: ['בדיקת פוליגרף מורחבת', 'הערכה פסיכולוגית מעמיקה'],
      notes: 'נדחה עקב סיכונים ביטחוניים',
      lastUpdated: '2024-01-18',
      updatedBy: 'דינה כהן'
    }
  ];

  // Enhanced filtering logic
  const filteredClearances = mockClearances.filter(clearance => {
    const matchesSearch = clearance.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         clearance.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         clearance.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         clearance.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || clearance.status === selectedStatus;
    const matchesLevel = selectedLevel === 'all' || clearance.clearanceLevel === selectedLevel;
    const matchesPriority = selectedPriority === 'all' || clearance.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesLevel && matchesPriority;
  });

  // Enhanced statistics calculation
  const stats = {
    totalClearances: mockClearances.length,
    pendingClearances: mockClearances.filter(c => c.status === 'pending').length,
    inProgressClearances: mockClearances.filter(c => c.status === 'in_progress').length,
    approvedClearances: mockClearances.filter(c => c.status === 'approved').length,
    rejectedClearances: mockClearances.filter(c => c.status === 'rejected').length,
    expiredClearances: mockClearances.filter(c => c.status === 'expired').length,
    urgentClearances: mockClearances.filter(c => c.priority === 'urgent').length,
    averageProcessingTime: 45, // days
    totalEstimatedCost: mockClearances.reduce((sum, c) => sum + c.estimatedCost, 0),
    overdueClearances: mockClearances.filter(c => 
      new Date(c.expectedCompletionDate) < new Date() && 
      c.status !== 'approved' && c.status !== 'rejected'
    ).length
  };

  // AI Insights for security clearances
  const aiInsights = [
    {
      type: 'efficiency',
      title: 'ייעול תהליכים',
      message: 'זוהו 3 צווארי בקבוק בתהליך - אישור מסמכים לוקח 40% יותר זמן מהצפוי',
      priority: 'high',
      confidence: 94,
      action: 'אופטימיזציה'
    },
    {
      type: 'risk',
      title: 'זיהוי סיכונים',
      message: '2 מועמדים עם דפוסים חריגים בבדיקות רקע - נדרש מעקב מיוחד',
      priority: 'urgent',
      confidence: 88,
      action: 'בדיקה מיידית'
    },
    {
      type: 'prediction',
      title: 'תחזית עומסים',
      message: 'צפויה עלייה של 25% בבקשות סיווג בחודשיים הקרובים',
      priority: 'medium',
      confidence: 91,
      action: 'הכן משאבים'
    }
  ];

  const refreshData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Enhanced Header for Security Clearances */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-red-100 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-gradient-to-br from-red-600 to-orange-600">
                  <Shield size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">מערכת סיווג ביטחוני</h1>
                  <p className="text-red-700 dark:text-red-300">ניהול הרשאות ביטחוניות ובדיקות רקע מתקדמות</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>עודכן לאחרונה: {currentTime.toLocaleTimeString('he-IL')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck size={16} />
                  <span>מערכת מאובטחת</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>מעקב רציף</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                {isLoading ? 'מרענן...' : 'רענן נתונים'}
              </button>
              
              <button
                onClick={() => setShowAIInsights(!showAIInsights)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                <Brain size={16} />
                תובנות AI
              </button>
              
              <button
                onClick={() => setShowNewClearanceModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all text-sm font-medium"
              >
                <Plus size={16} />
                בקשת סיווג חדשה
              </button>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        {showAIInsights && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                  <Brain size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">תובנות AI לסיווג ביטחוני</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ניתוח מתקדם ואופטימיזציית תהליכים</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIInsights(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                    insight.priority === 'urgent'
                      ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
                      : insight.priority === 'high'
                      ? 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20'
                      : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-medium text-sm ${
                      insight.priority === 'urgent'
                        ? 'text-red-900 dark:text-red-100'
                        : insight.priority === 'high'
                        ? 'text-orange-900 dark:text-orange-100'
                        : 'text-blue-900 dark:text-blue-100'
                    }`}>
                      {insight.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{insight.confidence}% דיוק</span>
                  </div>
                  <p className={`text-xs mb-3 ${
                    insight.priority === 'urgent'
                      ? 'text-red-700 dark:text-red-200'
                      : insight.priority === 'high'
                      ? 'text-orange-700 dark:text-orange-200'
                      : 'text-blue-700 dark:text-blue-200'
                  }`}>
                    {insight.message}
                  </p>
                  <button className={`text-xs font-medium px-3 py-1 rounded-full ${
                    insight.priority === 'urgent'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : insight.priority === 'high'
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } transition-colors`}>
                    {insight.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">סה"כ בקשות</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalClearances}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">פעילות כוללת</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Shield size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">בטיפול</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">{stats.inProgressClearances}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">בתהליך</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Clock size={24} className="text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">אושרו</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.approvedClearances}</p>
                <p className="text-xs text-green-600 dark:text-green-400">מאושרים</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <ShieldCheck size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">נדחו</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{stats.rejectedClearances}</p>
                <p className="text-xs text-red-600 dark:text-red-400">לא אושרו</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <ShieldX size={24} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">דחופות</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{stats.urgentClearances}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">עדיფות גבוהה</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <AlertTriangle size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">זמן ממוצע</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{stats.averageProcessingTime}</p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400">ימים</p>
              </div>
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                <Timer size={24} className="text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="חיפוש לפי שם מועמד, תפקיד, לקוח או מספר בקשה..."
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">סטטוס:</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="all">הכל</option>
                  <option value="pending">ממתין</option>
                  <option value="in_progress">בטיפול</option>
                  <option value="approved">מאושר</option>
                  <option value="rejected">נדחה</option>
                  <option value="expired">פג תוקף</option>
                  <option value="suspended">מושעה</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">רמת סיווג:</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="all">הכל</option>
                  <option value="basic">בסיסי</option>
                  <option value="secret">סודי</option>
                  <option value="top_secret">סודי ביותר</option>
                  <option value="cosmic">קוסמי</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">עדיפות:</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="all">הכל</option>
                  <option value="urgent">דחוף</option>
                  <option value="high">גבוה</option>
                  <option value="medium">בינוני</option>
                  <option value="low">נמוך</option>
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {[
                { key: 'cards', label: 'כרטיסים', icon: Target },
                { key: 'table', label: 'טבלה', icon: BarChart3 },
                { key: 'timeline', label: 'ציר זמן', icon: Calendar },
                { key: 'analytics', label: 'אנליטיקה', icon: TrendingUp }
              ].map(mode => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.key}
                    onClick={() => setViewMode(mode.key as any)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === mode.key
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <span>מציג {filteredClearances.length} מתוך {mockClearances.length} בקשות סיווג</span>
          <div className="flex items-center gap-4">
            <span>חיפוש: "{searchQuery || 'הכל'}"</span>
            {(selectedStatus !== 'all' || selectedLevel !== 'all' || selectedPriority !== 'all') && (
              <span>מסונן: {[selectedStatus, selectedLevel, selectedPriority].filter(f => f !== 'all').join(', ')}</span>
            )}
          </div>
        </div>

        {/* Enhanced Security Clearances Display */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClearances.map((clearance) => (
              <div key={clearance.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      clearance.clearanceLevel === 'cosmic' ? 'bg-red-100 dark:bg-red-900' :
                      clearance.clearanceLevel === 'top_secret' ? 'bg-orange-100 dark:bg-orange-900' :
                      clearance.clearanceLevel === 'secret' ? 'bg-yellow-100 dark:bg-yellow-900' :
                      'bg-blue-100 dark:bg-blue-900'
                    }`}>
                      <Shield size={24} className={
                        clearance.clearanceLevel === 'cosmic' ? 'text-red-600 dark:text-red-400' :
                        clearance.clearanceLevel === 'top_secret' ? 'text-orange-600 dark:text-orange-400' :
                        clearance.clearanceLevel === 'secret' ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-blue-600 dark:text-blue-400'
                      } />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">{clearance.candidateName}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{clearance.jobTitle}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{clearance.clientName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      clearance.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      clearance.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      clearance.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      clearance.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      clearance.status === 'expired' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    }`}>
                      {clearance.status === 'approved' ? 'מאושר' :
                       clearance.status === 'in_progress' ? 'בטיפול' :
                       clearance.status === 'pending' ? 'ממתין' :
                       clearance.status === 'rejected' ? 'נדחה' :
                       clearance.status === 'expired' ? 'פג תוקף' : 'מושעה'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      clearance.clearanceLevel === 'cosmic' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      clearance.clearanceLevel === 'top_secret' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      clearance.clearanceLevel === 'secret' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {clearance.clearanceLevel === 'cosmic' ? 'קוסמי' :
                       clearance.clearanceLevel === 'top_secret' ? 'סודי ביותר' :
                       clearance.clearanceLevel === 'secret' ? 'סודי' : 'בסיסי'}
                    </span>
                  </div>
                </div>

                {/* Progress and Timeline */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">התקדמות תהליך</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {clearance.approvalWorkflow.filter(stage => stage.status === 'approved').length}/
                      {clearance.approvalWorkflow.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ 
                        width: `${(clearance.approvalWorkflow.filter(stage => stage.status === 'approved').length / clearance.approvalWorkflow.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Key Personnel */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <UserCheck size={14} />
                    <span>חוקר: {clearance.investigator.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <ShieldCheck size={14} />
                    <span>קב״ט: {clearance.securityOfficer.name}</span>
                  </div>
                </div>

                {/* Background Check Status */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">בדיקות רקע</span>
                    <span className="text-xs text-gray-500">
                      {Object.values(clearance.backgroundCheck).filter(status => status === 'clear' || status === 'verified' || status === 'positive' || status === 'passed').length}/
                      {Object.keys(clearance.backgroundCheck).length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center gap-1 ${
                      clearance.backgroundCheck.criminalHistory === 'clear' ? 'text-green-600' :
                      clearance.backgroundCheck.criminalHistory === 'issues_found' ? 'text-red-600' :
                      'text-gray-500'
                    }`}>
                      {clearance.backgroundCheck.criminalHistory === 'clear' ? <CheckCircle size={12} /> :
                       clearance.backgroundCheck.criminalHistory === 'issues_found' ? <XCircle size={12} /> :
                       <Clock size={12} />}
                      <span>רקע פלילי</span>
                    </div>
                    <div className={`flex items-center gap-1 ${
                      ['excellent', 'good', 'fair'].includes(clearance.backgroundCheck.creditCheck) ? 'text-green-600' :
                      clearance.backgroundCheck.creditCheck === 'poor' ? 'text-red-600' :
                      'text-gray-500'
                    }`}>
                      {['excellent', 'good', 'fair'].includes(clearance.backgroundCheck.creditCheck) ? <CheckCircle size={12} /> :
                       clearance.backgroundCheck.creditCheck === 'poor' ? <XCircle size={12} /> :
                       <Clock size={12} />}
                      <span>בדיקת אשראי</span>
                    </div>
                  </div>
                </div>

                {/* Risk Factors */}
                {clearance.riskFactors.length > 0 && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldAlert size={16} className="text-red-600 dark:text-red-400" />
                      <span className="text-sm font-medium text-red-700 dark:text-red-300">גורמי סיכון זוהו</span>
                    </div>
                    <div className="text-xs text-red-600 dark:text-red-400">
                      {clearance.riskFactors.length} גורמים דורשים טיפול
                    </div>
                  </div>
                )}

                {/* Priority and Timing */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      clearance.priority === 'urgent' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      clearance.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      clearance.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      עדיפות: {clearance.priority === 'urgent' ? 'דחוף' : clearance.priority === 'high' ? 'גבוה' : clearance.priority === 'medium' ? 'בינוני' : 'נמוך'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    ₪{clearance.estimatedCost.toLocaleString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    עודכן: {new Date(clearance.lastUpdated).toLocaleDateString('he-IL')}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedClearance(clearance)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      פרטים מלאים
                    </button>
                    <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium">
                      עדכן סטטוס
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'table' && (
          <ClearancesTable
            searchQuery={searchQuery}
            statusFilter={selectedStatus}
            jobFilter="all"
            managerFilter="all"
          />
        )}

        {viewMode === 'timeline' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">תצוגת ציר זמן</h3>
              <p className="text-gray-600 dark:text-gray-400">מעקב כרונולוגי אחר התקדמות הסיווגים יתווסף בקרוב</p>
            </div>
          </div>
        )}

        {viewMode === 'analytics' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center py-12">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">אנליטיקה מתקדמת</h3>
              <p className="text-gray-600 dark:text-gray-400">דוחות מפורטים וניתוח סטטיסטי יתווספו בקרוב</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredClearances.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <Shield size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">לא נמצאו בקשות סיווג</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">נסה לשנות את הפילטרים או צור בקשת סיווג חדשה</p>
            <button
              onClick={() => setShowNewClearanceModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              בקשת סיווג חדשה
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 