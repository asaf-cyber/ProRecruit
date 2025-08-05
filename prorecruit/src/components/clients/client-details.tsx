'use client';

import { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  DollarSign, 
  Calendar,
  Plus,
  Edit,
  Trash2,
  FileText,
  ShoppingCart,
  CreditCard
} from 'lucide-react';

interface ClientDetailsProps {
  clientId: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ClientDetails({ clientId, activeTab, onTabChange }: ClientDetailsProps) {
  // Mock client data
  const client = {
    id: clientId,
    name: 'Microsoft ישראל',
    contactPerson: 'שרה כהן',
    email: 'sarah.cohen@microsoft.co.il',
    phone: '+972-3-123-4567',
    address: 'תל אביב, רחוב רוטשילד 123',
    website: 'www.microsoft.co.il',
    department: 'tech',
    status: 'active',
    paymentTerms: 'שוטף + 30',
    openPositions: 8,
    employedWorkers: 45,
    outstandingDebt: 125000,
    totalRevenue: 2500000,
    lastActivity: '2024-01-15'
  };

  const tabs = [
    { id: 'details', label: 'פרטים', icon: Building2 },
    { id: 'jobs', label: 'משרות והזדמנויות', icon: Users },
    { id: 'purchase-orders', label: 'הזמנות רכש', icon: ShoppingCart },
    { id: 'invoices', label: 'חשבוניות וחיובים', icon: CreditCard }
  ];

  const getStatusBadge = (status: string) => {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        פעיל
      </span>
    );
  };

  const getDepartmentBadge = (department: string) => {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        טכנולוגיה
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Client Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 space-x-reverse">
            <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center space-x-3 space-x-reverse mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
                {getStatusBadge(client.status)}
                {getDepartmentBadge(client.department)}
              </div>
              <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone size={16} className="ml-1" />
                  {client.phone}
                </div>
                <div className="flex items-center">
                  <Mail size={16} className="ml-1" />
                  {client.email}
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="ml-1" />
                  {client.address}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 space-x-reverse">
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
              <Edit size={20} />
            </button>
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{client.openPositions}</div>
            <div className="text-sm text-gray-600">משרות פתוחות</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{client.employedWorkers}</div>
            <div className="text-sm text-gray-600">עובדים מועסקים</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">₪{client.outstandingDebt.toLocaleString()}</div>
            <div className="text-sm text-gray-600">חוב פתוח</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">₪{client.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">הכנסה כוללת</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 space-x-reverse px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} className="ml-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">פרטי יצירת קשר</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">שם מלא</label>
                      <p className="mt-1 text-sm text-gray-900">{client.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">איש קשר ראשי</label>
                      <p className="mt-1 text-sm text-gray-900">{client.contactPerson}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">כתובת</label>
                      <p className="mt-1 text-sm text-gray-900">{client.address}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">אתר אינטרנט</label>
                      <p className="mt-1 text-sm text-gray-900">{client.website}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">פרטי אנשי קשר</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{client.contactPerson}</p>
                        <p className="text-sm text-gray-600">מנהל גיוס</p>
                        <p className="text-sm text-gray-600">{client.email}</p>
                      </div>
                      <button className="p-1 rounded hover:bg-gray-200">
                        <Edit size={16} />
                      </button>
                    </div>
                    <button className="flex items-center text-blue-600 hover:text-blue-700">
                      <Plus size={16} className="ml-2" />
                      הוסף איש קשר
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">תנאי תשלום</h3>
                <p className="text-sm text-gray-900">{client.paymentTerms}</p>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">משרות והזדמנויות</h3>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2">
                  <Plus size={16} className="ml-2" />
                  הוסף משרה חדשה
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">אין משרות עדיין</h3>
                <p className="mt-1 text-sm text-gray-500">הוסף משרה חדשה כדי להתחיל</p>
              </div>
            </div>
          )}

          {activeTab === 'purchase-orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">הזמנות רכש</h3>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2">
                  <Plus size={16} className="ml-2" />
                  צור הזמנת רכש חדשה
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">אין הזמנות רכש עדיין</h3>
                <p className="mt-1 text-sm text-gray-500">צור הזמנת רכש חדשה כדי להתחיל</p>
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">חשבוניות וחיובים</h3>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2">
                  <Plus size={16} className="ml-2" />
                  צור חשבונית חדשה
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">אין חשבוניות עדיין</h3>
                <p className="mt-1 text-sm text-gray-500">צור חשבונית חדשה כדי להתחיל</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 