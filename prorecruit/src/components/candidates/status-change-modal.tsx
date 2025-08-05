'use client';

import { useState } from 'react';
import { X, Clock, Phone, Calendar, CheckCircle, XCircle, Star, FileText } from 'lucide-react';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  currentRole: string;
  status: string;
}

interface StatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
  onStatusChange: (candidateId: string, newStatus: string, note?: string) => void;
}

export function StatusChangeModal({ isOpen, onClose, candidate, onStatusChange }: StatusChangeModalProps) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: 'applied', label: 'הוגשה מועמדות', icon: Clock, color: 'text-blue-600', description: 'המועמד הגיש מועמדות' },
    { value: 'phone_screen', label: 'שיחת טלפון', icon: Phone, color: 'text-yellow-600', description: 'בוצעה שיחת טלפון ראשונית' },
    { value: 'interview', label: 'בראיון', icon: Calendar, color: 'text-purple-600', description: 'המועמד עבר לשלב הראיון' },
    { value: 'offer', label: 'הצעה', icon: CheckCircle, color: 'text-green-600', description: 'הוגשה הצעת עבודה' },
    { value: 'rejected', label: 'נדחה', icon: XCircle, color: 'text-red-600', description: 'המועמדות נדחתה' },
    { value: 'hired', label: 'הועסק', icon: Star, color: 'text-emerald-600', description: 'המועמד התקבל לעבודה' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!candidate || !selectedStatus) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onStatusChange(candidate.id, selectedStatus, note);
      onClose();
      
      // Reset form
      setSelectedStatus('');
      setNote('');
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            שינוי סטטוס - {candidate.firstName} {candidate.lastName}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Candidate Info */}
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-lg font-medium text-blue-600 dark:text-blue-400">
                {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {candidate.firstName} {candidate.lastName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.currentRole}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                סטטוס נוכחי: {statusOptions.find(s => s.value === candidate.status)?.label || candidate.status}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Status Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              בחר סטטוס חדש
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {statusOptions.map((status) => {
                const Icon = status.icon;
                const isSelected = selectedStatus === status.value;
                const isCurrent = candidate.status === status.value;
                
                return (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => setSelectedStatus(status.value)}
                    disabled={isCurrent}
                    className={`p-4 rounded-lg border-2 text-right transition-all ${
                      isCurrent
                        ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Icon size={16} className={`ml-2 ${status.color}`} />
                          <span className={`font-medium ${
                            isCurrent 
                              ? 'text-gray-400 dark:text-gray-500' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {status.label}
                            {isCurrent && ' (נוכחי)'}
                          </span>
                        </div>
                        <p className={`text-xs mt-1 ${
                          isCurrent 
                            ? 'text-gray-400 dark:text-gray-500' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {status.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              הערה (אופציונלי)
            </label>
            <div className="relative">
              <FileText size={16} className="absolute right-3 top-3 text-gray-400 dark:text-gray-500" />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full pr-10 pl-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="הוסף הערה על שינוי הסטטוס..."
              />
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
              disabled={isSubmitting || !selectedStatus || candidate.status === selectedStatus}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  משנה סטטוס...
                </>
              ) : (
                <>
                  <CheckCircle size={16} className="ml-2" />
                  שנה סטטוס
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}