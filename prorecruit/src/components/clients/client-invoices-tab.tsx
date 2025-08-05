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
  Send,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Mail,
  Phone,
  X
} from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: 'paid' | 'overdue' | 'pending';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  description: string;
  relatedPO?: string;
  overdueDays?: number;
}

interface ClientInvoicesTabProps {
  clientId: string;
}

export function ClientInvoicesTab({ clientId }: ClientInvoicesTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'overdue' | 'pending'>('all');
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Mock invoices data
  const mockInvoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      amount: 45000,
      status: 'overdue',
      issueDate: '2023-12-15',
      dueDate: '2024-01-15',
      description: 'גיוס מפתח Full Stack - דוד כהן',
      relatedPO: 'PO-2024-001',
      overdueDays: 5
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      amount: 38000,
      status: 'pending',
      issueDate: '2024-01-10',
      dueDate: '2024-02-10',
      description: 'שירותי גיוס - חודש ינואר',
      relatedPO: 'PO-2024-002'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2023-089',
      amount: 52000,
      status: 'paid',
      issueDate: '2023-11-20',
      dueDate: '2023-12-20',
      paidDate: '2023-12-18',
      description: 'גיוס מומחה DevOps - הושלם',
      relatedPO: 'PO-2023-045'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-003',
      amount: 67000,
      status: 'overdue',
      issueDate: '2023-11-30',
      dueDate: '2023-12-30',
      description: 'גיוס מנהל פרויקטים + מפתח Senior',
      overdueDays: 21
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-004',
      amount: 29000,
      status: 'pending',
      issueDate: '2024-01-18',
      dueDate: '2024-02-18',
      description: 'ייעוץ גיוס ופיתוח תהליכים',
      relatedPO: 'PO-2024-003'
    }
  ];

  // Filter invoices
  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (invoice.relatedPO && invoice.relatedPO.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string, overdueDays?: number) => {
    const config = {
      paid: { label: 'שולם', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { label: 'ממתין', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      overdue: { label: `פיגור ${overdueDays} ימים`, color: 'bg-red-100 text-red-800', icon: AlertTriangle }
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

  // Calculate aging report and statistics
  const stats = {
    totalOutstanding: filteredInvoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    totalOverdue: filteredInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0),
    totalPaid: filteredInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    overdueCount: filteredInvoices.filter(inv => inv.status === 'overdue').length
  };

  // Aging buckets
  const agingBuckets = {
    current: filteredInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
    overdue1to30: filteredInvoices.filter(inv => inv.status === 'overdue' && (inv.overdueDays || 0) <= 30).reduce((sum, inv) => sum + inv.amount, 0),
    overdue31to60: filteredInvoices.filter(inv => inv.status === 'overdue' && (inv.overdueDays || 0) > 30 && (inv.overdueDays || 0) <= 60).reduce((sum, inv) => sum + inv.amount, 0),
    overdue60plus: filteredInvoices.filter(inv => inv.status === 'overdue' && (inv.overdueDays || 0) > 60).reduce((sum, inv) => sum + inv.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">חשבוניות וחיובים</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">ניהול חשבוניות ודוח חובות</p>
        </div>
        <button
          onClick={() => setShowNewInvoiceModal(true)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2"
        >
          <Plus size={16} className="ml-2" />
          יצירת חשבונית חדשה
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">חוב פתוח</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{formatCurrency(stats.totalOutstanding)}</p>
            </div>
            <DollarSign size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 dark:text-red-400">חוב בפיגור</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">{formatCurrency(stats.totalOverdue)}</p>
              <p className="text-xs text-red-600 dark:text-red-400">{stats.overdueCount} חשבוניות</p>
            </div>
            <AlertTriangle size={24} className="text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">שולם השנה</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{formatCurrency(stats.totalPaid)}</p>
            </div>
            <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400">חשבוניות פעילות</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {filteredInvoices.filter(inv => inv.status !== 'paid').length}
              </p>
            </div>
            <FileText size={24} className="text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Aging Report */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">דוח חובות (Aging Report)</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">שוטף</p>
            <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{formatCurrency(agingBuckets.current)}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">0-30 ימים</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">פיגור קל</p>
            <p className="text-xl font-bold text-yellow-700 dark:text-yellow-300">{formatCurrency(agingBuckets.overdue1to30)}</p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400">1-30 ימים</p>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">פיגור בינוני</p>
            <p className="text-xl font-bold text-orange-700 dark:text-orange-300">{formatCurrency(agingBuckets.overdue31to60)}</p>
            <p className="text-xs text-orange-600 dark:text-orange-400">31-60 ימים</p>
          </div>
          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">פיגור גבוה</p>
            <p className="text-xl font-bold text-red-700 dark:text-red-300">{formatCurrency(agingBuckets.overdue60plus)}</p>
            <p className="text-xs text-red-600 dark:text-red-400">60+ ימים</p>
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
              placeholder="חיפוש לפי מספר חשבונית, תיאור או PO..."
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
            <option value="pending">ממתין</option>
            <option value="overdue">בפיגור</option>
            <option value="paid">שולם</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  מספר חשבונית
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  סכום
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  תאריך יעד
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  תיאור
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText size={16} className="text-gray-400 ml-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {invoice.invoiceNumber}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          הונפק: {formatDate(invoice.issueDate)}
                        </div>
                        {invoice.relatedPO && (
                          <div className="text-xs text-blue-600 dark:text-blue-400">
                            {invoice.relatedPO}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(invoice.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(invoice.status, invoice.overdueDays)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${
                      invoice.status === 'overdue' 
                        ? 'text-red-600 dark:text-red-400 font-bold' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {formatDate(invoice.dueDate)}
                    </div>
                    {invoice.paidDate && (
                      <div className="text-xs text-green-600 dark:text-green-400">
                        שולם: {formatDate(invoice.paidDate)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                      {invoice.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button 
                        onClick={() => setSelectedInvoice(invoice)}
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
                      {invoice.status !== 'paid' && (
                        <>
                          <button 
                            className="p-2 text-purple-600 hover:text-purple-800 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
                            title="שלח תזכורת"
                          >
                            <Send size={16} />
                          </button>
                          <button 
                            className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                            title="ערוך"
                          >
                            <Edit size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collections Actions for Overdue Invoices */}
      {stats.overdueCount > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle size={20} className="text-red-600 dark:text-red-400 ml-2" />
              <div>
                <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                  פעולות גביה נדרשות
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  יש {stats.overdueCount} חשבוניות בפיגור בסכום של {formatCurrency(stats.totalOverdue)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
                <Mail size={16} className="ml-1" />
                שלח תזכורת כללית
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
                <Phone size={16} className="ml-1" />
                צור קשר
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredInvoices.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">אין חשבוניות</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            לא נמצאו חשבוניות התואמות לחיפוש שלך
          </p>
        </div>
      )}

      {/* New Invoice Modal */}
      {showNewInvoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">יצירת חשבונית חדשה</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    מספר חשבונית
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="INV-2024-005"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    סכום
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="45000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    תאריך יעד לתשלום
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    הזמנת רכש משויכת (אופציונלי)
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option value="">בחר הזמנת רכש</option>
                    <option>PO-2024-001</option>
                    <option>PO-2024-002</option>
                    <option>PO-2024-003</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  תיאור השירות
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={3}
                  placeholder="תיאור מפורט של השירות שניתן..."
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setShowNewInvoiceModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ביטול
              </button>
              <button
                onClick={() => {
                  // Create invoice logic
                  setShowNewInvoiceModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                צור חשבונית
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">פרטי חשבונית</h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">מספר חשבונית</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedInvoice.invoiceNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">סכום</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatCurrency(selectedInvoice.amount)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">סטטוס</label>
                  <div className="mt-1">{getStatusBadge(selectedInvoice.status, selectedInvoice.overdueDays)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">תאריך יעד</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(selectedInvoice.dueDate)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">הונפק בתאריך</label>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formatDate(selectedInvoice.issueDate)}</p>
                </div>
                {selectedInvoice.paidDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">שולם בתאריך</label>
                    <p className="mt-1 text-sm text-green-600 dark:text-green-400">{formatDate(selectedInvoice.paidDate)}</p>
                  </div>
                )}
              </div>

              {selectedInvoice.relatedPO && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">הזמנת רכש משויכת</label>
                  <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">{selectedInvoice.relatedPO}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">תיאור</label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{selectedInvoice.description}</p>
              </div>

              {selectedInvoice.status === 'overdue' && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <div className="flex items-center">
                    <AlertTriangle size={16} className="text-red-600 dark:text-red-400 ml-2" />
                    <span className="text-sm text-red-700 dark:text-red-300">
                      חשבונית זו בפיגור של {selectedInvoice.overdueDays} ימים
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                סגור
              </button>
              {selectedInvoice.status !== 'paid' && (
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center">
                  <Send size={16} className="ml-2" />
                  שלח תזכורת
                </button>
              )}
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