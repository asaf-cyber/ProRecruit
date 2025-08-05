'use client';

import { Database, Brain, TrendingUp, Users, Search, Filter } from 'lucide-react';

export function CVDatabaseHeader() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">מאגר קורות חיים</h1>
            <p className="text-gray-600">מאגר ידע אסטרטגי ומרכז בקרה חכם</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2,847</div>
            <div className="text-sm text-gray-500">מועמדים במאגר</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="text-sm text-gray-500">הועלו החודש</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">89%</div>
            <div className="text-sm text-gray-500">דיוק AI</div>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-3 space-x-reverse p-3 bg-blue-50 rounded-lg">
          <Brain className="w-5 h-5 text-blue-600" />
          <div>
            <div className="text-sm font-medium text-blue-900">AI Parsing</div>
            <div className="text-xs text-blue-600">ניתוח אוטומטי</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse p-3 bg-green-50 rounded-lg">
          <Search className="w-5 h-5 text-green-600" />
          <div>
            <div className="text-sm font-medium text-green-900">חיפוש סמנטי</div>
            <div className="text-xs text-green-600">חיפוש חכם</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse p-3 bg-purple-50 rounded-lg">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <div>
            <div className="text-sm font-medium text-purple-900">המלצות חכמות</div>
            <div className="text-xs text-purple-600">התאמה אוטומטית</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse p-3 bg-orange-50 rounded-lg">
          <Users className="w-5 h-5 text-orange-600" />
          <div>
            <div className="text-sm font-medium text-orange-900">מעקב הפניות</div>
            <div className="text-xs text-orange-600">חבר מביא חבר</div>
          </div>
        </div>
      </div>
    </div>
  );
} 