'use client';

import { useState } from 'react';
import { 
  Plus, 
  FileText, 
  Calendar, 
  DollarSign, 
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  ExternalLink,
  X
} from 'lucide-react';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  amount: number;
  status: 'open' | 'closed' | 'cancelled';
  createdDate: string;
  validUntil: string;
  associatedJob?: string;
  description: string;
  approvedBy: string;
}

interface ClientPurchaseOrdersTabProps {
  clientId: string;
}

export function ClientPurchaseOrdersTab({ clientId }: ClientPurchaseOrdersTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed' | 'cancelled'>('all');
  const [showNewPOModal, setShowNewPOModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

  // Mock purchase orders data
  const mockPOs: PurchaseOrder[] = [
    {
      id: '1',
      poNumber: 'PO-2024-001',
      amount: 120000,
      status: 'open',
      createdDate: '2024-01-10',
      validUntil: '2024-06-30',
      associatedJob: 'מפתח Full Stack Senior',
      description: 'גיוס מפתח Full Stack עם ניסיון 5+ שנים',
      approvedBy: 'יוסי כהן - מנהל פרויקטים'
    },
    {
      id: '2',
      poNumber: 'PO-2024-002',
      amount: 85000,
      status: 'open',
      createdDate: '2024-01-15',
      validUntil: '2024-07-31',
      associatedJob: 'מנהל פרויקטים טכני',
      description: 'גיוס מנהל פרויקטים עם רקע טכני',
      approvedBy: 'שרה לוי - מנהלת HR'
    },
    {
      id: '3',
      poNumber: 'PO-2023-045',
      amount: 95000,
      status: 'closed',
      createdDate: '2023-11-20',
      validUntil: '2024-02-28',
      associatedJob: 'מומחה DevOps',
      description: 'גיוס מומחה DevOps - הושלם בהצלחה',
      approvedBy: 'דוד ישראלי - CTO'
    },
    {
      id: '4',
      poNumber: 'PO-2024-003',
      amount: 200000,
      status: 'open',
      createdDate: '2024-01-18',
      validUntil: '2024-12-31',
      description: 'הזמנה כללית לשירותי גיוס - 2024',
      approvedBy: 'מיכל רוזנברג - VP R&D'
    }
  ];

  // Filter purchase orders
  const filteredPOs = mockPOs.filter(po => {
    const matchesSearch = po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         po.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (po.associatedJob && po.associatedJob.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || po.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config = {
      open: { label: 'פתוח', color: 'bg-green-100 text-green-800', icon: Clock },
      closed: { label: 'סגור', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
      cancelled: { label: 'בוטל', color: 'bg-red-100 text-red-800', icon: AlertCircle }
    };
    
    const statusConfig = config[status as keyof typeof config];
    const Icon = statusConfig.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
        <Icon size={12} className="ml-1" />
        {statusConfig.label}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL');
  };

  const isExpiringSoon = (validUntil: string) => {
    const today = new Date();
    const expiryDate = new Date(validUntil);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const isExpired = (validUntil: string) => {
    const today = new Date();
    const expiryDate = new Date(validUntil);
    return expiryDate < today;
  };

  // Calculate statistics
  const stats = {
    totalOpen: filteredPOs.filter(po => po.status === 'open').length,
    totalAmount: filteredPOs.filter(po => po.status === 'open').reduce((sum, po) => sum + po.amount, 0),
    expiringSoon: filteredPOs.filter(po => po.status === 'open' && isExpiringSoon(po.validUntil)).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">הזמנות רכש (Purchase Orders)</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">ניהול הזמנות רכש והסכמים</p>
        </div>
        <button
          onClick={() => setShowNewPOModal(true)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2"
        >
          <Plus size={16} className="ml-2" />
          יצירת הזמנת רכש חדשה
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">הזמנות פתוחות</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.totalOpen}</p>
            </div>
            <FileText size={24} className="text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">סכום כולל פתוח</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{formatCurrency(stats.totalAmount)}</p>
            </div>
            <DollarSign size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">פוגות בקרוב</p>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{stats.expiringSoon}</p>
            </div>
            <AlertCircle size={24} className="text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חיפוש לפי מספר הזמנה, תיאור או משרה..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">סטטוס:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">כל הסטטוסים</option>
            <option value="open">פתוח</option>
            <option value="closed">סגור</option>
            <option value="cancelled">בוטל</option>
          </select>
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  מספר הזמנה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  סכום
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  משרה משויכת
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  תוקף עד
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPOs.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText size={16} className="text-gray-400 ml-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {po.poNumber}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          נוצר: {formatDate(po.createdDate)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(po.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(po.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {po.associatedJob || '-'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate">
                      {po.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${
                      isExpired(po.validUntil) && po.status === 'open'
                        ? 'text-red-600 dark:text-red-400 font-bold'
                        : isExpiringSoon(po.validUntil) && po.status === 'open'
                        ? 'text-yellow-600 dark:text-yellow-400 font-medium'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {formatDate(po.validUntil)}
                    </div>
                    {isExpired(po.validUntil) && po.status === 'open' && (
                      <div className="text-xs text-red-600 dark:text-red-400">פג תוקף</div>
                    )}
                    {isExpiringSoon(po.validUntil) && po.status === 'open' && !isExpired(po.validUntil) && (
                      <div className="text-xs text-yellow-600 dark:text-yellow-400">פוגה בקרוב</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button 
                        onClick={() => setSelectedPO(po)}
                        className="p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        title="צפה"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="p-2 text-green-600 hover:text-green-800 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
                        title="הורד PDF"
                      >
                        <Download size={16} />
                      </button>
                      {po.status === 'open' && (
                        <button 
                          className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                          title="ערוך"
                        >
                          <Edit size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredPOs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">אין הזמנות רכש</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            לא נמצאו הזמנות רכש התואמות לחיפוש שלך
          </p>
        </div>
      )}

      {/* New PO Modal */}
      {showNewPOModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">יצירת הזמנת רכש חדשה</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    מספר הזמנה
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="PO-2024-004"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    סכום
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="120000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    תוקף עד
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    משרה משויכת (אופציונלי)
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option value="">לא משויכת למשרה ספציפית</option>
                    <option>מפתח Full Stack Senior</option>
                    <option>מנהל פרויקטים טכני</option>
                    <option>מומחה DevOps</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  תיאור
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={3}
                  placeholder="תיאור מפורט של ההזמנה..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  מאושר על ידי
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="שם ותפקיד של המאשר"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowNewPOModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ביטול
              </button>
              <button
                onClick={() => {
                  // Create PO logic
                  setShowNewPOModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                צור הזמנת רכש
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PO Details Modal */}
      {selectedPO && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">פרטי הזמנת רכש</h3>
              <button
                onClick={() => setSelectedPO(null)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">מספר הזמנה</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPO.poNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">סכום</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatCurrency(selectedPO.amount)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">סטטוס</label>
                  <div className="mt-1">{getStatusBadge(selectedPO.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">תוקף עד</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(selectedPO.validUntil)}</p>
                </div>
              </div>

              {selectedPO.associatedJob && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">משרה משויכת</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPO.associatedJob}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">תיאור</label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPO.description}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">מאושר על ידי</label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPO.approvedBy}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">נוצר בתאריך</label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(selectedPO.createdDate)}</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setSelectedPO(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                סגור
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                <Download size={16} className="ml-2" />
                הורד PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}