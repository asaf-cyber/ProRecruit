'use client';

import { useState, useEffect } from 'react';
import { 
  Save, 
  X, 
  Edit, 
  Plus, 
  Trash2, 
  Phone, 
  Mail, 
  User,
  Building2,
  MapPin,
  Globe,
  CreditCard,
  Shield
} from 'lucide-react';

interface ClientContact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

interface ClientDetailsTabProps {
  client: {
    id: string;
    name: string;
    type: 'civil' | 'security';
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    website?: string;
    paymentTerms: string;
  } | null;
  isEditMode: boolean;
  onEdit: () => void;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function ClientDetailsTab({ 
  client, 
  isEditMode, 
  onEdit, 
  onSave, 
  onCancel 
}: ClientDetailsTabProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'civil' as 'civil' | 'security',
    address: '',
    website: '',
    paymentTerms: 'שוטף + 30',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [contacts, setContacts] = useState<ClientContact[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState<Omit<ClientContact, 'id'>>({
    name: '',
    role: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        type: client.type,
        address: client.address,
        website: client.website || '',
        paymentTerms: client.paymentTerms,
        contactName: client.contactName,
        contactEmail: client.contactEmail,
        contactPhone: client.contactPhone
      });

      // Mock contacts data
      setContacts([
        {
          id: '1',
          name: client.contactName,
          role: 'מנהל פרויקטים',
          email: client.contactEmail,
          phone: client.contactPhone
        }
      ]);
    }
  }, [client]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.email) {
      setContacts([
        ...contacts,
        {
          id: Date.now().toString(),
          ...newContact
        }
      ]);
      setNewContact({ name: '', role: '', email: '', phone: '' });
      setShowAddContact(false);
    }
  };

  const handleDeleteContact = (id: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק איש קשר זה?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  if (!isEditMode) {
    return (
      <div className="space-y-6">
        {/* View Mode */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">פרטי לקוח</h3>
          <button
            onClick={onEdit}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit size={16} className="ml-2" />
            ערוך
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">מידע כללי</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">שם לקוח</label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white">{client?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">סוג לקוח</label>
                <div className="mt-1 flex items-center">
                  {client?.type === 'security' ? (
                    <>
                      <Shield size={16} className="text-red-600 dark:text-red-400 ml-1" />
                      <span className="text-sm text-gray-900 dark:text-white">ביטחוני</span>
                    </>
                  ) : (
                    <>
                      <Building2 size={16} className="text-blue-600 dark:text-blue-400 ml-1" />
                      <span className="text-sm text-gray-900 dark:text-white">אזרחי</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">כתובת</label>
                <div className="mt-1 flex items-center">
                  <MapPin size={16} className="text-gray-400 ml-1" />
                  <p className="text-sm text-gray-900 dark:text-white">{client?.address}</p>
                </div>
              </div>
              {client?.website && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">אתר אינטרנט</label>
                  <div className="mt-1 flex items-center">
                    <Globe size={16} className="text-gray-400 ml-1" />
                    <a 
                      href={`https://${client.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {client.website}
                    </a>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">תנאי תשלום</label>
                <div className="mt-1 flex items-center">
                  <CreditCard size={16} className="text-gray-400 ml-1" />
                  <p className="text-sm text-gray-900 dark:text-white">{client?.paymentTerms}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">אנשי קשר</h4>
              {isEditMode && (
                <button
                  onClick={() => setShowAddContact(true)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  <Plus size={16} />
                </button>
              )}
            </div>
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div key={contact.id} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</p>
                      {contact.role && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">{contact.role}</p>
                      )}
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Mail size={12} className="ml-1" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Phone size={12} className="ml-1" />
                        <span>{contact.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Edit Mode
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {client ? 'עריכת פרטי לקוח' : 'לקוח חדש'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information Form */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">מידע כללי</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              שם לקוח *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              סוג לקוח *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'civil' | 'security' })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="civil">אזרחי</option>
              <option value="security">ביטחוני</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              כתובת
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              אתר אינטרנט
            </label>
            <input
              type="text"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="example.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              תנאי תשלום
            </label>
            <select
              value={formData.paymentTerms}
              onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="שוטף + 30">שוטף + 30</option>
              <option value="שוטף + 45">שוטף + 45</option>
              <option value="שוטף + 60">שוטף + 60</option>
              <option value="שוטף + 90">שוטף + 90</option>
            </select>
          </div>
        </div>

        {/* Main Contact Form */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">איש קשר ראשי</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              שם איש קשר *
            </label>
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              דוא"ל *
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              טלפון *
            </label>
            <input
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>
      </div>

      {/* Additional Contacts */}
      {contacts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">אנשי קשר נוספים</h4>
            <button
              type="button"
              onClick={() => setShowAddContact(true)}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <Plus size={16} className="ml-1" />
              הוסף איש קשר
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</p>
                    {contact.role && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">{contact.role}</p>
                    )}
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Mail size={12} className="ml-1" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Phone size={12} className="ml-1" />
                      <span>{contact.phone}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteContact(contact.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          ביטול
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Save size={16} className="ml-2" />
          שמור
        </button>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">הוסף איש קשר</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">שם</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">תפקיד</label>
                <input
                  type="text"
                  value={newContact.role}
                  onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">דוא"ל</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">טלפון</label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 space-x-reverse mt-6">
              <button
                type="button"
                onClick={() => setShowAddContact(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                ביטול
              </button>
              <button
                type="button"
                onClick={handleAddContact}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                הוסף
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}