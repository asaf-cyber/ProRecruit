'use client';

import { useState, useEffect } from 'react';
import { X, Save, Plus, Building2, MapPin, DollarSign, Users, Calendar, Shield, Tag } from 'lucide-react';
import { JobRequisition } from '@/app/jobs/page';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  jobId: string;
  onSave: (jobData: Partial<JobRequisition>) => void;
}

export function CreateJobModal({ isOpen, onClose, mode, jobId, onSave }: CreateJobModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    department: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    securityLevel: '',
    hiringManager: '',
    hiringManagerName: '',
    hiringManagerEmail: '',
    client: '',
    clientName: '',
    clientType: 'civil' as 'civil' | 'security',
    purchaseOrder: '',
    purchaseOrderNumber: '',
    purchaseOrderAmount: '',
    tags: [] as string[],
    publishDate: '',
    closeDate: '',
    status: 'draft' as 'draft' | 'published' | 'closed' | 'on_hold'
  });

  const [newTag, setNewTag] = useState('');

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: '',
        description: '',
        requirements: '',
        department: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        securityLevel: '',
        hiringManager: '',
        hiringManagerName: '',
        hiringManagerEmail: '',
        client: '',
        clientName: '',
        clientType: 'civil' as 'civil' | 'security',
        purchaseOrder: '',
        purchaseOrderNumber: '',
        purchaseOrderAmount: '',
        tags: [] as string[],
        publishDate: '',
        closeDate: '',
        status: 'draft' as 'draft' | 'published' | 'closed' | 'on_hold'
      });
      setNewTag('');
    }
  }, [isOpen, mode]);

  const departments = [
    { value: 'פיתוח', label: 'פיתוח' },
    { value: 'עיצוב', label: 'עיצוב' },
    { value: 'נתונים', label: 'נתונים' },
    { value: 'ניהול', label: 'ניהול' },
    { value: 'משאבי אנוש', label: 'משאבי אנוש' },
    { value: 'מכירות', label: 'מכירות' },
    { value: 'שיווק', label: 'שיווק' },
    { value: 'פעילות', label: 'פעילות' }
  ];

  const securityLevels = [
    { value: '', label: 'ללא דרגת ביטחון' },
    { value: 'ביטחוני בסיסי', label: 'ביטחוני בסיסי' },
    { value: 'סודי', label: 'סודי' },
    { value: 'סודי ביותר', label: 'סודי ביותר' }
  ];

  const clients = [
    { value: 'client1', label: 'חברת הטכנולוגיה המתקדמת', type: 'civil' },
    { value: 'client2', label: 'משרד הביטחון', type: 'security' },
    { value: 'client3', label: 'בנק לאומי', type: 'civil' },
    { value: 'client4', label: 'רפאל מערכות לחימה', type: 'security' }
  ];

  const hiringManagers = [
    { value: 'mgr1', label: 'יוסי גולדברג', email: 'yossi@company.com' },
    { value: 'mgr2', label: 'שרה לוי', email: 'sarah@company.com' },
    { value: 'mgr3', label: 'מיכל רוזן', email: 'michal@company.com' },
    { value: 'mgr4', label: 'דוד כהן', email: 'david@company.com' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClientChange = (clientId: string) => {
    const selectedClient = clients.find(c => c.value === clientId);
    setFormData(prev => ({ 
      ...prev, 
      client: clientId,
      clientName: selectedClient?.label || '',
      clientType: (selectedClient?.type as 'civil' | 'security') || 'civil'
    }));
  };

  const handleManagerChange = (managerId: string) => {
    const selectedManager = hiringManagers.find(m => m.value === managerId);
    setFormData(prev => ({ 
      ...prev, 
      hiringManager: managerId,
      hiringManagerName: selectedManager?.label || '',
      hiringManagerEmail: selectedManager?.email || ''
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Transform form data to match JobRequisition interface
    const jobData: Partial<JobRequisition> = {
      title: formData.title,
      description: formData.description,
      requirements: formData.requirements,
      status: formData.status,
      department: formData.department,
      location: formData.location,
      salaryRange: {
        min: parseInt(formData.salaryMin) || 0,
        max: parseInt(formData.salaryMax) || 0,
        currency: 'ILS'
      },
      securityClearance: formData.securityLevel,
      recruitingManager: {
        id: formData.hiringManager,
        name: formData.hiringManagerName,
        email: formData.hiringManagerEmail
      },
      ...(formData.client && {
        client: {
          id: formData.client,
          name: formData.clientName,
          type: formData.clientType
        }
      }),
      ...(formData.purchaseOrderNumber && {
        purchaseOrder: {
          id: formData.purchaseOrder,
          poNumber: formData.purchaseOrderNumber,
          amount: parseInt(formData.purchaseOrderAmount) || 0
        }
      }),
      tags: formData.tags,
      publishDate: formData.publishDate,
      closeDate: formData.closeDate
    };
    
    onSave(jobData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'צור משרה חדשה' : 'ערוך משרה'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">פרטי משרה בסיסיים</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  כותרת משרה *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="למשל: מפתח/ת Full-Stack"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  מחלקה *
                </label>
                <select
                  required
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">בחר מחלקה</option>
                  {departments.map(dept => (
                    <option key={dept.value} value={dept.value}>{dept.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  מיקום *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="למשל: תל אביב"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  מנהל/ת מגייס *
                </label>
                <select
                  required
                  value={formData.hiringManager}
                  onChange={(e) => handleManagerChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">בחר מנהל מגייס</option>
                  {hiringManagers.map(manager => (
                    <option key={manager.value} value={manager.value}>{manager.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                תיאור משרה
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="תיאור מפורט של המשרה, אחריות, וכו'"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                דרישות
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="דרישות התפקיד, ניסיון נדרש, וכו'"
              />
            </div>
          </div>

          {/* Salary and Security */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">תנאים ודרישות</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שכר מינימום
                </label>
                <input
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="₪"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שכר מקסימום
                </label>
                <input
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="₪"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  דרגת ביטחון
                </label>
                <select
                  value={formData.securityLevel}
                  onChange={(e) => handleInputChange('securityLevel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">בחר דרגת ביטחון</option>
                  {securityLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Client and Purchase Order */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">לקוח והזמנת רכש</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  לקוח
                </label>
                <select
                  value={formData.client}
                  onChange={(e) => handleClientChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">בחר לקוח</option>
                  {clients.map(client => (
                    <option key={client.value} value={client.value}>{client.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  הזמנת רכש
                </label>
                <input
                  type="text"
                  value={formData.purchaseOrderNumber}
                  onChange={(e) => handleInputChange('purchaseOrderNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="מספר הזמנת רכש"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">תגים</h3>
            
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="הוסף תג חדש"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={16} />
                </button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="mr-2 hover:text-blue-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">תאריכים</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תאריך פרסום
                </label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => handleInputChange('publishDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תאריך סגירה
                </label>
                <input
                  type="date"
                  value={formData.closeDate}
                  onChange={(e) => handleInputChange('closeDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              ביטול
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Save size={16} className="ml-2" />
              {mode === 'create' ? 'צור משרה' : 'שמור שינויים'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 