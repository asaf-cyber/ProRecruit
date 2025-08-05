'use client';

import { useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';

interface InvoiceFormData {
  title: string;
  description: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  attachments: File[];
}

export function VendorInvoiceForm({
  onClose,
  onSubmit
}: {
  onClose: () => void;
  onSubmit: (data: InvoiceFormData) => void;
}) {
  const [formData, setFormData] = useState<InvoiceFormData>({
    title: '',
    description: '',
    amount: 0,
    issueDate: '',
    dueDate: '',
    attachments: []
  });

  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: keyof InvoiceFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">חשבונית חדשה</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                כותרת החשבונית *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="לדוגמה: פיתוח מודול ניהול משתמשים"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                סכום (₪) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              תיאור השירות *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="תיאור מפורט של השירותים שניתנו..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                תאריך הוצאה *
              </label>
              <input
                type="date"
                required
                value={formData.issueDate}
                onChange={(e) => handleInputChange('issueDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                תאריך יעד לתשלום *
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              קבצים מצורפים
            </label>
            
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                גרור קבצים לכאן או לחץ לבחירה
              </p>
              <p className="text-xs text-gray-500 mb-4">
                תמיכה בקבצי PDF, DOC, DOCX, XLS, XLSX (מקסימום 10MB לקובץ)
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                בחר קבצים
              </label>
            </div>

            {/* Uploaded Files */}
            {formData.attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">קבצים שנבחרו:</h4>
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              ביטול
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              שלח חשבונית
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 