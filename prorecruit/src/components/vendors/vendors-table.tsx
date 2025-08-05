'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Building2,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  AlertCircle
} from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  specialization: 'medical' | 'security' | 'background_check' | 'testing' | 'training' | 'legal' | 'other';
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  paymentTerms: string;
  totalSpent: number;
  lastInvoiceDate: string;
  servicesCount: number;
  rating: number;
}

interface VendorsTableProps {
  searchQuery: string;
  specializationFilter: string;
  statusFilter: string;
}

export function VendorsTable({ searchQuery, specializationFilter, statusFilter }: VendorsTableProps) {
  const router = useRouter();
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);

  // Mock vendors data
  const vendors: Vendor[] = [
    {
      id: '1',
      name: 'מרכז רפואי תל אביב',
      contactName: 'ד"ר שרה כהן',
      contactEmail: 'sarah.cohen@medical-center.co.il',
      contactPhone: '+972-3-123-4567',
      address: 'רחוב הרצל 123, תל אביב',
      specialization: 'medical',
      status: 'active',
      paymentTerms: 'שוטף + 30',
      totalSpent: 125000,
      lastInvoiceDate: '2024-01-15',
      servicesCount: 8,
      rating: 4.8
    },
    {
      id: '2',
      name: 'חברת בדיקות רקע מתקדמות',
      contactName: 'יוסי לוי',
      contactEmail: 'yossi.levi@background-check.co.il',
      contactPhone: '+972-2-987-6543',
      address: 'רחוב יפו 456, ירושלים',
      specialization: 'background_check',
      status: 'active',
      paymentTerms: 'שוטף + 45',
      totalSpent: 89000,
      lastInvoiceDate: '2024-01-12',
      servicesCount: 5,
      rating: 4.6
    },
    {
      id: '3',
      name: 'מכון בדיקות ביטחון',
      contactName: 'מיכל ישראלי',
      contactEmail: 'michal.israeli@security-tests.co.il',
      contactPhone: '+972-4-456-7890',
      address: 'רחוב אלנבי 789, חיפה',
      specialization: 'security',
      status: 'active',
      paymentTerms: 'שוטף + 60',
      totalSpent: 156000,
      lastInvoiceDate: '2024-01-10',
      servicesCount: 12,
      rating: 4.9
    },
    {
      id: '4',
      name: 'מרכז הדרכות מקצועיות',
      contactName: 'דוד גולדברג',
      contactEmail: 'david.goldberg@training-center.co.il',
      contactPhone: '+972-9-321-0987',
      address: 'רחוב ויצמן 321, רמת גן',
      specialization: 'training',
      status: 'pending',
      paymentTerms: 'שוטף + 30',
      totalSpent: 45000,
      lastInvoiceDate: '2024-01-08',
      servicesCount: 3,
      rating: 4.2
    },
    {
      id: '5',
      name: 'משרד עורכי דין כהן ושות\'',
      contactName: 'עו"ד רונית שפירא',
      contactEmail: 'ronit.shapira@law-office.co.il',
      contactPhone: '+972-3-654-3210',
      address: 'רחוב רוטשילד 654, תל אביב',
      specialization: 'legal',
      status: 'active',
      paymentTerms: 'שוטף + 30',
      totalSpent: 67000,
      lastInvoiceDate: '2024-01-14',
      servicesCount: 6,
      rating: 4.7
    }
  ];

  const getSpecializationBadge = (specialization: string) => {
    const badges = {
      medical: { label: 'רפואי', color: 'bg-blue-100 text-blue-800' },
      security: { label: 'ביטחון', color: 'bg-red-100 text-red-800' },
      background_check: { label: 'בדיקת רקע', color: 'bg-purple-100 text-purple-800' },
      testing: { label: 'בדיקות', color: 'bg-green-100 text-green-800' },
      training: { label: 'הדרכות', color: 'bg-yellow-100 text-yellow-800' },
      legal: { label: 'משפטי', color: 'bg-indigo-100 text-indigo-800' },
      other: { label: 'אחר', color: 'bg-gray-100 text-gray-800' }
    };
    const badge = badges[specialization as keyof typeof badges] || badges.other;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { label: 'פעיל', color: 'bg-green-100 text-green-800' },
      inactive: { label: 'לא פעיל', color: 'bg-gray-100 text-gray-800' },
      pending: { label: 'ממתין', color: 'bg-yellow-100 text-yellow-800' },
      suspended: { label: 'מושעה', color: 'bg-red-100 text-red-800' }
    };
    const badge = badges[status as keyof typeof badges] || badges.inactive;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  const handleViewVendor = (vendorId: string) => {
    router.push(`/vendors/${vendorId}`);
  };

  const handleEditVendor = (vendorId: string) => {
    // Handle edit vendor
    console.log('Edit vendor:', vendorId);
  };

  const handleDeleteVendor = (vendorId: string) => {
    // Handle delete vendor
    console.log('Delete vendor:', vendorId);
  };

  // Filter vendors based on search and filters
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialization = specializationFilter === 'all' || vendor.specialization === specializationFilter;
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    
    return matchesSearch && matchesSpecialization && matchesStatus;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                ספק
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                איש קשר
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                התמחות
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                הוצאות
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שירותים
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                דירוג
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVendors.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="mr-4">
                      <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                      <div className="text-sm text-gray-500">{vendor.address}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{vendor.contactName}</div>
                    <div className="text-sm text-gray-500">{vendor.contactEmail}</div>
                    <div className="text-sm text-gray-500">{vendor.contactPhone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getSpecializationBadge(vendor.specialization)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(vendor.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₪{vendor.totalSpent.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{vendor.paymentTerms}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{vendor.servicesCount} שירותים</div>
                  <div className="text-sm text-gray-500">עדכון אחרון: {new Date(vendor.lastInvoiceDate).toLocaleDateString('he-IL')}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-900 mr-1">{vendor.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => setShowActionsMenu(showActionsMenu === vendor.id ? null : vendor.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    
                    {showActionsMenu === vendor.id && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          <button
                            onClick={() => handleViewVendor(vendor.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Eye size={16} className="ml-3" />
                            צפייה בפרטים
                          </button>
                          <button
                            onClick={() => handleEditVendor(vendor.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit size={16} className="ml-3" />
                            ערוך
                          </button>
                          <hr className="my-1" />
                          <button
                            onClick={() => handleDeleteVendor(vendor.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} className="ml-3" />
                            מחק
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredVendors.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">לא נמצאו ספקים</h3>
          <p className="mt-1 text-sm text-gray-500">נסה לשנות את הסינון או החיפוש שלך.</p>
        </div>
      )}
    </div>
  );
} 