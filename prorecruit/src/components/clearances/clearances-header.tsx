'use client';

import { useState } from 'react';
import {
  Plus,
  Download,
  Upload,
  MoreHorizontal,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { AddCandidateToClearanceModal } from './add-candidate-to-clearance-modal';

export function ClearancesHeader() {
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const stats = [
    { label: 'סה"כ בסיווג', value: '45', icon: Shield, color: 'text-blue-600' },
    { label: 'ממתינים לטפסים', value: '12', icon: Clock, color: 'text-yellow-600' },
    { label: 'אושרו', value: '28', icon: CheckCircle, color: 'text-green-600' },
    { label: 'דורשים תשומת לב', value: '5', icon: AlertTriangle, color: 'text-red-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">סיווג ביטחוני</h1>
          <p className="text-gray-600 mt-1">ניהול תהליכי סיווג ביטחוני למועמדים ועובדים</p>
        </div>

        <div className="flex items-center space-x-3 space-x-reverse">
          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <MoreHorizontal size={20} />
            </button>

            {showActionsMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Download size={16} className="ml-3" />
                    ייצא דוח סיווג
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Upload size={16} className="ml-3" />
                    ייבא נתונים
                  </button>
                  <hr className="my-1" />
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Shield size={16} className="ml-3" />
                    דוח תהליכים
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Add Candidate to Clearance Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
          >
            <Plus size={16} className="ml-2" />
            הוסף מועמד לסיווג
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

      {/* Add Candidate to Clearance Modal */}
      <AddCandidateToClearanceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(candidateData) => {
          console.log('New candidate data:', candidateData);
          // Here you would typically add the candidate to clearance process
          setShowAddModal(false);
        }}
      />
    </div>
  );
} 