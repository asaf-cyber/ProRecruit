'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  Edit, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  Star,
  DollarSign,
  Calendar,
  Users
} from 'lucide-react';

interface VendorHeaderProps {
  vendorId: string;
}

export function VendorHeader({ vendorId }: VendorHeaderProps) {
  const router = useRouter();
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  // Mock vendor data - in real app this would come from API
  const vendor = {
    id: vendorId,
    name: 'מרכז רפואי תל אביב',
    contactName: 'ד"ר שרה כהן',
    contactEmail: 'sarah.cohen@medical-center.co.il',
    contactPhone: '+972-3-123-4567',
    address: 'רחוב הרצל 123, תל אביב',
    specialization: 'רפואי',
    status: 'פעיל',
    rating: 4.8,
    totalSpent: 125000,
    servicesCount: 8,
    lastInvoiceDate: '2024-01-15',
    website: 'https://medical-center.co.il'
  };

  const stats = [
    { label: 'סה"כ הוצאות', value: `₪${vendor.totalSpent.toLocaleString()}`, icon: DollarSign, color: 'text-green-600' },
    { label: 'מספר שירותים', value: vendor.servicesCount.toString(), icon: Building2, color: 'text-blue-600' },
    { label: 'חשבונית אחרונה', value: new Date(vendor.lastInvoiceDate).toLocaleDateString('he-IL'), icon: Calendar, color: 'text-purple-600' },
    { label: 'עובדים משויכים', value: '23', icon: Users, color: 'text-orange-600' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Main Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start space-x-4 space-x-reverse">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 rounded-xl bg-blue-100 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 space-x-reverse mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{vendor.name}</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {vendor.status}
              </span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 mr-1">{vendor.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-3">{vendor.specialization}</p>
            
            <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500">
              <div className="flex items-center">
                <Phone className="h-4 w-4 ml-2" />
                {vendor.contactPhone}
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 ml-2" />
                {vendor.contactEmail}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 ml-2" />
                {vendor.address}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={() => setShowActionsMenu(!showActionsMenu)}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Edit size={20} />
          </button>
          
          <button
            onClick={() => router.push('/vendors')}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-100 text-gray-900 hover:bg-gray-200 h-10 px-4 py-2"
          >
            <ArrowRight size={16} className="ml-2" />
            חזרה לרשימה
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-white ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 