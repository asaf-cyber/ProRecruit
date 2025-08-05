'use client';

import { useState } from 'react';
import { 
  Search, 
  Download, 
  Eye,
  FileText,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Invoice {
  id: number;
  invoiceNumber: string;
  title: string;
  amount: number;
  status: 'ממתין' | 'אושר' | 'שולם' | 'נדחה';
  issueDate: string;
  dueDate: string;
  description: string;
  attachments: string[];
}

export function VendorBillingTable({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange
}: {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}) {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      invoiceNumber: 'INV-2024-001',
      title: 'פיתוח מודול ניהול משתמשים',
      amount: 25000,
      status: 'אושר',
      issueDate: '2024-01-01',
      dueDate: '2024-01-31',
      description: 'פיתוח מערכת ניהול משתמשים עם הרשאות מתקדמות',
      attachments: ['invoice-001.pdf', 'work-details.docx']
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-002',
      title: 'תחזוקת שרת ייצור',
      amount: 15000,
      status: 'ממתין',
      issueDate: '2024-01-05',
      dueDate: '2024-02-05',
      description: 'תחזוקה שוטפת לשרת הייצור',
      attachments: ['invoice-002.pdf']
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-003',
      title: 'ייעוץ אבטחה',
      amount: 8000,
      status: 'שולם',
      issueDate: '2023-12-15',
      dueDate: '2024-01-15',
      description: 'בדיקת אבטחה למערכת החדשה',
      attachments: ['invoice-003.pdf', 'security-report.pdf']
    },
    {
      id: 4,
      invoiceNumber: 'INV-2024-004',
      title: 'אימון צוות פיתוח',
      amount: 12000,
      status: 'נדחה',
      issueDate: '2024-01-10',
      dueDate: '2024-02-10',
      description: 'הדרכה על טכנולוגיות חדשות',
      attachments: ['invoice-004.pdf', 'training-materials.zip']
    }
  ]);

  const getStatusBadge = (status: string) => {
    const colors = {
      'ממתין': 'bg-yellow-100 text-yellow-800',
      'אושר': 'bg-blue-100 text-blue-800',
      'שולם': 'bg-green-100 text-green-800',
      'נדחה': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {status}
      </span>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'שולם':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'אושר':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'ממתין':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'נדחה':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = filteredInvoices
    .filter(invoice => invoice.status === 'ממתין' || invoice.status === 'אושר')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">סה"כ חשבוניות</p>
              <p className="text-2xl font-bold text-gray-900">{filteredInvoices.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">סה"כ סכום</p>
              <p className="text-2xl font-bold text-gray-900">₪{totalAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ממתין לתשלום</p>
              <p className="text-2xl font-bold text-gray-900">₪{pendingAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="חיפוש חשבוניות..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">כל הסטטוסים</option>
              <option value="ממתין">ממתין</option>
              <option value="אושר">אושר</option>
              <option value="שולם">שולם</option>
              <option value="נדחה">נדחה</option>
            </select>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  מספר חשבונית
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  כותרת
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סכום
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תאריך הוצאה
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תאריך יעד
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getStatusIcon(invoice.status)}
                      <span className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invoice.title}</div>
                      <div className="text-sm text-gray-500">{invoice.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ₪{invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {invoice.issueDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">לא נמצאו חשבוניות</p>
        </div>
      )}
    </div>
  );
} 