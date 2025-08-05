'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MoreHorizontal,
  Eye,
  Edit,
  Send,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

interface ClearanceCandidate {
  id: string;
  name: string;
  job: string;
  status: string;
  manager: string;
  startDate: string;
  targetDate: string;
  daysRemaining: number;
  priority: 'high' | 'medium' | 'low';
}

interface ClearancesTableProps {
  searchQuery: string;
  statusFilter: string;
  jobFilter: string;
  managerFilter: string;
}

// Mock data for clearance candidates
const mockCandidates: ClearanceCandidate[] = [
  {
    id: '1',
    name: 'יוסי כהן',
    job: 'מפתח Full-Stack',
    status: 'pending_forms',
    manager: 'דוד כהן',
    startDate: '2024-01-15',
    targetDate: '2024-02-15',
    daysRemaining: 5,
    priority: 'high'
  },
  {
    id: '2',
    name: 'מיכל לוי',
    job: 'מפתח Frontend',
    status: 'forms_submitted',
    manager: 'שרה לוי',
    startDate: '2024-01-10',
    targetDate: '2024-02-10',
    daysRemaining: 0,
    priority: 'medium'
  },
  {
    id: '3',
    name: 'דן רוזן',
    job: 'DevOps Engineer',
    status: 'submitted_to_mod',
    manager: 'מיכאל רוזן',
    startDate: '2024-01-05',
    targetDate: '2024-02-05',
    daysRemaining: -2,
    priority: 'high'
  },
  {
    id: '4',
    name: 'נועה גולדברג',
    job: 'QA Engineer',
    status: 'interview_scheduled',
    manager: 'רחל גולדברג',
    startDate: '2024-01-12',
    targetDate: '2024-02-12',
    daysRemaining: 2,
    priority: 'medium'
  },
  {
    id: '5',
    name: 'עומר שפירא',
    job: 'מפתח Backend',
    status: 'approved',
    manager: 'דוד כהן',
    startDate: '2024-01-08',
    targetDate: '2024-02-08',
    daysRemaining: -5,
    priority: 'low'
  }
];

export function ClearancesTable({
  searchQuery,
  statusFilter,
  jobFilter,
  managerFilter
}: ClearancesTableProps) {
  const router = useRouter();
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending_forms: { label: 'ממתין לטפסים', color: 'bg-yellow-100 text-yellow-800' },
      forms_submitted: { label: 'טפסים הוגשו', color: 'bg-blue-100 text-blue-800' },
      submitted_to_mod: { label: 'הוגש למשרד הביטחון', color: 'bg-purple-100 text-purple-800' },
      interview_scheduled: { label: 'תחקיר מתוזמן', color: 'bg-indigo-100 text-indigo-800' },
      interview_completed: { label: 'תחקיר הושלם', color: 'bg-orange-100 text-orange-800' },
      approved: { label: 'אושר', color: 'bg-green-100 text-green-800' },
      qso_briefing: { label: 'תדרוך קב"ט', color: 'bg-teal-100 text-teal-800' },
      completed: { label: 'הושלם', color: 'bg-gray-100 text-gray-800' },
      rejected: { label: 'נדחה', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending_forms;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'medium':
        return <Clock size={16} className="text-yellow-500" />;
      case 'low':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getDaysRemainingColor = (days: number) => {
    if (days < 0) return 'text-red-600';
    if (days <= 3) return 'text-orange-600';
    return 'text-gray-600';
  };

  // Filter candidates based on search and filters
  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.job.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesJob = jobFilter === 'all' || candidate.job.includes(jobFilter);
    const matchesManager = managerFilter === 'all' || candidate.manager === managerFilter;
    
    return matchesSearch && matchesStatus && matchesJob && matchesManager;
  });

  const handleViewTimeline = (candidateId: string) => {
    router.push(`/clearances/${candidateId}`);
  };

  const handleChangeStatus = (candidateId: string) => {
    console.log('Change status for candidate:', candidateId);
    setShowActionsMenu(null);
  };

  const handleResendForms = (candidateId: string) => {
    console.log('Resend forms for candidate:', candidateId);
    setShowActionsMenu(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מועמד
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                משרה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מנהל אחראי
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                תאריך התחלה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מועד יעד
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                ימים נותרים
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                עדיפות
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{candidate.job}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(candidate.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{candidate.manager}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{candidate.startDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{candidate.targetDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${getDaysRemainingColor(candidate.daysRemaining)}`}>
                    {candidate.daysRemaining > 0 ? `${candidate.daysRemaining} ימים` : 
                     candidate.daysRemaining < 0 ? `${Math.abs(candidate.daysRemaining)} ימים באיחור` : 'היום'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getPriorityIcon(candidate.priority)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left">
                  <div className="relative">
                    <button
                      onClick={() => setShowActionsMenu(showActionsMenu === candidate.id ? null : candidate.id)}
                      className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <MoreHorizontal size={16} className="text-gray-500" />
                    </button>

                    {showActionsMenu === candidate.id && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          <button
                            onClick={() => handleViewTimeline(candidate.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Eye size={16} className="ml-3" />
                            הצג ציר זמן
                          </button>
                          <button
                            onClick={() => handleChangeStatus(candidate.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit size={16} className="ml-3" />
                            שנה סטטוס
                          </button>
                          <button
                            onClick={() => handleResendForms(candidate.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Send size={16} className="ml-3" />
                            שלח טפסים מחדש
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">לא נמצאו מועמדים בסיווג ביטחוני</div>
        </div>
      )}
    </div>
  );
} 