'use client';

import { useState } from 'react';
import { X, Search, User } from 'lucide-react';

interface AddCandidateToClearanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddCandidateToClearanceModal({
  isOpen,
  onClose,
  onSubmit
}: AddCandidateToClearanceModalProps) {
  const [formData, setFormData] = useState({
    candidateId: '',
    jobId: '',
    clearanceLevel: '',
    priority: 'medium',
    notes: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Mock candidates data
  const mockCandidates = [
    { id: '1', name: 'יוסי כהן', email: 'yossi@example.com', phone: '050-1234567' },
    { id: '2', name: 'מיכל לוי', email: 'michal@example.com', phone: '050-2345678' },
    { id: '3', name: 'דן רוזן', email: 'dan@example.com', phone: '050-3456789' },
    { id: '4', name: 'נועה גולדברג', email: 'noa@example.com', phone: '050-4567890' },
    { id: '5', name: 'עומר שפירא', email: 'omer@example.com', phone: '050-5678901' }
  ];

  // Mock jobs data
  const mockJobs = [
    { id: '1', title: 'מפתח Full-Stack', department: 'פיתוח' },
    { id: '2', title: 'מפתח Frontend', department: 'פיתוח' },
    { id: '3', title: 'מפתח Backend', department: 'פיתוח' },
    { id: '4', title: 'DevOps Engineer', department: 'תשתיות' },
    { id: '5', title: 'QA Engineer', department: 'איכות' }
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
    candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">הוסף מועמד לסיווג ביטחוני</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                      <div className="text-sm text-gray-500">{candidate.email}</div>
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
                  {job.title} - {job.department}
                </option>
              ))}
            </select>
          </div>

          {/* Clearance Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              דרגת ביטחון נדרשת
            </label>
            <select
              value={formData.clearanceLevel}
              onChange={(e) => handleInputChange('clearanceLevel', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">בחר דרגת ביטחון</option>
              <option value="basic">בסיסי</option>
              <option value="intermediate">בינוני</option>
              <option value="high">גבוה</option>
              <option value="top_secret">סודי ביותר</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              עדיפות
            </label>
            <select
              value={formData.priority}
              onChange={(e) => handleInputChange('priority', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">נמוכה</option>
              <option value="medium">בינונית</option>
              <option value="high">גבוהה</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              הערות
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="הערות נוספות לתהליך הסיווג..."
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
              הוסף לסיווג
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 