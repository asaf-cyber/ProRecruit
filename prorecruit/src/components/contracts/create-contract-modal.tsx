'use client';

import { useState } from 'react';
import { X, Search, User, FileText } from 'lucide-react';

interface CreateContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function CreateContractModal({
  isOpen,
  onClose,
  onSubmit
}: CreateContractModalProps) {
  const [formData, setFormData] = useState({
    candidateId: '',
    jobId: '',
    contractTemplate: '',
    salary: '',
    workHours: '',
    startDate: '',
    endDate: '',
    probationPeriod: '',
    contractType: 'employee',
    bonuses: '',
    notes: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Mock candidates data
  const mockCandidates = [
    { id: '1', name: 'יוסי כהן', email: 'yossi@example.com', job: 'מפתח Full-Stack' },
    { id: '2', name: 'מיכל לוי', email: 'michal@example.com', job: 'מפתח Frontend' },
    { id: '3', name: 'דן רוזן', email: 'dan@example.com', job: 'DevOps Engineer' },
    { id: '4', name: 'נועה גולדברג', email: 'noa@example.com', job: 'QA Engineer' },
    { id: '5', name: 'עומר שפירא', email: 'omer@example.com', job: 'Project Manager' }
  ];

  // Mock jobs data
  const mockJobs = [
    { id: '1', title: 'מפתח Full-Stack', department: 'פיתוח', client: 'חברת טכנולוגיה מתקדמת' },
    { id: '2', title: 'מפתח Frontend', department: 'פיתוח', client: 'סטארט-אפ חדשני' },
    { id: '3', title: 'DevOps Engineer', department: 'תשתיות', client: 'פתרונות ארגוניים' },
    { id: '4', title: 'QA Engineer', department: 'איכות', client: 'סוכנות דיגיטלית' },
    { id: '5', title: 'Project Manager', department: 'ניהול', client: 'פינטק בע"מ' }
  ];

  // Mock contract templates
  const contractTemplates = [
    { id: 'employee', name: 'חוזה עובד', description: 'חוזה עבודה רגיל לעובד' },
    { id: 'contractor', name: 'חוזה קבלן', description: 'חוזה עבודה לקבלן עצמאי' },
    { id: 'intern', name: 'חוזה מתמחה', description: 'חוזה עבודה למתמחה' },
    { id: 'part_time', name: 'חוזה חלקי', description: 'חוזה עבודה במשרה חלקית' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const filteredCandidates = mockCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.job.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">יצירת חוזה חדש</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contract Template Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              טמפלט חוזה
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contractTemplates.map(template => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleInputChange('contractTemplate', template.id)}
                  className={`p-4 border rounded-lg text-right transition-colors ${
                    formData.contractTemplate === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <FileText size={20} className="text-gray-400" />
                    <div>
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Candidate Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              בחירת מועמד
            </label>
            <div className="relative">
              <Search size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="חיפוש מועמדים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {searchQuery && (
              <div className="mt-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                {filteredCandidates.map(candidate => (
                  <button
                    key={candidate.id}
                    type="button"
                    onClick={() => {
                      handleInputChange('candidateId', candidate.id);
                      setSearchQuery(candidate.name);
                    }}
                    className="w-full flex items-center space-x-3 space-x-reverse p-3 hover:bg-gray-50 text-right"
                  >
                    <User size={16} className="text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{candidate.name}</div>
                      <div className="text-sm text-gray-500">{candidate.job} • {candidate.email}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Job Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              משרה משויכת
            </label>
            <select
              value={formData.jobId}
              onChange={(e) => handleInputChange('jobId', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">בחר משרה</option>
              {mockJobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title} - {job.department} ({job.client})
                </option>
              ))}
            </select>
          </div>

          {/* Contract Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              סוג חוזה
            </label>
            <select
              value={formData.contractType}
              onChange={(e) => handleInputChange('contractType', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="employee">עובד</option>
              <option value="contractor">קבלן</option>
              <option value="intern">מתמחה</option>
              <option value="part_time">משרה חלקית</option>
            </select>
          </div>

          {/* Salary and Work Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                שכר חודשי
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                placeholder="25,000 ₪"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                שעות עבודה שבועיות
              </label>
              <input
                type="text"
                value={formData.workHours}
                onChange={(e) => handleInputChange('workHours', e.target.value)}
                placeholder="40 שעות"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                תאריך התחלת עבודה
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                תאריך סיום צפוי
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                תקופת ניסיון
              </label>
              <input
                type="text"
                value={formData.probationPeriod}
                onChange={(e) => handleInputChange('probationPeriod', e.target.value)}
                placeholder="3 חודשים"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Bonuses */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              בונוסים ותמריצים
            </label>
            <textarea
              value={formData.bonuses}
              onChange={(e) => handleInputChange('bonuses', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="תיאור בונוסים, תמריצים ותנאים נוספים..."
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              הערות נוספות
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="הערות נוספות לחוזה..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 space-x-reverse pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ביטול
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              צור חוזה
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 