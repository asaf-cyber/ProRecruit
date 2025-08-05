'use client';

import { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Building, FileText, Upload } from 'lucide-react';

interface CandidateFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentRole: string;
  company: string;
  location: string;
  source: string;
  linkedin: string;
  experience: string;
  education: string;
  skills: string;
  salary: string;
  notes: string;
  resumeFile: File | null;
}

interface AddCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (candidateData: CandidateFormData) => void;
}

export function AddCandidateModal({ isOpen, onClose, onSave }: AddCandidateModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentRole: '',
    company: '',
    location: '',
    source: 'website',
    linkedin: '',
    experience: '',
    education: '',
    skills: '',
    salary: '',
    notes: '',
    resumeFile: null as File | null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sourceOptions = [
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'חבר מביא חבר', label: 'חבר מביא חבר' },
    { value: 'אתר החברה', label: 'אתר החברה' },
    { value: 'לוח דרושים', label: 'לוח דרושים' },
    { value: 'פנייה ישירה', label: 'פנייה ישירה' },
    { value: 'אחר', label: 'אחר' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'שם פרטי חובה';
    if (!formData.lastName.trim()) newErrors.lastName = 'שם משפחה חובה';
    if (!formData.email.trim()) {
      newErrors.email = 'אימייל חובה';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'פורמט אימייל לא תקין';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'טלפון חובה';
    } else if (!/^[\d\-\+\s\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'פורמט טלפון לא תקין';
    }
    if (!formData.currentRole.trim()) newErrors.currentRole = 'תפקיד נוכחי חובה';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const candidateData = {
        ...formData,
        id: Date.now().toString(),
        status: 'applied',
        appliedDate: new Date().toISOString().split('T')[0],
        lastActivity: new Date().toISOString().split('T')[0],
        recruiter: 'אסף מנהל' // Current user
      };

      onSave(candidateData);
      onClose();
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        currentRole: '',
        company: '',
        location: '',
        source: 'website',
        linkedin: '',
        experience: '',
        education: '',
        skills: '',
        salary: '',
        notes: '',
        resumeFile: null
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding candidate:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resumeFile: file }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">הוספת מועמד חדש</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">פרטים אישיים</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  שם פרטי *
                </label>
                <div className="relative">
                  <User size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="שם פרטי"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  שם משפחה *
                </label>
                <div className="relative">
                  <User size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="שם משפחה"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  אימייל *
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="example@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  טלפון *
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                      errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="050-1234567"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">פרטים מקצועיים</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  תפקיד נוכחי *
                </label>
                <div className="relative">
                  <FileText size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.currentRole}
                    onChange={(e) => handleInputChange('currentRole', e.target.value)}
                    className={`w-full pr-10 pl-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                      errors.currentRole ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="מפתח Full Stack"
                  />
                  {errors.currentRole && <p className="text-red-500 text-xs mt-1">{errors.currentRole}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  חברה נוכחית
                </label>
                <div className="relative">
                  <Building size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="שם החברה"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  מיקום
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="תל אביב"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  מקור
                </label>
                <select
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {sourceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">מידע נוסף</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  שנות ניסיון
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="5 שנים"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  השכלה
                </label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="תואר ראשון במדעי המחשב"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  מיומנויות מקצועיות
                </label>
                <textarea
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="React, Node.js, Python, AWS..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  הערות
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="הערות נוספות על המועמד..."
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  קורות חיים
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        {formData.resumeFile ? formData.resumeFile.name : 'לחץ להעלאת קובץ קורות חיים'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX (MAX. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 space-x-reverse pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              ביטול
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  שומר...
                </>
              ) : (
                'שמור מועמד'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}