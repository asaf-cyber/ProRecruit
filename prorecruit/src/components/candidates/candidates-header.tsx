'use client';

import { useState } from 'react';
import { 
  Plus, 
  Download, 
  Upload, 
  MoreHorizontal,
  Users,
  UserPlus,
  Clock,
  TrendingUp,
  FileText,
  Brain
} from 'lucide-react';

interface CandidatesHeaderProps {
  onAddCandidate: () => void;
  candidatesCount?: number;
  activeCandidatesCount?: number;
  interviewCandidatesCount?: number;
  hiredThisMonthCount?: number;
  onStatClick?: (statType: 'total' | 'active' | 'interview' | 'hired') => void;
  onShowAIInsights?: () => void;
  onShowCVParser?: () => void;
}

export function CandidatesHeader({ 
  onAddCandidate,
  candidatesCount = 1247,
  activeCandidatesCount = 892,
  interviewCandidatesCount = 156,
  hiredThisMonthCount = 23,
  onStatClick,
  onShowAIInsights,
  onShowCVParser
}: CandidatesHeaderProps) {
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const handleExportCandidates = () => {
    // Create CSV content
    const csvContent = "data:text/csv;charset=utf-8," + 
      "שם פרטי,שם משפחה,אימייל,טלפון,תפקיד,חברה,סטטוס,מקור\n" +
      "דוד,כהן,david.cohen@email.com,050-123-4567,מפתח Full Stack,TechCorp,בראיון,LinkedIn\n" +
      "מיכל,ישראלי,michal.israeli@email.com,052-987-6543,מפתחת Frontend,StartupXYZ,הוגשה מועמדות,חבר מביא חבר";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "candidates.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowActionsMenu(false);
  };

  const handleImportCandidates = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        alert(`קובץ ${file.name} נבחר לייבוא. הפונקציונליות תתווסף בעתיד.`);
      }
    };
    input.click();
    setShowActionsMenu(false);
  };

  const handleGenerateReport = () => {
    // Generate a simple report
    const reportContent = `דוח מועמדים - ${new Date().toLocaleDateString('he-IL')}
    
סיכום:
- סה"כ מועמדים: ${candidatesCount}
- מועמדים פעילים: ${activeCandidatesCount}
- בראיון: ${interviewCandidatesCount}
- הועסקו החודש: ${hiredThisMonthCount}

הדוח נוצר באופן אוטומטי על ידי מערכת ProRecruitment`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `candidates-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowActionsMenu(false);
  };

  const stats = [
    { 
      label: 'סה"כ מועמדים', 
      value: candidatesCount.toLocaleString(), 
      icon: Users, 
      color: 'text-blue-600',
      type: 'total' as const
    },
    { 
      label: 'מועמדים פעילים', 
      value: activeCandidatesCount.toLocaleString(), 
      icon: UserPlus, 
      color: 'text-green-600',
      type: 'active' as const
    },
    { 
      label: 'בראיון', 
      value: interviewCandidatesCount.toLocaleString(), 
      icon: Clock, 
      color: 'text-purple-600',
      type: 'interview' as const
    },
    { 
      label: 'הועסקו החודש', 
      value: hiredThisMonthCount.toLocaleString(), 
      icon: TrendingUp, 
      color: 'text-orange-600',
      type: 'hired' as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">מועמדים</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">ניהול מועמדים ותהליכי גיוס</p>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          {/* CV Parser Button */}
          {onShowCVParser && (
            <button 
              onClick={onShowCVParser}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white h-10 px-4 py-2"
            >
              <Upload size={16} className="ml-2" />
              עיבוד CV
            </button>
          )}
          
          {/* AI Insights Button */}
          {onShowAIInsights && (
            <button 
              onClick={onShowAIInsights}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600 text-white h-10 px-4 py-2"
            >
              <Brain size={16} className="ml-2" />
              תובנות AI
            </button>
          )}
          
          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <MoreHorizontal size={20} />
            </button>
            
            {showActionsMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="py-1">
                  <button 
                    onClick={handleExportCandidates}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Download size={16} className="ml-3" />
                    ייצא מועמדים
                  </button>
                  <button 
                    onClick={handleImportCandidates}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Upload size={16} className="ml-3" />
                    ייבא מועמדים
                  </button>
                  <hr className="my-1 border-gray-200 dark:border-gray-600" />
                  <button 
                    onClick={handleGenerateReport}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FileText size={16} className="ml-3" />
                    דוח מועמדים
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Add New Candidate Button */}
          <button 
            onClick={onAddCandidate}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white h-10 px-4 py-2"
          >
            <Plus size={16} className="ml-2" />
            הוסף מועמד חדש
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              onClick={() => onStatClick?.(stat.type)}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 cursor-pointer hover:shadow-md hover:scale-105 hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">לחץ לפירוט מלא</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <Icon className={`w-6 h-6 ${stat.color} dark:${stat.color.replace('-600', '-400')}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 