'use client';

import { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Download, 
  Mail, 
  RefreshCw,
  Users,
  AlertCircle,
  FileText
} from 'lucide-react';

interface BulkActionsProps {
  selectedCandidates: string[];
  totalCandidates: number;
  onBulkStatusChange: (candidateIds: string[], newStatus: string) => void;
  onBulkDelete: (candidateIds: string[]) => void;
  onBulkExport: (candidateIds: string[]) => void;
  onBulkPDFGenerate?: (candidateIds: string[]) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
}

export function BulkActions({ 
  selectedCandidates, 
  totalCandidates,
  onBulkStatusChange,
  onBulkDelete,
  onBulkExport,
  onBulkPDFGenerate,
  onSelectAll,
  onClearSelection
}: BulkActionsProps) {
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const statusOptions = [
    { value: 'applied', label: 'הוגשה מועמדות', icon: RefreshCw },
    { value: 'phone_screen', label: 'שיחת טלפון', icon: RefreshCw },
    { value: 'interview', label: 'בראיון', icon: RefreshCw },
    { value: 'offer', label: 'הצעה', icon: CheckCircle },
    { value: 'rejected', label: 'נדחה', icon: XCircle },
    { value: 'hired', label: 'הועסק', icon: CheckCircle }
  ];

  const handleBulkStatusChange = async (newStatus: string) => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onBulkStatusChange(selectedCandidates, newStatus);
      setShowStatusOptions(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`האם אתה בטוח שברצונך למחוק ${selectedCandidates.length} מועמדים נבחרים?`)) {
      onBulkDelete(selectedCandidates);
    }
  };

  const handleBulkExport = () => {
    onBulkExport(selectedCandidates);
  };

  if (selectedCandidates.length === 0) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center text-blue-700 dark:text-blue-300">
            <Users size={16} className="ml-2" />
            <span className="font-medium">
              {selectedCandidates.length} מועמדים נבחרו
            </span>
          </div>
          
          {selectedCandidates.length < totalCandidates && (
            <button
              onClick={onSelectAll}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline"
            >
              בחר הכל ({totalCandidates})
            </button>
          )}
          
          <button
            onClick={onClearSelection}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            בטל בחירה
          </button>
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          {/* Status Change */}
          <div className="relative">
            <button
              onClick={() => setShowStatusOptions(!showStatusOptions)}
              disabled={isProcessing}
              className="flex items-center px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className="ml-1" />
              שנה סטטוס
            </button>

            {showStatusOptions && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="py-1">
                  {statusOptions.map((status) => {
                    const Icon = status.icon;
                    return (
                      <button
                        key={status.value}
                        onClick={() => handleBulkStatusChange(status.value)}
                        disabled={isProcessing}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                      >
                        <Icon size={14} className="ml-2" />
                        {status.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Export */}
          <button
            onClick={handleBulkExport}
            className="flex items-center px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Download size={14} className="ml-1" />
            ייצא
          </button>

          {/* Generate PDF */}
          {onBulkPDFGenerate && (
            <button
              onClick={() => onBulkPDFGenerate(selectedCandidates)}
              className="flex items-center px-3 py-2 text-sm bg-purple-50 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-800 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <FileText size={14} className="ml-1" />
              יצר PDF
            </button>
          )}

          {/* Email (placeholder) */}
          <button
            onClick={() => alert('פונקציונליית שליחת אימייל קבוצתי תתווסף בעתיד')}
            className="flex items-center px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Mail size={14} className="ml-1" />
            שלח אימייל
          </button>

          {/* Delete */}
          <button
            onClick={handleBulkDelete}
            className="flex items-center px-3 py-2 text-sm bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <Trash2 size={14} className="ml-1" />
            מחק
          </button>
        </div>
      </div>

      {isProcessing && (
        <div className="mt-3 flex items-center text-sm text-blue-600 dark:text-blue-400">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400 ml-2"></div>
          מעבד פעולה...
        </div>
      )}
    </div>
  );
}