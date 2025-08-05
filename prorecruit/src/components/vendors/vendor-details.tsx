'use client';

import { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Globe,
  User,
  Building2
} from 'lucide-react';

interface VendorDetailsProps {
  vendorId: string;
}

interface ContactPerson {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export function VendorDetails({ vendorId }: VendorDetailsProps) {
  const [showAddContact, setShowAddContact] = useState(false);
  const [editingContact, setEditingContact] = useState<string | null>(null);

  // Mock vendor data
  const vendor = {
    id: vendorId,
    name: 'מרכז רפואי תל אביב',
    address: 'רחוב הרצל 123, תל אביב',
    email: 'info@medical-center.co.il',
    phone: '+972-3-123-4567',
    website: 'https://medical-center.co.il',
    paymentTerms: 'שוטף + 30',
    notes: 'ספק מומלץ לבדיקות רפואיות. שירות מקצועי ומהיר.'
  };

  // Mock contact persons
  const contactPersons: ContactPerson[] = [
    {
      id: '1',
      name: 'ד"ר שרה כהן',
      role: 'מנהלת רפואית',
      email: 'sarah.cohen@medical-center.co.il',
      phone: '+972-3-123-4567'
    },
    {
      id: '2',
      name: 'יוסי לוי',
      role: 'מנהל אדמיניסטרטיבי',
      email: 'yossi.levi@medical-center.co.il',
      phone: '+972-3-123-4568'
    },
    {
      id: '3',
      name: 'מיכל ישראלי',
      role: 'מזכירה רפואית',
      email: 'michal.israeli@medical-center.co.il',
      phone: '+972-3-123-4569'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">פרטי יצירת קשר</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Building2 className="h-5 w-5 text-gray-400 ml-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{vendor.name}</p>
                <p className="text-sm text-gray-500">שם החברה</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 ml-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{vendor.address}</p>
                <p className="text-sm text-gray-500">כתובת</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 ml-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{vendor.email}</p>
                <p className="text-sm text-gray-500">אימייל</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 ml-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{vendor.phone}</p>
                <p className="text-sm text-gray-500">טלפון</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-gray-400 ml-3" />
              <div>
                <a 
                  href={vendor.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  {vendor.website}
                </a>
                <p className="text-sm text-gray-500">אתר אינטרנט</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 ml-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">{vendor.paymentTerms}</p>
                <p className="text-sm text-gray-500">תנאי תשלום</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Persons */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">אנשי קשר</h3>
          <button
            onClick={() => setShowAddContact(true)}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-8 px-3 py-1"
          >
            <Plus size={16} className="ml-1" />
            הוסף איש קשר
          </button>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  שם
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  תפקיד
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  אימייל
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  טלפון
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contactPersons.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => setEditingContact(contact.id)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => console.log('Delete contact:', contact.id)}
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
      </div>

      {/* Notes */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">הערות</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{vendor.notes}</p>
      </div>
    </div>
  );
} 