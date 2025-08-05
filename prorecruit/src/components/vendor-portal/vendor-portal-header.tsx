'use client';

import { User, Building2, Mail, Phone } from 'lucide-react';

export function VendorPortalHeader() {
  // Mock data - בפועל זה יגיע מה-API
  const vendor = {
    name: 'טכנולוגיות מתקדמות בע"מ',
    contactPerson: 'דוד כהן',
    email: 'david@tech-advanced.co.il',
    phone: '03-1234567',
    logo: '/api/placeholder/60/60'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-15 h-15 bg-gray-200 rounded-lg flex items-center justify-center">
            <Building2 className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{vendor.name}</h1>
            <p className="text-gray-600">פורטל ספק</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{vendor.contactPerson}</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{vendor.email}</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{vendor.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 