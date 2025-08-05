'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MoreHorizontal,
  Eye,
  Download,
  Send,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

interface Contract {
  id: string;
  employeeName: string;
  job: string;
  client: string;
  createdAt: string;
  status: string;
  endDate: string;
  daysUntilExpiry: number;
  salary: string;
  contractType: string;
}

interface ContractsTableProps {
  searchQuery: string;
  statusFilter: string;
  clientFilter: string;
}

// Mock data for contracts
const mockContracts: Contract[] = [
  {
    id: '1',
    employeeName: 'יוסי כהן',
    job: 'מפתח Full-Stack',
    client: 'חברת טכנולוגיה מתקדמת',
    createdAt: '2024-01-15',
    status: 'signed',
    endDate: '2024-12-31',
    daysUntilExpiry: 150,
    salary: '25,000 ₪',
    contractType: 'עובד'
  },
  {
    id: '2',
    employeeName: 'מיכל לוי',
    job: 'מפתח Frontend',
    client: 'סטארט-אפ חדשני',
    createdAt: '2024-01-20',
    status: 'sent',
    endDate: '2024-11-30',
    daysUntilExpiry: 120,
    salary: '22,000 ₪',
    contractType: 'עובד'
  },
  {
    id: '3',
    employeeName: 'דן רוזן',
    job: 'DevOps Engineer',
    client: 'פתרונות ארגוניים',
    createdAt: '2024-01-10',
    status: 'draft',
    endDate: '2024-10-31',
    daysUntilExpiry: 90,
    salary: '28,000 ₪',
    contractType: 'קבלן'
  },
  {
    id: '4',
    employeeName: 'נועה גולדברג',
    job: 'QA Engineer',
    client: 'סוכנות דיגיטלית',
    createdAt: '2024-01-05',
    status: 'expired',
    endDate: '2024-09-30',
    daysUntilExpiry: -30,
    salary: '20,000 ₪',
    contractType: 'עובד'
  },
  {
    id: '5',
    employeeName: 'עומר שפירא',
    job: 'Project Manager',
    client: 'פינטק בע"מ',
    createdAt: '2024-01-25',
    status: 'signed',
    endDate: '2024-12-31',
    daysUntilExpiry: 180,
    salary: '35,000 ₪',
    contractType: 'עובד'
  }
];

export function ContractsTable({
  searchQuery,
  statusFilter,
  clientFilter
}: ContractsTableProps) {
  const router = useRouter();
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'טיוטה', color: 'bg-gray-100 text-gray-800' },
      sent: { label: 'נשלח', color: 'bg-blue-100 text-blue-800' },
      signed: { label: 'חתום', color: 'bg-green-100 text-green-800' },
      expired: { label: 'פג תוקף', color: 'bg-red-100 text-red-800' },
      terminated: { label: 'בוטל', color: 'bg-orange-100 text-orange-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getContractTypeBadge = (type: string) => {
    const typeConfig = {
      employee: { label: 'עובד', color: 'bg-purple-100 text-purple-800' },
      contractor: { label: 'קבלן', color: 'bg-indigo-100 text-indigo-800' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.employee;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getDaysUntilExpiryColor = (days: number) => {
    if (days < 0) return 'text-red-600';
    if (days <= 30) return 'text-orange-600';
    if (days <= 90) return 'text-yellow-600';
    return 'text-gray-600';
  };

  // Filter contracts based on search and filters
  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch = contract.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesClient = clientFilter === 'all' || contract.client.includes(clientFilter);
    
    return matchesSearch && matchesStatus && matchesClient;
  });

  const handleViewContract = (contractId: string) => {
    router.push(`/contracts/${contractId}`);
  };

  const handleSendForSignature = (contractId: string) => {
    console.log('Sending contract for signature:', contractId);
    setShowActionsMenu(null);
  };

  const handleDownloadContract = (contractId: string) => {
    console.log('Downloading contract:', contractId);
    setShowActionsMenu(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                עובד/מועמד
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                משרה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                לקוח
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                תאריך יצירה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מועד סיום
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שכר
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סוג חוזה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{contract.employeeName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{contract.job}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{contract.client}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{contract.createdAt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(contract.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{contract.endDate}</div>
                  <div className={`text-xs font-medium ${getDaysUntilExpiryColor(contract.daysUntilExpiry)}`}>
                    {contract.daysUntilExpiry > 0 ? `${contract.daysUntilExpiry} ימים` : 
                     contract.daysUntilExpiry < 0 ? `${Math.abs(contract.daysUntilExpiry)} ימים באיחור` : 'היום'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{contract.salary}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getContractTypeBadge(contract.contractType)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left">
                  <div className="relative">
                    <button
                      onClick={() => setShowActionsMenu(showActionsMenu === contract.id ? null : contract.id)}
                      className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <MoreHorizontal size={16} className="text-gray-500" />
                    </button>

                    {showActionsMenu === contract.id && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          <button
                            onClick={() => handleViewContract(contract.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Eye size={16} className="ml-3" />
                            הצג פרטי חוזה
                          </button>
                          <button
                            onClick={() => handleSendForSignature(contract.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Send size={16} className="ml-3" />
                            שלח לחתימה
                          </button>
                          <button
                            onClick={() => handleDownloadContract(contract.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Download size={16} className="ml-3" />
                            הורד חוזה
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

      {filteredContracts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">לא נמצאו חוזים</div>
        </div>
      )}
    </div>
  );
} 