'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  DollarSign,
  Package
} from 'lucide-react';

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  date: string;
  amount: number;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  description: string;
  items: number;
}

export function ClientPurchaseOrdersTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const purchaseOrders: PurchaseOrder[] = [
    {
      id: '1',
      orderNumber: 'PO-2024-001',
      date: '2024-01-15',
      amount: 15000,
      status: 'approved',
      description: 'שירותי גיוס מנהל פרויקט',
      items: 1
    },
    {
      id: '2',
      orderNumber: 'PO-2024-002',
      date: '2024-01-20',
      amount: 25000,
      status: 'pending',
      description: 'שירותי גיוס מפתחים',
      items: 3
    },
    {
      id: '3',
      orderNumber: 'PO-2024-003',
      date: '2024-01-25',
      amount: 8000,
      status: 'completed',
      description: 'שירותי ייעוץ HR',
      items: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'ממתין לאישור';
      case 'approved':
        return 'אושר';
      case 'completed':
        return 'הושלם';
      case 'cancelled':
        return 'בוטל';
      default:
        return status;
    }
  };

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">הזמנות רכש</h2>
          <p className="text-gray-600">ניהול הזמנות רכש ושירותים</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          הזמן חדש
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="חיפוש בהזמנות..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל הסטטוסים</option>
            <option value="pending">ממתין לאישור</option>
            <option value="approved">אושר</option>
            <option value="completed">הושלם</option>
            <option value="cancelled">בוטל</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  מספר הזמנה
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
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 text-gray-400 ml-2" />
                      <span className="text-sm font-medium text-gray-900">{order.orderNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 ml-2" />
                      <span className="text-sm text-gray-900">{order.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{order.description}</div>
                    <div className="text-sm text-gray-500">{order.items} פריטים</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-400 ml-1" />
                      <span className="text-sm font-medium text-gray-900">
                        {order.amount.toLocaleString()} ₪
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2 space-x-reverse">
                      <button className="text-blue-600 hover:text-blue-900" title="צפייה">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900" title="הורדה">
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

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{purchaseOrders.length}</div>
            <div className="text-sm text-gray-600">סה"כ הזמנות</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {purchaseOrders.filter(o => o.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">הושלמו</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {purchaseOrders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()} ₪
            </div>
            <div className="text-sm text-gray-600">סה"כ ערך</div>
          </div>
        </div>
      </div>
    </div>
  );
} 