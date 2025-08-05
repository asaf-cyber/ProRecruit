'use client';

import { useState } from 'react';
import { 
  Download, 
  Eye, 
  DollarSign,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VendorBillingProps {
  vendorId: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  serviceType: string;
}

export function VendorBilling({ vendorId }: VendorBillingProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  // Mock invoices data
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      date: '2024-01-15',
      dueDate: '2024-02-15',
      amount: 15000,
      status: 'paid',
      description: 'בדיקות רפואיות - ינואר 2024',
      serviceType: 'בדיקה רפואית כללית'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      date: '2024-01-20',
      dueDate: '2024-02-20',
      amount: 8000,
      status: 'pending',
      description: 'בדיקות ראייה - ינואר 2024',
      serviceType: 'בדיקת ראייה'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      date: '2024-01-25',
      dueDate: '2024-02-25',
      amount: 12000,
      status: 'pending',
      description: 'בדיקות שמיעה - ינואר 2024',
      serviceType: 'בדיקת שמיעה'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2023-012',
      date: '2023-12-15',
      dueDate: '2024-01-15',
      amount: 18000,
      status: 'paid',
      description: 'בדיקות רפואיות - דצמבר 2023',
      serviceType: 'בדיקה רפואית כללית'
    },
    {
      id: '5',
      invoiceNumber: 'INV-2023-011',
      date: '2023-11-30',
      dueDate: '2023-12-30',
      amount: 9500,
      status: 'paid',
      description: 'בדיקות ראייה - נובמבר 2023',
      serviceType: 'בדיקת ראייה'
    }
  ];

  // Mock chart data
  const chartData = [
    { month: 'אוג', amount: 12000 },
    { month: 'ספט', amount: 15000 },
    { month: 'אוק', amount: 18000 },
    { month: 'נוב', amount: 9500 },
    { month: 'דצמ', amount: 18000 },
    { month: 'ינו', amount: 35000 }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      paid: { 
        label: 'שולם', 
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle
      },
      pending: { 
        label: 'ממתין', 
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock
      },
      overdue: { 
        label: 'באיחור', 
        color: 'bg-red-100 text-red-800',
        icon: AlertCircle
      }
    };
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon className="h-3 w-3 ml-1" />
        {badge.label}
      </span>
    );
  };

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">חיובים ותשלומים</h3>
          <p className="text-sm text-gray-500 mt-1">ניהול חשבוניות והוצאות</p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="3months">3 חודשים אחרונים</option>
            <option value="6months">6 חודשים אחרונים</option>
            <option value="12months">12 חודשים אחרונים</option>
          </select>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2">
            <Download size={16} className="ml-2" />
            ייצא דוח
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-blue-600">סה&quot;כ הוצאות</p>
              <p className="text-lg font-semibold text-blue-900">₪{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-green-600">שולם</p>
              <p className="text-lg font-semibold text-green-900">₪{paidAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-yellow-600">ממתין לתשלום</p>
              <p className="text-lg font-semibold text-yellow-900">₪{pendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">הוצאות לאורך זמן</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`₪${value.toLocaleString()}`, 'סכום']}
                labelFormatter={(label) => `חודש: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Invoices Table */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">חשבוניות</h4>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  מס&apos; חשבונית
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תאריך
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תיאור
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סכום
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                    <div className="text-sm text-gray-500">{invoice.serviceType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(invoice.date).toLocaleDateString('he-IL')}
                    </div>
                    <div className="text-sm text-gray-500">
                      יעד: {new Date(invoice.dueDate).toLocaleDateString('he-IL')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{invoice.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₪{invoice.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="text-blue-600 hover:text-blue-900 p-1">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 