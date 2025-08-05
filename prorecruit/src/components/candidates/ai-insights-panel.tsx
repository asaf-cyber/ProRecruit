'use client';

import { useState } from 'react';
import { 
  Bot, 
  TrendingUp, 
  Users, 
  Target, 
  BarChart3,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Brain,
  Zap,
  RefreshCw,
  ChevronRight,
  X
} from 'lucide-react';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentRole: string;
  company: string;
  location: string;
  status: 'applied' | 'phone_screen' | 'interview' | 'offer' | 'rejected' | 'hired';
  source: string;
  appliedDate: string;
  lastActivity: string;
  recruiter: string;
}

interface AIInsight {
  id: string;
  type: 'recommendation' | 'analysis' | 'warning' | 'opportunity';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  actionable: boolean;
  candidateId?: string;
  confidence: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface AIInsightsPanelProps {
  candidates: Candidate[];
  isOpen: boolean;
  onClose: () => void;
  onCandidateAction: (candidateId: string, action: string) => void;
}

export function AIInsightsPanel({ candidates, isOpen, onClose, onCandidateAction }: AIInsightsPanelProps) {
  const [activeTab, setActiveTab] = useState<'insights' | 'recommendations' | 'analysis'>('insights');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate AI insights based on candidates data
  const generateInsights = (): AIInsight[] => {
    const insights: AIInsight[] = [];
    
    // High-potential candidates
    const topCandidates = candidates.filter(c => 
      c.status === 'interview' || c.status === 'applied'
    ).slice(0, 3);
    
    topCandidates.forEach((candidate, index) => {
      insights.push({
        id: `top-${candidate.id}`,
        type: 'recommendation',
        priority: 'high',
        title: `מועמד מומלץ: ${candidate.firstName} ${candidate.lastName}`,
        description: `מועמד איכותי עם ניסיון ב-${candidate.currentRole}. התאמה של ${85 + index * 5}% למשרה.`,
        actionable: true,
        candidateId: candidate.id,
        confidence: 85 + index * 5,
        icon: Star
      });
    });

    // Time-sensitive actions
    const staleCandidates = candidates.filter(c => {
      const daysSinceActivity = Math.floor((Date.now() - new Date(c.lastActivity).getTime()) / (1000 * 60 * 60 * 24));
      return daysSinceActivity > 5 && !['rejected', 'hired'].includes(c.status);
    });

    if (staleCandidates.length > 0) {
      insights.push({
        id: 'stale-candidates',
        type: 'warning',
        priority: 'high',
        title: `${staleCandidates.length} מועמדים מחכים למעקב`,
        description: 'מועמדים שלא היה איתם קשר מעל 5 ימים. מומלץ ליצור קשר בהקדם.',
        actionable: true,
        confidence: 95,
        icon: AlertTriangle
      });
    }

    // Source analysis
    const sourceStats = candidates.reduce((acc, candidate) => {
      acc[candidate.source] = (acc[candidate.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const bestSource = Object.entries(sourceStats).sort(([,a], [,b]) => b - a)[0];
    if (bestSource) {
      insights.push({
        id: 'best-source',
        type: 'analysis',
        priority: 'medium',
        title: `מקור הגיוס הטוב ביותר: ${bestSource[0]}`,
        description: `${Math.round((bestSource[1] / candidates.length) * 100)}% מהמועמדים הגיעו מ-${bestSource[0]}. כדאי להשקיע יותר במקור זה.`,
        actionable: true,
        confidence: 80,
        icon: TrendingUp
      });
    }

    // Interview scheduling
    const pendingInterviews = candidates.filter(c => c.status === 'phone_screen').length;
    if (pendingInterviews > 0) {
      insights.push({
        id: 'pending-interviews',
        type: 'opportunity',
        priority: 'medium',
        title: `${pendingInterviews} מועמדים מוכנים לראיון`,
        description: 'מועמדים שעברו את שלב הסינון הטלפוני וממתינים לקביעת ראיון.',
        actionable: true,
        confidence: 90,
        icon: Users
      });
    }

    // Performance metrics
    const hiredThisMonth = candidates.filter(c => {
      const hiredDate = new Date(c.lastActivity);
      const thisMonth = new Date().getMonth();
      return c.status === 'hired' && hiredDate.getMonth() === thisMonth;
    }).length;

    insights.push({
      id: 'monthly-performance',
      type: 'analysis',
      priority: 'low',
      title: `${hiredThisMonth} גיוסים החודש`,
      description: `ביצועי הגיוס החודש: ${hiredThisMonth} מועמדים נקלטו בהצלחה.${hiredThisMonth > 2 ? ' ביצועים מעולים!' : ' יש מקום לשיפור.'}`,
      actionable: false,
      confidence: 100,
      icon: BarChart3
    });

    return insights.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const insights = generateInsights();

  const refreshInsights = async () => {
    setIsRefreshing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-200';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recommendation':
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
      case 'analysis':
        return 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20';
      case 'warning':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
      case 'opportunity':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20';
      default:
        return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20';
    }
  };

  const handleInsightAction = (insight: AIInsight) => {
    if (insight.candidateId) {
      onCandidateAction(insight.candidateId, 'view');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                <Brain className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">תובנות AI</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">ניתוח חכם של תהליכי הגיוס</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={refreshInsights}
                disabled={isRefreshing}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="רענן תובנות"
              >
                <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 space-x-reverse mt-4">
            {[
              { id: 'insights', label: 'כל התובנות', icon: Brain },
              { id: 'recommendations', label: 'המלצות', icon: Lightbulb },
              { id: 'analysis', label: 'ניתוחים', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'insights' | 'recommendations' | 'analysis')}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={16} className="ml-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {insights
              .filter(insight => {
                if (activeTab === 'recommendations') return insight.type === 'recommendation';
                if (activeTab === 'analysis') return insight.type === 'analysis';
                return true;
              })
              .map((insight) => {
                const IconComponent = insight.icon;
                return (
                  <div
                    key={insight.id}
                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${getTypeColor(insight.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start flex-1">
                        <div className={`p-2 rounded-lg mr-3 ${getPriorityColor(insight.priority)}`}>
                          <IconComponent size={20} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {insight.title}
                            </h3>
                            <span className={`mr-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                              {insight.priority === 'high' ? 'גבוה' : 
                               insight.priority === 'medium' ? 'בינוני' : 'נמוך'}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {insight.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Zap size={14} className="mr-1" />
                              <span>רמת ביטחון: {insight.confidence}%</span>
                            </div>
                            
                            {insight.actionable && (
                              <button
                                onClick={() => handleInsightAction(insight)}
                                className="flex items-center px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors text-sm font-medium"
                              >
                                פעל עכשיו
                                <ChevronRight size={14} className="mr-1" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {insights.length === 0 && (
            <div className="text-center py-12">
              <Bot size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                אין תובנות זמינות כרגע
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI מנתח את הנתונים שלך. נסה לרענן תובנות מאוחר יותר.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>AI פעיל • מנתח {candidates.length} מועמדים</span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>עודכן לאחרונה: עכשיו</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}