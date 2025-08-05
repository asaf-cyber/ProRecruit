'use client';

import { useState } from 'react';
import { 
  MoreVertical, 
  Shield, 
  Building2, 
  Phone, 
  Mail, 
  User,
  FileText,
  Edit,
  Trash2,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Eye
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  type: 'civil' | 'security';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  website?: string;
  paymentTerms: string;
  openJobs: number;
  placedEmployees: number;
  outstandingDebt: number;
  overdueAmount: number;
  lastActivity: string;
}

interface ClientsListProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
  onCreatePO: (client: Client) => void;
}

export function ClientsList({ clients, onSelectClient, onCreatePO }: ClientsListProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'debt' | 'activity'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Sort clients
  const sortedClients = [...clients].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name, 'he');
        break;
      case 'debt':
        comparison = a.outstandingDebt - b.outstandingDebt;
        break;
      case 'activity':
        comparison = new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime();
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field: 'name' | 'debt' | 'activity') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th 
                onClick={() => handleSort('name')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-1 space-x-reverse">
                  <span>שם לקוח</span>
                  {sortBy === 'name' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                איש קשר
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                משרות / עובדים
              </th>
              <th 
                onClick={() => handleSort('debt')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-1 space-x-reverse">
                  <span>חוב פתוח</span>
                  {sortBy === 'debt' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('activity')}
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-1 space-x-reverse">
                  <span>פעילות אחרונה</span>
                  {sortBy === 'activity' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedClients.map((client) => (
              <tr 
                key={client.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => onSelectClient(client)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={`p-2 rounded-lg ${
                      client.type === 'security' 
                        ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' 
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    }`}>
                      {client.type === 'security' ? <Shield size={20} /> : <Building2 size={20} />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {client.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {client.type === 'security' ? 'ביטחוני' : 'אזרחי'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{client.contactName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1 space-x-reverse">
                    <Mail size={12} />
                    <span>{client.contactEmail}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1 space-x-reverse">
                    <Phone size={12} />
                    <span>{client.contactPhone}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{client.openJobs}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">משרות</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{client.placedEmployees}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">עובדים</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(client.outstandingDebt)}
                  </div>
                  {client.overdueAmount > 0 && (
                    <div className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1 space-x-reverse">
                      <AlertTriangle size={12} />
                      <span>{formatCurrency(client.overdueAmount)} בפיגור</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(client.lastActivity)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === client.id ? null : client.id);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MoreVertical size={16} />
                  </button>
                  
                  {openMenuId === client.id && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectClient(client);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-right px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 space-x-reverse"
                        >
                          <Eye size={14} />
                          <span>הצג פרטי לקוח</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCreatePO(client);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-right px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 space-x-reverse"
                        >
                          <FileText size={14} />
                          <span>יצירת הזמנת רכש</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Edit logic
                            setOpenMenuId(null);
                          }}
                          className="w-full text-right px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 space-x-reverse"
                        >
                          <Edit size={14} />
                          <span>ערוך לקוח</span>
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden p-4 space-y-4">
        {sortedClients.map((client) => (
          <div
            key={client.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectClient(client)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className={`p-2 rounded-lg ${
                  client.type === 'security' 
                    ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' 
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                }`}>
                  {client.type === 'security' ? <Shield size={20} /> : <Building2 size={20} />}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{client.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {client.type === 'security' ? 'ביטחוני' : 'אזרחי'}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === client.id ? null : client.id);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">איש קשר:</span>
                <span className="text-gray-900 dark:text-white">{client.contactName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">משרות פתוחות:</span>
                <span className="text-gray-900 dark:text-white">{client.openJobs}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">חוב פתוח:</span>
                <span className={`font-medium ${
                  client.overdueAmount > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                }`}>
                  {formatCurrency(client.outstandingDebt)}
                </span>
              </div>
              {client.overdueAmount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">בפיגור:</span>
                  <span className="text-red-600 dark:text-red-400 flex items-center space-x-1 space-x-reverse">
                    <AlertTriangle size={12} />
                    <span>{formatCurrency(client.overdueAmount)}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            {openMenuId === client.id && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreatePO(client);
                    setOpenMenuId(null);
                  }}
                  className="w-full text-right px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 space-x-reverse"
                >
                  <FileText size={14} />
                  <span>יצירת הזמנת רכש</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {clients.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">אין לקוחות</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            לא נמצאו לקוחות התואמים לחיפוש שלך
          </p>
        </div>
      )}
    </div>
  );
}