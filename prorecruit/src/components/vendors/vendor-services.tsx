'use client';

import { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface VendorServicesProps {
  vendorId: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  pricingModel: 'fixed' | 'hourly' | 'per_unit';
  price: number;
  unit: string;
  status: 'active' | 'inactive';
  lastUsed: string;
  usageCount: number;
}

export function VendorServices({ vendorId }: VendorServicesProps) {
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState<string | null>(null);

  // Mock services data
  const services: Service[] = [
    {
      id: '1',
      name: 'בדיקה רפואית כללית',
      description: 'בדיקה רפואית מקיפה כולל בדיקות דם',
      pricingModel: 'fixed',
      price: 1500,
      unit: 'לבדיקה',
      status: 'active',
      lastUsed: '2024-01-15',
      usageCount: 45
    },
    {
      id: '2',
      name: 'בדיקת ראייה',
      description: 'בדיקת ראייה מקצועית עם רופא עיניים',
      pricingModel: 'fixed',
      price: 800,
      unit: 'לבדיקה',
      status: 'active',
      lastUsed: '2024-01-12',
      usageCount: 23
    },
    {
      id: '3',
      name: 'בדיקת שמיעה',
      description: 'בדיקת שמיעה מקצועית',
      pricingModel: 'fixed',
      price: 600,
      unit: 'לבדיקה',
      status: 'active',
      lastUsed: '2024-01-10',
      usageCount: 18
    },
    {
      id: '4',
      name: 'ייעוץ רפואי',
      description: 'ייעוץ רפואי מקצועי',
      pricingModel: 'hourly',
      price: 300,
      unit: 'לשעה',
      status: 'active',
      lastUsed: '2024-01-08',
      usageCount: 12
    },
    {
      id: '5',
      name: 'בדיקת רנטגן',
      description: 'בדיקת רנטגן לפי צורך',
      pricingModel: 'fixed',
      price: 400,
      unit: 'לבדיקה',
      status: 'inactive',
      lastUsed: '2023-12-20',
      usageCount: 8
    }
  ];

  const getPricingModelLabel = (model: string) => {
    const models = {
      fixed: 'מחיר קבוע',
      hourly: 'תמחור לפי שעה',
      per_unit: 'תמחור לפי יחידה'
    };
    return models[model as keyof typeof models] || model;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 ml-1" />
          פעיל
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <AlertCircle className="h-3 w-3 ml-1" />
        לא פעיל
      </span>
    );
  };

  const getPriceDisplay = (service: Service) => {
    if (service.pricingModel === 'hourly') {
      return `₪${service.price} לשעה`;
    }
    return `₪${service.price} ${service.unit}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">שירותים ותמחור</h3>
          <p className="text-sm text-gray-500 mt-1">ניהול השירותים שהספק מספק ותמחורם</p>
        </div>
        <button
          onClick={() => setShowAddService(true)}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
        >
          <Plus size={16} className="ml-2" />
          הוסף שירות
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שירות
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מודל תמחור
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מחיר
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שימוש אחרון
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    <div className="text-sm text-gray-500">{service.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getPricingModelLabel(service.pricingModel)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-600 ml-1" />
                    <span className="text-sm font-medium text-gray-900">{getPriceDisplay(service)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(service.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(service.lastUsed).toLocaleDateString('he-IL')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {service.usageCount} פעמים
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => setEditingService(service.id)}
                      className="text-blue-600 hover:text-blue-900 p-1"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => console.log('Delete service:', service.id)}
                      className="text-red-600 hover:text-red-900 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-blue-600">סה&quot;כ שירותים</p>
              <p className="text-lg font-semibold text-blue-900">{services.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-green-600">שירותים פעילים</p>
              <p className="text-lg font-semibold text-green-900">
                {services.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-purple-600">סה&quot;כ שימושים</p>
              <p className="text-lg font-semibold text-purple-900">
                {services.reduce((sum, service) => sum + service.usageCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 