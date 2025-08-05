'use client';

import { useState } from 'react';
import {
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  X
} from 'lucide-react';
import { ContractsTable } from './contracts-table';
import { ContractsFilters } from './contracts-filters';
import { CreateContractModal } from './create-contract-modal';

export function ContractsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const stats = [
    { label: 'סה"כ חוזים', value: '67', icon: FileText, color: 'text-blue-600' },
    { label: 'ממתינים לחתימה', value: '12', icon: Clock, color: 'text-yellow-600' },
    { label: 'חתומים', value: '45', icon: CheckCircle, color: 'text-green-600' },
    { label: 'פגי תוקף', value: '3', icon: AlertTriangle, color: 'text-red-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ניהול חוזים</h2>
          <p className="text-gray-600 mt-1">יצירה, עריכה וניהול חוזי עבודה</p>
        </div>

        <div className="flex items-center space-x-3 space-x-reverse">
          {/* Actions Menu */}
          <div className="relative">
            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Create Contract Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
          >
            <Plus size={16} className="ml-2" />
            יצירת חוזה חדש
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <ContractsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedClient={selectedClient}
        onClientChange={setSelectedClient}
      />

      {/* Table */}
      <ContractsTable
        searchQuery={searchQuery}
        statusFilter={selectedStatus}
        clientFilter={selectedClient}
      />

      {/* Create Contract Modal */}
      <CreateContractModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={(contractData) => {
          console.log('New contract data:', contractData);
          setShowCreateModal(false);
        }}
      />
    </div>
  );
} 