'use client';

import { Cpu, Code } from 'lucide-react';

export function CompanyLogo() {
  return (
    <div className="text-center">
      {/* Main Company Logo */}
      <div className="mb-4">
        <div className="inline-flex items-center space-x-3 space-x-reverse bg-white rounded-lg px-6 py-4 shadow-lg">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">ב</span>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-900">בינת</h1>
            <p className="text-sm text-gray-600">ProRecruit</p>
          </div>
        </div>
      </div>
      
      {/* IT Experts Department Logo */}
      <div className="mb-6">
        <div className="inline-flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-red-50 to-gray-50 rounded-lg px-4 py-2 border border-red-200">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-gray-700 rounded-lg flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold text-gray-900">IT EXPERTS</h2>
            <p className="text-xs text-gray-600">מחלקת מומחי טכנולוגיה</p>
          </div>
        </div>
      </div>
      
      {/* Tagline */}
      <div className="text-center">
        <p className="text-gray-600 text-sm">
          מערכת ניהול גיוס מתקדמת
        </p>
        <div className="flex items-center justify-center space-x-2 space-x-reverse mt-2">
          <Code className="w-4 h-4 text-red-600" />
          <span className="text-xs text-gray-500">פותח על ידי מומחי IT</span>
        </div>
      </div>
    </div>
  );
} 