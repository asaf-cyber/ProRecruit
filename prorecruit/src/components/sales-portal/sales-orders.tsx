'use client';

import { useState } from 'react';
import { 
  FileText, 
  DollarSign, 
  Calendar, 
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Plus
} from 'lucide-react';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  clientName: string;
  jobTitle: string;
  amount: number;
  status: 'open' | 'paid' | 'overdue' | 'cancelled';
  createdAt: string;
  dueDate: string;
  paidDate?: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'overdue' | 'pending';
  daysOverdue: number;
  createdAt: string;
}

export function SalesOrders() {
  const [activeTab, setActiveTab] = useState('orders');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for Purchase Orders
  const purchaseOrders: PurchaseOrder[] = [
    {
      id: '1',
      poNumber: 'PO-2024-001',
      clientName: 'חברת ABC טכנולוגיות',
      jobTitle: 'Full Stack Developer',
      amount: 25000,
      status: 'open',
      createdAt: '2024-01-15',
      dueDate: '2024-02-15'
    },
    {
      id: '2',
      poNumber: 'PO-2024-002',
      clientName: 'חברת XYZ ביטחון',
      jobTitle: 'DevOps Engineer',
      amount: 18000,
      status: 'paid',
      createdAt: '2024-01-10',
      dueDate: '2024-02-10',
      paidDate: '2024-01-25'
    },
    {
      id: '3',
      poNumber: 'PO-2024-003',
      clientName: 'חברת DEF פיתוח',
      jobTitle: 'Frontend Developer',
      amount: 22000,
      status: 'overdue',
      createdAt: '2024-01-05',
      dueDate: '2024-01-25'
    },
    {
      id: '4',
      poNumber: 'PO-2024-004',
      clientName: 'חברת GHI שירותים',
      jobTitle: 'Product Manager',
      amount: 30000,
      status: 'open',
      createdAt: '2024-01-20',
      dueDate: '2024-02-20'
    }
  ];

  // Mock data for Invoices
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      clientName: 'חברת ABC טכנולוגיות',
      amount: 25000,
      dueDate: '2024-01-25',
      status: 'overdue',
      daysOverdue: 15,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      clientName: 'חברת XYZ ביטחון',
      amount: 18000,
      dueDate: '2024-02-10',
      status: 'paid',
      daysOverdue: 0,
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      clientName: 'חברת DEF פיתוח',
      amount: 22000,
      dueDate: '2024-02-15',
      status: 'pending',
      daysOverdue: 0,
      createdAt: '2024-01-25'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      clientName: 'חברת GHI שירותים',
      amount: 30000,
      dueDate: '2024-01-30',
      status: 'overdue',
      daysOverdue: 5,
      createdAt: '2024-01-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'פתוח';
      case 'paid': return 'שולם';
      case 'overdue': return 'עבר זמנו';
      case 'cancelled': return 'בוטל';
      case 'pending': return 'ממתין';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const filteredOrders = purchaseOrders.filter(order =>
    !searchQuery || 
    order.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInvoices = invoices.filter(invoice =>
    !searchQuery || 
    invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = purchaseOrders.reduce((sum, order) => sum + order.amount, 0);
  const paidRevenue = purchaseOrders.filter(order => order.status === 'paid').reduce((sum, order) => sum + order.amount, 0);
  const overdueAmount = invoices.filter(invoice => invoice.status === 'overdue').reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">הזמנות וחיובים</h1>
          <p className="text-gray-600">מעקב הזמנות רכש וחשבוניות</p>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>צור הזמנה</span>
          </button>
          <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>ייצא דוח</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">סך הכנסות</p>
              <p className="text-2xl font-bold text-gray-900">₪{totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">הכנסות ששולמו</p>
              <p className="text-2xl font-bold text-green-600">₪{paidRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">חובות פתוחים</p>
              <p className="text-2xl font-bold text-red-600">₪{overdueAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 space-x-reverse">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              הזמנות רכש ({purchaseOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'invoices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              חשבוניות ({invoices.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חיפוש הזמנות או חשבוניות..."
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Content */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 space-x-reverse mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{order.poNumber}</h3>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getStatusIcon(order.status)}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{order.clientName}</p>
                      <p className="text-sm text-gray-500">{order.jobTitle}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">₪{order.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">יעד: {new Date(order.dueDate).toLocaleDateString('he-IL')}</p>
                      {order.paidDate && (
                        <p className="text-sm text-green-600">שולם: {new Date(order.paidDate).toLocaleDateString('he-IL')}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse mr-4">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => (
                <div key={invoice.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 space-x-reverse mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{invoice.invoiceNumber}</h3>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getStatusIcon(invoice.status)}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                            {getStatusText(invoice.status)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{invoice.clientName}</p>
                      {invoice.daysOverdue > 0 && (
                        <p className="text-sm text-red-600">עבר {invoice.daysOverdue} ימים</p>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">₪{invoice.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">יעד: {new Date(invoice.dueDate).toLocaleDateString('he-IL')}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse mr-4">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 