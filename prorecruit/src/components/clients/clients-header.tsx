'use client';

import { useState } from 'react';
import { 
  Plus, 
  Download, 
  Upload, 
  MoreHorizontal,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  ShoppingCart,
  AlertCircle
} from 'lucide-react';

export function ClientsHeader() {
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const stats = [
    { 
      label: 'סה"כ לקוחות', 
      value: '156', 
      icon: Building2, 
      color: 'text-blue-600',
      change: '+8 החודש'
    },
    { 
      label: 'הזמנות רכש פעילות', 
      value: '89', 
      icon: ShoppingCart, 
      color: 'text-green-600',
      change: '+12 החודש'
    },
    { 
      label: 'חשבוניות פתוחות', 
      value: '₪1.2M', 
      icon: FileText, 
      color: 'text-orange-600',
      change: '23 חשבוניות'
    },
    { 
      label: 'הכנסה חודשית', 
      value: '₪2.4M', 
      icon: DollarSign, 
      color: 'text-purple-600',
      change: '+15% מהחודש הקודם'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">לקוחות והזמנות</h1>
          <p className="text-gray-600 mt-1">ניהול לקוחות, הזמנות רכש וחשבוניות</p>
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
                    ייצא לקוחות
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Upload size={16} className="ml-3" />
                    ייבא לקוחות
                  </button>
                  <hr className="my-1" />
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FileText size={16} className="ml-3" />
                    דוח חובות (Aging Report)
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <ShoppingCart size={16} className="ml-3" />
                    דוח הזמנות רכש
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <AlertCircle size={16} className="ml-3" />
                    התראות תשלומים
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Add New Client Button */}
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2">
            <Plus size={16} className="ml-2" />
            הוסף לקוח חדש
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 