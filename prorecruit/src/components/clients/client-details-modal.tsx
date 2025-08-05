'use client';

import { useState } from 'react';
import { 
  X, 
  Building2, 
  Shield, 
  User, 
  Phone, 
  Mail, 
  Globe, 
  MapPin,
  FileText,
  DollarSign,
  Calendar,
  Briefcase,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { ClientDetailsTab } from './client-details-tab';
import { ClientJobsTab } from './client-jobs-tab';
import { ClientPurchaseOrdersTab } from './client-purchase-orders-tab';
import { ClientInvoicesTab } from './client-invoices-tab';

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

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onUpdate: (client: Client) => void;
}

export function ClientDetailsModal({ 
  isOpen, 
  onClose, 
  client, 
  onUpdate 
}: ClientDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'jobs' | 'purchase-orders' | 'invoices'>('details');
  const [isEditMode, setIsEditMode] = useState(!client); // Edit mode for new client

  if (!isOpen) return null;

  const isNewClient = !client;

  const tabs = [
    { id: 'details' as const, label: 'פרטים', icon: User },
    { id: 'jobs' as const, label: 'משרות והזדמנויות', icon: Briefcase },
    { id: 'purchase-orders' as const, label: 'הזמנות רכש', icon: FileText },
    { id: 'invoices' as const, label: 'חשבוניות וחיובים', icon: DollarSign }
  ];

  const handleSave = (updatedData: Partial<Client>) => {
    if (isNewClient) {
      // Create new client
      const newClient: Client = {
        id: Date.now().toString(),
        name: '',
        type: 'civil',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        paymentTerms: 'שוטף + 30',
        openJobs: 0,
        placedEmployees: 0,
        outstandingDebt: 0,
        overdueAmount: 0,
        lastActivity: new Date().toISOString(),
        ...updatedData
      };
      onUpdate(newClient);
    } else {
      onUpdate({ ...client, ...updatedData });
    }
    setIsEditMode(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className={`p-3 rounded-lg ml-4 ${
                (client?.type || 'civil') === 'security' 
                  ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' 
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
              }`}>
                {(client?.type || 'civil') === 'security' ? <Shield size={24} /> : <Building2 size={24} />}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {isNewClient ? 'לקוח חדש' : client.name}
                </h2>
                {!isNewClient && (
                  <>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {client.type === 'security' ? 'לקוח ביטחוני' : 'לקוח אזרחי'}
                    </p>
                    <div className="flex items-center space-x-4 space-x-reverse mt-2 text-sm">
                      <span className="text-gray-500">חוב פתוח: <span className="font-medium text-gray-900 dark:text-white">₪{client.outstandingDebt.toLocaleString()}</span></span>
                      {client.overdueAmount > 0 && (
                        <span className="text-red-600 dark:text-red-400 flex items-center">
                          <AlertCircle size={14} className="ml-1" />
                          ₪{client.overdueAmount.toLocaleString()} בפיגור
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        {!isNewClient && (
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 space-x-reverse px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={16} className="ml-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {(isNewClient || activeTab === 'details') && (
            <ClientDetailsTab 
              client={client}
              isEditMode={isEditMode || isNewClient}
              onEdit={() => setIsEditMode(true)}
              onSave={handleSave}
              onCancel={() => {
                if (isNewClient) {
                  onClose();
                } else {
                  setIsEditMode(false);
                }
              }}
            />
          )}
          
          {!isNewClient && activeTab === 'jobs' && (
            <ClientJobsTab clientId={client.id} clientType={client.type} />
          )}
          
          {!isNewClient && activeTab === 'purchase-orders' && (
            <ClientPurchaseOrdersTab clientId={client.id} />
          )}
          
          {!isNewClient && activeTab === 'invoices' && (
            <ClientInvoicesTab clientId={client.id} />
          )}
        </div>
      </div>
    </div>
  );
}