'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ClientsList } from '@/components/clients/clients-list';
import { ClientDetailsModal } from '@/components/clients/client-details-modal';
import { Plus, Building2, Filter, Search, TrendingUp, AlertCircle } from 'lucide-react';

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

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState<'all' | 'civil' | 'security'>('all');

  // Mock data
  const mockClients: Client[] = [
    {
      id: '1',
      name: 'Microsoft ישראל',
      type: 'civil',
      contactName: 'יוסי כהן',
      contactEmail: 'yossi@microsoft.com',
      contactPhone: '050-1234567',
      address: 'הרצל 234, תל אביב',
      website: 'microsoft.com',
      paymentTerms: 'שוטף + 30',
      openJobs: 12,
      placedEmployees: 45,
      outstandingDebt: 250000,
      overdueAmount: 50000,
      lastActivity: '2024-01-18'
    },
    {
      id: '2',
      name: 'רפאל מערכות לחימה',
      type: 'security',
      contactName: 'שרה לוי',
      contactEmail: 'sarah@rafael.co.il',
      contactPhone: '050-9876543',
      address: 'דרך חיפה 350, חיפה',
      website: 'rafael.co.il',
      paymentTerms: 'שוטף + 60',
      openJobs: 8,
      placedEmployees: 23,
      outstandingDebt: 450000,
      overdueAmount: 0,
      lastActivity: '2024-01-20'
    },
    {
      id: '3',
      name: 'Google ישראל',
      type: 'civil',
      contactName: 'דוד ישראלי',
      contactEmail: 'david@google.com',
      contactPhone: '050-5555555',
      address: 'יגאל אלון 98, תל אביב',
      website: 'google.com',
      paymentTerms: 'שוטף + 45',
      openJobs: 6,
      placedEmployees: 67,
      outstandingDebt: 180000,
      overdueAmount: 30000,
      lastActivity: '2024-01-15'
    },
    {
      id: '4',
      name: 'אלביט מערכות',
      type: 'security',
      contactName: 'מיכל רוזנברג',
      contactEmail: 'michal@elbitsystems.com',
      contactPhone: '050-4444444',
      address: 'העמל 8, חיפה',
      website: 'elbitsystems.com',
      paymentTerms: 'שוטף + 90',
      openJobs: 15,
      placedEmployees: 89,
      outstandingDebt: 780000,
      overdueAmount: 120000,
      lastActivity: '2024-01-19'
    }
  ];

  // Filter clients based on search and type
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = clientTypeFilter === 'all' || client.type === clientTypeFilter;
    return matchesSearch && matchesType;
  });

  // Calculate summary statistics
  const stats = {
    totalClients: filteredClients.length,
    totalDebt: filteredClients.reduce((sum, client) => sum + client.outstandingDebt, 0),
    overdueDebt: filteredClients.reduce((sum, client) => sum + client.overdueAmount, 0),
    activeJobs: filteredClients.reduce((sum, client) => sum + client.openJobs, 0)
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">לקוחות והזמנות</h1>
            <p className="text-gray-600 dark:text-gray-400">ניהול לקוחות, הזמנות רכש וחשבוניות</p>
          </div>
          <button
            onClick={() => setShowNewClientModal(true)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
          >
            <Plus size={20} className="ml-2" />
            הוספת לקוח חדש
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">סה&quot;כ לקוחות</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalClients}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Building2 size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">חוב כולל</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">₪{stats.totalDebt.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">חוב בפיגור</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">₪{stats.overdueDebt.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <AlertCircle size={24} className="text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">משרות פעילות</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.activeJobs}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Filter size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="חיפוש לפי שם לקוח, איש קשר או מייל..."
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Client Type Filter */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">סוג לקוח:</label>
              <select
                value={clientTypeFilter}
                onChange={(e) => setClientTypeFilter(e.target.value as 'all' | 'civil' | 'security')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">כל הלקוחות</option>
                <option value="civil">אזרחי</option>
                <option value="security">ביטחוני</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clients List */}
        <ClientsList 
          clients={filteredClients}
          onSelectClient={setSelectedClient}
          onCreatePO={(client) => {
            setSelectedClient(client);
            // Navigate to PO tab
          }}
        />

        {/* Client Details Modal */}
        {selectedClient && (
          <ClientDetailsModal
            isOpen={selectedClient !== null}
            onClose={() => setSelectedClient(null)}
            client={selectedClient}
            onUpdate={(updatedClient) => {
              // Update client logic
              console.log('Update client:', updatedClient);
            }}
          />
        )}

        {/* New Client Modal */}
        {showNewClientModal && (
          <ClientDetailsModal
            isOpen={showNewClientModal}
            onClose={() => setShowNewClientModal(false)}
            client={null}
            onUpdate={(newClient) => {
              // Create new client logic
              console.log('Create new client:', newClient);
              setShowNewClientModal(false);
            }}
          />
        )}
      </div>
    </MainLayout>
  );
}