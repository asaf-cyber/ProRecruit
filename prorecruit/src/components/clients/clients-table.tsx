'use client';

import { useState } from 'react';
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Building2,
  Phone,
  Mail,
  MapPin,
  Users,
  DollarSign,
  Calendar
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  status: 'active' | 'inactive' | 'prospect' | 'vip';
  openPositions: number;
  employedWorkers: number;
  outstandingDebt: number;
  lastActivity: string;
}

interface ClientsTableProps {
  searchQuery: string;
  statusFilter: string;
  departmentFilter: string;
}

export function ClientsTable({ searchQuery, statusFilter, departmentFilter }: ClientsTableProps) {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);

  // Mock data
  const clients: Client[] = [
    {
      id: '1',
      name: 'Microsoft ישראל',
      contactPerson: 'שרה כהן',
      email: 'sarah.cohen@microsoft.co.il',
      phone: '+972-3-123-4567',
      address: 'תל אביב, רחוב רוטשילד 123',
      department: 'tech',
      status: 'active',
      openPositions: 8,
      employedWorkers: 45,
      outstandingDebt: 125000,
      lastActivity: '2024-01-15'
    },
    {
      id: '2',
      name: 'בנק הפועלים',
      contactPerson: 'דוד לוי',
      email: 'david.levi@bankhapoalim.co.il',
      phone: '+972-3-987-6543',
      address: 'תל אביב, רחוב אלנבי 456',
      department: 'finance',
      status: 'active',
      openPositions: 12,
      employedWorkers: 78,
      outstandingDebt: 89000,
      lastActivity: '2024-01-14'
    },
    {
      id: '3',
      name: 'אינטל ישראל',
      contactPerson: 'מיכל ישראלי',
      email: 'michal.israeli@intel.co.il',
      phone: '+972-4-555-1234',
      address: 'חיפה, רחוב הטכניון 789',
      department: 'tech',
      status: 'vip',
      openPositions: 15,
      employedWorkers: 120,
      outstandingDebt: 0,
      lastActivity: '2024-01-16'
    },
    {
      id: '4',
      name: 'מכבי שירותי בריאות',
      contactPerson: 'יוסי גולדברג',
      email: 'yossi.goldberg@maccabi.co.il',
      phone: '+972-3-777-8888',
      address: 'תל אביב, רחוב ויצמן 321',
      department: 'healthcare',
      status: 'active',
      openPositions: 6,
      employedWorkers: 34,
      outstandingDebt: 45000,
      lastActivity: '2024-01-13'
    },
    {
      id: '5',
      name: 'שופרסל',
      contactPerson: 'רונית שפירא',
      email: 'ronit.shapira@shufersal.co.il',
      phone: '+972-3-999-0000',
      address: 'תל אביב, רחוב דיזנגוף 654',
      department: 'retail',
      status: 'prospect',
      openPositions: 3,
      employedWorkers: 12,
      outstandingDebt: 0,
      lastActivity: '2024-01-10'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'פעיל', color: 'bg-green-100 text-green-800' },
      inactive: { label: 'לא פעיל', color: 'bg-gray-100 text-gray-800' },
      prospect: { label: 'פוטנציאלי', color: 'bg-yellow-100 text-yellow-800' },
      vip: { label: 'VIP', color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getDepartmentBadge = (department: string) => {
    const deptConfig = {
      tech: { label: 'טכנולוגיה', color: 'bg-blue-100 text-blue-800' },
      finance: { label: 'פיננסים', color: 'bg-green-100 text-green-800' },
      healthcare: { label: 'בריאות', color: 'bg-red-100 text-red-800' },
      retail: { label: 'קמעונאות', color: 'bg-orange-100 text-orange-800' },
      manufacturing: { label: 'ייצור', color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = deptConfig[department as keyof typeof deptConfig];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Filter clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || client.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                לקוח
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                איש קשר
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מחלקה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                משרות פתוחות
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                עובדים מועסקים
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                חוב פתוח
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעילות אחרונה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="mr-3">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.contactPerson}</div>
                  <div className="text-sm text-gray-500">{client.email}</div>
                  <div className="text-sm text-gray-500">{client.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getDepartmentBadge(client.department)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(client.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {client.openPositions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {client.employedWorkers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₪{client.outstandingDebt.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(client.lastActivity).toLocaleDateString('he-IL')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => setShowActionsMenu(showActionsMenu === client.id ? null : client.id)}
                      className="p-2 rounded-lg hover:bg-gray-100"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    
                    {showActionsMenu === client.id && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Eye size={16} className="ml-3" />
                            הצג פרטים
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Edit size={16} className="ml-3" />
                            ערוך לקוח
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Plus size={16} className="ml-3" />
                            צור הזמנת רכש
                          </button>
                          <hr className="my-1" />
                          <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <Trash2 size={16} className="ml-3" />
                            מחק לקוח
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
      
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">לא נמצאו לקוחות</h3>
          <p className="mt-1 text-sm text-gray-500">נסה לשנות את הפילטרים או הוסף לקוח חדש.</p>
        </div>
      )}
    </div>
  );
} 