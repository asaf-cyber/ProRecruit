'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ContractsTab } from '@/components/contracts/contracts-tab';
import { EmployeesTab } from '@/components/contracts/employees-tab';

export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState('contracts');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">חוזים ועובדים</h1>
            <p className="text-gray-600 mt-1">ניהול חוזי עבודה ומידע עובדים</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 space-x-reverse px-6">
              <button
                onClick={() => setActiveTab('contracts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'contracts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                חוזים
              </button>
              <button
                onClick={() => setActiveTab('employees')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'employees'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                עובדים
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'contracts' && <ContractsTab />}
            {activeTab === 'employees' && <EmployeesTab />}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 