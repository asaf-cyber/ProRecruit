'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Building,
  Users,
  Target,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  Globe,
  Shield,
  User
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  clientType: 'civilian' | 'security';
  openJobs: number;
  totalRevenue: number;
  lastActivity: string;
  status: 'active' | 'inactive' | 'prospect';
  notes: string;
}

export function SalesClients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data
  const clients: Client[] = [
    {
      id: '1',
      name: 'חברת ABC טכנולוגיות',
      contactPerson: 'שרה לוי',
      contactEmail: 'sarah@abc-tech.com',
      contactPhone: '03-1234567',
      website: 'www.abc-tech.com',
      clientType: 'civilian',
      openJobs: 3,
      totalRevenue: 45000,
      lastActivity: '2024-01-15',
      status: 'active',
      notes: 'לקוח אסטרטגי עם פוטנציאל גדול'
    },
    {
      id: '2',
      name: 'חברת XYZ ביטחון',
      contactPerson: 'מיכאל כהן',
      contactEmail: 'michael@xyz-security.com',
      contactPhone: '02-9876543',
      website: 'www.xyz-security.com',
      clientType: 'security',
      openJobs: 2,
      totalRevenue: 32000,
      lastActivity: '2024-01-14',
      status: 'active',
      notes: 'חברה ביטחונית עם דרישות מיוחדות'
    },
    {
      id: '3',
      name: 'חברת DEF פיתוח',
      contactPerson: 'דוד רוזנברג',
      contactEmail: 'david@def-dev.com',
      contactPhone: '04-5555555',
      website: 'www.def-dev.com',
      clientType: 'civilian',
      openJobs: 1,
      totalRevenue: 28000,
      lastActivity: '2024-01-13',
      status: 'active',
      notes: 'סטארט-אפ עם צמיחה מהירה'
    },
    {
      id: '4',
      name: 'חברת GHI שירותים',
      contactPerson: 'נועה אברהם',
      contactEmail: 'noa@ghi-services.com',
      contactPhone: '09-1111111',
      website: 'www.ghi-services.com',
      clientType: 'civilian',
      openJobs: 0,
      totalRevenue: 20000,
      lastActivity: '2024-01-10',
      status: 'inactive',
      notes: 'לקוח לא פעיל - דורש מעקב'
    }
  ];

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: Client['status']) => {
    switch (status) {
      case 'active': return 'פעיל';
      case 'inactive': return 'לא פעיל';
      case 'prospect': return 'פוטנציאלי';
    }
  };

  const getClientTypeIcon = (type: Client['clientType']) => {
    return type === 'security' ? <Shield className="w-4 h-4" /> : <Building className="w-4 h-4" />;
  };

  const getClientTypeText = (type: Client['clientType']) => {
    return type === 'security' ? 'ביטחוני' : 'אזרחי';
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = !searchQuery || 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || client.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ניהול לקוחות</h1>
          <p className="text-gray-600">ניהול לקוחות והזדמנויות מכירה</p>
        </div>
        
        <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>הוסף לקוח חדש</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חיפוש לקוחות..."
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">כל הלקוחות</option>
            <option value="active">פעילים</option>
            <option value="inactive">לא פעילים</option>
            <option value="prospect">פוטנציאליים</option>
          </select>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Client Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 space-x-reverse mb-2">
                    {getClientTypeIcon(client.clientType)}
                    <span className="text-xs text-gray-500">{getClientTypeText(client.clientType)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{client.name}</h3>
                  <p className="text-sm text-gray-600">{client.contactPerson}</p>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                    {getStatusText(client.status)}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{client.contactEmail}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{client.contactPhone}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span>{client.website}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{client.openJobs}</div>
                  <div className="text-xs text-gray-500">משרות פתוחות</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">₪{client.totalRevenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">הכנסות</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <button 
                  onClick={() => {
                    setSelectedClient(client);
                    setShowClientModal(true);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 space-x-reverse px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>צפייה</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 space-x-reverse px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>עריכה</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">אין לקוחות</h3>
          <p className="mt-1 text-sm text-gray-500">
            התחל להוסיף לקוחות חדשים או שנה את הפילטרים שלך.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              הוסף לקוח חדש
            </button>
          </div>
        </div>
      )}

      {/* Client Details Modal */}
      {showClientModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">{selectedClient.name}</h2>
                <button 
                  onClick={() => setShowClientModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">פרטי קשר</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">איש קשר</label>
                      <p className="text-sm text-gray-900">{selectedClient.contactPerson}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">אימייל</label>
                      <p className="text-sm text-gray-900">{selectedClient.contactEmail}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">טלפון</label>
                      <p className="text-sm text-gray-900">{selectedClient.contactPhone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">אתר</label>
                      <p className="text-sm text-gray-900">{selectedClient.website}</p>
                    </div>
                  </div>
                </div>

                {/* Client Type and Status */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">סוג לקוח וסטטוס</h3>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getClientTypeIcon(selectedClient.clientType)}
                      <span className="text-sm text-gray-900">{getClientTypeText(selectedClient.clientType)}</span>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedClient.status)}`}>
                      {getStatusText(selectedClient.status)}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">הערות פנימיות</h3>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {selectedClient.notes}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3 space-x-reverse pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    צור משרה חדשה
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    צור הזמנה
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    עריכה
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 